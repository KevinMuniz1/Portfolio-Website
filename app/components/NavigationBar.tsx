"use client"

import Link from "next/link";
import { useState } from "react";
import "../globals.css";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/experiences", label: "Experiences" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/", label: "Home" }
  ];

  return (
    <nav className={`bg-cyber-navy border-b-2 border-cyber-magenta w-full flex items-center justify-between px-4 py-2`}>
      {/* Left: Social Links */}
      <div className="flex items-center gap-3">
        <a href="https://github.com/KevinMuniz1" target="_blank" rel="noopener noreferrer">
          <button>
            <img src="/github.png" alt="GitHub" className="w-12 h-12 md:w-20 md:h-20 hover:scale-110" />
          </button>
        </a>

        <a href="/" target="_blank" rel="noopener noreferrer">
          <button>
            <img src="/resumeIcon.png" alt="Resume" className="w-12 h-12 md:w-20 md:h-20 hover:scale-110" />
          </button>
        </a>

        <a href="https://www.linkedin.com/in/muniz-kevin/" target="_blank" rel="noopener noreferrer">
          <button>
            <img src="/linkedin.png" alt="LinkedIn" className="w-12 h-12 md:w-20 md:h-20 hover:scale-110" />
          </button>
        </a>
      </div>

      {/* Center: Navigation (Hidden on mobile, visible on md+) */}
      <div className="hidden md:flex justify-center flex-1">
        <ul className="flex gap-12 text-cyan-400 font-medium shadow-lg shadow-cyan-500/50 border-4 rounded-3xl px-4 py-2">
          {links.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Logo */}
      <div className="hidden md:flex">
        <img src="/namelogo.png" alt="Logo" className="w-12 h-12 md:w-20 md:h-20" />
      </div>

      {/* Mobile: Hamburger Menu */}
      <div className="md:hidden flex items-center gap-4">
        <img src="/namelogo.png" alt="Logo" className="w-12 h-12" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-cyan-400 text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-cyber-navy border-b-2 border-cyber-magenta md:hidden">
          <ul className="flex flex-col gap-4 text-cyan-400 font-medium p-4">
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </nav>
  );
}
