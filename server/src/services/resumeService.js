import Resume from "../models/Resume.js";
import { parseResume } from "../utils/pdfParser.js";
import { parseResumeWithGemini } from "./geminiService.js";

export const uploadResumeService = async (userId, file) => {
  // Step 1: Extract text from the uploaded PDF
  const extractedText = await parseResume(file.path);

  // Step 2: Send extracted text to Gemini
  const parsedData = await parseResumeWithGemini(extractedText);

  // Step 3: Save everything to MongoDB
  const resume = await Resume.create({
    user: userId,
    originalName: file.originalname,
    fileName: file.filename,
    filePath: file.path,
    fileSize: file.size,
    parsedText: extractedText,
    parsedData,
  });

  return resume;
};