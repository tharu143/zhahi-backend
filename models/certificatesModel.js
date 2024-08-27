const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true },
  issuedDate: { type: Date, required: true },
  projectName: { type: String, required: true },
  status: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  branch: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
