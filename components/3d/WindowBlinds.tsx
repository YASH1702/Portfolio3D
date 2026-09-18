"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Billboard } from "@react-three/drei";
import { useStudio } from "@/context/StudioContext";
import { dampedLerp } from "@/lib/easings";

const SLAT_COUNT = 22;
const SLAT_WIDTH = 3.14;
const SLAT_DEPTH = 0.075;
const SLAT_THICKNESS = 0.005;

/**
 * WindowBlinds — Architectural venetian louvers mounted inside the studio window.
 *
 * Interactivity & Features:
 * - Smooth physical rotation between Open (0° horizontal) and Closed (75° downward tilt).
 * - Tactile hanging braided pull-cords with wooden bell tassels.
 * - Clickable directly in 3D space with hover feedback and floating tooltip.
 * - Procedural wooden / warm off-white material responsive to Day/Night lighting.
 */
export default function WindowBlinds() {
  const { areBlindsOpen, toggleBlinds, isNightMode } = useStudio();
  const [hovered, setHovered] = useState(false);

  const slatRefs = useRef<THREE.Mesh[]>([]);
  const currentTilt = useRef(0); // 0 = open (flat), ~1.28 = closed (tilted downward)
  const tasselRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    // Target tilt: 0 when open, 1.28 radians (~73 deg) when closed
    const targetTilt = areBlindsOpen ? 0 : 1.28;
    currentTilt.current = dampedLerp(currentTilt.current, targetTilt, 5.5, dt);

    slatRefs.current.forEach((mesh) => {
      if (mesh) {
        mesh.rotation.x = currentTilt.current;
      }
    });

    // Subtle gentle sway on hanging cord tassels
    if (tasselRef.current) {
      const sway = Math.sin(Date.now() * 0.002) * (hovered ? 0.08 : 0.015);
      tasselRef.current.rotation.z = sway;
    }
  });

  const handlePointerEnter = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerLeave = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "default";
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    toggleBlinds();
  };

  // Color palette
  const headrailColor = isNightMode ? "#2a3342" : "#ded7cb";
  const slatColor = isNightMode ? "#333d4e" : "#f5f0e8";
  const cordColor = isNightMode ? "#64748b" : "#b0a89b";
  const tasselColor = isNightMode ? "#c49a6c" : "#8b6844";

  return (
    <group name="window-blinds" position={[-0.04, 0, 0]}>
      {/* ── TOP HEADRAIL VALENCE CASING ── */}
      <mesh position={[0, 1.06, 0]}>
        <boxGeometry args={[0.085, 0.055, 3.2]} />
        <meshStandardMaterial color={headrailColor} roughness={0.4} metalness={0.15} />
      </mesh>

      {/* Bottom weighted rail */}
      <mesh position={[0, -1.04, 0]}>
        <boxGeometry args={[0.08, 0.035, 3.16]} />
        <meshStandardMaterial color={headrailColor} roughness={0.45} metalness={0.1} />
      </mesh>

      {/* ── VERTICAL INTERNAL LIFT CORDS (Left & Right) ── */}
      {[-0.95, 0.95].map((z, idx) => (
        <mesh key={idx} position={[0, 0.01, z]}>
          <cylinderGeometry args={[0.0018, 0.0018, 2.1, 6]} />
          <meshBasicMaterial color={cordColor} />
        </mesh>
      ))}

      {/* ── PROCEDURAL HORIZONTAL SLATS (LOUVERS) ── */}
      {Array.from({ length: SLAT_COUNT }, (_, i) => {
        const y = 0.96 - (i * 1.94) / (SLAT_COUNT - 1);
        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) slatRefs.current[i] = el;
            }}
            position={[0, y, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[SLAT_DEPTH, SLAT_THICKNESS, SLAT_WIDTH]} />
            <meshStandardMaterial
              color={slatColor}
              roughness={0.55}
              metalness={0.08}
            />
          </mesh>
        );
      })}

      {/* ── INTERACTIVE PULL CORDS & TASSELS (Right side) ── */}
      <group
        ref={tasselRef}
        position={[-0.03, 0.15, 1.48]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        {/* Invisible hit box for effortless clicking */}
        <mesh position={[0, -0.2, 0]} visible={false}>
          <boxGeometry args={[0.2, 0.65, 0.2]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* Dual hanging cords */}
        <mesh position={[0, 0.2, -0.01]}>
          <cylinderGeometry args={[0.002, 0.002, 0.9, 6]} />
          <meshBasicMaterial color={cordColor} />
        </mesh>
        <mesh position={[0, 0.14, 0.01]}>
          <cylinderGeometry args={[0.002, 0.002, 0.8, 6]} />
          <meshBasicMaterial color={cordColor} />
        </mesh>

        {/* Wooden Bell Tassels */}
        <mesh position={[0, -0.25, -0.01]}>
          <coneGeometry args={[0.015, 0.036, 12]} />
          <meshStandardMaterial
            color={hovered ? "#df9f52" : tasselColor}
            roughness={0.6}
          />
        </mesh>
        <mesh position={[0, -0.28, 0.01]}>
          <coneGeometry args={[0.015, 0.036, 12]} />
          <meshStandardMaterial
            color={hovered ? "#df9f52" : tasselColor}
            roughness={0.6}
          />
        </mesh>

        {/* ── FLOATING BILLBOARD TOOLTIP ── */}
        {hovered && (
          <Billboard position={[-0.15, -0.12, 0]}>
            <group scale={[0.85, 0.85, 0.85]}>
              <mesh position={[0, 0, -0.002]}>
                <planeGeometry args={[1.5, 0.26]} />
                <meshBasicMaterial
                  color={isNightMode ? "#0f172a" : "#ffffff"}
                  transparent
                  opacity={0.92}
                />
              </mesh>
              <Text
                position={[0, 0, 0]}
                fontSize={0.075}
                color={isNightMode ? "#93c5fd" : "#1e293b"}
                anchorX="center"
                anchorY="middle"
                font="/fonts/GeistMono-Bold.ttf"
              >
                {areBlindsOpen ? "🪟 Pull Cord to Close" : "🪟 Pull Cord to Open"}
              </Text>
            </group>
          </Billboard>
        )}
      </group>
    </group>
  );
}
