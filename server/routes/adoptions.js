const express = require('express')
const router = express.Router()

const {
  createAdoption,
  getAdoptions,
  getAdoptionById,
  updateAdoption,
  deleteAdoption,
} = require('../controllers/adoptionsController')

router.post('/', createAdoption)
router.get('/', getAdoptions)
router.get('/:id', getAdoptionById)
router.put('/:id', updateAdoption)
router.delete('/:id', deleteAdoption)

module.exports = router
