"use client";

import { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import Link from "next/link";

// ── CONFIG ──────────────────────────────────────────────────────────────────
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ── INTRO LINES ──────────────────────────────────────────────────────────────
const LINES = [
  { prefix: "C:\\> ", text: "WHO AM I?", color: "#fff" },
  { prefix: "> ", text: "NAME    : Kevin Muniz", color: "#f0e8ff" },
  { prefix: "> ", text: "EDUCATION  : UCF — B.S. Computer Science", color: "#f0e8ff" },
  { prefix: "> ", text: "Currently looking for full-time roles involving Web/App development or AI and Machine Learning", color: "#f0e8ff" },
  { prefix: "> ", text: "Ask me anything below!", color: "#f0e8ff" },
];

const CHAR_DELAY = 28;
const LINE_DELAY = 180;

// ── PROJECTS DATA ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "01",
    name: "PORTFOLIO SITE",
    description:
      "Personal developer portfolio with a retro gaming aesthetic. Features a live AI-powered terminal chat, animated intro sequence, and pixel-art UI components.",
    stack: ["NEXT.JS", "TAILWIND CSS", "TYPESCRIPT", "PYTHON"],
    status: "LIVE",
  },
  {
    id: "02",
    name: "ENERGY MONITOR",
    description:
      "React Native mobile dashboard for real-time energy monitoring. Grid-based card layout with auth flow, session persistence via AsyncStorage, and dynamic data visualization.",
    stack: ["REACT NATIVE", "EXPO", "TYPESCRIPT", "NODE.JS"],
    status: "IN DEV",
  },
  {
    id: "03",
    name: "AI CHAT API",
    description:
      "FastAPI backend powering the portfolio terminal chat. Integrates with Anthropic's Claude API with web search, streaming responses, and source attribution.",
    stack: ["PYTHON", "FASTAPI", "CLAUDE API", "POSTGRESQL"],
    status: "LIVE",
  },
  {
    id: "04",
    name: "PROJECT ALPHA",
    description:
      "Placeholder for your next project. Drop in a name, description, and tech stack and this card will slot right in with the rest.",
    stack: ["REACT", "NODE.JS", "POSTGRESQL"],
    status: "SOON",
  },
];

