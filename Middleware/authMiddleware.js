import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Model/schema.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization") || req.query.token;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Token is missing" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Flexible: _id or id
    const userId = decoded._id || decoded.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admin only" });
    }

    req.user = user; // Attach full user object
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token", error: error.message });
  }
};

export default authMiddleware;