import express from 'express';
const router = express.Router();
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import addFriendRoutes from './routes/addFriendRoutes.js';

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/check', userRoutes);
router.use('/api/chats', chatRoutes);
router.use('/api/add', addFriendRoutes);

export default router;