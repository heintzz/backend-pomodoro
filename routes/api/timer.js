const express = require('express')
const router = express.Router()
const timerController = require('../../controller/timerController')
const verifyJWT = require('../../middleware/verifyJWT')

router.route('/').get(verifyJWT, timerController.getTimer)

module.exports = router
