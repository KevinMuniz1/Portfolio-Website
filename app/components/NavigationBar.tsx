"use client";
import Link from "next/link";
import { useState } from "react";
import "../globals.css";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/experiences", label: "EXP" },
    { href: "/projects",    label: "PROJ" },
    { href: "/skills",      label: "SKILLS" },
    { href: "/",            label: "HOME" },
  ];

  return (
    <nav
      className="w-full relative"
      style={{
        background: "rgba(10,0,16,0.97)",
        borderBottom: "2px solid #cc0044",
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      <div className="flex items-center justify-between px-5 py-2.5">

        {/* LEFT — Logo + icon links */}
        <div className="flex items-center gap-3">

          {/* KM pixel logo box */}
          <div className="relative Shrink-0">
            <div
              style={{
                fontSize: "12px",
                color: "#ff2060",
                padding: "7px 12px",
                border: "2px solid #ff2060",
                background: "#1a000a",
                letterSpacing: "0.1em",
                imageRendering: "pixelated",
              }}
            >
              KM
            </div>
            <div className="absolute -top-[3px] -left-[3px] w-[5px] h-[5px] bg-[#ff2060]" />
            <div className="absolute -top-[3px] -right-[3px] w-[5px] h-[5px] bg-[#ff2060]" />
            <div className="absolute -bottom-[3px] -left-[3px] w-[5px] h-[5px] bg-[#ff2060]" />
            <div className="absolute -bottom-[3px] -right-[3px] w-[5px] h-[5px] bg-[#ff2060]" />
          </div>

          {/* Name + subtext */}
          <div className="hidden sm:block">
            <div style={{ fontSize: "6px", color: "#ff2060", letterSpacing: "0.08em", lineHeight: "1.8" }}>
              KEVIN MUNIZ
            </div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "13px",
                color: "#aa44ff",
                letterSpacing: "0.15em",
              }}
            >
              PLAYER ONE &bull; UCF NODE
            </div>
          </div>

          {/* Icon links */}
          <div className="flex items-center gap-2 ml-3">
            <a
              href="https://github.com/KevinMuniz1"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "6px",
                color: "#ff2060",
                padding: "7px 10px",
                border: "2px solid #ff2060",
                background: "#1a000a",
                letterSpacing: "0.05em",
                textDecoration: "none",
              }}
            >
              GH
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "6px",
                color: "#ff2060",
                padding: "7px 10px",
                border: "2px solid #ff2060",
                background: "#1a000a",
                letterSpacing: "0.05em",
                textDecoration: "none",
              }}
            >
              CV
            </a>
            <a
              href="https://www.linkedin.com/in/muniz-kevin/"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "6px",
                color: "#ff2060",
                padding: "7px 10px",
                border: "2px solid #ff2060",
                background: "#1a000a",
                letterSpacing: "0.05em",
                textDecoration: "none",
              }}
            >
              LI
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div
          className="hidden md:flex gap-[1px] overflow-hidden"
          style={{ border: "2px solid #aa44ff" }}
        >
          {links.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: "6px",
                color: i === links.length - 1 ? "#0a0010" : "#aa44ff",
                background: i === links.length - 1 ? "#aa44ff" : "transparent",
                padding: "9px 14px",
                borderRight: i < links.length - 1 ? "1px solid #330055" : "none",
                letterSpacing: "0.05em",
                textDecoration: "none",
                display: "block",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* MOBILE toggle */}
        <button
          className="md:hidden"
          style={{ color: "#ff2060", background: "none", border: "2px solid #ff2060", padding: "6px 8px" }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-5 h-5" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE dropdown */}
      {isOpen && (
        <div
          className="md:hidden flex flex-col gap-1 px-5 pb-4"
          style={{
            background: "rgba(10,0,16,0.97)",
            borderTop: "1px solid #330055",
          }}
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "8px",
                color: "#aa44ff",
                textDecoration: "none",
                padding: "10px 14px",
                borderLeft: "3px solid #ff2060",
                letterSpacing: "0.08em",
                display: "block",
              }}
            >
              &gt; {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}