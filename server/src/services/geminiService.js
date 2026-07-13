import { GoogleGenAI } from "@google/genai";

export const parseResumeWithGemini = async (resumeText) => {

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });



  const prompt = `
You are an expert resume parser.

Analyze the resume below and return ONLY valid JSON.

Do not include markdown.
Do not include explanation.
Do not wrap the JSON inside \`\`\`.

Return exactly this structure:

{
  "name": "",
  "email": "",
  "phone": "",
  "skills": [],
  "education": [],
  "experience": [],
  "projects": []
}

Resume:

${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  // Clean Gemini response
const cleanedText = response.text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

try {
  return JSON.parse(cleanedText);
} catch (error) {
  console.error("Gemini returned invalid JSON:");
  console.error(cleanedText);

  throw new Error("Failed to parse Gemini response into JSON.");
}
};