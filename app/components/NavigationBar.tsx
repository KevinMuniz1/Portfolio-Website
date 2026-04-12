"use client";
import "../globals.css";

export default function NavBar() {
  return (
    <nav
      className="w-full relative"
      style={{
        background: "rgba(10,0,16,0.97)",
        borderBottom: "2px solid #cc0044",
        fontFamily: "'Press Start 2P', monospace",
        position: "fixed",
        zIndex: 1000,
      }}
    >
      <div className="flex items-center justify-center gap-6 py-3, margin-bottom: 100px">
        <a href="https://github.com/KevinMuniz1" target="_blank" className="flex flex-col items-center gap-1">
          <img src="/github.png" className="w-20 h-20 hover:scale-110" />
          <span style={{color: "#aa44ff"}}className="text-xs">GitHub</span>
        </a>
        <a href="/KevinMunizResume.pdf" target="_blank" className="flex flex-col items-center gap-1">
          <img src="/resumeIcon.png" className="w-20 h-20 hover:scale-110" />
          <span style={{color: "#aa44ff"}}className="text-xs">Resume</span>
        </a>
        <a href="https://www.linkedin.com/in/muniz-kevin/" target="_blank" className="flex flex-col items-center gap-1">
          <img src="/linkedin.png" className="w-20 h-20 hover:scale-110" />
          <span style={{color: "#aa44ff"}}className="text-xs">LinkedIn</span>
        </a>
      </div>
    </nav>
  );
}