import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Authenticate Token Middleware
export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // Check token exists
    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Handle Hardcoded Admin
    if (decoded.userId === "admin-123" && decoded.role === "admin") {
      req.user = {
        _id: "admin-123",
        email: decoded.email,
        role: "admin",
        username: process.env.ADMIN_USERNAME || "Admin",
      };

      return next();
    }

    // Find user from database
    const user = await User.findById(decoded.userId);

    // User not found
    if (!user) {
      return res.status(401).json({
        message: "Invalid token.",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

// Require Admin Middleware
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized access.",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin privileges required.",
    });
  }

  next();
};
