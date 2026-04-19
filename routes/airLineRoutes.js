const express = require('express')
const router = express.Router()
const airLineController = require('../controllers/airLineController')

router.post('/', airLineController.createAirline)
router.get('/', airLineController.getAllAirLines)
router.get('/:id', airLineController.getAirLineById)
router.put('/:id', airLineController.updateAirLine)
router.delete('/:id', airLineController.deleteAirLine)

module.exports = router;
