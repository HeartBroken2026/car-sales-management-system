const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const connectDB = require('./config/db');
const User = require('./models/User');

const seedAdmin = async () => {
  await connectDB();

  const adminEmail = 'admin@stellar.com';
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log('Admin user already exists');
  } else {
    await User.create({
      name: 'System Admin',
      email: adminEmail,
      password: 'admin123',
      type: 'admin'
    });
    console.log('Default admin user created (admin@stellar.com / admin123)');
  }

  await mongoose.disconnect();
  process.exit(0);
};

seedAdmin();
