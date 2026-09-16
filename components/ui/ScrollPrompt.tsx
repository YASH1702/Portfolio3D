"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStudio } from "@/context/StudioContext";

interface ScrollPromptProps {
  progress: number;
}

export default function ScrollPrompt({ progress }: ScrollPromptProps) {
  const { isNightMode } = useStudio();
  const isVisible = progress < 0.04;

  const handleScrollClick = () => {
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    window.scrollTo({ top: 0.42 * maxScroll, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="scroll-prompt"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12, transition: { duration: 0.3 } }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            bottom: "clamp(24px, 5vh, 40px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 70,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "all",
          }}
        >
          <button
            onClick={handleScrollClick}
            aria-label="Scroll to explore portfolio"
            style={{
              background: isNightMode
                ? "rgba(10, 14, 24, 0.40)"
                : "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: isNightMode
                ? "1px solid rgba(224, 184, 116, 0.35)"
                : "1px solid rgba(255, 255, 255, 0.50)",
              borderRadius: "26px",
              padding: "9px 20px",
              display: "flex",
              alignItems: "center",
              gap: "13px",
              cursor: "pointer",
              boxShadow: isNightMode
                ? "0 10px 28px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(224, 184, 116, 0.12)"
                : "0 8px 22px -4px rgba(24, 20, 16, 0.08)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = isNightMode
                ? "rgba(224, 184, 116, 0.85)"
                : "rgba(139, 115, 85, 0.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = isNightMode
                ? "rgba(224, 184, 116, 0.40)"
                : "rgba(180, 150, 110, 0.50)";
            }}
          >
            {/* Animated mouse pill icon */}
            <div
              style={{
                width: "17px",
                height: "25px",
                borderRadius: "9px",
                border: isNightMode
                  ? "1.8px solid #dfba74"
                  : "1.8px solid #8b6028",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                paddingTop: "4px",
              }}
            >
              <div
                style={{
                  width: "2.5px",
                  height: "5px",
                  borderRadius: "2px",
                  background: isNightMode ? "#dfba74" : "#8b6028",
                  animation: "scrollDot 1.6s ease-in-out infinite",
                }}
              />
            </div>

            {/* Prompt text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.20em",
                  color: isNightMode ? "#ffffff" : "#11110e",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                <span>SCROLL TO EXPLORE</span>
                <span
                  style={{
                    display: "inline-block",
                    animation: "bounceDown 1.6s ease-in-out infinite",
                    color: isNightMode ? "#dfba74" : "#8b6028",
                    fontWeight: 800,
                  }}
                >
                  ↓
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color: isNightMode ? "#dfba74" : "#8b6028",
                  textTransform: "uppercase",
                }}
              >
                OR USE KEYS 1 · 2 · 3 · 4
              </div>
            </div>
          </button>

          <style>{`
            @keyframes scrollDot {
              0% {
                transform: translateY(0);
                opacity: 1;
              }
              50% {
                transform: translateY(8px);
                opacity: 0.2;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }
            @keyframes bounceDown {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(3px);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
