const express = require('express');
const router = express.Router();
const { importProjectsFromExcel } = require('../controllers/projectController');

router.post('/import', importProjectsFromExcel);

module.exports = router;
