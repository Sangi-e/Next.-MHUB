import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProfessionalBio = async (name: string, skills: string[], experience: string): Promise<string> => {
  try {
    const prompt = `
      You are a professional copywriter for a freelance marketplace.
      Write a concise, engaging, and professional bio (max 100 words) for an entrepreneur named ${name}.
      Skills: ${skills.join(', ')}.
      Experience/Background: ${experience}.
      Tone: Trustworthy, skilled, and friendly.
      Do not include markdown formatting like bolding. Just plain text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Experienced professional dedicated to delivering high-quality results.";
  } catch (error) {
    console.error("Gemini Bio Generation Error:", error);
    return "Experienced professional dedicated to delivering high-quality results.";
  }
};

export const analyzeDispute = async (reportText: string): Promise<{ riskScore: number; summary: string }> => {
  try {
    const prompt = `
      Analyze this customer dispute report for a gig economy app: "${reportText}".
      Return a JSON object with:
      - riskScore (number 1-100, where 100 is high fraud risk)
      - summary (string, 1 sentence summary).
    `;
    
    // Note: In a real app we'd use responseSchema, but keeping it simple for text parsing resilience here
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    return JSON.parse(response.text || '{"riskScore": 50, "summary": "Analysis failed."}');
  } catch (error) {
    return { riskScore: 0, summary: "AI Analysis unavailable." };
  }
};
