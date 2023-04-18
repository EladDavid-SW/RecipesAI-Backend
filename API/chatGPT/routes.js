const express = require('express');
const ChatGPTController = require('./controller');
const ChatGPTService = require('./service');

const router = express.Router();
const chatGPTService = new ChatGPTService();
const chatGPTController = new ChatGPTController(chatGPTService);

router.post('/', (req, res) => chatGPTController.generateResponse(req, res));

module.exports = router;
