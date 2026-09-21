"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectScreenshot } from "@/data/projects";

interface GalleryProps {
  screenshots: ProjectScreenshot[];
  projectTitle: string;
}

export default function ProjectScreenshotGallery({ screenshots, projectTitle }: GalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!screenshots || screenshots.length === 0) return null;

  const tags = ["All", ...Array.from(new Set(screenshots.map((s) => s.tag)))];
  const filteredScreenshots = selectedTag === "All"
    ? screenshots
    : screenshots.filter((s) => s.tag === selectedTag);

  const activeScreenshot = screenshots[activeIdx] || screenshots[0];

  return (
    <div style={{ marginBottom: "56px" }}>
      {/* ── SECTION HEADER & TAG FILTER PILLS ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "1px solid #e0d8cc",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-geist-mono, monospace)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#8b7355",
              margin: 0,
            }}
          >
            Verified Production Interface Gallery
          </h2>
          <div
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "11px",
              color: "#6b685e",
              marginTop: "3px",
            }}
          >
            {screenshots.length} captured views from shipped builds
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {tags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  if (tag !== "All") {
                    const firstMatch = screenshots.findIndex((s) => s.tag === tag);
                    if (firstMatch !== -1) setActiveIdx(firstMatch);
                  }
                }}
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "10.5px",
                  fontWeight: isSelected ? 700 : 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "14px",
                  border: isSelected ? "1px solid #1a1a18" : "1px solid #d4c8b4",
                  background: isSelected ? "#1a1a18" : "transparent",
                  color: isSelected ? "#ffffff" : "#6a665a",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ACTIVE HERO SCREENSHOT CONTAINER ── */}
      <div
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #d4c8b4",
          background: "#0c0e14",
          boxShadow: "0 20px 45px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          position: "relative",
        }}
      >
        {/* Browser Top Chrome */}
        <div
          style={{
            background: "#141722",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #222638",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ef4444" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#f59e0b" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#10b981" }} />
            <span
              style={{
                marginLeft: "8px",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10.5px",
                color: "#94a3b8",
                letterSpacing: "0.06em",
              }}
            >
              {projectTitle} · {activeScreenshot.tag}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {activeScreenshot.isAnimated && (
              <span
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "#10b981",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  padding: "2px 6px",
                  borderRadius: "3px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#10b981",
                    display: "inline-block",
                  }}
                />
                LIVE DEMO
              </span>
            )}

            <button
              onClick={() => setIsLightboxOpen(true)}
              title="Expand to Fullscreen Lightbox"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#e2e8f0",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10px",
                padding: "3px 8px",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>⛶</span>
              <span>Full View</span>
            </button>
          </div>
        </div>

        {/* Image Display Surface */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 10",
            maxHeight: "540px",
            background: "#080a0f",
            cursor: "zoom-in",
          }}
        >
          <Image
            src={activeScreenshot.url}
            alt={activeScreenshot.caption}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 800px"
            unoptimized={activeScreenshot.isAnimated}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Caption Banner */}
        <div
          style={{
            background: "#121520",
            borderTop: "1px solid #222638",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10px",
                fontWeight: 700,
                color: "#dfba74",
                background: "rgba(223, 186, 116, 0.12)",
                padding: "2px 6px",
                borderRadius: "3px",
              }}
            >
              {String(activeIdx + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-sans, sans-serif)",
                fontSize: "13px",
                color: "#cbd5e1",
                lineHeight: 1.4,
              }}
            >
              {activeScreenshot.caption}
            </span>
          </div>
        </div>
      </div>

      {/* ── THUMBNAILS RIBBON ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${screenshots.length}, minmax(110px, 1fr))`,
          gap: "8px",
          marginTop: "12px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        {screenshots.map((item, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                position: "relative",
                aspectRatio: "16 / 10",
                borderRadius: "4px",
                overflow: "hidden",
                border: isActive ? "2px solid #8b7355" : "1px solid #d4c8b4",
                opacity: isActive ? 1.0 : 0.65,
                background: "#0d1117",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.15s ease",
              }}
            >
              <Image
                src={item.url}
                alt={item.caption}
                fill
                sizes="140px"
                unoptimized={item.isAnimated}
                style={{ objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: 3,
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "8px",
                  fontWeight: 700,
                  color: "#ffffff",
                  background: "rgba(0, 0, 0, 0.7)",
                  padding: "1px 4px",
                  borderRadius: "2px",
                }}
              >
                {item.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── FULLSCREEN LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setIsLightboxOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              background: "rgba(0, 0, 0, 0.88)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              display: "flex",
              flexDirection: "column",
              padding: "24px",
            }}
          >
            {/* Header */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
                color: "#ffffff",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "11px",
                    color: "#dfba74",
                    letterSpacing: "0.15em",
                  }}
                >
                  {projectTitle} · {activeScreenshot.tag} View
                </div>
                <div style={{ fontSize: "14px", color: "#e2e8f0", marginTop: "2px" }}>
                  {activeScreenshot.caption}
                </div>
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#ffffff",
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "12px",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Close ✕
              </button>
            </div>

            {/* Main Lightbox Image */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                flex: 1,
                position: "relative",
                width: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <Image
                src={activeScreenshot.url}
                alt={activeScreenshot.caption}
                fill
                sizes="100vw"
                unoptimized={activeScreenshot.isAnimated}
                style={{ objectFit: "contain" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
