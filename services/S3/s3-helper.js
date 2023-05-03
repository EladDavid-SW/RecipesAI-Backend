const S3Service = require('./s3')

// Create an instance of the S3 service

const AWS = require('aws-sdk')
const fs = require('fs')

class ImageService {
  constructor() {
    this.s3Service = new S3Service()
    this.Bucket = process.env.BUCKET_NAME
  }

  async uploadImage(imageURL, objectKey) {
    try {

      // Upload the image data to the S3 bucket
      const result = await this.s3Service.uploadImage(this.Bucket, objectKey, imageURL)

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
      const imageURL = await this.s3Service.getImage(this.Bucket, imageName)

      return imageURL
    } catch (error) {
      console.log(`Error retrieving image: ${error}`)
      throw error
    }
  }
}

module.exports = ImageService

// const S3Service = require('./s3')

// class ImageService {
//   constructor() {
//     this.s3Service = new S3Service()
//     this.Bucket = process.env.BUCKET_NAME
//     this.Key = process.env.OBJECT_KEY
//   }

//   async uploadImage(imageURL) {
//     try {
//       // Download the image data from the provided URL
//       const imageBuffer = await this.s3Service.downloadImage(imageURL)

//       // Upload the image data to the S3 bucket
//       const result = await this.s3Service.uploadImage(this.bucketName, this.objectKey, imageBuffer)

//       // Return the URL of the uploaded image
//       return result.Location
//     } catch (error) {
//       console.error(`Error uploading image: ${error}`)
//       throw error
//     }
//   }

//   async getImage() {
//     try {
//       // Get the image data from the S3 bucket
//       const imageData = await this.s3Service.getImage(this.bucketName, this.objectKey)

//       // Return the image data
//       return imageData.Body
//     } catch (error) {
//       console.error(`Error retrieving image: ${error}`)
//       throw error
//     }
//   }
// }

// module.exports = ImageService

