import { Router } from 'express';
import {addFriend} from '../controllers/addFriendController.js';
import authTokenMiddleware from '../middleware/authTokenMiddleware.js';
const router = Router();


router.post('/add-friend', authTokenMiddleware, addFriend);

export default router;