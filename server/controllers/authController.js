import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const gClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* --- Register --- */
export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed, notes: [] });
    res.status(201).json({ message: "Registered" });
  } catch {
    res.status(500).json({ message: "Register failed" });
  }
};

/* --- Login --- */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, email });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
};

/* --- Google Login --- */
export const googleLogin = async (req, res) => {
  const { idToken } = req.body;
  try {
    const ticket = await gClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, password: "GOOGLE", notes: [] });
    }

    const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, email });
  } catch (error) {
    console.error("Google auth failed:", error);
    res.status(401).json({ message: "Google auth failed" });
  }
};
