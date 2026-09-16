"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";

/**
 * HeroWall — Front wall architectural identity.
 *
 * Designed to look like physical architectural lettering mounted onto
 * the gallery/studio plaster wall.
 *
 * Typography dynamically adapts to Day and Night studio lighting
 * to ensure crisp, elegant readability at all times.
 */
export default function HeroWall() {
  const { isNightMode } = useStudio();
  const arrowRef = useRef<THREE.Group>(null!);
  const timeRef = useRef(0);

  // Breathing float for scroll indicator
  useFrame((_, delta) => {
    timeRef.current += delta * 0.9;
    if (arrowRef.current) {
      arrowRef.current.position.y =
        0.88 + Math.sin(timeRef.current * Math.PI * 2) * 0.012;
    }
  });

  const WALL_Z = -5.86;

  // High-contrast adaptive palette for crisp readability across Day & Night modes
  const nameBackingColor = isNightMode ? "#0d101a" : "#b4a896";
  const nameColor        = isNightMode ? "#ffffff" : "#0d0c09";
  const dividerColor     = isNightMode ? "#dfba74" : "#a88040";
  const roleColor        = isNightMode ? "#f8eee2" : "#12110d";
  const taglineColor     = isNightMode ? "#eae2d5" : "#1c1a14";
  const techColor        = isNightMode ? "#dfba74" : "#48361e";
  const indicatorColor   = isNightMode ? "#ffffff" : "#11110e";

  return (
    <group name="hero-wall">
      {/* ── ARCHITECTURAL WALL EMBOSSING / SHADOW LAYER ── */}
      {/* Subtle depth backing behind the name */}
      <Text
        position={[0.005, 2.615, WALL_Z - 0.003]}
        fontSize={0.46}
        color={nameBackingColor}
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
        color={nameColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.14}
        maxWidth={10}
        textAlign="center"
        fontWeight={800}
      >
        YASHWANT KARIHA
      </Text>

      {/* ── BRUSHED BRASS ARCHITECTURAL DIVIDER ── */}
      <mesh position={[0, 2.26, WALL_Z]}>
        <planeGeometry args={[3.4, 0.008]} />
        <meshStandardMaterial
          color={dividerColor}
          roughness={0.35}
          metalness={0.7}
        />
      </mesh>

      {/* ── ROLE ── */}
      <Text
        position={[0, 2.02, WALL_Z]}
        fontSize={0.145}
        color={roleColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.24}
        maxWidth={9}
        textAlign="center"
        fontWeight={700}
      >
        FULL-STACK DEVELOPER
      </Text>

      {/* ── EDITORIAL POSITIONING TAGLINE ── */}
      <Text
        position={[0, 1.66, WALL_Z]}
        fontSize={0.102}
        color={taglineColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        lineHeight={1.65}
        maxWidth={8.0}
        textAlign="center"
        fontWeight={500}
      >
        {`BUILDING DIGITAL PRODUCTS,\nAI SYSTEMS & MODERN WEB EXPERIENCES.`}
      </Text>

      {/* ── TECHNICAL METADATA SPECIFICATION ── */}
      <Text
        position={[0, 1.30, WALL_Z]}
        fontSize={0.072}
        color={techColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.20}
        maxWidth={9}
        textAlign="center"
        fontWeight={600}
      >
        React  ·  Next.js  ·  TypeScript  ·  Node.js  ·  PostgreSQL  ·  AI
      </Text>

      {/* ── SCROLL TO EXPLORE INDICATOR ── */}
      <group ref={arrowRef} position={[0, 0.90, WALL_Z]}>
        <Text
          position={[0, 0.04, 0]}
          fontSize={0.082}
          color={indicatorColor}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.28}
          maxWidth={6}
          textAlign="center"
          fontWeight={700}
        >
          SCROLL TO EXPLORE
        </Text>
        {/* Downward indicator chevron */}
        <Text
          position={[0, -0.055, 0]}
          fontSize={0.076}
          color={dividerColor}
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
        >
          ↓
        </Text>
      </group>
    </group>
  );
}
