const Animal = require('../models/Animal')

exports.getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find({})
    res.status(201).json(animals)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAnimalById = async (req, res) => {
  try {
    const { id } = req.params
    const animal = await Animal.findById(id)
    res.status(201).json(animal)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.createAnimal = async (req, res) => {
  try {
    const newAnimal = new Animal(req.body)
    const savedAnimal = await newAnimal.save()
    res.status(201).json(savedAnimal)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.updateAnimal = async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body

    const updatedAnimal = await Animal.findByIdAndUpdate(id, updatedData, {
      new: true,
    })

    if (!updatedAnimal) {
      return res.status(404).json({ message: 'Animal not found' })
    }
    res.status(200).json(updatedAnimal)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params
    const deletedAnimal = await Animal.findByIdAndDelete(id)
    if (!deletedAnimal) {
      return res.status(404).json({ message: 'Animal not found' })
    }
    res.status(200).json(deletedAnimal)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
