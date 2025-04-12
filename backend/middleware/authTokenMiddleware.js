import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];


const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access Denied: No token provided' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //  if (!verified || !verified.id) {
    //   return res.status(400).json({ error: 'Invalid token structure' });
    //  }
    req.user = verified; // Attach decoded token payload (e.g., user ID) to req.user
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
