"use client";

import { useStudio } from "@/context/StudioContext";

/**
 * StudioControls — minimal architectural toggles for Day/Night mode
 * and studio interaction hints.
 *
 * Positioned in the bottom-right corner, unobtrusive and editorial.
 */
export default function StudioControls() {
  const { isNightMode, toggleNightMode, isLampOn, toggleLamp } = useStudio();

  return (
    <div
      style={{
        position: "fixed",
        right: "clamp(20px, 3vw, 40px)",
        bottom: "clamp(16px, 3vh, 28px)",
        zIndex: 65,
        display: "flex",
        alignItems: "center",
        gap: "14px",
        pointerEvents: "all",
      }}
    >
      {/* ── LAMP TOGGLE ── */}
      <button
        onClick={toggleLamp}
        aria-label={`Toggle desk lamp (currently ${isLampOn ? "on" : "off"})`}
        title="Toggle Desk Lamp (Press 'L')"
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "9px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: isLampOn ? "#b48b50" : "#80786e",
          background: isLampOn ? "rgba(196, 168, 130, 0.12)" : "rgba(0, 0, 0, 0.05)",
          border: `1px solid ${isLampOn ? "rgba(196, 168, 130, 0.4)" : "rgba(128, 120, 110, 0.25)"}`,
          padding: "5px 10px",
          borderRadius: "2px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span style={{ fontSize: "8px" }}>💡</span>
        <span>{isLampOn ? "LAMP: ON" : "LAMP: OFF"}</span>
      </button>

      {/* ── DAY / NIGHT TOGGLE ── */}
      <button
        onClick={toggleNightMode}
        aria-label={`Switch to ${isNightMode ? "Day" : "Night"} mode`}
        title="Toggle Studio Lighting (Press 'N')"
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "9px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: isNightMode ? "#93c5fd" : "#8b7355",
          background: isNightMode ? "rgba(30, 58, 138, 0.25)" : "rgba(196, 168, 130, 0.12)",
          border: `1px solid ${isNightMode ? "rgba(147, 197, 253, 0.4)" : "rgba(196, 168, 130, 0.4)"}`,
          padding: "5px 10px",
          borderRadius: "2px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span>{isNightMode ? "🌙" : "☀️"}</span>
        <span>{isNightMode ? "NIGHT" : "DAY"}</span>
      </button>
    </div>
  );
}
