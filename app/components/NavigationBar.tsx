"use client"

import Link from "next/link";
import "../globals.css";

export default function NavBar() {

  const links = [
    { href: "/experiences", label: "Experiences" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    {href: "/", label: "Home"}
  ];
 
  return (
    <nav className={`bg-cyber-navy border-b-2 border-cyber-neon w-full p-4 items-center flex `} >
        <div className="flex space-x-4 mb-2">
                <button>
                    <img src="/github.png" alt="Logo" className="w-20 h-20 justify-start"/>
                </button>

                <button>
                    <img src="/resumeIcon.png" alt="Logo" className="w-20 h-20 justify-start"/>
                </button>

                <button>
                    <img src="/linkedin.png" alt="Logo" className="w-20 h-20 justify-start"/>
                </button>
        </div>
        <div className="grow flex justify-end">
      <ul className="flex gap-6 text-cyan-400 font-medium justify-end">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      </div>
    </nav>
  );
}
