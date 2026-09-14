"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SKILLS = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "Prisma", "REST / GraphQL"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { category: "AI & Tools", items: ["OpenAI API", "LangChain", "Chrome Extensions", "WebAssembly"] },
];

interface AboutOverlayProps {
  visible: boolean;
}

/**
 * AboutOverlay — appears as a minimal HTML panel when the camera
 * transitions into the about/workspace section (scroll 25–45%).
 *
 * Positioned in the lower-right corner so it doesn't compete with the 3D scene.
 * Uses Framer Motion for smooth fade/slide-in.
 */
export default function AboutOverlay({ visible }: AboutOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-label="About section"
          style={{
            position: "fixed",
            bottom: "10vh",
            right: "clamp(20px, 5vw, 60px)",
            zIndex: 50,
            maxWidth: "320px",
            pointerEvents: "all",
          }}
        >
          {/* Panel */}
          <div
            style={{
              background: "rgba(240, 235, 224, 0.92)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(196, 168, 130, 0.3)",
              padding: "28px",
              fontFamily: "var(--font-geist-sans, sans-serif)",
            }}
          >
            {/* Section label */}
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10px",
                letterSpacing: "0.24em",
                color: "#8b7355",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              About
            </div>

            {/* Name */}
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "#18180f",
                marginBottom: "12px",
                lineHeight: 1.2,
              }}
            >
              Yashwant Kariha
            </h2>

            {/* Bio */}
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.75,
                color: "#4a4840",
                marginBottom: "24px",
              }}
            >
              Full-Stack Developer focused on building modern web
              applications, AI-powered products, and scalable digital
              experiences.
            </p>

            {/* Skills */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              {SKILLS.map((group) => (
                <div key={group.category}>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "9px",
                      letterSpacing: "0.18em",
                      color: "#8b7355",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    {group.category}
                  </div>
                  {group.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        fontSize: "11px",
                        color: "#3a3828",
                        lineHeight: 1.9,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
