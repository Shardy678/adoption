const express = require('express')
const router = express.Router()
const passport = require('passport')

const {
  createAdoption,
  getAdoptions,
  getAdoptionById,
  updateAdoption,
  deleteAdoption,
} = require('../controllers/adoptionsController')

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createAdoption
)
router.get('/', getAdoptions)
router.get('/:id', getAdoptionById)
router.put('/:id', updateAdoption)
router.delete('/:id', deleteAdoption)

module.exports = router
