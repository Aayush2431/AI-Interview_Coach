import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  uploadResume,
  getATSReport,
} from "../controllers/resumeController.js";

const router = express.Router();

/**
 * Upload Resume
 * POST /api/resume/upload
 */
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

/**
 * Generate ATS Report
 * GET /api/resume/ats/:resumeId
 */
router.get(
  "/ats/:resumeId",
  authMiddleware,
  getATSReport
);

export default router;