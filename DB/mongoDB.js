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

async function query(databaseName, collectionName, queryObj) {
  try {
    const db = client.db(databaseName)
    const collection = db.collection(collectionName)
    const result = await collection.find(queryObj).toArray()
    console.log('Query Done Successfully')
    return result
  } catch (err) {
    console.log('Error performing query:', err)
  }
}

async function create(databaseName, collectionName, document) {
  try {
    const db = client.db(databaseName)
    const collection = db.collection(collectionName)
    const newDoc = await collection.insertOne(document)
    console.log('Document inserted:', newDoc)
    return newDoc
  } catch (err) {
    console.log('Error inserting document:', err)
  }
}

async function deleteAll(databaseName, collectionName) {
  try {
    const db = client.db(databaseName)
    const collection = db.collection(collectionName)
    const result = await collection.deleteMany({})
    console.log(`Deleted ${result.deletedCount} documents from ${collectionName} collection`)
    return result
  } catch (err) {
    console.log('Error deleting documents:', err)
  }
}

module.exports = {
  connect,
  close,
  query,
  create,
  deleteAll,
}
