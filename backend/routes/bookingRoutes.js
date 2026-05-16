import express from "express";

import {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";

import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// ================= USER ROUTES =================

// Create Booking
router.post("/bookings", authenticateToken, createBooking);

// Get Logged-in User Bookings
router.get("/bookings/user", authenticateToken, getUserBookings);

// Update Booking
router.put("/bookings/:id", authenticateToken, updateBooking);

// Delete Own Booking
router.delete("/bookings/:id", authenticateToken, deleteBooking);

// ================= ADMIN ROUTES =================

// Get All Bookings
router.get("/admin/bookings", authenticateToken, requireAdmin, getAllBookings);

// Update Booking Status
router.put(
  "/admin/bookings/:id/status",
  authenticateToken,
  requireAdmin,
  updateBookingStatus,
);

// Delete Booking
router.delete(
  "/admin/bookings/:id",
  authenticateToken,
  requireAdmin,
  deleteBooking,
);

export default router;
