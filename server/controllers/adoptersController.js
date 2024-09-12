const Adopter = require('../models/Adopter')

exports.createAdopter = async (req, res) => {
  try {
    const newAdopter = new Adopter(req.body)
    const savedAdopter = await newAdopter.save()
    res.status(201).json(savedAdopter)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getAdopters = async (req, res) => {
  try {
    const adopters = await Adopter.find({})
    res.status(201).json(adopters)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAdopterById = async (req, res) => {
  try {
    const { id } = req.params
    const adopters = await Adopter.findById(id)
    res.status(201).json(adopters)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateAdopter = async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body

    const updatedAdopter = await Adopter.findByIdAndUpdate(id, updatedData, {
      new: true,
    })

    if (!updatedAdopter) {
      return res.status(404).json({ message: 'Adopter not found' })
    }
    res.status(200).json(updatedAdopter)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.deleteAdopter = async (req, res) => {
  try {
    const { id } = req.params
    const deletedAdopter = await Adopter.findByIdAndDelete(id)
    if (!deletedAdopter) {
      return res.status(404).json({ message: 'Adopter not found' })
    }
    res.status(200).json(deletedAdopter)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
