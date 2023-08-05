const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const port = 5000

const app = express()

// middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: false })) 

app.use('/api/goals', require('./routes/goalsRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Sever started on port ${port}`))