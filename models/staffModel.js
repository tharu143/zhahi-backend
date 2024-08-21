const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  employeeId: { type: String, required: true },
  studentsHandled: { type: String, required: false },
  coursesHandled: { type: String, required: false },
  document: { type: String, required: false },
});

module.exports = mongoose.model("Staff", staffSchema);
