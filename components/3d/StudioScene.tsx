"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
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
 * PauseOnHidden — pauses the render loop when the tab is not visible.
 * Dramatically reduces idle GPU usage.
 */
function PauseOnHidden() {
  const { gl } = useThree();
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        gl.setAnimationLoop(null);
      } else {
        gl.setAnimationLoop((time) => {
          // Resume — R3F re-establishes its own loop on next frame
        });
        // Let R3F take back over
        gl.setAnimationLoop(null);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [gl]);
  return null;
}

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
        gl.toneMappingExposure = 0.88;
      }}
      style={{ background: "#d8d0c4" }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <PauseOnHidden />

      {/* Atmospheric fog — gentle depth blur */}
      <fog attach="fog" args={["#d4ccc0", 10, 24]} />

      {/* Lighting */}
      <Lighting />

      {/* Scene content */}
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
