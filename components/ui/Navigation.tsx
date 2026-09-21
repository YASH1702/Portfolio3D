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
  const { isNightMode, toggleRecruiterModal } = useStudio();
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
        className="nav-action-btn"
        aria-label="Scroll to top"
        style={{
          fontFamily: "var(--font-geist-sans, sans-serif)",
          fontSize: "clamp(11px, 2.8vw, 13px)",
          fontWeight: 800,
          letterSpacing: "0.22em",
          color: isNightMode ? "#ffffff" : "#11110e",
          textTransform: "uppercase",
          background: isNightMode
            ? "rgba(10, 14, 24, 0.45)"
            : "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isNightMode
            ? "1px solid rgba(224, 184, 116, 0.30)"
            : "1px solid rgba(255, 255, 255, 0.55)",
          padding: "7px clamp(10px, 2.5vw, 18px)",
          borderRadius: "24px",
          pointerEvents: "all",
          cursor: "pointer",
          boxShadow: isNightMode
            ? "0 8px 24px -4px rgba(0, 0, 0, 0.4)"
            : "0 4px 18px -2px rgba(24, 20, 16, 0.05)",
          flexShrink: 0,
        }}
      >
        Yashwant
      </button>

      {/* ── NAV LINKS WITH FROSTED GLASS CONTAINER ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(6px, 1.5vw, 10px)",
          pointerEvents: "all",
        }}
      >
        <div
          style={{
            background: isNightMode
              ? "rgba(10, 14, 24, 0.45)"
              : "rgba(255, 255, 255, 0.35)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: isNightMode
              ? "1px solid rgba(224, 184, 116, 0.30)"
              : "1px solid rgba(255, 255, 255, 0.55)",
            borderRadius: "30px",
            padding: "5px clamp(10px, 2vw, 18px)",
            boxShadow: isNightMode
              ? "0 10px 30px -5px rgba(0, 0, 0, 0.45)"
              : "0 6px 22px -3px rgba(24, 20, 16, 0.06)",
          }}
        >
          <ul
            role="list"
            style={{
              display: "flex",
              gap: "clamp(10px, 2.2vw, 28px)",
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
                    className="nav-link-btn"
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "clamp(10.5px, 2.4vw, 12px)",
                      fontWeight: isActive ? 700 : 600,
                      letterSpacing: "0.14em",
                      color: isActive
                        ? (isNightMode ? "#ffffff" : "#000000")
                        : (isNightMode ? "#f0e6d6" : "#201c16"),
                      textTransform: "uppercase",
                      background: "none",
                      border: "none",
                      padding: "4px 2px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className="nav-item-num"
                      style={{
                        fontSize: "9px",
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
          className="nav-action-btn"
          aria-label="Open Command Palette (Cmd+K)"
          title="Open Command Palette (Cmd+K / Ctrl+K)"
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "11px",
            fontWeight: 700,
            color: isNightMode ? "#dfba74" : "#1e1b16",
            background: isNightMode
              ? "rgba(10, 14, 24, 0.45)"
              : "rgba(255, 255, 255, 0.35)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: isNightMode
              ? "1px solid rgba(224, 184, 116, 0.30)"
              : "1px solid rgba(255, 255, 255, 0.55)",
            borderRadius: "24px",
            padding: "7px 11px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            boxShadow: isNightMode
              ? "0 10px 30px -5px rgba(0, 0, 0, 0.45)"
              : "0 6px 22px -3px rgba(24, 20, 16, 0.06)",
            flexShrink: 0,
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
          <span className="cmd-k-label" style={{ fontSize: "10px", letterSpacing: "0.08em", opacity: 0.9 }}>⌘K</span>
        </button>

        {/* ── RECRUITER FAST-TRACK BUTTON ── */}
        <button
          onClick={() => toggleRecruiterModal(true)}
          className="recruiter-action-btn"
          aria-label="Open Recruiter Quick Dossier (R)"
          title="Recruiter Fast-Track (Press 'R' or Click)"
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "11px",
            fontWeight: 700,
            color: isNightMode ? "#6ee7b7" : "#065f46",
            background: isNightMode
              ? "rgba(10, 24, 20, 0.55)"
              : "rgba(236, 253, 245, 0.65)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: isNightMode
              ? "1px solid rgba(52, 211, 153, 0.45)"
              : "1px solid rgba(16, 185, 129, 0.4)",
            borderRadius: "24px",
            padding: "7px 11px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            boxShadow: isNightMode
              ? "0 8px 24px -4px rgba(0, 0, 0, 0.45)"
              : "0 4px 16px -2px rgba(16, 185, 129, 0.12)",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: "12px", lineHeight: 1 }}>⚡</span>
          <span className="recruiter-nav-text" style={{ fontSize: "10.5px", letterSpacing: "0.06em", fontWeight: 700 }}>
            Recruiter
          </span>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 6px rgba(16, 185, 129, 0.9)",
            }}
          />
        </button>
      </div>

      <style>{`
        .nav-action-btn {
          transition: transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
          user-select: none;
          -webkit-user-select: none;
        }
        .nav-action-btn:hover {
          transform: translateY(-1.5px);
          border-color: ${isNightMode ? "#dfba74" : "#8b7355"} !important;
        }
        .nav-action-btn:active {
          transform: scale(0.94) translateY(0);
        }
        .recruiter-action-btn {
          transition: transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
          user-select: none;
          -webkit-user-select: none;
        }
        .recruiter-action-btn:hover {
          transform: translateY(-1.5px);
          border-color: ${isNightMode ? "#34d399" : "#059669"} !important;
        }
        .recruiter-action-btn:active {
          transform: scale(0.94) translateY(0);
        }
        .nav-link-btn {
          transition: transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease;
          user-select: none;
          -webkit-user-select: none;
        }
        .nav-link-btn:hover {
          color: ${isNightMode ? "#dfba74" : "#8b5820"} !important;
        }
        .nav-link-btn:active {
          transform: scale(0.94);
        }
        @media (max-width: 520px) {
          .nav-item-num {
            display: none !important;
          }
          .cmd-k-label {
            display: none !important;
          }
          .recruiter-nav-text {
            display: none !important;
          }
        }
      `}</style>
    </motion.nav>
  );
}
