const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  adopterDetails: {
    name: String,
    address: String,
    phone: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User
