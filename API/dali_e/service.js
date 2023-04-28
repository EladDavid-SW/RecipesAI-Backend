const axios = require('axios')

class DaliEService {
  constructor() {
    this.API_URL = 'https://api.openai.com/v1/images/generations'
    this.API_KEY = process.env.OPENAI_API_KEY
  }

  async generatePhoto(prompts) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.API_KEY}`,
    }

    let urls = []

    for (const prompt of prompts) {
      const data = {
        model: 'image-alpha-001',
        prompt: prompt,
        num_images: 1,
        size: '512x512',
        response_format: 'url',
      }

      const response = await axios.post(this.API_URL, data, { headers })
      if (response.data?.data?.[0]?.url) {
        urls.push({ prompt, url: response.data.data[0].url })
      } else {
        throw new Error('Unable to generate photo')
      }
    }
    return urls
  }
}

module.exports = DaliEService
