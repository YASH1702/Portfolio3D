"use client";

import { useStudio } from "@/context/StudioContext";
import { playNavBlip, triggerHaptic } from "@/lib/soundEffects";

interface MobileSectionNavProps {
  scrollProgress: number;
}

function scrollToFraction(fraction: number) {
  if (typeof window === "undefined") return;
  const maxScroll = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    1
  );
  window.scrollTo({ top: fraction * maxScroll, behavior: "smooth" });
}

export default function MobileSectionNav({ scrollProgress }: MobileSectionNavProps) {
  const { isNightMode } = useStudio();

  // Determine active section & next jump target
  let currentNum = "01";
  let currentLabel = "Intro";
  let nextTarget = 0.42;
  let nextName = "About";
  let isBackToTop = false;

  if (scrollProgress < 0.26) {
    currentNum = "01";
    currentLabel = "Intro";
    nextTarget = 0.42;
    nextName = "About";
  } else if (scrollProgress < 0.60) {
    currentNum = "02";
    currentLabel = "About";
    nextTarget = 0.74;
    nextName = "Projects";
  } else if (scrollProgress < 0.88) {
    currentNum = "03";
    currentLabel = "Projects";
    nextTarget = 0.98;
    nextName = "Contact";
  } else {
    currentNum = "04";
    currentLabel = "Contact";
    nextTarget = 0.0;
    nextName = "Top";
    isBackToTop = true;
  }

  const handleJump = () => {
    triggerHaptic("light");
    playNavBlip();
    scrollToFraction(nextTarget);
  };

  return (
    <div className="mobile-section-nav-root">
      <button
        onClick={handleJump}
        aria-label={`Jump to ${nextName} section`}
        className="mobile-section-nav-pill"
        style={{
          background: isNightMode
            ? "rgba(14, 18, 26, 0.88)"
            : "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isNightMode
            ? "1px solid rgba(224, 184, 116, 0.35)"
            : "1px solid rgba(180, 150, 110, 0.45)",
          color: isNightMode ? "#ffffff" : "#11100d",
          boxShadow: isNightMode
            ? "0 8px 24px -4px rgba(0, 0, 0, 0.6)"
            : "0 6px 20px -3px rgba(24, 20, 16, 0.15)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "10px",
            fontWeight: 800,
            color: isNightMode ? "#dfba74" : "#84551e",
            letterSpacing: "0.08em",
          }}
        >
          {currentNum}
        </span>

        <span
          style={{
            fontFamily: "var(--font-geist-sans, sans-serif)",
            fontSize: "11px",
            fontWeight: 700,
          }}
        >
          {currentLabel}
        </span>

        <span
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "11px",
            fontWeight: 800,
            color: isNightMode ? "#dfba74" : "#84551e",
            marginLeft: "2px",
          }}
        >
          {isBackToTop ? "↑" : "↓"}
        </span>
      </button>

      <style>{`
        .mobile-section-nav-root {
          display: none;
        }

        @media (max-width: 767px) {
          .mobile-section-nav-root {
            display: block;
          }
        }

        .mobile-section-nav-pill {
          position: fixed;
          bottom: 16px;
          left: 16px;
          z-index: 85;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 24px;
          cursor: pointer;
          pointer-events: auto;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .mobile-section-nav-pill:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}
