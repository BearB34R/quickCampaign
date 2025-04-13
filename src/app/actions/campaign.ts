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
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "o3-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful veteran game master on the level of Matt Mercer that creates Dungeons and Dragons campaigns. Format your responses in clear sections with markdown headers:\n\n# Campaign Overview\n## Story Hook\n## Main Plot Points\n## Key NPCs\n## Challenges\n## Potential Rewards",
        },
        {
          role: "user",
          content: `Create a ${difficulty} difficulty campaign for ${players} players with the theme: ${theme}. Structure the response using the sections specified.`,
        },
      ],
    });

    const generatedCampaign = response.choices[0]?.message?.content;
    if (!generatedCampaign) {
      throw new Error("Failed to generate campaign");
    }

    return { campaign: generatedCampaign };
  } catch (error) {
    throw error;
  }
}
