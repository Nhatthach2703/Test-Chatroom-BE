const ChatRoom = require('../models/ChatRoom');
const User = require('../models/User');

exports.createChatRoom = async (req, res) => {
  try {
    const { name, participants } = req.body;
    const createdBy = req.user.id;

    // Đảm bảo người tạo luôn là participant
    const participantsArr = participants || [];
    if (!participantsArr.includes(createdBy)) participantsArr.push(createdBy);

    const chatRoom = new ChatRoom({ name, participants: participantsArr, createdBy });
    await chatRoom.save();

    res.json(chatRoom);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getUserChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find({ participants: req.user.id }).populate('participants', 'username');
    res.json(chatRooms);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getChatRoomById = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id).populate('participants', 'username');
    if (!chatRoom) return res.status(404).json({ msg: 'ChatRoom not found' });
    res.json(chatRoom);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.addParticipant = async (req, res) => {
  try {
    const { userId } = req.body;
    const chatRoom = await ChatRoom.findById(req.params.id);
    if (!chatRoom) return res.status(404).json({ msg: 'ChatRoom not found' });

    if (!chatRoom.participants.includes(userId)) {
      chatRoom.participants.push(userId);
      await chatRoom.save();
    }

    res.json(chatRoom);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
