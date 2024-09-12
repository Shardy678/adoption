const express = require('express')
const router = express.Router()

const {
  createAdopter,
  getAdopters,
  getAdopterById,
  updateAdopter,
  deleteAdopter,
} = require('../controllers/adoptersController')

router.post('/', createAdopter)
router.get('/', getAdopters)
router.get('/:id', getAdopterById)
router.put('/:id', updateAdopter)
router.delete('/:id', deleteAdopter)

module.exports = router
