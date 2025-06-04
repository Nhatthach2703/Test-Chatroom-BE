const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  chatroom: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
