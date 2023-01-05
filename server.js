const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3400
const mongoose = require('mongoose')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConnection')
const credentials = require('./middleware/credentials')

mongoose.set('strictQuery', true)

connectDB()

// optional
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())

app.use('/register', require('./routes/register'))

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
