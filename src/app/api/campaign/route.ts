import OpenAI from "openai";

// Set the runtime to edge for better timeout handling
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();

    // Extract theme, players, and difficulty
    const theme = body.theme || "fantasy";
    const players = body.players || 4;
    const difficulty = body.difficulty || "medium";

    console.log(
      `Generating campaign: Theme=${theme}, Players=${players}, Difficulty=${difficulty}`,
    );

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create a full non-streaming completion
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

    const campaignText =
      response.choices[0]?.message?.content || "Failed to generate campaign";

    // Return the campaign text as JSON
    return new Response(JSON.stringify({ campaign: campaignText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in campaign generation:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate campaign" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
