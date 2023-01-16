const Timer = require('../model/Timer')

const getTimer = async (req, res) => {
  const userSetting = await Timer.findOne({ userId: req.id })
  if (!userSetting) return res.sendStatus(401)
  res.json(userSetting)
}

const updateTimer = async (req, res) => {
  let types = Object.keys(req.body)
  const userSetting = await Timer.findOne({ userId: req.id })
  if (!userSetting) return res.sendStatus(401)
  types.forEach((type) => {
    userSetting[type] = req.body[type]
  })
  const setting = await userSetting.save()
  res.json(setting)
}

module.exports = { getTimer, updateTimer }
