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
      }}
    >
     

        {/* LEFT — Logo + icon links */}
        <div className="flex items-center justify-center gap-3">

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
        </div>

    </nav>
    );
    };