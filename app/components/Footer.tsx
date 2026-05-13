"use client";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Social links */}
        <div style={{ display: "flex", gap: "28px" }}>
          {[
            { label: "GitHub",   href: "https://github.com/KevinMuniz1" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/muniz-kevin/" },
            { label: "Resume",   href: "/KevinMunizResume.pdf" },
            { label: "Email",    href: "mailto:muniz.kevin@outlook.com" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Copyright + back to top */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
            &copy; {new Date().getFullYear()} Kevin Muniz
          </span>
          <a
            href="#about"
            style={{
              fontSize: "12px",
              color: "var(--text-tertiary)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
          >
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
