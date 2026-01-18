import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const runwayRes = await fetch("https://api.runwayml.com/v1/generate/video", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RUNWAY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gen-3",
        prompt: prompt,
        duration: 90,        // 1.5 dakika
        audio: true          // 🔥 SES VAR
      })
    });

    const data = await runwayRes.json();

    return res.status(200).json({
      status: "success",
      video_url: data.video_url
    });

  } catch (err) {
    return res.status(500).json({
      error: "Video generation failed"
    });
  }
}
