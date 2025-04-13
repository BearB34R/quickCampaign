"use server";

import { headers } from "next/headers";
import { kv } from "@vercel/kv";
import OpenAI from "openai";

type CampaignParams = {
  theme: string;
  players: number;
  difficulty: string;
};

const MAX_REQUESTS_PER_DAY = 2;
const RATE_LIMIT_DURATION = 24 * 60 * 60; // 24 hours in seconds

export async function generateCampaign({
  theme,
  players,
  difficulty,
}: CampaignParams) {
  try {
    const headersList = await headers();
    const ip = (headersList.get("x-forwarded-for") || "127.0.0.1").split(",")[0];
    const key = `rate_limit:${ip}`;

    // Get current count for this IP with proper type handling
    let currentCount = 0;
    try {
      const value = await kv.get(key);
      currentCount = typeof value === 'number' ? value : 0;
    } catch (e) {
      console.error('Error fetching rate limit:', e);
      // Continue with count 0 if KV fetch fails
    }

    if (currentCount >= MAX_REQUESTS_PER_DAY) {
      throw new Error("Rate limit exceeded. Please try again tomorrow.");
    }

    // Increment the counter before making the request
    await kv.set(key, currentCount + 1, { ex: RATE_LIMIT_DURATION });

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
    // If the API call fails, we should not count it against the rate limit
    if (
      error instanceof Error &&
      error.message !== "Rate limit exceeded. Please try again tomorrow."
    ) {
      const headersList = await headers();
      const ip = (headersList.get("x-forwarded-for") || "127.0.0.1").split(",")[0];
      const key = `rate_limit:${ip}`;
      await kv.decrby(key, 1);
    }
    throw error;
  }
}
