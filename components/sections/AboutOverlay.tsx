"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStudio } from "@/context/StudioContext";
import { playNavBlip } from "@/lib/soundEffects";

interface LinkedProject {
  id: string;
  name: string;
  role: string;
}

interface SkillItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "ai_cloud";
  level: number; // 1 to 5
  proficiencyLabel: string;
  confidencePct: number;
  highlights: string;
  projects: LinkedProject[];
}

const SKILL_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "ai_cloud", label: "AI & Cloud" },
] as const;

type SkillCategory = (typeof SKILL_CATEGORIES)[number]["id"];

const SKILLS_DATABASE: SkillItem[] = [
  {
    id: "nextjs",
    name: "Next.js 15",
    category: "frontend",
    level: 5,
    proficiencyLabel: "Production Core",
    confidencePct: 98,
    highlights: "App Router, React Server Components (RSC), dynamic streaming SSR, ISR & edge API middleware.",
    projects: [
      { id: "careerpulse", name: "CareerPulse", role: "SSR & WebAssembly client" },
      { id: "coredesk", name: "CoreDesk", role: "Dynamic billing & dashboard" },
      { id: "taskforge", name: "TaskForge", role: "Flow pipeline GUI" },
    ],
  },
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    level: 5,
    proficiencyLabel: "Production Core",
    confidencePct: 96,
    highlights: "Fiber concurrent rendering, custom hook patterns, React Three Fiber (R3F) 3D canvases, and Framer Motion layout animations.",
    projects: [
      { id: "careerpulse", name: "CareerPulse", role: "Interactive job dashboard" },
      { id: "coredesk", name: "CoreDesk", role: "Operations dashboard" },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: 5,
    proficiencyLabel: "Strict Type Safety",
    confidencePct: 95,
    highlights: "Generic type utilities, discriminated unions, end-to-end type safety with Prisma models and Zod validation.",
    projects: [
      { id: "careerpulse", name: "CareerPulse", role: "Type-safe resume parsers" },
      { id: "coredesk", name: "CoreDesk", role: "Stripe payment schemas" },
      { id: "taskforge", name: "TaskForge", role: "Workflow node typing" },
    ],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    level: 5,
    proficiencyLabel: "Design Systems",
    confidencePct: 94,
    highlights: "Custom token systems, responsive fluid layouts, modern glassmorphism palettes and CSS variables.",
    projects: [
      { id: "coredesk", name: "CoreDesk", role: "Operations UI & billing flow" },
      { id: "careerpulse", name: "CareerPulse", role: "Dark/light responsive layout" },
    ],
  },
  {
    id: "zustand-redux",
    name: "Zustand & Redux",
    category: "frontend",
    level: 4,
    proficiencyLabel: "State Architecture",
    confidencePct: 88,
    highlights: "Lightweight reactive micro-stores, persistent local storage caches, and decoupled selector performance.",
    projects: [
      { id: "careerpulse", name: "CareerPulse", role: "Client app state store" },
    ],
  },
  {
    id: "nodejs",
    name: "Node.js & Express",
    category: "backend",
    level: 5,
    proficiencyLabel: "High Throughput",
    confidencePct: 95,
    highlights: "Non-blocking event loop execution, custom middleware architecture, webhook handlers and microservice endpoints.",
    projects: [
      { id: "taskforge", name: "TaskForge", role: "Execution engine runtime" },
      { id: "careerpulse", name: "CareerPulse", role: "API routing layer" },
    ],
  },
  {
    id: "postgresql",
    name: "PostgreSQL & Prisma",
    category: "backend",
    level: 5,
    proficiencyLabel: "Relational DB & ORM",
    confidencePct: 94,
    highlights: "Complex relational queries, indexing, schema migrations, ACID transactional locking, and connection pooling.",
    projects: [
      { id: "careerpulse", name: "CareerPulse", role: "Relational applicant DB" },
      { id: "coredesk", name: "CoreDesk", role: "Transactional accounts" },
      { id: "taskforge", name: "TaskForge", role: "Workflow definition schema" },
    ],
  },
  {
    id: "redis-inngest",
    name: "Redis & Inngest",
    category: "backend",
    level: 4,
    proficiencyLabel: "Event Queues & Caching",
    confidencePct: 90,
    highlights: "Distributed concurrency locks to avoid double-bookings, event-driven background job queues & auto-retries.",
    projects: [
      { id: "coredesk", name: "CoreDesk", role: "Concurrency locking & email queues" },
      { id: "taskforge", name: "TaskForge", role: "Async job pipeline" },
    ],
  },
  {
    id: "jwt-auth",
    name: "RESTful APIs & JWT",
    category: "backend",
    level: 5,
    proficiencyLabel: "Secure Architecture",
    confidencePct: 92,
    highlights: "Stateless HMAC/RSA authentication, refresh token rotation, CORS headers, rate limiting and RBAC security.",
    projects: [
      { id: "careerpulse", name: "CareerPulse", role: "Multi-tenant auth" },
      { id: "coredesk", name: "CoreDesk", role: "Customer portal security" },
    ],
  },
  {
    id: "openai-api",
    name: "OpenAI & Anthropic API",
    category: "ai_cloud",
    level: 5,
    proficiencyLabel: "LLM Orchestration",
    confidencePct: 96,
    highlights: "Structured JSON outputs, function calling, tool use, prompt chaining, streaming completions & agent loops.",
    projects: [
      { id: "careerpulse", name: "CareerPulse", role: "Resume tailoring & cover letters" },
      { id: "taskforge", name: "TaskForge", role: "LLM integration nodes" },
    ],
  },
  {
    id: "docker-cicd",
    name: "Docker & CI/CD",
    category: "ai_cloud",
    level: 4,
    proficiencyLabel: "DevOps & Containers",
    confidencePct: 86,
    highlights: "Multi-stage container optimization, GitHub Actions pipelines, automated lint/test/deploy workflows.",
    projects: [
      { id: "taskforge", name: "TaskForge", role: "Isolated runner containers" },
    ],
  },
  {
    id: "aws-cloud",
    name: "AWS & Cloud Services",
    category: "ai_cloud",
    level: 4,
    proficiencyLabel: "Cloud Infra",
    confidencePct: 85,
    highlights: "S3 asset buckets with presigned URLs, Vercel edge deployment, SSL certificates & serverless databases.",
    projects: [
      { id: "careerpulse", name: "CareerPulse", role: "Document storage on S3" },
      { id: "coredesk", name: "CoreDesk", role: "Cloud hosting & Stripe webhooks" },
    ],
  },
];

