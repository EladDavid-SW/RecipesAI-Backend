const { MongoClient } = require('mongodb')

const uri = process.env.MONGO_URI

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

async function connect() {
  try {
    await client.connect()
    console.log('Connected to MongoDB Atlas')
  } catch (err) {
    console.log('Error connecting to MongoDB Atlas:', err)
  }
}

async function close() {
  try {
    await client.close()
    console.log('Disconnected from MongoDB Atlas')
  } catch (err) {
    console.log('Error disconnecting from MongoDB Atlas:', err)
  }
}

module.exports = {
  connect,
  close,
  client,
}
