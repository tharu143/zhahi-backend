const express = require('express');
const router = express.Router();
const feeController = require('../controllers/feesController');

// Create a new fee record
router.post('/', feeController.createFee);

// Get all fee records
router.get('/', feeController.getFeeRecords);

// Update a fee record by ID
router.put('/:id', feeController.updateFee);

// Delete a fee record by ID
router.delete('/:id', feeController.deleteFee);

module.exports = router;
