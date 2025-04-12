import { Router } from 'express';
import User from '../models/userModel.js';
import authTokenMiddleware from '../middleware/authTokenMiddleware.js';

const router = Router();

router.post('/check-unique-id',authTokenMiddleware, async (req, res) => {
  const { uniqueID } = req.body;
  console.log(req.body);
  try {
    console.log(uniqueID);
    const user = await User.findOne({ uniqueID }).select('uniqueID');
    console.log(user);
    if(!user){
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json({success: true,user});
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Get user details
router.get('/me',authTokenMiddleware, async (req, res) => {
  console.log(req.user,"me&friends");
  try {
    const user = await User.findOne({ email: req.user.email }).select('uniqueID email');
    const userFriends = await User.findOne({ email: req.user.email }).select('friends');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if(!userFriends){
      return res.status(404).json({ error: 'UserFriends not found' });
    }
    console.log(userFriends,"userFriends")

    const friends=userFriends.friends
    const email=[];

    for (const friendId of friends) {
      const friend = await User.findById(friendId).select('email');
      console.log(friends,"friends");
      console.log(friend,"friend");
      console.log(friendId,"friendId");
      console.log(friend.email,"friend.email");
      if (friend) {
        email.push({ email: friend.email });
      }
    }
    res.json({user,friends:email});
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;
 