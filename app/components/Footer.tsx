"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a0010",
        borderTop: "2px solid #cc0044",
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-12 py-6 max-w-5xl mx-auto"
      >
        {/* Left: name + copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span style={{ fontSize: "12px", color: "#fff", letterSpacing: "0.1em" }}>
            KEVIN MUNIZ
          </span>
          <span style={{ fontSize: "9px", color: "#aa44ff", letterSpacing: "0.08em" }}>
            &copy; {new Date().getFullYear()} — ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Center: social icons */}
        <div className="flex items-center gap-6">
          <a href="https://github.com/KevinMuniz1" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <img src="/github.png" alt="GitHub" style={{ width: "32px", height: "32px" }} />
          </a>
          <a href="https://www.linkedin.com/in/muniz-kevin/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <img src="/linkedin.png" alt="LinkedIn" style={{ width: "32px", height: "32px" }} />
          </a>
          <a href="/KevinMunizResume.pdf" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <img src="/resumeIcon.png" alt="Resume" style={{ width: "32px", height: "32px" }} />
          </a>
        </div>

        {/* Right: back to top */}
        <a
          href="#about"
          style={{
            fontSize: "10px",
            color: "#ff2060",
            textDecoration: "none",
            letterSpacing: "0.1em",
            border: "2px solid #ff2060",
            padding: "8px 14px",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,32,96,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          &#9650; TOP
        </a>
      </div>
    </footer>
  );
}
