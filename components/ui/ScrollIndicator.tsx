"use client";

import { motion } from "framer-motion";
import { useStudio } from "@/context/StudioContext";

interface ScrollIndicatorProps {
  progress: number;
  section: string;
}

const SECTION_LABELS: Record<string, string> = {
  home: "01 · STUDIO",
  about: "02 · ABOUT",
  projects: "03 · WORK",
  contact: "04 · CONTACT",
};

/**
 * ScrollIndicator — minimal side element showing scroll progress
 * and current section label.
 *
 * Left side: thin vertical progress bar.
 * Left side (above audio button): current section label in monospace.
 */
export default function ScrollIndicator({ progress, section }: ScrollIndicatorProps) {
  const { isNightMode } = useStudio();

  return (
    <>
      {/* ── VERTICAL PROGRESS BAR — left side ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: "clamp(10px, 2vw, 20px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          pointerEvents: "none",
        }}
      >
        {/* Track */}
        <div
          style={{
            width: "1.5px",
            height: "90px",
            background: isNightMode
              ? "rgba(224, 184, 116, 0.18)"
              : "rgba(139, 115, 85, 0.2)",
            position: "relative",
            overflow: "hidden",
            borderRadius: "1px",
          }}
        >
          {/* Fill */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              background: isNightMode ? "#dfba74" : "#8b7355",
              height: `${Math.round(progress * 100)}%`,
              borderRadius: "1px",
            }}
            animate={{ height: `${Math.round(progress * 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* ── SECTION LABEL — bottom left, cleanly above AudioToggle ── */}
      <div
        aria-live="polite"
        aria-label={`Current section: ${SECTION_LABELS[section] ?? section}`}
        style={{
          position: "fixed",
          left: "clamp(20px, 3vw, 40px)",
          bottom: "clamp(54px, 7.5vh, 68px)",
          zIndex: 60,
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "9px",
          letterSpacing: "0.22em",
          color: isNightMode ? "#dfba74" : "#8b7355",
          textTransform: "uppercase",
          pointerEvents: "none",
          transition: "color 0.3s ease",
        }}
      >
        <motion.span
          key={section}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {SECTION_LABELS[section] ?? section.toUpperCase()}
        </motion.span>
      </div>
    </>
  );
}
