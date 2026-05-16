import express from "express";

import {
  getDashboardStats,
  getRecentBookings,
} from "../controllers/dashboardController.js";

import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// ================= DASHBOARD ROUTES =================

// Get Dashboard Statistics
router.get("/admin/stats", authenticateToken, requireAdmin, getDashboardStats);

// Get Recent Bookings
router.get(
  "/admin/bookings/recent",
  authenticateToken,
  requireAdmin,
  getRecentBookings,
);

export default router;
