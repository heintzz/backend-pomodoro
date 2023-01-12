const mongoose = require('mongoose')
const { Schema } = mongoose

const timerSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    pomodoroDuration: {
        type: Number,
        default: 25,
    },
    shortBreakDuration: {
        type: Number,
        default: 5,
    },
    longBreakDuration: {
        type: Number,
        default: 15,
    },
})

module.exports = mongoose.model('Timer', timerSchema)
