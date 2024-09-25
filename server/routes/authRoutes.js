const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateToken } = require('../utils/jwt')
const passport = require('passport')

router.post('/register', async (req, res) => {
  const { email, password, adopterDetails } = req.body
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      adopterDetails,
    })
    const savedUser = await newUser.save()

    // Generate a token
    const token = generateToken(savedUser)

    res.status(201).json({ token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user)
    res.json({ token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user data' })
    }
  }
)

router.put(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.body.userId, req.body, {
        new: true,
      })
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user data' })
    }
  }
)
module.exports = router
