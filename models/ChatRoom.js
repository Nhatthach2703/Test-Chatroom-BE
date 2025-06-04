const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  name: { type: String, default: null },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
