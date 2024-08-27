const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: String,
  collegeName: String,
  degree: String,
  passedOut: String,
  address: String,
  batch: String, // Morning or Evening
  courseName: String,
  dateOfJoining: Date,
  mode: String, // true for Online, false for Offline
  phoneNo: String,
  mailId: String,
  linkedinId: String,
  githubId: String,
  aadharCardPath: String, // Path to the uploaded Aadhar Card
  studentProofPath: String, // Path to the uploaded Student Proof
  studentPicPath: String, // Path to the uploaded Student Picture
});

module.exports = mongoose.model("Student", studentSchema);
