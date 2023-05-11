const AWS = require('aws-sdk')
const dbHelper = require('../../services/db/dbHelper')
const StoreImageService = require('../../services/S3/StoreImageService')

class ImageService {
  constructor() {
    const DaliEService = require('../dali_e/service')
    this.daliEService = new DaliEService()
    this.storeImage = new StoreImageService()
    this.objectId = null // Initialize the objectId property
  }

  async fetchImages() {
    try {
      let result = await dbHelper.query('getImages')
      let groceriesObj = result[0]
      if (!groceriesObj) {
        return []
      }
      console.log(groceriesObj)
      this.objectId = groceriesObj._id // Store the object ID
      return groceriesObj.images
    } catch (err) {
      console.error('Error fetching images:', err)
      return [] // Return an empty array in case of an error
    }
  }
  async existInDB(name) {
    let groceries = await this.fetchImages()
    return groceries.includes(name)
  }

  async saveImage(imageID) {
   return this.getImagesService([imageID])
  }

  async getImages() {
    this.saveImage('pink lemon')
    let groceries = await this.fetchImages()
    return groceries ? this.getImagesService(groceries) : []
  }

  async getImagesService(groceries) {
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
        prompts.push({ prompt: `bright warm white background with the grocery: ${grocery}`, name: grocery })
      }

      // Generate images from Dali-E endpoint
      let new_images = await this.daliEService.generatePhoto(prompts)

      for (let new_image of new_images) {
        // Store the results in s3:
        let name = new_image.name
        let url = this.storeImage.getImageUrl(name)
        imagesUrl.push({ name, url })

        // store in db
        if (!await this.existInDB(name)) {
          await dbHelper.query('updateImages', { id: this.objectId, item: name })
        }
      }
    }

    return imagesUrl
  }
}

module.exports = ImageService


