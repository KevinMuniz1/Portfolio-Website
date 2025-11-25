"use client";

import Link from "next/link";
import { useState } from "react";
import "../globals.css";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/experiences", label: "Experiences" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/", label: "Home" },
  ];

  return (
    <nav className="bg-cyber-navy border-b-2 border-cyber-magenta w-full flex items-center justify-between px-4 py-2 relative">

      {/* LEFT ICONS — KEPT FULL SIZE */}
      <div className="flex items-center gap-3">
        <a href="https://github.com/KevinMuniz1" target="_blank">
          <img src="/github.png" className="w-20 h-20 hover:scale-110" />
        </a>

        <a href="/resume.pdf" target="_blank">
          <img src="/resumeIcon.png" className="w-20 h-20 hover:scale-110" />
        </a>

        <a href="https://www.linkedin.com/in/muniz-kevin/" target="_blank">
          <img src="/linkedin.png" className="w-20 h-20 hover:scale-110" />
        </a>
      </div>

      {/* CENTER NAV (DESKTOP ONLY) */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-12 text-cyan-400 font-medium border-4 rounded-3xl px-6 py-2 shadow-lg shadow-cyan-500/50">
          {links.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SIDE SPACER / LOGO */}
      <div className="hidden md:flex w-[180px] justify-end">
        <img src="/namelogo.png" className="w-20 h-20" />
      </div>

      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden text-cyan-400 drop-shadow-[0_0_6px_#00eaff]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg className="w-8 h-8" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-cyber-navy/95 backdrop-blur-md border-b-2 border-cyber-magenta shadow-[0_0_20px_#ff00ff] flex flex-col items-start px-6 py-6 gap-4 md:hidden">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-cyan-300 text-xl drop-shadow-[0_0_4px_#00eaff]"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
