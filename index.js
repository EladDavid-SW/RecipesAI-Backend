const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()


const S3Helper = require('./services/S3/s3-helper');

const s3 = new S3Helper();
// s3.uploadImage('https://fastly.picsum.photos/id/857/200/300.jpg?hmac=kFf6koUaHH4bIVWuoXIIsmZJQM_9Ew5l4AOeLL2UoG8')
//   .then((url) => {
//     console.log(`Image uploaded to S3 at ${url}`);
//   })
//   .catch((err) => {
//     console.error(`Error uploading image to S3: ${err}`);
//   });

  s3.getImage('test.jpg')
  .then((url) => {
    console.log(`Image retrived from S3, url ${url}`);

  })
  .catch((err) => {
    console.error(`Error uploading image to S3: ${err}`);
  });


const db = require('./DB/mongoDB.js')
const startDB = async () => {
  await db.connect()
  // await db.deleteAll('Recipes', 'images')
}
// startDB()

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

// Files of the Routes
const chatGPTRoutes = require('./api/chatGPT/routes')
const image = require('./API/image/routes')

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// Routes
server.use('/chatGPT', chatGPTRoutes)
server.use('/images', image)

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
