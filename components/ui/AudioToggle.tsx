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
        left: "clamp(20px, 3vw, 40px)",
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
          fontSize: "9px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: isAudioOn
            ? isNightMode ? "#93c5fd" : "#8b7355"
            : "#b0a890",
          background: isAudioOn
            ? isNightMode
              ? "rgba(30, 58, 138, 0.2)"
              : "rgba(196, 168, 130, 0.12)"
            : "rgba(0, 0, 0, 0.04)",
          border: `1px solid ${
            isAudioOn
              ? isNightMode
                ? "rgba(147, 197, 253, 0.35)"
                : "rgba(196, 168, 130, 0.4)"
              : "rgba(128, 120, 110, 0.2)"
          }`,
          padding: "5px 10px",
          borderRadius: "2px",
          cursor: "pointer",
          transition: "all 0.25s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span style={{ fontSize: "9px" }}>{isAudioOn ? "🔊" : "🔇"}</span>
        <span>{isAudioOn ? "RAIN: ON" : "RAIN: OFF"}</span>
      </button>
    </div>
  );
}

