const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const db = require('./DB/mongoDB.js')

const startDB = async () => {
  await db.connect()
  // await db.deleteAll('Recipes', 'images')
}
startDB()

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

// Files of the Routes
const chatGPTRoutes = require('./api/chatGPT/routes')
const image = require('./API/image/routes')
const daliE = require('./API/dali_e/routes')

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// Routes
server.use('/chatGPT', chatGPTRoutes)
server.use('/images', image)
server.use('/dali_e', daliE)

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
