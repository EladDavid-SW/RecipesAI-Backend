const S3Service = require('./s3')

// Create an instance of the S3 service

const AWS = require('aws-sdk')
const fs = require('fs')

class ImageService {
  constructor() {
    this.s3Service = new S3Service(process.env.IMAGES_BUCKET_NAME)
  }

  async uploadImage(imageURL, objectKey) {
    try {
      // Upload the image data to the S3 bucket
      const result = await this.s3Service.uploadImage(objectKey, imageURL)

      // Return the result of the S3 operation
    } catch (error) {
      console.log(`Error uploading image: ${error}`)
      throw error
    }
  }

  async getImage(objectKey) {
    // return a URL for the image in the s3 bucket
    try {
      // Get the image data from the S3 bucket
      const imageURL = await this.s3Service.getImage(objectKey)

      return imageURL
    } catch (error) {
      console.log(`Error retrieving image: ${error}`)
      throw error
    }
  }

  async objectExists(objectKey) {
    try {
      return await this.s3Service.isImageExists(objectKey)
    } catch (error) {
      console.log(`Error retrieving image: ${error}`)
      throw error
    }
  }
}

module.exports = ImageService
