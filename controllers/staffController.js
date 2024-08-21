const Staff = require("../models/staffModel");

exports.createStaff = async (req, res) => {
  const { name, role, employeeId, studentsHandled, coursesHandled } = req.body;
  const document = req.file ? req.file.path : "";

  try {
    const newStaff = new Staff({
      name,
      role,
      employeeId,
      studentsHandled,
      coursesHandled,
      document,
    });

    await newStaff.save();
    res.status(200).json({ message: "Staff details submitted successfully!" });
  } catch (error) {
    console.error("Error saving staff details:", error);
    res.status(500).json({ message: "Error saving staff details." });
  }
};
