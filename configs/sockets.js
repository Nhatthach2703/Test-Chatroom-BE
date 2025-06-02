const socketIo = require('socket.io');
const Message = require('../models/Message');

function initSocket(server) {
  const io = socketIo(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
    });

    socket.on('sendMessage', async ({ chatRoomId, sender, content }) => {
      const msg = await Message.create({ chatRoomId, sender, content });
      io.to(chatRoomId).emit('newMessage', msg);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = initSocket;
