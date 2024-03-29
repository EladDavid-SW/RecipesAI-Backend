const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')

const { connect } = require('./services/db/db')
connect()
require('./workers/dispatchWorkers')

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Files of the Routes
const chatGPTRoutes = require('./API/chatGPT/routes')
const image = require('./API/image/routes')
const daliE = require('./API/dali_e/routes')

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
