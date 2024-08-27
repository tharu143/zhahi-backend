const Fee = require('../models/feeModel');

// Create a new fee record
const createFee = async (req, res) => {
  const { studentId, paymentType, paymentDate, status } = req.body;

  try {
    // Validate data
    if (!studentId || !paymentType || !paymentDate || !status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Parse paymentDate
    const paymentDateObj = new Date(paymentDate);
    if (isNaN(paymentDateObj.getTime())) {
      return res.status(400).json({ message: 'Invalid payment date.' });
    }

    // Calculate next due date
    let nextDueDate;
    if (paymentType === 'monthly') {
      nextDueDate = new Date(paymentDateObj);
      nextDueDate.setMonth(paymentDateObj.getMonth() + 1); // Add 1 month for monthly payment
    } else if (paymentType === 'full') {
      nextDueDate = new Date(paymentDateObj);
      nextDueDate.setFullYear(paymentDateObj.getFullYear() + 1); // Add 1 year for full payment
    } else {
      return res.status(400).json({ message: 'Invalid payment type.' });
    }

    // Create and save the fee record
    const newFee = new Fee({
      studentId,
      paymentType,
      paymentDate,
      nextDueDate,
      status
    });

    await newFee.save();
    res.status(201).json(newFee);
  } catch (error) {
    console.error("Error creating fee record:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fetch all fee records
const getFeeRecords = async (req, res) => {
  try {
    const fees = await Fee.find().populate('studentId', 'name studentId'); // Populate studentId with relevant student details
    res.status(200).json(fees);
  } catch (error) {
    console.error("Error fetching fee records:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update a fee record
const updateFee = async (req, res) => {
  const { id } = req.params;
  const { paymentType, paymentDate, status } = req.body;

  try {
    const paymentDateObj = new Date(paymentDate);
    if (isNaN(paymentDateObj.getTime())) {
      return res.status(400).json({ message: 'Invalid payment date.' });
    }

    let nextDueDate;
    if (paymentType === 'monthly') {
      nextDueDate = new Date(paymentDateObj);
      nextDueDate.setMonth(paymentDateObj.getMonth() + 1);
    } else if (paymentType === 'full') {
      nextDueDate = new Date(paymentDateObj);
      nextDueDate.setFullYear(paymentDateObj.getFullYear() + 1);
    } else {
      return res.status(400).json({ message: 'Invalid payment type.' });
    }

    const updatedFee = await Fee.findByIdAndUpdate(id, {
      paymentType,
      paymentDate,
      nextDueDate,
      status
    }, { new: true });

    if (!updatedFee) {
      return res.status(404).json({ message: 'Fee record not found.' });
    }

    res.status(200).json(updatedFee);
  } catch (error) {
    console.error("Error updating fee record:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a fee record
const deleteFee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFee = await Fee.findByIdAndDelete(id);
    if (!deletedFee) {
      return res.status(404).json({ message: 'Fee record not found.' });
    }
    res.status(200).json({ message: 'Fee record deleted successfully.' });
  } catch (error) {
    console.error("Error deleting fee record:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFee,
  getFeeRecords,
  updateFee,
  deleteFee
};
