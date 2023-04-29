class ChatGPTService {
  constructor() {
    const { Configuration, OpenAIApi } = require('openai')
    this.apiKey = process.env.OPENAI_API_KEY
    const config = new Configuration({ apiKey: this.apiKey })
    this.openai = new OpenAIApi(config)
  }

  async generateResponse(message) {
    const response = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      temperature: 1,
      max_tokens: 1000,
    })

    const { text } = response.data.choices[0]
    return text.trim()
  }
}

module.exports = ChatGPTService
