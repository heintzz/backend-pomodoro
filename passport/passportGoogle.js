const Timer = require('../model/Timer')
const User = require('../model/User')
const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth2').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3500/auth/google/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id })
        if (!user) {
          // If user is not found, create a new user
          user = new User({
            email: profile.email,
            googleId: profile.id,
          })

          await user.save()
          await Timer.create({
            userId: user._id,
          })
        }
        // Return the authenticated user
        done(null, user)
      } catch (err) {
        done(err)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})
