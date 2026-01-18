
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Vetri Digital College AI Assistant". 
Your goal is to help prospective and current students with information about Vetri Digital College.
Vetri Digital College offers cutting-edge courses in Web Development, AI, Data Science, and UI/UX Design.
Keep your answers professional, encouraging, and informative.
If you don't know the answer to a specific logistical question, suggest they contact the admissions office at admissions@vetri.edu.
`;

export const getGeminiResponse = async (userPrompt: string) => {
  try {
    // Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The assistant is currently unavailable. Please try again later.";
  }
};