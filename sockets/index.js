const { Server } = require('socket.io');

function setupWebSocket(server) {
  const io = new Server(server, {
    transports: ['websocket']
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send a greeting message to the client
    socket.emit('greeting', 'Hello, client!');
  });
}

module.exports = setupWebSocket;
