import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET user notes
router.get("/note", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

// POST add new note
router.post("/note", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const user = await User.findById(req.userId);
    user.notes.push({ text });
    await user.save();
    res.json(user.notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to add note" });
  }
});

export default router;
