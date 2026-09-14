"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Monitor — the centrepiece of the desk.
 *
 * The screen displays a subtle animated code editor effect:
 * a blinking cursor line that moves very slowly down the
 * "code" columns.  Uses only plane meshes — no shaders needed.
 *
 * Separated from Desk so it can be animated independently.
 */

const SCREEN_BG  = "#0d1117";    // GitHub dark theme bg
const SCREEN_EMI = "#1a2640";    // subtle blue emissive

// Syntactic colour palette
const COLORS = [
  "#61dafb", // cyan
  "#c084fc", // purple
  "#4ade80", // green
  "#fbbf24", // amber
  "#f87171", // red/pink
  "#94a3b8", // slate
];

interface CodeLine {
  y: number;
  x: number;
  width: number;
  color: string;
  indent: number;
}

// Pre-generated "code" lines — deterministic, no runtime random()
const CODE_LINES: CodeLine[] = [
  { y:  0.11, x: 0,    width: 0.08, color: COLORS[0], indent: 0 },
  { y:  0.08, x: 0.01, width: 0.12, color: COLORS[4], indent: 1 },
  { y:  0.05, x: 0.02, width: 0.18, color: COLORS[1], indent: 2 },
  { y:  0.02, x: 0.02, width: 0.10, color: COLORS[2], indent: 2 },
  { y: -0.01, x: 0.01, width: 0.16, color: COLORS[5], indent: 1 },
  { y: -0.04, x: 0,    width: 0.06, color: COLORS[0], indent: 0 },
  { y: -0.07, x: 0.01, width: 0.14, color: COLORS[3], indent: 1 },
  { y: -0.10, x: 0.02, width: 0.09, color: COLORS[1], indent: 2 },
  { y: -0.13, x: 0.02, width: 0.20, color: COLORS[2], indent: 2 },
];

interface MonitorProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function Monitor({
  position,
  rotation = [0, 0, 0],
}: MonitorProps) {
  const cursorRef = useRef<THREE.Mesh>(null!);
  const cursorBlinkRef = useRef(0);
  const screenGlowRef = useRef<THREE.PointLight>(null!);
  const glowTimeRef = useRef(0);

  useFrame((_, delta) => {
    cursorBlinkRef.current += delta;
    glowTimeRef.current += delta * 0.3;

    // Cursor blink — 0.5s on / 0.5s off
    if (cursorRef.current) {
      cursorRef.current.visible = Math.sin(cursorBlinkRef.current * Math.PI * 2) > 0;
    }

    // Very subtle screen glow pulse
    if (screenGlowRef.current) {
      screenGlowRef.current.intensity =
        0.2 + Math.sin(glowTimeRef.current * Math.PI * 2) * 0.025;
    }
  });

  return (
    <group position={position} rotation={rotation} name="monitor">
      {/* ── MONITOR BODY ── */}
      <mesh castShadow position={[0, 0.19, 0]}>
        <boxGeometry args={[0.65, 0.4, 0.028]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* ── SCREEN ── */}
      <mesh position={[0, 0.19, 0.016]}>
        <planeGeometry args={[0.59, 0.34]} />
        <meshStandardMaterial
          color={SCREEN_BG}
          emissive={SCREEN_EMI}
          emissiveIntensity={0.3}
          roughness={0.05}
          metalness={0.08}
        />
      </mesh>

      {/* ── CODE LINES ── */}
      {CODE_LINES.map((line, i) => {
        const startX = -0.25 + line.indent * 0.028;
        return (
          <mesh
            key={i}
            position={[startX + line.width / 2, 0.19 + line.y, 0.019]}
          >
            <planeGeometry args={[line.width, 0.009]} />
            <meshStandardMaterial
              color={line.color}
              emissive={line.color}
              emissiveIntensity={0.55}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}

      {/* ── CURSOR (blinking) ── */}
      <mesh ref={cursorRef} position={[-0.16, 0.07, 0.019]}>
        <planeGeometry args={[0.008, 0.011]} />
        <meshStandardMaterial
          color="#e0e8ff"
          emissive="#e0e8ff"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* ── STAND NECK ── */}
      <mesh castShadow position={[0, -0.04, 0]}>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* ── STAND BASE ── */}
      <mesh castShadow receiveShadow position={[0, -0.08, 0.04]}>
        <boxGeometry args={[0.18, 0.018, 0.16]} />
        <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* ── SCREEN GLOW light ── */}
      <pointLight
        ref={screenGlowRef}
        position={[0, 0.19, 0.12]}
        intensity={0.2}
        color="#b8cef8"
        distance={1.5}
        decay={2}
      />
    </group>
  );
}
