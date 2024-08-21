const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Define your routes and make sure to pass the correct callback functions
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.get('/search', studentController.searchStudents);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
