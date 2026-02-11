/* eslint-disable */
// TODO: Import whatever service you decide to use. i.e. `import OpenAI from 'openai';`
import OpenAI from "openai";

// HINT: You'll want to initialize your service outside of the function definition

// system instruction for the chatbot
const SYSTEM_PROMPT =
  `You are a helpful chat that ONLY answers questions about animals, species, wildlife biology, habitat, diet, conversation status, behavior, taxonomy, and animal facts.
If the user asks something unrelated (coding, math, history, etc.), respond briefly and politely:
"I can only help with animal/species-related questions. Ask me about habitat, diet, conversation status, behavior, or similar."
Keep answers clear and concise. If you are unsure, say you are unsure.
`.trim();

const apiKey = process.env.OPENAI_API_KEY;
const client = apiKey ? new OpenAI({ apiKey }) : null;

// TODO: Implement the function below
export async function generateResponse(message: string): Promise<string> {
  // fallback if there are errors
  const fallback = "Sorry - I am having trouble answering right now. Please try again in a moment.";

  try {
    if (!client) {
      return "Missing OPENAI_API_KEY. Add it to your new .env file and restart the dev server.";
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.4,
    });

    const text = completion.choices?.[0]?.message?.content?.trim();
    return text && text.length > 0 ? text : fallback;
  } catch (err) {
    console.error("OpenAI call failed:", err);
    return fallback;
  }
}
