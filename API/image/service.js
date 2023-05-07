const AWS = require('aws-sdk')
const StoreImageService = require('../../services/S3/StoreImageService')

class ImageService {
  constructor() {
    const DaliEService = require('../dali_e/service')
    this.daliEService = new DaliEService()
    this.storeImage = new StoreImageService()
  }

  async getImages(groceries) {
    const groceriesWithUnderscores = groceries.map((grocery) => {
      return grocery.replace(/ /g, '_')
    })
    groceries = groceriesWithUnderscores

    let imagesUrl = []
    let toGenerateImages = []

    for (let grocery of groceries) {
      const objectKey = grocery
      const exists = await this.storeImage.objectExists(objectKey)
      if (exists) {
        const url = this.storeImage.getImageUrl(objectKey)
        imagesUrl.push({ name: grocery, url })
      } else {
        toGenerateImages.push(grocery)
      }
    }
    if (toGenerateImages.length > 0) {
      let prompts = []
      for (let grocery of toGenerateImages) {
        prompts.push({ prompt: `white background with the grocery: ${grocery}`, name: grocery })
      }

      // Generate images from Dali-E endpoint
      let new_images = await this.daliEService.generatePhoto(prompts)

      // Store the results in DB:
      for (let new_image of new_images) {
        let name = new_image.name
        let url = `https://recipes-elad-project.s3.amazonaws.com/${name}`
        imagesUrl.push({ name, url })
      }
    }

    return imagesUrl
  }
}

module.exports = ImageService
