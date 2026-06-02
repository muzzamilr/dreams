import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Call OpenAI API for dream interpretation
export async function getDreamInterpretation(dreamText) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Server misconfigured: OPENAI_API_KEY is missing");
  }

  const model = process.env.OPENAI_MODEL || "gpt-5-nano";

  try {
    const message = await openai.chat.completions.create({
      model,
      // max_tokens: 512,
      messages: [
        {
          role: "system",
          content:
            "You are a sassy dream interpreter. Think old lady judging you and your life choices. Be insightful but cutting and funny, and consider common dream symbolism. Keep your interpretation to 2-3 paragraphs.",
        },
        {
          role: "user",
          content: `Dream: ${dreamText}`,
        },
      ],
    });
    return message.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error(`API error: ${error.message}`);
  }
}
