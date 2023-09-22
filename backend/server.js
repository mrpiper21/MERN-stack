const port = process.env.PORT || 5000
const express = require('express')
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')

const connectDB = require('./config/db')

const dotenv = require('dotenv')
dotenv.config()

connectDB()

const app = express()

// middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalsRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Sever started on port ${port}`))