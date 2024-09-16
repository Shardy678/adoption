const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
  species: { type: String, required: true },

  // Health
  vaccinated: { type: Boolean, required: true, default: false },
  sterilized: { type: Boolean, required: true, default: false },
  healthy: { type: Boolean, required: true, default: true },

  // Compatibility
  compatibleWithCats: { type: Boolean, required: true, default: true },
  compatibleWithDogs: { type: Boolean, required: true, default: true },
  compatibleWithPeople: { type: Boolean, required: true, default: true },
  compatibleWithChildren: { type: Boolean, required: true, default: true },

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
    default: 'Средний',
  },

  // Status
  available: { type: Boolean, required: true, default: true },
  image: { type: String, required: true },
})

const Animal = mongoose.model('Animal', animalSchema)
module.exports = Animal
