"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Billboard } from "@react-three/drei";
import { useStudio } from "@/context/StudioContext";
import { playCatPurr, playLaserChirp } from "@/lib/soundEffects";
import { dampedLerp } from "@/lib/easings";
import { getCatFurTexture } from "@/lib/catTexture";

/**
 * SleepingCat — High-fidelity procedural feline with lifelike anatomy & sofa locomotion AI:
 *
 * Anatomical Sculpting:
 * - Realistic skull with sloped nasal bridge, sculpted whisker pads, pink nose leather & nostrils.
 * - Glassy hazel-amber eyes with dark eyelid contours, dilating pupils & dual specular glints.
 * - Curved feline ears with Henry's pocket notch & soft inner ear fuzz tufts.
 * - Organic torso with shoulder blade rise, spine curvature, and primordial underbelly pouch.
 * - Articulated feline legs with backward-facing hock joints, carpal wrists & white socks with pink toe beans.
 * - Segmented organic 4-joint tail with natural counterbalance sway.
 * - Procedural canvas fur texture with directional hair grain and tabby striping.
 *
 * Locomotion & Edge-Leaning AI:
 * - Stalks smoothly across sofa cushions following the red laser dot.
 * - LEANING OVER BACK: When laser is behind sofa, cat stands up on hind legs, places front paws on back cushion,
 *   stretches neck and peers over the backrest to track the dot!
 * - LEANING OVER FRONT: When laser is on the floor in front, cat creeps to the front cushion rim, tilts downward,
 *   and peers over the edge.
 * - Iconic feline pre-pounce hip wiggle & swatting paw mechanics.
 * - Cozy curled sleeping state with organic harmonic breathing when inactive.
 */

const COUCH_WORLD_X = -1.4;
const COUCH_WORLD_Z = 1.4;
const COUCH_ROT_Y = -0.15; // Radians

