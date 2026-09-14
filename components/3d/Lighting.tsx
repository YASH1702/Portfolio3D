"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Lighting — warm interior studio setup.
 *
 * Very slow idle sunlight animation — period ~30s, amplitude ±4%.
 * Everything else is static — no per-frame GPU cost.
 */
export default function Lighting() {
  const sunRef = useRef<THREE.DirectionalLight>(null!);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.033; // 1 cycle ≈ 30 s
    if (sunRef.current) {
      sunRef.current.intensity = 1.05 + Math.sin(timeRef.current * Math.PI * 2) * 0.04;
    }
  });

  return (
    <>
      {/* Hemisphere — warm floor / cool sky balance */}
      <hemisphereLight args={["#c8d8f8", "#a08855", 0.45]} position={[0, 10, 0]} />

      {/* Ambient fill — very soft warm */}
      <ambientLight intensity={0.25} color="#f8efe0" />

      {/* Sun — window light from front-right, angled down */}
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

      {/* Fill light from left — balances harsh shadows */}
      <directionalLight
        position={[-5, 4, 3]}
        intensity={0.18}
        color="#d0e0ff"
      />

      {/* Desk lamp — warm amber */}
      <pointLight
        position={[2.85, 2.0, -1.2]}
        intensity={1.2}
        color="#ffcc66"
        distance={4.5}
        decay={2}
      />

      {/* Monitor screen glow — cool blue-white */}
      <pointLight
        position={[2.1, 1.55, -1.45]}
        intensity={0.2}
        color="#b8cef8"
        distance={1.8}
        decay={2}
      />

      {/* Window bounce — front-right wall area */}
      <pointLight
        position={[5, 3, 2]}
        intensity={0.35}
        color="#e0ecff"
        distance={10}
        decay={2}
      />

      {/* Project wall accent — softly illuminates the left wall frames */}
      <pointLight
        position={[-3.5, 2.8, 0]}
        intensity={0.4}
        color="#fff8ec"
        distance={6}
        decay={2}
      />
    </>
  );
}
