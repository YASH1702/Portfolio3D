"use client";
import dynamic from "next/dynamic";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { interpolateCameraKeyframes } from "@/lib/cameraKeyframes";
import { StudioProvider, useStudio } from "@/context/StudioContext";
import Navigation from "@/components/ui/Navigation";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Cursor from "@/components/ui/Cursor";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import StudioControls from "@/components/ui/StudioControls";
import AudioToggle from "@/components/ui/AudioToggle";
import ScrollPrompt from "@/components/ui/ScrollPrompt";
import CommandPalette from "@/components/ui/CommandPalette";
import TerminalModal from "@/components/ui/TerminalModal";
import BooksModal from "@/components/ui/BooksModal";
import LofiPlayerDock from "@/components/ui/LofiPlayerDock";
import MobileStudioDock from "@/components/ui/MobileStudioDock";
import MobileSectionNav from "@/components/ui/MobileSectionNav";
import AboutOverlay from "@/components/sections/AboutOverlay";
import ContactSection from "@/components/sections/ContactSection";

/**
 * StudioScene dynamically imported — Three.js requires browser APIs.
 */
const StudioScene = dynamic(() => import("@/components/3d/StudioScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * VIRTUAL SCROLL HEIGHT — 500vh creates comfortable scroll distance
 * across all 4 zones.
 */
const SCROLL_HEIGHT = "500vh";

function PortfolioExperience() {
  const { progress } = useScrollProgress();
  const { isFocusMode, toggleFocusMode } = useStudio();

  const { section } = interpolateCameraKeyframes(progress);

  // Section visibility thresholds
  const showAbout   = progress >= 0.28 && progress <= 0.52;
  const showContact = progress >= 0.88;

  return (
    <>
      {/* ── LOADING SCREEN (self-driving via useProgress) ── */}
      <LoadingScreen />

      {/* ── COMMAND PALETTE (Cmd+K / Ctrl+K) ── */}
      <CommandPalette />

      {/* ── INTERACTIVE DEVELOPER CLI TERMINAL (` or ~) ── */}
      <TerminalModal />

      {/* ── INTERACTIVE BOOKSHELF READING LIST (B) ── */}
      <BooksModal />

      {/* ── ZEN FOCUS MODE EXIT BANNER ── */}
      {isFocusMode && (
        <div
          style={{
            position: "fixed",
            top: "clamp(16px, 3vh, 26px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 110,
            pointerEvents: "all",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <button
            onClick={toggleFocusMode}
            aria-label="Exit Zen Focus Mode"
            title="Exit Zen Focus Mode (Esc or F)"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              background: "rgba(10, 14, 26, 0.70)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              color: "#ffffff",
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.45)",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ color: "#38bdf8" }}>✦</span>
            <span>ZEN MODE ACTIVE</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>PRESS [ESC] OR CLICK TO EXIT</span>
          </button>
        </div>
      )}

      {/* ── 2D UI CONTROLS LAYER (Fades out in Zen Mode) ── */}
      <div
        style={{
          opacity: isFocusMode ? 0 : 1,
          pointerEvents: isFocusMode ? "none" : "auto",
          transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* ── NAVIGATION ── */}
        <Navigation scrollProgress={progress} currentSection={section} />

        {/* ── SCROLL PROGRESS + SECTION LABEL ── */}
        <ScrollIndicator progress={progress} section={section} />

        {/* ── INTERACTIVE SCROLL PROMPT — bottom center (auto-hides on scroll) ── */}
        <ScrollPrompt progress={progress} />

        {/* ── STUDIO CONTROLS (Day/Night + Lamp + Zen) — bottom right ── */}
        <StudioControls />

        {/* ── AMBIENT AUDIO TOGGLE — bottom left ── */}
        <AudioToggle />

        {/* ── MINI LO-FI BEATS PLAYER DOCK (Active when Lo-Fi is playing) ── */}
        <LofiPlayerDock />

        {/* ── MOBILE TOUCH QUICK-JUMP SECTION NAV (Bottom-Left on Mobile) ── */}
        <MobileSectionNav scrollProgress={progress} />

        {/* ── MOBILE CONSOLIDATED STUDIO DOCK (Bottom-Right on Mobile) ── */}
        <MobileStudioDock />

        {/* ── SECTION OVERLAYS ── */}
        <AboutOverlay   visible={showAbout} />
        <ContactSection visible={showContact} />
      </div>

      {/* ── FIXED 3D CANVAS ── */}
      <div className="canvas-fixed" aria-hidden="true" role="presentation">
        <StudioScene scrollProgress={progress} />
      </div>

      {/* ── VIRTUAL SCROLL DRIVER ── */}
      <div
        className="scroll-driver"
        style={{ height: SCROLL_HEIGHT }}
        role="main"
        aria-label="Portfolio content"
      >
        {/* Screen-reader accessible hidden content */}
        <div className="sr-only">
          <h1>Yashwant Kariha — Full-Stack Developer</h1>
          <p>
            Building digital products, AI systems &amp; modern web experiences.
            React · Next.js · TypeScript · Node.js · PostgreSQL · AI.
          </p>

          <nav aria-label="Skip to section">
            <a href="#about-sr">About</a>
            <a href="#projects-sr">Projects</a>
            <a href="#contact-sr">Contact</a>
          </nav>

          <section id="about-sr">
            <h2>About</h2>
            <p>
              Full-Stack Developer focused on building modern web applications,
              AI-powered products, and scalable digital experiences. Primary
              technologies: React, Next.js, TypeScript, Node.js, PostgreSQL,
              Prisma, Tailwind CSS, OpenAI APIs.
            </p>
          </section>

          <section id="projects-sr">
            <h2>Projects</h2>
            <ul>
              <li>
                <a href="/projects/jobpilot-ai">
                  JobPilot AI — Autonomous Job Application &amp; Career Copilot
                  (Next.js, TypeScript, OpenAI, PostgreSQL)
                </a>
              </li>
              <li>
                <a href="/projects/businessflow">
                  BusinessFlow — Business Website + Booking Platform
                  (Next.js, Stripe, Inngest, Redis)
                </a>
              </li>
              <li>
                <a href="/projects/ai-automation-platform">
                  AI Automation Platform — Workflow automation with AI
                  (Next.js, Node.js, OpenAI, Redis)
                </a>
              </li>
            </ul>
          </section>

          <section id="contact-sr">
            <h2>Contact</h2>
            <address>
              <p>
                <a href="mailto:yashwantkariha1@gmail.com">yashwantkariha1@gmail.com</a> ·{" "}
                <a href="tel:+916375278279">+91 6375278279</a> ·{" "}
                <a href="https://github.com/YASH1702" rel="noopener noreferrer">GitHub</a> ·{" "}
                <a href="https://linkedin.com/in/yashwant-kariha-740630207/" rel="noopener noreferrer">LinkedIn</a> ·{" "}
                <a href="/resume">Curriculum Vitae</a>
              </p>
            </address>
          </section>
        </div>
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </>
  );
}

export default function Home() {
  return <PortfolioExperience />;
}
