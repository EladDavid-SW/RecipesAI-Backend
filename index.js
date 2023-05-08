const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const db = require('./DB/mongoDB.js')

// const startDB = async () => {
//   await db.connect()
//   // await db.deleteAll('Recipes', 'images')
// }
// startDB()

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

const restPort = process.env.REST_PORT || 3001
const serverInstance = server.listen(restPort, () => {
  console.log(`REST API server listening on port ${restPort}`)
});

const io = require('./sockets')(serverInstance);

// const wsPort = process.env.WEBSOCKET_PORT || 3000;

// io.listen(wsPort, () => {
//   console.log(`WebSocket server listening on port ${wsPort}`);
// });

module.exports = io;
