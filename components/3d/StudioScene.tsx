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
    const targetHex = isNightMode ? "#121520" : "#d4ccc0";
    fogColor.current.lerp(new THREE.Color(targetHex), 0.06);

    if (scene.fog) {
      scene.fog.color.copy(fogColor.current);
    }
  });

  return null;
}

/**
 * PauseOnHidden — pauses the render loop when the browser tab is not visible.
 */
function PauseOnHidden() {
  const { gl } = useThree();
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        gl.setAnimationLoop(null);
      } else {
        gl.setAnimationLoop(null);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [gl]);
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
        fov: 58,
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
      style={{
        background: isNightMode ? "#0f121a" : "#d8d0c4",
        transition: "background 0.8s ease",
      }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <PauseOnHidden />
      <AtmosphereManager />

      {/* Atmospheric depth fog */}
      <fog attach="fog" args={["#d4ccc0", 9, 24]} />

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
        <ProjectWall />
      </Suspense>

      {/* Scroll-driven camera with micro-parallax */}
      <ScrollCamera scrollProgress={scrollProgress} />
    </Canvas>
  );
}
