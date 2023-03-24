const passport = require('passport')

const loginWithGoogle = (req, res, next) => {
  return passport.authenticate('google', { scope: ['email', 'profile'] })(
    req,
    res,
    next
  )
}

const callback = (req, res, next) => {
  return passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failed',
  })(req, res, next)
}

const loginSuccess = (req, res) => {
  res.sendStatus(200)
}

const loginFailed = (req, res) => {
  res.sendStatus(401)
}

module.exports = { loginWithGoogle, callback, loginSuccess, loginFailed }
