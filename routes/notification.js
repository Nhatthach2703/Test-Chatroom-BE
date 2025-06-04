const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getUnreadNotifications,
  markNotificationsRead,
} = require('../controllers/notificationController');

router.get('/', auth, getUnreadNotifications);
router.post('/read', auth, markNotificationsRead);

module.exports = router;
