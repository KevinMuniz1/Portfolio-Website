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
      <div className="flex items-center justify-center gap-6 py-3, relative margin-bottom: 100px">
        <div className="absolute left-3 md:left-6">
          <a
            href="mailto:muniz.kevin@outlook.com"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "16px", padding: "12px 24px", background: "rgba(10,0,16,0.97)", color: "#fff", border: "2px solid #aa44ff", textDecoration: "none", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            &#128233; CONTACT ME
          </a>
        </div>
        <a href="https://github.com/KevinMuniz1" target="_blank" className="flex flex-col items-center gap-1">
          <img src="/github.png" className="w-10 h-10 md:w-20 md:h-20 hover:scale-110" />
          <span style={{color: "#aa44ff"}}className="text-xs">GitHub</span>
        </a>
        <a href="/KevinMunizResume.pdf" target="_blank" className="flex flex-col items-center gap-1">
          <img src="/resumeIcon.png" className="w-10 h-10 md:w-20 md:h-20 hover:scale-110" />
          <span style={{color: "#aa44ff"}}className="text-xs">Resume</span>
        </a>
        <a href="https://www.linkedin.com/in/muniz-kevin/" target="_blank" className="flex flex-col items-center gap-1">
          <img src="/linkedin.png" className="w-10 h-10 md:w-20 md:h-20 hover:scale-110" />
          <span style={{color: "#aa44ff"}}className="text-xs">LinkedIn</span>
        </a>
      </div>
    </nav>
  );
}