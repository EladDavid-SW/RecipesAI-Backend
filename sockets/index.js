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
        socket.emit('newImage', newImage)
      } catch (error) {
        console.error('Error saving image:', error)
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
