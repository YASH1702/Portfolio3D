"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * SleepingCat — a cozy, peaceful curled-up sleeping cat on the couch.
 *
 * Geometry:
 * - Curled sleeping body (ellipsoid)
 * - Tucked head nestled into the curve
 * - Two small pointy ears with inner ear detail
 * - Tail curled around the body
 * - Closed sleeping eyes (subtle dark markings)
 *
 * Animation:
 * - Gentle, rhythmic breathing (scale oscillation ~4s cycle)
 */
export default function SleepingCat({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const bodyRef = useRef<THREE.Group>(null!);
  const breathRef = useRef(0);

  // Soft ginger tabby / warm marmalade fur colors
  const FUR_MAIN = "#d47a32";
  const FUR_LIGHT = "#f3e6d3";
  const EAR_INNER = "#e8a088";
  const NOSE_COLOR = "#d47878";

  useFrame((_, delta) => {
    breathRef.current += delta * 1.5; // ~4.2s per breath cycle
    if (bodyRef.current) {
      // Gentle breathing rise and fall
      const breath = Math.sin(breathRef.current) * 0.035;
      bodyRef.current.scale.y = 1 + breath;
      bodyRef.current.scale.x = 1 - breath * 0.4;
    }
  });

  return (
    <group position={position} rotation={rotation} name="sleeping-cat">
      <group ref={bodyRef}>
        {/* ── CURLED BODY ── */}
        <mesh castShadow position={[0, 0.08, 0]} scale={[1.25, 0.8, 1.0]}>
          <sphereGeometry args={[0.13, 16, 14]} />
          <meshStandardMaterial
            color={FUR_MAIN}
            roughness={0.92}
            metalness={0.02}
          />
        </mesh>

        {/* ── WHITE/CREAM BELLY PATCH ── */}
        <mesh position={[0.04, 0.05, 0.06]} scale={[0.8, 0.5, 0.6]}>
          <sphereGeometry args={[0.11, 12, 10]} />
          <meshStandardMaterial
            color={FUR_LIGHT}
            roughness={0.96}
            metalness={0}
          />
        </mesh>

        {/* ── HEAD (tucked into curled body) ── */}
        <group position={[0.12, 0.07, 0.04]} rotation={[0.1, -0.3, -0.1]}>
          <mesh castShadow scale={[1.05, 0.9, 0.95]}>
            <sphereGeometry args={[0.075, 14, 12]} />
            <meshStandardMaterial
              color={FUR_MAIN}
              roughness={0.92}
              metalness={0.02}
            />
          </mesh>

          {/* White muzzle / snout */}
          <mesh position={[0.04, -0.015, 0.02]} scale={[0.7, 0.5, 0.6]}>
            <sphereGeometry args={[0.045, 10, 8]} />
            <meshStandardMaterial color={FUR_LIGHT} roughness={0.95} />
          </mesh>

          {/* Tiny pink nose */}
          <mesh position={[0.072, -0.005, 0.02]}>
            <boxGeometry args={[0.009, 0.006, 0.009]} />
            <meshStandardMaterial color={NOSE_COLOR} roughness={0.8} />
          </mesh>

          {/* Sleeping closed eye slits (curved markings) */}
          <mesh position={[0.05, 0.02, 0.045]} rotation={[0, 0.4, 0.1]}>
            <boxGeometry args={[0.018, 0.003, 0.002]} />
            <meshStandardMaterial color="#4a2810" roughness={0.9} />
          </mesh>
          <mesh position={[0.05, 0.02, -0.01]} rotation={[0, -0.2, 0.1]}>
            <boxGeometry args={[0.018, 0.003, 0.002]} />
            <meshStandardMaterial color="#4a2810" roughness={0.9} />
          </mesh>

          {/* Left Ear */}
          <group position={[0.01, 0.065, 0.045]} rotation={[-0.2, 0.3, 0.4]}>
            <mesh castShadow>
              <coneGeometry args={[0.026, 0.045, 4]} />
              <meshStandardMaterial color={FUR_MAIN} roughness={0.92} />
            </mesh>
            {/* Inner ear pink */}
            <mesh position={[0, 0, 0.003]} scale={[0.65, 0.65, 0.65]}>
              <coneGeometry args={[0.022, 0.038, 4]} />
              <meshStandardMaterial color={EAR_INNER} roughness={0.95} />
            </mesh>
          </group>

          {/* Right Ear */}
          <group position={[-0.02, 0.065, -0.035]} rotation={[-0.2, -0.4, -0.3]}>
            <mesh castShadow>
              <coneGeometry args={[0.026, 0.045, 4]} />
              <meshStandardMaterial color={FUR_MAIN} roughness={0.92} />
            </mesh>
            <mesh position={[0, 0, 0.003]} scale={[0.65, 0.65, 0.65]}>
              <coneGeometry args={[0.022, 0.038, 4]} />
              <meshStandardMaterial color={EAR_INNER} roughness={0.95} />
            </mesh>
          </group>
        </group>

        {/* ── CURLED TAIL (wrapping around the paws) ── */}
        <group position={[-0.1, 0.04, -0.02]} rotation={[Math.PI / 2, 0.3, -0.8]}>
          <mesh castShadow>
            <torusGeometry args={[0.095, 0.022, 8, 16, Math.PI * 1.3]} />
            <meshStandardMaterial
              color={FUR_MAIN}
              roughness={0.92}
              metalness={0.02}
            />
          </mesh>
          {/* White tail tip */}
          <mesh position={[0.08, -0.05, 0]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshStandardMaterial color={FUR_LIGHT} roughness={0.95} />
          </mesh>
        </group>

        {/* ── FRONT PAWS TUCKED ── */}
        <mesh position={[0.07, 0.015, 0.08]} scale={[1, 0.6, 1.2]}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial color={FUR_LIGHT} roughness={0.95} />
        </mesh>
      </group>
    </group>
  );
}
