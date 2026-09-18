"use client";

import { useStudio } from "@/context/StudioContext";

export default function LofiPlayerDock() {
  const { isLofiPlaying, toggleLofi, isNightMode } = useStudio();

  if (!isLofiPlaying) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "clamp(14px, 3vh, 28px)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 65,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "6px 14px",
        borderRadius: "20px",
        background: isNightMode
          ? "rgba(10, 14, 24, 0.70)"
          : "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isNightMode
          ? "1px solid rgba(224, 184, 116, 0.35)"
          : "1px solid rgba(200, 170, 130, 0.55)",
        boxShadow: isNightMode
          ? "0 8px 24px -4px rgba(0, 0, 0, 0.5), 0 0 16px rgba(34, 197, 94, 0.15)"
          : "0 6px 20px -3px rgba(24, 20, 16, 0.1)",
        pointerEvents: "all",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {/* Mini Spinning Vinyl Disc Icon */}
      <div
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #ea580c 28%, #18181b 30%, #27272a 70%, #09090b 100%)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          animation: "spin 3.6s linear infinite",
          flexShrink: 0,
        }}
      />

      {/* Track Label */}
      <div
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: isNightMode ? "#f8ecd8" : "#1e1b16",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          whiteSpace: "nowrap",
        }}
      >
        <span>Lo-Fi Beats</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ color: "#22c55e", fontSize: "10px" }}>Fmaj7 / Em7</span>
      </div>

      {/* Animated Equalizer Bars */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "12px" }}>
        <div className="eq-bar eq-bar-1" />
        <div className="eq-bar eq-bar-2" />
        <div className="eq-bar eq-bar-3" />
        <div className="eq-bar eq-bar-4" />
      </div>

      {/* Pause Button */}
      <button
        onClick={() => toggleLofi(false)}
        aria-label="Pause Lo-Fi Music"
        title="Pause Lo-Fi Music (M)"
        style={{
          background: "none",
          border: "none",
          color: isNightMode ? "#dfba74" : "#84551e",
          cursor: "pointer",
          padding: "2px 4px",
          fontSize: "11px",
          fontWeight: 700,
          fontFamily: "var(--font-geist-mono, monospace)",
          letterSpacing: "0.05em",
        }}
      >
        ❚❚
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .eq-bar {
          width: 2.5px;
          border-radius: 1px;
          background: #22c55e;
        }
        .eq-bar-1 { animation: eqAnim 0.8s ease-in-out infinite alternate; }
        .eq-bar-2 { animation: eqAnim 0.6s ease-in-out 0.2s infinite alternate; }
        .eq-bar-3 { animation: eqAnim 0.7s ease-in-out 0.4s infinite alternate; }
        .eq-bar-4 { animation: eqAnim 0.5s ease-in-out 0.1s infinite alternate; }

        @keyframes eqAnim {
          0% { height: 3px; }
          100% { height: 12px; }
        }
      `}</style>
    </div>
  );
}
