const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  car: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Sold'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
