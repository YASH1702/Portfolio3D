"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";
import { playTerminalTick } from "@/lib/soundEffects";

/**
 * Monitor — interactive workstation display.
 *
 * Clickable in 3D: Cycles between 3 display modes:
 *  1. 'code': Live syntax code editor with active typing animation & blinking cursor.
 *  2. 'terminal': Dynamic server build stream, pulsing health indicators & uptime counter.
 *  3. 'architecture': Interactive pipeline with animated flowing data packets between nodes.
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
      second: "2-digit",
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
          second: "2-digit",
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

  // Animated code typing line & cursor position
  const typingLineRef = useRef<THREE.Mesh>(null!);
  // Data packet 1 (Client -> API)
  const packet1Ref = useRef<THREE.Mesh>(null!);
  // Data packet 2 (API -> DB)
  const packet2Ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    cursorBlinkRef.current += dt;
    glowTimeRef.current += dt * 0.4;
    const t = glowTimeRef.current;

    // Blinking cursor and active code typing simulation
    if (cursorRef.current) {
      cursorRef.current.visible =
        monitorMode === "code" &&
        Math.sin(cursorBlinkRef.current * Math.PI * 2.5) > 0;

      // Cursor follows typing progression
      const typingProgress = (Math.sin(t * 3.0) + 1) * 0.5;
      cursorRef.current.position.x = -0.19 + typingProgress * 0.12;
    }

    if (typingLineRef.current) {
      const typingProgress = (Math.sin(t * 3.0) + 1) * 0.5;
      typingLineRef.current.scale.x = Math.max(0.1, typingProgress);
    }

    // Architecture mode: flowing data packets
    if (packet1Ref.current) {
      const p1 = (t * 2.2) % 1;
      packet1Ref.current.position.x = -0.115 + p1 * 0.08;
    }
    if (packet2Ref.current) {
      const p2 = (t * 2.2 + 0.45) % 1;
      packet2Ref.current.position.x = 0.075 + p2 * 0.065;
    }

    if (screenGlowRef.current) {
      const baseGlow = isNightMode ? 0.48 : 0.22;
      screenGlowRef.current.intensity =
        baseGlow + Math.sin(t * Math.PI * 2) * 0.04;
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
    playTerminalTick();
    cycleMonitorMode();
  };

  return (
    <group position={position} rotation={rotation} name="monitor">
      {/* ── MONITOR BEZEL & BODY ── */}
      <mesh castShadow position={[0, 0.19, 0]}>
        <boxGeometry args={[0.66, 0.41, 0.028]} />
        <meshStandardMaterial
          color={hovered ? "#282622" : "#111111"}
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
        position={[0.27, 0.34, 0.018]}
        fontSize={0.014}
        color={hovered ? "#38bdf8" : "#7085a8"}
        anchorX="right"
        anchorY="top"
        letterSpacing={0.14}
      >
        {`[${monitorMode.toUpperCase()} ⟳]`}
      </Text>

      {/* ── REAL-TIME IST CLOCK (top left of screen) ── */}
      <Text
        position={[-0.27, 0.34, 0.018]}
        fontSize={0.014}
        color="#6080a8"
        anchorX="left"
        anchorY="top"
        letterSpacing={0.08}
      >
        {`${clockTime} IST`}
      </Text>

      {/* ── MODE 1: CODE EDITOR (DYNAMIC STREAMING & TYPING) ── */}
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

          {/* Active dynamically typed line */}
          <mesh
            ref={typingLineRef}
            position={[-0.20, 0.19 - 0.16, 0.019]}
          >
            <planeGeometry args={[0.10, 0.009]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* Blinking typing cursor */}
          <mesh ref={cursorRef} position={[-0.14, 0.19 - 0.16, 0.020]}>
            <planeGeometry args={[0.006, 0.011]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.9}
            />
          </mesh>
        </group>
      )}

      {/* ── MODE 2: TERMINAL LOG (LIVE COMPILATION & METRICS) ── */}
      {monitorMode === "terminal" && (
        <group position={[-0.26, 0.31, 0.019]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.017}
            color="#38bdf8"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.08}
          >
            ▲ Next.js 16.3 (Turbopack Engine)
          </Text>
          <Text
            position={[0, -0.030, 0]}
            fontSize={0.015}
            color="#4ade80"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.08}
          >
            ✓ Ready in 18ms · 0 errors · 9 routes compiled
          </Text>
          <Text
            position={[0, -0.058, 0]}
            fontSize={0.015}
            color="#c084fc"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.08}
          >
            ● Prisma PostgreSQL Connected (latency: 1.8ms)
          </Text>
          <Text
            position={[0, -0.086, 0]}
            fontSize={0.015}
            color="#38bdf8"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.08}
          >
            ● Redis Cache Engine Initialized [ONLINE]
          </Text>
          <Text
            position={[0, -0.114, 0]}
            fontSize={0.015}
            color="#fbbf24"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.08}
          >
            ● AI Agent Pipeline Active (OpenAI + Claude API)
          </Text>
          <Text
            position={[0, -0.142, 0]}
            fontSize={0.014}
            color="#64748b"
            anchorX="left"
            anchorY="top"
            letterSpacing={0.06}
          >
            $ live-stream: localhost:3000 (WebSocket synced)
          </Text>
        </group>
      )}

      {/* ── MODE 3: SYSTEM ARCHITECTURE (WITH FLOWING DATA PACKETS) ── */}
      {monitorMode === "architecture" && (
        <group position={[0, 0.19, 0.019]}>
          {/* Node 1: Client UI */}
          <mesh position={[-0.18, 0, 0]}>
            <planeGeometry args={[0.13, 0.075]} />
            <meshStandardMaterial color="#1e3a8a" emissive="#3b82f6" emissiveIntensity={0.45} />
          </mesh>
          <Text position={[-0.18, 0, 0.002]} fontSize={0.015} color="#ffffff" anchorX="center" anchorY="middle">
            {"NEXT.JS\nREACT 19"}
          </Text>

          {/* Wire 1: Client -> API */}
          <mesh position={[-0.075, 0, 0]}>
            <planeGeometry args={[0.07, 0.003]} />
            <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.6} />
          </mesh>
          {/* Flowing Data Packet 1 */}
          <mesh ref={packet1Ref} position={[-0.075, 0, 0.002]}>
            <planeGeometry args={[0.014, 0.006]} />
            <meshStandardMaterial color="#ffffff" emissive="#93c5fd" emissiveIntensity={1.0} />
          </mesh>

          {/* Node 2: Node / Next.js API Runtime */}
          <mesh position={[0.01, 0, 0]}>
            <planeGeometry args={[0.13, 0.075]} />
            <meshStandardMaterial color="#581c87" emissive="#a855f7" emissiveIntensity={0.45} />
          </mesh>
          <Text position={[0.01, 0, 0.002]} fontSize={0.015} color="#ffffff" anchorX="center" anchorY="middle">
            {"NODE / REST\nAI GATEWAY"}
          </Text>

          {/* Wire 2: API -> Database */}
          <mesh position={[0.095, 0, 0]}>
            <planeGeometry args={[0.045, 0.003]} />
            <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.6} />
          </mesh>
          {/* Flowing Data Packet 2 */}
          <mesh ref={packet2Ref} position={[0.095, 0, 0.002]}>
            <planeGeometry args={[0.014, 0.006]} />
            <meshStandardMaterial color="#ffffff" emissive="#c084fc" emissiveIntensity={1.0} />
          </mesh>

          {/* Node 3: PostgreSQL & Vector AI Store */}
          <mesh position={[0.18, 0, 0]}>
            <planeGeometry args={[0.13, 0.075]} />
            <meshStandardMaterial color="#064e3b" emissive="#10b981" emissiveIntensity={0.45} />
          </mesh>
          <Text position={[0.18, 0, 0.002]} fontSize={0.015} color="#ffffff" anchorX="center" anchorY="middle">
            {"POSTGRESQL\nVECTOR DB"}
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
        intensity={0.25}
        color="#b8cef8"
        distance={1.6}
        decay={2}
      />
    </group>
  );
}
