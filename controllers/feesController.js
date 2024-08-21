const Fee = require('../models/feeModel');
const Student = require('../models/studentModel');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');

// Ensure receipts directory exists
const receiptsDir = path.join(__dirname, '../receipts');
if (!fs.existsSync(receiptsDir)) {
  fs.mkdirSync(receiptsDir);
}

exports.searchStudents = async (req, res) => {
  try {
    const students = await Student.find({ name: new RegExp(req.query.name, 'i') });
    res.json(students);
  } catch (error) {
    res.status(500).send('Error fetching students');
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { studentId, paymentType, amount, date } = req.body;
    const fee = new Fee({ studentId, paymentType, amount, date });
    await fee.save();

    // Generate PDF
    const student = await Student.findById(studentId).exec();
    if (!student) {
      return res.status(404).send('Student not found');
    }
    const html = `
      <h1>Payment Receipt</h1>
      <p>Student: ${student.name}</p>
      <p>Amount: ${amount}</p>
      <p>Payment Type: ${paymentType}</p>
      <p>Date: ${date}</p>
    `;
    const pdfPath = path.join(receiptsDir, `${studentId}.pdf`);
    pdf.create(html).toFile(pdfPath, (err, result) => {
      if (err) {
        console.error('Error creating PDF:', err);
        return res.status(500).send('Error creating PDF');
      }
      console.log('PDF created:', result.filename);
      res.status(200).send('Payment processed and PDF created');
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send('Error processing payment');
  }
};
