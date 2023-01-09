const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3500
const mongoose = require('mongoose')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConnection')
const credentials = require('./middleware/credentials')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')

mongoose.set('strictQuery', true)

connectDB()

app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))

app.use('/timer', require('./routes/api/timer'))

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
