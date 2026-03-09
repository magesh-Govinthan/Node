import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Model/schema.js';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
 const authHeader = req.header("Authorization") || req.query.token;

  if (!authHeader) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid Token Format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

export default authMiddleware;