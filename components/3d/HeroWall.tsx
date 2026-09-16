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

  // Adaptive palette for flawless contrast across both Day & Night modes
  const nameBackingColor = isNightMode ? "#161822" : "#c8beaf";
  const nameColor        = isNightMode ? "#fcfaf4" : "#151410";
  const dividerColor     = isNightMode ? "#dfba74" : "#b09060";
  const roleColor        = isNightMode ? "#eae2d5" : "#28261e";
  const taglineColor     = isNightMode ? "#d8cebe" : "#4d4a42";
  const techColor        = isNightMode ? "#cca878" : "#826848";
  const indicatorColor   = isNightMode ? "#b8a892" : "#988a76";

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
        fontWeight={700}
      >
        YASHWANT KARIHA
      </Text>

      {/* ── BRUSHED BRASS ARCHITECTURAL DIVIDER ── */}
      <mesh position={[0, 2.26, WALL_Z]}>
        <planeGeometry args={[3.4, 0.008]} />
        <meshStandardMaterial
          color={dividerColor}
          roughness={0.4}
          metalness={0.65}
        />
      </mesh>

      {/* ── ROLE ── */}
      <Text
        position={[0, 2.02, WALL_Z]}
        fontSize={0.135}
        color={roleColor}
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
        color={taglineColor}
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
        color={techColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
        maxWidth={9}
        textAlign="center"
      >
        React  ·  Next.js  ·  TypeScript  ·  Node.js  ·  PostgreSQL  ·  AI
      </Text>

      {/* ── SCROLL TO EXPLORE INDICATOR ── */}
      <group ref={arrowRef} position={[0, 0.90, WALL_Z]}>
        <Text
          position={[0, 0.04, 0]}
          fontSize={0.076}
          color={indicatorColor}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.28}
          maxWidth={6}
          textAlign="center"
          fontWeight={600}
        >
          SCROLL TO EXPLORE
        </Text>
        {/* Downward indicator chevron */}
        <Text
          position={[0, -0.05, 0]}
          fontSize={0.072}
          color={dividerColor}
          anchorX="center"
          anchorY="middle"
        >
          ↓
        </Text>
      </group>
    </group>
  );
}
