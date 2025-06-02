const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');

router.get('/rooms', async (req, res) => {
  const rooms = await ChatRoom.find();
  res.json(rooms);
});

router.post('/rooms', async (req, res) => {
  const room = await ChatRoom.create({ name: req.body.name });
  res.json(room);
});

router.get('/rooms/:roomId/messages', async (req, res) => {
  const messages = await Message.find({ chatRoomId: req.params.roomId }).sort({ createdAt: 1 });
  res.json(messages);
});

router.post('/messages', async (req, res) => {
  const { chatRoomId, sender, content } = req.body;
  const msg = await Message.create({ chatRoomId, sender, content });
  // Emit socket event cho phòng chat (chỉ emit nếu io tồn tại)
  const io = req.app.get('io');
  if (io) {
    io.to(chatRoomId).emit('newMessage', msg);
  }
  res.json(msg);
});

module.exports = router;
