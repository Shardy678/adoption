const mongoose = require('mongoose')
require('dotenv').config()

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected successfully')
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
    process.exit(1)
  }
}

module.exports = connectDB
