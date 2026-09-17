"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";
import { dampedLerp } from "@/lib/easings";

import Room from "./Room";
import Desk from "./Desk";
import Couch from "./Couch";
import Lighting from "./Lighting";
import HeroWall from "./HeroWall";
import ProjectWall from "./ProjectWall";
import ScrollCamera from "./ScrollCamera";
import Environment from "./Environment";
import WindowView from "./WindowView";

interface StudioSceneProps {
  scrollProgress: number;
}

/**
 * AtmosphereManager — smoothly shifts fog and scene background between
 * daylight and late-night studio modes.
 */
function AtmosphereManager() {
  const { isNightMode } = useStudio();
  const { scene } = useThree();
  const fogColor = useRef(new THREE.Color("#d4ccc0"));

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const targetHex = isNightMode ? "#0a0d16" : "#ede6dc";
    fogColor.current.lerp(new THREE.Color(targetHex), 0.06);

    if (scene.fog) {
      scene.fog.color.copy(fogColor.current);
    }
  });

  return null;
}

/**
 * PauseOnHidden — pauses the WebGL render loop when the browser tab is hidden,
 * and resumes it cleanly when the tab becomes visible again.
 * Uses R3F's invalidate() to re-kickstart the continuous loop on resume.
 */
function PauseOnHidden() {
  const { gl, invalidate } = useThree();
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        // Pause: clear the animation loop to save GPU/battery
        gl.setAnimationLoop(null);
      } else {
        // Resume: R3F will restart its own loop on next invalidate
        invalidate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [gl, invalidate]);
  return null;
}

export default function StudioScene({ scrollProgress }: StudioSceneProps) {
  const { isNightMode } = useStudio();

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{
        position: [0.0, 1.65, 5.2],
        fov: 60,
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
        gl.toneMappingExposure = 0.90;
      }}
      style={{
        background: isNightMode ? "#0a0d16" : "#ede6dc",
        transition: "background 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <PauseOnHidden />
      <AtmosphereManager />

      {/* Atmospheric depth fog */}
      <fog attach="fog" args={[isNightMode ? "#0a0d16" : "#ede6dc", 10, 26]} />

      {/* Lighting setup */}
      <Lighting />

      {/* Studio scene objects */}
      <Suspense fallback={null}>
        <Environment />
        <Room />
        <WindowView />
        <Desk />
        <Couch />
        <HeroWall />
        <ProjectWall scrollProgress={scrollProgress} />
      </Suspense>

      {/* Scroll-driven camera with micro-parallax */}
      <ScrollCamera scrollProgress={scrollProgress} />
    </Canvas>
  );
}
