"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { interpolateCameraKeyframes } from "@/lib/cameraKeyframes";
import Navigation from "@/components/ui/Navigation";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Cursor from "@/components/ui/Cursor";

/**
 * StudioScene is dynamically imported — never server-rendered.
 * Three.js requires browser APIs (WebGL) unavailable on the server.
 */
const StudioScene = dynamic(() => import("@/components/3d/StudioScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * VIRTUAL SCROLL HEIGHT
 * The canvas stays fixed; this tall div creates the scroll distance
 * that drives the camera. 500vh gives a comfortable scroll experience
 * across all four sections.
 */
const SCROLL_HEIGHT = "500vh";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { progress } = useScrollProgress();

  // Derive current section from scroll progress
  const { section } = interpolateCameraKeyframes(progress);

  // Mark as loaded after a short delay (gives Three.js time to initialize)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ── LOADING SCREEN ── */}
      <LoadingScreen isLoading={isLoading} />

      {/* ── CUSTOM CURSOR (desktop only) ── */}
      <Cursor />

      {/* ── NAVIGATION ── */}
      <Navigation scrollProgress={progress} currentSection={section} />

      {/* ── FIXED 3D CANVAS ── */}
      <div className="canvas-fixed" aria-hidden="true">
        <StudioScene scrollProgress={progress} />
      </div>

      {/* ── VIRTUAL SCROLL DRIVER ──
          This div is taller than the viewport to create scroll distance.
          It is pointer-events: none so the 3D canvas below receives events.
          Accessibility content is placed here for screen readers. ── */}
      <div
        className="scroll-driver"
        style={{ height: SCROLL_HEIGHT }}
        role="main"
      >
        {/* Accessible content for screen readers / non-JS users */}
        <div
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
          }}
        >
          <h1>Yashwant Kariha — Full-Stack Developer</h1>
          <p>
            Building digital products, AI systems & modern web experiences.
            React · Next.js · TypeScript · Node.js · PostgreSQL · AI.
          </p>
          <section aria-label="Projects">
            <h2>Projects</h2>
            <ul>
              <li>
                <a href="/projects/jobpilot-ai">
                  JobPilot AI — Autonomous Job Application & Career Copilot
                </a>
              </li>
              <li>
                <a href="/projects/businessflow">
                  BusinessFlow — Business Website + Booking Platform
                </a>
              </li>
              <li>
                <a href="/projects/ai-automation-platform">
                  AI Automation Platform — AI-powered business & workflow
                  automation
                </a>
              </li>
            </ul>
          </section>
          <section aria-label="Contact">
            <h2>Contact</h2>
            <p>Get in touch to build something together.</p>
          </section>
        </div>
      </div>
    </>
  );
}
