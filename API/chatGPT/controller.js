class ChatGPTController {
  constructor(chatGPTService) {
    this.chatGPTService = chatGPTService;
  }

  async generateResponse(req, res) {
    const { message } = req.body;

    try {
      const response = await this.chatGPTService.generateResponse(message);
      res.status(200).json({ message: response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = ChatGPTController;
