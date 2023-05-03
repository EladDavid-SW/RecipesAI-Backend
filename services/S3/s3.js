const AWS = require('aws-sdk');

class S3Service {
  constructor() {
    // Create an instance of the S3 service
    this.s3 = new AWS.S3();
  }

  async uploadImage(bucketName, objectKey, imageData) {
    // Define the parameters for the S3 putObject operation
    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: imageData
    };

    // Upload the image data to the S3 bucket
    const result = await this.s3.putObject(params).promise();

    return result;
  }

  async getImage(bucketName, objectKey) {
    // Define the parameters for the S3 getObject operation
    const params = {
      Bucket: bucketName,
      Key: objectKey
    };

    // Get the image data from the S3 bucket
    const url = await this.s3.getSignedUrl('getObject', params);

    return url;
  }
}

module.exports = S3Service;



