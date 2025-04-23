// src/utils/moderateMessage.ts

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function moderateMessage(message: string): Promise<
  | { flagged: false }
  | {
      flagged: true;
      categories: string[];
      message: string;
    }
> {
  try {
    const response = await openai.moderations.create({ input: message });
    const result = response.results[0];

    if (result.flagged) {
      const categories = Object.entries(result.categories)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      return {
        flagged: true,
        categories,
        message: `Your message was flagged for: ${categories.join(", ")}`,
      };
    }

    return { flagged: false };
  } catch (error) {
    console.error("Moderation API error:", error);
    return {
      flagged: true,
      categories: ["moderation_error"],
      message: "Moderation check failed. Please try again later.",
    };
  }
}
