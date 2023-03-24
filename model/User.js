const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: function () {
      return !this.googleId
    },
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId
    },
  },
  googleId: {
    type: String,
    required: false,
  },
  refreshToken: String,
  // roles: {
  //   User: {
  //     type: Number,
  //     default: 150,
  //   },
  //   Editor: Number,
  //   Admin: Number,
  // },
})

module.exports = mongoose.model('User', userSchema)
