// const Message = require('../models/Message');
// const Notification = require('../models/Notification');
// const ChatRoom = require('../models/ChatRoom');

// exports.getMessages = async (req, res) => {
//   const { chatRoomId } = req.params;
//   try {
//     const messages = await Message.find({ chatRoomId }).populate('sender', 'username');
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.sendMessage = async (req, res) => {
//   const { chatRoomId } = req.params;
//   const { content } = req.body;
//   try {
//     const message = new Message({
//       chatRoomId,
//       sender: req.user.id,
//       content,
//     });
//     await message.save();

//     // Tạo notification cho các participant khác
//     const chatRoom = await ChatRoom.findById(chatRoomId);
//     const otherParticipants = chatRoom.participants.filter(
//       (participant) => participant.toString() !== req.user.id
//     );

//     const notifications = otherParticipants.map((userId) => ({
//       user: userId,
//       chatroom: chatRoomId,
//       message: message._id,
//     }));

//     await Notification.insertMany(notifications);

//     // Emit message qua Socket.IO
//     req.io.to(chatRoomId).emit('newMessage', {
//       message,
//       sender: req.user.id,
//     });

//     res.status(201).json(message);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };



const Message = require('../models/Message');

exports.getMessagesByChatRoom = async (req, res) => {
  try {
    const messages = await Message.find({ chatRoomId: req.params.chatRoomId })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });  // Tin nhắn theo thời gian tăng dần
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
