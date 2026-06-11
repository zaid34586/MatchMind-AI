export async function POST(request) {
  try {
    const { homeTeam, awayTeam, stage } = await request.json();

    if (!homeTeam || !awayTeam) {
      return Response.json(
        {
          success: false,
          error: "Please enter both home team and away team.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          success: false,
          error: "OpenRouter API key not found. Please check .env.local file.",
        },
        { status: 500 }
      );
    }

    const prompt = `
You are MatchMind AI, an AI football match companion for fans.

Analyze this match:
Home Team: ${homeTeam}
Away Team: ${awayTeam}
Match Stage: ${stage}

Give a helpful football analysis in this format:

Match Overview:
Key Tactical Insight:
Team Advantage:
Prediction:
Fan-Friendly Summary:

Keep it simple, practical, and easy for football fans to understand.
`;

    const aiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "MatchMind AI",
        },
        body: JSON.stringify({
          model: "ibm-granite/granite-4.1-8b",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await aiResponse.json();

    if (!aiResponse.ok) {
      return Response.json(
        {
          success: false,
          error:
            data?.error?.message ||
            "OpenRouter API error. Check API key, credits, or model access.",
        },
        { status: 500 }
      );
    }

    const analysis =
      data?.choices?.[0]?.message?.content ||
      "AI analysis could not be generated.";

    return Response.json({
      success: true,
      analysis,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Server error while generating analysis.",
      },
      { status: 500 }
    );
  }
}