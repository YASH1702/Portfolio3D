"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStudio } from "@/context/StudioContext";
import { triggerHaptic, playNavBlip } from "@/lib/soundEffects";
import { projects } from "@/data/projects";

/**
 * RecruiterModal — Executive candidate summary and high-conversion dossier.
 *
 * Tailored for hiring managers and technical recruiters who need to evaluate:
 * - 60-second value proposition
 * - Quantifiable production impact metrics
 * - Core tech stack at a glance
 * - Verified production project case studies
 * - One-click resume download and instant contact channels
 */
export default function RecruiterModal() {
  const { isRecruiterModalOpen, toggleRecruiterModal, isNightMode } = useStudio();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    triggerHaptic("success");
    playNavBlip();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2400);
    }
  };

  return (
    <AnimatePresence>
      {isRecruiterModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Executive Recruiter Summary"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          pointerEvents: "auto",
        }}
      >
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={() => toggleRecruiterModal(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: isNightMode ? "rgba(0, 0, 0, 0.72)" : "rgba(10, 8, 6, 0.45)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "680px",
            maxHeight: "min(88vh, 760px)",
            background: isNightMode
              ? "rgba(14, 18, 26, 0.96)"
              : "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: isNightMode
              ? "1px solid rgba(224, 184, 116, 0.38)"
              : "1px solid rgba(180, 150, 110, 0.45)",
            borderRadius: "16px",
            boxShadow: isNightMode
              ? "0 32px 64px -16px rgba(0, 0, 0, 0.8), 0 0 32px rgba(223, 186, 116, 0.15)"
              : "0 28px 56px -16px rgba(24, 20, 16, 0.2)",
            overflowY: "auto",
            overscrollBehavior: "contain",
            padding: "clamp(20px, 4vw, 32px)",
            color: isNightMode ? "#f0eade" : "#11100d",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "16px",
              paddingBottom: "14px",
              borderBottom: isNightMode
                ? "1px solid rgba(224, 184, 116, 0.2)"
                : "1px solid rgba(196, 168, 130, 0.28)",
            }}
          >
            <div>
              {/* Section Tag */}
              <div
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: isNightMode ? "#dfba74" : "#84551e",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>⚡ Executive Dossier</span>
                <span>·</span>
                <span>Recruiter Quick Brief</span>
              </div>

              {/* Candidate Title */}
              <h2
                style={{
                  fontFamily: "var(--font-geist-sans, sans-serif)",
                  fontSize: "clamp(20px, 3.5vw, 24px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: isNightMode ? "#ffffff" : "#0d0c09",
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                Yashwant Kariha
              </h2>
              <div
                style={{
                  fontFamily: "var(--font-geist-sans, sans-serif)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: isNightMode ? "#d4c8b6" : "#4a4235",
                  marginTop: "2px",
                }}
              >
                Full-Stack Developer &amp; AI Systems Engineer
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => toggleRecruiterModal(false)}
              aria-label="Close recruiter brief"
              style={{
                background: isNightMode
                  ? "rgba(255, 255, 255, 0.06)"
                  : "rgba(0, 0, 0, 0.05)",
                border: isNightMode
                  ? "1px solid rgba(224, 184, 116, 0.25)"
                  : "1px solid rgba(180, 150, 110, 0.3)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isNightMode ? "#dfba74" : "#84551e",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              ✕
            </button>
          </div>

          {/* Availability & Location Strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "8px",
              background: isNightMode
                ? "rgba(34, 197, 94, 0.12)"
                : "rgba(34, 197, 94, 0.10)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              marginBottom: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 10px #22c55e",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: isNightMode ? "#86efac" : "#166534",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Available for Hire · Full-Time &amp; High-Impact Contract
              </span>
            </div>

            <span
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10.5px",
                color: isNightMode ? "#bbf7d0" : "#14532d",
              }}
            >
              📍 India (Open to Remote &amp; Relocation)
            </span>
          </div>

          {/* 1-Minute Elevator Pitch */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "9.5px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: isNightMode ? "#dfba74" : "#84551e",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              1-Minute Engineering Pitch
            </div>
            <p
              style={{
                fontFamily: "var(--font-geist-sans, sans-serif)",
                fontSize: "13.5px",
                lineHeight: 1.65,
                color: isNightMode ? "#f0eade" : "#1a1916",
                margin: 0,
              }}
            >
              Full-Stack Developer with 1+ years of hands-on experience designing and deploying
              resilient digital products, high-throughput backend APIs, and autonomous AI agents.
              Core expertise spans **Next.js 15 (App Router &amp; Server Components)**, **Node.js/Express**,
              **PostgreSQL with Prisma**, **Redis event queues**, and **LLM workflow orchestration (OpenAI &amp; Anthropic)**.
            </p>
          </div>

          {/* Quantifiable Impact Cards (2x2 Grid) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {[
              {
                metric: "3 Shipped",
                label: "Production Products",
                detail: "Career Copilot, SaaS Booking, AI Pipeline Engine",
              },
              {
                metric: "< 120ms",
                label: "P95 API Latency",
                detail: "Redis locking, pooled PostgreSQL & index optimization",
              },
              {
                metric: "Autonomous",
                label: "AI Orchestration",
                detail: "Structured tool-use, prompt chaining & agent loops",
              },
              {
                metric: "99.9%",
                label: "Uptime & Strict Auth",
                detail: "Stateless JWT rotation, ACID transactions, CI/CD",
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: isNightMode
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(0, 0, 0, 0.03)",
                  border: isNightMode
                    ? "1px solid rgba(224, 184, 116, 0.2)"
                    : "1px solid rgba(180, 150, 110, 0.28)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: isNightMode ? "#dfba74" : "#84551e",
                    lineHeight: 1.1,
                    marginBottom: "3px",
                  }}
                >
                  {card.metric}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-sans, sans-serif)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: isNightMode ? "#ffffff" : "#11100d",
                    marginBottom: "2px",
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-sans, sans-serif)",
                    fontSize: "10px",
                    color: isNightMode ? "#a89c8c" : "#6c5d4b",
                    lineHeight: 1.35,
                  }}
                >
                  {card.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Core Tech Stack Chips */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "9.5px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: isNightMode ? "#dfba74" : "#84551e",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Primary Technology Stack
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {[
                "Next.js 15",
                "React 19",
                "TypeScript",
                "Node.js",
                "Express.js",
                "PostgreSQL",
                "Prisma ORM",
                "Redis",
                "OpenAI API",
                "Anthropic API",
                "Tailwind CSS",
                "Docker & CI/CD",
                "RESTful APIs",
                "JWT Auth",
              ].map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "4px",
                    background: isNightMode
                      ? "rgba(223, 186, 116, 0.12)"
                      : "rgba(138, 94, 40, 0.10)",
                    border: isNightMode
                      ? "1px solid rgba(224, 184, 116, 0.25)"
                      : "1px solid rgba(180, 150, 110, 0.3)",
                    color: isNightMode ? "#dfba74" : "#84551e",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Curated Projects Quick Summary */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "9.5px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: isNightMode ? "#dfba74" : "#84551e",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Shipped Production Projects
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {projects.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/projects/${proj.id}`}
                  onClick={() => toggleRecruiterModal(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    background: isNightMode
                      ? "rgba(255, 255, 255, 0.04)"
                      : "rgba(0, 0, 0, 0.03)",
                    border: isNightMode
                      ? "1px solid rgba(224, 184, 116, 0.2)"
                      : "1px solid rgba(180, 150, 110, 0.25)",
                    transition: "all 0.18s ease",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0, marginRight: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-geist-sans, sans-serif)",
                          fontSize: "12.5px",
                          fontWeight: 700,
                          color: isNightMode ? "#ffffff" : "#11100d",
                        }}
                      >
                        {proj.title}
                      </span>
                      {proj.metrics && proj.metrics[0] && (
                        <span
                          style={{
                            fontFamily: "var(--font-geist-mono, monospace)",
                            fontSize: "9px",
                            fontWeight: 700,
                            padding: "1px 6px",
                            borderRadius: "3px",
                            background: isNightMode ? "rgba(56, 189, 248, 0.15)" : "rgba(14, 116, 144, 0.12)",
                            color: isNightMode ? "#38bdf8" : "#0e7490",
                            border: isNightMode ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid rgba(14, 116, 144, 0.25)",
                          }}
                        >
                          {proj.metrics[0].value} {proj.metrics[0].label}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-sans, sans-serif)",
                        fontSize: "10.5px",
                        color: isNightMode ? "#a89c8c" : "#6c5d4b",
                        marginTop: "2px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {proj.subtitle}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: isNightMode ? "#dfba74" : "#8a5e28",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {proj.screenshots ? `${proj.screenshots.length} Views →` : "Case Study →"}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* High-Conversion Direct Action Buttons */}
          <div
            style={{
              paddingTop: "16px",
              borderTop: isNightMode
                ? "1px solid rgba(224, 184, 116, 0.2)"
                : "1px solid rgba(196, 168, 130, 0.28)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* Primary Action Row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {/* 1. Download Resume */}
              <Link
                href="/resume"
                onClick={() => toggleRecruiterModal(false)}
                style={{
                  flex: "1 1 180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  background: isNightMode ? "#dfba74" : "#84551e",
                  color: isNightMode ? "#0e121a" : "#ffffff",
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.2s ease",
                }}
              >
                <span>📄</span>
                <span>Open Full Resume (CV)</span>
              </Link>

              {/* 2. Direct Interview Inquiry */}
              <a
                href="mailto:yashwantkariha1@gmail.com?subject=Interview%20Inquiry%20-%20Yashwant%20Kariha"
                style={{
                  flex: "1 1 180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  background: isNightMode
                    ? "rgba(224, 184, 116, 0.2)"
                    : "rgba(138, 94, 40, 0.15)",
                  border: isNightMode
                    ? "1px solid rgba(224, 184, 116, 0.4)"
                    : "1px solid rgba(180, 150, 110, 0.5)",
                  color: isNightMode ? "#dfba74" : "#84551e",
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <span>📅</span>
                <span>Schedule Interview</span>
              </a>
            </div>

            {/* Quick Copy & Social Channels */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "8px",
              }}
            >
              {/* Copy Email */}
              <button
                onClick={() => handleCopy("yashwantkariha1@gmail.com", "email")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  background: "transparent",
                  border: isNightMode
                    ? "1px solid rgba(224, 184, 116, 0.2)"
                    : "1px solid rgba(180, 150, 110, 0.3)",
                  color: isNightMode ? "#e0d4c3" : "#383126",
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "10px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <span>✉️</span>
                <span>{copiedField === "email" ? "Copied!" : "Copy Email"}</span>
              </button>

              {/* Copy Phone */}
              <button
                onClick={() => handleCopy("+916375278279", "phone")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  background: "transparent",
                  border: isNightMode
                    ? "1px solid rgba(224, 184, 116, 0.2)"
                    : "1px solid rgba(180, 150, 110, 0.3)",
                  color: isNightMode ? "#e0d4c3" : "#383126",
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "10px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <span>📞</span>
                <span>{copiedField === "phone" ? "Copied!" : "+91 6375278279"}</span>
              </button>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/yashwant-kariha-740630207/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  background: "transparent",
                  border: isNightMode
                    ? "1px solid rgba(224, 184, 116, 0.2)"
                    : "1px solid rgba(180, 150, 110, 0.3)",
                  color: isNightMode ? "#e0d4c3" : "#383126",
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "10px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <span>💼</span>
                <span>LinkedIn ↗</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/YASH1702"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  background: "transparent",
                  border: isNightMode
                    ? "1px solid rgba(224, 184, 116, 0.2)"
                    : "1px solid rgba(180, 150, 110, 0.3)",
                  color: isNightMode ? "#e0d4c3" : "#383126",
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "10px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <span>🐙</span>
                <span>GitHub ↗</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
}
