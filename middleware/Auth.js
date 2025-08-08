
// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// const SECRET_KEY = 'secretKey'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // get token from (bearer and token)
  const token = authHeader && authHeader.split(' ')[1];


  if (!token) return res.status(401).json({ message: 'Token missing' });

  // verify token using secret key
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
