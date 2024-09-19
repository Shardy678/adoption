const Adoption = require('../models/Adoption')
const User = require('../models/User')
const Animal = require('../models/Animal')

exports.createAdoption = async (req, res) => {
  try {
    const { animalId } = req.body

    // Find user by token
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'Must be logged in' })
    }

    // Find animal by ID
    const animal = await Animal.findById(animalId)
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' })
    }

    // Create new adoption
    const newAdoption = new Adoption({
      adopter: user._id,
      animal: animal._id,
      ...req.body,
    })

    const savedAdoption = await newAdoption.save()

    const updatedAnimal = await Animal.findByIdAndUpdate(
      animalId,
      { available: false },
      { new: true }
    )

    if (!updatedAnimal) {
      return res.status(404).json({ message: 'Animal not found' })
    }
    res.status(201).json(savedAdoption)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find({})
      .populate('adopter')
      .populate('animal')
    res.status(201).json(adoptions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAdoptionById = async (req, res) => {
  try {
    const { id } = req.params
    const adoptions = await Adoption.findById(id)
    res.status(201).json(adoptions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateAdoption = async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body

    const updatedAdoption = await Adoption.findByIdAndUpdate(id, updatedData, {
      new: true,
    })

    if (!updatedAdoption) {
      return res.status(404).json({ message: 'Adoption not found' })
    }
    res.status(200).json(updatedAdoption)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.deleteAdoption = async (req, res) => {
  try {
    const { id } = req.params
    const deletedAdoption = await Adoption.findByIdAndDelete(id)
    if (!deletedAdoption) {
      return res.status(404).json({ message: 'Adoption not found' })
    }
    res.status(200).json(deletedAdoption)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
