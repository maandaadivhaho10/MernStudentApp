// controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import generateToken from "../utils/generateToken";
import { sendEmail } from "../utils/sendEmail";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body; // 👈 include role (optional)

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with default role = "user" if none is provided
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Send welcome email
    await sendEmail(
      user.email,
      "Welcome to Our App 🎉",
      `Hi ${user.name}, welcome! Your account has been successfully created.`
    );

    // Respond with token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id as string, user.role), // 👈 include role in token
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Login user
 * @route POST /api/auth/login
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Validate credentials
    if (user && (await bcrypt.compare(password, user.password))) {
      // Send login notification
      await sendEmail(
        user.email,
        "Login Alert",
        `Hi ${user.name}, you just logged into your account. If this wasn't you, please reset your password immediately.`
      );

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id as string, user.role), // 👈 include role in token
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Request password reset link
 * @route POST /api/auth/request-reset
 */
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token valid for 15 minutes
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`; // frontend link

    await sendEmail(
      user.email,
      "Password Reset Request",
      `Hi ${user.name},\n\nClick the link below to reset your password (valid for 15 minutes):\n${resetLink}`
    );

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Request reset error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Reset password
 * @route POST /api/auth/reset-password
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await sendEmail(
      user.email,
      "Password Reset Successful",
      `Hi ${user.name}, your password has been successfully updated.`
    );

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
