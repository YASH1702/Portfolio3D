"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";

import Room from "./Room";
import Desk from "./Desk";
import Couch from "./Couch";
import Lighting from "./Lighting";
import HeroWall from "./HeroWall";
import ProjectWall from "./ProjectWall";
import ScrollCamera from "./ScrollCamera";

interface StudioSceneProps {
  scrollProgress: number;
}

/**
 * StudioScene — the root R3F Canvas component.
 *
 * Performance settings:
 * - dpr: capped at [1, 2] — avoids extreme pixel density on 4K screens
 * - shadows: enabled, PCFSoft for quality/perf balance
 * - camera: initial position set to match keyframe 0
 * - gl: powerPreference "high-performance", antialias true
 * - AdaptiveDpr: automatically lowers DPR during interaction
 * - AdaptiveEvents: defers raycasting to improve scroll performance
 *
 * OrbitControls are removed in production — ScrollCamera takes over.
 * Temporarily enabled in development for debugging (comment out for prod).
 */
export default function StudioScene({ scrollProgress }: StudioSceneProps) {
  return (
    <Canvas
      shadows="soft"
      dpr={[1, 2]}
      camera={{
        position: [0, 1.6, 5],
        fov: 55,
        near: 0.1,
        far: 50,
      }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      }}
      style={{ background: "#e8e0d4" }}
    >
      {/* Performance adapters */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Lighting */}
      <Lighting />

      {/* Room architecture */}
      <Suspense fallback={null}>
        <Room />
        <Desk />
        <Couch />
        <HeroWall />
        <ProjectWall />
      </Suspense>

      {/* Scroll-driven camera — this is the heart of the experience */}
      <ScrollCamera scrollProgress={scrollProgress} />
    </Canvas>
  );
}
