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
    const OpenAI = require('openai')
    this.apiKey = process.env.OPENAI_API_KEY
    this.openai = new OpenAI({ apiKey: this.apiKey })
  }

  async generateImage(prompts) {


    let urls = []

    for (const prompt of prompts) {
   
      const response = await this.openai.images.generate({
        model: "dall-e-3",
        prompt: prompt.prompt,
        n: 1,
        size: "1024x1024",
      });
      if (response.data?.[0]?.url) {
        let tempUrl = response.data[0].url
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
