const User = require('../model/User')
const Timer = require('../model/Timer')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
  const { email, password } = req.body
  if ((!email, !password))
    return res.status(400).json({ msg: 'email and password are required.' })

  const duplicate = await User.findOne({ email: email }).exec()
  if (duplicate)
    return res.status(409).json({ msg: 'user has already registered.' })
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email: email,
      password: hashedPassword,
    })
    await Timer.create({
      userId: user._id,
    })
    res.status(201).json({ msg: `new user ${email} created` })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}

module.exports = handleNewUser
