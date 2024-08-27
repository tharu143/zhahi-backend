const express = require('express');
const router = express.Router();
const reportSheetController = require('../controllers/reportSheetController');

// Route to create or update a report sheet
router.post('/report-sheets', reportSheetController.createOrUpdateReportSheet);

// Route to get a report sheet by student ID
router.get('/report-sheets/:studentId', reportSheetController.getReportSheetByStudentId);

module.exports = router;
