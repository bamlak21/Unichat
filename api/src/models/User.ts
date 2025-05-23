import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema) || mongoose.models.user;
