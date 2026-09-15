"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";

/**
 * Monitor — interactive workstation display.
 *
 * Clickable in 3D: Cycles between 3 display modes:
 *  1. 'code': Syntax-highlighted code editor with blinking cursor.
 *  2. 'terminal': Fast build output and service status indicators.
 *  3. 'architecture': Interactive system architecture pipeline.
 */

const SCREEN_BG  = "#0d1117";
const SCREEN_EMI = "#1a2640";

// Syntax colors
const COLORS = [
  "#61dafb", // cyan
  "#c084fc", // purple
  "#4ade80", // green
  "#fbbf24", // amber
  "#f87171", // red
  "#94a3b8", // slate
];

interface CodeLine {
  y: number;
  width: number;
  color: string;
  indent: number;
}

const CODE_LINES: CodeLine[] = [
  { y:  0.11, width: 0.09, color: COLORS[0], indent: 0 },
  { y:  0.08, width: 0.13, color: COLORS[4], indent: 1 },
  { y:  0.05, width: 0.19, color: COLORS[1], indent: 2 },
  { y:  0.02, width: 0.11, color: COLORS[2], indent: 2 },
  { y: -0.01, width: 0.17, color: COLORS[5], indent: 1 },
  { y: -0.04, width: 0.07, color: COLORS[0], indent: 0 },
  { y: -0.07, width: 0.15, color: COLORS[3], indent: 1 },
  { y: -0.10, width: 0.10, color: COLORS[1], indent: 2 },
  { y: -0.13, width: 0.21, color: COLORS[2], indent: 2 },
];

