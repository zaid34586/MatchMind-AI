export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question) {
      return Response.json({ error: "Question is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "ibm-granite/granite-4.1-8b",
        messages: [
          {
            role: "system",
            content:
              "You are PitchPal AI, a football match assistant for normal fans. Answer in simple English. Do not use markdown symbols like ** or bullet stars. Keep answers short, clear, and practical. Use this format only: Quick Answer, Main Reasons, Fan Explanation, What To Watch Next.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    const data = await response.json();
    const answer =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I could not generate an answer right now.";

    return Response.json({ answer });
  } catch (error) {
    return Response.json(
      { error: "Assistant failed to generate answer." },
      { status: 500 }
    );
  }
}