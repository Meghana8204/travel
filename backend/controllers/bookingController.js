import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Destination from "../models/Destination.js";
import {
  sendBookingPendingEmail,
  sendBookingConfirmationEmail,
  sendBookingCancelledEmail,
} from "../utils/mailer.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const {
      destinationId,
      packageName,
      travelDate,
      travelers,
      totalAmount,
      specialRequests,
      userEmail,
    } = req.body;

    const userId = req.user._id || req.user.userId;

    // Validate required fields
    if (
      !userId ||
      !destinationId ||
      !packageName ||
      !travelDate ||
      !travelers ||
      !totalAmount
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if destination exists
    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    // Create booking
    const booking = new Booking({
      user: userId,
      destination: destinationId,
      packageName,
      travelDate,
      travelers,
      totalAmount,
      specialRequests: specialRequests || "",
    });

    await booking.save();

    // Populate booking details
    await booking.populate("user", "username email");
    await booking.populate("destination", "name");

    // Send pending email
    try {
      const emailToSend = userEmail || booking.user.email;

      console.log("Attempting to send email to:", emailToSend);

      await sendBookingPendingEmail(emailToSend, {
        packageName: booking.packageName,
        destination: booking.destination.name,
        travelDate: booking.travelDate.toISOString().split("T")[0],
        travelers: booking.travelers,
        totalAmount: booking.totalAmount,
      });

      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Failed to send pending email:", emailError.message);
    }

    res.status(201).json({
      message: "Booking created successfully",
      booking: {
        id: booking._id,
        user: booking.user.username || booking.user.email,
        destination: booking.destination.name,
        packageName: booking.packageName,
        travelDate: booking.travelDate,
        travelers: booking.travelers,
        totalAmount: booking.totalAmount,
        status: booking.status,
        bookingDate: booking.bookingDate,
        specialRequests: booking.specialRequests,
      },
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      message: "Server error creating booking",
    });
  }
};

// Get all bookings (Admin only)
export const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, userId } = req.query;

    const query = {};

    if (status) query.status = status;
    if (userId) query.user = userId;

    const bookings = await Booking.find(query)
      .populate("user", "username email")
      .populate("destination", "name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    const formattedBookings = bookings.map((booking) => ({
      id: booking._id,
      user: booking.user.username || booking.user.email,
      userEmail: booking.user.email,
      destination: booking.destination.name,
      packageName: booking.packageName,
      travelDate: booking.travelDate.toISOString().split("T")[0],
      travelers: booking.travelers,
      totalAmount: booking.totalAmount,
      status: booking.status,
      bookingDate: booking.bookingDate.toISOString().split("T")[0],
      specialRequests: booking.specialRequests,
    }));

    res.status(200).json({
      bookings: formattedBookings,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalBookings: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get all bookings error:", error);

    res.status(500).json({
      message: "Server error retrieving bookings",
    });
  }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id || req.user.userId;

    const bookings = await Booking.find({ user: userId })
      .populate("destination", "name image price")
      .sort({ createdAt: -1 });

    const formattedBookings = bookings.map((booking) => ({
      _id: booking._id,
      packageName: booking.packageName,
      destination: booking.destination.name,
      destinationImage: booking.destination.image,
      travelDate: booking.travelDate,
      travelers: booking.travelers,
      totalAmount: booking.totalAmount,
      status: booking.status,
      bookingDate: booking.bookingDate,
      specialRequests: booking.specialRequests,
    }));

    res.status(200).json(formattedBookings);
  } catch (error) {
    console.error("Get user bookings error:", error);

    res.status(500).json({
      message: "Server error retrieving user bookings",
    });
  }
};

// Update booking
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { travelers, specialRequests } = req.body;

    const booking = await Booking.findOne({
      _id: id,
      user: req.user._id || req.user.userId,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Update fields
    if (travelers !== undefined) {
      booking.travelers = travelers;
    }

    if (specialRequests !== undefined) {
      booking.specialRequests = specialRequests;
    }

    await booking.save();

    res.status(200).json({
      message: "Booking updated successfully",
      booking: {
        _id: booking._id,
        packageName: booking.packageName,
        destination: booking.destination,
        travelDate: booking.travelDate,
        travelers: booking.travelers,
        totalAmount: booking.totalAmount,
        status: booking.status,
        specialRequests: booking.specialRequests,
      },
    });
  } catch (error) {
    console.error("Update booking error:", error);

    res.status(500).json({
      message: "Server error updating booking",
    });
  }
};

// Update booking status (Admin only)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    )
      .populate("user", "username email")
      .populate("destination", "name");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Send emails
    try {
      if (status === "confirmed") {
        await sendBookingConfirmationEmail(booking.user.email, {
          packageName: booking.packageName,
          destination: booking.destination.name,
          travelDate: booking.travelDate.toISOString().split("T")[0],
          travelers: booking.travelers,
          totalAmount: booking.totalAmount,
        });
      } else if (status === "cancelled") {
        await sendBookingCancelledEmail(booking.user.email, {
          packageName: booking.packageName,
          destination: booking.destination.name,
          travelDate: booking.travelDate.toISOString().split("T")[0],
          travelers: booking.travelers,
          totalAmount: booking.totalAmount,
        });
      }
    } catch (emailError) {
      console.error(`Failed to send ${status} email:`, emailError.message);
    }

    res.status(200).json({
      message: "Booking status updated successfully",
      booking: {
        id: booking._id,
        user: booking.user.username || booking.user.email,
        destination: booking.destination.name,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error("Update booking status error:", error);

    res.status(500).json({
      message: "Server error updating booking status",
    });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete booking error:", error);

    res.status(500).json({
      message: "Server error deleting booking",
    });
  }
};
