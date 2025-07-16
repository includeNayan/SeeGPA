const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Student = require("../models/Student");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const getBranch = (regNo) => {
  const prefix = regNo.toString().slice(0, 4);
  switch (prefix) {
    case "2211": return "Civil Engineering";
    case "2212": return "Computer Science & Engineering";
    case "2213": return "Electrical Engineering";
    case "2214": return "Electronics & Communication Engg.";
    case "2215": return "Electronics & Instrumentation Engg.";
    case "2216": return "Mechanical Engineering";
    default: return "Unknown Branch";
  }
};

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read and parse PDF
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);

    // Split text into lines, trim, and filter student rows (slno + 7-digit regNo)
    const lines = data.text
      .split("\n")
      .map(line => line.trim())
      .filter(line => /^\d+\s+\d{7}/.test(line));

    const students = lines.map(line => {
      const parts = line.split(/\s+/);
      const slno = parts[0];
      const regNo = parts[1];
      const branch = getBranch(regNo);

      const gp = parts[parts.length - 4];
      const sgpa = parts[parts.length - 3];
      const cgpa = parts[parts.length - 2];
      const eaa = parts[parts.length - 1];

      const subjectTokensCount = parts.length - 6; // exclude slno, regNo, gp, sgpa, cgpa, eaa
      const subjects = [];
      for (let i = 2; i < 2 + subjectTokensCount; i += 2) {
        subjects.push({ score: parts[i], grade: parts[i + 1] });
      }

      return { slno, regNo, branch, subjects, gp, sgpa, cgpa, eaa };
    });

    // Optionally clear existing data
    await Student.deleteMany({});
    await Student.insertMany(students);

    res.json({ message: "✅ Students saved successfully!", count: students.length });
    fs.unlinkSync(req.file.path);
  } catch (error) {
    console.error("❌ Error in PDF upload:", error);
    res.status(500).json({ error: "Failed to process and save results" });
  }
});

module.exports = router;