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

  const techBadges = [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "AI / Agents",
  ];

  return (
    <group name="hero-wall">
      {/* ── ARCHITECTURAL BACKPLATE / FLOATING FROSTED GLASS PLAQUE ── */}
      {/* Soft shadow backing */}
      <mesh position={[0, 2.02, WALL_Z - 0.008]}>
        <planeGeometry args={[5.1, 2.38]} />
        <meshBasicMaterial color="#000000" transparent opacity={isNightMode ? 0.35 : 0.05} />
      </mesh>
      {/* Outer subtle metallic border rim */}
      <mesh position={[0, 2.02, WALL_Z - 0.005]}>
        <planeGeometry args={[5.04, 2.34]} />
        <meshStandardMaterial
          color={isNightMode ? "#dfba74" : "#e2d7c5"}
          roughness={0.4}
          metalness={isNightMode ? 0.8 : 0.25}
          transparent
          opacity={isNightMode ? 0.35 : 0.65}
        />
      </mesh>
      {/* Main frosted panel face */}
      <mesh position={[0, 2.02, WALL_Z - 0.003]}>
        <planeGeometry args={[5.0, 2.3]} />
        <meshStandardMaterial
          color={isNightMode ? "#101420" : "#fdfbf8"}
          roughness={0.88}
          metalness={0.02}
          transparent
          opacity={isNightMode ? 0.82 : 0.72}
        />
      </mesh>

      {/* ── LIVE AVAILABILITY STATUS BADGE (Top Center) ── */}
      <group position={[0, 2.92, WALL_Z]}>
        {/* Pill background */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.3, 0.12]} />
          <meshBasicMaterial
            color={isNightMode ? "#0d2b1f" : "#edf7ee"}
            transparent
            opacity={0.95}
          />
        </mesh>
        {/* Pill border */}
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[2.33, 0.14]} />
          <meshBasicMaterial
            color={isNightMode ? "#10b981" : "#81c784"}
            transparent
            opacity={0.5}
          />
        </mesh>
        {/* Glowing live indicator dot */}
        <mesh position={[-0.92, 0, 0.002]}>
          <circleGeometry args={[0.022, 16]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <Text
          position={[0.07, 0, 0.002]}
          fontSize={0.046}
          color={isNightMode ? "#6ee7b7" : "#1b5e20"}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.16}
          fontWeight={700}
        >
          AVAILABLE FOR NEW ROLES &amp; PROJECTS
        </Text>
      </group>

      {/* ── MAIN IDENTITY NAME ── */}
      {/* Soft depth shadow layer */}
      <Text
        position={[0.004, 2.576, WALL_Z - 0.002]}
        fontSize={0.42}
        color={nameBackingColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
        maxWidth={10}
        textAlign="center"
        fontWeight={700}
      >
        YASHWANT KARIHA
      </Text>
      {/* Dominant crisp name text */}
      <Text
        position={[0, 2.58, WALL_Z]}
        fontSize={0.42}
        color={nameColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
        maxWidth={10}
        textAlign="center"
        fontWeight={800}
      >
        YASHWANT KARIHA
      </Text>

      {/* ── ROLE PILL BADGE ── */}
      <group position={[0, 2.22, WALL_Z]}>
        {/* Subtle pill backer */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.8, 0.13]} />
          <meshBasicMaterial
            color={isNightMode ? "#182030" : "#f0e8dc"}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[2.83, 0.15]} />
          <meshBasicMaterial
            color={isNightMode ? "#dfba74" : "#c4b49e"}
            transparent
            opacity={0.45}
          />
        </mesh>
        <Text
          position={[0, 0, 0.002]}
          fontSize={0.066}
          color={roleColor}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.22}
          fontWeight={700}
        >
          FULL-STACK DEVELOPER &amp; AI ENGINEER
        </Text>
      </group>

      {/* ── EDITORIAL POSITIONING TAGLINE ── */}
      <Text
        position={[0, 1.88, WALL_Z]}
        fontSize={0.096}
        color={taglineColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
        lineHeight={1.6}
        maxWidth={7.6}
        textAlign="center"
        fontWeight={500}
      >
        {`Designing & engineering high-performance web products,\nautonomous AI agent systems, and scalable cloud architectures.`}
      </Text>

      {/* ── MODERN TECH STACK MICRO-BADGES ── */}
      <group position={[0, 1.48, WALL_Z]}>
        {techBadges.map((badge, idx) => {
          const badgeWidth = 0.64;
          const gap = 0.12;
          const totalWidth = techBadges.length * badgeWidth + (techBadges.length - 1) * gap;
          const startX = -totalWidth / 2 + badgeWidth / 2;
          const xPos = startX + idx * (badgeWidth + gap);

          return (
            <group key={badge} position={[xPos, 0, 0]}>
              {/* Badge outline */}
              <mesh position={[0, 0, -0.001]}>
                <planeGeometry args={[badgeWidth + 0.02, 0.105]} />
                <meshBasicMaterial
                  color={isNightMode ? "#dfba74" : "#cbbfae"}
                  transparent
                  opacity={0.55}
                />
              </mesh>
              {/* Badge background */}
              <mesh position={[0, 0, 0]}>
                <planeGeometry args={[badgeWidth, 0.095]} />
                <meshBasicMaterial
                  color={isNightMode ? "#161d2a" : "#ffffff"}
                  transparent
                  opacity={0.94}
                />
              </mesh>
              <Text
                position={[0, 0, 0.002]}
                fontSize={0.046}
                color={isNightMode ? "#f5eee4" : "#11110e"}
                anchorX="center"
                anchorY="middle"
                fontWeight={700}
                letterSpacing={0.08}
              >
                {badge}
              </Text>
            </group>
          );
        })}
      </group>

      {/* ── SCROLL TO EXPLORE INDICATOR ── */}
      <group ref={arrowRef} position={[0, 1.05, WALL_Z]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.6, 0.11]} />
          <meshBasicMaterial
            color={isNightMode ? "rgba(224, 184, 116, 0.15)" : "rgba(255, 255, 255, 0.6)"}
            transparent
            opacity={0.8}
          />
        </mesh>
        <Text
          position={[0, 0, 0.002]}
          fontSize={0.052}
          color={indicatorColor}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.24}
          fontWeight={700}
        >
          SCROLL TO EXPLORE STUDIO ↓
        </Text>
      </group>
    </group>
  );
}
