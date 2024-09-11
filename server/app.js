const express = require('express')
const connectDB = require('./db')
const morgan = require('morgan')
const Kitten = require('./models/Kitten')

const app = express()
const port = 3000
connectDB()

app.use(morgan('dev'))
app.use(express.json())

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

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
