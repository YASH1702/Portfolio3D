"use client";

import { useEffect, useRef, useState } from "react";

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
        projectHoverRef.current = custom.detail.title ?? "VIEW PROJECT";
        setProjectHoverText(custom.detail.title ?? "VIEW PROJECT");
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
        const size = isProj ? 44 : isHover ? 34 : 22;

        ringRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.marginLeft = `${-size / 2}px`;
        ringRef.current.style.marginTop = `${-size / 2}px`;
        ringRef.current.style.borderColor = isProj ? "#8b7355" : "#1a1a18";
        ringRef.current.style.backgroundColor = isProj
          ? "rgba(196, 168, 130, 0.12)"
          : "transparent";
        ringRef.current.style.opacity = isProj ? "0.8" : isHover ? "0.55" : "0.3";
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
  }, []);

  return (
    <>
      {/* Precision Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          background: "#1a1a18",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10000,
          transform: "translate3d(-100px, -100px, 0)",
          marginLeft: "-2.5px",
          marginTop: "-2.5px",
          willChange: "transform",
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
          width: "22px",
          height: "22px",
          border: "1px solid #1a1a18",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate3d(-100px, -100px, 0)",
          marginLeft: "-11px",
          marginTop: "-11px",
          opacity: 0.3,
          transition: "width 0.22s ease, height 0.22s ease, opacity 0.22s ease, border-color 0.22s ease, background-color 0.22s ease",
          willChange: "transform",
        }}
      />

      {/* Hover Label for 3D Project Frames */}
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 10001,
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "9px",
          letterSpacing: "0.18em",
          color: "#ffffff",
          background: "rgba(24, 22, 18, 0.92)",
          padding: "4px 8px",
          borderRadius: "2px",
          border: "1px solid rgba(196, 168, 130, 0.4)",
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
