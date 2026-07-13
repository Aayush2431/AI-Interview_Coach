import dotenv from "dotenv";
import { parseResumeWithGemini } from "./src/services/geminiService.js";

dotenv.config();

const resume = `
Aayush Kumar Giri

Email: aayush@gmail.com
Phone: 9876543210

Skills:
React
Node.js
MongoDB
Express

Education:
B.Tech Electronics and Telecommunication
VSSUT

Projects:
AI Interview Coach
Spotify Clone
`;

const result = await parseResumeWithGemini(resume);

console.log(result);