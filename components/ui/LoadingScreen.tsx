"use client";

import { useState, useEffect } from "react";

/**
 * LoadingScreen — premium loading experience.
 *
 * Shows while the 3D scene is initializing.
 * Fades out smoothly once ready.
 *
 * Design: minimal, typographic, no heavy animation.
 */

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Delay fade-out slightly for the scene to settle
      const fadeTimer = setTimeout(() => setFadeOut(true), 300);
      const hideTimer = setTimeout(() => setVisible(false), 900);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isLoading]);

  if (!visible) return null;

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

      {/* Progress bar */}
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
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "#8b7355",
            animation: "loadingBar 1.2s ease forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes loadingBar {
          0%   { left: -100%; }
          60%  { left: 0%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}
