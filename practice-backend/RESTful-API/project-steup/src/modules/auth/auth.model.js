import { boolean } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      required: [true, "Name is required"], // Only in required field we can give error message if required is not true
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
      // Password stored in hashed form so we will give max-length latter
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"], // sometimes prefer enum value come from constant.js file
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedToken: {
      type: String,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true },
); // Automatically add createdAt and updatedAt

export default mongoose.model("User", userSchema); // in DB User => "users"
