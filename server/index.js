import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();

/* CORS */
import cors from "cors";

app.use(
  cors({
    origin: "https://fullstack-auth-dashboard-ajxn.onrender.com", // ✅ Your deployed frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


/* body‑parser */
app.use(express.json());

/* health check */
app.get("/health", (_req, res) => res.send("OK"));

/* routes */
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* DB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((e) => console.error("❌ MongoDB error:", e));

/* start */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server 🔥 on ${PORT}`));
