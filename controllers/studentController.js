const multer = require("multer");
const path = require("path");
const Student = require("../models/studentModel");
const getNextStudentId = require("../helpers");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Create a new student
exports.createStudent = [
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "studentProof", maxCount: 1 },
    { name: "studentPicture", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("Files:", req.files); // Log files received
    console.log("Body:", req.body);   // Log form data

    try {
      const studentId = await getNextStudentId(); // Generate new student ID
      const student = new Student({
        ...req.body,
        studentId,
        aadharCardPath: req.files["aadharCard"]
          ? req.files["aadharCard"][0].path
          : undefined,
        studentProofPath: req.files["studentProof"]
          ? req.files["studentProof"][0].path
          : undefined,
        studentPicPath: req.files["studentPicture"]
          ? req.files["studentPicture"][0].path
          : undefined,
      });
      await student.save();
      res.status(201).json(student);
    } catch (error) {
      console.error("Error creating student:", error);
      res.status(500).json({ error: "Failed to create student" });
    }
  },
];

// Update a student by ID
exports.updateStudent = [
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "studentProof", maxCount: 1 },
    { name: "studentPicture", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("Files:", req.files); // Log files received
    console.log("Body:", req.body);   // Log form data

    try {
      const updateData = {
        ...req.body,
        ...(req.files["aadharCard"] && {
          aadharCardPath: req.files["aadharCard"][0].path,
        }),
        ...(req.files["studentProof"] && {
          studentProofPath: req.files["studentProof"][0].path,
        }),
        ...(req.files["studentPicture"] && {
          studentPicPath: req.files["studentPicture"][0].path,
        }),
      };

      const student = await Student.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.status(200).json(student);
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ error: "Failed to update student" });
    }
  },
];

// Search students by name or ID
exports.searchStudents = async (req, res) => {
  try {
    const query = req.query.query || "";
    const students = await Student.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { studentId: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error searching students:", error);
    res.status(500).json({ error: "Failed to search students" });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student" });
  }
};
