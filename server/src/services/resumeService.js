import Resume from "../models/Resume.js";
import { parseResume } from "../utils/pdfParser.js";
import { parseResumeWithGemini } from "./geminiService.js";

export const uploadResumeService = async (userId, file) => {
  // Validate uploaded file
  if (!file) {
    throw new Error("Resume file is required.");
  }

  // Step 1: Extract text from the uploaded PDF
  const extractedText = await parseResume(file.path);

  if (!extractedText || extractedText.trim() === "") {
    throw new Error("Unable to extract text from the uploaded resume.");
  }

  // Step 2: Parse resume using Gemini
  const parsedData = await parseResumeWithGemini(extractedText);

  // Step 3: Save resume in MongoDB
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