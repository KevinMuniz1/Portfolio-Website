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
        {/* Name / logo */}
        <a
          href="#about"
          style={{
            fontSize: "17px",
            fontWeight: 600,
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          Kevin Muniz
        </a>

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
