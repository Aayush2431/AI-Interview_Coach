import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-3.5-flash";

/**
 * ---------------------------------------------------
 * Lazy Gemini Client
 * ---------------------------------------------------
 */

let ai = null;

const getGeminiClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return ai;
};


/**
 * ---------------------------------------------------
 * Generic Gemini JSON Generator
 * ---------------------------------------------------
 */

export const generateStructuredJson = async (prompt) => {
  const ai = getGeminiClient();

  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
      });

      const cleanedText = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleanedText);

    } catch (error) {
        console.error("=================================");
        console.error("Gemini Attempt:", attempt);
        console.error("Status:", error.status);
        console.error("Message:", error.message);
        console.error("Full Error:", error);
        console.error("=================================");

        if (attempt === MAX_RETRIES) {
          throw error;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, attempt * 2000)
        );
      }
  }
};

/**
 * ---------------------------------------------------
 * Resume Parser
 * ---------------------------------------------------
 */

export const parseResumeWithGemini = async (resumeText) => {

  const prompt = `
Return ONLY JSON.

{
  "technical": [
    {
      "id": 1,
      "question": "What is React?",
      "difficulty": "Easy"
    }
  ]
}
`;

  return await generateStructuredJson(prompt);
};

/**
 * ---------------------------------------------------
 * Interview Question Generator
 * ---------------------------------------------------
 */

export const generateInterviewQuestionsWithGemini =
async (parsedResume) => {

  const prompt = `
You are a Senior Software Engineer conducting technical interviews.

Based on the candidate's resume, generate interview questions.

Generate:

- 5 Technical Questions

- 3 Project Questions

- 2 HR Questions

- 2 Behavioral Questions

Return ONLY JSON.

Format:

{
  "technical":[
    {
      "id":1,
      "question":"",
      "difficulty":"Easy"
    }
  ],
  "projects":[
    {
      "id":6,
      "question":"",
      "difficulty":"Medium"
    }
  ],
  "hr":[
    {
      "id":9,
      "question":"",
      "difficulty":"Easy"
    }
  ],
  "behavioral":[
    {
      "id":11,
      "question":"",
      "difficulty":"Medium"
    }
  ]
}

Candidate Resume:

${JSON.stringify(parsedResume, null, 2)}

Return ONLY JSON.
`;

  console.log("Prompt Length:", prompt.length);

  return await generateStructuredJson(prompt);

};

/**
 * ---------------------------------------------------
 * Interview Answer Evaluation
 * ---------------------------------------------------
 */

export const evaluateInterviewAnswerWithGemini =
async (question, answer) => {

  const prompt = `
You are a Senior Software Engineer interviewing a candidate.

Evaluate the following answer.

Question:

${question}

Candidate Answer:

${answer}

Evaluate:

- Technical Accuracy

- Communication

- Confidence

- Completeness

- Practical Knowledge

Return ONLY JSON.

Format:

{
  "overallScore":0,
  "technicalAccuracy":0,
  "communication":0,
  "confidence":0,
  "completeness":0,
  "strengths":[],
  "improvements":[],
  "idealAnswer":""
}

Rules:

overallScore must be between 0 and 10.

All scores must be between 0 and 10.

Return ONLY JSON.

No markdown.
`;

  return await generateStructuredJson(prompt);

};