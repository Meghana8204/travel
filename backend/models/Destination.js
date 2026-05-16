import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    landscape: {
      type: String,
      required: true,
      enum: ["Beach", "Mountain", "Heritage", "City"],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    popular: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
