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
    <nav className={`bg-cyber-navy border-b-2 border-cyber-magenta w-full items-center flex px-4 py-2`} >
        <div className="flex items-center gap-3">

                <a href="https://github.com/KevinMuniz1" target="_blank" rel="noopener noreferrer">
                <button>
                    <img src="/github.png" alt="Logo" className=" flex w-20 h-20 justify-start hover:scale-120"/>
                </button>
                </a>

                <a href="/" target="_blank" rel="noopener noreferrer">
                <button>
                    <img src="/resumeIcon.png" alt="Logo" className="flex w-20 h-20 justify-start hover:scale-120"/>
                </button>
                </a>
                
                <a href="https://www.linkedin.com/in/muniz-kevin/" target="_blank" rel="noopener noreferrer">
                <button>
                    <img src="/linkedin.png" alt="Logo" className="flex w-20 h-20 justify-start hover:scale-120"/>
                </button>
                </a>
        </div>
        <div className="grow flex justify-center">
      <ul className="flex gap-12 text-cyan-400 font-medium shadow-lg shadow-cyan-500/50 border-4 rounded-3xl px-4 py-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      </div>
      <div className="justify-end">
        <img src="/namelogo.png" alt="Logo" className="flex w-20 h-20"/>
      </div>
    </nav>
  );
}
