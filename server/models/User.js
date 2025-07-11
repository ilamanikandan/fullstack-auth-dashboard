import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  notes: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("User", userSchema);