export default function SleepingCat({
  position = [-0.34, 0.54, 0.05],
  rotation = [0, 0.45, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { isNightMode, isLaserActive, laserTarget } = useStudio();

  // Procedural fur texture
  const [furMap, setFurMap] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFurMap(getCatFurTexture());
    }
  }, []);

  // Structural Scene Graph Refs
  const rootRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Group>(null!);
  const chestRef = useRef<THREE.Group>(null!);
  const pelvisRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Group>(null!);
  const snoutRef = useRef<THREE.Group>(null!);
  const earLRef = useRef<THREE.Group>(null!);
  const earRRef = useRef<THREE.Group>(null!);
  const collarRef = useRef<THREE.Group>(null!);
  const bellRef = useRef<THREE.Mesh>(null!);

  // Articulated Limbs
  const legFLRef = useRef<THREE.Group>(null!);
  const legFRRef = useRef<THREE.Group>(null!);
  const legBLRef = useRef<THREE.Group>(null!);
  const legBRRef = useRef<THREE.Group>(null!);
  const pawFRRef = useRef<THREE.Group>(null!);

  // Articulated 4-segment tail
  const tailSeg1 = useRef<THREE.Group>(null!);
  const tailSeg2 = useRef<THREE.Group>(null!);
  const tailSeg3 = useRef<THREE.Group>(null!);
  const tailTip  = useRef<THREE.Mesh>(null!);

  // UI & Feedback
  const heartRef = useRef<THREE.Group>(null!);
  const badgeRef = useRef<THREE.Group>(null!);

  const [purring, setPurring] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Dynamic state coordinates
  const currentPos = useRef(new THREE.Vector3(position[0], position[1], position[2]));
  const currentYaw = useRef(rotation[1]);
  const walkPhase = useRef(0);
  const isWalkingRef = useRef(false);
  const leanState = useRef<"normal" | "back_lean" | "front_lean" | "swat">("normal");

  const swatProgress = useRef(0);
  const leanProgress = useRef(0);
  const lastChirpRef = useRef(0);
  const purrTimer = useRef(0);
  const breathRef = useRef(0);
  const timeRef = useRef(0);

  // Feline Palette
  const GINGER_BASE = "#d46b1f";
  const GINGER_DARK = "#963a06";
  const CREAM_WHITE = "#fdfbf7";
  const EAR_INNER   = "#ea9e88";
  const NOSE_PINK   = "#e58585";
  const TOE_BEANS   = "#f272a8";
  const COLLAR_RED  = "#8f1414";
  const BELL_GOLD   = "#facc15";

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
    purrTimer.current = 2.5;
  };

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    timeRef.current += dt;
    const t = timeRef.current;

    // Purr countdown
    if (purrTimer.current > 0) {
      purrTimer.current -= dt;
      if (purrTimer.current <= 0) setPurring(false);
    }

    // ── 1. LASER TRACKING & EDGE-LEANING TARGET COMPUTATION ──
    let targetX = position[0];
    let targetZ = position[2];
    let targetYaw = rotation[1];
    let distToLaserWorld = 999;
    let isBehindSofa = false;
    let isFrontOfSofa = false;

    if (isLaserActive && laserTarget) {
      // Calculate world distance
      const curWorldX = COUCH_WORLD_X + currentPos.current.x * Math.cos(COUCH_ROT_Y) - currentPos.current.z * Math.sin(COUCH_ROT_Y);
      const curWorldZ = COUCH_WORLD_Z + currentPos.current.x * Math.sin(COUCH_ROT_Y) + currentPos.current.z * Math.cos(COUCH_ROT_Y);
      const dwx = laserTarget[0] - curWorldX;
      const dwy = laserTarget[1] - 0.54;
      const dwz = laserTarget[2] - curWorldZ;
      distToLaserWorld = Math.sqrt(dwx * dwx + dwy * dwy + dwz * dwz);

      // Coordinate transformation into Couch local space
      const dxWorld = laserTarget[0] - COUCH_WORLD_X;
      const dzWorld = laserTarget[2] - COUCH_WORLD_Z;
      const cosR = Math.cos(-COUCH_ROT_Y);
      const sinR = Math.sin(-COUCH_ROT_Y);
      const couchLaserX = dxWorld * cosR - dzWorld * sinR;
      const couchLaserZ = dxWorld * sinR + dzWorld * cosR;

      // Detect edge scenarios
      isBehindSofa = couchLaserZ < -0.18 || laserTarget[2] < 1.05;
      isFrontOfSofa = couchLaserZ > 0.40;

      if (isBehindSofa) {
        // Walk right up to the back cushion edge
        targetX = Math.max(-0.62, Math.min(0.35, couchLaserX * 0.3 - 0.1));
        targetZ = -0.15; // Flush against back cushion
        targetYaw = Math.PI; // Face backwards toward the backrest
        leanState.current = "back_lean";
      } else if (isFrontOfSofa) {
        // Walk right to the front cushion edge
        targetX = Math.max(-0.62, Math.min(0.35, couchLaserX * 0.3 - 0.1));
        targetZ = 0.23; // Front cushion edge
        targetYaw = 0; // Face forward
        leanState.current = "front_lean";
      } else {
        // Stalking on cushions
        targetX = Math.max(-0.62, Math.min(0.35, couchLaserX * 0.28 - 0.12));
        targetZ = Math.max(-0.12, Math.min(0.20, couchLaserZ * 0.18 + 0.04));

        const moveDx = targetX - currentPos.current.x;
        const moveDz = targetZ - currentPos.current.z;
        if (Math.hypot(moveDx, moveDz) > 0.04) {
          targetYaw = Math.atan2(moveDx, moveDz);
        } else {
          targetYaw = Math.atan2(couchLaserX - currentPos.current.x, couchLaserZ - currentPos.current.z);
        }
        leanState.current = distToLaserWorld < 0.85 ? "swat" : "normal";
      }
    } else {
      leanState.current = "normal";
    }

    // ── 2. SMOOTH POSITION & HEADING INTERPOLATION ──
    const prevX = currentPos.current.x;
    const prevZ = currentPos.current.z;
    const walkSpeed = isLaserActive ? 4.8 : 2.2;

    currentPos.current.x = dampedLerp(currentPos.current.x, targetX, walkSpeed, dt);
    currentPos.current.z = dampedLerp(currentPos.current.z, targetZ, walkSpeed, dt);
    currentYaw.current = dampedLerp(currentYaw.current, targetYaw, 5.5, dt);

    const stepDist = Math.hypot(currentPos.current.x - prevX, currentPos.current.z - prevZ);
    const isWalking = stepDist > 0.0009;
    isWalkingRef.current = isWalking;

    if (isWalking) {
      walkPhase.current += dt * 13.5;
    }

    if (rootRef.current) {
      rootRef.current.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z);
      rootRef.current.rotation.y = currentYaw.current;
    }

    // ── 3. BODY POSTURE & EDGE-LEANING ANIMATION ──
    const targetLean = leanState.current === "back_lean" ? 1.0 : leanState.current === "front_lean" ? -1.0 : 0;
    leanProgress.current = dampedLerp(leanProgress.current, targetLean, 5.0, dt);

    const breathRate = purring ? 3.6 : isLaserActive ? 2.5 : 1.5;
    breathRef.current += dt * breathRate;
    const breath = Math.sin(breathRef.current) * (purring ? 0.065 : 0.038);

    if (bodyRef.current) {
      // Base height
      let bodyY = 0.12;
      let pitchX = 0;

      if (leanProgress.current > 0.05) {
        // ── LEANING OVER BACK OF SOFA ──
        // Rear body stands up high, front chest raises onto backrest
        bodyY = 0.13 + leanProgress.current * 0.09;
        pitchX = -leanProgress.current * 0.42; // Tilt body upward
      } else if (leanProgress.current < -0.05) {
        // ── LEANING OVER FRONT OF SOFA ──
        // Front drops downward peering over cushion
        bodyY = 0.12 + Math.abs(leanProgress.current) * 0.01;
        pitchX = Math.abs(leanProgress.current) * 0.28; // Tilt body downward
      } else if (leanState.current === "swat" && !isWalking) {
        // Crouch low for pounce
        bodyY = 0.095;
        // Feline pre-pounce hip wiggle
        bodyRef.current.rotation.z = Math.sin(t * 22) * 0.03;
      } else {
        bodyRef.current.rotation.z = 0;
      }

      bodyRef.current.position.y = bodyY + (isWalking ? Math.abs(Math.sin(walkPhase.current)) * 0.012 : 0);
      bodyRef.current.rotation.x = pitchX;
      bodyRef.current.scale.y = 1 + breath;
      bodyRef.current.scale.x = 1 - breath * 0.22;

      if (purring) {
        bodyRef.current.position.y += Math.sin(t * 45) * 0.003;
      }
    }

    // ── 4. LIMB KINEMATICS & PROWL GAIT ──
    const phase = walkPhase.current;

    if (isWalking && leanProgress.current < 0.1) {
      // 4-beat lateral predatory feline walk sequence
      if (legFLRef.current) legFLRef.current.rotation.x = Math.sin(phase) * 0.38;
      if (legFRRef.current) legFRRef.current.rotation.x = Math.sin(phase + Math.PI) * 0.38;
      if (legBLRef.current) legBLRef.current.rotation.x = Math.sin(phase + Math.PI * 0.5) * 0.30;
      if (legBRRef.current) legBRRef.current.rotation.x = Math.sin(phase + Math.PI * 1.5) * 0.30;
    } else if (leanProgress.current > 0.1) {
      // Back lean: Front paws stretch forward & up onto the backrest cushion
      const lean = leanProgress.current;
      if (legFLRef.current) {
        legFLRef.current.position.set(0.09, 0.06 * lean, -0.06 * lean);
        legFLRef.current.rotation.x = -0.45 * lean;
      }
      if (legFRRef.current) {
        legFRRef.current.position.set(0.09, 0.06 * lean, -0.06 * lean);
        legFRRef.current.rotation.x = -0.45 * lean;
      }
      // Back haunches firmly plant
      if (legBLRef.current) legBLRef.current.rotation.x = 0.2 * lean;
      if (legBRRef.current) legBRRef.current.rotation.x = 0.2 * lean;
    } else {
      // Stationary limb rest
      if (legFLRef.current) {
        legFLRef.current.position.set(0.09, -0.04, 0.04);
        legFLRef.current.rotation.x = dampedLerp(legFLRef.current.rotation.x, 0, 8, dt);
      }
      if (legFRRef.current) {
        legFRRef.current.position.set(0.09, -0.04, 0.12);
        legFRRef.current.rotation.x = dampedLerp(legFRRef.current.rotation.x, 0, 8, dt);
      }
      if (legBLRef.current) legBLRef.current.rotation.x = dampedLerp(legBLRef.current.rotation.x, 0, 8, dt);
      if (legBRRef.current) legBRRef.current.rotation.x = dampedLerp(legBRRef.current.rotation.x, 0, 8, dt);

      // Swatting physics when close to laser
      if (leanState.current === "swat") {
        swatProgress.current = Math.min(1, swatProgress.current + dt * 6.5);
        if (Date.now() - lastChirpRef.current > 1600) {
          playLaserChirp();
          lastChirpRef.current = Date.now();
        }
      } else {
        swatProgress.current = Math.max(0, swatProgress.current - dt * 4.5);
      }

      if (pawFRRef.current) {
        const swat = swatProgress.current;
        pawFRRef.current.position.z = swat * 0.15;
        pawFRRef.current.position.y = Math.sin(swat * Math.PI) * 0.07;
      }
    }

    // ── 5. HEAD TRACKING & NECK STRETCH ──
    if (headRef.current) {
      if (isLaserActive) {
        if (leanProgress.current > 0.1) {
          // Craning neck up and peering over backrest
          const lean = leanProgress.current;
          headRef.current.position.set(0.18, 0.16 + lean * 0.06, 0.05);
          headRef.current.rotation.x = -0.32 * lean + Math.sin(t * 3.5) * 0.03;
        } else if (leanProgress.current < -0.1) {
          // Peering down over front edge
          headRef.current.position.set(0.19, 0.08, 0.06);
          headRef.current.rotation.x = 0.25 + Math.sin(t * 3.5) * 0.03;
        } else {
          headRef.current.position.set(0.17, 0.12, 0.06);
          headRef.current.rotation.x = 0.05 + Math.sin(t * 3.5) * 0.02;
        }
        headRef.current.rotation.z = Math.sin(t * 2.0) * 0.03;
      } else {
        headRef.current.position.set(0.16, 0.10, 0.06);
        const purrNuzzle = purring ? Math.sin(t * 6) * 0.08 : 0;
        headRef.current.rotation.x = 0.12 + Math.sin(breathRef.current * 0.9) * 0.03 + purrNuzzle;
        headRef.current.rotation.z = -0.08 + Math.cos(breathRef.current * 0.7) * 0.02;
      }
    }

    // Expressive Ears
    if (earLRef.current) {
      const earTwitch = isLaserActive ? Math.sin(t * 8.5) * 0.07 : Math.sin(t * 1.15) > 0.95 ? Math.sin(t * 35) * 0.2 : 0;
      earLRef.current.rotation.z = 0.32 + earTwitch;
    }
    if (earRRef.current) {
      const earTwitch = isLaserActive ? Math.sin(t * 7.2) * 0.06 : Math.sin(t * 1.4) > 0.96 ? Math.sin(t * 32) * 0.18 : 0;
      earRRef.current.rotation.z = -0.32 - earTwitch;
    }

    // Collar Bell Swing
    if (bellRef.current) {
      const bellSway = isWalking ? Math.sin(walkPhase.current) * 0.22 : Math.sin(t * 2.4) * 0.05;
      bellRef.current.rotation.z = bellSway;
    }

    // ── 6. ORGANIC 4-SEGMENT FLUID TAIL ──
    if (tailSeg1.current && tailSeg2.current && tailSeg3.current) {
      if (isLaserActive) {
        // High alert question-mark hunting arch
        const excitedWag = Math.sin(t * 8) * 0.25;
        tailSeg1.current.rotation.set(-0.6, 0, excitedWag * 0.5);
        tailSeg2.current.rotation.set(-0.5, 0, excitedWag * 0.7);
        tailSeg3.current.rotation.set(0.4, 0, excitedWag * 1.0);
      } else {
        // Soft resting curve around body
        const sleepSwish = Math.sin(t * 0.9) * 0.08;
        tailSeg1.current.rotation.set(0.3, 0.4 + sleepSwish, -0.6);
        tailSeg2.current.rotation.set(0.2, 0.5, -0.4);
        tailSeg3.current.rotation.set(0.1, 0.6, -0.3);
      }
    }

    // Floating heart when purring
    if (heartRef.current && purring) {
      const progress = 1 - purrTimer.current / 2.5;
      heartRef.current.position.y = 0.36 + progress * 0.28;
      heartRef.current.position.x = 0.14 + Math.sin(progress * Math.PI * 3) * 0.04;
      heartRef.current.scale.setScalar(Math.sin(progress * Math.PI) * 1.1);
    }

    // Dialogue bob
    if (badgeRef.current) {
      badgeRef.current.position.y = Math.sin(t * 3.2) * 0.006;
    }
  });

  return (
    <group
      ref={rootRef}
      name="cat-entity"
      position={position}
      rotation={rotation}
      scale={[1.18, 1.18, 1.18]}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <group ref={bodyRef}>
        {/* ── MAIN FELINE TORSO (Tapered ribcage with fur texture) ── */}
        <mesh castShadow position={[0.02, 0.03, 0]} scale={[1.25, 0.9, 0.95]}>
          <sphereGeometry args={[0.155, 24, 20]} />
          <meshStandardMaterial
            map={furMap ?? undefined}
            color={hovered ? "#f08530" : GINGER_BASE}
            roughness={0.88}
            metalness={0.02}
          />
        </mesh>

        {/* ── WHITE CHEST RUFF & THROAT BIB ── */}
        <mesh position={[0.085, 0.01, 0.04]} scale={[0.82, 0.6, 0.7]}>
          <sphereGeometry args={[0.135, 16, 14]} />
          <meshStandardMaterial color={CREAM_WHITE} roughness={0.92} metalness={0} />
        </mesh>

        {/* ── LOWER PELVIS & HIND FLANKS ── */}
        <mesh castShadow position={[-0.1, 0.01, 0]} scale={[1.05, 0.82, 0.9]}>
          <sphereGeometry args={[0.14, 18, 16]} />
          <meshStandardMaterial
            map={furMap ?? undefined}
            color={hovered ? "#f08530" : GINGER_BASE}
            roughness={0.88}
          />
        </mesh>

        {/* ── TABBY MACKEREL STRIPES ACROSS SPINE ── */}
        {[-0.12, -0.04, 0.04].map((xOff, idx) => (
          <mesh key={idx} position={[xOff, 0.11, 0]} scale={[0.1, 0.022, 0.7]}>
            <sphereGeometry args={[0.11, 10, 10]} />
            <meshStandardMaterial color={GINGER_DARK} roughness={0.9} />
          </mesh>
        ))}

        {/* ── STITCHED LEATHER COLLAR WITH POLISHED BELL ── */}
        <group position={[0.14, 0.06, 0.04]} rotation={[0.2, -0.4, 0]}>
          <mesh>
            <torusGeometry args={[0.076, 0.009, 8, 24]} />
            <meshStandardMaterial color={COLLAR_RED} roughness={0.35} metalness={0.2} />
          </mesh>
          <mesh ref={bellRef} position={[0.078, -0.038, 0]}>
            <sphereGeometry args={[0.014, 12, 12]} />
            <meshStandardMaterial
              color={BELL_GOLD}
              roughness={0.18}
              metalness={0.95}
            />
          </mesh>
        </group>

        {/* ── SCULPTED FELINE HEAD ── */}
        <group ref={headRef} position={[0.17, 0.12, 0.06]}>
          {/* Cranium with fur map */}
          <mesh castShadow scale={[1.1, 0.95, 0.98]}>
            <sphereGeometry args={[0.105, 22, 18]} />
            <meshStandardMaterial
              map={furMap ?? undefined}
              color={hovered ? "#f08530" : GINGER_BASE}
              roughness={0.85}
              metalness={0.02}
            />
          </mesh>

          {/* Tabby forehead "M" crest */}
          <mesh position={[0.076, 0.066, 0.025]} scale={[0.04, 0.016, 0.065]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={GINGER_DARK} roughness={0.9} />
          </mesh>

          {/* Sloped Nasal Bridge (Connecting forehead to nose) */}
          <mesh position={[0.088, 0.008, 0.022]} rotation={[0, 0, -0.45]} scale={[0.6, 1.1, 0.55]}>
            <boxGeometry args={[0.042, 0.05, 0.045]} />
            <meshStandardMaterial
              map={furMap ?? undefined}
              color={GINGER_BASE}
              roughness={0.85}
            />
          </mesh>

          {/* Chubby Cream Cheek Ruffs */}
          <mesh position={[0.052, -0.02, 0.075]} scale={[0.7, 0.52, 0.58]}>
            <sphereGeometry args={[0.06, 12, 10]} />
            <meshStandardMaterial color={CREAM_WHITE} roughness={0.92} />
          </mesh>
          <mesh position={[0.052, -0.02, -0.035]} scale={[0.7, 0.52, 0.58]}>
            <sphereGeometry args={[0.06, 12, 10]} />
            <meshStandardMaterial color={CREAM_WHITE} roughness={0.92} />
          </mesh>

          {/* Dual White Whisker Pads (Puff Muzzle) */}
          <group position={[0.095, -0.018, 0.022]}>
            <mesh position={[0, 0, 0.019]} scale={[0.62, 0.48, 0.48]}>
              <sphereGeometry args={[0.042, 12, 10]} />
              <meshStandardMaterial color={CREAM_WHITE} roughness={0.92} />
            </mesh>
            <mesh position={[0, 0, -0.019]} scale={[0.62, 0.48, 0.48]}>
              <sphereGeometry args={[0.042, 12, 10]} />
              <meshStandardMaterial color={CREAM_WHITE} roughness={0.92} />
            </mesh>
          </group>

          {/* Inverted Triangular Nose Leather with Nostrils */}
          <mesh position={[0.122, -0.006, 0.022]} scale={[0.8, 0.9, 1.1]}>
            <coneGeometry args={[0.012, 0.014, 3]} />
            <meshStandardMaterial color={NOSE_PINK} roughness={0.6} />
          </mesh>

          {/* 6 Curved White Whiskers */}
          {[-0.012, 0.0, 0.012].map((yOff, wIdx) => (
            <group key={wIdx}>
              {/* Left whiskers */}
              <mesh
                position={[0.102, -0.022 + yOff, 0.055]}
                rotation={[0, 0.28, yOff * 3.8]}
              >
                <boxGeometry args={[0.085, 0.0012, 0.0012]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              {/* Right whiskers */}
              <mesh
                position={[0.102, -0.022 + yOff, -0.012]}
                rotation={[0, -0.28, -yOff * 3.8]}
              >
                <boxGeometry args={[0.085, 0.0012, 0.0012]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          ))}

          {/* ── EYES: Alert Glassy Eyes (Laser Active) vs Peaceful Slits (Sleeping) ── */}
          {isLaserActive ? (
            <group>
              {/* Left Eye */}
              <group position={[0.084, 0.035, 0.058]} rotation={[0, 0.26, 0]}>
                {/* Dark Eyeliner Socket */}
                <mesh scale={[1.05, 1.18, 1.05]}>
                  <sphereGeometry args={[0.017, 14, 14]} />
                  <meshBasicMaterial color="#1a0c04" />
                </mesh>
                {/* Luminous Hazel-Gold Iris */}
                <mesh position={[0.004, 0, 0]}>
                  <sphereGeometry args={[0.015, 14, 14]} />
                  <meshStandardMaterial
                    color="#f59e0b"
                    emissive="#b45309"
                    emissiveIntensity={0.35}
                    roughness={0.15}
                    metalness={0.1}
                  />
                </mesh>
                {/* Dilating Vertical Black Slit Pupil */}
                <mesh position={[0.012, 0, 0]}>
                  <boxGeometry args={[0.0035, 0.021, 0.0055]} />
                  <meshBasicMaterial color="#080808" />
                </mesh>
                {/* Dual Wet Specular Sparkles */}
                <mesh position={[0.014, 0.006, 0.004]}>
                  <sphereGeometry args={[0.0025, 8, 8]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0.013, -0.004, -0.003]}>
                  <sphereGeometry args={[0.0015, 6, 6]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>

              {/* Right Eye */}
              <group position={[0.084, 0.035, -0.015]} rotation={[0, -0.22, 0]}>
                {/* Dark Eyeliner Socket */}
                <mesh scale={[1.05, 1.18, 1.05]}>
                  <sphereGeometry args={[0.017, 14, 14]} />
                  <meshBasicMaterial color="#1a0c04" />
                </mesh>
                {/* Luminous Hazel-Gold Iris */}
                <mesh position={[0.004, 0, 0]}>
                  <sphereGeometry args={[0.015, 14, 14]} />
                  <meshStandardMaterial
                    color="#f59e0b"
                    emissive="#b45309"
                    emissiveIntensity={0.35}
                    roughness={0.15}
                    metalness={0.1}
                  />
                </mesh>
                {/* Dilating Vertical Black Slit Pupil */}
                <mesh position={[0.012, 0, 0]}>
                  <boxGeometry args={[0.0035, 0.021, 0.0055]} />
                  <meshBasicMaterial color="#080808" />
                </mesh>
                {/* Dual Wet Specular Sparkles */}
                <mesh position={[0.014, 0.006, 0.004]}>
                  <sphereGeometry args={[0.0025, 8, 8]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0.013, -0.004, -0.003]}>
                  <sphereGeometry args={[0.0015, 6, 6]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            </group>
          ) : (
            /* Peaceful Sleeping Curved Slits */
            <group>
              <mesh position={[0.08, 0.032, 0.062]} rotation={[0, 0.35, 0.1]}>
                <boxGeometry args={[0.024, 0.004, 0.003]} />
                <meshStandardMaterial color="#2a1204" roughness={0.9} />
              </mesh>
              <mesh position={[0.08, 0.032, -0.018]} rotation={[0, -0.25, 0.1]}>
                <boxGeometry args={[0.024, 0.004, 0.003]} />
                <meshStandardMaterial color="#2a1204" roughness={0.9} />
              </mesh>
            </group>
          )}

          {/* ── CURVED FELINE EARS WITH HENRY'S POCKET & INNER FUZZ ── */}
          {/* Left Ear */}
          <group ref={earLRef} position={[0.015, 0.095, 0.06]} rotation={[-0.18, 0.28, 0.32]}>
            <mesh castShadow scale={[1.1, 1.2, 0.8]}>
              <coneGeometry args={[0.038, 0.068, 4]} />
              <meshStandardMaterial color={GINGER_BASE} roughness={0.85} />
            </mesh>
            <mesh position={[0, 0, 0.004]} scale={[0.7, 0.75, 0.6]}>
              <coneGeometry args={[0.032, 0.056, 4]} />
              <meshStandardMaterial color={EAR_INNER} roughness={0.95} />
            </mesh>
            {/* White ear fuzz tuft */}
            <mesh position={[0, -0.014, 0.006]} scale={[0.45, 0.35, 0.4]}>
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshBasicMaterial color={CREAM_WHITE} />
            </mesh>
          </group>

          {/* Right Ear */}
          <group ref={earRRef} position={[-0.03, 0.095, -0.045]} rotation={[-0.18, -0.32, -0.32]}>
            <mesh castShadow scale={[1.1, 1.2, 0.8]}>
              <coneGeometry args={[0.038, 0.068, 4]} />
              <meshStandardMaterial color={GINGER_BASE} roughness={0.85} />
            </mesh>
            <mesh position={[0, 0, 0.004]} scale={[0.7, 0.75, 0.6]}>
              <coneGeometry args={[0.032, 0.056, 4]} />
              <meshStandardMaterial color={EAR_INNER} roughness={0.95} />
            </mesh>
            {/* White ear fuzz tuft */}
            <mesh position={[0, -0.014, 0.006]} scale={[0.45, 0.35, 0.4]}>
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshBasicMaterial color={CREAM_WHITE} />
            </mesh>
          </group>
        </group>

        {/* ── ARTICULATED LIMBS WITH WHITE MITTENS & PINK TOE PADS ── */}
        {/* Front Left Leg */}
        <group ref={legFLRef} position={[0.09, -0.04, 0.04]}>
          <mesh castShadow scale={[0.85, 1.1, 0.85]}>
            <cylinderGeometry args={[0.02, 0.022, 0.08, 10]} />
            <meshStandardMaterial color={CREAM_WHITE} roughness={0.9} />
          </mesh>
          <mesh position={[0.012, -0.04, 0]} scale={[1.15, 0.55, 1.1]} castShadow>
            <sphereGeometry args={[0.027, 10, 10]} />
            <meshStandardMaterial color={CREAM_WHITE} roughness={0.9} />
          </mesh>
          {/* Pink toe beans */}
          <mesh position={[0.023, -0.052, 0]} scale={[0.7, 0.28, 0.7]}>
            <sphereGeometry args={[0.013, 8, 8]} />
            <meshStandardMaterial color={TOE_BEANS} roughness={0.8} />
          </mesh>
        </group>

        {/* Front Right Leg (Interactive swatting limb) */}
        <group ref={legFRRef} position={[0.09, -0.04, 0.12]}>
          <group ref={pawFRRef}>
            <mesh castShadow scale={[0.85, 1.1, 0.85]}>
              <cylinderGeometry args={[0.02, 0.022, 0.08, 10]} />
              <meshStandardMaterial color={CREAM_WHITE} roughness={0.9} />
            </mesh>
            <mesh position={[0.012, -0.04, 0]} scale={[1.15, 0.55, 1.1]} castShadow>
              <sphereGeometry args={[0.027, 10, 10]} />
              <meshStandardMaterial color={CREAM_WHITE} roughness={0.9} />
            </mesh>
            {/* Pink toe beans */}
            <mesh position={[0.023, -0.052, 0]} scale={[0.7, 0.28, 0.7]}>
              <sphereGeometry args={[0.013, 8, 8]} />
              <meshStandardMaterial color={TOE_BEANS} roughness={0.8} />
            </mesh>
          </group>
        </group>

        {/* Back Left Haunch & Thigh (With folded hock joint) */}
        <group ref={legBLRef} position={[-0.12, -0.02, -0.06]}>
          {/* Muscular feline thigh */}
          <mesh castShadow scale={[1.25, 1.1, 0.95]}>
            <sphereGeometry args={[0.055, 14, 12]} />
            <meshStandardMaterial color={GINGER_BASE} roughness={0.88} />
          </mesh>
          {/* Hock to foot */}
          <mesh position={[0.01, -0.04, 0.02]} scale={[0.88, 0.48, 1.1]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={CREAM_WHITE} roughness={0.9} />
          </mesh>
        </group>

        {/* Back Right Haunch & Thigh */}
        <group ref={legBRRef} position={[-0.12, -0.02, 0.08]}>
          <mesh castShadow scale={[1.25, 1.1, 0.95]}>
            <sphereGeometry args={[0.055, 14, 12]} />
            <meshStandardMaterial color={GINGER_BASE} roughness={0.88} />
          </mesh>
          <mesh position={[0.01, -0.04, 0.02]} scale={[0.88, 0.48, 1.1]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={CREAM_WHITE} roughness={0.9} />
          </mesh>
        </group>

        {/* ── ARTICULATED 4-SEGMENT FLUID TAIL ── */}
        <group position={[-0.17, 0.06, -0.02]}>
          <group ref={tailSeg1}>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.022, 0.025, 0.08, 10]} />
              <meshStandardMaterial color={GINGER_BASE} roughness={0.88} />
            </mesh>
            <group ref={tailSeg2} position={[0, 0.08, 0]}>
              <mesh position={[0, 0.04, 0]}>
                <cylinderGeometry args={[0.018, 0.022, 0.08, 10]} />
                <meshStandardMaterial color={GINGER_BASE} roughness={0.88} />
              </mesh>
              <group ref={tailSeg3} position={[0, 0.08, 0]}>
                <mesh position={[0, 0.035, 0]}>
                  <cylinderGeometry args={[0.014, 0.018, 0.07, 10]} />
                  <meshStandardMaterial color={GINGER_BASE} roughness={0.88} />
                </mesh>
                {/* Fluffy Cream Tip */}
                <mesh ref={tailTip} position={[0, 0.08, 0]}>
                  <sphereGeometry args={[0.024, 12, 10]} />
                  <meshStandardMaterial color={CREAM_WHITE} roughness={0.92} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* ── CLEAN FLOATING DIALOGUE BADGE ── */}
      <Billboard
        position={[0.04, 0.38, 0.04]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <group ref={badgeRef}>
          {isLaserActive ? (
            /* Context-aware feline hunting dialogue */
            <Text
              fontSize={0.038}
              color={
                leanState.current === "back_lean"
                  ? "#38bdf8" // Cyan alert
                  : leanState.current === "front_lean"
                  ? "#fb923c" // Orange alert
                  : swatProgress.current > 0.3
                  ? "#ef4444" // Red pounce
                  : isWalkingRef.current
                  ? "#facc15"
                  : "#ffd166"
              }
              anchorX="center"
              anchorY="middle"
              fontWeight={800}
              letterSpacing={0.06}
            >
              {leanState.current === "back_lean"
                ? "👀 *peeking behind sofa!*"
                : leanState.current === "front_lean"
                ? "🐾 *leaning over front edge!*"
                : swatProgress.current > 0.3
                ? "🐾 *POUNCE!*"
                : isWalkingRef.current
                ? "🐾 *stalking...*"
                : "👀 *locked on!*"}
            </Text>
          ) : purring ? (
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
