const express = require('express')
const { handleRefreshToken } = require('../controller/refreshTokenController')
const router = express.Router()

router.route('/').get(handleRefreshToken)

module.exports = router
