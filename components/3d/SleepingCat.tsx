"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Billboard } from "@react-three/drei";
import { useStudio } from "@/context/StudioContext";
import { playCatPurr, playLaserChirp } from "@/lib/soundEffects";
import { dampedLerp } from "@/lib/easings";

/**
 * SleepingCat — Highly detailed ginger tabby cat with procedural AI & locomotion:
 * - Visually sculpted: cheek ruffs, whisker pads, pink nose, almond eyes with amber irises,
 *   tabby stripes, chest bib, leather collar with dangling brass bell, and articulated paws with pink pads.
 * - Dynamic Couch Locomotion: Walks & stalks across the sofa cushions following the red laser dot.
 * - Pre-pounce feline hip wiggle, stalking walk cycle, and swatting paw physics.
 * - Gentle sleeping state with organic harmonic breathing when laser is inactive.
 * - Click / pet interaction: cozy purring vibration with floating heart response.
 */

// Couch world transform (matches Couch.tsx: position [-1.4, 0, 1.4], rotation [0, -0.15, 0])
const COUCH_WORLD_X = -1.4;
const COUCH_WORLD_Z = 1.4;
const COUCH_ROT_Y = -0.15;

export default function SleepingCat({
  position = [-0.34, 0.54, 0.05],
  rotation = [0, 0.45, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { isNightMode, isLaserActive, laserTarget } = useStudio();

  // Root group holds current couch-local position and yaw rotation
  const rootGroupRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Group>(null!);
  const spineRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Group>(null!);
  const tailRef = useRef<THREE.Group>(null!);
  const earLRef = useRef<THREE.Group>(null!);
  const earRRef = useRef<THREE.Group>(null!);
  const bellRef = useRef<THREE.Mesh>(null!);
  const pawFLRef = useRef<THREE.Group>(null!);
  const pawFRRef = useRef<THREE.Group>(null!);
  const legBLRef = useRef<THREE.Group>(null!);
  const legBRRef = useRef<THREE.Group>(null!);
  const heartRef = useRef<THREE.Group>(null!);
  const badgeRef = useRef<THREE.Group>(null!);

  const [purring, setPurring] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Locomotion & animation states
  const currentPos = useRef(new THREE.Vector3(position[0], position[1], position[2]));
  const currentYaw = useRef(rotation[1]);
  const walkPhase = useRef(0);
  const isWalkingRef = useRef(false);
  const swatRef = useRef(0);
  const lastChirpRef = useRef(0);
  const purrTimer = useRef(0);
  const breathRef = useRef(0);
  const timeRef = useRef(0);

  // Feline color palette
  const FUR_MAIN = "#e57c2a";       // Warm ginger orange
  const FUR_DARK = "#a64908";       // Rich terracotta tabby stripe
  const FUR_CREAM = "#fdfbf7";      // Soft white/cream bib and cheek ruffs
  const EAR_INNER = "#ea9e88";      // Soft salmon inner ear
  const NOSE_PINK = "#e88b8b";      // Realistic cat nose leather
  const TOE_BEANS = "#f472b6";      // Pink paw pads
  const COLLAR_RED = "#991b1b";     // Crimson collar
  const BELL_GOLD = "#facc15";      // Polished brass bell

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
    purrTimer.current = 2.4;
  };

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    timeRef.current += dt;
    const t = timeRef.current;

    // Purr timer countdown
    if (purrTimer.current > 0) {
      purrTimer.current -= dt;
      if (purrTimer.current <= 0) setPurring(false);
    }

    // ── 1. LOCOMOTION & SOFA NAVIGATION ──
    let targetX = position[0];
    let targetZ = position[2];
    let targetYaw = rotation[1];
    let distToLaserWorld = 999;

    if (isLaserActive && laserTarget) {
      // World distance to laser
      const curWorldX = COUCH_WORLD_X + currentPos.current.x * Math.cos(COUCH_ROT_Y) - currentPos.current.z * Math.sin(COUCH_ROT_Y);
      const curWorldZ = COUCH_WORLD_Z + currentPos.current.x * Math.sin(COUCH_ROT_Y) + currentPos.current.z * Math.cos(COUCH_ROT_Y);
      const dwx = laserTarget[0] - curWorldX;
      const dwy = laserTarget[1] - 0.54;
      const dwz = laserTarget[2] - curWorldZ;
      distToLaserWorld = Math.sqrt(dwx * dwx + dwy * dwy + dwz * dwz);

      // Convert world laser coordinates to couch local space
      const dxWorld = laserTarget[0] - COUCH_WORLD_X;
      const dzWorld = laserTarget[2] - COUCH_WORLD_Z;
      const cosR = Math.cos(-COUCH_ROT_Y);
      const sinR = Math.sin(-COUCH_ROT_Y);
      const couchLaserX = dxWorld * cosR - dzWorld * sinR;
      const couchLaserZ = dxWorld * sinR + dzWorld * cosR;

      // Safe sofa cushion bounds: X [-0.64, 0.36], Z [-0.10, 0.22]
      targetX = Math.max(-0.64, Math.min(0.36, couchLaserX * 0.28 - 0.12));
      targetZ = Math.max(-0.10, Math.min(0.22, couchLaserZ * 0.16 + 0.04));

      // Cat faces towards target walking direction or towards laser
      const moveDx = targetX - currentPos.current.x;
      const moveDz = targetZ - currentPos.current.z;
      const moveDist = Math.sqrt(moveDx * moveDx + moveDz * moveDz);

      if (moveDist > 0.04) {
        // Face travel direction while walking
        targetYaw = Math.atan2(moveDx, moveDz);
      } else {
        // Face the laser dot when standing
        targetYaw = Math.atan2(couchLaserX - currentPos.current.x, couchLaserZ - currentPos.current.z);
      }
    }

    // Smoothly step position and yaw
    const prevX = currentPos.current.x;
    const prevZ = currentPos.current.z;
    const walkLerpSpeed = isLaserActive ? 4.5 : 2.5;

    currentPos.current.x = dampedLerp(currentPos.current.x, targetX, walkLerpSpeed, dt);
    currentPos.current.z = dampedLerp(currentPos.current.z, targetZ, walkLerpSpeed, dt);
    currentYaw.current = dampedLerp(currentYaw.current, targetYaw, 6.0, dt);

    const stepDist = Math.hypot(currentPos.current.x - prevX, currentPos.current.z - prevZ);
    const isWalking = stepDist > 0.0008;
    isWalkingRef.current = isWalking;

    if (isWalking) {
      walkPhase.current += dt * 14.0;
    }

    if (rootGroupRef.current) {
      rootGroupRef.current.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z);
      rootGroupRef.current.rotation.y = currentYaw.current;
    }

    // ── 2. BREATHING & POSTURE ──
    const breathRate = purring ? 3.6 : isLaserActive ? 2.6 : 1.6;
    breathRef.current += dt * breathRate;
    const breath = Math.sin(breathRef.current) * (purring ? 0.07 : 0.04);

    if (bodyRef.current) {
      // Body height: slightly higher when walking, crouching low when pouncing
      const crouchDrop = (isLaserActive && distToLaserWorld < 0.85) ? -0.025 : 0;
      bodyRef.current.position.y = 0.12 + (isWalking ? Math.abs(Math.sin(walkPhase.current)) * 0.012 : 0) + crouchDrop;

      // Pre-pounce playful butt wiggle
      if (isLaserActive && distToLaserWorld < 0.85 && !isWalking) {
        const buttWiggle = Math.sin(t * 22) * 0.025;
        bodyRef.current.rotation.z = buttWiggle;
      } else {
        bodyRef.current.rotation.z = 0;
      }

      bodyRef.current.scale.y = 1 + breath;
      bodyRef.current.scale.x = 1 - breath * 0.25;

      if (purring) {
        bodyRef.current.position.y += Math.sin(t * 45) * 0.003;
      }
    }

    // ── 3. FOUR-LEGGED WALKING & SWAT PHYSICS ──
    if (isWalking) {
      // Alternating 4-leg walk cycle
      const phase = walkPhase.current;
      if (pawFLRef.current) pawFLRef.current.rotation.x = Math.sin(phase) * 0.35;
      if (pawFRRef.current) pawFRRef.current.rotation.x = Math.sin(phase + Math.PI) * 0.35;
      if (legBLRef.current) legBLRef.current.rotation.x = Math.sin(phase + Math.PI * 0.5) * 0.28;
      if (legBRRef.current) legBRRef.current.rotation.x = Math.sin(phase + Math.PI * 1.5) * 0.28;
    } else {
      // Reset leg rotation
      if (pawFLRef.current) pawFLRef.current.rotation.x = dampedLerp(pawFLRef.current.rotation.x, 0, 8, dt);
      if (pawFRRef.current) pawFRRef.current.rotation.x = dampedLerp(pawFRRef.current.rotation.x, 0, 8, dt);
      if (legBLRef.current) legBLRef.current.rotation.x = dampedLerp(legBLRef.current.rotation.x, 0, 8, dt);
      if (legBRRef.current) legBRRef.current.rotation.x = dampedLerp(legBRRef.current.rotation.x, 0, 8, dt);

      // Swatting physics when close to laser
      if (isLaserActive && distToLaserWorld < 0.85) {
        swatRef.current = Math.min(1, swatRef.current + dt * 6.5);
        if (Date.now() - lastChirpRef.current > 1700) {
          playLaserChirp();
          lastChirpRef.current = Date.now();
        }
      } else {
        swatRef.current = Math.max(0, swatRef.current - dt * 4.5);
      }

      if (pawFRRef.current) {
        const swat = swatRef.current;
        pawFRRef.current.position.z = 0.12 + swat * 0.14;
        pawFRRef.current.position.y = 0.02 + Math.sin(swat * Math.PI) * 0.08;
      }
    }

    // ── 4. HEAD TRACKING & EAR TWITCHES ──
    if (headRef.current) {
      if (isLaserActive && laserTarget) {
        // Smooth head micro-bobbing while tracking
        headRef.current.rotation.x = 0.05 + Math.sin(t * 3.5) * 0.02;
        headRef.current.rotation.z = Math.sin(t * 2.0) * 0.03;
      } else {
        const purrNuzzle = purring ? Math.sin(t * 6) * 0.08 : 0;
        headRef.current.rotation.x = 0.12 + Math.sin(breathRef.current * 0.9) * 0.03 + purrNuzzle;
        headRef.current.rotation.z = -0.08 + Math.cos(breathRef.current * 0.7) * 0.02;
      }
    }

    // Ear twitches
    if (earLRef.current) {
      const twitch = isLaserActive ? Math.sin(t * 9) * 0.06 : Math.sin(t * 1.15) > 0.95 ? Math.sin(t * 35) * 0.18 : 0;
      earLRef.current.rotation.z = 0.35 + twitch;
    }
    if (earRRef.current) {
      const twitch = isLaserActive ? Math.sin(t * 7) * 0.05 : Math.sin(t * 1.4) > 0.96 ? Math.sin(t * 32) * 0.16 : 0;
      earRRef.current.rotation.z = -0.35 - twitch;
    }

    // Dangling collar bell swing
    if (bellRef.current) {
      const bellSway = isWalking ? Math.sin(walkPhase.current) * 0.25 : Math.sin(t * 2.5) * 0.05;
      bellRef.current.rotation.z = bellSway;
    }

    // Tail: alert high question-mark arch when active, comfortable curl when sleeping
    if (tailRef.current) {
      if (isLaserActive) {
        const excitedWag = Math.sin(t * 7.5) * 0.28 + Math.sin(t * 16) * 0.12;
        tailRef.current.rotation.x = Math.PI * 0.45;
        tailRef.current.rotation.z = -0.4 + excitedWag;
      } else {
        const baseSwish = Math.sin(t * 0.9) * 0.12;
        tailRef.current.rotation.x = Math.PI * 0.5;
        tailRef.current.rotation.z = -0.85 + baseSwish + (purring ? Math.sin(t * 8) * 0.12 : 0);
      }
    }

    // Floating heart when purring
    if (heartRef.current && purring) {
      const progress = 1 - purrTimer.current / 2.4;
      heartRef.current.position.y = 0.34 + progress * 0.28;
      heartRef.current.position.x = 0.14 + Math.sin(progress * Math.PI * 3) * 0.04;
      heartRef.current.scale.setScalar(Math.sin(progress * Math.PI) * 1.1);
    }

    // Dialogue gentle hover bob
    if (badgeRef.current) {
      badgeRef.current.position.y = Math.sin(t * 3.2) * 0.006;
    }
  });

  return (
    <group
      ref={rootGroupRef}
      name="cat-entity"
      position={position}
      rotation={rotation}
      scale={[1.18, 1.18, 1.18]}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <group ref={bodyRef}>
        {/* ── SCULPTED FELINE TORSO (Arched ribcage & tapered waist) ── */}
        <mesh castShadow position={[0, 0.02, 0]} scale={[1.22, 0.88, 1.05]}>
          <sphereGeometry args={[0.16, 20, 18]} />
          <meshStandardMaterial
            color={hovered ? "#ea8a3c" : FUR_MAIN}
            roughness={0.85}
            metalness={0.02}
          />
        </mesh>

        {/* ── WHITE CHEST RUFF / BIB (Extending down neck & belly) ── */}
        <mesh position={[0.08, 0.01, 0.06]} scale={[0.78, 0.58, 0.68]}>
          <sphereGeometry args={[0.14, 16, 14]} />
          <meshStandardMaterial color={FUR_CREAM} roughness={0.92} metalness={0} />
        </mesh>

        {/* ── GINGER MACKEREL TABBY BACK STRIPES ── */}
        {[-0.09, -0.01, 0.07].map((xOff, idx) => (
          <mesh key={idx} position={[xOff, 0.12, 0]} scale={[0.11, 0.025, 0.72]}>
            <sphereGeometry args={[0.11, 10, 10]} />
            <meshStandardMaterial color={FUR_DARK} roughness={0.9} />
          </mesh>
        ))}

        {/* ── CRIMSON LEATHER COLLAR WITH POLISHED BRASS BELL ── */}
        <group position={[0.13, 0.06, 0.05]} rotation={[0.2, -0.4, 0]}>
          {/* Leather band */}
          <mesh>
            <torusGeometry args={[0.078, 0.009, 8, 24]} />
            <meshStandardMaterial color={COLLAR_RED} roughness={0.4} metalness={0.2} />
          </mesh>
          {/* Polished brass bell */}
          <mesh ref={bellRef} position={[0.08, -0.04, 0]}>
            <sphereGeometry args={[0.014, 12, 12]} />
            <meshStandardMaterial
              color={BELL_GOLD}
              roughness={0.2}
              metalness={0.95}
            />
          </mesh>
        </group>

        {/* ── DETAILED SCULPTED FELINE HEAD ── */}
        <group ref={headRef} position={[0.16, 0.11, 0.06]}>
          {/* Cranium */}
          <mesh castShadow scale={[1.08, 0.94, 0.98]}>
            <sphereGeometry args={[0.105, 18, 16]} />
            <meshStandardMaterial
              color={hovered ? "#ea8a3c" : FUR_MAIN}
              roughness={0.85}
              metalness={0.02}
            />
          </mesh>

          {/* Tabby "M" Forehead Chevrons */}
          <mesh position={[0.075, 0.065, 0.025]} scale={[0.04, 0.015, 0.06]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={FUR_DARK} roughness={0.9} />
          </mesh>

          {/* Chubby Cream Cheek Ruffs (Left & Right) */}
          <mesh position={[0.05, -0.02, 0.075]} scale={[0.65, 0.5, 0.55]}>
            <sphereGeometry args={[0.06, 12, 10]} />
            <meshStandardMaterial color={FUR_CREAM} roughness={0.92} />
          </mesh>
          <mesh position={[0.05, -0.02, -0.035]} scale={[0.65, 0.5, 0.55]}>
            <sphereGeometry args={[0.06, 12, 10]} />
            <meshStandardMaterial color={FUR_CREAM} roughness={0.92} />
          </mesh>

          {/* Rounded White Whisker Pads / Muzzle */}
          <group position={[0.088, -0.022, 0.022]}>
            <mesh position={[0, 0, 0.018]} scale={[0.55, 0.45, 0.45]}>
              <sphereGeometry args={[0.045, 10, 10]} />
              <meshStandardMaterial color={FUR_CREAM} roughness={0.92} />
            </mesh>
            <mesh position={[0, 0, -0.018]} scale={[0.55, 0.45, 0.45]}>
              <sphereGeometry args={[0.045, 10, 10]} />
              <meshStandardMaterial color={FUR_CREAM} roughness={0.92} />
            </mesh>
          </group>

          {/* Realistic Pink Nose Button */}
          <mesh position={[0.118, -0.008, 0.022]}>
            <boxGeometry args={[0.012, 0.009, 0.012]} />
            <meshStandardMaterial color={NOSE_PINK} roughness={0.65} />
          </mesh>

          {/* Fine Curved Whiskers (3 left, 3 right) */}
          {[-0.01, 0.0, 0.01].map((yOff, wIdx) => (
            <group key={wIdx}>
              {/* Left whiskers */}
              <mesh
                position={[0.095, -0.025 + yOff, 0.055]}
                rotation={[0, 0.25, yOff * 3.5]}
              >
                <boxGeometry args={[0.075, 0.0012, 0.0012]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              {/* Right whiskers */}
              <mesh
                position={[0.095, -0.025 + yOff, -0.012]}
                rotation={[0, -0.25, -yOff * 3.5]}
              >
                <boxGeometry args={[0.075, 0.0012, 0.0012]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          ))}

          {/* ── EYES: Alert Glassy Eyes (Laser Active) vs Cozy Closed Slits (Sleeping) ── */}
          {isLaserActive ? (
            <group>
              {/* Left Eye */}
              <group position={[0.082, 0.034, 0.056]} rotation={[0, 0.28, 0]}>
                {/* Dark Eye Contour / Liner */}
                <mesh scale={[1.05, 1.15, 1.05]}>
                  <sphereGeometry args={[0.017, 14, 14]} />
                  <meshBasicMaterial color="#2a1204" />
                </mesh>
                {/* Luminous Golden-Amber Iris */}
                <mesh position={[0.004, 0, 0]}>
                  <sphereGeometry args={[0.015, 14, 14]} />
                  <meshStandardMaterial
                    color="#f59e0b"
                    emissive="#d97706"
                    emissiveIntensity={0.3}
                    roughness={0.2}
                    metalness={0.1}
                  />
                </mesh>
                {/* Dilating Black Vertical Slit Pupil */}
                <mesh position={[0.012, 0, 0]}>
                  <boxGeometry args={[0.004, 0.022, 0.006]} />
                  <meshBasicMaterial color="#080808" />
                </mesh>
                {/* White Specular Sparkle Highlight */}
                <mesh position={[0.014, 0.006, 0.004]}>
                  <sphereGeometry args={[0.0025, 8, 8]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>

              {/* Right Eye */}
              <group position={[0.082, 0.034, -0.016]} rotation={[0, -0.22, 0]}>
                {/* Dark Eye Contour / Liner */}
                <mesh scale={[1.05, 1.15, 1.05]}>
                  <sphereGeometry args={[0.017, 14, 14]} />
                  <meshBasicMaterial color="#2a1204" />
                </mesh>
                {/* Luminous Golden-Amber Iris */}
                <mesh position={[0.004, 0, 0]}>
                  <sphereGeometry args={[0.015, 14, 14]} />
                  <meshStandardMaterial
                    color="#f59e0b"
                    emissive="#d97706"
                    emissiveIntensity={0.3}
                    roughness={0.2}
                    metalness={0.1}
                  />
                </mesh>
                {/* Dilating Black Vertical Slit Pupil */}
                <mesh position={[0.012, 0, 0]}>
                  <boxGeometry args={[0.004, 0.022, 0.006]} />
                  <meshBasicMaterial color="#080808" />
                </mesh>
                {/* White Specular Sparkle Highlight */}
                <mesh position={[0.014, 0.006, 0.004]}>
                  <sphereGeometry args={[0.0025, 8, 8]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            </group>
          ) : (
            /* Peaceful Sleeping Curved Slits */
            <group>
              <mesh position={[0.078, 0.032, 0.062]} rotation={[0, 0.35, 0.1]}>
                <boxGeometry args={[0.024, 0.004, 0.003]} />
                <meshStandardMaterial color="#3a1c08" roughness={0.9} />
              </mesh>
              <mesh position={[0.078, 0.032, -0.018]} rotation={[0, -0.25, 0.1]}>
                <boxGeometry args={[0.024, 0.004, 0.003]} />
                <meshStandardMaterial color="#3a1c08" roughness={0.9} />
              </mesh>
            </group>
          )}

          {/* ── EARS WITH SOFT PINK CAVITY & INNER FUZZ ── */}
          {/* Left Ear */}
          <group ref={earLRef} position={[0.015, 0.095, 0.06]} rotation={[-0.2, 0.3, 0.35]}>
            <mesh castShadow>
              <coneGeometry args={[0.038, 0.065, 4]} />
              <meshStandardMaterial color={FUR_MAIN} roughness={0.85} />
            </mesh>
            {/* Peach inner lining */}
            <mesh position={[0, 0, 0.004]} scale={[0.7, 0.7, 0.7]}>
              <coneGeometry args={[0.032, 0.055, 4]} />
              <meshStandardMaterial color={EAR_INNER} roughness={0.95} />
            </mesh>
            {/* White ear fuzz tuft */}
            <mesh position={[0, -0.012, 0.006]} scale={[0.4, 0.3, 0.4]}>
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshBasicMaterial color={FUR_CREAM} />
            </mesh>
          </group>

          {/* Right Ear */}
          <group ref={earRRef} position={[-0.03, 0.095, -0.045]} rotation={[-0.2, -0.35, -0.35]}>
            <mesh castShadow>
              <coneGeometry args={[0.038, 0.065, 4]} />
              <meshStandardMaterial color={FUR_MAIN} roughness={0.85} />
            </mesh>
            {/* Peach inner lining */}
            <mesh position={[0, 0, 0.004]} scale={[0.7, 0.7, 0.7]}>
              <coneGeometry args={[0.032, 0.055, 4]} />
              <meshStandardMaterial color={EAR_INNER} roughness={0.95} />
            </mesh>
            {/* White ear fuzz tuft */}
            <mesh position={[0, -0.012, 0.006]} scale={[0.4, 0.3, 0.4]}>
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshBasicMaterial color={FUR_CREAM} />
            </mesh>
          </group>
        </group>

        {/* ── 4 ARTICULATED LEGS & WHITE SOCKS WITH PINK PADS ── */}
        {/* Front Left Paw */}
        <group ref={pawFLRef} position={[0.1, -0.05, 0.04]}>
          <mesh castShadow scale={[0.9, 1.2, 0.9]}>
            <cylinderGeometry args={[0.022, 0.024, 0.08, 10]} />
            <meshStandardMaterial color={FUR_CREAM} roughness={0.9} />
          </mesh>
          <mesh position={[0.012, -0.04, 0]} scale={[1.1, 0.6, 1.1]} castShadow>
            <sphereGeometry args={[0.028, 10, 10]} />
            <meshStandardMaterial color={FUR_CREAM} roughness={0.9} />
          </mesh>
          {/* Pink toe beans */}
          <mesh position={[0.024, -0.052, 0]} scale={[0.7, 0.3, 0.7]}>
            <sphereGeometry args={[0.013, 8, 8]} />
            <meshStandardMaterial color={TOE_BEANS} roughness={0.8} />
          </mesh>
        </group>

        {/* Front Right Paw (Interactive swatting paw) */}
        <group ref={pawFRRef} position={[0.1, -0.05, 0.12]}>
          <mesh castShadow scale={[0.9, 1.2, 0.9]}>
            <cylinderGeometry args={[0.022, 0.024, 0.08, 10]} />
            <meshStandardMaterial color={FUR_CREAM} roughness={0.9} />
          </mesh>
          <mesh position={[0.012, -0.04, 0]} scale={[1.1, 0.6, 1.1]} castShadow>
            <sphereGeometry args={[0.028, 10, 10]} />
            <meshStandardMaterial color={FUR_CREAM} roughness={0.9} />
          </mesh>
          {/* Pink toe beans */}
          <mesh position={[0.024, -0.052, 0]} scale={[0.7, 0.3, 0.7]}>
            <sphereGeometry args={[0.013, 8, 8]} />
            <meshStandardMaterial color={TOE_BEANS} roughness={0.8} />
          </mesh>
        </group>

        {/* Back Left Haunch & Thigh */}
        <group ref={legBLRef} position={[-0.11, -0.03, -0.06]}>
          <mesh castShadow scale={[1.2, 1.1, 0.9]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial color={FUR_MAIN} roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.04, 0.02]} scale={[0.9, 0.5, 1.1]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={FUR_CREAM} roughness={0.9} />
          </mesh>
        </group>

        {/* Back Right Haunch & Thigh */}
        <group ref={legBRRef} position={[-0.11, -0.03, 0.08]}>
          <mesh castShadow scale={[1.2, 1.1, 0.9]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial color={FUR_MAIN} roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.04, 0.02]} scale={[0.9, 0.5, 1.1]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={FUR_CREAM} roughness={0.9} />
          </mesh>
        </group>

        {/* ── ARTICULATED CURLED / HUNTING TAIL ── */}
        <group ref={tailRef} position={[-0.15, 0.05, -0.02]}>
          {/* Base arch */}
          <mesh castShadow>
            <torusGeometry args={[0.13, 0.028, 10, 24, Math.PI * 1.35]} />
            <meshStandardMaterial
              color={hovered ? "#ea8a3c" : FUR_MAIN}
              roughness={0.85}
              metalness={0.02}
            />
          </mesh>
          {/* Fluffy white tail tip */}
          <mesh position={[0.11, -0.065, 0]}>
            <sphereGeometry args={[0.032, 12, 12]} />
            <meshStandardMaterial color={FUR_CREAM} roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* ── CLEAN FLOATING DIALOGUE BADGE ── */}
      <Billboard
        position={[0.04, 0.35, 0.04]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <group ref={badgeRef}>
          {isLaserActive ? (
            /* Active laser hunting speech */
            <Text
              fontSize={swatRef.current > 0.4 ? 0.046 : 0.038}
              color={swatRef.current > 0.4 ? "#ff3838" : isWalkingRef.current ? "#ff9f1a" : "#ffd166"}
              anchorX="center"
              anchorY="middle"
              fontWeight={800}
              letterSpacing={0.06}
            >
              {swatRef.current > 0.4 ? "🐾 *POUNCE!*" : isWalkingRef.current ? "🐾 *stalking...*" : "👀 *locked on!*"}
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