const STATUS_STYLE: Record<string, { color: string; border: string; bg: string }> = {
  LIVE:     { color: "#00cc66", border: "#00cc66", bg: "rgba(0,204,102,0.1)" },
  "IN DEV": { color: "#ffcc00", border: "#ffcc00", bg: "rgba(255,204,0,0.1)" },
  SOON:     { color: "#aa44ff", border: "#aa44ff", bg: "rgba(170,68,255,0.1)" },
};

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  text: string;
  sources?: { title?: string; url?: string }[];
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function Home() {
  // intro typing
  const [displayed, setDisplayed] = useState<{ prefix: string; text: string; color: string }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);

  // chat
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── cursor blink ────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  // ── intro animation ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (currentLine >= LINES.length) {
      setIntroComplete(true);
      return;
    }
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

  // ── auto-scroll ─────────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── send message ────────────────────────────────────────────────────────────
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        text: data.reply ?? "No response received.",
        sources: data.sources ?? [],
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "ERROR: Could not reach the backend. Is it running?" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const activeLine = currentLine < LINES.length ? LINES[currentLine] : null;
  const activeText = activeLine ? activeLine.text.slice(0, currentChar) : "";

  // ── RENDER ──────────────────────────────────────────────────────────────────
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

      {/* ── ABOVE-FOLD CONTENT ────────────────────────────────────────────────── */}
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

          {/* Terminal / Chat */}
          <div className="w-full" style={{ border: "2px solid #aa44ff", background: "#0f0018" }}>
            {/* Title bar */}
            <div style={{ background: "#aa44ff", padding: "5px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#0a0010" }}>TERMINAL v2.4</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#ff2060]" />
                <div className="w-2 h-2 bg-[#ffcc00]" />
                <div className="w-2 h-2 bg-[#00cc66]" />
              </div>
            </div>

            {/* Scrollable message area */}
            <div
              style={{
                padding: "14px 16px",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "14px",
                lineHeight: "1.9",
                minHeight: "200px",
                maxHeight: "420px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {/* Intro animation */}
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

              {/* Chat history */}
              {introComplete && messages.map((msg, i) => (
                <div key={i} style={{ marginTop: "6px" }}>
                  {msg.role === "user" ? (
                    <div>
                      <span style={{ color: "#ff2060" }}>C:\&gt; </span>
                      <span style={{ color: "#fff" }}>{msg.text}</span>
                    </div>
                  ) : (
                    <div>
                      <span style={{ color: "#aa44ff" }}>&gt; </span>
                      <span style={{ color: "#f0e8ff" }}>{msg.text}</span>
                      {msg.sources && msg.sources.length > 0 && (
                        <div style={{ marginTop: "4px", paddingLeft: "16px" }}>
                          {msg.sources.map((s, si) => s.url ? (
                            <div key={si} style={{ fontSize: "11px", color: "#aa44ff", opacity: 0.7 }}>
                              <span style={{ color: "#ff2060" }}>SRC: </span>
                              <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: "#aa44ff", textDecoration: "underline" }}>
                                {s.title ?? s.url}
                              </a>
                            </div>
                          ) : null)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div style={{ marginTop: "6px" }}>
                  <span style={{ color: "#aa44ff" }}>&gt; </span>
                  <span style={{ color: "#aa44ff", opacity: showCursor ? 1 : 0.3 }}>█ █ █</span>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div
              style={{
                borderTop: "1px solid #aa44ff33",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#0a0010",
              }}
            >
              <span style={{ color: "#ff2060", fontFamily: "'Share Tech Mono', monospace", fontSize: "14px", whiteSpace: "nowrap" }}>
                C:\&gt;
              </span>
              <input
                type="text"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={introComplete ? "Type your question..." : ""}
                disabled={!introComplete || loading}
                autoFocus={introComplete}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "14px",
                  caretColor: "#aa44ff",
                  opacity: introComplete ? 1 : 0.4,
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!introComplete || loading || !input.trim()}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "9px",
                  padding: "6px 12px",
                  background: input.trim() && introComplete && !loading ? "#ff2060" : "#2a0020",
                  color: input.trim() && introComplete && !loading ? "#fff" : "#aa44ff",
                  border: "2px solid #ff2060",
                  cursor: input.trim() && introComplete && !loading ? "pointer" : "not-allowed",
                  transition: "background 0.15s",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}
              >
                SEND &gt;
              </button>
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
            href="#projects"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "16px", padding: "12px 24px", background: "transparent", color: "#aa44ff", border: "2px solid #aa44ff", textDecoration: "none", letterSpacing: "0.08em" }}
          >
            PROJECTS &gt;&gt;
          </a>
        </div>

        {/* Tech stack */}
        <div className="w-full max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px", color: "#ff2060", whiteSpace: "nowrap" }}>Skills:</span>
            <div style={{ flex: 1, height: "2px", background: "repeating-linear-gradient(90deg, #ff2060 0, #ff2060 6px, transparent 6px, transparent 12px)" }} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              "REACT NATIVE", "TYPESCRIPT", "PYTHON", "REACT",
              "NODE.JS", "SWIFT", "JAVA", "POSTGRESQL", "GIT",
            ].map((label) => (
              <span
                key={label}
                style={{
                  fontFamily: "'Share Tech Mono', monospace", fontSize: "13px",
                  color: "#ff2060", padding: "3px 10px",
                  border: "2px solid #ff2060", background: "#1a000a", letterSpacing: "0.06em",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ── PROJECTS SECTION ──────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="relative z-20 flex flex-col items-center px-4 pb-20 pt-4 gap-10"
      >
        {/* Section divider */}
        <div className="w-full max-w-4xl flex items-center gap-4">
          <div style={{ flex: 1, height: "1px", background: "repeating-linear-gradient(90deg, #aa44ff 0, #aa44ff 6px, transparent 6px, transparent 12px)", opacity: 0.4 }} />
          <div style={{ border: "2px solid #aa44ff", padding: "6px 16px", background: "#0f0018" }}>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#aa44ff", letterSpacing: "0.15em" }}>
              SELECT STAGE
            </span>
          </div>
          <div style={{ flex: 1, height: "1px", background: "repeating-linear-gradient(90deg, #aa44ff 0, #aa44ff 6px, transparent 6px, transparent 12px)", opacity: 0.4 }} />
        </div>

        {/* Section heading */}
        <div className="w-full max-w-4xl flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span style={{ color: "#ff2060", fontSize: "10px", fontFamily: "'Press Start 2P', monospace" }}>&#9658;</span>
            <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(18px, 4vw, 26px)", color: "#fff", margin: 0, letterSpacing: "0.05em" }}>
              PROJECTS
            </h2>
          </div>
          <div style={{ height: "2px", background: "repeating-linear-gradient(90deg, #ff2060 0, #ff2060 6px, transparent 6px, transparent 12px)", maxWidth: "180px", marginLeft: "22px" }} />
        </div>

        {/* Project cards grid */}
        <div
          className="w-full max-w-4xl"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "24px",
          }}
        >
          {PROJECTS.map((project) => {
            const statusStyle = STATUS_STYLE[project.status] ?? STATUS_STYLE["SOON"];
            return (
              <div key={project.id} className="relative" style={{ border: "2px solid #aa44ff", background: "#0f0018" }}>

                {/* Pixel corner dots */}
                <div className="absolute -top-[3px] -left-[3px] w-[5px] h-[5px] bg-[#ff2060]" />
                <div className="absolute -top-[3px] -right-[3px] w-[5px] h-[5px] bg-[#ff2060]" />
                <div className="absolute -bottom-[3px] -left-[3px] w-[5px] h-[5px] bg-[#ff2060]" />
                <div className="absolute -bottom-[3px] -right-[3px] w-[5px] h-[5px] bg-[#ff2060]" />

                {/* Card header bar */}
                <div
                  style={{
                    background: "#aa44ff",
                    padding: "5px 12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#0a0010" }}>
                    PROJECT_{project.id}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "8px",
                      color: statusStyle.color,
                      background: statusStyle.bg,
                      border: `1px solid ${statusStyle.border}`,
                      padding: "2px 6px",
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Card body */}
                <div style={{ padding: "16px" }}>
                  <h3
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "13px",
                      color: "#fff",
                      margin: "0 0 10px 0",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {project.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "13px",
                      color: "#f0e8ff",
                      lineHeight: "1.8",
                      margin: "0 0 16px 0",
                      opacity: 0.85,
                    }}
                  >
                    {project.description}
                  </p>

                  <div style={{ height: "1px", background: "#aa44ff33", marginBottom: "12px" }} />

                  <div>
                    <span
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "8px",
                        color: "#ff2060",
                        display: "block",
                        marginBottom: "8px",
                        letterSpacing: "0.1em",
                      }}
                    >
                      STACK:
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: "11px",
                            color: "#ff2060",
                            padding: "2px 8px",
                            border: "2px solid #ff2060",
                            background: "#1a000a",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <a
          href="mailto:muniz.kevin@outlook.com"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "13px",
            padding: "12px 28px",
            background: "#ff2060",
            color: "#fff",
            border: "2px solid #ff6090",
            textDecoration: "none",
            letterSpacing: "0.08em",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          &#9654; CONTACT ME
        </a>

      </section>
    </main>
  );
}