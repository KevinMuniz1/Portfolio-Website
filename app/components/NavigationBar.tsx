"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "ABOUT",      href: "#about" },
  { label: "SKILLS",     href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS",   href: "#projects" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        background: "rgba(10,0,16,0.97)",
        borderBottom: "2px solid #cc0044",
        fontFamily: "'Press Start 2P', monospace",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {/* Main bar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4">

        {/* Left: section links (desktop only) */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: "13px",
                color: "#f0e8ff",
                textDecoration: "none",
                letterSpacing: "0.1em",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff2060")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#f0e8ff")}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right: social icons */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <a href="https://github.com/KevinMuniz1" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
            <img src="/github.png" className="w-14 h-14" alt="GitHub" />
            <span style={{ color: "#aa44ff", fontSize: "13px" }}>GitHub</span>
          </a>
          <a href="/KevinMunizResume.pdf" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
            <img src="/resumeIcon.png" className="w-14 h-14" alt="Resume" />
            <span style={{ color: "#aa44ff", fontSize: "13px" }}>Resume</span>
          </a>
          <a href="https://www.linkedin.com/in/muniz-kevin/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
            <img src="/linkedin.png" className="w-14 h-14" alt="LinkedIn" />
            <span style={{ color: "#aa44ff", fontSize: "13px" }}>LinkedIn</span>
          </a>
          <a
            href="mailto:muniz.kevin@outlook.com"
            style={{
              fontSize: "11px",
              padding: "10px 18px",
              background: "transparent",
              color: "#fff",
              border: "2px solid #aa44ff",
              textDecoration: "none",
              letterSpacing: "0.08em",
            }}
          >
            CONTACT
          </a>
        </div>

        {/* Mobile: social icons + hamburger */}
        <div className="flex md:hidden items-center gap-4 w-full justify-between">
          <div className="flex items-center gap-4">
            <a href="https://github.com/KevinMuniz1" target="_blank" rel="noopener noreferrer">
              <img src="/github.png" className="w-12 h-12" alt="GitHub" />
            </a>
            <a href="/KevinMunizResume.pdf" target="_blank" rel="noopener noreferrer">
              <img src="/resumeIcon.png" className="w-12 h-12" alt="Resume" />
            </a>
            <a href="https://www.linkedin.com/in/muniz-kevin/" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.png" className="w-12 h-12" alt="LinkedIn" />
            </a>
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen((v) => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
            aria-label="Toggle menu"
          >
            <div style={{ width: "26px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ display: "block", height: "2px", background: open ? "#ff2060" : "#f0e8ff", transition: "all 0.15s", transform: open ? "translateY(8px) rotate(45deg)" : "none", transformOrigin: "center" }} />
              <span style={{ display: "block", height: "2px", background: open ? "transparent" : "#f0e8ff", transition: "all 0.15s" }} />
              <span style={{ display: "block", height: "2px", background: open ? "#ff2060" : "#f0e8ff", transition: "all 0.15s", transform: open ? "translateY(-8px) rotate(-45deg)" : "none", transformOrigin: "center" }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="flex md:hidden flex-col"
          style={{ borderTop: "1px solid #aa44ff33", background: "rgba(10,0,16,0.99)" }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                padding: "16px 24px",
                fontSize: "12px",
                color: "#f0e8ff",
                textDecoration: "none",
                letterSpacing: "0.1em",
                borderBottom: "1px solid #aa44ff22",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="mailto:muniz.kevin@outlook.com"
            onClick={() => setOpen(false)}
            style={{
              padding: "16px 24px",
              fontSize: "12px",
              color: "#ff2060",
              textDecoration: "none",
              letterSpacing: "0.1em",
            }}
          >
            CONTACT
          </a>
        </div>
      )}
    </nav>
  );
}
