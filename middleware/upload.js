const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // Initialize multer for handling file uploads
const projectController = require('../controllers/projectController');

// Route to handle importing projects from Excel
router.post('/import', upload.single('file'), projectController.importProjectsFromExcel);

module.exports = router;
