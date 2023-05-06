const AWS = require('aws-sdk')
const axios = require('axios')

class S3Service {
  constructor(bucket) {
    // Create an instance of the S3 service
    this.bucket = bucket
    this.s3 = new AWS.S3()
  }

  async uploadImage(objectKey, imageUrl) {
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
      const imageBuffer = Buffer.from(response.data, 'binary')
      const contentType = response.headers['content-type']
      const uploadParams = {
        Bucket: this.bucket,
        Key: objectKey,
        Body: imageBuffer,
        ContentType: contentType,
      }
      const data = await this.s3.upload(uploadParams).promise()
      console.log(`Image uploaded successfully to S3: ${data.Location}`)
      return data.Location
    } catch (error) {
      console.error('Error uploading image to S3:', error)
      throw error
    }
  }

  async getImage(objectKey) {
    try {
      await this.s3.headObject({ Bucket: this.bucket, Key: objectKey }).promise()
      const params = {
        Bucket: this.bucket,
        Key: objectKey,
      }
      const url = await this.s3.getSignedUrl('getObject', params)
      return url
    } catch (error) {
      console.error('Error getting image from S3:', error)
      throw error
    }
  }

  async isImageExists(objectKey) {
    try {
      await this.s3.headObject({ Bucket: this.bucket, Key: objectKey }).promise()
      return true
    } catch (error) {
      if (error.code === 'NotFound') {
        return false
      } else {
        throw error
      }
    }
  }
}

module.exports = S3Service
