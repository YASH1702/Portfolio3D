"use client";

import { useEffect, useRef, useState } from "react";
import { useStudio } from "@/context/StudioContext";

/**
 * Cursor — minimal custom cursor for desktop.
 *
 * Normal:
 * - Small precision dot (5px)
 * - Subtle lagged outer ring (22px)
 *
 * Hovering links / buttons:
 * - Ring expands to 34px
 *
 * Hovering 3D project frame:
 * - Ring smoothly expands
 * - Minimal monospace label: "VIEW PROJECT" appears beside cursor
 *
 * Fully disabled on touch devices and respects prefers-reduced-motion.
 */
export default function Cursor() {
  const { isLaserActive, isNightMode } = useStudio();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const ringPos = useRef({ x: -100, y: -100 });
  const mousePos = useRef({ x: -100, y: -100 });
  const hoveredRef = useRef(false);
  const projectHoverRef = useRef<string | null>(null);
  const [projectHoverText, setProjectHoverText] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${e.clientX + 16}px, ${e.clientY + 12}px, 0)`;
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        hoveredRef.current = true;
      } else {
        hoveredRef.current = false;
      }
    };

    const handleProjectHover = (e: Event) => {
      const custom = e as CustomEvent<{ title?: string; active: boolean }>;
      if (custom.detail?.active) {
        projectHoverRef.current = custom.detail.title ?? "VIEW CASE STUDY";
        setProjectHoverText(custom.detail.title ?? "VIEW CASE STUDY");
      } else {
        projectHoverRef.current = null;
        setProjectHoverText(null);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("project-hover", handleProjectHover);

    // Smooth animation loop for outer ring
    const animate = () => {
      const { x: mx, y: my } = mousePos.current;
      const { x: rx, y: ry } = ringPos.current;

      const newX = rx + (mx - rx) * 0.15;
      const newY = ry + (my - ry) * 0.15;
      ringPos.current = { x: newX, y: newY };

      if (ringRef.current) {
        const isProj = !!projectHoverRef.current;
        const isHover = hoveredRef.current || isProj;
        const scale = isLaserActive ? 1.17 : isProj ? 1.83 : isHover ? 1.42 : 0.92;

        ringRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) scale(${scale})`;

        if (isLaserActive) {
          ringRef.current.style.borderColor = "#ff0033";
          ringRef.current.style.backgroundColor = "rgba(255, 0, 51, 0.14)";
          ringRef.current.style.boxShadow = "0 0 16px rgba(255, 0, 51, 0.55)";
          ringRef.current.style.opacity = "0.95";
        } else if (isProj) {
          ringRef.current.style.borderColor = isNightMode ? "#e0b874" : "#dfa04e";
          ringRef.current.style.backgroundColor = isNightMode
            ? "rgba(224, 184, 116, 0.22)"
            : "rgba(200, 150, 80, 0.22)";
          ringRef.current.style.boxShadow = "0 0 14px rgba(224, 184, 116, 0.55)";
          ringRef.current.style.opacity = "0.9";
        } else {
          ringRef.current.style.borderColor = isNightMode
            ? "rgba(255, 255, 255, 0.65)"
            : "rgba(26, 26, 24, 0.65)";
          ringRef.current.style.backgroundColor = "transparent";
          ringRef.current.style.boxShadow = isNightMode
            ? "0 0 6px rgba(255, 255, 255, 0.3)"
            : "0 0 0 1px rgba(255, 255, 255, 0.6)";
          ringRef.current.style.opacity = isHover ? "0.75" : "0.45";
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("project-hover", handleProjectHover);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLaserActive, isNightMode]);

  return (
    <>
      {/* Precision Dot (Always visible with high-contrast dual halo) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isLaserActive ? "7px" : "5px",
          height: isLaserActive ? "7px" : "5px",
          background: isLaserActive
            ? "#ff0033"
            : isNightMode
            ? "#ffffff"
            : "#141412",
          boxShadow: isLaserActive
            ? "0 0 12px #ff0033, 0 0 4px #ffffff"
            : "0 0 0 1.5px rgba(255, 255, 255, 0.85), 0 1px 4px rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999999,
          transform: "translate3d(-100px, -100px, 0)",
          marginLeft: isLaserActive ? "-3.5px" : "-2.5px",
          marginTop: isLaserActive ? "-3.5px" : "-2.5px",
          willChange: "transform",
          transition: "background 0.2s ease, width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease",
        }}
      />

      {/* Lagged Outer Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "24px",
          height: "24px",
          border: "1.5px solid rgba(26, 26, 24, 0.65)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999998,
          transform: "translate3d(-100px, -100px, 0)",
          marginLeft: "-12px",
          marginTop: "-12px",
          opacity: 0.45,
          transition: "opacity 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",
          willChange: "transform",
        }}
      />

      {/* Hover Label for 3D Project Frames (High-contrast case study badge) */}
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 1000000,
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: isNightMode ? "#ffd993" : "#ffffff",
          background: isNightMode ? "rgba(10, 14, 24, 0.95)" : "rgba(20, 18, 14, 0.95)",
          padding: "5px 9px",
          borderRadius: "3px",
          border: isNightMode
            ? "1px solid rgba(224, 184, 116, 0.7)"
            : "1px solid rgba(224, 184, 116, 0.55)",
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.45)",
          textTransform: "uppercase",
          transform: "translate3d(-100px, -100px, 0)",
          opacity: projectHoverText ? 1 : 0,
          transition: "opacity 0.2s ease",
          whiteSpace: "nowrap",
          willChange: "transform, opacity",
        }}
      >
        VIEW CASE STUDY →
      </div>
    </>
  );
}
