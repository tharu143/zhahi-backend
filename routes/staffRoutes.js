const express = require("express");
const router = express.Router();
const multer = require("multer");
const Staff = require("../models/Staff"); // Adjust path as necessary

// Define the multer storage configuration here

router.post("/staff-details", upload.single("documents"), async (req, res) => {
  try {
    const { name, role, employeeId, studentsHandled, coursesHandled } =
      req.body;
    const document = req.file ? req.file.path : null;

    const newStaff = new Staff({
      name,
      role,
      employeeId,
      studentsHandled,
      coursesHandled,
      document,
    });

    await newStaff.save();
    res.status(201).json({ message: "Staff details saved successfully." });
  } catch (error) {
    console.error("Error saving staff details:", error);
    res.status(500).json({ message: "Error saving staff details." });
  }
});

module.exports = router;
