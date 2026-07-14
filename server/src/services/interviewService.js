import {
  generateInterviewQuestionsWithGemini,
  evaluateInterviewAnswerWithGemini,
} from "./geminiService.js";

/**
 * --------------------------------------------------
 * Generate Interview Questions
 * --------------------------------------------------
 * @param {Object} parsedResume
 * @returns {Object}
 */

export const generateInterviewQuestions = async (parsedResume) => {
  try {
    if (!parsedResume) {
      throw new Error("Parsed resume is required.");
    }

    const questions = await generateInterviewQuestionsWithGemini(
      parsedResume
    );

    return questions;
  } catch (error) {
    console.error("Interview Question Generation Error:", error);
    throw error;
  }
};

/**
 * --------------------------------------------------
 * Evaluate Candidate Answer
 * --------------------------------------------------
 * @param {string} question
 * @param {string} answer
 * @returns {Object}
 */

export const evaluateAnswer = async (question, answer) => {
  try {
    if (!question || !answer) {
      throw new Error("Question and answer are required.");
    }

    const evaluation =
      await evaluateInterviewAnswerWithGemini(
        question,
        answer
      );

    return evaluation;
  } catch (error) {
    console.error("Interview Answer Evaluation Error:", error);
    throw error;
  }
};