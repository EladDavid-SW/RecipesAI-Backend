const express = require('express');
const ImageController = require('./controller');
const ImageService = require('./service');

const router = express.Router();
const imageService = new ImageService();
const imageController = new ImageController(imageService);

router.post('/', (req, res) => imageController.getImages(req, res));

module.exports = router;
