"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";
import { dampedLerp } from "@/lib/easings";

/**
 * Lighting — Adaptive architectural studio lighting.
 *
 * Smoothly transitions between:
 * - Day Mode: Warm natural daylight streaming through window, soft ambient fill.
 * - Night Mode: Moonlight through window, warm glowing desk lamp as the hero light,
 *   vibrant monitor coding reflections, moody studio shadows.
 *
 * Supports desk lamp toggle (isLampOn) and idle sunlight breathing.
 */
export default function Lighting() {
  const { isNightMode, isLampOn } = useStudio();

  const sunRef = useRef<THREE.DirectionalLight>(null!);
  const ambientRef = useRef<THREE.AmbientLight>(null!);
  const deskLampRef = useRef<THREE.PointLight>(null!);
  const screenGlowRef = useRef<THREE.PointLight>(null!);
  const windowBounceRef = useRef<THREE.PointLight>(null!);
  const leftFillRef = useRef<THREE.DirectionalLight>(null!);
  const hemiRef = useRef<THREE.HemisphereLight>(null!);

  const timeRef = useRef(0);

  // Dynamic light intensities
  const currentSun = useRef(1.05);
  const currentAmbient = useRef(0.25);
  const currentLamp = useRef(0.8);
  const currentScreen = useRef(0.2);
  const currentBounce = useRef(0.35);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    timeRef.current += dt * 0.033; // 1 cycle ≈ 30 s

    // Sunlight breathing
    const breathing = Math.sin(timeRef.current * Math.PI * 2) * 0.04;

    // Target light levels based on studio mode & lamp state
    const targetSun = isNightMode ? 0.08 : 1.05 + breathing;
    const targetAmbient = isNightMode ? 0.07 : 0.25;
    const targetLamp = isLampOn ? (isNightMode ? 1.9 : 0.75) : 0.0;
    const targetScreen = isNightMode ? 0.45 : 0.18;
    const targetBounce = isNightMode ? 0.05 : 0.35;

    // Smooth exponential damping
    currentSun.current = dampedLerp(currentSun.current, targetSun, 4, dt);
    currentAmbient.current = dampedLerp(currentAmbient.current, targetAmbient, 4, dt);
    currentLamp.current = dampedLerp(currentLamp.current, targetLamp, 6, dt);
    currentScreen.current = dampedLerp(currentScreen.current, targetScreen, 5, dt);
    currentBounce.current = dampedLerp(currentBounce.current, targetBounce, 4, dt);

    if (sunRef.current) {
      sunRef.current.intensity = currentSun.current;
      sunRef.current.color.lerp(
        new THREE.Color(isNightMode ? "#3d507c" : "#fff5e0"),
        0.05
      );
    }
    if (ambientRef.current) {
      ambientRef.current.intensity = currentAmbient.current;
      ambientRef.current.color.lerp(
        new THREE.Color(isNightMode ? "#1a2034" : "#f8efe0"),
        0.05
      );
    }
    if (deskLampRef.current) {
      deskLampRef.current.intensity = currentLamp.current;
    }
    if (screenGlowRef.current) {
      screenGlowRef.current.intensity = currentScreen.current;
      screenGlowRef.current.color.lerp(
        new THREE.Color(isNightMode ? "#6b8aff" : "#b8cef8"),
        0.05
      );
    }
    if (windowBounceRef.current) {
      windowBounceRef.current.intensity = currentBounce.current;
    }
    if (leftFillRef.current) {
      leftFillRef.current.intensity = isNightMode ? 0.05 : 0.18;
    }
  });

  return (
    <>
      {/* Hemisphere — warm floor / cool sky balance */}
      <hemisphereLight
        ref={hemiRef}
        args={["#c8d8f8", "#a08855", 0.45]}
        position={[0, 10, 0]}
      />

      {/* Ambient fill */}
      <ambientLight ref={ambientRef} intensity={0.25} color="#f8efe0" />

      {/* Sun / Moon directional light through window */}
      <directionalLight
        ref={sunRef}
        position={[4, 7, 5]}
        intensity={1.05}
        color="#fff5e0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={24}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-bias={-0.002}
        shadow-normalBias={0.02}
      />

      {/* Soft left fill light */}
      <directionalLight
        ref={leftFillRef}
        position={[-5, 4, 3]}
        intensity={0.18}
        color="#d0e0ff"
      />

      {/* Desk lamp — warm amber hero light */}
      <pointLight
        ref={deskLampRef}
        position={[2.85, 2.0, -1.2]}
        intensity={0.8}
        color="#ffaa33"
        distance={5.0}
        decay={2}
      />

      {/* Monitor screen glow */}
      <pointLight
        ref={screenGlowRef}
        position={[2.1, 1.55, -1.45]}
        intensity={0.2}
        color="#b8cef8"
        distance={2.0}
        decay={2}
      />

      {/* Window daylight bounce */}
      <pointLight
        ref={windowBounceRef}
        position={[5, 3, 2]}
        intensity={0.35}
        color="#e0ecff"
        distance={10}
        decay={2}
      />

      {/* Project wall gallery accent light */}
      <pointLight
        position={[-3.5, 2.8, 0]}
        intensity={0.35}
        color="#fff8ec"
        distance={6}
        decay={2}
      />

      {/* Hero wall architectural accent light (enhances text legibility in Night Mode) */}
      <pointLight
        position={[0, 3.2, -3.8]}
        intensity={isNightMode ? 0.65 : 0.15}
        color={isNightMode ? "#fff4e2" : "#f8efe0"}
        distance={6.5}
        decay={2}
      />
    </>
  );
}
