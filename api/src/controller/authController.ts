import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtUtils";

export const Register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Missing required Field" });
    return;
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "user already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
    return;
  } catch (err) {
    console.log(err);
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

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User doesn't exist" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(403).json({ message: "Invalid password" });
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
    };

    const token = generateToken(payload);

    res.status(200).json({ message: "User logged in", token: token });
    return;
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
    return;
  }
};
