import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  generateQuestions,
  evaluateInterviewAnswer,
} from "../controllers/interviewController.js";

const router = express.Router();

/**
 * Generate Interview Questions
 * POST /api/interview/generate
 */
router.post(
  "/generate",
  authMiddleware,
  generateQuestions
);

/**
 * Evaluate Interview Answer
 * POST /api/interview/evaluate
 */
router.post(
  "/evaluate",
  authMiddleware,
  evaluateInterviewAnswer
);

export default router;