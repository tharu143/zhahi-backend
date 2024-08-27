const Student = require('../models/studentModel');
const Attendance = require('../models/attendanceModel');
// Search for student by name
exports.searchStudent = async (req, res) => {
  try {
    const query = req.query.name || "";

    // Find students matching the name
    const students = await Student.find({
      name: { $regex: query, $options: "i" } // Case-insensitive search
    });

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error('Error searching student:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
};

// Update attendance status
exports.updateAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Check if date format is valid
    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Update or create attendance record
    let attendanceRecord = await Attendance.findOne({
      studentId,
      date: formattedDate.toISOString().split('T')[0]
    });

    if (!attendanceRecord) {
      attendanceRecord = new Attendance({
        studentId,
        date: formattedDate.toISOString().split('T')[0],
        status,
      });
    } else {
      attendanceRecord.status = status;
    }

    await attendanceRecord.save();
    res.status(200).json({ message: 'Attendance status updated successfully' });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
};
