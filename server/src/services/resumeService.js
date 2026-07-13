import Resume from "../models/Resume.js";

export const uploadResumeService = async (userId, file) => {
  const resume = await Resume.create({
    user: userId,
    originalName: file.originalname,
    fileName: file.filename,
    filePath: file.path,
    fileSize: file.size,
  });

  return resume;
};