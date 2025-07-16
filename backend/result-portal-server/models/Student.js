const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  slno: String,
  regNo: String,
  branch: String,
  subjects: [{ score: String, grade: String }],
  gp: String,
  sgpa: String,
  cgpa: String,
  eea: String,
});

module.exports = mongoose.model("Student", studentSchema)