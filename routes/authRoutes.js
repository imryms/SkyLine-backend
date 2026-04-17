const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const middleware = require('../middleware')


router.post('/register', authController.Register)
router.post('/login',authController.Login)

router.put(
  '/updatePassword',
  middleware.stripToken,
  middleware.verifyToken,
  authController.UpdatePassword
)

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  authController.CheckSession
)


module.exports = router
