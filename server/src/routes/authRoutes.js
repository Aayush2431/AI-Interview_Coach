import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    registerUser,
    loginUser
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed successfully.",
    user: req.user,
  });
});

export default router;