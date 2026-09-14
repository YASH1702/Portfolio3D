"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor — minimal custom cursor for desktop.
 *
 * Design:
 * - Small dot (6px) that follows mouse precisely
 * - Outer ring (24px) that lags behind slightly (damped follow)
 * - On hover over interactive element: ring expands to 40px
 *
 * The cursor is hidden on mobile via CSS media query.
 * The default cursor is hidden on <body> via globals.css.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: -100, y: -100 });
  const mousePos = useRef({ x: -100, y: -100 });
  const hoveredRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handlePointerEnter = () => {
      hoveredRef.current = true;
    };
    const handlePointerLeave = () => {
      hoveredRef.current = false;
    };

    // Attach to all interactive elements
    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("pointerover", (e) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        hoveredRef.current = true;
      } else {
        hoveredRef.current = false;
      }
    });

    // Animate ring with lag
    const animate = () => {
      const { x: mx, y: my } = mousePos.current;
      const { x: rx, y: ry } = ringPos.current;

      const newX = rx + (mx - rx) * 0.12;
      const newY = ry + (my - ry) * 0.12;
      ringPos.current = { x: newX, y: newY };

      if (ringRef.current) {
        const size = hoveredRef.current ? 36 : 24;
        ringRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.opacity = hoveredRef.current ? "0.5" : "0.3";
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
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
          transform: "translate(-100px, -100px)",
          marginLeft: "-2.5px",
          marginTop: "-2.5px",
          mixBlendMode: "multiply",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "24px",
          height: "24px",
          border: "1px solid #1a1a18",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-100px, -100px)",
          marginLeft: "-12px",
          marginTop: "-12px",
          opacity: 0.3,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
}
