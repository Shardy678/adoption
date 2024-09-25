const express = require('express')
const connectDB = require('../db')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const serverless = require('serverless-http')

const animalRoutes = require('../routes/animals')
const adopterRoutes = require('../routes/adopters')
const adoptionRoutes = require('../routes/adoptions')
const authRoutes = require('../routes/authRoutes')

const app = express()

// Connect to the database
connectDB()

// Use middleware
app.use(morgan('dev'))
app.use(express.json())

// CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://adoption-nosweats-projects.vercel.app/'
        : 'http://localhost:5173',
  })
)

// Initialize Passport for authentication
app.use(passport.initialize())
require('../config/passport')(passport)

// API Routes
app.use('/animals', animalRoutes)
app.use('/adopters', adopterRoutes)
app.use('/adoptions', adoptionRoutes)
app.use('/auth', authRoutes)

// Export Express app as serverless function
module.exports = app
module.exports.handler = serverless(app)

// app.listen(port, () => {
//   console.log(`Backend running on http://localhost:${port}`)
// })
