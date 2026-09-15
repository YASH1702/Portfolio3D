"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { interpolateCameraKeyframes } from "@/lib/cameraKeyframes";
import { StudioProvider } from "@/context/StudioContext";
import Navigation from "@/components/ui/Navigation";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Cursor from "@/components/ui/Cursor";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import StudioControls from "@/components/ui/StudioControls";
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
  const [isLoading, setIsLoading] = useState(true);
  const { progress } = useScrollProgress();

  const { section } = interpolateCameraKeyframes(progress);

  // Section visibility thresholds
  const showAbout   = progress >= 0.28 && progress <= 0.52;
  const showContact = progress >= 0.88;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ── LOADING SCREEN ── */}
      <LoadingScreen isLoading={isLoading} />

      {/* ── CURSOR (desktop only) ── */}
      <Cursor />

      {/* ── NAVIGATION ── */}
      <Navigation scrollProgress={progress} currentSection={section} />

      {/* ── SCROLL PROGRESS + SECTION LABEL ── */}
      <ScrollIndicator progress={progress} section={section} />

      {/* ── STUDIO CONTROLS (Day/Night mode & Lamp toggle) ── */}
      <StudioControls />

      {/* ── FIXED 3D CANVAS ── */}
      <div
        className="canvas-fixed"
        aria-hidden="true"
        role="presentation"
      >
        <StudioScene scrollProgress={progress} />
      </div>

      {/* ── SECTION OVERLAYS ── */}
      <AboutOverlay   visible={showAbout} />
      <ContactSection visible={showContact} />

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
                <a href="https://github.com" rel="noopener noreferrer">GitHub</a> ·{" "}
                <a href="https://linkedin.com" rel="noopener noreferrer">LinkedIn</a> ·{" "}
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
  return (
    <StudioProvider>
      <PortfolioExperience />
    </StudioProvider>
  );
}
