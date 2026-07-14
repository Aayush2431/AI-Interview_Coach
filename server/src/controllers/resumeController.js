import Resume from "../models/Resume.js";
import { uploadResumeService } from "../services/resumeService.js";
import { generateATSReport } from "../services/atsService.js";

/**
 * Upload Resume
 */
export const uploadResume = async (req, res) => {
  try {
    const resume = await uploadResumeService(req.user.userId, req.file);

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Generate ATS Report
 */
export const getATSReport = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // Find resume by ID
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Check if parsed resume data exists
    if (!resume.parsedData) {
      return res.status(400).json({
        success: false,
        message: "Resume has not been parsed yet.",
      });
    }

    // Generate ATS Report
    const atsReport = await generateATSReport(resume.parsedData);

    return res.status(200).json({
      success: true,
      message: "ATS report generated successfully",
      data: atsReport,
    });

  } catch (error) {
    console.error("ATS Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate ATS report",
      error: error.message,
    });
  }
};