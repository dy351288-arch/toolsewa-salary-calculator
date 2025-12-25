import { GoogleGenAI } from "@google/genai";

// Initialize the API client
// Note: We are using a dummy fallback if the key is missing to prevent crash during initial render,
// but the actual call will fail gracefully.
const apiKey = process.env.API_KEY || 'dummy_key';
const ai = new GoogleGenAI({ apiKey });

export const solveMathProblem = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert mathematician and helpful assistant. 
        Your task is to solve math problems, unit conversions, and logic puzzles provided by the user. 
        Provide a clear, step-by-step explanation followed by the final answer in bold. 
        Keep the response concise and suitable for a mobile screen. 
        If the input is just a simple expression (e.g., '5 * 5'), just return the result.
        Use Markdown for formatting.`,
        temperature: 0.2, // Lower temperature for more deterministic math results
      }
    });

    return response.text || "I couldn't generate a solution. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to connect to the AI solver service.");
  }
};
