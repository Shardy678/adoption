const express = require('express')
const connectDB = require('./db')
const morgan = require('morgan')
const cors = require('cors')

const animalRoutes = require('./routes/animals')
const adopterRoutes = require('./routes/adopters')

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

app.use('/animals', animalRoutes)
app.use('/adopters', adopterRoutes)

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
