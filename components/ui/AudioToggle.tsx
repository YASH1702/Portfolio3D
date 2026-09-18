"use client";

import { useStudio } from "@/context/StudioContext";

/**
 * AudioToggle — minimal ambient rain sound button (bottom-left corner).
 * Directly connected to StudioContext:
 * - First click initialises the procedural Web Audio rain generator
 * - Subsequent clicks or pressing 'A' toggles mute / unmute
 * - Automatically shifts rain intensity when Day/Night mode changes
 */
export default function AudioToggle() {
  const { isNightMode, isAudioOn, toggleAudio } = useStudio();

  return (
    <div
      style={{
        position: "fixed",
        left: "clamp(12px, 3.5vw, 44px)",
        bottom: "clamp(14px, 3vh, 28px)",
        zIndex: 65,
        pointerEvents: "all",
      }}
    >
      <button
        onClick={toggleAudio}
        aria-label={isAudioOn ? "Mute ambient rain sound" : "Enable ambient rain sound"}
        title="Toggle Rain Sound (Press 'A')"
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isAudioOn
            ? isNightMode ? "#93c5fd" : "#1d5894"
            : isNightMode ? "#c4b8a4" : "#1e1b16",
          background: isAudioOn
            ? isNightMode
              ? "rgba(30, 58, 138, 0.45)"
              : "rgba(200, 230, 255, 0.45)"
            : isNightMode
              ? "rgba(10, 14, 24, 0.45)"
              : "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${
            isAudioOn
              ? isNightMode
                ? "rgba(147, 197, 253, 0.45)"
                : "rgba(70, 140, 220, 0.45)"
              : isNightMode
                ? "rgba(224, 184, 116, 0.30)"
                : "rgba(255, 255, 255, 0.55)"
          }`,
          padding: "7px clamp(9px, 1.8vw, 13px)",
          borderRadius: "18px",
          cursor: "pointer",
          boxShadow: isNightMode
            ? "0 4px 16px rgba(0, 0, 0, 0.35)"
            : "0 2px 12px rgba(24, 20, 16, 0.06)",
          transition: "all 0.25s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span style={{ fontSize: "11px" }}>{isAudioOn ? "🔊" : "🔇"}</span>
        <span className="audio-btn-text">{isAudioOn ? "RAIN: ON" : "RAIN: OFF"}</span>
      </button>

      <style>{`
        @media (max-width: 600px) {
          .audio-btn-text {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

