"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * SleepingCat — a cozy curled-up sleeping cat on the living room sofa.
 *
 * Designed to be distinctly visible from the camera:
 * - Rich warm ginger tabby fur (#df823a) with cream accents (#fcf6ec)
 * - Curled sleeping body with gentle breathing rise/fall animation (~3.8s)
 * - Tucked head with little pink nose and sleeping eye markings
 * - Cute triangular ears and curled tail wrapped around the body
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

  const FUR_MAIN = "#df8034";
  const FUR_LIGHT = "#fbf5ea";
  const EAR_INNER = "#ea9e88";
  const NOSE_COLOR = "#d87474";

  useFrame((_, delta) => {
    breathRef.current += delta * 1.65; // ~3.8s breath cycle
    if (bodyRef.current) {
      const breath = Math.sin(breathRef.current) * 0.045;
      bodyRef.current.scale.y = 1 + breath;
      bodyRef.current.scale.x = 1 - breath * 0.35;
      bodyRef.current.scale.z = 1 - breath * 0.2;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={[1.15, 1.15, 1.15]} name="sleeping-cat">
      <group ref={bodyRef}>
        {/* ── CURLED BODY (Substantial, soft ellipsoid) ── */}
        <mesh castShadow position={[0, 0.12, 0]} scale={[1.3, 0.85, 1.05]}>
          <sphereGeometry args={[0.17, 18, 16]} />
          <meshStandardMaterial
            color={FUR_MAIN}
            roughness={0.9}
            metalness={0.02}
          />
        </mesh>

        {/* ── CREAM BELLY / CHEST PATCH ── */}
        <mesh position={[0.06, 0.08, 0.08]} scale={[0.85, 0.55, 0.65]}>
          <sphereGeometry args={[0.15, 14, 12]} />
          <meshStandardMaterial
            color={FUR_LIGHT}
            roughness={0.96}
            metalness={0}
          />
        </mesh>

        {/* ── HEAD (Nestled against the curled body) ── */}
        <group position={[0.16, 0.11, 0.06]} rotation={[0.12, -0.35, -0.08]}>
          <mesh castShadow scale={[1.08, 0.92, 0.98]}>
            <sphereGeometry args={[0.105, 16, 14]} />
            <meshStandardMaterial
              color={FUR_MAIN}
              roughness={0.9}
              metalness={0.02}
            />
          </mesh>

          {/* White muzzle / snout */}
          <mesh position={[0.06, -0.02, 0.03]} scale={[0.75, 0.55, 0.65]}>
            <sphereGeometry args={[0.06, 12, 10]} />
            <meshStandardMaterial color={FUR_LIGHT} roughness={0.95} />
          </mesh>

          {/* Cute pink nose */}
          <mesh position={[0.105, -0.008, 0.03]}>
            <boxGeometry args={[0.012, 0.008, 0.012]} />
            <meshStandardMaterial color={NOSE_COLOR} roughness={0.8} />
          </mesh>

          {/* Sleeping closed eyes (two curved dark slits) */}
          <mesh position={[0.075, 0.03, 0.065]} rotation={[0, 0.35, 0.1]}>
            <boxGeometry args={[0.024, 0.004, 0.003]} />
            <meshStandardMaterial color="#3a1c08" roughness={0.9} />
          </mesh>
          <mesh position={[0.075, 0.03, -0.015]} rotation={[0, -0.25, 0.1]}>
            <boxGeometry args={[0.024, 0.004, 0.003]} />
            <meshStandardMaterial color="#3a1c08" roughness={0.9} />
          </mesh>

          {/* Left Ear */}
          <group position={[0.015, 0.09, 0.06]} rotation={[-0.2, 0.3, 0.4]}>
            <mesh castShadow>
              <coneGeometry args={[0.036, 0.06, 4]} />
              <meshStandardMaterial color={FUR_MAIN} roughness={0.9} />
            </mesh>
            <mesh position={[0, 0, 0.004]} scale={[0.65, 0.65, 0.65]}>
              <coneGeometry args={[0.03, 0.05, 4]} />
              <meshStandardMaterial color={EAR_INNER} roughness={0.95} />
            </mesh>
          </group>

          {/* Right Ear */}
          <group position={[-0.03, 0.09, -0.045]} rotation={[-0.2, -0.35, -0.3]}>
            <mesh castShadow>
              <coneGeometry args={[0.036, 0.06, 4]} />
              <meshStandardMaterial color={FUR_MAIN} roughness={0.9} />
            </mesh>
            <mesh position={[0, 0, 0.004]} scale={[0.65, 0.65, 0.65]}>
              <coneGeometry args={[0.03, 0.05, 4]} />
              <meshStandardMaterial color={EAR_INNER} roughness={0.95} />
            </mesh>
          </group>
        </group>

        {/* ── CURLED TAIL (Wrapping around the body) ── */}
        <group position={[-0.14, 0.06, -0.03]} rotation={[Math.PI / 2, 0.3, -0.85]}>
          <mesh castShadow>
            <torusGeometry args={[0.13, 0.03, 10, 20, Math.PI * 1.35]} />
            <meshStandardMaterial
              color={FUR_MAIN}
              roughness={0.9}
              metalness={0.02}
            />
          </mesh>
          {/* White tail tip */}
          <mesh position={[0.11, -0.07, 0]}>
            <sphereGeometry args={[0.032, 10, 10]} />
            <meshStandardMaterial color={FUR_LIGHT} roughness={0.95} />
          </mesh>
        </group>

        {/* ── TUCKED FRONT PAWS ── */}
        <mesh position={[0.1, 0.02, 0.11]} scale={[1.1, 0.65, 1.25]}>
          <sphereGeometry args={[0.038, 10, 10]} />
          <meshStandardMaterial color={FUR_LIGHT} roughness={0.95} />
        </mesh>
      </group>
    </group>
  );
}
