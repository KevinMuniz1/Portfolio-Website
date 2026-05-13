import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          background: "#0D0D0D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 700, color: "#FF6B6B", lineHeight: 1 }}>{"{"}</span>
        <span style={{ fontSize: 26, fontWeight: 800, color: "#F5F5F7", letterSpacing: "-1px", lineHeight: 1 }}>K</span>
        <span style={{ fontSize: 24, fontWeight: 700, color: "#FF9F43", lineHeight: 1 }}>{"}"}</span>
      </div>
    ),
    { ...size }
  );
}
