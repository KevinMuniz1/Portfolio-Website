
export default function ProjectsPage() {
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
            "linear-gradient(rgba(180,60,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(180,60,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-0"
        style={{
          height: "40vh",
          backgroundImage:
            "linear-gradient(rgba(255,60,120,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,60,120,0.15) 1px, transparent 1px)",
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

      {/* Glow top-right */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "-160px", right: "-80px",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,60,120,0.25) 0%, transparent 65%)",
        }}
      />

      {/* Glow bottom-left */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: "10%", left: "-80px",
          width: "350px", height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,0,255,0.25) 0%, transparent 65%)",
        }}
      />


    <div>
      <div className="w-full" style={{ border: "2px solid #aa44ff", background: "#0f0018" }}>
            <div style={{ background: "#aa44ff", padding: "5px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#0a0010" }}>Project 1</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#ff2060]" />
                <div className="w-2 h-2 bg-[#ffcc00]" />
                <div className="w-2 h-2 bg-[#00cc66]" />
              </div>
            </div>
      </div>

      <div className="w-full" style={{ border: "2px solid #aa44ff", background: "#0f0018" }}>
            <div style={{ background: "#aa44ff", padding: "5px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#0a0010" }}>Project 2</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#ff2060]" />
                <div className="w-2 h-2 bg-[#ffcc00]" />
                <div className="w-2 h-2 bg-[#00cc66]" />
              </div>
            </div>
      </div>

      </div>
    </main>
  );
}