import User from '../models/userModel.js';

export async function addFriend(req, res) {
  console.log(req.body,"x");
  console.log(req.user,"y");
  try {
    const { uniqueID } = req.body;
    const user = await User.findById(req.user.userId);
    const friend = await User.findOne({uniqueID});

    if (!friend) {
      return res.status(404).json({ success: false, message: 'Friend not found' });
    }

    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ success: false, message: 'Friend already added' });
    }

    user.friends.push(friend._id);
    //friend.friends.push(user._id);

    await user.save();
    //await friend.save();

    res.json({ success: true, message: 'Friend added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}