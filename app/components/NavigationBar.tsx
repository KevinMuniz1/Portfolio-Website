"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
];

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/KevinMuniz1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muniz-kevin/" },
  { label: "Resume",   href: "/KevinMunizResume.pdf" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: "64px",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        background: "var(--bg-nav)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          padding: "0 24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Name / logo — hidden on mobile */}
        <a
          href="#about"
          className="hidden md:block"
          style={{ fontSize: "17px", fontWeight: 600, color: "var(--text-primary)", textDecoration: "none", letterSpacing: "-0.02em" }}
        >
          Kevin Muniz
        </a>

        {/* Social icons — mobile only, replaces name */}
        <div className="flex md:hidden" style={{ alignItems: "center", gap: "20px" }}>
          <a href="https://github.com/KevinMuniz1" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-primary)", display: "flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/muniz-kevin/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-primary)", display: "flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="/KevinMunizResume.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-primary)", display: "flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6zm2-5h8v1H8v-1zm0-3h8v1H8v-1zm0 6h5v1H8v-1z"/></svg>
          </a>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop social + contact CTA */}
        <div className="hidden md:flex items-center gap-5">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {label}
            </a>
          ))}
          <a
            href="mailto:muniz.kevin@outlook.com"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              padding: "7px 18px",
              background: "var(--accent)",
              color: "#fff",
              borderRadius: "980px",
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] p-2"
          onClick={() => setOpen((v) => !v)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--text-primary)", transition: "all 0.2s", transform: open ? "translateY(6.5px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--text-primary)", transition: "all 0.2s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--text-primary)", transition: "all 0.2s", transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          style={{
            background: "var(--bg-surface)",
            borderTop: "1px solid var(--border)",
            padding: "8px 24px 20px",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "14px 0",
                fontSize: "17px",
                color: "var(--text-primary)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="mailto:muniz.kevin@outlook.com"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "14px 0",
              fontSize: "17px",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
