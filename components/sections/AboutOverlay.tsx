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
            left: "clamp(20px, 4vw, 64px)",
            zIndex: 50,
            maxWidth: "380px",
            width: "calc(100vw - 40px)",
            pointerEvents: "all",
          }}
        >
          {/* Editorial Card */}
          <div
            style={{
              background: isNightMode
                ? "rgba(15, 19, 28, 0.92)"
                : "rgba(242, 237, 228, 0.94)",
              backdropFilter: "blur(14px)",
              border: isNightMode
                ? "1px solid rgba(224, 184, 116, 0.28)"
                : "1px solid rgba(196, 168, 130, 0.38)",
              padding: "28px 32px",
              boxShadow: isNightMode
                ? "0 24px 48px -15px rgba(0, 0, 0, 0.6)"
                : "0 20px 40px -15px rgba(24, 20, 16, 0.08)",
              transition: "background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {/* Section Tag */}
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10px",
                letterSpacing: "0.22em",
                color: isNightMode ? "#dfba74" : "#8b7355",
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
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: isNightMode ? "#f8f6f0" : "#18180f",
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
                fontSize: "13px",
                lineHeight: 1.7,
                color: isNightMode ? "#d8d2c6" : "#4a473e",
                marginBottom: "22px",
                transition: "color 0.3s ease",
              }}
            >
              I&apos;m Yashwant Kariha — a Full-Stack Developer with 1+ years of experience
              building high-throughput backend APIs, responsive Next.js interfaces,
              and autonomous AI agent workflows.
            </p>

            {/* Categorized Skills */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                paddingTop: "16px",
                borderTop: isNightMode
                  ? "1px solid rgba(224, 184, 116, 0.2)"
                  : "1px solid rgba(196, 168, 130, 0.3)",
                marginBottom: "16px",
              }}
            >
              {SKILLS.map((grp) => (
                <div key={grp.category}>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "9px",
                      letterSpacing: "0.16em",
                      color: isNightMode ? "#dfba74" : "#8b7355",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {grp.category}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-sans, sans-serif)",
                      fontSize: "11px",
                      color: isNightMode ? "#eae4d8" : "#2a2822",
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
                fontSize: "9px",
                letterSpacing: "0.18em",
                color: isNightMode ? "#b0a490" : "#9c8d78",
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
