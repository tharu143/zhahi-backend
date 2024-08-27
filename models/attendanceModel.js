const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  date: {
    type: String, // Store date as YYYY-MM-DD
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'OD', 'Holiday'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
