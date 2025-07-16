const express = require("express");
const Student = require("../models/Student");
const router = express.Router();

router.get("/result/:id", async (req, res) => {
  try {
    const scholarId = req.params.id;
    const student = await Student.findOne({ regNo: scholarId });

    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Error fetching result" });
  }
});

module.exports = router;
