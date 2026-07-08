import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Interview Coach Backend Running 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);

export default app;