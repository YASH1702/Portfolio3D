"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudio } from "@/context/StudioContext";
import { playNavBlip, triggerHaptic } from "@/lib/soundEffects";

/**
 * MobileStudioDock — Responsive, consolidated bottom-sheet studio controls
 * for mobile & touch viewports (< 768px).
 *
 * Eliminates screen crowding while providing instant access to:
 * - Desk Lamp (ON/OFF)
 * - Studio Lighting (Day/Night)
 * - Weather Atmosphere (Rain/Snow/Sunny)
 * - Laser Pointer (ON/OFF)
 * - Zen Focus Mode
 * - Ambient Weather Audio
 * - Lo-Fi Beats Synthesizer
 * - Gyroscope Motion Look (with iOS permission request)
 * - CLI Terminal & Bookshelf Modals
 */
export default function MobileStudioDock() {
  const {
    isNightMode,
    toggleNightMode,
    isLampOn,
    toggleLamp,
    isAudioOn,
    toggleAudio,
    isFocusMode,
    toggleFocusMode,
    weather,
    cycleWeather,
    isLaserActive,
    toggleLaser,
    isLofiPlaying,
    toggleLofi,
    isGyroActive,
    toggleGyro,
    toggleTerminal,
    toggleBooksModal,
  } = useStudio();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    triggerHaptic("medium");
    playNavBlip();
    setIsOpen(true);
  };

  const handleClose = () => {
    triggerHaptic("light");
    setIsOpen(false);
  };

  const handleAction = (fn: () => void) => {
    triggerHaptic("medium");
    playNavBlip();
    fn();
  };

  return (
    <div className="mobile-studio-dock-root">
      {/* ── FLOATING TRIGGER PILL (BOTTOM-RIGHT) ── */}
      <button
        onClick={handleOpen}
        aria-label="Open studio controls drawer"
        className="mobile-dock-trigger"
        style={{
          background: isNightMode
            ? "rgba(14, 18, 26, 0.88)"
            : "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isNightMode
            ? "1px solid rgba(224, 184, 116, 0.4)"
            : "1px solid rgba(180, 150, 110, 0.5)",
          color: isNightMode ? "#ffffff" : "#11100d",
          boxShadow: isNightMode
            ? "0 8px 24px -4px rgba(0, 0, 0, 0.6)"
            : "0 6px 20px -3px rgba(24, 20, 16, 0.15)",
        }}
      >
        <span className="dock-gear-icon">⚙️</span>
        <span className="dock-label">Studio</span>

        {/* Live Active Badges */}
        <span className="dock-badge-strip">
          <span>{isNightMode ? "🌙" : "☀️"}</span>
          <span>{weather === "rain" ? "🌧️" : weather === "sunny" ? "☀️" : "❄️"}</span>
          {isLampOn && <span style={{ color: "#dfba74" }}>💡</span>}
          {isLofiPlaying && <span style={{ color: "#22c55e" }}>🎵</span>}
          {isLaserActive && <span style={{ color: "#ff4444" }}>🔴</span>}
          {isGyroActive && <span style={{ color: "#38bdf8" }}>📱</span>}
        </span>
      </button>

      {/* ── BOTTOM SHEET DRAWER ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="mobile-dock-backdrop"
            />

            {/* Slide-up Sheet */}
            <motion.aside
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="mobile-dock-sheet"
              style={{
                background: isNightMode
                  ? "rgba(14, 18, 26, 0.97)"
                  : "rgba(255, 255, 255, 0.97)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderTop: isNightMode
                  ? "1px solid rgba(224, 184, 116, 0.4)"
                  : "1px solid rgba(180, 150, 110, 0.5)",
              }}
            >
              {/* Drag Pill */}
              <div className="mobile-dock-handle" />

              {/* Sheet Header */}
              <div className="mobile-dock-header">
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      color: isNightMode ? "#dfba74" : "#84551e",
                      textTransform: "uppercase",
                    }}
                  >
                    Studio Environment
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans, sans-serif)",
                      fontSize: "16px",
                      fontWeight: 800,
                      color: isNightMode ? "#ffffff" : "#0e0d0a",
                      margin: 0,
                    }}
                  >
                    Atmosphere &amp; Interactive Props
                  </h3>
                </div>

                <button
                  onClick={handleClose}
                  aria-label="Close studio controls"
                  className="mobile-dock-close-btn"
                  style={{
                    color: isNightMode ? "#dfba74" : "#84551e",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* 2-Column Controls Grid */}
              <div className="mobile-dock-grid">
                {/* 1. Desk Lamp */}
                <button
                  onClick={() => handleAction(toggleLamp)}
                  className={`mobile-tile ${isLampOn ? "active" : ""}`}
                  style={{
                    borderColor: isLampOn
                      ? isNightMode ? "#dfba74" : "#8a5e28"
                      : isNightMode ? "rgba(224, 184, 116, 0.2)" : "rgba(180, 150, 110, 0.3)",
                    background: isLampOn
                      ? isNightMode ? "rgba(223, 186, 116, 0.16)" : "rgba(138, 94, 40, 0.12)"
                      : isNightMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <span className="tile-icon">💡</span>
                  <div className="tile-text">
                    <span className="tile-title">Desk Lamp</span>
                    <span className="tile-status">{isLampOn ? "ON" : "OFF"}</span>
                  </div>
                </button>

                {/* 2. Day / Night */}
                <button
                  onClick={() => handleAction(toggleNightMode)}
                  className={`mobile-tile ${isNightMode ? "active" : ""}`}
                  style={{
                    borderColor: isNightMode
                      ? "rgba(147, 197, 253, 0.6)"
                      : "rgba(180, 150, 110, 0.3)",
                    background: isNightMode
                      ? "rgba(30, 58, 138, 0.25)"
                      : "rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <span className="tile-icon">{isNightMode ? "🌙" : "☀️"}</span>
                  <div className="tile-text">
                    <span className="tile-title">Lighting</span>
                    <span className="tile-status">{isNightMode ? "NIGHT" : "DAY"}</span>
                  </div>
                </button>

                {/* 3. Weather Atmosphere */}
                <button
                  onClick={() => handleAction(cycleWeather)}
                  className="mobile-tile"
                  style={{
                    borderColor: isNightMode ? "rgba(165, 243, 252, 0.4)" : "rgba(180, 150, 110, 0.3)",
                    background: isNightMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <span className="tile-icon">
                    {weather === "rain" ? "🌧️" : weather === "sunny" ? "☀️" : "❄️"}
                  </span>
                  <div className="tile-text">
                    <span className="tile-title">Weather</span>
                    <span className="tile-status">{weather.toUpperCase()}</span>
                  </div>
                </button>

                {/* 4. Red Laser Pointer */}
                <button
                  onClick={() => handleAction(() => toggleLaser())}
                  className={`mobile-tile ${isLaserActive ? "laser-active" : ""}`}
                  style={{
                    borderColor: isLaserActive
                      ? "#ff4444"
                      : isNightMode ? "rgba(224, 184, 116, 0.2)" : "rgba(180, 150, 110, 0.3)",
                    background: isLaserActive
                      ? "rgba(255, 68, 68, 0.2)"
                      : isNightMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <span className="tile-icon">🔴</span>
                  <div className="tile-text">
                    <span className="tile-title">Cat Laser</span>
                    <span className="tile-status">{isLaserActive ? "ACTIVE" : "OFF"}</span>
                  </div>
                </button>

                {/* 5. Rain Audio */}
                <button
                  onClick={() => handleAction(toggleAudio)}
                  className={`mobile-tile ${isAudioOn ? "active" : ""}`}
                  style={{
                    borderColor: isAudioOn
                      ? isNightMode ? "#93c5fd" : "#1d5894"
                      : isNightMode ? "rgba(224, 184, 116, 0.2)" : "rgba(180, 150, 110, 0.3)",
                    background: isAudioOn
                      ? isNightMode ? "rgba(30, 58, 138, 0.3)" : "rgba(200, 230, 255, 0.45)"
                      : isNightMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <span className="tile-icon">🌧️</span>
                  <div className="tile-text">
                    <span className="tile-title">Rain Audio</span>
                    <span className="tile-status">{isAudioOn ? "PLAYING" : "MUTED"}</span>
                  </div>
                </button>

                {/* 6. Lo-Fi Beats */}
                <button
                  onClick={() => handleAction(() => toggleLofi())}
                  className={`mobile-tile ${isLofiPlaying ? "active" : ""}`}
                  style={{
                    borderColor: isLofiPlaying
                      ? "#22c55e"
                      : isNightMode ? "rgba(224, 184, 116, 0.2)" : "rgba(180, 150, 110, 0.3)",
                    background: isLofiPlaying
                      ? isNightMode ? "rgba(34, 197, 94, 0.2)" : "rgba(34, 197, 94, 0.15)"
                      : isNightMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <span className="tile-icon">🎵</span>
                  <div className="tile-text">
                    <span className="tile-title">Lo-Fi Beats</span>
                    <span className="tile-status">{isLofiPlaying ? "PLAYING" : "OFF"}</span>
                  </div>
                </button>

                {/* 7. Gyroscope Motion Look */}
                <button
                  onClick={async () => {
                    triggerHaptic("medium");
                    playNavBlip();
                    await toggleGyro();
                  }}
                  className={`mobile-tile ${isGyroActive ? "active" : ""}`}
                  style={{
                    borderColor: isGyroActive
                      ? "#38bdf8"
                      : isNightMode ? "rgba(224, 184, 116, 0.2)" : "rgba(180, 150, 110, 0.3)",
                    background: isGyroActive
                      ? isNightMode ? "rgba(56, 189, 248, 0.2)" : "rgba(56, 189, 248, 0.15)"
                      : isNightMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <span className="tile-icon">📱</span>
                  <div className="tile-text">
                    <span className="tile-title">Gyro Look</span>
                    <span className="tile-status">{isGyroActive ? "TILT: ON" : "TILT: OFF"}</span>
                  </div>
                </button>

                {/* 8. Zen Mode */}
                <button
                  onClick={() => handleAction(toggleFocusMode)}
                  className={`mobile-tile ${isFocusMode ? "active" : ""}`}
                  style={{
                    borderColor: isFocusMode
                      ? isNightMode ? "#dfba74" : "#8b5520"
                      : isNightMode ? "rgba(224, 184, 116, 0.2)" : "rgba(180, 150, 110, 0.3)",
                    background: isFocusMode
                      ? isNightMode ? "rgba(224, 184, 116, 0.2)" : "rgba(240, 200, 140, 0.3)"
                      : isNightMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <span className="tile-icon">✦</span>
                  <div className="tile-text">
                    <span className="tile-title">Zen Focus</span>
                    <span className="tile-status">{isFocusMode ? "ACTIVE" : "OFF"}</span>
                  </div>
                </button>
              </div>

              {/* Bottom Quick Tools */}
              <div className="mobile-dock-footer">
                <button
                  onClick={() => {
                    handleClose();
                    toggleTerminal(true);
                  }}
                  className="quick-tool-btn"
                  style={{
                    color: isNightMode ? "#dfba74" : "#84551e",
                    borderColor: isNightMode ? "rgba(224, 184, 116, 0.3)" : "rgba(180, 150, 110, 0.4)",
                  }}
                >
                  <span>⚡ Developer CLI (~ )</span>
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    toggleBooksModal(true);
                  }}
                  className="quick-tool-btn"
                  style={{
                    color: isNightMode ? "#dfba74" : "#84551e",
                    borderColor: isNightMode ? "rgba(224, 184, 116, 0.3)" : "rgba(180, 150, 110, 0.4)",
                  }}
                >
                  <span>📚 Bookshelf Reading</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .mobile-studio-dock-root {
          display: none;
        }

        @media (max-width: 767px) {
          .mobile-studio-dock-root {
            display: block;
          }
        }

        .mobile-dock-trigger {
          position: fixed;
          bottom: 16px;
          right: 16px;
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

        .mobile-dock-trigger:active {
          transform: scale(0.95);
        }

        .dock-gear-icon {
          font-size: 13px;
        }

        .dock-label {
          font-family: var(--font-geist-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .dock-badge-strip {
          display: flex;
          align-items: center;
          gap: 3px;
          margin-left: 2px;
          padding-left: 6px;
          border-left: 1px solid rgba(150, 150, 150, 0.3);
          font-size: 10.5px;
        }

        .mobile-dock-backdrop {
          position: fixed;
          inset: 0;
          z-index: 95;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .mobile-dock-sheet {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
          border-radius: 20px 20px 0 0;
          padding: 12px 18px 24px 18px;
          max-height: 85vh;
          overflow-y: auto;
          overscroll-behavior: contain;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.4);
        }

        .mobile-dock-handle {
          width: 38px;
          height: 4px;
          border-radius: 2px;
          background: rgba(150, 150, 150, 0.4);
          margin: 0 auto 14px auto;
        }

        .mobile-dock-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .mobile-dock-close-btn {
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          padding: 6px 8px;
          line-height: 1;
        }

        .mobile-dock-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }

        .mobile-tile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          border-width: 1px;
          border-style: solid;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }

        .mobile-tile:active {
          transform: scale(0.97);
        }

        .tile-icon {
          font-size: 18px;
          flex-shrink: 0;
        }

        .tile-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow: hidden;
        }

        .tile-title {
          font-family: var(--font-geist-sans, sans-serif);
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tile-status {
          font-family: var(--font-geist-mono, monospace);
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          opacity: 0.85;
        }

        .mobile-dock-footer {
          display: flex;
          gap: 10px;
          padding-top: 12px;
          border-top: 1px solid rgba(150, 150, 150, 0.2);
        }

        .quick-tool-btn {
          flex: 1;
          padding: 8px 10px;
          border-radius: 8px;
          border-width: 1px;
          border-style: solid;
          background: transparent;
          font-family: var(--font-geist-mono, monospace);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
