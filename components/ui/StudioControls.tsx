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
        right: "clamp(18px, 3.5vw, 44px)",
        bottom: "clamp(16px, 3vh, 28px)",
        zIndex: 65,
        display: "flex",
        alignItems: "center",
        gap: "10px",
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
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: isLampOn
            ? isNightMode ? "#dfba74" : "#946820"
            : isNightMode ? "#c4b8a4" : "#1e1b16",
          background: isNightMode
            ? "rgba(10, 14, 24, 0.40)"
            : "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isNightMode
            ? "1px solid rgba(224, 184, 116, 0.30)"
            : "1px solid rgba(255, 255, 255, 0.45)",
          padding: "7px 13px",
          borderRadius: "18px",
          cursor: "pointer",
          boxShadow: isNightMode
            ? "0 4px 16px rgba(0, 0, 0, 0.35)"
            : "0 2px 12px rgba(24, 20, 16, 0.06)",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ fontSize: "10px" }}>💡</span>
        <span>{isLampOn ? "LAMP: ON" : "LAMP: OFF"}</span>
      </button>

      {/* ── DAY / NIGHT TOGGLE ── */}
      <button
        onClick={toggleNightMode}
        aria-label={`Switch to ${isNightMode ? "Day" : "Night"} mode`}
        title="Toggle Studio Lighting (Press 'N')"
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: isNightMode ? "#93c5fd" : "#1e1b16",
          background: isNightMode
            ? "rgba(10, 14, 24, 0.40)"
            : "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isNightMode
            ? "1px solid rgba(147, 197, 253, 0.35)"
            : "1px solid rgba(255, 255, 255, 0.45)",
          padding: "7px 13px",
          borderRadius: "18px",
          cursor: "pointer",
          boxShadow: isNightMode
            ? "0 4px 16px rgba(0, 0, 0, 0.35)"
            : "0 2px 12px rgba(24, 20, 16, 0.06)",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span>{isNightMode ? "🌙" : "☀️"}</span>
        <span>{isNightMode ? "NIGHT" : "DAY"}</span>
      </button>
    </div>
  );
}