interface AboutOverlayProps {
  visible: boolean;
}

/**
 * AboutOverlay — Editorial introduction panel and Interactive Tech Stack Matrix
 * positioned on the left while camera frames the developer desk on the right.
 *
 * Appears during scroll 28% – 52%.
 * Dynamically adapts to Day and Night studio lighting.
 */
export default function AboutOverlay({ visible }: AboutOverlayProps) {
  const { isNightMode } = useStudio();
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>("nextjs");

  const filteredSkills = SKILLS_DATABASE.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  const selectedSkill =
    SKILLS_DATABASE.find((s) => s.id === selectedSkillId) || null;

  const handleSelectSkill = (id: string) => {
    playNavBlip();
    setSelectedSkillId((prev) => (prev === id ? null : id));
  };

  const handleCategoryChange = (cat: SkillCategory) => {
    playNavBlip();
    setActiveCategory(cat);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="about-panel"
          initial={{ opacity: 0, x: -24, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -20, y: 10 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-label="About Yashwant Kariha"
          style={{
            position: "fixed",
            bottom: "clamp(62px, 8.5vh, 80px)",
            left: "clamp(16px, 4vw, 64px)",
            zIndex: 50,
            maxWidth: "420px",
            width: "calc(100vw - 32px)",
            maxHeight: "min(600px, calc(100vh - 130px))",
            pointerEvents: "all",
          }}
        >
          {/* Editorial Card Container */}
          <div
            style={{
              background: isNightMode
                ? "rgba(14, 18, 26, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: isNightMode
                ? "1px solid rgba(224, 184, 116, 0.35)"
                : "1px solid rgba(180, 150, 110, 0.45)",
              borderRadius: "14px",
              padding: "clamp(18px, 3.5vw, 24px) clamp(18px, 3.5vw, 28px)",
              maxHeight: "min(600px, calc(100vh - 130px))",
              overflowY: "auto",
              overscrollBehavior: "contain",
              boxShadow: isNightMode
                ? "0 24px 48px -15px rgba(0, 0, 0, 0.7)"
                : "0 20px 40px -15px rgba(24, 20, 16, 0.14)",
              transition: "background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {/* Section Tag */}
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10.5px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: isNightMode ? "#dfba74" : "#84551e",
                textTransform: "uppercase",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>02</span>
              <span>·</span>
              <span>Studio &amp; Focus</span>
            </div>

            {/* Name & Headline */}
            <h2
              style={{
                fontFamily: "var(--font-geist-sans, sans-serif)",
                fontSize: "21px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: isNightMode ? "#ffffff" : "#0d0c09",
                marginBottom: "8px",
                lineHeight: 1.18,
                transition: "color 0.3s ease",
              }}
            >
              Engineering Scalable Web &amp; AI Products
            </h2>

            {/* Concise Bio */}
            <p
              style={{
                fontFamily: "var(--font-geist-sans, sans-serif)",
                fontSize: "13px",
                lineHeight: 1.65,
                color: isNightMode ? "#f0eade" : "#1a1916",
                marginBottom: "18px",
                transition: "color 0.3s ease",
              }}
            >
              I&apos;m Yashwant Kariha — a Full-Stack Developer with 1+ years of experience
              building high-throughput backend APIs, responsive Next.js interfaces,
              and autonomous AI agent workflows.
            </p>

            {/* Experience Timeline */}
            <div
              style={{
                marginBottom: "18px",
                paddingBottom: "16px",
                borderBottom: isNightMode
                  ? "1px solid rgba(224, 184, 116, 0.22)"
                  : "1px solid rgba(196, 168, 130, 0.32)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: isNightMode ? "#dfba74" : "#8a5e28",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Timeline
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0" }}>
                {[
                  { year: "2023", label: "Started\nFull-Stack Dev" },
                  { year: "2024", label: "3 Production\nProjects Shipped" },
                  { year: "2025", label: "AI & Automation\nSpecialisation" },
                ].map((item, i, arr) => (
                  <div key={item.year} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: isNightMode ? "#dfba74" : "#8a5e28",
                          flexShrink: 0,
                          marginTop: "3px",
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: "7px", flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "var(--font-geist-mono, monospace)",
                          fontSize: "11px",
                          fontWeight: 800,
                          color: isNightMode ? "#ffffff" : "#11110e",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {item.year}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-geist-sans, sans-serif)",
                          fontSize: "10px",
                          fontWeight: 500,
                          color: isNightMode ? "#d4c8b6" : "#24221c",
                          lineHeight: 1.4,
                          whiteSpace: "pre-line",
                          marginTop: "2px",
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div
                        style={{
                          height: "1px",
                          flex: 0.35,
                          marginTop: "6px",
                          background: isNightMode
                            ? "rgba(224, 184, 116, 0.35)"
                            : "rgba(180, 150, 110, 0.45)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── INTERACTIVE TECH STACK MATRIX ── */}
            <div style={{ marginBottom: "16px" }}>
              {/* Header & Category Filter Tabs */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "9.5px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: isNightMode ? "#dfba74" : "#8a5e28",
                    textTransform: "uppercase",
                  }}
                >
                  Tech Stack Matrix
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "9px",
                    color: isNightMode ? "#a69b8d" : "#726555",
                  }}
                >
                  Click skill to inspect
                </span>
              </div>

              {/* Filter Tabs Strip */}
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  marginBottom: "12px",
                  padding: "3px",
                  background: isNightMode
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(0, 0, 0, 0.03)",
                  borderRadius: "6px",
                  border: isNightMode
                    ? "1px solid rgba(224, 184, 116, 0.15)"
                    : "1px solid rgba(180, 150, 110, 0.2)",
                }}
              >
                {SKILL_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      style={{
                        flex: 1,
                        padding: "5px 6px",
                        fontSize: "9.5px",
                        fontFamily: "var(--font-geist-mono, monospace)",
                        fontWeight: isActive ? 700 : 500,
                        letterSpacing: "0.04em",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        background: isActive
                          ? isNightMode
                            ? "#dfba74"
                            : "#8a5e28"
                          : "transparent",
                        color: isActive
                          ? isNightMode
                            ? "#0e121a"
                            : "#ffffff"
                          : isNightMode
                          ? "#b8ad9e"
                          : "#5c5040",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Interactive Skill Chips */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginBottom: "12px",
                }}
              >
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkillId === skill.id;
                  return (
                    <button
                      key={skill.id}
                      onClick={() => handleSelectSkill(skill.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 9px",
                        borderRadius: "5px",
                        border: isSelected
                          ? isNightMode
                            ? "1px solid #dfba74"
                            : "1px solid #8a5e28"
                          : isNightMode
                          ? "1px solid rgba(224, 184, 116, 0.2)"
                          : "1px solid rgba(180, 150, 110, 0.28)",
                        background: isSelected
                          ? isNightMode
                            ? "rgba(223, 186, 116, 0.18)"
                            : "rgba(138, 94, 40, 0.12)"
                          : isNightMode
                          ? "rgba(255, 255, 255, 0.04)"
                          : "rgba(0, 0, 0, 0.03)",
                        boxShadow: isSelected
                          ? isNightMode
                            ? "0 0 10px rgba(223, 186, 116, 0.25)"
                            : "0 0 8px rgba(138, 94, 40, 0.15)"
                          : "none",
                        color: isSelected
                          ? isNightMode
                            ? "#ffffff"
                            : "#0e0c09"
                          : isNightMode
                          ? "#e2d7c7"
                          : "#23201a",
                        cursor: "pointer",
                        fontFamily: "var(--font-geist-sans, sans-serif)",
                        fontSize: "11px",
                        fontWeight: isSelected ? 700 : 500,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span>{skill.name}</span>

                      {/* 5-Dot Proficiency Meter */}
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "2px",
                          opacity: 0.85,
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <span
                            key={dot}
                            style={{
                              width: "3.5px",
                              height: "3.5px",
                              borderRadius: "50%",
                              background:
                                dot <= skill.level
                                  ? isNightMode
                                    ? "#dfba74"
                                    : "#8a5e28"
                                  : isNightMode
                                  ? "rgba(255, 255, 255, 0.2)"
                                  : "rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        ))}
                      </span>

                      {/* Project count pill */}
                      {skill.projects.length > 0 && (
                        <span
                          style={{
                            fontFamily: "var(--font-geist-mono, monospace)",
                            fontSize: "8.5px",
                            padding: "1px 4px",
                            borderRadius: "3px",
                            background: isNightMode
                              ? "rgba(224, 184, 116, 0.15)"
                              : "rgba(180, 150, 110, 0.18)",
                            color: isNightMode ? "#dfba74" : "#84551e",
                          }}
                        >
                          {skill.projects.length}p
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ── SELECTED SKILL DETAIL DRAWER / INSPECTOR ── */}
              <AnimatePresence mode="wait">
                {selectedSkill && (
                  <motion.div
                    key={selectedSkill.id}
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.22 }}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "6px",
                      background: isNightMode
                        ? "rgba(19, 25, 36, 0.9)"
                        : "rgba(247, 243, 237, 0.95)",
                      border: isNightMode
                        ? "1px solid rgba(224, 184, 116, 0.3)"
                        : "1px solid rgba(180, 150, 110, 0.4)",
                      marginBottom: "14px",
                    }}
                  >
                    {/* Drawer Header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-geist-sans, sans-serif)",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: isNightMode ? "#ffffff" : "#11100d",
                          }}
                        >
                          {selectedSkill.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-geist-mono, monospace)",
                            fontSize: "9px",
                            padding: "1px 5px",
                            borderRadius: "3px",
                            background: isNightMode
                              ? "rgba(224, 184, 116, 0.2)"
                              : "rgba(138, 94, 40, 0.15)",
                            color: isNightMode ? "#dfba74" : "#84551e",
                            fontWeight: 600,
                          }}
                        >
                          {selectedSkill.proficiencyLabel}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedSkillId(null)}
                        aria-label="Close skill details"
                        style={{
                          background: "none",
                          border: "none",
                          color: isNightMode ? "#a89c8c" : "#726555",
                          cursor: "pointer",
                          fontSize: "14px",
                          lineHeight: 1,
                          padding: "2px 4px",
                        }}
                      >
                        ✕
                      </button>
                    </div>

                    {/* Confidence / Mastery progress bar */}
                    <div style={{ marginBottom: "8px" }}>
                      <div
                        style={{
                          height: "3px",
                          width: "100%",
                          borderRadius: "2px",
                          background: isNightMode
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.08)",
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedSkill.confidencePct}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{
                            height: "100%",
                            background: isNightMode ? "#dfba74" : "#8a5e28",
                            borderRadius: "2px",
                          }}
                        />
                      </div>
                    </div>

                    {/* Highlights */}
                    <p
                      style={{
                        fontFamily: "var(--font-geist-sans, sans-serif)",
                        fontSize: "11px",
                        lineHeight: 1.5,
                        color: isNightMode ? "#ddd2c4" : "#322e26",
                        marginBottom: "10px",
                      }}
                    >
                      {selectedSkill.highlights}
                    </p>

                    {/* Linked Projects */}
                    {selectedSkill.projects.length > 0 && (
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-geist-mono, monospace)",
                            fontSize: "8.5px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            color: isNightMode ? "#dfba74" : "#8a5e28",
                            textTransform: "uppercase",
                            marginBottom: "6px",
                          }}
                        >
                          Deployed in Production Projects:
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                          {selectedSkill.projects.map((proj) => (
                            <Link
                              key={proj.id}
                              href={`/projects/${proj.id}`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "5px 8px",
                                borderRadius: "4px",
                                textDecoration: "none",
                                background: isNightMode
                                  ? "rgba(255, 255, 255, 0.04)"
                                  : "rgba(0, 0, 0, 0.03)",
                                border: isNightMode
                                  ? "1px solid rgba(224, 184, 116, 0.18)"
                                  : "1px solid rgba(180, 150, 110, 0.25)",
                                transition: "all 0.18s ease",
                              }}
                            >
                              <div>
                                <span
                                  style={{
                                    fontFamily: "var(--font-geist-sans, sans-serif)",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    color: isNightMode ? "#ffffff" : "#11100d",
                                    marginRight: "6px",
                                  }}
                                >
                                  {proj.name}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "var(--font-geist-sans, sans-serif)",
                                    fontSize: "9.5px",
                                    color: isNightMode ? "#ad9e8e" : "#6c5d4b",
                                  }}
                                >
                                  · {proj.role}
                                </span>
                              </div>
                              <span
                                style={{
                                  fontFamily: "var(--font-geist-mono, monospace)",
                                  fontSize: "9px",
                                  fontWeight: 700,
                                  color: isNightMode ? "#dfba74" : "#8a5e28",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "2px",
                                }}
                              >
                                Case Study →
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Next Cue */}
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "9.5px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: isNightMode ? "#dfba74" : "#5a4225",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "6px",
                borderTop: isNightMode
                  ? "1px solid rgba(224, 184, 116, 0.2)"
                  : "1px solid rgba(196, 168, 130, 0.25)",
              }}
            >
              <span>Scroll for 3D Projects Gallery</span>
              <span>↓</span>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
