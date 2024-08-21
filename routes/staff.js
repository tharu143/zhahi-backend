const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: String,
  role: String,
  employeeId: String,
  studentsHandled: String,
  coursesHandled: String,
  document: String,
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
