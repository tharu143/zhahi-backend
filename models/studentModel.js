const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: String,
  department: String,
  degree: String,
  aadharNo: String,
  dob: Date,
  phoneNo: String,
  mailId: String,
  linkedinId: String,
  githubId: String,
  aadharCardPath: String, // Path to the uploaded Aadhar Card
  studentProofPath: String, // Path to the uploaded Student Proof
  studentPicPath: String, // Path to the uploaded Student Picture
});

module.exports = mongoose.model("Student", studentSchema);
