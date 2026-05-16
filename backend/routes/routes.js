import express from "express";

import {
  registerUser,
  loginUser,
  adminLogin,
  getProfile,
} from "../controllers/userController.js";

import {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  updateUser,
} from "../controllers/adminController.js";

import {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  upload,
} from "../controllers/destinationController.js";

import { authenticateToken, requireAdmin } from "../middleware/auth.js";

import Razorpay from "razorpay";
import crypto from "crypto";

import { sendPaymentSuccessEmail } from "../utils/mailer.js";

const router = express.Router();

// ================= AUTH ROUTES =================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Admin Login
router.post("/admin-login", adminLogin);

// User Profile
router.get("/profile", authenticateToken, getProfile);

// ================= ADMIN USER ROUTES =================

// Get All Users
router.get("/admin/users", authenticateToken, requireAdmin, getAllUsers);

// Update User Status
router.put(
  "/admin/users/:userId/status",
  authenticateToken,
  requireAdmin,
  updateUserStatus,
);

// Update User
router.put("/admin/users/:userId", authenticateToken, requireAdmin, updateUser);

// Delete User
router.delete(
  "/admin/users/:userId",
  authenticateToken,
  requireAdmin,
  deleteUser,
);

// ================= DESTINATION ROUTES =================

// Public Routes
router.get("/destinations", getAllDestinations);

router.get("/destinations/:id", getDestinationById);

// Admin Routes
router.get(
  "/admin/destinations",
  authenticateToken,
  requireAdmin,
  getAllDestinations,
);

router.post(
  "/admin/destinations",
  authenticateToken,
  requireAdmin,
  upload.single("image"),
  createDestination,
);

router.put(
  "/admin/destinations/:id",
  authenticateToken,
  requireAdmin,
  upload.single("image"),
  updateDestination,
);

router.delete(
  "/admin/destinations/:id",
  authenticateToken,
  requireAdmin,
  deleteDestination,
);

// ================= PAYMENT ROUTES =================

// Create Razorpay Order
router.post("/create-order", authenticateToken, async (req, res) => {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        message: "Razorpay is not configured on the server",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,

      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, currency = "INR", receipt } = req.body;

    if (!amount || Number(amount) < 100) {
      return res.status(400).json({
        message: "Amount must be at least 100 paise",
      });
    }

    const options = {
      amount: Number(amount),
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    res.json({ order });
  } catch (error) {
    console.error("Error creating order:", {
      statusCode: error.statusCode,
      error: error.error,
      message: error.message,
    });

    res.status(500).json({
      message:
        error.error?.description ||
        error.message ||
        "Failed to create order",
    });
  }
});

// Verify Razorpay Payment
router.post("/verify-payment", authenticateToken, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData,
    } = req.body;

    // Verify Signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Import Models
    const Booking = (await import("../models/Booking.js")).default;

    const Destination = (await import("../models/Destination.js")).default;

    const User = (await import("../models/User.js")).default;

    // Find Destination
    const destination = await Destination.findById(bookingData.destinationId);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    // Find User
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Create Booking
    const newBooking = new Booking({
      user: req.user._id,

      destination: bookingData.destinationId,

      packageName: bookingData.packageName,

      travelDate: new Date(bookingData.travelDate),

      travelers: bookingData.travelers,

      totalAmount: bookingData.totalAmount,

      specialRequests: bookingData.specialRequests,

      status: "pending",

      paymentStatus: "paid",

      paymentId: razorpay_payment_id,
    });

    await newBooking.save();

    // Send Payment Success Email
    try {
      await sendPaymentSuccessEmail(user.email, {
        packageName: bookingData.packageName,

        destination: destination.name,

        travelDate: new Date(bookingData.travelDate)
          .toISOString()
          .split("T")[0],

        travelers: bookingData.travelers,

        totalAmount: bookingData.totalAmount,
      });
    } catch (emailError) {
      console.error("Failed to send payment email:", emailError);
    }

    res.json({
      success: true,
      message: "Payment verified and booking created successfully",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);

    res.status(500).json({
      message: "Failed to verify payment",
    });
  }
});

export default router;
