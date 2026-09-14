"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * HeroWall — front wall typography.
 *
 * Positioned at Z = -5.85 (just in front of the wall plane at -6).
 * All text uses drei <Text> which renders via SDFText (crisp at any distance).
 *
 * Hierarchy:
 *  1. YASHWANT KARIHA     — largest, bold, near-black
 *  2. Thin rule line      — warm tan separator
 *  3. FULL-STACK DEVELOPER — medium weight, wide tracking
 *  4. Tagline             — smaller, two lines
 *  5. Tech stack          — monospace, muted warm
 *  6. Scroll indicator    — very small, subtle pulse
 *
 * The scroll arrow has a very subtle up-down animation (≤2px equiv).
 */
export default function HeroWall() {
  const arrowRef = useRef<THREE.Group>(null!);
  const timeRef = useRef(0);

  // Very subtle arrow float — 0.004 units ≈ imperceptible but alive
  useFrame((_, delta) => {
    timeRef.current += delta * 0.8;
    if (arrowRef.current) {
      arrowRef.current.position.y =
        1.16 + Math.sin(timeRef.current * Math.PI * 2) * 0.004;
    }
  });

  const WALL_Z = -5.85;

  return (
    <group name="hero-wall">
      {/* ── NAME ── */}
      <Text
        position={[0, 2.45, WALL_Z]}
        fontSize={0.26}
        color="#18180f"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.14}
        maxWidth={9}
        textAlign="center"
        fontWeight={700}
      >
        YASHWANT KARIHA
      </Text>

      {/* ── DIVIDER ── */}
      <mesh position={[0, 2.16, WALL_Z]}>
        <planeGeometry args={[2.4, 0.005]} />
        <meshStandardMaterial color="#c4a882" roughness={0.8} metalness={0} />
      </mesh>

      {/* ── ROLE ── */}
      <Text
        position={[0, 1.97, WALL_Z]}
        fontSize={0.088}
        color="#2e2c24"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.24}
        maxWidth={9}
        textAlign="center"
      >
        FULL-STACK DEVELOPER
      </Text>

      {/* ── TAGLINE ── */}
      <Text
        position={[0, 1.70, WALL_Z]}
        fontSize={0.065}
        color="#5a5750"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
        lineHeight={1.7}
        maxWidth={5.5}
        textAlign="center"
      >
        {`BUILDING DIGITAL PRODUCTS,\nAI SYSTEMS & MODERN WEB EXPERIENCES.`}
      </Text>

      {/* ── TECH STACK ── */}
      <Text
        position={[0, 1.44, WALL_Z]}
        fontSize={0.045}
        color="#8b7050"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
        maxWidth={8}
        textAlign="center"
      >
        React  ·  Next.js  ·  TypeScript  ·  Node.js  ·  PostgreSQL  ·  AI
      </Text>

      {/* ── SCROLL INDICATOR ── */}
      <group ref={arrowRef}>
        <Text
          position={[0, 1.16, WALL_Z]}
          fontSize={0.034}
          color="#a09078"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.22}
          maxWidth={4}
          textAlign="center"
        >
          SCROLL TO EXPLORE  ↓
        </Text>
      </group>
    </group>
  );
}
