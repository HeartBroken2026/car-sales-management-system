const express = require('express');
const Car = require('../models/Car');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/cars
// @desc    Get all cars (with optional search & type filter)
router.get('/', async (req, res) => {
  try {
    const { search, type } = req.query;
    let filter = {};

    if (type && type !== 'all') {
      filter.type = type;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { make: searchRegex },
        { model: searchRegex }
      ];
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/cars
// @desc    Add a new car
router.post('/', async (req, res) => {
  try {
    const { make, model, price, type } = req.body;

    if (!make || !model || !price) {
      return res.status(400).json({ message: 'Make, model, and price are required' });
    }

    const car = await Car.create({
      make,
      model,
      price: Number(price),
      type: type || 'Sedan'
    });

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/cars/:id
// @desc    Delete a car
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
