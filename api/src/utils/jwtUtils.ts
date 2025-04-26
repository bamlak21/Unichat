import jwt from "jsonwebtoken";
import config from "../config/config";

const JWT_SECRET_KEY = config.jwtConfig.secretKey;

interface JWTPayload {
  userId: string;
  email: string;
}

export const generateToken = (payload: JWTPayload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "40h" });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JWTPayload;
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};
