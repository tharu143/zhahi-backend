const Attendance = require('../models/attendanceModel');
const Student = require('../models/studentModel');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');

// Ensure receipts directory exists
const receiptsDir = path.join(__dirname, '../receipts');
if (!fs.existsSync(receiptsDir)) {
  fs.mkdirSync(receiptsDir);
}

exports.getAllRecords = async (req, res) => {
  try {
    const records = await Attendance.find().populate('studentId');
    res.json(records);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).send('Error fetching attendance records');
  }
};

exports.createRecord = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    // Convert date string to Date object
    const formattedDate = new Date(date);

    if (isNaN(formattedDate.getTime())) {
      return res.status(400).send('Invalid date format');
    }

    const attendance = new Attendance({ studentId, date: formattedDate, status });
    await attendance.save();

    // Generate PDF
    const student = await Student.findById(studentId).exec();
    if (!student) {
      return res.status(404).send('Student not found');
    }

    const html = `
      <h1>Attendance Receipt</h1>
      <p>Student: ${student.name}</p>
      <p>Date: ${formattedDate.toISOString().split('T')[0]}</p>
      <p>Status: ${status}</p>
    `;
    
    const pdfPath = path.join(receiptsDir, `${studentId}_${formattedDate.toISOString().split('T')[0]}.pdf`);
    pdf.create(html).toFile(pdfPath, (err, result) => {
      if (err) {
        console.error('Error creating PDF:', err);
        return res.status(500).send('Error creating PDF');
      }
      console.log('PDF created:', result.filename);
      res.status(201).json(attendance);
    });
  } catch (error) {
    console.error('Error creating attendance record:', error);
    res.status(500).send('Error creating attendance record');
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, date, status } = req.body;

    // Convert date string to Date object
    const formattedDate = new Date(date);

    if (isNaN(formattedDate.getTime())) {
      return res.status(400).send('Invalid date format');
    }

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { studentId, date: formattedDate, status },
      { new: true }
    ).populate('studentId');

    if (!updatedAttendance) {
      return res.status(404).send('Attendance record not found');
    }

    res.json(updatedAttendance);
  } catch (error) {
    console.error('Error updating attendance record:', error);
    res.status(500).send('Error updating attendance record');
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttendance = await Attendance.findByIdAndDelete(id);

    if (!deletedAttendance) {
      return res.status(404).send('Attendance record not found');
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting attendance record:', error);
    res.status(500).send('Error deleting attendance record');
  }
};
