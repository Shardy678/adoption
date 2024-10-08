const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.JWT_SECRET || 'your_jwt_secret'

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    secret,
    {
      expiresIn: '96h',
    }
  )
}

module.exports = { generateToken }
