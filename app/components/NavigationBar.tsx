"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {

  const [isShrunk, setIsShrunk] = useState(false);
  const links = [
    { href: "/experiences", label: "Experiences" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    {href: "/", label: "Home"}
  ];

    useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 10); 
      // Shrink after 10px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`bg-blue-950 border-b-cyber-neon w-full p-4 transition-all duration-300 ease-in-out ${isShrunk ? "h-12 py-2 shadow-md" : "h-20 py-4 shadow-lg"}"`} >
      <ul className="flex gap-6 text-cyan-400 font-medium justify-end">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
