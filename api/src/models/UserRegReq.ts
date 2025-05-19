import mongoose, { Schema } from "mongoose";

export const userRegReqSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    otp: { type: Number, required: true },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserRegReq = mongoose.model("UserRegReq", userRegReqSchema);
