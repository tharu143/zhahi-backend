const express = require('express');
const router = express.Router();
const Fee = require('../models/feeModel');

// Get all fees records
router.get('/', async (req, res) => {
  try {
    const fees = await Fee.find().populate('studentId', 'name');
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new fee record
router.post('/', async (req, res) => {
  const { studentId, amount, date, paymentType } = req.body;
  try {
    const newFee = new Fee({ studentId, amount, date, paymentType });
    const savedFee = await newFee.save();
    res.status(201).json(savedFee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a fee record
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { studentId, amount, date, paymentType } = req.body;
  try {
    const updatedFee = await Fee.findByIdAndUpdate(id, { studentId, amount, date, paymentType }, { new: true });
    res.json(updatedFee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a fee record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Fee.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Search fees by student name
router.get('/search', async (req, res) => {
  const { name } = req.query;
  try {
    const fees = await Fee.find().populate({
      path: 'studentId',
      match: { name: new RegExp(name, 'i') },
      select: 'name',
    });
    res.json(fees.filter(fee => fee.studentId));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
