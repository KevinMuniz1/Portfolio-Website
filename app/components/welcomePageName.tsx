"use client";
import Typewriter from "typewriter-effect";

export default function TypingEffect() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">

      {/* Avatar frame */}
      <div className="relative">

        {/* Pixel corner dots - top left */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#ff2060] z-10" />
        {/* Pixel corner dots - top right */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff2060] z-10" />
        {/* Pixel corner dots - bottom left */}
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#ff2060] z-10" />
        {/* Pixel corner dots - bottom right */}
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#ff2060] z-10" />

        {/* Outer border */}
        <div className="border-[3px] border-[#ff2060] bg-[#0f0018] p-1">

          {/* Title bar */}
          <div className="bg-[#ff2060] px-3 py-1 flex items-center justify-between mb-1">
            <span
              className="text-white tracking-widest"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px" }}
            >
              PLAYER AVATAR
            </span>
            <span
              className="text-white"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px" }}
            >
              P1
            </span>
          </div>

          {/* Photo */}
          <div className="relative">
            <img
              src="/profilePic.JPG"
              alt="Kevin Muniz"
              className="object-cover w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 block"
              style={{
                imageRendering: "auto",
                filter: "contrast(1.05) saturate(1.1)",
              }}
            />

            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(170,68,255,0.025) 2px, rgba(170,68,255,0.025) 3px)",
              }}
            />

            {/* Online badge */}
            <div
              className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 border-2 border-[#aa44ff]"
              style={{ background: "rgba(10,0,16,0.9)" }}
            >
              <div className="w-1.5 h-1.5 bg-[#00cc66] animate-pulse" />
              <span
                className="text-[#aa44ff] tracking-widest"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "5px" }}
              >
                ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Typewriter block */}
      <div
        className="border-2 border-[#aa44ff] w-full max-w-2xl overflow-hidden"
        style={{ background: "#0f0018" }}
      >
        {/* Terminal title bar */}
        <div className="bg-[#aa44ff] px-3 py-1.5 flex items-center justify-between">
          <span
            className="text-[#0a0010] tracking-wider"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px" }}
          >
            TERMINAL v2.4
          </span>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-[#ff2060]" />
            <div className="w-2 h-2 bg-[#ffcc00]" />
            <div className="w-2 h-2 bg-[#00cc66]" />
          </div>
        </div>

        {/* Typewriter text */}
        <div className="px-5 py-4">
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "clamp(14px, 2.5vw, 20px)",
              color: "#aa44ff",
              lineHeight: "1.7",
            }}
          >
            <span style={{ color: "#ff2060" }}>C:\&gt; </span>
            <Typewriter
              options={{
                delay: 35,
                cursor: "█",
                loop: false,
                wrapperClassName: "inline",
                cursorClassName: "inline text-[#aa44ff] animate-pulse",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    '<span style="color:#ffffff;">HEY! I\'M </span>'
                  )
                  .pauseFor(200)
                  .typeString(
                    '<span style="color:#ff2060;">KEVIN MUNIZ</span>'
                  )
                  .pauseFor(400)
                  .typeString(
                    '<span style="color:#ffffff;">, A COMPUTER SCIENCE MAJOR @ </span>'
                  )
                  .pauseFor(200)
                  .typeString(
                    '<span style="color:#ffcc00;">UCF</span>'
                  )
                  .pauseFor(350)
                  .start();
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}