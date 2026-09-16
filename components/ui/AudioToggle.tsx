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
        left: "clamp(18px, 3.5vw, 44px)",
        bottom: "clamp(16px, 3vh, 28px)",
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
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: isAudioOn
            ? isNightMode ? "#93c5fd" : "#1d5894"
            : isNightMode ? "#c4b8a4" : "#1e1b16",
          background: isAudioOn
            ? isNightMode
              ? "rgba(30, 58, 138, 0.35)"
              : "rgba(220, 238, 255, 0.92)"
            : isNightMode
              ? "rgba(14, 18, 26, 0.85)"
              : "rgba(255, 255, 255, 0.90)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${
            isAudioOn
              ? isNightMode
                ? "rgba(147, 197, 253, 0.50)"
                : "rgba(70, 140, 220, 0.45)"
              : isNightMode
                ? "rgba(224, 184, 116, 0.35)"
                : "rgba(180, 150, 110, 0.45)"
          }`,
          padding: "7px 13px",
          borderRadius: "18px",
          cursor: "pointer",
          boxShadow: isNightMode
            ? "0 4px 16px rgba(0, 0, 0, 0.45)"
            : "0 2px 12px rgba(24, 20, 16, 0.08)",
          transition: "all 0.25s ease",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ fontSize: "10px" }}>{isAudioOn ? "🔊" : "🔇"}</span>
        <span>{isAudioOn ? "RAIN: ON" : "RAIN: OFF"}</span>
      </button>
    </div>
  );
}

