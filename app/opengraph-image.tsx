import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Yashwant Kariha — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex",
          flexDirection: "column", justifyContent: "space-between",
          background: "#f0ebe0", padding: "72px 80px",
          fontFamily: "sans-serif", position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", letterSpacing: "0.22em", color: "#8b7355", textTransform: "uppercase" }}>
          <span>Portfolio</span>
          <span style={{ color: "#c4a882" }}>·</span>
          <span>Full-Stack Developer</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "88px", fontWeight: 800, letterSpacing: "-0.03em", color: "#18180f", lineHeight: 1.0 }}>YASHWANT</div>
          <div style={{ fontSize: "88px", fontWeight: 800, letterSpacing: "-0.03em", color: "#18180f", lineHeight: 1.0 }}>KARIHA</div>
          <div style={{ fontSize: "22px", letterSpacing: "0.08em", color: "#5a5545", marginTop: "8px" }}>
            Building digital products, AI systems & modern web experiences.
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            {["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "OpenAI"].map((tech) => (
              <div key={tech} style={{ background: "rgba(139,115,85,0.12)", border: "1px solid rgba(196,168,130,0.5)", color: "#6b5d42", fontSize: "13px", letterSpacing: "0.1em", padding: "6px 14px" }}>
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: "64px", height: "2px", background: "#c4a882" }} />
          <div style={{ fontSize: "13px", letterSpacing: "0.2em", color: "#9c8d78", textTransform: "uppercase" }}>
            github.com/YASH1702
          </div>
        </div>

        <div style={{ position: "absolute", top: "72px", right: "80px", width: "8px", height: "8px", borderRadius: "50%", background: "#c4a882" }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
