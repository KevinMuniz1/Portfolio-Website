import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Color orbs */}
        <div style={{ position: "absolute", top: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,107,107,0.25)", filter: "blur(80px)", display: "flex" }} />
        <div style={{ position: "absolute", top: -80, right: -80, width: 450, height: 450, borderRadius: "50%", background: "rgba(84,160,255,0.2)", filter: "blur(80px)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -100, right: 200, width: 400, height: 400, borderRadius: "50%", background: "rgba(29,209,161,0.18)", filter: "blur(80px)", display: "flex" }} />

        {/* KM badge */}
        <div style={{
          width: 72, height: 72, borderRadius: 16,
          background: "linear-gradient(135deg, #FF6B6B, #FF9F43)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 32,
          letterSpacing: "-1px",
        }}>
          KM
        </div>

        <div style={{ fontSize: 72, fontWeight: 700, color: "#F5F5F7", letterSpacing: "-3px", lineHeight: 1, marginBottom: 16, display: "flex" }}>
          Kevin Muniz
        </div>

        {/* Rainbow line */}
        <div style={{ width: 120, height: 4, borderRadius: 2, background: "linear-gradient(90deg, #FF6B6B, #FF9F43, #FECA57, #1DD1A1, #54A0FF, #FF9FF3)", marginBottom: 24, display: "flex" }} />

        <div style={{ fontSize: 28, color: "#86868B", fontWeight: 400, marginBottom: 48, display: "flex" }}>
          Software Engineer
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["TypeScript", "React", "Python", "Node.js", "Spring Boot", "Swift"].map((tech) => (
            <div key={tech} style={{
              padding: "8px 18px", borderRadius: 980,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              color: "#F5F5F7", fontSize: 15, fontWeight: 400,
              display: "flex",
            }}>
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
