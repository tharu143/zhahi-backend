const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  paymentType: { type: String, enum: ['monthly', 'full'], required: true },
  paymentDate: { type: Date, required: true },
  nextDueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'unpaid'], required: true }
});

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;
