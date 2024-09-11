const mongoose = require('mongoose')

const kittySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
})

const Kitten = mongoose.model('Kitten', kittySchema)

module.exports = Kitten
