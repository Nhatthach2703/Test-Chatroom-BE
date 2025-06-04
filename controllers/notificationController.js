const Notification = require('../models/Notification');

exports.getUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id, isRead: false })
      .populate('chatroom', 'name')
      .populate('message');
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.markNotificationsRead = async (req, res) => {
  try {
    const { chatRoomId } = req.body;
    await Notification.updateMany(
      { user: req.user.id, chatroom: chatRoomId, isRead: false },
      { $set: { isRead: true } }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
