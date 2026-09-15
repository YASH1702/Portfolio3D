"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";
import { dampedLerp } from "@/lib/easings";

/**
 * Room — Architectural studio shell.
 *
 * Dimensions: 12 (W) × 4 (H) × 12 (D)
 * Features:
 * - Natural oak floor with soft light bounce
 * - Architectural 4-pane window with Day/Night adaptive glass emission
 * - Projected sunlight pool with window frame shadows on the floor in Day Mode
 * - Perimeter ceiling cornice and skirting baseboards
 */

const WALL      = "#ede8de";
const WALL_SIDE = "#e8e3d8";
const CEIL      = "#f0ece4";
const FLOOR     = "#b89a6a";
const BASE      = "#d8d2c6";

const W = 12, H = 4, D = 12;

export default function Room() {
  const { isNightMode } = useStudio();

  const glassMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const sunPatchRef = useRef<THREE.MeshBasicMaterial>(null!);

  const glassEmissive = useRef(0.08);
  const sunPatchOpacity = useRef(0.18);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    const targetGlass = isNightMode ? 0.02 : 0.08;
    const targetSunPatch = isNightMode ? 0.0 : 0.16;

    glassEmissive.current = dampedLerp(glassEmissive.current, targetGlass, 4, dt);
    sunPatchOpacity.current = dampedLerp(sunPatchOpacity.current, targetSunPatch, 4, dt);

    if (glassMatRef.current) {
      glassMatRef.current.emissiveIntensity = glassEmissive.current;
      glassMatRef.current.color.lerp(
        new THREE.Color(isNightMode ? "#0d1326" : "#d4e8ff"),
        0.05
      );
    }
    if (sunPatchRef.current) {
      sunPatchRef.current.opacity = sunPatchOpacity.current;
    }
  });

  return (
    <group name="room">
      {/* ── FLOOR ── */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color={FLOOR} roughness={0.75} metalness={0.02} />
      </mesh>

      {/* ── PROJECTED ARCHITECTURAL SUNLIGHT PATCH ON FLOOR (Day Mode) ── */}
      <group position={[1.4, 0.008, 0.2]} rotation={[-Math.PI / 2, 0, -0.35]}>
        {/* Soft golden sunlight pool */}
        <mesh>
          <planeGeometry args={[3.2, 2.4]} />
          <meshBasicMaterial
            ref={sunPatchRef}
            color="#fff2cc"
            transparent
            opacity={0.16}
          />
        </mesh>
        {/* Horizontal window mullion shadow line */}
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[3.2, 0.06]} />
          <meshBasicMaterial color="#7a6240" transparent opacity={0.12} />
        </mesh>
        {/* Vertical window mullion shadow line */}
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[0.06, 2.4]} />
          <meshBasicMaterial color="#7a6240" transparent opacity={0.12} />
        </mesh>
      </group>

      {/* ── CEILING ── */}
      <mesh position={[0, H, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color={CEIL} roughness={0.98} metalness={0} />
      </mesh>

      {/* ── FRONT WALL (Hero Identity) ── */}
      <mesh receiveShadow position={[0, H / 2, -D / 2]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color={WALL} roughness={0.88} metalness={0} />
      </mesh>

      {/* ── BACK WALL ── */}
      <mesh position={[0, H / 2, D / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color={WALL} roughness={0.9} metalness={0} />
      </mesh>

      {/* ── LEFT WALL (Project Gallery) ── */}
      <mesh receiveShadow position={[-W / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={0.88} metalness={0} />
      </mesh>

      {/* ── RIGHT WALL (Window Wall with clean opening) ── */}
      {/* Bottom wall panel under window */}
      <mesh receiveShadow position={[W / 2, 0.45, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, 0.9]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={0.88} metalness={0} />
      </mesh>
      {/* Top wall panel above window */}
      <mesh receiveShadow position={[W / 2, 3.55, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, 0.9]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={0.88} metalness={0} />
      </mesh>
      {/* Front wall panel (negative Z) */}
      <mesh receiveShadow position={[W / 2, 2.0, -4.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[3.0, 2.2]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={0.88} metalness={0} />
      </mesh>
      {/* Back wall panel (positive Z) */}
      <mesh receiveShadow position={[W / 2, 2.0, 3.1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[5.8, 2.2]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={0.88} metalness={0} />
      </mesh>

      {/* ── 4-PANE ARCHITECTURAL WINDOW (Hollow perimeter frame — completely open to outside view) ── */}
      <group position={[W / 2 - 0.02, 2.0, -1.4]}>
        {/* Top frame border */}
        <mesh position={[0, 1.075, 0]}>
          <boxGeometry args={[0.07, 0.05, 3.2]} />
          <meshStandardMaterial color="#d4ccbe" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Bottom windowsill border */}
        <mesh position={[0, -1.075, 0]}>
          <boxGeometry args={[0.12, 0.05, 3.26]} />
          <meshStandardMaterial color="#c8bfae" roughness={0.45} metalness={0.1} />
        </mesh>
        {/* Left vertical border (negative Z) */}
        <mesh position={[0, 0, -1.575]}>
          <boxGeometry args={[0.07, 2.2, 0.05]} />
          <meshStandardMaterial color="#d4ccbe" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Right vertical border (positive Z) */}
        <mesh position={[0, 0, 1.575]}>
          <boxGeometry args={[0.07, 2.2, 0.05]} />
          <meshStandardMaterial color="#d4ccbe" roughness={0.5} metalness={0.1} />
        </mesh>

        {/* Horizontal mullion bar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.04, 3.2]} />
          <meshStandardMaterial color="#c0b8aa" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Vertical mullion bar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.06, 2.2, 0.04]} />
          <meshStandardMaterial color="#c0b8aa" roughness={0.5} metalness={0.1} />
        </mesh>

        {/* 4 Ultra-Clear Architectural Glass Panes (Transparent to reveal vibrant outside rain landscape) */}
        {[
          { y: 0.53, z: -0.79 },
          { y: 0.53, z: 0.79 },
          { y: -0.53, z: -0.79 },
          { y: -0.53, z: 0.79 },
        ].map((pane, i) => (
          <mesh key={i} position={[-0.01, pane.y, pane.z]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[1.52, 1.02]} />
            <meshStandardMaterial
              ref={i === 0 ? glassMatRef : undefined}
              color="#eaf4fc"
              roughness={0.02}
              metalness={0.08}
              transparent
              opacity={0.05}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* ── SKIRTING BOARDS ── */}
      <mesh position={[0, 0.06, -D / 2 + 0.03]}>
        <boxGeometry args={[W, 0.12, 0.05]} />
        <meshStandardMaterial color={BASE} roughness={0.7} metalness={0} />
      </mesh>
      <mesh position={[-W / 2 + 0.03, 0.06, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[D, 0.12, 0.05]} />
        <meshStandardMaterial color={BASE} roughness={0.7} metalness={0} />
      </mesh>
      <mesh position={[0, 0.06, D / 2 - 0.03]}>
        <boxGeometry args={[W, 0.12, 0.05]} />
        <meshStandardMaterial color={BASE} roughness={0.7} metalness={0} />
      </mesh>

      {/* ── CEILING CORNICE ── */}
      <mesh position={[0, H - 0.04, -D / 2 + 0.03]}>
        <boxGeometry args={[W, 0.08, 0.06]} />
        <meshStandardMaterial color={CEIL} roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[-W / 2 + 0.03, H - 0.04, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[D, 0.08, 0.06]} />
        <meshStandardMaterial color={CEIL} roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}
