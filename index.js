const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
require('dotenv').config()
// const db = require('./DB/mongoDB.js')

// // const startDB = async () => {
// //   await db.connect()
// //   // await db.deleteAll('Recipes', 'images')
// // }
// // startDB()
// require('./services/db/initOperations')

const { connect } = require('./services/db/db')
connect()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Files of the Routes
const chatGPTRoutes = require('./api/chatGPT/routes')
const image = require('./API/image/routes')
const daliE = require('./API/dali_e/routes')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// Routes
app.use('/chatGPT', chatGPTRoutes)
app.use('/image', image)
app.use('/dali_e', daliE)

const server = http.createServer(app)

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log(`REST API server listening on port ${port}`)
})

// Initialize WebSocket
const { setupWebSocket } = require('./sockets')
setupWebSocket(server)
