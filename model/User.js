const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 150,
    },
    Editor: Number,
    Admin: Number,
  },
  refreshToken: String,
})

module.exports = mongoose.model('User', userSchema)
