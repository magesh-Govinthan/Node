import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Model/schema.js';

dotenv.config();

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Model/schema.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    
    const authHeader = req.header("Authorization") || req.query.token;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token is missing"
      });
    }

  
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = decoded;

    
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

  
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only"
      });
    }

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message
    });
  }
};

export default authMiddleware;