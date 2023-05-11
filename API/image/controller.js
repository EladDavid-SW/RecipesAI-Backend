class ImageController {
  constructor(imageService) {
    this.imageService = imageService;
  }

  async getImages(req, res) {
    try {
      const response = await this.imageService.getImages();
      res.status(200).json({ images: response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

}

module.exports = ImageController;
