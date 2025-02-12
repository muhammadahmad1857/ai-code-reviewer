"use server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("Missing GOOGLE_API_KEY environment variable");
}
export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.3,
  apiKey,
});
