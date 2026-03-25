const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    default: () => new Date().getFullYear()
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['Sedan', 'SUV', 'Sport', 'Electric'],
    default: 'Sedan'
  },
  img: {
    type: String,
    default: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=60'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
