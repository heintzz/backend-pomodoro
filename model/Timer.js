const mongoose = require('mongoose')
const { Schema } = mongoose

const timerSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    pomodoroDuration: {
        type: Number,
        default: 25 * 60,
    },
    shortBreakDuration: {
        type: Number,
        default: 5 * 60,
    },
    longBreakDuration: {
        type: Number,
        default: 15 * 60,
    },
})

module.exports = mongoose.model('Timer', timerSchema)
