"use client";

import { useEffect, useState } from "react";

const LINES = [
  { prefix: "C:\\> ", text: "WHO AM I?", color: "#fff" },
  { prefix: "> ", text: "NAME    : Kevin Muniz", color: "#f0e8ff" },
  { prefix: "> ", text: "EDUCATION  : UCF — B.S. Computer Science", color: "#f0e8ff" },
  { prefix: "> ", text: "Currently looking for full-time roles involving Web/App development or AI and Machine Learning", color: "#f0e8ff" },
];

const CHAR_DELAY = 28;
const LINE_DELAY = 180;

export default function Home() {
  const [displayed, setDisplayed] = useState<{ prefix: string; text: string; color: string }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLine >= LINES.length) return;
    const line = LINES[currentLine];
    if (currentChar < line.text.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), CHAR_DELAY);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, LINE_DELAY);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar]);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  const activeLine = currentLine < LINES.length ? LINES[currentLine] : null;
  const activeText = activeLine ? activeLine.text.slice(0, currentChar) : "";

  return (
    <main
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: "#0a0010" }}
    >
      {/* Pixel grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,60,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(180,60,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-0"
        style={{
          height: "40vh",
          backgroundImage:
            "linear-gradient(rgba(255,60,120,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,60,120,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 24px",
          transform: "perspective(260px) rotateX(62deg)",
          transformOrigin: "bottom center",
        }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180,60,255,0.015) 2px, rgba(180,60,255,0.015) 3px)",
        }}
      />

      {/* Glow top-right */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "-160px", right: "-80px",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,60,120,0.25) 0%, transparent 65%)",
        }}
      />

      {/* Glow bottom-left */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: "10%", left: "-80px",
          width: "350px", height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,0,255,0.25) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12 gap-10">

        {/* Player badge */}
        <div className="flex items-center gap-2">
          <span style={{ color: "#ff2060", fontSize: "10px", fontFamily: "'Press Start 2P', monospace" }}>&#9658;</span>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "16px", color: "#f0e8ff", letterSpacing: "0.25em" }}>
            Hey! I'm Kevin Muniz
          </span>
        </div>

        {/* Avatar + Terminal */}
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">

          {/* Avatar frame */}
          <div className="relative">
            <div style={{ border: "3px solid #ff2060", background: "#0f0018" }}>
              <div style={{ background: "#ff2060", padding: "5px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px", color: "#fff" }}>PLAYER AVATAR</span>
                <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px", color: "#fff" }}>P1</span>
              </div>
              <div style={{ position: "relative" }}>
                <img
                  src="/profilePic.JPG"
                  alt="Kevin Muniz"
                  className="object-cover w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 block"
                  style={{ filter: "contrast(1.05) saturate(1.1)" }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(170,68,255,0.025) 2px, rgba(170,68,255,0.025) 3px)" }}
                />
                <div
                  className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1"
                  style={{ background: "rgba(10,0,16,0.9)", border: "2px solid #aa44ff" }}
                >
                  <div className="w-1.5 h-1.5 bg-[#00cc66] animate-pulse" />
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#aa44ff", letterSpacing: "0.1em" }}>ONLINE</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-[3px] -left-[3px] w-[5px] h-[5px] bg-[#ff2060]" />
            <div className="absolute -top-[3px] -right-[3px] w-[5px] h-[5px] bg-[#ff2060]" />
            <div className="absolute -bottom-[3px] -left-[3px] w-[5px] h-[5px] bg-[#ff2060]" />
            <div className="absolute -bottom-[3px] -right-[3px] w-[5px] h-[5px] bg-[#ff2060]" />
          </div>

          {/* Terminal typing block */}
          <div className="w-full" style={{ border: "2px solid #aa44ff", background: "#0f0018" }}>
            <div style={{ background: "#aa44ff", padding: "5px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#0a0010" }}>TERMINAL v2.4</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#ff2060]" />
                <div className="w-2 h-2 bg-[#ffcc00]" />
                <div className="w-2 h-2 bg-[#00cc66]" />
              </div>
            </div>
            <div style={{ padding: "14px 16px", fontFamily: "'Share Tech Mono', monospace", fontSize: "15px", lineHeight: "1.9", minHeight: "160px" }}>
              {displayed.map((line, i) => (
                <div key={i}>
                  <span style={{ color: "#ff2060" }}>{line.prefix}</span>
                  <span style={{ color: line.color }}>{line.text}</span>
                </div>
              ))}
              {activeLine && (
                <div>
                  <span style={{ color: "#ff2060" }}>{activeLine.prefix}</span>
                  <span style={{ color: activeLine.color }}>{activeText}</span>
                  <span style={{ opacity: showCursor ? 1 : 0, color: "#aa44ff" }}>█</span>
                </div>
              )}
              {!activeLine && (
                <div>
                  <span style={{ color: "#ff2060" }}>C:\&gt; </span>
                  <span style={{ opacity: showCursor ? 1 : 0, color: "#aa44ff" }}>█</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="mailto:muniz.kevin@outlook.com"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "16px", padding: "12px 24px", background: "#ff2060", color: "#fff", border: "2px solid #ff6090", textDecoration: "none", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            &#9654; CONTACT
          </a>
          <a
            href="/projects"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "16px", padding: "12px 24px", background: "transparent", color: "#aa44ff", border: "2px solid #aa44ff", textDecoration: "none", letterSpacing: "0.08em" }}
          >
            PROJECTS &gt;&gt;
          </a>
        </div>



        {/* Tech stack */}
        <div className="w-full max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px", color: "#ff2060", whiteSpace: "nowrap" }}>TECH STACK:</span>
            <div style={{ flex: 1, height: "2px", background: "repeating-linear-gradient(90deg, #ff2060 0, #ff2060 6px, transparent 6px, transparent 12px)" }} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "REACT NATIVE", hot: true },
              { label: "TYPESCRIPT",   hot: true },
              { label: "PYTHON",  hot: false },
              { label: "REACT",        hot: false },
              { label: "NODE.JS",      hot: false },
              { label: "SWIFT",       hot: false },
              { label: "JAVA",         hot: false },
              { label: "POSTGRESQL",   hot: false },
              { label: "GIT",          hot: false },
            ].map((t) => (
              <span key={t.label} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "13px", color: t.hot ? "#ff2060" : "#aa44ff", padding: "3px 10px", border: `2px solid ${t.hot ? "#ff2060" : "#aa44ff"}`, background: t.hot ? "#1a000a" : "#0f0018", letterSpacing: "0.06em" }}>
                {t.label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}