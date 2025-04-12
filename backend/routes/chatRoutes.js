import { Router } from 'express';
import User from '../models/chatModel.js';
import authTokenMiddleware from '../middleware/authTokenMiddleware.js';
const router = Router();

router.get('/:recipient', authTokenMiddleware, async (req, res) => {
  const { recipient } = req.params;
  const userEmail = req.user.email;
  try {
    const chats = await User.find({
      $or: [
        { sender: userEmail, recipient },
        { sender: recipient, recipient: userEmail }
      ]
    }).sort('timestamp');
    res.json({ success: true, chats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;