interface MonitorProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function Monitor({
  position,
  rotation = [0, 0, 0],
}: MonitorProps) {
  const { monitorMode, cycleMonitorMode, isNightMode } = useStudio();
  const [hovered, setHovered] = useState(false);

  // Real-time IST clock — updates every second
  const [clockTime, setClockTime] = useState(() =>
    new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  useEffect(() => {
    const tick = () => {
      setClockTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cursorRef = useRef<THREE.Mesh>(null!);
  const cursorBlinkRef = useRef(0);
  const screenGlowRef = useRef<THREE.PointLight>(null!);
  const glowTimeRef = useRef(0);

  useFrame((_, delta) => {
    cursorBlinkRef.current += delta;
    glowTimeRef.current += delta * 0.4;

    if (cursorRef.current) {
      cursorRef.current.visible =
        monitorMode === "code" &&
        Math.sin(cursorBlinkRef.current * Math.PI * 2) > 0;
    }

    if (screenGlowRef.current) {
      const baseGlow = isNightMode ? 0.42 : 0.2;
      screenGlowRef.current.intensity =
        baseGlow + Math.sin(glowTimeRef.current * Math.PI * 2) * 0.03;
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
    cycleMonitorMode();
  };

  return (
    <group position={position} rotation={rotation} name="monitor">
      {/* ── MONITOR BODY ── */}
      <mesh castShadow position={[0, 0.19, 0]}>
        <boxGeometry args={[0.66, 0.41, 0.028]} />
        <meshStandardMaterial
          color={hovered ? "#222222" : "#111111"}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>

      {/* ── SCREEN PLANE (CLICKABLE) ── */}
      <mesh
        position={[0, 0.19, 0.016]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <planeGeometry args={[0.60, 0.35]} />
        <meshStandardMaterial
          color={SCREEN_BG}
          emissive={isNightMode ? "#24335c" : SCREEN_EMI}
          emissiveIntensity={isNightMode ? 0.5 : 0.3}
          roughness={0.06}
          metalness={0.08}
        />
      </mesh>

      {/* ── SCREEN BEZEL MODE BADGE (top right) ── */}
      <Text
        position={[0.22, 0.33, 0.018]}
        fontSize={0.016}
        color="#7085a8"
        anchorX="right"
        anchorY="top"
        letterSpacing={0.12}
      >
        {`[${monitorMode.toUpperCase()}]`}
      </Text>

      {/* ── REAL-TIME IST CLOCK (top left of screen) ── */}
      <Text
        position={[-0.27, 0.33, 0.018]}
        fontSize={0.016}
        color="#4a6080"
        anchorX="left"
        anchorY="top"
        letterSpacing={0.08}
      >
        {`${clockTime} IST`}
      </Text>

      {/* ── MODE 1: CODE EDITOR ── */}
      {monitorMode === "code" && (
        <group>
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
                  opacity={0.88}
                />
              </mesh>
            );
          })}
          {/* Blinking cursor */}
          <mesh ref={cursorRef} position={[-0.16, 0.07, 0.019]}>
            <planeGeometry args={[0.008, 0.011]} />
            <meshStandardMaterial
              color="#e0e8ff"
              emissive="#e0e8ff"
              emissiveIntensity={0.85}
            />
          </mesh>
        </group>
      )}

      {/* ── MODE 2: TERMINAL LOG ── */}
      {monitorMode === "terminal" && (
        <group position={[-0.26, 0.30, 0.019]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.018}
            color="#38bdf8"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.08}
          >
            ▲ Next.js 16.3 (Turbopack Engine)
          </Text>
          <Text
            position={[0, -0.032, 0]}
            fontSize={0.016}
            color="#4ade80"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.08}
          >
            ✓ Compiled in 38ms • Ready
          </Text>
          <Text
            position={[0, -0.062, 0]}
            fontSize={0.016}
            color="#a855f7"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.08}
          >
            ● Prisma PostgreSQL Connected (2ms)
          </Text>
          <Text
            position={[0, -0.092, 0]}
            fontSize={0.016}
            color="#38bdf8"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.08}
          >
            ● Redis Job Queue Initialized
          </Text>
          <Text
            position={[0, -0.122, 0]}
            fontSize={0.016}
            color="#fbbf24"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.08}
          >
            ● OpenAI GPT-4o Gateway Active
          </Text>
          <Text
            position={[0, -0.152, 0]}
            fontSize={0.015}
            color="#64748b"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.06}
          >
            Streaming server logs on port 3001...
          </Text>
        </group>
      )}

      {/* ── MODE 3: SYSTEM ARCHITECTURE ── */}
      {monitorMode === "architecture" && (
        <group position={[0, 0.19, 0.019]}>
          {/* Node 1: Client */}
          <mesh position={[-0.18, 0, 0]}>
            <planeGeometry args={[0.13, 0.07]} />
            <meshStandardMaterial color="#1e3a8a" emissive="#3b82f6" emissiveIntensity={0.4} />
          </mesh>
          <Text position={[-0.18, 0, 0.002]} fontSize={0.016} color="#ffffff" anchorX="center" anchorY="middle">
            {"NEXT.JS 15\nCLIENT UI"}
          </Text>

          {/* Wire 1 */}
          <mesh position={[-0.075, 0, 0]}>
            <planeGeometry args={[0.06, 0.004]} />
            <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.6} />
          </mesh>

          {/* Node 2: API Engine */}
          <mesh position={[0.01, 0, 0]}>
            <planeGeometry args={[0.13, 0.07]} />
            <meshStandardMaterial color="#581c87" emissive="#a855f7" emissiveIntensity={0.4} />
          </mesh>
          <Text position={[0.01, 0, 0.002]} fontSize={0.016} color="#ffffff" anchorX="center" anchorY="middle">
            {"NODE / API\nRUNTIMES"}
          </Text>

          {/* Wire 2 */}
          <mesh position={[0.095, 0, 0]}>
            <planeGeometry args={[0.04, 0.004]} />
            <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.6} />
          </mesh>

          {/* Node 3: AI & Database */}
          <mesh position={[0.18, 0, 0]}>
            <planeGeometry args={[0.13, 0.07]} />
            <meshStandardMaterial color="#064e3b" emissive="#10b981" emissiveIntensity={0.4} />
          </mesh>
          <Text position={[0.18, 0, 0.002]} fontSize={0.016} color="#ffffff" anchorX="center" anchorY="middle">
            {"AI + POSTGRES\nREDIS CACHE"}
          </Text>
        </group>
      )}

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

      {/* ── SCREEN GLOW POINT LIGHT ── */}
      <pointLight
        ref={screenGlowRef}
        position={[0, 0.19, 0.12]}
        intensity={0.2}
        color="#b8cef8"
        distance={1.6}
        decay={2}
      />
    </group>
  );
}
