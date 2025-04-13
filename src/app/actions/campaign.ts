"use server";

import OpenAI from "openai";

type CampaignParams = {
  theme: string;
  players: number;
  difficulty: string;
};

export async function generateCampaign({
  theme,
  players,
  difficulty,
}: CampaignParams) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "o3-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful game master assistant that creates campaign outlines.",
        },
        {
          role: "user",
          content: `Create a ${difficulty} difficulty campaign for ${players} players with the theme: ${theme}. Include a story hook, main plot points, and potential challenges.`,
        },
      ],
    });

    const generatedCampaign = response.choices[0]?.message?.content;
    if (!generatedCampaign) {
      throw new Error("Failed to generate campaign");
    }

    return { campaign: generatedCampaign };
  } catch (error) {
    throw new Error("Failed to generate campaign");
  }
}
