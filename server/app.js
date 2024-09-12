const express = require('express')
const connectDB = require('./db')
const morgan = require('morgan')
const cors = require('cors')

const Kitten = require('./models/Kitten')
const Animal = require('./models/Animal')
const Adopter = require('./models/Adopter')

const app = express()
const port = 3000
connectDB()

app.use(morgan('dev'))
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)

app.get('/', (req, res) => {
  res.send('Hello from backend')
})

// CREATE
app.post('/kittens', async (req, res) => {
  try {
    const newKitten = new Kitten(req.body)
    const savedKitten = await newKitten.save()
    res.status(201).json(savedKitten)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// READ
app.get('/kittens', async (req, res) => {
  try {
    const kittens = await Kitten.find({})
    res.status(201).json(kittens)
  } catch (err) {
    res.status(500).json({ error: error.message })
  }
})

// UPDATE
app.put('/kittens/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body

    const updatedKitten = await Kitten.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
    if (!updatedKitten) {
      return res.status(404).json({ message: 'Kitten not found' })
    }
    res.status(200).json(updatedKitten)
  } catch (err) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE
app.delete('/kittens/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedKitten = await Kitten.findByIdAndDelete(id)
    if (!deletedKitten) {
      return res.status(404).json({ message: 'Kitten not found' })
    }
    res.status(200).json(deletedKitten)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.get('/animals', async (req, res) => {
  try {
    const animals = await Animal.find({})
    res.status(201).json(animals)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/animals/:id', async (req, res) => {
  try {
    const { id } = req.params
    const animal = await Animal.findById(id)
    res.status(201).json(animal)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/animals', async (req, res) => {
  try {
    const newAnimal = new Animal(req.body)
    const savedAnimal = await newAnimal.save()
    res.status(201).json(savedAnimal)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.put('/animals/:id', async (req, res) => {
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
})

app.delete('/animals/:id', async (req, res) => {
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
})

app.post('/adopters', async (req, res) => {
  try {
    const newAdopter = new Adopter(req.body)
    const savedAdopter = await newAdopter.save()
    res.status(201).json(savedAdopter)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get('/adopters', async (req, res) => {
  try {
    const adopters = await Adopter.find({})
    res.status(201).json(adopters)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/adopters/:id', async (req, res) => {
  try {
    const { id } = req.params
    const adopters = await Adopter.findById(id)
    res.status(201).json(adopters)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/adopters/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body

    const updatedAdopter = Adopter.findByIdAndUpdate(id, updatedData, {
      new: true,
    })

    if (!updatedAdopter) {
      return res.status(404).json({ message: 'Adopter not found' })
    }
    res.status(200).json(updatedAdopter)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete('/adopters/:id', async (req, res) => {
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
})

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
