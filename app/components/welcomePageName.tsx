"use client";

import { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const INTRO_LINES = [
  "Hey! Thanks for stopping by.",
  "I'm a Computer Science graduate from UCF, passionate about building impactful software.",
  "I'm currently at Southern Glazer's Wine & Spirits building data, ML, and AI pipelines that help drive smarter business decisions at scale.",
  "Ask me anything below.",
];

const CHAR_DELAY = 22;
const LINE_DELAY = 180;

const SKILLS = [
  {
    area: "Frontend",
    color: "#54A0FF",
    items: [
      { name: "TypeScript", icon: "typescript", iconColor: "3178C6" },
      { name: "React",      icon: "react",      iconColor: "087EA4" },
    ],
  },
  {
    area: "Backend",
    color: "#FF6B6B",
    items: [
      { name: "Python",      icon: "python",     iconColor: "3776AB" },
      { name: "Java",        icon: "openjdk",    iconColor: "ED8B00" },
      { name: "Node.js",     icon: "nodedotjs",  iconColor: "339933" },
      { name: "Spring Boot", icon: "springboot", iconColor: "6DB33F" },
    ],
  },
  {
    area: "Mobile",
    color: "#FF9F43",
    items: [
      { name: "Swift",        icon: "swift", iconColor: "FA7343" },
      { name: "React Native", icon: "react", iconColor: "087EA4" },
    ],
  },
  {
    area: "Tools & Infrastructure",
    color: "#1DD1A1",
    items: [
      { name: "PostgreSQL", icon: "postgresql", iconColor: "4169E1" },
      { name: "Docker",     icon: "docker",     iconColor: "2496ED" },
      { name: "Git",        icon: "git",        iconColor: "F05032" },
    ],
  },
];

// Flat list used by the floating skill bubbles
const ALL_SKILLS = SKILLS.flatMap(({ color, items }) =>
  items.map((item) => ({ ...item, categoryColor: color }))
);

const EXPERIENCE_CURRENT = {
  src: "/SGWSlogo.png",
  alt: "Southern Glazer's Wine & Spirits",
  company: "Southern Glazer's Wine & Spirits",
  role: "OneTech Data Intern",
  period: "May 2026 – Present",
  bullets: [
    "Built internal AI agents using Python and ML tooling to automate stakeholder workflows, reducing manual overhead across business units.",
    "Maintained ML forecasting pipelines through data preprocessing and model monitoring to support business-critical decision-making at scale.",
    "Partnered with engineering and business teams to scope and deliver scalable AI/ML tools that streamline operations and improve productivity.",
  ],
};

const EXPERIENCE_PREVIOUS = [
  {
    src: "/AppleLogo.png",
    alt: "Apple Inc.",
    company: "Apple Inc.",
    roles: ["Apple College Program AHA"],
    period: "Mar 2023 – Sept 2024",
    bullets: [
      "Resolved 75+ weekly user cases in Apple's CORE system, maintaining a 92% satisfaction rate through efficient issue triage and resolution.",
      "Authored detailed technical case notes for senior engineers to improve issue traceability and knowledge sharing across the support team.",
      "Mentored peers on career development and Apple internship pathways, directly contributing to multiple students securing Apple internships.",
    ],
  },
  {
    src: "/lmlogo.jpeg",
    alt: "Lockheed Martin",
    company: "Lockheed Martin",
    roles: ["Full Stack Software Engineer Intern", "Systems Engineer Intern"],
    period: "Sept 2024 – May 2026",
    bullets: [
      "Developed an internal reporting web app with a searchable data grid, enabling senior stakeholders to view, filter, and manage structured workforce data efficiently.",
      "Built a Python-based Excel transformation tool to standardize legacy datasets, saving employees ~30 minutes per sheet by eliminating manual table restructuring.",
      "Documented systems engineering workflows and created onboarding materials for targeting-system programs, cutting new engineer ramp-up time by 25%.",
    ],
  },
];

const TECH_ICONS: Record<string, { icon: string; iconColor: string }> = {
  "Spring Boot":  { icon: "springboot",  iconColor: "6DB33F" },
  "React":        { icon: "react",       iconColor: "087EA4" },
  "React Native": { icon: "react",       iconColor: "087EA4" },
  "PostgreSQL":   { icon: "postgresql",  iconColor: "4169E1" },
  "OpenAI API":   { icon: "openai",      iconColor: "412991" },
  "Docker":       { icon: "docker",      iconColor: "2496ED" },
  "Node.js":      { icon: "nodedotjs",   iconColor: "339933" },
  "Express":      { icon: "express",     iconColor: "888888" },
  "MongoDB":      { icon: "mongodb",     iconColor: "47A248" },
  "TypeScript":   { icon: "typescript",  iconColor: "3178C6" },
  "Python":       { icon: "python",      iconColor: "3776AB" },
  "Swift":        { icon: "swift",       iconColor: "FA7343" },
};

const PROJECTS = [
  {
    id: "01",
    name: "Secure Payment Network",
    description:
      "Secure payment backend using Spring Boot and PostgreSQL supporting deposits and peer-to-peer transfers. Implemented JWT authentication, HTTPS encryption, and ACID-compliant transaction handling.",
    stack: ["Spring Boot", "React", "PostgreSQL", "OpenAI API", "Docker"],
    status: "IN DEV",
    accent: "#FECA57",
    github: "",
    demo: "",
  },
  {
    id: "02",
    name: "Data Insight Engine",
    description:
      "Full-stack analytics tool that ingests datasets and automatically generates insights — summary statistics, visualizations, and anomaly detection with dynamic charting.",
    stack: [],
    status: "COMING SOON",
    accent: "#FF9FF3",
    github: "",
    demo: "",
  },
  {
    id: "03",
    name: "Lema Energy Aggregator",
    description:
      "Cross-platform mobile app for scalable energy monitoring, reducing facility costs by up to 80%. Supports offline LAN-based meter polling with 95%+ uptime.",
    stack: ["React Native", "PostgreSQL", "Express", "Node.js"],
    status: "LIVE",
    accent: "#1DD1A1",
    github: "",
    demo: "",
  },
  {
    id: "04",
    name: "AI Paper Trading Platform",
    description:
      "Full-stack MERN trading simulator with sub-100ms latency for real-time trade execution. Integrates OpenAI API for market sentiment insights and Dockerized microservices.",
    stack: ["MongoDB", "Express", "React", "Node.js", "OpenAI API", "Docker"],
    status: "LIVE",
    accent: "#54A0FF",
    github: "",
    demo: "",
  },
];

interface Message {
  role: "user" | "assistant";
  text: string;
}

// ── FadeIn wrapper — slides + fades in when scrolled into view ─────────────────

function FadeIn({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionLabel({ children, color = "var(--text-secondary)" }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ margin: "0 0 10px 0", fontSize: "12px", fontWeight: 600, color, letterSpacing: "0.1em", textTransform: "uppercase" }}>
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ margin: "0 0 48px 0", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
      {children}
    </h2>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function PageContent() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [introComplete, setIntroComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (currentLine >= INTRO_LINES.length) { setIntroComplete(true); return; }
    const line = INTRO_LINES[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), CHAR_DELAY);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, LINE_DELAY);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar]);

  useEffect(() => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [displayedLines, messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let firstToken = true;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const token = decoder.decode(value, { stream: true });
        if (firstToken) {
          setLoading(false);
          setMessages((prev) => [...prev, { role: "assistant", text: token }]);
          firstToken = false;
        } else {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...updated[updated.length - 1], text: updated[updated.length - 1].text + token };
            return updated;
          });
        }
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, I couldn't reach the backend. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter") sendMessage(); };

  const activeLine = currentLine < INTRO_LINES.length ? INTRO_LINES[currentLine] : null;
  const activeText = activeLine ? activeLine.slice(0, currentChar) : "";

  return (
    <div style={{ position: "relative", background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── FULL-PAGE BACKGROUND ORBS ─────────────────────────────────────────── */}
      <div aria-hidden className="bg-orbs" />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section
        id="about"
        style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 40px", textAlign: "center" }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Profile photo — floating */}
          <div className="profile-photo" style={{ borderRadius: "50%", overflow: "hidden", marginBottom: "36px", flexShrink: 0, animation: "float 3.5s ease-in-out infinite", marginTop: "6px" }}>
            <img src="/profilePic.JPG" alt="Kevin Muniz" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <h1 style={{ margin: "0 0 6px 0", fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.02, color: "var(--text-primary)" }}>
            Kevin Muniz
          </h1>

          {/* Rainbow accent line */}
          <div style={{ width: "80px", height: "3px", borderRadius: "2px", background: "linear-gradient(90deg, #FF6B6B, #FF9F43, #FECA57, #1DD1A1, #54A0FF, #FF9FF3)", margin: "0 auto 20px" }} />

          <p style={{ margin: "0 0 18px 0", fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 400, color: "var(--text-secondary)", letterSpacing: "-0.01em" }}>
            Software Engineer
          </p>

          <p style={{ margin: "0 0 52px 0", fontSize: "17px", color: "var(--text-tertiary)", maxWidth: "480px", lineHeight: 1.65 }}>
            UCF Computer Science Graduate · Seeking full-time roles in software engineering, data engineering, or AI/ML.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="/KevinMunizResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "14px 28px", background: "linear-gradient(135deg, #FF6B6B, #FF9F43)", color: "#fff", borderRadius: "980px", textDecoration: "none", fontSize: "15px", fontWeight: 500, transition: "opacity 0.15s", boxShadow: "0 4px 20px rgba(255,107,107,0.35)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View Resume
            </a>
            <a
              href="mailto:muniz.kevin@outlook.com"
              style={{ padding: "14px 28px", background: "transparent", color: "var(--text-primary)", borderRadius: "980px", border: "1px solid var(--border-hover)", textDecoration: "none", fontSize: "15px", fontWeight: 500, transition: "border-color 0.15s, background 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--text-secondary)"; e.currentTarget.style.background = "var(--bg-pill)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.background = "transparent"; }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT + CHAT ──────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "40px 24px 80px", maxWidth: "680px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel color="#FF9FF3">About</SectionLabel>
          <SectionHeading>A bit about me</SectionHeading>

          {/* Bio paragraph */}
          <p style={{ margin: "0 0 40px 0", fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.75 }}>
            Engineering is more than a title to me. It is a mindset built on curiosity, problem-solving, and
            the desire to make things better. As a Computer Science graduate from UCF, I want to keep learning
            across software, data, AI, and emerging technologies so I can contribute as much as I can to building
            solutions that improve the world around us.
            <br /><br />
            
          </p>

          {/* Chat */}
          <p style={{ margin: "0 0 16px 0", fontSize: "13px", fontWeight: 500, color: "var(--text-tertiary)" }}>
            Or skip the bio and just ask me directly ↓
          </p>

          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "18px", overflow: "hidden", boxShadow: "var(--shadow)" }}>
            <div ref={chatContainerRef} style={{ padding: "24px", minHeight: "220px", maxHeight: "380px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
              {displayedLines.map((line, i) => (
                <p key={i} style={{ margin: 0, fontSize: "15px", color: "var(--text-primary)", lineHeight: 1.6 }}>{line}</p>
              ))}
              {activeLine && (
                <p style={{ margin: 0, fontSize: "15px", color: "var(--text-primary)", lineHeight: 1.6 }}>
                  {activeText}<span style={{ opacity: showCursor ? 1 : 0, color: "#FF9F43" }}>|</span>
                </p>
              )}
              {introComplete && messages.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginTop: "4px" }}>
                  <div style={{
                    maxWidth: "80%", padding: "10px 16px",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: msg.role === "user" ? "linear-gradient(135deg, #54A0FF, #FF9FF3)" : "var(--bg-chat-ai)",
                    color: msg.role === "user" ? "#fff" : "var(--text-primary)",
                    fontSize: "15px", lineHeight: 1.5,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "4px" }}>
                  <div style={{ padding: "12px 18px", borderRadius: "18px 18px 18px 4px", background: "var(--bg-chat-ai)" }}>
                    <span style={{ color: "var(--text-tertiary)", fontSize: "18px", letterSpacing: "3px" }}>···</span>
                  </div>
                </div>
              )}
            </div>
            <div style={{ borderTop: "1px solid var(--border)", padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px", background: "var(--bg-input)" }}>
              <input
                type="text"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={introComplete ? "Ask anything about Kevin…" : ""}
                disabled={!introComplete || loading}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: "15px", caretColor: "#FF9F43", opacity: introComplete ? 1 : 0.4 }}
              />
              <button
                onClick={sendMessage}
                disabled={!introComplete || loading || !input.trim()}
                style={{
                  width: "34px", height: "34px", borderRadius: "50%", border: "none", flexShrink: 0,
                  background: input.trim() && introComplete && !loading ? "linear-gradient(135deg, #FF6B6B, #FF9F43)" : "var(--bg-pill)",
                  cursor: input.trim() && introComplete && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 13V2M7.5 2L3 6.5M7.5 2L12 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────────────── */}
      <section id="skills" style={{ position: "relative", zIndex: 1, padding: "80px 24px", maxWidth: "980px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel color="#FF9F43">Expertise</SectionLabel>
          <SectionHeading>Skills</SectionHeading>
        </FadeIn>

        {/* Category legend */}
        <FadeIn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "32px" }}>
            {SKILLS.map(({ area, color }) => (
              <div key={area} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{area}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Floating bubbles */}
        <FadeIn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {ALL_SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                animate={{
                  y: [0, -(10 + (i % 4) * 4), 5, -(7 + (i % 3) * 5), 0],
                  x: [0, (i % 2 === 0 ? 6 : -6) + (i % 3) * 2, -(i % 4) * 2, (i % 3) * 3, 0],
                }}
                transition={{
                  duration: 4 + i * 0.65,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                whileHover={{ scale: 1.12, transition: { duration: 0.15 } }}
                style={{ display: "flex", cursor: "default" }}
              >
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "10px 16px", borderRadius: "980px", whiteSpace: "nowrap",
                  background: `${skill.categoryColor}15`,
                  border: `1px solid ${skill.categoryColor}45`,
                  boxShadow: `0 4px 16px ${skill.categoryColor}20`,
                  color: "var(--text-primary)", fontSize: "14px", fontWeight: 400,
                }}>
                  <img
                    src={`https://cdn.simpleicons.org/${skill.icon}/${skill.iconColor}`}
                    alt={skill.name}
                    width={16}
                    height={16}
                    style={{ flexShrink: 0 }}
                  />
                  {skill.name}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────────────────────────── */}
      <section id="experience" style={{ position: "relative", zIndex: 1, padding: "80px 24px", maxWidth: "980px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel color="#1DD1A1">Work History</SectionLabel>
          <SectionHeading>Experience</SectionHeading>
        </FadeIn>

        <FadeIn delay={80}>
          <p style={{ margin: "0 0 20px 0", fontSize: "12px", fontWeight: 600, color: "#1DD1A1", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Currently
          </p>
          <div className="exp-card" style={{ padding: "24px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "18px", boxShadow: "var(--shadow)", marginBottom: "48px" }}>
            <div className="exp-logo" style={{ width: "100px", height: "100px", borderRadius: "14px", overflow: "hidden", background: "#fff", flexShrink: 0, border: "1px solid var(--border)" }}>
              <img src={EXPERIENCE_CURRENT.src} alt={EXPERIENCE_CURRENT.alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: "0 0 2px 0", fontSize: "17px", fontWeight: 600, color: "var(--text-primary)" }}>
                {EXPERIENCE_CURRENT.company}
              </p>
              <p style={{ margin: "0 0 2px 0", fontSize: "15px", color: "var(--text-secondary)" }}>
                {EXPERIENCE_CURRENT.role}
              </p>
              <p style={{ margin: "0 0 14px 0", fontSize: "12px", color: "var(--text-tertiary)", fontWeight: 500 }}>
                {EXPERIENCE_CURRENT.period}
              </p>
              <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {EXPERIENCE_CURRENT.bullets.map((b) => (
                  <li key={b} style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55 }}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={160}>
          <p style={{ margin: "0 0 20px 0", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Previously
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {EXPERIENCE_PREVIOUS.map(({ src, alt, company, roles, period, bullets }) => (
              <div key={company} className="exp-card" style={{ padding: "24px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "18px", boxShadow: "var(--shadow)" }}>
                <div className="exp-logo" style={{ width: "100px", height: "100px", borderRadius: "14px", overflow: "hidden", background: "#fff", flexShrink: 0, border: "1px solid var(--border)" }}>
                  <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: "0 0 2px 0", fontSize: "17px", fontWeight: 600, color: "var(--text-primary)" }}>{company}</p>
                  {roles.map((role) => (
                    <p key={role} style={{ margin: "2px 0 0 0", fontSize: "15px", color: "var(--text-secondary)" }}>{role}</p>
                  ))}
                  <p style={{ margin: "2px 0 14px 0", fontSize: "12px", color: "var(--text-tertiary)", fontWeight: 500 }}>{period}</p>
                  <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {bullets.map((b) => (
                      <li key={b} style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────────────── */}
      <section id="projects" style={{ position: "relative", zIndex: 1, padding: "80px 24px", maxWidth: "980px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel color="#54A0FF">Work</SectionLabel>
          <SectionHeading>Projects</SectionHeading>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 440px), 1fr))", gap: "16px" }}>
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.id} delay={i * 80}>
              <div
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "18px", padding: "28px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "var(--shadow)", transition: "border-color 0.2s, box-shadow 0.2s", height: "100%" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = project.accent; e.currentTarget.style.boxShadow = `0 0 0 1px ${project.accent}40, var(--shadow)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
              >
                {/* Status + number */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: project.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>{project.status}</span>
                  <span style={{ fontSize: "12px", color: "var(--text-tertiary)", fontWeight: 500 }}>{project.id}</span>
                </div>

                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
                  {project.name}
                </h3>

                <p style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.65, flexGrow: 1 }}>
                  {project.description}
                </p>

                {project.stack.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {project.stack.map((tech) => {
                      const meta = TECH_ICONS[tech];
                      return (
                        <span key={tech} style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 12px", borderRadius: "980px", background: "var(--bg-pill)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "12px", fontWeight: 400 }}>
                          {meta && <img src={`https://cdn.simpleicons.org/${meta.icon}/${meta.iconColor}`} alt="" width={12} height={12} style={{ display: "block" }} />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Links — only rendered when a URL is provided */}
                {(project.github || project.demo) && (
                  <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.15s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 500, color: project.accent, textDecoration: "none", transition: "opacity 0.15s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{ position: "relative", zIndex: 1, padding: "100px 24px 120px", textAlign: "center" }}
      >
        <FadeIn>
          <SectionLabel color="#FF6B6B">Get in touch</SectionLabel>

          <h2 style={{ margin: "0 0 20px 0", fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            Let&apos;s work together.
          </h2>

          <p style={{ margin: "0 auto 48px", fontSize: "17px", color: "var(--text-secondary)", maxWidth: "440px", lineHeight: 1.7 }}>
            I&apos;m open to full-time opportunities and always happy to connect. Whether you have a role in mind or just want to say hello — reach out.
          </p>

          <a
            href="mailto:muniz.kevin@outlook.com"
            style={{ display: "inline-block", padding: "18px 40px", background: "linear-gradient(135deg, #FF6B6B, #FF9F43)", color: "#fff", borderRadius: "980px", textDecoration: "none", fontSize: "17px", fontWeight: 600, boxShadow: "0 8px 32px rgba(255,107,107,0.35)", transition: "opacity 0.15s, transform 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            muniz.kevin@outlook.com
          </a>

        </FadeIn>
      </section>

    </div>
  );
}
