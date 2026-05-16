import Destination from "../models/Destination.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

const hasCloudinaryConfig = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );

const getLocalImagePath = (file) =>
  `/uploads/destinations/${path.basename(file.path)}`;

const uploadDestinationImage = async (file) => {
  if (!hasCloudinaryConfig()) {
    return getLocalImagePath(file);
  }

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "destinations",
      use_filename: true,
      unique_filename: false,
    });

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return result.secure_url;
  } catch (error) {
    console.error(
      "Cloudinary upload failed. Falling back to local image storage:",
      error.message,
    );

    return getLocalImagePath(file);
  }
};

const allowedLandscapes = ["Beach", "Mountain", "Heritage", "City"];

const validateDestinationPayload = ({
  name,
  landscape,
  description,
  rating,
  price,
  duration,
}) => {
  if (!name || !landscape || !description || !rating || !price || !duration) {
    return "All required fields must be provided";
  }

  if (!allowedLandscapes.includes(landscape)) {
    return `Landscape must be one of: ${allowedLandscapes.join(", ")}`;
  }

  const numericRating = Number(rating);
  if (Number.isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
    return "Rating must be a number between 0 and 5";
  }

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice) || numericPrice < 0) {
    return "Price must be a positive number";
  }

  return null;
};

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/destinations/";

    // Create directory if not exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer Upload
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// Get All Destinations
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Destinations retrieved successfully",
      destinations,
    });
  } catch (error) {
    console.error("Get destinations error:", error);

    res.status(500).json({
      message: "Server error retrieving destinations",
    });
  }
};

// Get Destination By ID
export const getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;

    const destination = await Destination.findById(id);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json({
      message: "Destination retrieved successfully",
      destination,
    });
  } catch (error) {
    console.error("Get destination error:", error);

    res.status(500).json({
      message: "Server error retrieving destination",
    });
  }
};

// Create Destination
export const createDestination = async (req, res) => {
  try {
    const { name, landscape, description, rating, price, duration, popular } =
      req.body;

    const validationError = validateDestinationPayload({
      name,
      landscape,
      description,
      rating,
      price,
      duration,
    });

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    // Image required
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const image = await uploadDestinationImage(req.file);

    // Create destination
    const newDestination = await Destination.create({
      name: name.trim(),
      landscape,
      description,
      image,
      rating: parseFloat(rating),
      price: parseInt(price),
      duration: duration.trim(),
      popular: popular === "true" || popular === true,
    });

    res.status(201).json({
      message: "Destination created successfully",
      destination: newDestination,
    });
  } catch (error) {
    console.error("Create destination error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((item) => item.message)
          .join(", "),
      });
    }

    res.status(500).json({
      message: "Server error creating destination",
    });
  }
};

// Update Destination
export const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, landscape, description, rating, price, duration, popular } =
      req.body;

    const validationError = validateDestinationPayload({
      name: name || "existing",
      landscape: landscape || "Beach",
      description: description || "existing",
      rating: rating ?? "0",
      price: price ?? "0",
      duration: duration || "existing",
    });

    if (validationError && (landscape || rating || price)) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const updateData = {};

    if (name) updateData.name = name.trim();

    if (landscape) updateData.landscape = landscape;

    if (description) updateData.description = description;

    if (rating) updateData.rating = parseFloat(rating);

    if (price) updateData.price = parseInt(price);

    if (duration) updateData.duration = duration.trim();

    if (popular !== undefined) {
      updateData.popular = popular === "true" || popular === true;
    }

    // Update image if provided
    if (req.file) {
      updateData.image = await uploadDestinationImage(req.file);

      // Delete old cloudinary image
      const oldDestination = await Destination.findById(id);

      if (
        oldDestination &&
        oldDestination.image &&
        oldDestination.image.includes("cloudinary")
      ) {
        const publicId = oldDestination.image.split("/").pop().split(".")[0];

        await cloudinary.uploader.destroy(`destinations/${publicId}`);
      } else if (
        oldDestination &&
        oldDestination.image &&
        oldDestination.image.startsWith("/uploads/")
      ) {
        const oldImagePath = path.join(
          process.cwd(),
          oldDestination.image.replace(/^\/+/, ""),
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const destination = await Destination.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json({
      message: "Destination updated successfully",
      destination,
    });
  } catch (error) {
    console.error("Update destination error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((item) => item.message)
          .join(", "),
      });
    }

    res.status(500).json({
      message: "Server error updating destination",
    });
  }
};

// Delete Destination
export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid destination ID",
      });
    }

    const destination = await Destination.findByIdAndDelete(id);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    // Delete image from cloudinary
    if (destination.image && destination.image.includes("cloudinary")) {
      const publicId = destination.image.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy(`destinations/${publicId}`);
    }

    // Delete local image if exists
    else if (destination.image) {
      const imagePath = path.join(
        process.cwd(),
        destination.image.replace(/^\/+/, ""),
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      message: "Destination deleted successfully",
    });
  } catch (error) {
    console.error("Delete destination error:", error);

    res.status(500).json({
      message: "Server error deleting destination",
    });
  }
};
