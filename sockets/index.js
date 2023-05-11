const { Server } = require('socket.io');

function setupWebSocket(server, imageService) {
  const io = new Server(server, {
    transports: ['websocket'],
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send a greeting message to the client
    socket.emit('greeting', 'Hello, client!');
  });

  // Handle image upload event
  io.on('uploadImage', async (imageData) => {
    try {
      // Save the image to the database
      const newImage = await imageService.saveImage(imageData);

      // Emit the new image URL to all connected clients
      io.emit('newImage', newImage.url);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  });
}

module.exports = setupWebSocket;
