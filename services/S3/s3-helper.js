const S3Service = require('./s3')

// Create an instance of the S3 service

const AWS = require('aws-sdk')
const fs = require('fs')

class ImageService {
  constructor() {
    this.s3Service = new S3Service()
    this.Bucket = process.env.BUCKET_NAME
    this.Key = process.env.OBJECT_KEY
  }

  async uploadImage(imageURL, key) {
    try {
      // Get the image data from the request body
      const imageData = req.body

      // Upload the image data to the S3 bucket
      const result = await s3Service.uploadImage(this.Bucket, this.Key, imageData)

      // Return the result of the S3 operation
    } catch (error) {
      console.log(`Error uploading image: ${error}`)
      throw error
    }
  }

  async getImage(imageName) {
    // return a URL for the image in the s3 bucket
    try {
      // Get the image data from the S3 bucket
      const imageURL = await s3Service.getImage(this.Bucket, imageName)

      return imageURL
    } catch (error) {
      console.log(`Error retrieving image: ${error}`)
      throw error
    }
  }
}

module.exports = ImageService
