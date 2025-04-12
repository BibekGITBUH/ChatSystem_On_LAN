import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Function to handle login
export async function loginCheck(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Create a JWT token if authentication is successful
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY, // Store this key in environment variables
      { expiresIn: '1h' } // Token expiration (optional)
    );

    // Send the token back to the client
    res.status(200).json({ success: true, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


