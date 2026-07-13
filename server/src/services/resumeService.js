import Resume from "../models/Resume.js";
import { parseResume } from "../utils/pdfParser.js";

export const uploadResumeService = async (userId, file) => {
  const extractedText = await parseResume(file.path);

  const resume = await Resume.create({
    user: userId,
    originalName: file.originalname,
    fileName: file.filename,
    filePath: file.path,
    fileSize: file.size,
    parsedText: extractedText,
  });

  return resume;
};