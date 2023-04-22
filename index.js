const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

// Files of the Routes
const chatGPTRoutes = require('./api/chatGPT/routes')
const dali_e = require('./API/dali_e/routes')

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// Routes
server.use('/chatGPT', chatGPTRoutes)
server.use('/dali_e', dali_e)

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
