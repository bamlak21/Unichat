import { Router } from "express";
import { Login, Register, VerifyOtp } from "../controller/authController";

const router = Router();

router.post("/register", Register);
router.post("/verify", VerifyOtp);
router.post("/login", Login);

export default router;
