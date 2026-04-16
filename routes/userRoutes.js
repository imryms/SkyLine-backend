const middleware = require('../middleware')
const express = require('express')
const router = express.Router()

router.get(
  '/profile',
  middleware.stripToken,
  middleware.verifyToken,
  (req, res) => {
    res.send({
      msg: 'Access granted',
      user: res.locals.payload
    })
  }
)



module.exports = router
