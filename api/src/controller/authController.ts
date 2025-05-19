import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { UserRegReq } from "../models/UserRegReq";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtUtils";
import config from "../config/config";
import send from "../utils/sendOtp";
import { randomUUID } from "crypto";

const { mailtrap } = config;

export const Register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // check for missing fields
  if (!email || !password) {
    res.status(400).json({ message: "Missing required Field" });
    return;
  }

  try {
    // check if the user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "user already exists" });
      return;
    }
    console.log(userExists);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const verificationOtp = await send(email, mailtrap.token);
    console.log(verificationOtp);

    // Create a new user
    const user = new UserRegReq({
      email: email,
      password: hashedPassword,
      otp: verificationOtp,
      token: randomUUID(),
    });

    await user.save(); // save user
    res
      .status(201)
      .json({ message: "User registered and going through verification" });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export const VerifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token, otp } = req.body;

  if (!token || !otp) {
    console.log("Missing required Fields", { token, otp });
    res.status(400).json({ message: "Missing Required fields" });
    return;
  }

  try {
    const user = await UserRegReq.findOne({ token: token });

    if (!user) {
      res.status(400).json({ message: "Not such user exists with this token" });
      return;
    }

    if (user.otp !== otp) {
      res.status(401).json({ message: "Invalid otp" });
      return;
    }
    const savedUser = await User.create({
      email: user.email,
      password: user.password,
    });

    await user.deleteOne();

    const payload = {
      userId: savedUser._id.toString(),
      email: savedUser.email,
    };

    const jwt = generateToken(payload);

    res.status(201).json({
      id: savedUser._id,
      message: "User verified",
      token: jwt,
    });

    return;
  } catch (error: any) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  // Check for required fields
  if (!email || !password) {
    res.status(400).json({ message: "Missing required Field" });
    return;
  }

  try {
    // Check for the user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User doesn't exist" });
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(403).json({ message: "Invalid password" });
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
    };

    const token = generateToken(payload);

    res.status(200).json({
      message: "User logged in",
      token: token,
      id: user._id,
      email: user.email,
    });
    return;
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
    return;
  }
};
