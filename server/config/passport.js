const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/User')
require('dotenv').config()

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id)
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      } catch (error) {
        console.error(error)
        return done(error, false)
      }
    })
  )
}
