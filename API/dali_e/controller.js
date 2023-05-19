class DaliEController {
  constructor(daliEService) {
    this.daliEService = daliEService;
  }

  async generateImages(req, res) {
    const { prompts  } = req.body;
    try {
      const response = await this.daliEService.generateImage(prompts);
      res.status(200).json({ images: response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

}

module.exports = DaliEController;
