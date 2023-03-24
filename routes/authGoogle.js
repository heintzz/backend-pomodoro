const express = require('express')
const router = express.Router()
const {
  loginWithGoogle,
  callback,
  loginSuccess,
  loginFailed,
} = require('../controller/authGoogleController')
require('../passport/passportGoogle')

router.route('/').get(loginWithGoogle)
router.route('/callback').get(callback)
router.route('/success').get(loginSuccess)
router.route('/failed').get(loginFailed)

module.exports = router
