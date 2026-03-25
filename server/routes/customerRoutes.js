const express = require('express');
const Customer = require('../models/Customer');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/customers
// @desc    Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/customers
// @desc    Create a new customer lead
router.post('/', async (req, res) => {
  try {
    const { name, phone, car } = req.body;

    if (!name || !phone || !car) {
      return res.status(400).json({ message: 'Name, phone, and car are required' });
    }

    const customer = await Customer.create({ name, phone, car });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/customers/:id/sold
// @desc    Mark a customer sale as complete
router.patch('/:id/sold', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { status: 'Sold' },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
