"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Tracks smooth scroll progress (0–1) across the entire virtual scroll height.
 *
 * The 3D experience uses a tall invisible scroll container to drive camera
 * movement — the canvas stays fixed. This hook returns the normalised
 * progress value and the raw scroll offset.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  const getMaxScroll = useCallback(() => {
    return Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const maxScroll = getMaxScroll();
      targetProgressRef.current = Math.max(0, Math.min(1, y / maxScroll));
      setScrollY(y);
    };

    // Smooth animation loop — dampens progress toward target
    const animate = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const damped = current + (target - current) * 0.06; // ~6% per frame = smooth

      if (Math.abs(damped - current) > 0.00001) {
        currentProgressRef.current = damped;
        setProgress(damped);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [getMaxScroll]);

  return { progress, scrollY };
}
