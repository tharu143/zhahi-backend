const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/', attendanceController.getAllRecords);
router.post('/', attendanceController.createRecord);
router.put('/:id', attendanceController.updateRecord);
router.delete('/:id', attendanceController.deleteRecord);

module.exports = router;
