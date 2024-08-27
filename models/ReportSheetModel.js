const mongoose = require('mongoose');

const reportSheetSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  reportLink: { type: String, required: true },
  // Add any other fields if necessary
});

const ReportSheet = mongoose.model('ReportSheet', reportSheetSchema);

module.exports = ReportSheet;
