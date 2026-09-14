"use client";

import { Text } from "@react-three/drei";

/**
 * HeroWall — the front wall typography.
 *
 * Uses @react-three/drei Text for 3D text rendering.
 * Fonts: Geist Sans (display), Geist Mono (technical metadata).
 *
 * Visual hierarchy:
 * 1. YASHWANT KARIHA   — large, dominant
 * 2. FULL-STACK DEVELOPER — medium
 * 3. Tagline — smaller
 * 4. Tech stack metadata — monospace
 * 5. SCROLL TO EXPLORE ↓ — very small
 *
 * The text sits on the front wall at Z = -5.95 (close to front wall plane).
 */

const WALL_Z = -5.9;
const TEXT_X = 0;

// Font paths — served from /public/fonts/ (added in Phase 12 for custom loading)
// For now we rely on system fonts via drei's default font
const DISPLAY_FONT = undefined; // Will be set to '/fonts/GeistVF.woff' in Phase 12
const MONO_FONT = undefined;

export default function HeroWall() {
  return (
    <group name="hero-wall" position={[TEXT_X, 0, WALL_Z]}>
      {/* ── NAME — dominant typographic element ── */}
      <Text
        position={[0, 2.4, 0.01]}
        fontSize={0.28}
        color="#1a1a18"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
        font={DISPLAY_FONT}
        characters="YASHWANT KARIHA"
        maxWidth={8}
        textAlign="center"
        renderOrder={1}
      >
        YASHWANT KARIHA
      </Text>

      {/* ── THIN DIVIDER LINE ── */}
      <mesh position={[0, 2.14, 0.01]}>
        <planeGeometry args={[2.2, 0.006]} />
        <meshStandardMaterial color="#c4a882" roughness={0.8} metalness={0} />
      </mesh>

      {/* ── ROLE ── */}
      <Text
        position={[0, 1.96, 0.01]}
        fontSize={0.1}
        color="#3a3830"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.22}
        font={DISPLAY_FONT}
        maxWidth={8}
        textAlign="center"
        renderOrder={1}
      >
        FULL-STACK DEVELOPER
      </Text>

      {/* ── TAGLINE ── */}
      <Text
        position={[0, 1.72, 0.01]}
        fontSize={0.07}
        color="#5a5850"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        font={DISPLAY_FONT}
        maxWidth={5}
        textAlign="center"
        lineHeight={1.6}
        renderOrder={1}
      >
        {"BUILDING DIGITAL PRODUCTS,\nAI SYSTEMS & MODERN WEB EXPERIENCES."}
      </Text>

      {/* ── TECH STACK — monospace metadata ── */}
      <Text
        position={[0, 1.48, 0.01]}
        fontSize={0.05}
        color="#8b7355"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
        font={MONO_FONT}
        maxWidth={7}
        textAlign="center"
        renderOrder={1}
      >
        {"React  ·  Next.js  ·  TypeScript  ·  Node.js  ·  PostgreSQL  ·  AI"}
      </Text>

      {/* ── SCROLL INDICATOR ── */}
      <Text
        position={[0, 1.22, 0.01]}
        fontSize={0.038}
        color="#a09080"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
        font={MONO_FONT}
        maxWidth={4}
        textAlign="center"
        renderOrder={1}
      >
        SCROLL TO EXPLORE  ↓
      </Text>
    </group>
  );
}
