import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getChatCompletion(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      max_tokens: 2000,
      temperature: 0.2,
    });

    const messageContent = completion.choices[0]?.message?.content;

    if (messageContent) {
      return messageContent;
    } else {
      throw new Error(
        "Received null or undefined message content in getChatCompletion"
      );
    }
  } catch (error) {
    console.error("Error in getChatCompletion:", error);
    throw error;
  }
}
