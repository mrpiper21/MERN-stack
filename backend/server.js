const port = process.env.PORT || 5000
const express = require('express')
const colors = require('colors')
const goalRoutes = require('./routes/goalsRoutes')
const userRoutes = require('./routes/userRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')

const connectDB = require('./config/db')

const dotenv = require('dotenv')
dotenv.config()

connectDB()

const app = express()

// middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Sever started on port ${port}`))