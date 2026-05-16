import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAdminConfig } from "../config/env.js";

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    // Hardcoded Admin
    if (req.user._id === "admin-123") {
      return res.status(200).json({
        name: req.user.username,
        email: req.user.email,
      });
    }

    // Regular User
    const user = req.user;

    res.status(200).json({
      name: user.username || "User",
      email: user.email,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);

    res.status(500).json({
      message: "Server error during profile fetch",
    });
  }
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validate passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password do not match",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email or username",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    // Save user
    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(201).json({
      message: "User registered successfully",

      token,

      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error during registration",
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = getAdminConfig();

    // Allow the environment-configured bootstrap admin to use the normal login page.
    if (email === admin.email && password === admin.password) {
      const token = jwt.sign(
        {
          userId: "admin-123",
          email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        },
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: "admin-123",
          username: admin.username,
          email,
          role: "admin",
        },
      });
    }

    // Find user
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error during login",
    });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = getAdminConfig();

    // Environment-configured bootstrap admin
    if (email === admin.email && password === admin.password) {
      const token = jwt.sign(
        {
          userId: "admin-123",
          email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        },
      );

      return res.status(200).json({
        message: "Admin login successful",

        token,

        user: {
          id: "admin-123",
          username: admin.username,
          email,
          role: "admin",
        },
      });
    }

    // Find admin in database
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Check role
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      message: "Admin login successful",

      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      message: "Server error during admin login",
    });
  }
};
