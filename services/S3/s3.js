const AWS = require('aws-sdk')
const axios = require('axios');


class S3Service {
  constructor() {
    // Create an instance of the S3 service
    this.s3 = new AWS.S3()
  }

  async uploadImage(bucketName, objectKey, imageUrl) {
    axios
      .get(imageUrl, { responseType: 'arraybuffer' })
      .then((response) => {
        const imageBuffer = Buffer.from(response.data, 'binary')
        const contentType = response.headers['content-type']
        const uploadParams = {
          Bucket: bucketName,
          Key: objectKey,
          Body: imageBuffer,
          ContentType: contentType,
        }
        return this.s3.upload(uploadParams).promise()
      })
      .then((data) => {
        console.log(`Image uploaded successfully to S3: ${data.Location}`)
      })
      .catch((error) => {
        console.error('Error uploading image to S3:', error)
      })
  }

  async getImage(bucketName, objectKey) {
    // Define the parameters for the S3 getObject operation
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    }

    // Get the image data from the S3 bucket
    const url = await this.s3.getSignedUrl('getObject', params)

    return url
  }
}

module.exports = S3Service
