import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const getReview = async (
  language: string,
  code: string
): Promise<string> => {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GOOGLE_API_KEY environment variable");
  }

  // Create a new LLM instance with the provided API key and model name.
  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0.3,
    apiKey,
  });

  const prompt = `
You are an expert code reviewer specializing in ${language}. Your task is to provide a comprehensive review of the following code snippet. Analyze it thoroughly for potential issues, including but not limited to:
- **Bugs and Logical Flaws:** Identify any errors or unexpected behaviors.
- **Performance Issues:** Suggest ways to optimize the code.
- **Security Concerns:** Highlight vulnerabilities or potential exploits.
- **Code Readability & Maintainability:** Recommend improvements in style, structure, and naming conventions.
- **Best Practices & Industry Standards:** Offer guidelines to align the code with modern practices.
- **Refactoring Suggestions:** Propose code restructuring or modularization for better clarity and scalability.
- **Testing & Documentation:** Advise on adding unit tests, error handling, and comprehensive documentation.

Format your response entirely in markdown with clearly defined sections for each of the points above. Here is the code snippet:

\`\`\`
${code}
\`\`\`

Provide detailed, actionable feedback and updated code examples where applicable.
  `;

  const review = await llm.invoke(prompt);
  console.log(review);
  return review.content.toString();
};
