const socketIO = require('socket.io');
const wsPort = process.env.WEBSOCKET_PORT || 3002;

module.exports = (server) => {
  const io = socketIO(server, {
    path: '/socket.io',
    serveClient: false,
    port: wsPort,
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    // Handle socket events here

     // Send a greeting message to the client
     socket.emit('greeting', 'Hello, client!');
  });

  return io;
};
