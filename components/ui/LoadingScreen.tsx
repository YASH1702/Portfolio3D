"use client";

import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";

/**
 * LoadingScreen — premium loading experience.
 *
 * Driven by @react-three/drei's useProgress hook, which accurately reflects
 * how many 3D assets (fonts, textures loaded via drei) have finished loading.
 * Falls back to hiding automatically after 2.5s in case assets are instant.
 */
export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [visible,  setVisible]  = useState(true);
  const [fadeOut,  setFadeOut]  = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smoothly animate the displayed progress value
  useEffect(() => {
    const target = active ? Math.max(progress, displayProgress) : 100;
    const diff = target - displayProgress;
    if (Math.abs(diff) < 0.5) {
      setDisplayProgress(target);
      return;
    }
    const timer = setTimeout(() => {
      setDisplayProgress((p) => p + diff * 0.2);
    }, 16);
    return () => clearTimeout(timer);
  }, [progress, active, displayProgress]);

  // Hide once fully loaded (or after 2.5s fallback)
  useEffect(() => {
    if (!active && progress >= 99) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 300);
      const hideTimer = setTimeout(() => setVisible(false), 900);
      return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
    }
  }, [active, progress]);

  // Safety fallback: hide after 2.5s regardless
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 600);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const pct = Math.min(100, Math.round(displayProgress));

  return (
    <div
      aria-live="polite"
      aria-label="Loading portfolio"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#f0ebe0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.6s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Name */}
      <div
        style={{
          fontFamily: "var(--font-geist-sans, sans-serif)",
          fontSize: "clamp(14px, 3vw, 22px)",
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "#1a1a18",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        Yashwant Kariha
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "11px",
          letterSpacing: "0.25em",
          color: "#8b7355",
          textTransform: "uppercase",
          marginBottom: "40px",
        }}
      >
        Entering Studio
      </div>

      {/* Accurate progress bar */}
      <div
        style={{
          width: "120px",
          height: "1px",
          background: "#d4c8b4",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${pct}%`,
            height: "100%",
            background: "#8b7355",
            transition: "width 0.15s ease",
          }}
        />
      </div>

      {/* Percentage */}
      <div
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "10px",
          letterSpacing: "0.15em",
          color: "#b0a080",
          marginTop: "10px",
        }}
      >
        {pct}%
      </div>
    </div>
  );
}
