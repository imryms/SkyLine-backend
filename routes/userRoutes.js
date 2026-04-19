const middleware = require('../middleware')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get(
  '/profile',
  middleware.stripToken,
  middleware.verifyToken,
  userController.getProfile
)

router.put(
  '/profile',
  middleware.stripToken,
  middleware.verifyToken,
  userController.updateProfile
)

module.exports = router
