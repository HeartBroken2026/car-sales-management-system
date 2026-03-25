const express = require('express');
const Car = require('../models/Car');
const Customer = require('../models/Customer');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalCars = await Car.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const carsSold = await Customer.countDocuments({ status: 'Sold' });

    res.json({ totalCars, carsSold, totalCustomers });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
