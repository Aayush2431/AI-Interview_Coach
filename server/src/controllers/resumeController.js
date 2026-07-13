import { uploadResumeService } from "../services/resumeService.js";

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