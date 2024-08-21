// backend/controllers/chartController.js
const Attendance = require('../models/attendanceModel');
const Student = require('../models/studentModel');
const Fees = require('../models/feeModel'); // Assuming you have a Fees model

exports.getChartData = async (req, res) => {
  try {
    // Aggregate attendance data by date
    const attendanceData = await Attendance.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 } // Sort by date
      }
    ]);

    // Aggregate fees data by date
    const feesData = await Fees.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalFees: { $sum: "$amount" }
        }
      },
      {
        $sort: { _id: 1 } // Sort by date
      }
    ]);

    // Fetch student data and count number of students
    const studentCount = await Student.countDocuments();

    res.json({
      attendanceData,
      feesData,
      studentCount
    });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).send('Error fetching chart data');
  }
};
