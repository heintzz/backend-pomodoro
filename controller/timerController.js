const Timer = require('../model/Timer')

const getTimer = async (req, res) => {
    const userSetting = await Timer.findOne({ userId: req.id })
    if (!userSetting) return res.sendStatus(401)
    res.json(userSetting)
}

module.exports = { getTimer }
