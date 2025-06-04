const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createChatRoom,
  getUserChatRooms,
  getChatRoomById,
  addParticipant,
} = require('../controllers/chatroomController');

router.post('/', auth, createChatRoom);                 // Tạo chatroom mới
router.get('/', auth, getUserChatRooms);                // Lấy danh sách chatroom user tham gia
router.get('/:id', auth, getChatRoomById);              // Lấy chatroom theo id
router.post('/:id/participants', auth, addParticipant); // Thêm người dùng vào chatroom

module.exports = router;
