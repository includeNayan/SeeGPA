const fs = require("fs");
const pdfParse = require("pdf-parse");

async function parsePDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  console.log("📄 PDF Text:\n", data.text);
  const text = data.text;
  


  const results = [];

  // 🔍 You must customize this parser to your actual PDF layout
  const lines = text.split("\n");

  for (const line of lines) {
    if (line.includes("ScholarID")) {
      const [slno, regNo, branch, gp, sgpa, cgpa, eea] = line.trim().split(/\s+/);
      results.push({
        slno,
        regNo,
        branch,
        subjects: [],
        gp,
        sgpa,
        cgpa,
        eea,
      });
    }
  }

  return results;
}

module.exports = parsePDF;
