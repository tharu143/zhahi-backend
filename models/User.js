const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  degree: { type: String, required: true },
  aadhar: { type: String, required: true },
  dob: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  linkedin: { type: String, required: true },
  github: { type: String, required: true },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
