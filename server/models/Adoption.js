const mongoose = require('mongoose')

const adoptionSchema = new mongoose.Schema({
  adopter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: true,
  },
  adoptionDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    enum: ['Ожидание', 'Одобрено', 'Отклонено', 'Завершено'],
    default: 'Ожидание',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Adoption = mongoose.model('Adoption', adoptionSchema)
module.exports = Adoption
