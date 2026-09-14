"use client";

/**
 * Navigation — minimal side/top navigation.
 *
 * Design:
 * - Fixed position, very small
 * - YASHWANT (monogram/wordmark top left)
 * - 01 ABOUT / 02 WORK / 03 CONTACT (top right or side)
 * - Clicking scrolls to the appropriate section via virtual scroll
 *
 * Active section is derived from scrollProgress.
 */

interface NavigationProps {
  scrollProgress: number;
  currentSection: string;
}

// Scroll targets — percentage of total scroll height for each section
const NAV_ITEMS = [
  { label: "ABOUT", section: "about", scrollTarget: 0.45 },
  { label: "WORK", section: "projects", scrollTarget: 0.65 },
  { label: "CONTACT", section: "contact", scrollTarget: 0.9 },
];

function scrollToProgress(progress: number) {
  const maxScroll = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    1
  );
  window.scrollTo({ top: progress * maxScroll, behavior: "smooth" });
}

export default function Navigation({
  scrollProgress,
  currentSection,
}: NavigationProps) {
  return (
    <nav
      aria-label="Portfolio navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 32px",
        pointerEvents: "none",
      }}
    >
      {/* ── WORDMARK ── */}
      <button
        onClick={() => scrollToProgress(0)}
        aria-label="Back to top"
        style={{
          fontFamily: "var(--font-geist-sans, sans-serif)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "#1a1a18",
          textTransform: "uppercase",
          background: "none",
          border: "none",
          cursor: "pointer",
          pointerEvents: "all",
          opacity: 0.9,
          padding: 0,
        }}
      >
        Yashwant
      </button>

      {/* ── NAV ITEMS ── */}
      <ul
        style={{
          display: "flex",
          gap: "32px",
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
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  color: isActive ? "#1a1a18" : "#8b7355",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ fontSize: "9px", opacity: 0.6 }}>
                  0{i + 1}
                </span>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
