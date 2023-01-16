const User = require('../model/User')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.refreshToken) return res.sendStatus(401)
  const refreshToken = cookies.refreshToken
  const foundUser = await User.findOne({ refreshToken }).exec()
  if (!foundUser) return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403)
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          _id: foundUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    )
    res.json({ accessToken })
  })
}

module.exports = { handleRefreshToken }
