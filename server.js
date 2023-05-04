const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConnection')
const cookieParser = require('cookie-parser')
require('dotenv').config()
// middleware
const credentials = require('./middleware/credentials')
const session = require('express-session')
const PORT = process.env.PORT || 3500
mongoose.set('strictQuery', true)
connectDB()

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
)

app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register'))
app.use('/refresh', require('./routes/refresh'))

app.use('/timer', require('./routes/api/timer'))

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
