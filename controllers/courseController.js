const Course = require("../models/Course");

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get a single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Add a new course
// @route   POST /api/courses
// @access  Public
const addCourse = async (req, res) => {
  const { name, description, duration } = req.body;

  try {
    const newCourse = new Course({ name, description, duration });
    await newCourse.save();
    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update an existing course
// @route   PUT /api/courses/:id
// @access  Public
const updateCourse = async (req, res) => {
  const { name, description, duration } = req.body;

  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.name = name || course.name;
    course.description = description || course.description;
    course.duration = duration || course.duration;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Public
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.remove();
    res.json({ message: "Course removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
