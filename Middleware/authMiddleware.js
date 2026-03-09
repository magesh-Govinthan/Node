import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Model/schema.js';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
 const authHeader = req.header("Authorization") || req.query.token;

  if (!token) return res.status(401).json({ message: "Token Missing!" });


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
export default authMiddleware;