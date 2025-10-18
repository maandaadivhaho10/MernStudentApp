import express from "express";
import { registerUser, loginUser,requestPasswordReset, resetPassword } from "../controllers/authController";

const router = express.Router();
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
