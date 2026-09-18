"use client";

import { useStudio } from "@/context/StudioContext";

/**
 * StudioControls — minimal architectural toggles for Day/Night mode
 * and studio interaction hints.
 *
 * Positioned in the bottom-right corner, unobtrusive and editorial.
 */
export default function StudioControls() {
  const {
    isNightMode,
    toggleNightMode,
    isLampOn,
    toggleLamp,
    isFocusMode,
    toggleFocusMode,
    weather,
    cycleWeather,
    isLaserActive,
    toggleLaser,
    areBlindsOpen,
    toggleBlinds,
  } = useStudio();

  return (
    <div
      style={{
        position: "fixed",
        right: "clamp(12px, 3.5vw, 44px)",
        bottom: "clamp(14px, 3vh, 28px)",
        zIndex: 65,
        display: "flex",
        alignItems: "center",
        gap: "clamp(5px, 1.5vw, 10px)",
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
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isLampOn
            ? isNightMode ? "#dfba74" : "#946820"
            : isNightMode ? "#c4b8a4" : "#1e1b16",
          background: isNightMode
            ? "rgba(10, 14, 24, 0.45)"
            : "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isNightMode
            ? "1px solid rgba(224, 184, 116, 0.30)"
            : "1px solid rgba(255, 255, 255, 0.55)",
          padding: "7px clamp(9px, 1.8vw, 13px)",
          borderRadius: "18px",
          cursor: "pointer",
          boxShadow: isNightMode
            ? "0 4px 16px rgba(0, 0, 0, 0.35)"
            : "0 2px 12px rgba(24, 20, 16, 0.06)",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span style={{ fontSize: "11px" }}>💡</span>
        <span className="ctrl-btn-text">{isLampOn ? "LAMP: ON" : "LAMP: OFF"}</span>
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
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isNightMode ? "#93c5fd" : "#1e1b16",
          background: isNightMode
            ? "rgba(10, 14, 24, 0.45)"
            : "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isNightMode
            ? "1px solid rgba(147, 197, 253, 0.35)"
            : "1px solid rgba(255, 255, 255, 0.55)",
          padding: "7px clamp(9px, 1.8vw, 13px)",
          borderRadius: "18px",
          cursor: "pointer",
          boxShadow: isNightMode
            ? "0 4px 16px rgba(0, 0, 0, 0.35)"
            : "0 2px 12px rgba(24, 20, 16, 0.06)",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span>{isNightMode ? "🌙" : "☀️"}</span>
        <span className="ctrl-btn-text">{isNightMode ? "NIGHT" : "DAY"}</span>
      </button>

      {/* ── WEATHER CYCLE TOGGLE ── */}
      <button
        onClick={cycleWeather}
        aria-label={`Cycle studio weather (currently ${weather})`}
        title="Cycle Weather: Rain / Sunny / Snow (Press 'W')"
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isNightMode ? "#a5f3fc" : "#0e7490",
          background: isNightMode
            ? "rgba(10, 14, 24, 0.45)"
            : "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isNightMode
            ? "1px solid rgba(165, 243, 252, 0.35)"
            : "1px solid rgba(255, 255, 255, 0.55)",
          padding: "7px clamp(9px, 1.8vw, 13px)",
          borderRadius: "18px",
          cursor: "pointer",
          boxShadow: isNightMode
            ? "0 4px 16px rgba(0, 0, 0, 0.35)"
            : "0 2px 12px rgba(24, 20, 16, 0.06)",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span>
          {weather === "rain" ? "🌧️" : weather === "sunny" ? "☀️" : "❄️"}
        </span>
        <span className="ctrl-btn-text">
          {weather === "rain" ? "RAIN" : weather === "sunny" ? "SUNNY" : "SNOW"}
        </span>
      </button>

      {/* ── WINDOW BLINDS TOGGLE ── */}
      <button
        onClick={() => toggleBlinds()}
        aria-label={`Toggle window blinds (currently ${areBlindsOpen ? "open" : "closed"})`}
        title="Toggle Window Blinds (Press 'O')"
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: areBlindsOpen
            ? isNightMode ? "#cbd5e1" : "#334155"
            : isNightMode ? "#fbbf24" : "#b45309",
          background: isNightMode
            ? "rgba(10, 14, 24, 0.45)"
            : "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isNightMode
            ? "1px solid rgba(255, 255, 255, 0.2)"
            : "1px solid rgba(255, 255, 255, 0.55)",
          padding: "7px clamp(9px, 1.8vw, 13px)",
          borderRadius: "18px",
          cursor: "pointer",
          boxShadow: isNightMode
            ? "0 4px 16px rgba(0, 0, 0, 0.35)"
            : "0 2px 12px rgba(24, 20, 16, 0.06)",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span>🪟</span>
        <span className="ctrl-btn-text">{areBlindsOpen ? "BLINDS: OPEN" : "BLINDS: SHUT"}</span>
      </button>

      {/* ── RED LASER POINTER TOGGLE ── */}
      <button
        onClick={() => toggleLaser()}
        aria-label={`Toggle red laser pointer (currently ${isLaserActive ? "active" : "inactive"})`}
        title="Toggle Red Laser Pointer (Press 'P')"
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isLaserActive
            ? "#ff3838"
            : isNightMode ? "#cbd5e1" : "#475569",
          background: isLaserActive
            ? isNightMode
              ? "rgba(255, 56, 56, 0.25)"
              : "rgba(255, 100, 100, 0.22)"
            : isNightMode
              ? "rgba(10, 14, 24, 0.45)"
              : "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isLaserActive
            ? "1px solid rgba(255, 56, 56, 0.6)"
            : isNightMode
              ? "1px solid rgba(255, 255, 255, 0.2)"
              : "1px solid rgba(255, 255, 255, 0.55)",
          padding: "7px clamp(9px, 1.8vw, 13px)",
          borderRadius: "18px",
          cursor: "pointer",
          boxShadow: isLaserActive
            ? "0 0 16px rgba(255, 56, 56, 0.45)"
            : isNightMode
              ? "0 4px 16px rgba(0, 0, 0, 0.35)"
              : "0 2px 12px rgba(24, 20, 16, 0.06)",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span>🔴</span>
        <span className="ctrl-btn-text">{isLaserActive ? "LASER: ON" : "LASER"}</span>
      </button>

      {/* ── ZEN / FOCUS MODE TOGGLE ── */}
      <button
        onClick={toggleFocusMode}
        aria-label="Toggle Zen Focus Mode"
        title="Toggle Zen Mode (Press 'F')"
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isFocusMode
            ? isNightMode ? "#dfba74" : "#8b5520"
            : isNightMode ? "#c4b8a4" : "#1e1b16",
          background: isFocusMode
            ? isNightMode
              ? "rgba(224, 184, 116, 0.25)"
              : "rgba(240, 200, 140, 0.35)"
            : isNightMode
              ? "rgba(10, 14, 24, 0.45)"
              : "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isNightMode
            ? "1px solid rgba(224, 184, 116, 0.35)"
            : "1px solid rgba(255, 255, 255, 0.55)",
          padding: "7px clamp(9px, 1.8vw, 13px)",
          borderRadius: "18px",
          cursor: "pointer",
          boxShadow: isNightMode
            ? "0 4px 16px rgba(0, 0, 0, 0.35)"
            : "0 2px 12px rgba(24, 20, 16, 0.06)",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span>✦</span>
        <span className="ctrl-btn-text">{isFocusMode ? "ZEN: ON" : "ZEN"}</span>
      </button>

      <style>{`
        @media (max-width: 600px) {
          .ctrl-btn-text {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
