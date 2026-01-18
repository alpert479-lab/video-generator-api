import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    setLoading(true);
    setVideoUrl("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setVideoUrl(data.video_url);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🎬 AI Video Generator</h1>

      <textarea
        placeholder="Video prompt yaz..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />

      <br /><br />

      <button onClick={generateVideo} disabled={loading}>
        {loading ? "Üretiliyor..." : "Video Üret"}
      </button>

      <br /><br />

      {videoUrl && <video src={videoUrl} controls width="600" />}
    </div>
  );
}
