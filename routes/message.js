const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getMessagesByChatRoom } = require('../controllers/messageController');

router.get('/:chatRoomId', auth, getMessagesByChatRoom);

module.exports = router;
