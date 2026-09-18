"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useStudio } from "@/context/StudioContext";

interface ActionItem {
  id: string;
  category: "Navigate" | "Projects" | "Studio Controls" | "Connect";
  title: string;
  sub: string;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    isNightMode,
    toggleNightMode,
    isLampOn,
    toggleLamp,
    isAudioOn,
    toggleAudio,
    isFocusMode,
    toggleFocusMode,
    toggleTerminal,
    toggleBooksModal,
    isLofiPlaying,
    toggleLofi,
    weather,
    cycleWeather,
    isLaserActive,
    toggleLaser,
    areBlindsOpen,
    toggleBlinds,
  } = useStudio();

  const scrollToProgress = (progress: number) => {
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    window.scrollTo({ top: progress * maxScroll, behavior: "smooth" });
  };

  const actions: ActionItem[] = useMemo(
    () => [
      {
        id: "nav-studio",
        category: "Navigate",
        title: "Studio & Hero Identity",
        sub: "Scroll to top architectural wall",
        shortcut: "1",
        action: () => scrollToProgress(0.0),
      },
      {
        id: "nav-about",
        category: "Navigate",
        title: "About & Engineering Focus",
        sub: "Experience timeline & skill architecture",
        shortcut: "2",
        action: () => scrollToProgress(0.42),
      },
      {
        id: "nav-work",
        category: "Navigate",
        title: "Project Exhibition Gallery",
        sub: "Explore 3D framed case studies",
        shortcut: "3",
        action: () => scrollToProgress(0.74),
      },
      {
        id: "nav-contact",
        category: "Navigate",
        title: "Contact & Inquiry",
        sub: "Let's build something together",
        shortcut: "4",
        action: () => scrollToProgress(0.95),
      },
      {
        id: "cli-terminal",
        category: "Studio Controls",
        title: "Open Developer CLI Terminal",
        sub: "Interactive command-line prompt",
        shortcut: "~",
        action: () => toggleTerminal(true),
      },
      {
        id: "books-reading",
        category: "Studio Controls",
        title: "Explore Engineering Bookshelf",
        sub: "Core architecture & AI literature reading list",
        shortcut: "B",
        action: () => toggleBooksModal(true),
      },
      {
        id: "ctrl-lofi",
        category: "Studio Controls",
        title: isLofiPlaying ? "Pause Lo-Fi Vinyl Beats" : "Play Lo-Fi Vinyl Beats",
        sub: "Procedural synthesized jazz chords & tape warmth",
        shortcut: "M",
        action: () => toggleLofi(),
      },
      {
        id: "proj-jobpilot",
        category: "Projects",
        title: "JobPilot AI",
        sub: "Autonomous job application & career copilot",
        action: () => router.push("/projects/jobpilot-ai"),
      },
      {
        id: "proj-businessflow",
        category: "Projects",
        title: "BusinessFlow",
        sub: "Booking platform & automated invoicing",
        action: () => router.push("/projects/businessflow"),
      },
      {
        id: "proj-ai-platform",
        category: "Projects",
        title: "AI Automation Platform",
        sub: "High-throughput autonomous agent workflows",
        action: () => router.push("/projects/ai-automation-platform"),
      },
      {
        id: "ctrl-lighting",
        category: "Studio Controls",
        title: isNightMode ? "Switch to Day Mode" : "Switch to Night Mode",
        sub: "Toggle architectural sunbeams / moonlight",
        shortcut: "N",
        action: () => toggleNightMode(),
      },
      {
        id: "ctrl-lamp",
        category: "Studio Controls",
        title: isLampOn ? "Turn Desk Lamp Off" : "Turn Desk Lamp On",
        sub: "Toggle warm workstation illumination",
        shortcut: "L",
        action: () => toggleLamp(),
      },
      {
        id: "ctrl-audio",
        category: "Studio Controls",
        title: isAudioOn ? "Mute Rain Audio" : "Play Rain Audio",
        sub: "Synthesized procedural rainfall sound",
        shortcut: "A",
        action: () => toggleAudio(),
      },
      {
        id: "ctrl-focus",
        category: "Studio Controls",
        title: isFocusMode ? "Exit Zen Mode" : "Enter Zen / Focus Mode",
        sub: "Hide 2D UI for pure 3D room immersion",
        shortcut: "F",
        action: () => toggleFocusMode(),
      },
      {
        id: "ctrl-weather",
        category: "Studio Controls",
        title: `Weather: ${weather.toUpperCase()} (Cycle to Next)`,
        sub: "Switch atmosphere between Rain 🌧️, Sunny ☀️, and Snow ❄️",
        shortcut: "W",
        action: () => cycleWeather(),
      },
      {
        id: "ctrl-blinds",
        category: "Studio Controls",
        title: areBlindsOpen ? "Close Architectural Window Blinds" : "Open Architectural Window Blinds",
        sub: "Tilt venetian louvers for moody studio slatted shadows",
        shortcut: "O",
        action: () => toggleBlinds(),
      },
      {
        id: "ctrl-laser",
        category: "Studio Controls",
        title: isLaserActive ? "Turn Off Red Laser Pointer" : "Turn On Red Laser Pointer",
        sub: "Glowing red laser dot across the room that the cat chases",
        shortcut: "P",
        action: () => toggleLaser(),
      },
      {
        id: "ext-resume",
        category: "Connect",
        title: "View Printable Resume / CV",
        sub: "Dedicated high-density printable CV route",
        action: () => router.push("/resume"),
      },
      {
        id: "ext-github",
        category: "Connect",
        title: "GitHub Profile",
        sub: "Explore repositories @YASH1702",
        action: () => window.open("https://github.com/YASH1702", "_blank"),
      },
      {
        id: "ext-linkedin",
        category: "Connect",
        title: "LinkedIn Profile",
        sub: "Connect with Yashwant Kariha",
        action: () => window.open("https://linkedin.com/in/yashwant-kariha-740630207/", "_blank"),
      },
      {
        id: "ext-email",
        category: "Connect",
        title: "Send Direct Email",
        sub: "yashwantkariha1@gmail.com",
        action: () => window.open("mailto:yashwantkariha1@gmail.com"),
      },
    ],
    [
      isNightMode,
      toggleNightMode,
      isLampOn,
      toggleLamp,
      isAudioOn,
      toggleAudio,
      isFocusMode,
      toggleFocusMode,
      toggleTerminal,
      toggleBooksModal,
      isLofiPlaying,
      toggleLofi,
      router,
    ]
  );

  // Filter actions based on search
  const filtered = useMemo(() => {
    if (!search.trim()) return actions;
    const q = search.toLowerCase();
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.sub.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [actions, search]);

  // Open with Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSelect = (item: ActionItem) => {
    item.action();
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={() => setIsOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "clamp(60px, 14vh, 120px)",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "580px",
          background: isNightMode
            ? "rgba(14, 18, 26, 0.92)"
            : "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: isNightMode
            ? "1px solid rgba(224, 184, 116, 0.35)"
            : "1px solid rgba(180, 150, 110, 0.45)",
          borderRadius: "18px",
          boxShadow: isNightMode
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 25px rgba(224, 184, 116, 0.15)"
            : "0 20px 45px -10px rgba(24, 20, 16, 0.18)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Search Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: isNightMode
              ? "1px solid rgba(224, 184, 116, 0.20)"
              : "1px solid rgba(180, 150, 110, 0.25)",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "16px" }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, section, or project..."
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-geist-sans, sans-serif)",
              fontSize: "15px",
              fontWeight: 600,
              color: isNightMode ? "#ffffff" : "#11110e",
            }}
          />
          <kbd
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "10px",
              fontWeight: 700,
              padding: "3px 7px",
              borderRadius: "6px",
              background: isNightMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)",
              color: isNightMode ? "#dfba74" : "#8b5520",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div
          style={{
            maxHeight: "340px",
            overflowY: "auto",
            padding: "8px",
          }}
        >
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "28px",
                textAlign: "center",
                fontFamily: "var(--font-geist-sans, sans-serif)",
                fontSize: "13px",
                color: isNightMode ? "#94a3b8" : "#71717a",
              }}
            >
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: isSelected
                      ? isNightMode
                        ? "rgba(224, 184, 116, 0.18)"
                        : "rgba(180, 150, 110, 0.18)"
                      : "transparent",
                    transition: "background 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-sans, sans-serif)",
                        fontSize: "13.5px",
                        fontWeight: isSelected ? 700 : 600,
                        color: isNightMode ? "#ffffff" : "#11110e",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-mono, monospace)",
                        fontSize: "11px",
                        color: isNightMode ? "#c4b8a4" : "#6b6255",
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono, monospace)",
                        fontSize: "9.5px",
                        fontWeight: 600,
                        color: isNightMode ? "#dfba74" : "#8b5520",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.category}
                    </span>
                    {item.shortcut && (
                      <kbd
                        style={{
                          fontFamily: "var(--font-geist-mono, monospace)",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: isNightMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
                          color: isNightMode ? "#ffffff" : "#11110e",
                        }}
                      >
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: "10px 18px",
            borderTop: isNightMode
              ? "1px solid rgba(224, 184, 116, 0.15)"
              : "1px solid rgba(180, 150, 110, 0.20)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "10px",
            color: isNightMode ? "#94a3b8" : "#8b7355",
          }}
        >
          <span>Use ↑ ↓ to navigate · ↵ to select</span>
          <span>Press [Cmd+K] anytime</span>
        </div>
      </div>
    </div>
  );
}
