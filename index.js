const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const db = require('./DB/mongoDB.js')
db.connect()


const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

// Files of the Routes
const chatGPTRoutes = require('./api/chatGPT/routes')
const image = require('./API/image/routes')

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// Routes
server.use('/chatGPT', chatGPTRoutes)
server.use('/images', image)

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
