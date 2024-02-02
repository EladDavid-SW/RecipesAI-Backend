class ChatGPTService {
  constructor() {
    const OpenAI = require('openai')
    this.apiKey = process.env.OPENAI_API_KEY
    this.openai = new OpenAI({ apiKey: this.apiKey })
  }

  async generateResponse(message) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    })
    const text = response.choices[0].message.content
    return text.trim()
  }
}

module.exports = ChatGPTService
