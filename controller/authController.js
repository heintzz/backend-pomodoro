const User = require('../model/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ msg: 'email and password are required.' })

  const foundUser = await User.findOne({ email: email }).exec()

  if (!foundUser) return res.status(401)
  const match = await bcrypt.compare(password, foundUser.password)
  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          _id: foundUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15s' }
    )

    const refreshToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          _id: foundUser._id,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    foundUser.refreshToken = refreshToken
    await foundUser.save()
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 3600 * 1000,
    })
    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
}

const handleLogout = async (req, res) => {
  res.cookie('refreshToken', '', {
    maxAge: 0,
  })
  res.sendStatus(200)
}

module.exports = { handleLogin, handleLogout }
