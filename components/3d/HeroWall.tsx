"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * HeroWall — Front wall architectural identity.
 *
 * Designed to look like physical architectural lettering mounted onto
 * the gallery/studio plaster wall.
 *
 * Typography:
 *  1. YASHWANT KARIHA     — Dominant, bold architectural lettering with subtle drop shadow
 *  2. Brass divider bar   — Minimal architectural metalwork
 *  3. FULL-STACK DEVELOPER — High tracking, refined editorial weight
 *  4. Tagline             — Dual-line positioning statement
 *  5. Tech metadata       — Monospace specification
 *  6. Scroll indicator    — Subtle floating arrow indicator
 */
export default function HeroWall() {
  const arrowRef = useRef<THREE.Group>(null!);
  const timeRef = useRef(0);

  // Very slow, subtle breathing float for scroll indicator
  useFrame((_, delta) => {
    timeRef.current += delta * 0.9;
    if (arrowRef.current) {
      arrowRef.current.position.y =
        0.92 + Math.sin(timeRef.current * Math.PI * 2) * 0.006;
    }
  });

  const WALL_Z = -5.86;

  return (
    <group name="hero-wall">
      {/* ── ARCHITECTURAL WALL EMBOSSING / SHADOW LAYER ── */}
      {/* Subtle depth backing behind the name */}
      <Text
        position={[0.005, 2.615, WALL_Z - 0.003]}
        fontSize={0.46}
        color="#c8beaf"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.14}
        maxWidth={10}
        textAlign="center"
        fontWeight={700}
      >
        YASHWANT KARIHA
      </Text>

      {/* ── MAIN NAME (DOMINANT ELEMENT) ── */}
      <Text
        position={[0, 2.62, WALL_Z]}
        fontSize={0.46}
        color="#151410"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.14}
        maxWidth={10}
        textAlign="center"
        fontWeight={700}
      >
        YASHWANT KARIHA
      </Text>

      {/* ── BRUSHED BRASS ARCHITECTURAL DIVIDER ── */}
      <mesh position={[0, 2.26, WALL_Z]}>
        <planeGeometry args={[3.4, 0.008]} />
        <meshStandardMaterial
          color="#b09060"
          roughness={0.4}
          metalness={0.65}
        />
      </mesh>

      {/* ── ROLE ── */}
      <Text
        position={[0, 2.02, WALL_Z]}
        fontSize={0.135}
        color="#28261e"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.24}
        maxWidth={9}
        textAlign="center"
        fontWeight={600}
      >
        FULL-STACK DEVELOPER
      </Text>

      {/* ── EDITORIAL POSITIONING TAGLINE ── */}
      <Text
        position={[0, 1.66, WALL_Z]}
        fontSize={0.092}
        color="#4d4a42"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.07}
        lineHeight={1.65}
        maxWidth={7.5}
        textAlign="center"
      >
        {`BUILDING DIGITAL PRODUCTS,\nAI SYSTEMS & MODERN WEB EXPERIENCES.`}
      </Text>

      {/* ── TECHNICAL METADATA SPECIFICATION ── */}
      <Text
        position={[0, 1.30, WALL_Z]}
        fontSize={0.062}
        color="#826848"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
        maxWidth={9}
        textAlign="center"
      >
        React  ·  Next.js  ·  TypeScript  ·  Node.js  ·  PostgreSQL  ·  AI
      </Text>

      {/* ── SCROLL TO EXPLORE INDICATOR ── */}
      <group ref={arrowRef}>
        <Text
          position={[0, 0.92, WALL_Z]}
          fontSize={0.046}
          color="#988a76"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.24}
          maxWidth={5}
          textAlign="center"
        >
          SCROLL TO EXPLORE  ↓
        </Text>
      </group>
    </group>
  );
}
