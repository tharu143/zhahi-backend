// controllers/documentUploadController.js
const Student = require("../models/studentModel");

// Handle file uploads
exports.handleFileUpload = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }

    const { aadharCard, studentProof, studentPicture } = req.files;

    // Retrieve student ID from the request (e.g., from req.body or query parameters)
    const studentId = req.body.studentId; // or from req.params.id

    if (!studentId) {
      return res.status(400).send("Student ID is required.");
    }

    // Find the student and update with file paths
    const student = await Student.findOneAndUpdate(
      { studentId },
      {
        $set: {
          aadharCard: aadharCard[0] ? aadharCard[0].filename : undefined,
          studentProof: studentProof[0] ? studentProof[0].filename : undefined,
          studentPicture: studentPicture[0]
            ? studentPicture[0].filename
            : undefined,
        },
      },
      { new: true }
    );

    if (!student) return res.status(404).send("Student not found");

    res.status(200).json(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
