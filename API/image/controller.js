
class ImageController {
  constructor(imageService, io) {
    this.imageService = imageService;
    this.io = io; 
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

  async uploadImage(req, res) {
    try {
      const { images } = req.body;
  
      // Send the image data to the WebSocket server
      io.emit('uploadImage', images);
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
  

}

module.exports = ImageController;
