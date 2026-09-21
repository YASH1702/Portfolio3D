"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Billboard } from "@react-three/drei";
import { useStudio } from "@/context/StudioContext";
import { playCatPurr, playLaserChirp } from "@/lib/soundEffects";
import { dampedLerp } from "@/lib/easings";
import { getCatFurTexture } from "@/lib/catTexture";
import { yarnWorldPosition, yarnIsRolling } from "./YarnBall";
import { laserWorldPosition } from "./LaserPointer";

/**
 * Shortest-arc angle interpolation with exponential damping.
 * Prevents 360-degree snap spins when crossing [-PI, PI].
 */
function lerpAngle(current: number, target: number, lambda: number, dt: number): number {
  let diff = (target - current) % (Math.PI * 2);
  if (diff < -Math.PI) diff += Math.PI * 2;
  if (diff > Math.PI) diff -= Math.PI * 2;
  return current + diff * (1 - Math.exp(-lambda * dt));
}

/**
 * SleepingCat — High-fidelity procedural Persian feline with lifelike anatomy & sofa locomotion AI:
 *
 * Anatomical Sculpting:
 * - Broad, rounded Persian cranium, sweet snub nasal bridge, fluffy cream cheek ruffs & puff muzzle.
 * - Deep copper/amber Persian eyes with glassy specular glints and realistic eyelid contours.
 * - Small rounded ears with warm inner ear skin and soft cream fuzz tufts.
 * - Luxurious lion-like chest ruff / mane cascading down between front paws.
 * - Procedural canvas fur texture with directional hair grain and soft smokey dorsal shading.
 *
 * Ideal Sitting & Locomotion AI:
 * - Regal upright sitting pose when idle: front legs straight and planted side-by-side,
 *   haunches folded flat on cushion, proud chest held high, tail curled gracefully around front paws.
 * - Shortest-path angle interpolation eliminating 360-degree spin glitches.
 * - Smooth continuous weight blending between sitting, stalking, and edge leaning.
 * - Sofa edge-leaning AI: paws on backrest and neck craning over edge when laser is behind sofa.
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
  const { isNightMode, isLaserActive } = useStudio();

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

  // Continuous blend weights to eliminate visual pops & snapping
  const walkWeight = useRef(0); // 0 = stationary, 1 = full gait
  const sitWeight = useRef(1);  // 1 = ideal sitting pose, 0 = active hunting
  const leanState = useRef<"normal" | "back_lean" | "front_lean" | "swat">("normal");
  const leanProgress = useRef(0); // -1 = front edge, +1 = backrest lean
  const swatProgress = useRef(0);

  const lastChirpRef = useRef(0);
  const purrTimer = useRef(0);
  const breathRef = useRef(0);
  const timeRef = useRef(0);

  // Persian Golden-Brown Palette (warm luminous golden honey tones)
  const PERSIAN_GOLD  = "#d9924c"; // Warm glowing golden honey coat
  const PERSIAN_DARK  = "#a65c22"; // Warm golden chestnut shading
  const PERSIAN_CREAM = "#fff8ee"; // Plush warm ivory chest ruff & mitten paws
  const EAR_INNER     = "#e89f88"; // Soft pinkish inner ear
  const NOSE_PINK     = "#d9777f"; // Dusty rose feline nose leather
  const TOE_BEANS     = "#db7b93"; // Soft rosy paw pads
  const EYE_COPPER    = "#d97706"; // Luminous Persian copper-amber iris
  const COLLAR_TEAL   = "#0f766e"; // Elegant deep teal velvet collar
  const BELL_GOLD     = "#f59e0b"; // Polished brass bell

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

    // ── 1. LASER TRACKING & SOFA NAVIGATION COMPUTATION ──
    let targetX = position[0];
    let targetZ = position[2];
    let targetYaw = rotation[1];
    let distToLaserWorld = 999;
    let isBehindSofa = false;
    let isFrontOfSofa = false;

    const isYarnActive = !isLaserActive && (yarnIsRolling.current || (Date.now() - yarnIsRolling.lastBatTime < 4500));

    if (isLaserActive) {
      // Calculate world distance from cat to laser
      const curWorldX = COUCH_WORLD_X + currentPos.current.x * Math.cos(COUCH_ROT_Y) - currentPos.current.z * Math.sin(COUCH_ROT_Y);
      const curWorldZ = COUCH_WORLD_Z + currentPos.current.x * Math.sin(COUCH_ROT_Y) + currentPos.current.z * Math.cos(COUCH_ROT_Y);
      const dwx = laserWorldPosition.x - curWorldX;
      const dwy = laserWorldPosition.y - 0.54;
      const dwz = laserWorldPosition.z - curWorldZ;
      distToLaserWorld = Math.sqrt(dwx * dwx + dwy * dwy + dwz * dwz);

      // Coordinate transformation into Couch local space
      const dxWorld = laserWorldPosition.x - COUCH_WORLD_X;
      const dzWorld = laserWorldPosition.z - COUCH_WORLD_Z;
      const cosR = Math.cos(-COUCH_ROT_Y);
      const sinR = Math.sin(-COUCH_ROT_Y);
      const couchLaserX = dxWorld * cosR - dzWorld * sinR;
      const couchLaserZ = dxWorld * sinR + dzWorld * cosR;

      // Detect edge scenarios relative to sofa geometry
      isBehindSofa = couchLaserZ < -0.16 || laserWorldPosition.z < 1.10;
      isFrontOfSofa = couchLaserZ > 0.38;

      if (isBehindSofa) {
        // Stalk right up to the back cushion seam and face backwards (-Z)
        targetX = Math.max(-0.62, Math.min(0.35, couchLaserX * 0.32 - 0.08));
        targetZ = -0.15; // Flush against sofa back cushion
        targetYaw = Math.PI / 2; // Face backwards (-Z) for +X forward model
        leanState.current = "back_lean";
      } else if (isFrontOfSofa) {
        // Walk right to the front cushion edge and face forward (+Z)
        targetX = Math.max(-0.62, Math.min(0.35, couchLaserX * 0.32 - 0.08));
        targetZ = 0.22; // Front cushion edge
        targetYaw = -Math.PI / 2; // Face forward (+Z) for +X forward model
        leanState.current = "front_lean";
      } else {
        // Roaming across sofa cushions
        targetX = Math.max(-0.62, Math.min(0.35, couchLaserX * 0.30 - 0.10));
        targetZ = Math.max(-0.12, Math.min(0.18, couchLaserZ * 0.22 + 0.04));

        const moveDx = targetX - currentPos.current.x;
        const moveDz = targetZ - currentPos.current.z;
        const moveDist = Math.hypot(moveDx, moveDz);

        // Deadband filter: don't flip yaw when tiny cursor twitch occurs
        if (moveDist > 0.045) {
          targetYaw = Math.atan2(-moveDz, moveDx);
        } else {
          // Face the laser dot smoothly when stationary
          targetYaw = Math.atan2(-(couchLaserZ - currentPos.current.z), couchLaserX - currentPos.current.x);
        }
        leanState.current = distToLaserWorld < 0.85 ? "swat" : "normal";
      }
    } else if (isYarnActive) {
      // Coordinate transformation of yarn world pos into Couch local space
      const dxWorld = yarnWorldPosition.x - COUCH_WORLD_X;
      const dzWorld = yarnWorldPosition.z - COUCH_WORLD_Z;
      const cosR = Math.cos(-COUCH_ROT_Y);
      const sinR = Math.sin(-COUCH_ROT_Y);
      const couchYarnX = dxWorld * cosR - dzWorld * sinR;
      const couchYarnZ = dxWorld * sinR + dzWorld * cosR;

      // Cat stays perched on the couch cushion, but turns its gaze toward the yarn ball!
      const targetYawToYarn = Math.atan2(-(couchYarnZ - currentPos.current.z), couchYarnX - currentPos.current.x);
      targetYaw = Math.max(-Math.PI * 0.85, Math.min(Math.PI * 0.85, targetYawToYarn));
      leanState.current = "front_lean";
    } else {
      leanState.current = "normal";
    }

    // ── 2. FLUID POSITION & SHORTEST-PATH HEADING INTERPOLATION ──
    const prevX = currentPos.current.x;
    const prevZ = currentPos.current.z;
    const walkSpeed = isLaserActive ? 4.2 : 2.0;

    currentPos.current.x = dampedLerp(currentPos.current.x, targetX, walkSpeed, dt);
    currentPos.current.z = dampedLerp(currentPos.current.z, targetZ, walkSpeed, dt);

    // CRITICAL FIX: lerpAngle eliminates the 360-degree spin glitch!
    currentYaw.current = lerpAngle(currentYaw.current, targetYaw, 5.2, dt);

    const stepDist = Math.hypot(currentPos.current.x - prevX, currentPos.current.z - prevZ);
    const isMoving = stepDist > 0.0006;
    isWalkingRef.current = isMoving;

    // Smooth continuous walk weight (0 to 1) prevents leg popping
    const targetWalkWeight = isMoving ? 1.0 : 0.0;
    walkWeight.current = dampedLerp(walkWeight.current, targetWalkWeight, 7.5, dt);

    // Smooth sit weight: 1 when idle, 0 when active hunting
    const targetSitWeight = isLaserActive ? 0.0 : 1.0;
    sitWeight.current = dampedLerp(sitWeight.current, targetSitWeight, 3.8, dt);

    if (isMoving) {
      walkPhase.current += dt * 12.0;
    }

    if (rootRef.current) {
      rootRef.current.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z);
      rootRef.current.rotation.y = currentYaw.current;
    }

    // ── 3. BODY POSTURE & EDGE-LEANING INTERPOLATION ──
    const targetLean = leanState.current === "back_lean" ? 1.0 : leanState.current === "front_lean" ? -1.0 : 0;
    leanProgress.current = dampedLerp(leanProgress.current, targetLean, 4.5, dt);

    const breathRate = purring ? 3.8 : isLaserActive || isYarnActive ? 2.6 : 1.6;
    breathRef.current += dt * breathRate;
    const breath = Math.sin(breathRef.current) * (purring ? 0.055 : 0.032);

    const sit = sitWeight.current;
    const lean = leanProgress.current;
    const walk = walkWeight.current;

    if (bodyRef.current) {
      // IDEAL SITTING POSE: Elevated chest, proud spine pitch
      // ACTIVE PROWLING POSE: Low predatory stance (y = 0.11, pitch = 0)
      let baseBodyY = (1 - sit) * 0.11 + sit * 0.155;
      let pitchZ = sit * 0.22; // In XY plane: +Z rotation raises +X (head)

      if (lean > 0.05) {
        // LEANING OVER BACK OF SOFA:
        // Cat rears up, front paws rest on sofa back cushion
        baseBodyY = 0.13 + lean * 0.08;
        pitchZ = lean * 0.35;
      } else if (lean < -0.05) {
        // LEANING OVER FRONT EDGE:
        // Chest dips down to inspect floor
        baseBodyY = 0.11 + Math.abs(lean) * 0.01;
        pitchZ = -Math.abs(lean) * 0.26;
      } else if (leanState.current === "swat" && walk < 0.2) {
        // Crouch low for pounce + feline pre-pounce hip wiggle
        baseBodyY = 0.095;
        pitchZ = -0.08;
        bodyRef.current.rotation.x = Math.sin(t * 22) * 0.035; // lateral hip roll
      } else {
        // Subtle natural body roll during walk (along spine axis)
        bodyRef.current.rotation.x = Math.sin(walkPhase.current) * 0.025 * walk;
      }

      // Vertical stride bobbing
      const walkBob = walk * Math.abs(Math.sin(walkPhase.current * 2)) * 0.01;
      bodyRef.current.position.y = baseBodyY + walkBob;
      bodyRef.current.rotation.z = pitchZ;
      bodyRef.current.scale.y = 1 + breath;
      bodyRef.current.scale.x = 1 - breath * 0.2;

      if (purring) {
        // Blissful purring micro-vibration
        bodyRef.current.position.y += Math.sin(t * 48) * 0.0025;
      }
    }

    // ── 4. LIMB KINEMATICS & SITTING / WALKING HARMONY ──
    const phase = walkPhase.current;

    if (sit > 0.3) {
      // ── IDEAL SITTING LIMB ALIGNMENT ──
      // Front legs straight down, planted side-by-side on the sofa cushion
      // Rear haunches folded flat on cushion
      if (legFLRef.current) {
        legFLRef.current.position.set(0.08, -0.055, 0.04);
        legFLRef.current.rotation.z = dampedLerp(legFLRef.current.rotation.z, 0, 8, dt);
        legFLRef.current.rotation.x = 0;
      }
      if (legFRRef.current) {
        legFRRef.current.position.set(0.08, -0.055, 0.10);
        legFRRef.current.rotation.z = dampedLerp(legFRRef.current.rotation.z, 0, 8, dt);
        legFRRef.current.rotation.x = 0;
      }
      if (legBLRef.current) {
        legBLRef.current.position.set(-0.11, -0.065, -0.06);
        legBLRef.current.rotation.z = dampedLerp(legBLRef.current.rotation.z, 0.25, 8, dt);
        legBLRef.current.rotation.x = 0;
      }
      if (legBRRef.current) {
        legBRRef.current.position.set(-0.11, -0.065, 0.08);
        legBRRef.current.rotation.z = dampedLerp(legBRRef.current.rotation.z, 0.25, 8, dt);
        legBRRef.current.rotation.x = 0;
      }
    } else if (lean > 0.1) {
      // ── LEANING OVER BACKREST: Front paws placed on back cushion ──
      if (legFLRef.current) {
        legFLRef.current.position.set(0.08, 0.07 * lean, -0.07 * lean);
        legFLRef.current.rotation.z = -0.48 * lean;
        legFLRef.current.rotation.x = 0;
      }
      if (legFRRef.current) {
        legFRRef.current.position.set(0.08, 0.07 * lean, -0.07 * lean);
        legFRRef.current.rotation.z = -0.48 * lean;
        legFRRef.current.rotation.x = 0;
      }
      if (legBLRef.current) {
        legBLRef.current.rotation.z = 0.22 * lean;
        legBLRef.current.rotation.x = 0;
      }
      if (legBRRef.current) {
        legBRRef.current.rotation.z = 0.22 * lean;
        legBRRef.current.rotation.x = 0;
      }
    } else {
      // ── WALKING / STALKING GAIT (4-beat feline sequence along spine direction) ──
      const swingFL = Math.sin(phase) * 0.36 * walk;
      const swingFR = Math.sin(phase + Math.PI) * 0.36 * walk;
      const swingBL = Math.sin(phase + Math.PI * 0.5) * 0.28 * walk;
      const swingBR = Math.sin(phase + Math.PI * 1.5) * 0.28 * walk;

      // Vertical paw lift during swing phase
      const liftFL = Math.max(0, Math.sin(phase)) * 0.02 * walk;
      const liftFR = Math.max(0, Math.sin(phase + Math.PI)) * 0.02 * walk;
      const liftBL = Math.max(0, Math.sin(phase + Math.PI * 0.5)) * 0.016 * walk;
      const liftBR = Math.max(0, Math.sin(phase + Math.PI * 1.5)) * 0.016 * walk;

      if (legFLRef.current) {
        legFLRef.current.position.set(0.08, -0.045 + liftFL, 0.04);
        legFLRef.current.rotation.z = -swingFL;
        legFLRef.current.rotation.x = 0;
      }
      if (legFRRef.current) {
        legFRRef.current.position.set(0.08, -0.045 + liftFR, 0.10);
        legFRRef.current.rotation.z = -swingFR;
        legFRRef.current.rotation.x = 0;
      }
      if (legBLRef.current) {
        legBLRef.current.position.set(-0.11, -0.035 + liftBL, -0.06);
        legBLRef.current.rotation.z = -swingBL;
        legBLRef.current.rotation.x = 0;
      }
      if (legBRRef.current) {
        legBRRef.current.position.set(-0.11, -0.035 + liftBR, 0.08);
        legBRRef.current.rotation.z = -swingBR;
        legBRRef.current.rotation.x = 0;
      }

      // Swatting physics when close to laser
      if (leanState.current === "swat") {
        swatProgress.current = Math.min(1, swatProgress.current + dt * 6.0);
        if (Date.now() - lastChirpRef.current > 1600) {
          playLaserChirp();
          lastChirpRef.current = Date.now();
        }
      } else {
        swatProgress.current = Math.max(0, swatProgress.current - dt * 4.5);
      }

      if (pawFRRef.current) {
        const swat = swatProgress.current;
        pawFRRef.current.position.x = swat * 0.12;
        pawFRRef.current.position.y = Math.sin(swat * Math.PI) * 0.055;
        pawFRRef.current.rotation.z = swat * 0.35;
      }
    }

    // ── 5. HEAD TRACKING & REGAL EXPRESSIONS ──
    if (headRef.current) {
      if (isLaserActive) {
        if (lean > 0.1) {
          // Peering over the backrest cushion
          headRef.current.position.set(0.18, 0.18 + lean * 0.06, 0.05);
          headRef.current.rotation.z = 0.15 + Math.sin(t * 3.5) * 0.02;
          headRef.current.rotation.x = 0;
        } else if (lean < -0.1) {
          // Peering over front sofa rim
          headRef.current.position.set(0.19, 0.08, 0.06);
          headRef.current.rotation.z = -0.22 + Math.sin(t * 3.5) * 0.02;
          headRef.current.rotation.x = 0;
        } else {
          headRef.current.position.set(0.17, 0.12, 0.06);
          headRef.current.rotation.z = -0.06 + Math.sin(t * 3.5) * 0.02;
          headRef.current.rotation.x = Math.sin(t * 2.0) * 0.03;
        }
      } else if (isYarnActive) {
        // Peering down attentively at the rolling yarn ball on the living room rug
        headRef.current.position.set(0.18, 0.11, 0.05);
        headRef.current.rotation.z = -0.20 + Math.sin(t * 3.5) * 0.025;
        headRef.current.rotation.x = Math.sin(t * 2.2) * 0.035;
      } else {
        // Ideal sitting pose: head held high & regal with gentle purr / breathing sway
        headRef.current.position.set(0.16, 0.155, 0.05);
        const purrNuzzle = purring ? Math.sin(t * 6) * 0.06 : 0;
        headRef.current.rotation.z = 0.04 + Math.sin(breathRef.current * 0.9) * 0.025;
        headRef.current.rotation.x = purrNuzzle + Math.cos(breathRef.current * 0.7) * 0.02;
      }
    }

    // Expressive Ears
    if (earLRef.current) {
      const earTwitch = isLaserActive || isYarnActive ? Math.sin(t * 8.5) * 0.06 : Math.sin(t * 1.15) > 0.95 ? Math.sin(t * 35) * 0.18 : 0;
      earLRef.current.rotation.z = (isYarnActive ? 0.22 : 0.28) + earTwitch;
    }
    if (earRRef.current) {
      const earTwitch = isLaserActive || isYarnActive ? Math.sin(t * 7.2) * 0.05 : Math.sin(t * 1.4) > 0.96 ? Math.sin(t * 32) * 0.16 : 0;
      earRRef.current.rotation.z = (isYarnActive ? -0.22 : -0.28) - earTwitch;
    }

    // Collar Bell Swing
    if (bellRef.current) {
      const bellSway = walk > 0.1 ? Math.sin(walkPhase.current) * 0.20 : Math.sin(t * 2.4) * 0.04;
      bellRef.current.rotation.z = bellSway;
    }

    // ── 6. FLUID 4-SEGMENT PERSIAN TAIL ──
    if (tailSeg1.current && tailSeg2.current && tailSeg3.current) {
      if (isLaserActive) {
        // High alert question-mark hunting arch with excited wag
        const excitedWag = Math.sin(t * 8) * 0.24;
        tailSeg1.current.rotation.set(-0.55, 0, excitedWag * 0.5);
        tailSeg2.current.rotation.set(-0.45, 0, excitedWag * 0.7);
        tailSeg3.current.rotation.set(0.38, 0, excitedWag * 1.0);
      } else if (isYarnActive) {
        // Inquisitive rhythmic tail flick while watching yarn roll
        const flick = Math.sin(t * 5.5) * 0.16;
        tailSeg1.current.rotation.set(-0.1, 0.4 + flick, -0.3);
        tailSeg2.current.rotation.set(0.05, 0.5 + flick * 1.2, -0.2);
        tailSeg3.current.rotation.set(0.2, 0.6 + flick * 1.5, -0.1);
      } else {
        // Ideal sitting pose: tail curls neatly around front paws
        const tailPurr = purring ? Math.sin(t * 10) * 0.06 : Math.sin(t * 0.9) * 0.04;
        tailSeg1.current.rotation.set(0.25, 0.65 + tailPurr, -0.45);
        tailSeg2.current.rotation.set(0.15, 0.75, -0.35);
        tailSeg3.current.rotation.set(0.08, 0.85, -0.25);
      }
    }

    // Floating heart when purring
    if (heartRef.current && purring) {
      const progress = 1 - purrTimer.current / 2.8;
      heartRef.current.position.y = 0.38 + progress * 0.28;
      heartRef.current.position.x = 0.14 + Math.sin(progress * Math.PI * 3) * 0.04;
      heartRef.current.scale.setScalar(Math.sin(progress * Math.PI) * 1.15);
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
        {/* ── MAIN PERSIAN TORSO (Plush rounded ribcage with fur texture) ── */}
        <mesh castShadow position={[0.02, 0.03, 0]} scale={[1.22, 0.96, 1.02]}>
          <sphereGeometry args={[0.16, 24, 20]} />
          <meshStandardMaterial
            map={furMap ?? undefined}
            color={furMap ? (hovered ? "#fff2e2" : "#fef6ee") : (hovered ? "#f5b878" : PERSIAN_GOLD)}
            roughness={0.65}
            metalness={0.02}
            emissive="#784010"
            emissiveIntensity={0.09}
          />
        </mesh>

        {/* ── PLUSH PERSIAN CHEST RUFF (Lion-like cream mane) ── */}
        <mesh position={[0.09, 0.015, 0.035]} scale={[0.88, 0.75, 0.82]}>
          <sphereGeometry args={[0.138, 18, 16]} />
          <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.94} metalness={0} />
        </mesh>

        {/* ── LOWER PELVIS & SOFT HIND FLANKS ── */}
        <mesh castShadow position={[-0.1, 0.01, 0]} scale={[1.08, 0.88, 0.98]}>
          <sphereGeometry args={[0.145, 18, 16]} />
          <meshStandardMaterial
            map={furMap ?? undefined}
            color={furMap ? (hovered ? "#fff2e2" : "#fef6ee") : (hovered ? "#f5b878" : PERSIAN_GOLD)}
            roughness={0.65}
            emissive="#784010"
            emissiveIntensity={0.09}
          />
        </mesh>

        {/* ── SOFT PERSIAN SABLE ACCENTS ACROSS DORSAL SPINE ── */}
        {[-0.10, 0.0, 0.06].map((xOff, idx) => (
          <mesh key={idx} position={[xOff, 0.116, 0]} scale={[0.09, 0.015, 0.55]}>
            <sphereGeometry args={[0.10, 8, 8]} />
            <meshStandardMaterial color={PERSIAN_DARK} roughness={0.7} opacity={0.18} transparent />
          </mesh>
        ))}

        {/* ── ELEGANT VELVET COLLAR WITH POLISHED BELL ── */}
        <group position={[0.14, 0.065, 0.035]} rotation={[0.2, -0.4, 0]}>
          <mesh>
            <torusGeometry args={[0.078, 0.009, 8, 24]} />
            <meshStandardMaterial color={COLLAR_TEAL} roughness={0.35} metalness={0.15} />
          </mesh>
          <mesh ref={bellRef} position={[0.08, -0.038, 0]}>
            <sphereGeometry args={[0.014, 12, 12]} />
            <meshStandardMaterial
              color={BELL_GOLD}
              roughness={0.18}
              metalness={0.95}
            />
          </mesh>
        </group>

        {/* ── SCULPTED PERSIAN FELINE HEAD ── */}
        <group ref={headRef} position={[0.17, 0.13, 0.05]}>
          {/* Broad, sweet rounded Persian cranium */}
          <mesh castShadow scale={[1.08, 0.98, 1.04]}>
            <sphereGeometry args={[0.108, 22, 18]} />
            <meshStandardMaterial
              map={furMap ?? undefined}
              color={furMap ? (hovered ? "#fff2e2" : "#fef6ee") : (hovered ? "#f5b878" : PERSIAN_GOLD)}
              roughness={0.65}
              metalness={0.02}
              emissive="#784010"
              emissiveIntensity={0.09}
            />
          </mesh>

          {/* Gentle forehead shading */}
          <mesh position={[0.076, 0.068, 0.025]} scale={[0.04, 0.016, 0.065]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={PERSIAN_DARK} roughness={0.9} opacity={0.20} transparent />
          </mesh>

          {/* Soft Snub Nasal Bridge (Persian sweet facial contour) */}
          <mesh position={[0.086, 0.008, 0.022]} rotation={[0, 0, -0.42]} scale={[0.55, 1.0, 0.52]}>
            <boxGeometry args={[0.042, 0.048, 0.042]} />
            <meshStandardMaterial
              map={furMap ?? undefined}
              color={furMap ? "#ffffff" : PERSIAN_GOLD}
              roughness={0.7}
              emissive="#522c0c"
              emissiveIntensity={0.10}
            />
          </mesh>

          {/* Chubby Cream Persian Cheek Ruffs */}
          <mesh position={[0.052, -0.02, 0.075]} scale={[0.74, 0.56, 0.62]}>
            <sphereGeometry args={[0.062, 12, 10]} />
            <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.94} />
          </mesh>
          <mesh position={[0.052, -0.02, -0.035]} scale={[0.74, 0.56, 0.62]}>
            <sphereGeometry args={[0.062, 12, 10]} />
            <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.94} />
          </mesh>

          {/* Dual Cream Whisker Pads (Puff Muzzle) */}
          <group position={[0.093, -0.016, 0.022]}>
            <mesh position={[0, 0, 0.019]} scale={[0.62, 0.48, 0.48]}>
              <sphereGeometry args={[0.042, 12, 10]} />
              <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.94} />
            </mesh>
            <mesh position={[0, 0, -0.019]} scale={[0.62, 0.48, 0.48]}>
              <sphereGeometry args={[0.042, 12, 10]} />
              <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.94} />
            </mesh>
          </group>

          {/* Cute Dusty Rose Nose Leather */}
          <mesh position={[0.118, -0.005, 0.022]} scale={[0.78, 0.88, 1.05]}>
            <coneGeometry args={[0.012, 0.014, 3]} />
            <meshStandardMaterial color={NOSE_PINK} roughness={0.65} />
          </mesh>

          {/* 6 Curved White Whiskers */}
          {[-0.012, 0.0, 0.012].map((yOff, wIdx) => (
            <group key={wIdx}>
              {/* Left whiskers */}
              <mesh
                position={[0.10, -0.02 + yOff, 0.055]}
                rotation={[0, 0.28, yOff * 3.8]}
              >
                <boxGeometry args={[0.085, 0.0012, 0.0012]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              {/* Right whiskers */}
              <mesh
                position={[0.10, -0.02 + yOff, -0.012]}
                rotation={[0, -0.28, -yOff * 3.8]}
              >
                <boxGeometry args={[0.085, 0.0012, 0.0012]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          ))}

          {/* ── EYES: Deep Copper Persian Eyes (Hunting) vs Peaceful Slits (Sitting) ── */}
          {isLaserActive ? (
            <group>
              {/* Left Eye */}
              <group position={[0.082, 0.035, 0.058]} rotation={[0, 0.26, 0]}>
                <mesh scale={[1.05, 1.18, 1.05]}>
                  <sphereGeometry args={[0.017, 14, 14]} />
                  <meshBasicMaterial color="#1a0c04" />
                </mesh>
                <mesh position={[0.004, 0, 0]}>
                  <sphereGeometry args={[0.015, 14, 14]} />
                  <meshStandardMaterial
                    color={EYE_COPPER}
                    emissive="#92400e"
                    emissiveIntensity={0.35}
                    roughness={0.15}
                    metalness={0.1}
                  />
                </mesh>
                <mesh position={[0.012, 0, 0]}>
                  <boxGeometry args={[0.0035, 0.021, 0.0055]} />
                  <meshBasicMaterial color="#080808" />
                </mesh>
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
              <group position={[0.082, 0.035, -0.015]} rotation={[0, -0.22, 0]}>
                <mesh scale={[1.05, 1.18, 1.05]}>
                  <sphereGeometry args={[0.017, 14, 14]} />
                  <meshBasicMaterial color="#1a0c04" />
                </mesh>
                <mesh position={[0.004, 0, 0]}>
                  <sphereGeometry args={[0.015, 14, 14]} />
                  <meshStandardMaterial
                    color={EYE_COPPER}
                    emissive="#92400e"
                    emissiveIntensity={0.35}
                    roughness={0.15}
                    metalness={0.1}
                  />
                </mesh>
                <mesh position={[0.012, 0, 0]}>
                  <boxGeometry args={[0.0035, 0.021, 0.0055]} />
                  <meshBasicMaterial color="#080808" />
                </mesh>
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
            /* Peaceful Sleeping/Resting Curved Eye Slits */
            <group>
              <mesh position={[0.078, 0.032, 0.062]} rotation={[0, 0.35, 0.1]}>
                <boxGeometry args={[0.024, 0.004, 0.003]} />
                <meshStandardMaterial color="#2a1204" roughness={0.9} />
              </mesh>
              <mesh position={[0.078, 0.032, -0.018]} rotation={[0, -0.25, 0.1]}>
                <boxGeometry args={[0.024, 0.004, 0.003]} />
                <meshStandardMaterial color="#2a1204" roughness={0.9} />
              </mesh>
            </group>
          )}

          {/* ── SMALL ROUNDED PLUSH PERSIAN EARS ── */}
          {/* Left Ear */}
          <group ref={earLRef} position={[0.012, 0.092, 0.058]} rotation={[-0.16, 0.26, 0.28]}>
            <mesh castShadow scale={[1.05, 1.05, 0.75]}>
              <coneGeometry args={[0.035, 0.060, 4]} />
              <meshStandardMaterial color={PERSIAN_GOLD} roughness={0.7} emissive="#784010" emissiveIntensity={0.09} />
            </mesh>
            <mesh position={[0, 0, 0.004]} scale={[0.68, 0.70, 0.55]}>
              <coneGeometry args={[0.030, 0.050, 4]} />
              <meshStandardMaterial color={EAR_INNER} roughness={0.95} />
            </mesh>
            {/* White ear fluff tuft */}
            <mesh position={[0, -0.012, 0.006]} scale={[0.48, 0.38, 0.42]}>
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshBasicMaterial color={PERSIAN_CREAM} />
            </mesh>
          </group>

          {/* Right Ear */}
          <group ref={earRRef} position={[-0.028, 0.092, -0.042]} rotation={[-0.16, -0.30, -0.28]}>
            <mesh castShadow scale={[1.05, 1.05, 0.75]}>
              <coneGeometry args={[0.035, 0.060, 4]} />
              <meshStandardMaterial color={PERSIAN_GOLD} roughness={0.7} emissive="#784010" emissiveIntensity={0.09} />
            </mesh>
            <mesh position={[0, 0, 0.004]} scale={[0.68, 0.70, 0.55]}>
              <coneGeometry args={[0.030, 0.050, 4]} />
              <meshStandardMaterial color={EAR_INNER} roughness={0.95} />
            </mesh>
            {/* White ear fluff tuft */}
            <mesh position={[0, -0.012, 0.006]} scale={[0.48, 0.38, 0.42]}>
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshBasicMaterial color={PERSIAN_CREAM} />
            </mesh>
          </group>
        </group>

        {/* ── ARTICULATED LIMBS WITH WARM CREAM MITTENS & PINK TOE PADS ── */}
        {/* Front Left Leg */}
        <group ref={legFLRef} position={[0.08, -0.055, 0.04]}>
          <mesh castShadow scale={[0.9, 1.15, 0.9]}>
            <cylinderGeometry args={[0.022, 0.024, 0.085, 10]} />
            <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.9} />
          </mesh>
          <mesh position={[0.012, -0.042, 0]} scale={[1.15, 0.55, 1.1]} castShadow>
            <sphereGeometry args={[0.028, 10, 10]} />
            <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.9} />
          </mesh>
          {/* Pink toe beans */}
          <mesh position={[0.022, -0.053, 0]} scale={[0.7, 0.28, 0.7]}>
            <sphereGeometry args={[0.013, 8, 8]} />
            <meshStandardMaterial color={TOE_BEANS} roughness={0.8} />
          </mesh>
        </group>

        {/* Front Right Leg (Interactive swatting limb) */}
        <group ref={legFRRef} position={[0.08, -0.055, 0.10]}>
          <group ref={pawFRRef}>
            <mesh castShadow scale={[0.9, 1.15, 0.9]}>
              <cylinderGeometry args={[0.022, 0.024, 0.085, 10]} />
              <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.9} />
            </mesh>
            <mesh position={[0.012, -0.042, 0]} scale={[1.15, 0.55, 1.1]} castShadow>
              <sphereGeometry args={[0.028, 10, 10]} />
              <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.9} />
            </mesh>
            {/* Pink toe beans */}
            <mesh position={[0.022, -0.053, 0]} scale={[0.7, 0.28, 0.7]}>
              <sphereGeometry args={[0.013, 8, 8]} />
              <meshStandardMaterial color={TOE_BEANS} roughness={0.8} />
            </mesh>
          </group>
        </group>

        {/* Back Left Haunch & Thigh (With folded hock joint) */}
        <group ref={legBLRef} position={[-0.11, -0.065, -0.06]}>
          <mesh castShadow scale={[1.28, 1.15, 0.98]}>
            <sphereGeometry args={[0.058, 14, 12]} />
            <meshStandardMaterial color={PERSIAN_GOLD} roughness={0.7} emissive="#784010" emissiveIntensity={0.09} />
          </mesh>
          {/* Hock to foot */}
          <mesh position={[0.01, -0.038, 0.02]} scale={[0.88, 0.48, 1.1]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.9} />
          </mesh>
        </group>

        {/* Back Right Haunch & Thigh */}
        <group ref={legBRRef} position={[-0.11, -0.065, 0.08]}>
          <mesh castShadow scale={[1.28, 1.15, 0.98]}>
            <sphereGeometry args={[0.058, 14, 12]} />
            <meshStandardMaterial color={PERSIAN_GOLD} roughness={0.7} emissive="#784010" emissiveIntensity={0.09} />
          </mesh>
          <mesh position={[0.01, -0.038, 0.02]} scale={[0.88, 0.48, 1.1]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.9} />
          </mesh>
        </group>

        {/* ── PLUSH FLUFFY PERSIAN TAIL ── */}
        <group position={[-0.17, 0.06, -0.02]}>
          <group ref={tailSeg1}>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.025, 0.028, 0.08, 10]} />
              <meshStandardMaterial color={PERSIAN_GOLD} roughness={0.7} emissive="#784010" emissiveIntensity={0.09} />
            </mesh>
            <group ref={tailSeg2} position={[0, 0.08, 0]}>
              <mesh position={[0, 0.04, 0]}>
                <cylinderGeometry args={[0.022, 0.025, 0.08, 10]} />
                <meshStandardMaterial color={PERSIAN_GOLD} roughness={0.7} emissive="#784010" emissiveIntensity={0.09} />
              </mesh>
              <group ref={tailSeg3} position={[0, 0.08, 0]}>
                <mesh position={[0, 0.035, 0]}>
                  <cylinderGeometry args={[0.018, 0.022, 0.07, 10]} />
                  <meshStandardMaterial color={PERSIAN_GOLD} roughness={0.7} emissive="#784010" emissiveIntensity={0.09} />
                </mesh>
                {/* Fluffy Cream Feathered Tip */}
                <mesh ref={tailTip} position={[0, 0.08, 0]}>
                  <sphereGeometry args={[0.028, 12, 10]} />
                  <meshStandardMaterial color={PERSIAN_CREAM} roughness={0.94} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* ── CLEAN FLOATING DIALOGUE BADGE ── */}
      <Billboard
        position={[0.04, 0.42, 0.04]}
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
