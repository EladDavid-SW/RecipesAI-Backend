const express = require('express')
const ImageController = require('./controller')
const ImageService = require('./service')
const socket = require('../../sockets')

const router = express.Router()
const imageService = new ImageService()
const imageController = new ImageController(imageService, socket.getSocketIO())

router.get('/', (req, res) => imageController.getImages(req, res))

module.exports = router
