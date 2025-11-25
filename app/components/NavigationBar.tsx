"use client";
import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/experiences", label: "Experiences" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/", label: "Home" },
  ];

  return (
    <nav className="bg-cyber-navy border-b-2 border-cyber-magenta w-full px-4 py-3 flex items-center justify-between fixed top-0 left-0 z-50">
      
      {/* LEFT ICONS */}
      <div className="flex items-center gap-3">
        <img src="/github.png" className="w-20 h-20" />
        <img src="/resumeIcon.png" className="w-20 h-20" />
        <img src="/linkedin.png" className="w-20 h-20" />
      </div>

      {/* DESKTOP NAV */}
      <ul className="hidden lg:flex gap-8 text-cyan-400 text-lg drop-shadow-[0_0_6px_#00eaff]">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      {/* MOBILE MENU BUTTON */}
      <button
        className="lg:hidden text-cyan-400 drop-shadow-[0_0_6px_#00eaff]"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-cyber-navy/95 backdrop-blur-md border-b-2 border-cyber-magenta shadow-[0_0_20px_#ff00ff] flex flex-col items-start px-6 py-6 gap-4 lg:hidden">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-cyan-300 text-xl drop-shadow-[0_0_4px_#00eaff]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
