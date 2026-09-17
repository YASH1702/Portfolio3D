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
        padding: "16px clamp(18px, 3.5vw, 44px)",
        pointerEvents: "none",
        transition: "background 0.4s ease",
      }}
    >
      {/* ── WORDMARK WITH FROSTED PILL CONTAINER ── */}
      <button
        onClick={() => scrollToProgress(0)}
        aria-label="Scroll to top"
        style={{
          fontFamily: "var(--font-geist-sans, sans-serif)",
          fontSize: "13px",
          fontWeight: 800,
          letterSpacing: "0.24em",
          color: isNightMode ? "#ffffff" : "#11110e",
          textTransform: "uppercase",
          background: isNightMode
            ? "rgba(10, 14, 24, 0.35)"
            : "rgba(255, 255, 255, 0.22)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isNightMode
            ? "1px solid rgba(224, 184, 116, 0.30)"
            : "1px solid rgba(255, 255, 255, 0.45)",
          padding: "7px 18px",
          borderRadius: "24px",
          pointerEvents: "all",
          cursor: "pointer",
          boxShadow: isNightMode
            ? "0 8px 24px -4px rgba(0, 0, 0, 0.4)"
            : "0 4px 18px -2px rgba(24, 20, 16, 0.05)",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.borderColor = isNightMode ? "#dfba74" : "#8b7355";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = isNightMode
            ? "rgba(224, 184, 116, 0.30)"
            : "rgba(255, 255, 255, 0.45)";
        }}
      >
        Yashwant
      </button>

      {/* ── NAV LINKS WITH FROSTED GLASS CONTAINER ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          pointerEvents: "all",
        }}
      >
        <div
          style={{
            background: isNightMode
              ? "rgba(10, 14, 24, 0.38)"
              : "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: isNightMode
              ? "1px solid rgba(224, 184, 116, 0.30)"
              : "1px solid rgba(255, 255, 255, 0.45)",
            borderRadius: "30px",
            padding: "6px 18px",
            boxShadow: isNightMode
              ? "0 10px 30px -5px rgba(0, 0, 0, 0.45)"
              : "0 6px 22px -3px rgba(24, 20, 16, 0.06)",
          }}
        >
          <ul
            role="list"
            style={{
              display: "flex",
              gap: "clamp(16px, 2.5vw, 28px)",
              listStyle: "none",
              margin: 0,
              padding: 0,
              alignItems: "center",
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
                      fontSize: "12px",
                      fontWeight: isActive ? 700 : 600,
                      letterSpacing: "0.18em",
                      color: isActive
                        ? (isNightMode ? "#ffffff" : "#000000")
                        : (isNightMode ? "#f0e6d6" : "#201c16"),
                      textTransform: "uppercase",
                      background: "none",
                      border: "none",
                      padding: "4px 2px",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      position: "relative",
                      transition: "color 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = isNightMode ? "#dfba74" : "#8b5820";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = isNightMode ? "#f0e6d6" : "#201c16";
                      }
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 700,
                        color: isNightMode ? "#dfba74" : "#946830",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span>{item.label}</span>
                    {/* Active underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        style={{
                          position: "absolute",
                          bottom: -1,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: isNightMode ? "#dfba74" : "#111111",
                          borderRadius: "1px",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── COMMAND PALETTE TRIGGER BUTTON ── */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
          aria-label="Open Command Palette (Cmd+K)"
          title="Open Command Palette (Cmd+K / Ctrl+K)"
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "11px",
            fontWeight: 700,
            color: isNightMode ? "#dfba74" : "#1e1b16",
            background: isNightMode
              ? "rgba(10, 14, 24, 0.38)"
              : "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: isNightMode
              ? "1px solid rgba(224, 184, 116, 0.30)"
              : "1px solid rgba(255, 255, 255, 0.45)",
            borderRadius: "24px",
            padding: "8px 13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: isNightMode
              ? "0 10px 30px -5px rgba(0, 0, 0, 0.45)"
              : "0 6px 22px -3px rgba(24, 20, 16, 0.06)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.borderColor = isNightMode ? "#dfba74" : "#8b7355";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = isNightMode
              ? "rgba(224, 184, 116, 0.30)"
              : "rgba(255, 255, 255, 0.45)";
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span style={{ fontSize: "10px", letterSpacing: "0.08em", opacity: 0.9 }}>⌘K</span>
        </button>
      </div>
    </motion.nav>
  );
}
