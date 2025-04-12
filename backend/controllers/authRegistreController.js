import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

const registerUser = async (req, res) => {
  const { uniqueID, email, password } = req.body;

  try {
    // Check if uniqueID or email already exists
    const existingUser = await User.findOne({ $or: [{ uniqueID }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Unique ID or Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ uniqueID, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
};
 export default registerUser