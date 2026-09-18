"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Billboard } from "@react-three/drei";
import { useStudio } from "@/context/StudioContext";
import { playCatPurr, playLaserChirp } from "@/lib/soundEffects";
import { dampedLerp } from "@/lib/easings";

/**
 * SleepingCat — a cozy ginger cat on the sofa with rich procedural animations & laser AI:
 * - Curled-up sleeping state with gentle multi-harmonic breathing
 * - Real-time awakening & eye opening when Red Laser pointer is active
 * - Real-time head tracking following the laser dot in 3D space
 * - Hunting tail swish and front paw swatting when laser comes within reach!
 * - Interactive: Clicking / petting the cat triggers a cozy purr response with floating hearts!
 */
export default function SleepingCat({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { isNightMode, isLaserActive, laserTarget } = useStudio();
  const bodyRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Group>(null!);
  const tailRef = useRef<THREE.Group>(null!);
  const earRef = useRef<THREE.Group>(null!);
  const heartRef = useRef<THREE.Group>(null!);
  const badgeRef = useRef<THREE.Group>(null!);
  const pawRef = useRef<THREE.Group>(null!);

  const [purring, setPurring] = useState(false);
  const [hovered, setHovered] = useState(false);
  const purrTimer = useRef(0);
  const breathRef = useRef(0);
  const timeRef = useRef(0);
  const swatRef = useRef(0);
  const lastChirpRef = useRef(0);
  const currentHeadYaw = useRef(-0.35);

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
    playCatPurr();
    setPurring(true);
    purrTimer.current = 2.4; // 2.4 seconds of purring delight
  };

  // Distance to laser dot
  let distToLaser = 999;
  if (isLaserActive && laserTarget) {
    const dx = laserTarget[0] - position[0];
    const dy = laserTarget[1] - position[1];
    const dz = laserTarget[2] - position[2];
    distToLaser = Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

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

    // Breathing: faster when awake / tracking laser, deep when purring
    const breathRate = purring ? 3.6 : isLaserActive ? 2.8 : 1.6;
    breathRef.current += dt * breathRate;
    const breath = Math.sin(breathRef.current) * (purring ? 0.07 : 0.042);

    if (bodyRef.current) {
      bodyRef.current.scale.y = 1 + breath;
      bodyRef.current.scale.x = 1 - breath * 0.3;
      bodyRef.current.scale.z = 1 - breath * 0.2;

      if (purring) {
        bodyRef.current.position.y = Math.sin(t * 45) * 0.003;
      } else {
        bodyRef.current.position.y = 0;
      }
    }

    // Head rotation: follows laser dot if active, else cozy sleeping nuzzle
    if (headRef.current) {
      if (isLaserActive && laserTarget) {
        const dx = laserTarget[0] - position[0];
        const dz = laserTarget[2] - position[2];
        // Calculate angle in cat's local space
        const targetAngle = Math.atan2(dx, dz) - rotation[1] - 0.4;
        const clampedYaw = Math.max(-1.1, Math.min(0.9, targetAngle));
        currentHeadYaw.current = dampedLerp(currentHeadYaw.current, clampedYaw, 7.5, dt);

        headRef.current.rotation.y = currentHeadYaw.current;
        headRef.current.rotation.x = 0.04 + Math.sin(t * 3.5) * 0.02;
        headRef.current.rotation.z = -0.04;
      } else {
        currentHeadYaw.current = dampedLerp(currentHeadYaw.current, -0.35, 4, dt);
        const purrNuzzle = purring ? Math.sin(t * 6) * 0.08 : 0;
        headRef.current.rotation.y = currentHeadYaw.current;
        headRef.current.rotation.x = 0.12 + Math.sin(breathRef.current * 0.9) * 0.03 + purrNuzzle;
        headRef.current.rotation.z = -0.08 + Math.cos(breathRef.current * 0.7) * 0.02;
      }
    }

    // Tail swishing: rapid hunting twitch if laser active, else gentle swish
    if (tailRef.current) {
      if (isLaserActive) {
        const huntingWag = Math.sin(t * 6.5) * 0.26 + Math.sin(t * 14) * 0.12;
        tailRef.current.rotation.z = -0.85 + huntingWag;
      } else {
        const baseSwish = Math.sin(t * 0.9) * 0.14 + Math.sin(t * 2.1) * 0.04;
        const flickCycle = Math.sin(t * 0.96);
        const flick = flickCycle > 0.92 ? Math.sin(t * 28) * 0.16 : 0;
        tailRef.current.rotation.z = -0.85 + baseSwish + flick + (purring ? Math.sin(t * 8) * 0.12 : 0);
      }
    }

    // Ear alert / twitch
    if (earRef.current) {
      if (isLaserActive) {
        earRef.current.rotation.z = 0.25 + Math.sin(t * 8) * 0.08;
      } else {
        const earCycle = Math.sin(t * 1.15);
        const isTwitching = earCycle > 0.95;
        earRef.current.rotation.z = 0.4 + (isTwitching ? Math.sin(t * 35) * 0.22 : 0);
      }
    }

    // Laser Paw Swatting logic
    if (pawRef.current) {
      if (isLaserActive && distToLaser < 0.75) {
        swatRef.current = Math.min(1, swatRef.current + dt * 5.5);
        // Chirp when swatting starts
        if (Date.now() - lastChirpRef.current > 1800) {
          playLaserChirp();
          lastChirpRef.current = Date.now();
        }
      } else {
        swatRef.current = Math.max(0, swatRef.current - dt * 4.0);
      }

      // Swat forward and slightly upward
      const swatProgress = swatRef.current;
      pawRef.current.position.x = 0.1 + swatProgress * 0.11;
      pawRef.current.position.y = 0.02 + Math.sin(swatProgress * Math.PI) * 0.07;
      pawRef.current.position.z = 0.11 + swatProgress * 0.07;
    }

    // Heart float animation
    if (heartRef.current && purring) {
      const progress = 1 - purrTimer.current / 2.4;
      heartRef.current.position.y = 0.32 + progress * 0.28;
      heartRef.current.position.x = 0.16 + Math.sin(progress * Math.PI * 3) * 0.04;
      heartRef.current.scale.setScalar(Math.sin(progress * Math.PI) * 1.1);
    }

    // Floating dialogue subtle vertical bob
    if (badgeRef.current) {
      badgeRef.current.position.y = Math.sin(t * 3.2) * 0.006;
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

          {/* EYES: Alert open eyes when laser active, cozy closed slits when sleeping */}
          {isLaserActive ? (
            <group>
              {/* Left Alert Eye */}
              <group position={[0.08, 0.032, 0.06]}>
                <mesh>
                  <sphereGeometry args={[0.014, 12, 12]} />
                  <meshStandardMaterial
                    color="#fbbf24"
                    roughness={0.25}
                    metalness={0.1}
                    emissive="#d97706"
                    emissiveIntensity={0.25}
                  />
                </mesh>
                {/* Black vertical slit pupil */}
                <mesh position={[0.008, 0, 0]}>
                  <boxGeometry args={[0.004, 0.018, 0.005]} />
                  <meshBasicMaterial color="#0a0a0a" />
                </mesh>
              </group>

              {/* Right Alert Eye */}
              <group position={[0.08, 0.032, -0.015]}>
                <mesh>
                  <sphereGeometry args={[0.014, 12, 12]} />
                  <meshStandardMaterial
                    color="#fbbf24"
                    roughness={0.25}
                    metalness={0.1}
                    emissive="#d97706"
                    emissiveIntensity={0.25}
                  />
                </mesh>
                {/* Black vertical slit pupil */}
                <mesh position={[0.008, 0, 0]}>
                  <boxGeometry args={[0.004, 0.018, 0.005]} />
                  <meshBasicMaterial color="#0a0a0a" />
                </mesh>
              </group>
            </group>
          ) : (
            <group>
              {/* Sleeping closed eyes (two curved dark slits) */}
              <mesh position={[0.075, 0.03, 0.065]} rotation={[0, 0.35, 0.1]}>
                <boxGeometry args={[0.024, 0.004, 0.003]} />
                <meshStandardMaterial color="#3a1c08" roughness={0.9} />
              </mesh>
              <mesh position={[0.075, 0.03, -0.015]} rotation={[0, -0.25, 0.1]}>
                <boxGeometry args={[0.024, 0.004, 0.003]} />
                <meshStandardMaterial color="#3a1c08" roughness={0.9} />
              </mesh>
            </group>
          )}

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

        {/* ── TUCKED FRONT PAWS (Animated swatRef for laser pounce) ── */}
        <group ref={pawRef} position={[0.1, 0.02, 0.11]}>
          <mesh scale={[1.1, 0.65, 1.25]} castShadow>
            <sphereGeometry args={[0.038, 10, 10]} />
            <meshStandardMaterial color={FUR_LIGHT} roughness={0.95} />
          </mesh>
          {/* Soft pink toe pads */}
          <mesh position={[0.022, -0.015, 0]} scale={[0.8, 0.3, 0.8]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#ea9e88" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* ── CLEAN FLOATING DIALOGUE BADGE ── */}
      <Billboard
        position={[0.04, 0.33, 0.04]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <group ref={badgeRef}>
          {isLaserActive ? (
            /* Laser pointer hunting dialogue */
            <Text
              fontSize={distToLaser < 0.75 ? 0.045 : 0.038}
              color={distToLaser < 0.75 ? "#ff3838" : "#ff9f1a"}
              anchorX="center"
              anchorY="middle"
              fontWeight={800}
              letterSpacing={0.06}
            >
              {distToLaser < 0.75 ? "🐾 *swat!*" : "👀 *locked on!*"}
            </Text>
          ) : purring ? (
            /* Active purring love response */
            <Text
              fontSize={0.042}
              color="#ff4d6d"
              anchorX="center"
              anchorY="middle"
              fontWeight={800}
              letterSpacing={0.06}
            >
              purr... ❤️
            </Text>
          ) : (
            /* Idle floating text */
            <group scale={hovered ? [1.12, 1.12, 1] : [1, 1, 1]}>
              <Text
                fontSize={0.036}
                color={
                  hovered
                    ? isNightMode
                      ? "#ffd166"
                      : "#a85d0d"
                    : isNightMode
                    ? "#f8ecd8"
                    : "#2a2620"
                }
                anchorX="center"
                anchorY="middle"
                fontWeight={700}
                letterSpacing={0.08}
              >
                pet me 🐾
              </Text>
            </group>
          )}
        </group>
      </Billboard>
    </group>
  );
}
