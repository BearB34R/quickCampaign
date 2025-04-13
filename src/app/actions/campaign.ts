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

    // Create difficulty-based level scaling guidance
    const difficultyGuide = {
      easy: "Keep encounters balanced for new players. Enemy groups should be manageable, and bosses should provide a fair challenge.",
      medium:
        "Create engaging encounters that require tactical thinking. Mix enemy types and include environmental challenges.",
      hard: "Design complex encounters with challenging enemy combinations. Include strategic elements and require resource management.",
      expert:
        "Create extremely challenging encounters that demand perfect coordination and resource usage. Include multiple phase boss fights.",
    };

    const response = await openai.chat.completions.create({
      model: "o3-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a master dungeon master creating detailed, playthrough-style D&D campaigns. Structure your response as an adventure ready to play, following this format:\n\n" +
            "# Story Hook\n" +
            "(Brief engaging introduction to set up the campaign premise)\n\n" +
            "# Starting Point\n" +
            "## Party Level\n" +
            "## Starting Location\n" +
            "## Important NPCs\n" +
            "## Available Resources\n\n" +
            "# Adventure Path\n" +
            "(For each major story beat, include:)\n\n" +
            "## Chapter 1: [Name]\n" +
            "### Setting\n" +
            "(Describe the location and atmosphere)\n" +
            "### Encounters\n" +
            "1. [Encounter Name]\n" +
            "- Enemy Group: (list with CR)\n" +
            "- Tactical Notes\n" +
            "- Loot\n" +
            "2. [Next Encounter...]\n" +
            "### Chapter Boss\n" +
            "- Boss Name and CR\n" +
            "- Battle Phases\n" +
            "- Special Abilities\n" +
            "- Reward\n" +
            "### Story Progress\n" +
            "(How this advances the plot)\n\n" +
            "## Chapter 2: [Name]\n" +
            "(Continue pattern for each chapter)\n\n" +
            "# Campaign Finale\n" +
            "## Final Battle\n" +
            "## Victory Conditions\n" +
            "## Conclusion\n\n" +
            "Remember to maintain narrative flow while providing specific, playable details.",
        },
        {
          role: "user",
          content: `Create a ${difficulty} difficulty campaign for ${players} players with the theme: ${theme}. ${difficultyGuide[difficulty as keyof typeof difficultyGuide]}
          
Design a campaign that flows naturally from encounter to encounter, with each chapter building towards the finale. Include specific enemy compositions, tactical situations, and rewards that are appropriate for the party size and difficulty level. 

For boss fights, include:
- Multiple phases or interesting mechanics
- Environmental factors
- Specific loot and rewards
- Tactical considerations for the party size of ${players}

Scale encounters appropriately for:
- Party size: ${players} players
- Difficulty: ${difficulty}
- Progressive level scaling throughout the campaign`,
        },
      ],
    });

    const generatedCampaign = response.choices[0]?.message?.content;
    if (!generatedCampaign) {
      throw new Error("Failed to generate campaign");
    }

    return { campaign: generatedCampaign };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Campaign generation failed: ${error.message}`);
    }
    throw new Error("Campaign generation failed");
  }
}
