const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
  species: { type: String, required: true },

  // Health
  vaccinated: { type: Boolean, required: true },
  sterilized: { type: Boolean, required: true },
  healthy: { type: Boolean, required: true },

  // Compatiblity
  compatibleWithCats: { type: Boolean, required: true },
  compatibleWithDogs: { type: Boolean, required: true },
  compatibleWithPeople: { type: Boolean, required: true },
  compatibleWithChildren: { type: Boolean, required: true },

  // Size
  size: {
    type: String,
    enum: [
      'Очень большой',
      'Большой',
      'Средний',
      'Маленький',
      'Очень маленький',
    ],
    required: true,
  },

  // Status
  available: { type: Boolean, required: true },
})

const Animal = mongoose.model('Animal', animalSchema)
module.exports = Animal
