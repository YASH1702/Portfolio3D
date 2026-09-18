"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStudio } from "@/context/StudioContext";

const SKILLS = [
  {
    category: "Frontend Architecture",
    items: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Redux", "Zustand"],
  },
  {
    category: "Backend & Systems",
    items: ["Node.js", "Express.js", "PostgreSQL", "RESTful APIs", "JWT Auth", "Python / Django"],
  },
  {
    category: "Databases, Cloud & AI",
    items: ["MongoDB & Mongoose", "Prisma ORM", "Docker & CI/CD", "AWS", "OpenAI API", "Socket.io"],
  },
];

interface AboutOverlayProps {
  visible: boolean;
}

/**
 * AboutOverlay — editorial introduction panel positioned on the left
 * while the camera frames the developer desk on the right.
 *
 * Appears during scroll 28% – 52%.
 * Dynamically adapts to Day and Night studio lighting.
 */
export default function AboutOverlay({ visible }: AboutOverlayProps) {
  const { isNightMode } = useStudio();

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="about-panel"
          initial={{ opacity: 0, x: -24, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -20, y: 10 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-label="About Yashwant Kariha"
          style={{
            position: "fixed",
            bottom: "clamp(24px, 8vh, 80px)",
            left: "clamp(16px, 4vw, 64px)",
            zIndex: 50,
            maxWidth: "380px",
            width: "calc(100vw - 32px)",
            maxHeight: "min(580px, calc(100vh - 110px))",
            pointerEvents: "all",
          }}
        >
          {/* Editorial Card */}
          <div
            style={{
              background: isNightMode
                ? "rgba(14, 18, 26, 0.94)"
                : "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(16px)",
              border: isNightMode
                ? "1px solid rgba(224, 184, 116, 0.35)"
                : "1px solid rgba(180, 150, 110, 0.45)",
              padding: "clamp(20px, 4vw, 28px) clamp(20px, 4vw, 32px)",
              maxHeight: "min(580px, calc(100vh - 110px))",
              overflowY: "auto",
              overscrollBehavior: "contain",
              boxShadow: isNightMode
                ? "0 24px 48px -15px rgba(0, 0, 0, 0.65)"
                : "0 20px 40px -15px rgba(24, 20, 16, 0.12)",
              transition: "background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {/* Section Tag */}
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10.5px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: isNightMode ? "#dfba74" : "#84551e",
                textTransform: "uppercase",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>02</span>
              <span>·</span>
              <span>Studio &amp; Focus</span>
            </div>

            {/* Name & Headline */}
            <h2
              style={{
                fontFamily: "var(--font-geist-sans, sans-serif)",
                fontSize: "22px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: isNightMode ? "#ffffff" : "#0d0c09",
                marginBottom: "10px",
                lineHeight: 1.15,
                transition: "color 0.3s ease",
              }}
            >
              Engineering Scalable Web &amp; AI Products
            </h2>

            {/* Concise Bio */}
            <p
              style={{
                fontFamily: "var(--font-geist-sans, sans-serif)",
                fontSize: "13.5px",
                lineHeight: 1.7,
                color: isNightMode ? "#f0eade" : "#1a1916",
                marginBottom: "22px",
                transition: "color 0.3s ease",
              }}
            >
              I&apos;m Yashwant Kariha — a Full-Stack Developer with 1+ years of experience
              building high-throughput backend APIs, responsive Next.js interfaces,
              and autonomous AI agent workflows.
            </p>

            {/* Experience Timeline */}
            <div
              style={{
                marginBottom: "20px",
                paddingBottom: "20px",
                borderBottom: isNightMode
                  ? "1px solid rgba(224, 184, 116, 0.25)"
                  : "1px solid rgba(196, 168, 130, 0.35)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: isNightMode ? "#dfba74" : "#8a5e28",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Timeline
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0" }}>
                {[
                  { year: "2023", label: "Started\nFull-Stack Dev" },
                  { year: "2024", label: "3 Production\nProjects Shipped" },
                  { year: "2025", label: "AI & Automation\nSpecialisation" },
                ].map((item, i, arr) => (
                  <div key={item.year} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      {/* Dot */}
                      <div style={{
                        width: "7px", height: "7px", borderRadius: "50%",
                        background: isNightMode ? "#dfba74" : "#8a5e28",
                        flexShrink: 0,
                        marginTop: "3px",
                      }} />
                    </div>
                    <div style={{ marginLeft: "8px", flex: 1 }}>
                      <div style={{
                        fontFamily: "var(--font-geist-mono, monospace)",
                        fontSize: "11px", fontWeight: 800,
                        color: isNightMode ? "#ffffff" : "#11110e",
                        letterSpacing: "0.04em",
                      }}>{item.year}</div>
                      <div style={{
                        fontFamily: "var(--font-geist-sans, sans-serif)",
                        fontSize: "10.5px",
                        fontWeight: 500,
                        color: isNightMode ? "#d4c8b6" : "#24221c",
                        lineHeight: 1.45,
                        whiteSpace: "pre-line",
                        marginTop: "2px",
                      }}>{item.label}</div>
                    </div>
                    {/* Connector line between items */}
                    {i < arr.length - 1 && (
                      <div style={{
                        height: "1px", flex: 0.4, marginTop: "6px",
                        background: isNightMode ? "rgba(224, 184, 116, 0.35)" : "rgba(180, 150, 110, 0.45)",
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Categorized Skills */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                paddingTop: "16px",
                borderTop: isNightMode
                  ? "1px solid rgba(224, 184, 116, 0.25)"
                  : "1px solid rgba(196, 168, 130, 0.35)",
                marginBottom: "16px",
              }}
            >
              {SKILLS.map((grp) => (
                <div key={grp.category}>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "9.5px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: isNightMode ? "#dfba74" : "#8a5e28",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {grp.category}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-sans, sans-serif)",
                      fontSize: "11.5px",
                      fontWeight: 500,
                      color: isNightMode ? "#ffffff" : "#141310",
                      lineHeight: 1.6,
                    }}
                  >
                    {grp.items.join("  ·  ")}
                  </div>
                </div>
              ))}
            </div>

            {/* Next Cue */}
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: isNightMode ? "#dfba74" : "#5a4225",
                textTransform: "uppercase",
              }}
            >
              Scroll for Featured Projects →
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
