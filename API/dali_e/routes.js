const express = require('express');
const DaliEController = require('./controller');
const DaliEService = require('./service');

const router = express.Router();
const daliEService = new DaliEService();
const daliEController = new DaliEController(daliEService);

router.post('/', (req, res) => daliEController.generateImages(req, res));

module.exports = router;
