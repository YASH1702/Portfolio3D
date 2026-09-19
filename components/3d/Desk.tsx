"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import Monitor from "./Monitor";
import SteamParticles from "./SteamParticles";
import { useStudio } from "@/context/StudioContext";
import { playCoffeeSip } from "@/lib/soundEffects";

/**
 * Desk — a modern, high-fidelity developer workstation.
 *
 * Upgraded with realistic studio audio monitors, leather desk mat,
 * coiled mechanical keyboard aviator cable, aluminum headphone stand
 * with over-ear studio headphones, smartphone, and interactive lamp.
 *
 * Position: [2.2, 0, -1.2] — right side of room, slightly angled.
 */

const WOOD      = "#c4985e";
const METAL     = "#181818";
const LAMP_BODY = "#282828";
const NOTEBOOK  = "#f0ede5";
const CUP       = "#d4c5a0";

export default function Desk() {
  const { isLampOn, toggleLamp, isNightMode, isLaserActive, toggleLaser } = useStudio();
  const lampHeadRef = useRef<THREE.Group>(null!);
  const [lampHovered, setLampHovered] = useState(false);
  const [laserPenHovered, setLaserPenHovered] = useState(false);
  const lampBounce = useRef(0);

  const handleLampEnter = (e: any) => {
    e.stopPropagation();
    setLampHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handleLampLeave = (e: any) => {
    e.stopPropagation();
    setLampHovered(false);
    document.body.style.cursor = "default";
  };

  const handleLampClick = (e: any) => {
    e.stopPropagation();
    lampBounce.current = 1.0;
    toggleLamp();
  };

  const [mugHovered, setMugHovered] = useState(false);
  const [sipping, setSipping] = useState(false);
  const sipTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMugClick = (e: any) => {
    e.stopPropagation();
    playCoffeeSip();
    setSipping(true);
    if (sipTimer.current) clearTimeout(sipTimer.current);
    sipTimer.current = setTimeout(() => {
      setSipping(false);
    }, 2400);
  };

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (lampBounce.current > 0) {
      lampBounce.current = Math.max(0, lampBounce.current - dt * 4.0);
    }
    if (lampHeadRef.current) {
      const clickSpring = Math.sin(lampBounce.current * Math.PI) * 0.06;
      lampHeadRef.current.rotation.x = 0.8 + clickSpring;
    }
  });

  return (
    <group name="desk" position={[2.2, 0, -1.2]} rotation={[0, -0.08, 0]}>

      {/* ── SURFACE ── */}
      <mesh castShadow receiveShadow position={[0, 0.74, 0]}>
        <boxGeometry args={[1.7, 0.042, 0.78]} />
        <meshStandardMaterial color={WOOD} roughness={0.38} metalness={0.04} />
      </mesh>

      {/* Surface edge banding — front */}
      <mesh position={[0, 0.74, 0.395]}>
        <boxGeometry args={[1.7, 0.042, 0.01]} />
        <meshStandardMaterial color="#b08840" roughness={0.4} metalness={0} />
      </mesh>

      {/* ── LEGS ── hairpin style — 4 corners ── */}
      {[
        [-0.76, 0.37,  0.34],
        [ 0.76, 0.37,  0.34],
        [-0.76, 0.37, -0.34],
        [ 0.76, 0.37, -0.34],
      ].map((pos, i) => (
        <mesh key={i} castShadow position={pos as [number, number, number]}>
          <boxGeometry args={[0.035, 0.74, 0.035]} />
          <meshStandardMaterial color={METAL} roughness={0.25} metalness={0.85} />
        </mesh>
      ))}

      {/* ── LEATHER DESK MAT / BLOTTER WITH STITCHED PERIMETER ── */}
      <group position={[0.1, 0.762, 0.08]}>
        {/* Main dark charcoal leather mat */}
        <mesh receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.82, 0.003, 0.38]} />
          <meshStandardMaterial color="#1c1b18" roughness={0.85} metalness={0.05} />
        </mesh>
        {/* Subtle stitched perimeter edge */}
        <mesh position={[0, 0.002, 0]}>
          <boxGeometry args={[0.80, 0.001, 0.36]} />
          <meshBasicMaterial color="#332e28" />
        </mesh>
      </group>

      {/* ── MONITOR (CLICKABLE DISPLAY) ── */}
      <Monitor position={[-0.08, 0.76, -0.16]} />

      {/* ── STUDIO AUDIO MONITORS (DESK SPEAKERS FLANKING DISPLAY) ── */}
      {/* Left Speaker */}
      <group position={[-0.52, 0.762, -0.16]} rotation={[0, 0.28, 0]} name="speaker-left">
        {/* Angled foam isolation wedge base */}
        <mesh castShadow position={[0, 0.008, 0]}>
          <boxGeometry args={[0.11, 0.016, 0.13]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {/* Speaker cabinet */}
        <mesh castShadow position={[0, 0.10, 0]}>
          <boxGeometry args={[0.10, 0.18, 0.12]} />
          <meshStandardMaterial color="#151413" roughness={0.35} metalness={0.2} />
        </mesh>
        {/* Front baffle */}
        <mesh position={[0, 0.10, 0.061]}>
          <planeGeometry args={[0.092, 0.17]} />
          <meshStandardMaterial color="#1e1d1b" roughness={0.5} />
        </mesh>
        {/* Tweeter dome */}
        <mesh position={[0, 0.145, 0.063]}>
          <circleGeometry args={[0.014, 16]} />
          <meshStandardMaterial color="#d4a855" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Main woofer cone */}
        <mesh position={[0, 0.065, 0.063]}>
          <circleGeometry args={[0.028, 18]} />
          <meshStandardMaterial color="#222222" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.065, 0.064]}>
          <circleGeometry args={[0.01, 14]} />
          <meshStandardMaterial color="#c49845" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Right Speaker */}
      <group position={[0.36, 0.762, -0.16]} rotation={[0, -0.28, 0]} name="speaker-right">
        {/* Angled foam isolation wedge base */}
        <mesh castShadow position={[0, 0.008, 0]}>
          <boxGeometry args={[0.11, 0.016, 0.13]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {/* Speaker cabinet */}
        <mesh castShadow position={[0, 0.10, 0]}>
          <boxGeometry args={[0.10, 0.18, 0.12]} />
          <meshStandardMaterial color="#151413" roughness={0.35} metalness={0.2} />
        </mesh>
        {/* Front baffle */}
        <mesh position={[0, 0.10, 0.061]}>
          <planeGeometry args={[0.092, 0.17]} />
          <meshStandardMaterial color="#1e1d1b" roughness={0.5} />
        </mesh>
        {/* Tweeter dome */}
        <mesh position={[0, 0.145, 0.063]}>
          <circleGeometry args={[0.014, 16]} />
          <meshStandardMaterial color="#d4a855" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Main woofer cone */}
        <mesh position={[0, 0.065, 0.063]}>
          <circleGeometry args={[0.028, 18]} />
          <meshStandardMaterial color="#222222" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.065, 0.064]}>
          <circleGeometry args={[0.01, 14]} />
          <meshStandardMaterial color="#c49845" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* ── ALUMINUM HEADPHONE STAND WITH STUDIO HEADPHONES (Left side of desk) ── */}
      <group position={[-0.72, 0.762, 0.08]} rotation={[0, 0.35, 0]} name="headphones-stand">
        {/* Solid weighted aluminum base */}
        <mesh castShadow position={[0, 0.006, 0]}>
          <cylinderGeometry args={[0.045, 0.048, 0.012, 16]} />
          <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Slender aluminum curved upright stem */}
        <mesh castShadow position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.23, 8]} />
          <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Top curved headphone rest cradle */}
        <mesh position={[0, 0.235, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.05, 12, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
        {/* Over-ear studio headphones resting on stand */}
        <group position={[0, 0.18, 0]}>
          {/* Headband curve */}
          <mesh castShadow position={[0, 0.05, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.042, 0.007, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#111111" roughness={0.6} />
          </mesh>
          {/* Left ear cup */}
          <mesh castShadow position={[-0.044, 0.0, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.018, 14]} />
            <meshStandardMaterial color="#1e1d1b" roughness={0.4} metalness={0.4} />
          </mesh>
          {/* Right ear cup */}
          <mesh castShadow position={[0.044, 0.0, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.018, 14]} />
            <meshStandardMaterial color="#1e1d1b" roughness={0.4} metalness={0.4} />
          </mesh>
        </group>
      </group>

      {/* ── KEYBOARD ── */}
      <mesh castShadow position={[-0.02, 0.768, 0.1]}>
        <boxGeometry args={[0.38, 0.011, 0.14]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.65} metalness={0.12} />
      </mesh>
      {/* Keyboard key rows */}
      {[0.06, 0.0, -0.06].map((z, i) => (
        <mesh key={i} position={[-0.02, 0.774, 0.1 + z]}>
          <boxGeometry args={[0.34, 0.003, 0.02]} />
          <meshStandardMaterial color="#252525" roughness={0.7} metalness={0} />
        </mesh>
      ))}

      {/* ── COILED MECHANICAL KEYBOARD AVIATOR CABLE ── */}
      <group position={[-0.02, 0.766, 0.0]}>
        {/* Straight cable connector to keyboard */}
        <mesh position={[0, 0, 0.02]}>
          <cylinderGeometry args={[0.0025, 0.0025, 0.03, 6]} />
          <meshStandardMaterial color="#111111" roughness={0.7} />
        </mesh>
        {/* Silver metal aviator quick-disconnect collar */}
        <mesh position={[0, 0, -0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.018, 10]} />
          <meshStandardMaterial color="#cccccc" roughness={0.25} metalness={0.9} />
        </mesh>
        {/* Coiled cable helix loops */}
        {Array.from({ length: 8 }).map((_, cIdx) => (
          <mesh key={cIdx} position={[-0.06 + cIdx * 0.015, 0.006, -0.04]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.007, 0.0025, 6, 12]} />
            <meshStandardMaterial color="#2a2824" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* ── MOUSE ── */}
      <mesh castShadow position={[0.28, 0.768, 0.08]}>
        <boxGeometry args={[0.068, 0.016, 0.115]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.18} />
      </mesh>

      {/* ── SMARTPHONE (Lying on desk with subtle screen glance) ── */}
      <group position={[0.42, 0.764, 0.22]} rotation={[0, -0.15, 0]} name="smartphone">
        {/* Dark body / aluminum frame */}
        <mesh castShadow>
          <boxGeometry args={[0.075, 0.008, 0.15]} />
          <meshStandardMaterial color="#111111" roughness={0.25} metalness={0.75} />
        </mesh>
        {/* OLED screen face */}
        <mesh position={[0, 0.0045, 0]}>
          <planeGeometry args={[0.07, 0.144]} />
          <meshStandardMaterial
            color="#080b12"
            emissive={isNightMode ? "#1a2542" : "#0f1628"}
            emissiveIntensity={isNightMode ? 0.35 : 0.18}
            roughness={0.1}
          />
        </mesh>
        {/* Lockscreen clock bar */}
        <mesh position={[0, 0.0048, -0.04]}>
          <planeGeometry args={[0.038, 0.008]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.65} />
        </mesh>
      </group>

      {/* ── INTERACTIVE DESK LAMP (CLICKABLE TOGGLE) ── */}
      <group
        position={[0.68, 0.762, -0.25]}
        onPointerEnter={handleLampEnter}
        onPointerLeave={handleLampLeave}
        onClick={handleLampClick}
      >
        {/* Base disc */}
        <mesh castShadow>
          <cylinderGeometry args={[0.065, 0.072, 0.018, 14]} />
          <meshStandardMaterial
            color={lampHovered ? "#3c3830" : LAMP_BODY}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        {/* Lower arm */}
        <mesh castShadow position={[0, 0.18, 0]} rotation={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.009, 0.009, 0.36, 6]} />
          <meshStandardMaterial color={LAMP_BODY} roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Upper arm */}
        <mesh castShadow position={[0.02, 0.4, -0.04]} rotation={[-0.4, 0.1, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.28, 6]} />
          <meshStandardMaterial color={LAMP_BODY} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Lamp Head Group (Animated on click) */}
        <group ref={lampHeadRef} position={[0.04, 0.56, -0.06]}>
          {/* Shade */}
          <mesh castShadow>
            <coneGeometry args={[0.072, 0.11, 14, 1, true]} />
            <meshStandardMaterial
              color="#e8e0cc"
              roughness={0.55}
              metalness={0.08}
              side={2}
            />
          </mesh>
          {/* Inner cone — illuminates when lamp is on */}
          <mesh>
            <coneGeometry args={[0.065, 0.1, 14, 1, true]} />
            <meshStandardMaterial
              color="#ffd080"
              emissive={isLampOn ? "#ffaa30" : "#221808"}
              emissiveIntensity={isLampOn ? 0.75 : 0.0}
              roughness={0.6}
              metalness={0}
              side={2}
            />
          </mesh>
        </group>
      </group>

      {/* ── NOTEBOOK ── */}
      <group position={[0.54, 0.762, 0.06]} rotation={[0, 0.18, 0]}>
        {/* Book body */}
        <mesh castShadow>
          <boxGeometry args={[0.21, 0.011, 0.155]} />
          <meshStandardMaterial color={NOTEBOOK} roughness={0.95} metalness={0} />
        </mesh>
        {/* Cover stripe */}
        <mesh position={[-0.08, 0.007, 0]}>
          <boxGeometry args={[0.04, 0.012, 0.155]} />
          <meshStandardMaterial color="#c0b8a0" roughness={0.9} metalness={0} />
        </mesh>
      </group>

      {/* ── INTERACTIVE RED LASER POINTER PEN ── */}
      <group
        position={[0.67, 0.772, 0.08]}
        rotation={[0, 0.28, Math.PI / 2]}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setLaserPenHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setLaserPenHovered(false);
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          toggleLaser();
        }}
      >
        {/* Invisible hit cylinder */}
        <mesh visible={false}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* Anodized metallic barrel */}
        <mesh castShadow>
          <cylinderGeometry args={[0.0065, 0.0065, 0.15, 16]} />
          <meshStandardMaterial
            color={laserPenHovered ? "#2e3440" : "#1a1c23"}
            roughness={0.25}
            metalness={0.85}
          />
        </mesh>

        {/* Silver pocket clip */}
        <mesh position={[0.008, 0.02, 0]}>
          <boxGeometry args={[0.002, 0.06, 0.004]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Brass aperture tip */}
        <mesh position={[0, -0.076, 0]}>
          <cylinderGeometry args={[0.0055, 0.0065, 0.012, 16]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Glowing laser crystal diode at tip */}
        <mesh position={[0, -0.083, 0]}>
          <sphereGeometry args={[0.0035, 10, 10]} />
          <meshBasicMaterial color={isLaserActive ? "#ff0033" : "#4a0404"} />
        </mesh>

        {/* Metallic push button on top */}
        <mesh position={[0, 0.077, 0]}>
          <cylinderGeometry args={[0.0045, 0.0045, 0.008, 12]} />
          <meshStandardMaterial
            color={isLaserActive ? "#ff0033" : "#cbd5e1"}
            emissive={isLaserActive ? "#ff0033" : "#000000"}
            emissiveIntensity={isLaserActive ? 0.8 : 0}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Hover Tooltip */}
        {laserPenHovered && (
          <Billboard position={[0, 0.14, 0]}>
            <group scale={[0.85, 0.85, 0.85]}>
              <mesh position={[0, 0, -0.002]}>
                <planeGeometry args={[1.5, 0.24]} />
                <meshBasicMaterial
                  color={isNightMode ? "#0f172a" : "#ffffff"}
                  transparent
                  opacity={0.94}
                />
              </mesh>
              <Text
                position={[0, 0, 0]}
                fontSize={0.07}
                color={isLaserActive ? "#ff4757" : isNightMode ? "#93c5fd" : "#1e293b"}
                anchorX="center"
                anchorY="middle"
                fontWeight={700}
              >
                {isLaserActive ? "🔴 Put Down Laser" : "🔴 Pick Up Laser Pointer"}
              </Text>
            </group>
          </Billboard>
        )}
      </group>

      {/* ── COFFEE CUP (INTERACTIVE: CLICK TO SIP) ── */}
      <group
        position={[0.58, 0.762, -0.1]}
        onClick={handleMugClick}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setMugHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setMugHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <mesh castShadow>
          <cylinderGeometry args={[0.028, 0.022, 0.072, 12]} />
          <meshStandardMaterial
            color={mugHovered ? "#e0d4b8" : CUP}
            roughness={0.85}
            metalness={0}
          />
        </mesh>
        {/* Handle */}
        <mesh position={[0.034, 0, 0]}>
          <torusGeometry args={[0.018, 0.005, 6, 12, Math.PI]} />
          <meshStandardMaterial
            color={mugHovered ? "#e0d4b8" : CUP}
            roughness={0.85}
            metalness={0}
          />
        </mesh>
        {/* Coffee */}
        <mesh position={[0, 0.036, 0]}>
          <circleGeometry args={[0.026, 12]} />
          <meshStandardMaterial color="#3a2010" roughness={0.95} metalness={0} />
        </mesh>
        {/* Steam rising from the coffee */}
        <SteamParticles />

        {/* Floating Billboard Caffeine / Sip Badge */}
        <Billboard position={[0, 0.13, 0]} follow={true}>
          {sipping ? (
            <Text
              fontSize={0.034}
              color="#dfba74"
              anchorX="center"
              anchorY="middle"
              fontWeight={800}
              letterSpacing={0.06}
            >
              ☕ +100mg Caffeine · 100% Focus
            </Text>
          ) : mugHovered ? (
            <Text
              fontSize={0.030}
              color={isNightMode ? "#f8ecd8" : "#2a2620"}
              anchorX="center"
              anchorY="middle"
              fontWeight={700}
              letterSpacing={0.06}
            >
              ☕ sip coffee
            </Text>
          ) : null}
        </Billboard>
      </group>

      {/* ── SMALL DESK SUCCULENT PLANT ── */}
      <group position={[-0.68, 0.762, -0.24]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.038, 0.028, 0.058, 12]} />
          <meshStandardMaterial color="#7a6548" roughness={0.9} metalness={0} />
        </mesh>
        <mesh castShadow position={[0, 0.075, 0]}>
          <sphereGeometry args={[0.048, 10, 8]} />
          <meshStandardMaterial color="#345f30" roughness={0.96} metalness={0} />
        </mesh>
        <mesh castShadow position={[0.03, 0.09, 0.02]}>
          <sphereGeometry args={[0.032, 8, 6]} />
          <meshStandardMaterial color="#427840" roughness={0.96} metalness={0} />
        </mesh>
      </group>

      {/* ── CABLE PASS-THROUGH GROMMET ── */}
      <mesh position={[-0.08, 0.762, -0.32]}>
        <cylinderGeometry args={[0.022, 0.022, 0.004, 14]} />
        <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  );
}
