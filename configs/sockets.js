// const Message = require('../models/Message');
// const Notification = require('../models/Notification');
// const ChatRoom = require('../models/ChatRoom');

// module.exports = (io) => {
//   io.on('connection', (socket) => {
//     socket.on('joinRoom', (roomId) => {
//       socket.join(roomId);
//     });

//     socket.on('sendMessage', async ({ chatRoomId, senderId, content }) => {
//       const message = await Message.create({ chatRoomId, sender: senderId, content });

//       // Gửi đến tất cả user trong phòng
//       io.to(chatRoomId).emit('receiveMessage', message);

//       // Tạo notification cho user khác
//       const room = await ChatRoom.findById(chatRoomId);
//       for (let uid of room.participants) {
//         if (uid.toString() !== senderId) {
//           await Notification.create({
//             user: uid,
//             chatroom: chatRoomId,
//             message: message._id
//           });
//         }
//       }
//     });
//   });
// };



const Message = require('../models/Message');
const Notification = require('../models/Notification');
const ChatRoom = require('../models/ChatRoom');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`Socket ${socket.id} left room ${roomId}`);
    });

    // Khi client gửi tin nhắn
    socket.on('sendMessage', async ({ chatRoomId, senderId, content }) => {
      try {
        const message = await Message.create({ chatRoomId, sender: senderId, content });
        
        // Phát tin nhắn realtime đến phòng chat
        io.to(chatRoomId).emit('receiveMessage', message);

        // Tạo notification cho từng user tham gia trừ sender
        const room = await ChatRoom.findById(chatRoomId);
        for (let uid of room.participants) {
          if (uid.toString() !== senderId) {
            await Notification.create({
              user: uid,
              chatroom: chatRoomId,
              message: message._id,
              isRead: false
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    });

    // Khi client đánh dấu notification đã đọc
    socket.on('markNotificationRead', async ({ userId, chatRoomId }) => {
      try {
        await Notification.updateMany(
          { user: userId, chatroom: chatRoomId, isRead: false },
          { $set: { isRead: true } }
        );
        // Có thể emit update nếu cần
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
