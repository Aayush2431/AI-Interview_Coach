import Resume from "../models/Resume.js";

import {
  generateInterviewQuestions,
  evaluateAnswer,
} from "../services/interviewService.js";

/**
 * ----------------------------------------
 * Generate Interview Questions
 * POST /api/interview/generate
 * ----------------------------------------
 */

export const generateQuestions = async (req, res) => {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required.",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    if (!resume.parsedData) {
      return res.status(400).json({
        success: false,
        message: "Resume has not been parsed yet.",
      });
    }

    const questions = await generateInterviewQuestions(
      resume.parsedData
    );

    return res.status(200).json({
      success: true,
      message: "Interview questions generated successfully.",
      data: questions,
    });

  } catch (error) {
    console.error("Generate Questions Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * Evaluate Interview Answer
 * POST /api/interview/evaluate
 * ----------------------------------------
 */

export const evaluateInterviewAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required.",
      });
    }

    const feedback = await evaluateAnswer(
      question,
      answer
    );

    return res.status(200).json({
      success: true,
      message: "Answer evaluated successfully.",
      data: feedback,
    });

  } catch (error) {
    console.error("Answer Evaluation Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};