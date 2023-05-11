const { client } = require('./db')
const queries = require('./queries')
let databaseName = process.env.DB_NAME

async function query(queryName, param) {
  return new Promise(async (resolve, reject) => {
    try {
      const queryObj = queries[queryName](param)
      const { collectionName, query, update } = queryObj
      const db = client.db(databaseName)
      const collection = db.collection(collectionName)

      if (update) {
        const result = await collection.updateOne(query, update)
        console.log('Update Successful:', result)
        resolve(result)
      } else {
        const result = await collection.find(query).toArray()
        console.log('Query Done Successfully')
        resolve(result)
      }
    } catch (err) {
      console.log('Error performing query:', err)
      reject(err)
    }
  })
}

async function create(collectionName, document) {
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

async function deleteAll(collectionName) {
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
  query,
  create,
  deleteAll,
}
