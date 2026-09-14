"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

import Room from "./Room";
import Desk from "./Desk";
import Couch from "./Couch";
import Lighting from "./Lighting";
import HeroWall from "./HeroWall";
import ProjectWall from "./ProjectWall";
import ScrollCamera from "./ScrollCamera";
import Environment from "./Environment";

interface StudioSceneProps {
  scrollProgress: number;
}

/**
 * StudioScene — root R3F Canvas.
 *
 * Performance settings:
 * - dpr [1, 1.5]: capped lower than 2 for better perf on hi-DPI screens
 * - shadows: true with PCFShadowMap (PCFSoftShadowMap deprecated in Three r169+)
 * - AdaptiveDpr / AdaptiveEvents for runtime adaptation
 * - camera FOV 55 — natural interior perspective
 */
export default function StudioScene({ scrollProgress }: StudioSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
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
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.9;
      }}
      style={{ background: "#d8d0c4" }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={["#d8d0c4", 8, 22]} />

      {/* Lighting */}
      <Lighting />

      {/* Scene */}
      <Suspense fallback={null}>
        <Environment />
        <Room />
        <Desk />
        <Couch />
        <HeroWall />
        <ProjectWall />
      </Suspense>

      {/* Scroll-driven camera */}
      <ScrollCamera scrollProgress={scrollProgress} />
    </Canvas>
  );
}
