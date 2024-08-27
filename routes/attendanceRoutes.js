const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Route to search for students
router.get('/search-student', attendanceController.searchStudent);

// Route to update attendance
router.put('/update-attendance', attendanceController.updateAttendance);

module.exports = router;
