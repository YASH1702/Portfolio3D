"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";

/**
 * StudioClock — Minimalist architectural analog wall clock.
 *
 * Mounted on the front wall above the vertical oak slats.
 * Features:
 * - Real-time synchronized hour, minute, and continuously sweeping second hand
 * - Bauhaus / Swiss minimal dial with cardinal tick marks
 * - Day/Night adaptive dial contrast
 */
export default function StudioClock({
  position = [-4.1, 3.42, -5.83],
}: {
  position?: [number, number, number];
}) {
  const { isNightMode } = useStudio();

  const hourHandRef = useRef<THREE.Group>(null!);
  const minuteHandRef = useRef<THREE.Group>(null!);
  const secondHandRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    const now = new Date();
    const ms = now.getMilliseconds();
    const sec = now.getSeconds() + ms / 1000;
    const min = now.getMinutes() + sec / 60;
    const hr = (now.getHours() % 12) + min / 60;

    // Rotation is around Z axis in Three.js plane (clockwise = negative Z)
    if (secondHandRef.current) {
      secondHandRef.current.rotation.z = -(sec / 60) * Math.PI * 2;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -(min / 60) * Math.PI * 2;
    }
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -(hr / 12) * Math.PI * 2;
    }
  });

  const RADIUS = 0.28;

  return (
    <group position={position} name="studio-wall-clock">
      {/* ── WALL MOUNT SHADOW ── */}
      <mesh position={[0, -0.005, -0.008]}>
        <circleGeometry args={[RADIUS + 0.02, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.25} />
      </mesh>

      {/* ── OUTER BEZEL RIM ── */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[RADIUS + 0.015, RADIUS + 0.015, 0.022, 36]} />
        <meshStandardMaterial color="#161412" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* ── INNER DIAL FACE ── */}
      <mesh position={[0, 0, 0.012]}>
        <circleGeometry args={[RADIUS, 36]} />
        <meshStandardMaterial
          color={isNightMode ? "#181e2b" : "#f5f0e6"}
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* ── 12 HOUR TICK MARKS ── */}
      {Array.from({ length: 12 }).map((_, i) => {
        const isCardinal = i % 3 === 0;
        const angle = (i / 12) * Math.PI * 2;
        const tickDist = RADIUS - (isCardinal ? 0.038 : 0.028);
        const tickLen = isCardinal ? 0.036 : 0.018;
        const tickW = isCardinal ? 0.007 : 0.0035;

        return (
          <group key={i} rotation={[0, 0, -angle]}>
            <mesh position={[0, tickDist, 0.014]}>
              <planeGeometry args={[tickW, tickLen]} />
              <meshBasicMaterial
                color={
                  isNightMode
                    ? isCardinal ? "#dfba74" : "#6c7a94"
                    : isCardinal ? "#1a1a18" : "#9c9484"
                }
              />
            </mesh>
          </group>
        );
      })}

      {/* ── HOUR HAND ── */}
      <group ref={hourHandRef} position={[0, 0, 0.016]}>
        {/* Hand pointer extending upwards */}
        <mesh position={[0, 0.075, 0]}>
          <planeGeometry args={[0.011, 0.15]} />
          <meshBasicMaterial color={isNightMode ? "#ffffff" : "#11110e"} />
        </mesh>
        {/* Counterbalance tail */}
        <mesh position={[0, -0.025, 0]}>
          <planeGeometry args={[0.011, 0.05]} />
          <meshBasicMaterial color={isNightMode ? "#ffffff" : "#11110e"} />
        </mesh>
      </group>

      {/* ── MINUTE HAND ── */}
      <group ref={minuteHandRef} position={[0, 0, 0.018]}>
        {/* Hand pointer extending upwards */}
        <mesh position={[0, 0.105, 0]}>
          <planeGeometry args={[0.007, 0.21]} />
          <meshBasicMaterial color={isNightMode ? "#ffffff" : "#11110e"} />
        </mesh>
        {/* Counterbalance tail */}
        <mesh position={[0, -0.035, 0]}>
          <planeGeometry args={[0.007, 0.07]} />
          <meshBasicMaterial color={isNightMode ? "#ffffff" : "#11110e"} />
        </mesh>
      </group>

      {/* ── SWEEPING SECOND HAND (BAUHAUS ORANGE) ── */}
      <group ref={secondHandRef} position={[0, 0, 0.020]}>
        {/* Slender orange sweep needle */}
        <mesh position={[0, 0.115, 0]}>
          <planeGeometry args={[0.0035, 0.23]} />
          <meshBasicMaterial color="#ff5511" />
        </mesh>
        {/* Small round counterbalance tail */}
        <mesh position={[0, -0.045, 0]}>
          <planeGeometry args={[0.004, 0.09]} />
          <meshBasicMaterial color="#ff5511" />
        </mesh>
      </group>

      {/* ── CENTER BRASS CAP ── */}
      <mesh position={[0, 0, 0.022]}>
        <circleGeometry args={[0.014, 16]} />
        <meshStandardMaterial color="#d4a855" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}
