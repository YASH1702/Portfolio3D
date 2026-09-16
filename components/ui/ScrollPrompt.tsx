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
                ? "rgba(18, 22, 32, 0.75)"
                : "rgba(240, 235, 224, 0.8)",
              backdropFilter: "blur(12px)",
              border: isNightMode
                ? "1px solid rgba(224, 184, 116, 0.35)"
                : "1px solid rgba(196, 168, 130, 0.45)",
              borderRadius: "24px",
              padding: "8px 18px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              boxShadow: isNightMode
                ? "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(224, 184, 116, 0.1)"
                : "0 8px 20px -5px rgba(24, 20, 16, 0.08)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = isNightMode
                ? "rgba(224, 184, 116, 0.7)"
                : "rgba(139, 115, 85, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = isNightMode
                ? "rgba(224, 184, 116, 0.35)"
                : "rgba(196, 168, 130, 0.45)";
            }}
          >
            {/* Animated mouse pill icon */}
            <div
              style={{
                width: "16px",
                height: "24px",
                borderRadius: "8px",
                border: isNightMode
                  ? "1.5px solid #dfba74"
                  : "1.5px solid #8b7355",
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
                  background: isNightMode ? "#dfba74" : "#8b7355",
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
                gap: "1px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  color: isNightMode ? "#f8f6f0" : "#18180f",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>SCROLL TO EXPLORE</span>
                <span
                  style={{
                    display: "inline-block",
                    animation: "bounceDown 1.6s ease-in-out infinite",
                    color: isNightMode ? "#dfba74" : "#8b7355",
                  }}
                >
                  ↓
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "7.5px",
                  letterSpacing: "0.14em",
                  color: isNightMode ? "#a09684" : "#80786e",
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
