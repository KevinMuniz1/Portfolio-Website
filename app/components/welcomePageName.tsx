import TypingEffect from "typewriter-effect";

export default function Home() {
  return (
    <main
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: "#0a0010" }}
    >
      {/* Pixel grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,60,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(180,60,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-0"
        style={{
          height: "40vh",
          backgroundImage:
            "linear-gradient(rgba(255,60,120,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,60,120,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 24px",
          transform: "perspective(260px) rotateX(62deg)",
          transformOrigin: "bottom center",
        }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180,60,255,0.015) 2px, rgba(180,60,255,0.015) 3px)",
        }}
      />

      {/* Purple glow top-right */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "-160px",
          right: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,60,120,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Red glow bottom-left */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: "10%",
          left: "-80px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,0,255,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12 gap-10">

        {/* Player badge */}
        <div
          className="flex items-center gap-2"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          <span style={{ color: "#ff2060", fontSize: "10px" }} id="arrow">&#9658;</span>
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "12px",
              color: "#660033",
              letterSpacing: "0.25em",
            }}
          >
            PLAYER PROFILE // LOADED
          </span>
        </div>

        {/* TypingEffect component (avatar + terminal) */}
        <TypingEffect />

        {/* CTA buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="mailto:kevinmuniz@email.com"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "7px",
              padding: "12px 24px",
              background: "#ff2060",
              color: "#fff",
              border: "2px solid #ff6090",
              textDecoration: "none",
              letterSpacing: "0.08em",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            &#9654; CONTACT
          </a>
          <a
            href="/projects"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "7px",
              padding: "12px 24px",
              background: "transparent",
              color: "#aa44ff",
              border: "2px solid #aa44ff",
              textDecoration: "none",
              letterSpacing: "0.08em",
            }}
          >
            PROJECTS &gt;&gt;
          </a>
        </div>

        {/* Stat strip */}
        <div
          className="w-full max-w-lg grid grid-cols-3 overflow-hidden"
          style={{ border: "2px solid #330055" }}
        >
          {[
            { num: "3+", label: "YRS XP" },
            { num: "10+", label: "QUESTS" },
            { num: "LVL 4", label: "SR. DEV", purple: true },
          ].map((s, i) => (
            <div
              key={i}
              className="py-3 text-center"
              style={{
                background: "#0f0018",
                borderRight: i < 2 ? "2px solid #330055" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: s.purple ? "12px" : "16px",
                  color: s.purple ? "#aa44ff" : "#ff2060",
                  textShadow: s.purple
                    ? "2px 2px 0 #550088"
                    : "2px 2px 0 #880022",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "12px",
                  color: "#330033",
                  letterSpacing: "0.12em",
                  marginTop: "5px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack footer strip */}
        <div className="w-full max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "6px",
                color: "#ff2060",
                whiteSpace: "nowrap",
              }}
            >
              TECH STACK:
            </span>
            <div
              style={{
                flex: 1,
                height: "2px",
                background:
                  "repeating-linear-gradient(90deg, #ff2060 0, #ff2060 6px, transparent 6px, transparent 12px)",
              }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "REACT NATIVE", hot: true },
              { label: "TYPESCRIPT",   hot: true },
              { label: "EXPO ROUTER",  hot: false },
              { label: "REACT",        hot: false },
              { label: "NODE.JS",      hot: false },
              { label: "PYTHON",       hot: false },
              { label: "JAVA",         hot: false },
              { label: "POSTGRESQL",   hot: false },
              { label: "GIT",          hot: false },
            ].map((t) => (
              <span
                key={t.label}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "13px",
                  color: t.hot ? "#ff2060" : "#aa44ff",
                  padding: "3px 10px",
                  border: `2px solid ${t.hot ? "#ff2060" : "#aa44ff"}`,
                  background: t.hot ? "#1a000a" : "#0f0018",
                  letterSpacing: "0.06em",
                }}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}