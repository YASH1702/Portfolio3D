"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStudio } from "@/context/StudioContext";

interface NavigationProps {
  scrollProgress: number;
  currentSection: string;
}

const NAV_ITEMS = [
  { label: "About", section: "about",    scrollTarget: 0.42 },
  { label: "Work",  section: "projects", scrollTarget: 0.74 },
  { label: "Contact", section: "contact", scrollTarget: 0.95 },
];

function scrollToProgress(progress: number) {
  const maxScroll = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    1
  );
  window.scrollTo({ top: progress * maxScroll, behavior: "smooth" });
}

export default function Navigation({ scrollProgress, currentSection }: NavigationProps) {
  const { isNightMode } = useStudio();
  // Fade navigation in after initial load
  const isAtTop = scrollProgress < 0.03;

  return (
    <motion.nav
      aria-label="Portfolio navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px clamp(20px, 4vw, 48px)",
        pointerEvents: "none",
        // Very subtle backdrop on scroll
        background: scrollProgress > 0.05
          ? isNightMode
            ? "linear-gradient(to bottom, rgba(14,18,26,0.88) 0%, transparent 100%)"
            : "linear-gradient(to bottom, rgba(232,224,212,0.75) 0%, transparent 100%)"
          : "transparent",
        transition: "background 0.4s ease",
      }}
    >
      {/* ── WORDMARK ── */}
      <button
        onClick={() => scrollToProgress(0)}
        aria-label="Scroll to top"
        style={{
          fontFamily: "var(--font-geist-sans, sans-serif)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: isNightMode ? "#f8f5ee" : "#18180f",
          textTransform: "uppercase",
          background: "none",
          border: "none",
          padding: 0,
          pointerEvents: "all",
          opacity: 0.9,
          transition: "color 0.3s ease",
        }}
      >
        Yashwant
      </button>

      {/* ── NAV LINKS ── */}
      <ul
        role="list"
        style={{
          display: "flex",
          gap: "clamp(20px, 3vw, 36px)",
          listStyle: "none",
          margin: 0,
          padding: 0,
          pointerEvents: "all",
        }}
      >
        {NAV_ITEMS.map((item, i) => {
          const isActive = currentSection === item.section;
          return (
            <li key={item.section}>
              <button
                onClick={() => scrollToProgress(item.scrollTarget)}
                aria-current={isActive ? "page" : undefined}
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: isActive
                    ? (isNightMode ? "#ffffff" : "#18180f")
                    : (isNightMode ? "#c4a882" : "#8b7355"),
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  padding: "2px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  position: "relative",
                  transition: "color 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "8px", opacity: isNightMode ? 0.75 : 0.55 }}>0{i + 1}</span>
                {item.label}
                {/* Active underline */}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: isNightMode ? "#dfba74" : "#8b7355",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
