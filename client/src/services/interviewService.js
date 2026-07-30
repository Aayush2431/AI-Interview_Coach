import api from "./api";

/**
 * Generate Interview Questions
 */
export const generateInterviewQuestions = async (resumeId) => {
  const response = await api.post("/interview/generate", {
    resumeId,
  });

  return response.data;
};

/**
 * Evaluate Interview Answer
 */
export const evaluateInterviewAnswer = async ({
  resumeId,
  question,
  answer,
}) => {
  const response = await api.post("/interview/evaluate", {
    resumeId,
    question,
    answer,
  });

  return response.data;
};