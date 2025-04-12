const validateRegistration = (req, res, next) => {
    const { uniqueID, email, password } = req.body;
  
    // Check if all fields are provided
    if (!uniqueID || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
  
    // Validate uniqueID
    if (typeof uniqueID !== 'string' || uniqueID.trim().length < 6) {
      return res.status(400).json({ success: false, message: 'Unique ID must be at least 6 characters long' });
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }
  
    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
    }
  
    // If all validations pass, proceed to the next middleware or route handler
    next();
  };
  
  export default validateRegistration ;
  