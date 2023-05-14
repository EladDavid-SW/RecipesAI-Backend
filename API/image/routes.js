const express = require('express')
const ImageController = require('./controller')
const ImageService = require('./service')
const socket = require('../../sockets')

const router = express.Router()
const imageService = new ImageService()
const imageController = new ImageController(imageService, socket.getSocketIO())

router.get('/', (req, res) => imageController.getImages(req, res))
// router.get('/:id', get_location)
router.post('/upload', (req, res) => imageController.uploadImage(req, res))

module.exports = router
