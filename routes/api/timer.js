const express = require('express')
const router = express.Router()
const timerController = require('../../controller/timerController')

router
    .route('/')
    .get(timerController.getTimer)
    .post(timerController.updateTimer)

module.exports = router
