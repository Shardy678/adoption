const express = require('express')
const router = express.Router()
const passport = require('passport')
const roleMiddleware = require('../middleware/role')

const {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} = require('../controllers/animalsController')

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  roleMiddleware('admin'),
  createAnimal
)
router.get('/', getAnimals)
router.get('/:id', getAnimalById)
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  updateAnimal
)
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteAnimal
)

module.exports = router
