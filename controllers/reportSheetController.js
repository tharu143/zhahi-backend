const ReportSheet = require('../models/ReportSheetModel');

// Controller to create or update a report sheet
const createOrUpdateReportSheet = async (req, res) => {
  const { studentId, reportLink } = req.body;

  if (!studentId || !reportLink) {
    return res.status(400).json({ message: 'Student ID and report link are required.' });
  }

  try {
    // Find existing report sheet for this student
    const existingReportSheet = await ReportSheet.findOne({ studentId });

    if (existingReportSheet) {
      // Update the existing report sheet
      existingReportSheet.reportLink = reportLink;
      await existingReportSheet.save();
      return res.status(200).json(existingReportSheet);
    }

    // Create a new report sheet if none exists
    const newReportSheet = new ReportSheet({ studentId, reportLink });
    await newReportSheet.save();
    res.status(201).json(newReportSheet);
  } catch (error) {
    console.error("Failed to create or update report sheet:", error);
    res.status(500).json({ message: 'Failed to save report link.' });
  }
};

// Controller to get a report sheet by student ID
const getReportSheetByStudentId = async (req, res) => {
  const { studentId } = req.params;

  try {
    const reportSheet = await ReportSheet.findOne({ studentId });

    if (!reportSheet) {
      return res.status(404).json({ message: 'Report sheet not found.' });
    }

    res.status(200).json(reportSheet);
  } catch (error) {
    console.error("Failed to get report sheet:", error);
    res.status(500).json({ message: 'Failed to retrieve report sheet.' });
  }
};

module.exports = {
  createOrUpdateReportSheet,
  getReportSheetByStudentId,
};
