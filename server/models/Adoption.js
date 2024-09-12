const AdoptionSchema = new mongoose.Schema({
  adopter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Adopter',
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

module.exports = mongoose.model('Adoption', AdoptionSchema)
