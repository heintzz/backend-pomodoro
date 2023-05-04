const express = require('express')
const { handleLogin, handleLogout } = require('../controller/authController')
const router = express.Router()

router.post('/', handleLogin)
router.get('/logout', handleLogout)

module.exports = router
