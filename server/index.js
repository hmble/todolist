const express = require('express')

// TODO: Remove this
const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')
// Import routes
const userRoute = require('./routes/users.route')
const todoRoute = require('./routes/todos.route')
const uploadRoute = require('./routes/upload.route')
const middleware = require('./middleware')

const app = express()
const port = 5000

// use bodyparser
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', userRoute)
app.use('/api/todo', middleware.checkauth, todoRoute)
app.use('/api/upload', middleware.checkauth, uploadRoute)

app.listen(port, () =>
  console.log(`Listening on port: http://localhost:${port}`)
)
