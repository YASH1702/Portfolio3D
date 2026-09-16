"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

/**
 * SleepingCat — a cozy curled-up sleeping ginger cat on the living room sofa.
 *
 * Rich procedural animations & interactivity:
 * - Multi-frequency breathing cycle (chest, belly, head nuzzle)
 * - Alive swishing & twitching tail animation with natural harmonic wag
 * - Periodic ear micro-twitch (occasional reflexive twitch every few seconds)
 * - Interactive: Clicking / petting the cat triggers a cozy purr response with floating hearts!
 */
export default function SleepingCat({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const bodyRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Group>(null!);
  const tailRef = useRef<THREE.Group>(null!);
  const earRef = useRef<THREE.Group>(null!);
  const heartRef = useRef<THREE.Group>(null!);

  const [purring, setPurring] = useState(false);
  const [hovered, setHovered] = useState(false);
  const purrTimer = useRef(0);
  const breathRef = useRef(0);
  const timeRef = useRef(0);

  const FUR_MAIN = "#df8034";
  const FUR_LIGHT = "#fbf5ea";
  const EAR_INNER = "#ea9e88";
  const NOSE_COLOR = "#d87474";

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
    setPurring(true);
    purrTimer.current = 2.4; // 2.4 seconds of purring delight
  };

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    timeRef.current += dt;
    const t = timeRef.current;

    // Purring timer countdown
    if (purrTimer.current > 0) {
      purrTimer.current -= dt;
      if (purrTimer.current <= 0) {
        setPurring(false);
      }
    }

    // Breathing: faster and deeper when purring
    const breathRate = purring ? 3.6 : 1.6;
    breathRef.current += dt * breathRate;
    const breath = Math.sin(breathRef.current) * (purring ? 0.07 : 0.042);

    if (bodyRef.current) {
      // Breathing scale oscillation
      bodyRef.current.scale.y = 1 + breath;
      bodyRef.current.scale.x = 1 - breath * 0.3;
      bodyRef.current.scale.z = 1 - breath * 0.2;

      // Purr vibration
      if (purring) {
        bodyRef.current.position.y = Math.sin(t * 45) * 0.003;
      } else {
        bodyRef.current.position.y = 0;
      }
    }

    // Head gentle tilt and nuzzle
    if (headRef.current) {
      const purrNuzzle = purring ? Math.sin(t * 6) * 0.08 : 0;
      headRef.current.rotation.x = 0.12 + Math.sin(breathRef.current * 0.9) * 0.03 + purrNuzzle;
      headRef.current.rotation.z = -0.08 + Math.cos(breathRef.current * 0.7) * 0.02;
    }

    // Curled Tail swishing & twitching
    if (tailRef.current) {
      const baseSwish = Math.sin(t * 0.9) * 0.14 + Math.sin(t * 2.1) * 0.04;
      // Occasional rapid tail flick every ~6.5 seconds
      const flickCycle = Math.sin(t * 0.96);
      const isFlicking = flickCycle > 0.92;
      const flick = isFlicking ? Math.sin(t * 28) * 0.16 : 0;

      tailRef.current.rotation.z = -0.85 + baseSwish + flick + (purring ? Math.sin(t * 8) * 0.12 : 0);
    }

    // Ear micro-twitch every ~5.5 seconds
    if (earRef.current) {
      const earCycle = Math.sin(t * 1.15);
      const isTwitching = earCycle > 0.95;
      const earTwitch = isTwitching ? Math.sin(t * 35) * 0.22 : 0;
      earRef.current.rotation.z = 0.4 + earTwitch;
    }

    // Heart float animation
    if (heartRef.current && purring) {
      const progress = 1 - purrTimer.current / 2.4;
      heartRef.current.position.y = 0.32 + progress * 0.28;
      heartRef.current.position.x = 0.16 + Math.sin(progress * Math.PI * 3) * 0.04;
      heartRef.current.scale.setScalar(Math.sin(progress * Math.PI) * 1.1);
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      scale={[1.18, 1.18, 1.18]}
      name="sleeping-cat"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <group ref={bodyRef}>
        {/* ── CURLED BODY (Substantial, soft ellipsoid) ── */}
        <mesh castShadow position={[0, 0.12, 0]} scale={[1.3, 0.85, 1.05]}>
          <sphereGeometry args={[0.17, 18, 16]} />
          <meshStandardMaterial
            color={hovered ? "#ea8a3c" : FUR_MAIN}
            roughness={0.9}
            metalness={0.02}
          />
        </mesh>

        {/* ── TABBY STRIPES ON BACK ── */}
        {[-0.08, 0.0, 0.08].map((xOffset, i) => (
          <mesh key={i} position={[xOffset, 0.21, 0.02]} scale={[0.12, 0.02, 0.65]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#ba5c18" roughness={0.95} />
          </mesh>
        ))}

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
        <group ref={headRef} position={[0.16, 0.11, 0.06]} rotation={[0.12, -0.35, -0.08]}>
          <mesh castShadow scale={[1.08, 0.92, 0.98]}>
            <sphereGeometry args={[0.105, 16, 14]} />
            <meshStandardMaterial
              color={hovered ? "#ea8a3c" : FUR_MAIN}
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

          {/* Whiskers */}
          {[-0.015, 0.015].map((y, idx) => (
            <group key={idx} position={[0.09, -0.015 + y, 0.05]} rotation={[0, 0.2, y * 4]}>
              <mesh>
                <boxGeometry args={[0.06, 0.0015, 0.0015]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          ))}

          {/* Left Ear (animated twitch) */}
          <group ref={earRef} position={[0.015, 0.09, 0.06]} rotation={[-0.2, 0.3, 0.4]}>
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

        {/* ── CURLED TAIL (Wrapping around the body with organic swish) ── */}
        <group ref={tailRef} position={[-0.14, 0.06, -0.03]} rotation={[Math.PI / 2, 0.3, -0.85]}>
          <mesh castShadow>
            <torusGeometry args={[0.13, 0.03, 10, 20, Math.PI * 1.35]} />
            <meshStandardMaterial
              color={hovered ? "#ea8a3c" : FUR_MAIN}
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

      {/* ── FLOATING PURR / LOVE REACTION ── */}
      {purring && (
        <group ref={heartRef} position={[0.16, 0.34, 0.06]}>
          <Text
            fontSize={0.07}
            color="#ff5e7e"
            anchorX="center"
            anchorY="middle"
          >
            purr... ❤️
          </Text>
        </group>
      )}
    </group>
  );
}
