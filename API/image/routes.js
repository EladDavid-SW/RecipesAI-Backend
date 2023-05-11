const express = require('express');
const ImageController = require('./controller');
const ImageService = require('./service');

const router = express.Router();
const imageService = new ImageService();
const imageController = new ImageController(imageService);

router.get('/', (req, res) => imageController.getImages(req, res));
// router.get('/:id', get_location)


module.exports = router;
