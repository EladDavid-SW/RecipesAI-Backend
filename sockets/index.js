const { Server } = require('socket.io')
const ImageService = require('../API/image/service')

let ioInstance

function setupWebSocket(server) {
  const io = new Server(server, {
    transports: ['websocket'],
  })

  const imageService = new ImageService()

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    // Send a greeting message to the client
    socket.emit('greeting', 'Hello, client!')

    // Handle image upload event
    socket.on('uploadImage', async (imageData) => {
      try {
        console.log('uploadImage')
        // Save the image to the database
        let { images } = imageData
        const newImage = await imageService.saveImage(images)

        // Emit the new image URL to all connected clients
        io.emit('newImage', newImage)
      } catch (error) {
        console.error('Error saving image:', error)
      }
    })

    // Handle image delete event
    socket.on('deleteImage', async (imageName) => {
      try {
        console.log('deleteImage')
        // Delete the image
        const imageUrl = await imageService.deleteImage(imageName)

        // Emit the result to the client
        io.emit('imageRemoved', imageUrl)
      } catch (error) {
        console.error('Error deleting image:', error)
      }
    })
  })

  ioInstance = io

  return io
}

function getSocketIO() {
  return ioInstance
}

module.exports = {
  setupWebSocket,
  getSocketIO,
}
