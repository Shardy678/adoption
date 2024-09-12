const Adoption = require('../models/Adoption')

exports.createAdoption = async (req, res) => {
  try {
    const newAdoption = new Adoption(req.body)
    const savedAdoption = await newAdoption.save()
    res.status(201).json(savedAdoption)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find({})
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
