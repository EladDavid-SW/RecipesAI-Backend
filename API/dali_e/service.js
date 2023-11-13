const axios = require('axios')
const S3Helper = require('../../services/S3/StoreImageService')

const store_in_s3 = async (imageUrl, objectKey) => {
  const s3 = new S3Helper()

  try {
    await s3.uploadImage(imageUrl, objectKey)
    console.log(`Image uploaded to S3 `)

    const url = await s3.getImage(objectKey)
    console.log(`Image retrieved from S3, url ${url}`)
    return url
  } catch (err) {
    console.error(`Error uploading image to S3: ${err}`)
    throw err
  }
}

class DaliEService {
  constructor() {
    this.API_URL = 'https://api.openai.com/v1/images/generations'
    this.API_KEY = process.env.OPENAI_API_KEY
  }

  async generateImage(prompts) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.API_KEY}`,
    }

    let urls = []

    for (const prompt of prompts) {
      const data = {
        prompt: prompt.prompt,
        num_images: 1,
        size: '512x512',
        response_format: 'url',
      }

      const response = await axios.post(this.API_URL, data, { headers })
      if (response.data?.data?.[0]?.url) {
        let tempUrl = response.data.data[0].url
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh   ' + tempUrl)
        let url = await store_in_s3(tempUrl, prompt.name)
        urls.push({ prompt, url: url, name: prompt.name })
      } else {
        throw new Error('Unable to generate photo')
      }
    }
    return urls
  }
}

module.exports = DaliEService
