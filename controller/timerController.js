const Timer = require('../model/Timer')

const getTimer = async (req, res) => {
    const userSetting = await Timer.findOne({ userId: req.id })
    if (!userSetting) return res.sendStatus(401)
    res.json(userSetting)
}

const updateTimer = async (req, res) => {
    const { durations, types } = req.body
    const userSetting = await Timer.findOne({ userId: req.id })
    if (!userSetting) return res.sendStatus(401)
    types.forEach((type, i) => {
        userSetting[type] = durations[i]
    })

    const setting = await userSetting.save()
    res.json(setting)
}

module.exports = { getTimer, updateTimer }
