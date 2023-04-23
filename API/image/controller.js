class ImageController {
  constructor(imageService) {
    this.imageService = imageService;
  }

  async getImages(req, res) {
    const { images  } = req.body;
    try {
      const response = await this.imageService.getImages(images);
      res.status(200).json({ images: response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

}

module.exports = ImageController;
