"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Lighting — all lights for the studio interior.
 *
 * Strategy:
 * - Ambient: very soft warm fill
 * - Directional: simulates sunlight through a window (warm, angled)
 * - Point lights: desk lamp, subtle screen glow
 * - Hemisphere: cool sky / warm floor bounce
 *
 * Performance: only 3 shadow-casting lights max, baked shadows preferred.
 */
export default function Lighting() {
  const sunRef = useRef<THREE.DirectionalLight>(null!);
  const timeRef = useRef(0);

  // Very slow sunlight intensity variation (idle animation)
  useFrame((_, delta) => {
    timeRef.current += delta * 0.05; // extremely slow
    if (sunRef.current) {
      // Subtle intensity breathing — 0.95 to 1.05 over ~20s cycle
      sunRef.current.intensity =
        1.0 + Math.sin(timeRef.current * Math.PI * 2) * 0.05;
    }
  });

  return (
    <>
      {/* Hemisphere light — warm floor, cool sky */}
      <hemisphereLight
        args={["#d4c5a9", "#8b7355", 0.4]}
        position={[0, 10, 0]}
      />

      {/* Ambient fill — very soft warm */}
      <ambientLight intensity={0.3} color="#f5ede0" />

      {/* Directional sun — coming through the window from upper-left */}
      <directionalLight
        ref={sunRef}
        position={[-3, 6, 4]}
        intensity={1.0}
        color="#fff8e7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.001}
      />

      {/* Desk lamp — warm point light */}
      <pointLight
        position={[2.2, 1.8, -0.5]}
        intensity={0.8}
        color="#ffd580"
        distance={4}
        decay={2}
      />

      {/* Screen glow — very subtle blue-white */}
      <pointLight
        position={[1.8, 1.5, -0.8]}
        intensity={0.15}
        color="#c8d8f0"
        distance={2}
        decay={2}
      />

      {/* Window bounce — fill from the front-left */}
      <pointLight
        position={[-2, 3, 5]}
        intensity={0.3}
        color="#e8f0ff"
        distance={8}
        decay={2}
      />
    </>
  );
}
