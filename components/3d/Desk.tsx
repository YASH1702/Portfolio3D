"use client";

import Monitor from "./Monitor";
import { useStudio } from "@/context/StudioContext";

/**
 * Desk — a modern developer workstation.
 *
 * Uses the Monitor component for the interactive screen.
 * Interactive Desk Lamp toggles warm illumination on/off on click.
 *
 * Position: [2.2, 0, -1.2] — right side of room, slightly angled.
 */

const WOOD      = "#c4985e";
const METAL     = "#181818";
const LAMP_BODY = "#282828";
const NOTEBOOK  = "#f0ede5";
const CUP       = "#d4c5a0";

export default function Desk() {
  const { isLampOn, toggleLamp } = useStudio();

  const handleLampEnter = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const handleLampLeave = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = "default";
  };

  const handleLampClick = (e: any) => {
    e.stopPropagation();
    toggleLamp();
  };

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

      {/* ── MONITOR (CLICKABLE DISPLAY) ── */}
      <Monitor position={[-0.08, 0.76, -0.16]} />

      {/* ── KEYBOARD ── */}
      <mesh castShadow position={[-0.02, 0.764, 0.1]}>
        <boxGeometry args={[0.38, 0.011, 0.14]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.65} metalness={0.12} />
      </mesh>
      {/* Keyboard key rows */}
      {[0.06, 0.0, -0.06].map((z, i) => (
        <mesh key={i} position={[-0.02, 0.77, 0.1 + z]}>
          <boxGeometry args={[0.34, 0.003, 0.02]} />
          <meshStandardMaterial color="#252525" roughness={0.7} metalness={0} />
        </mesh>
      ))}

      {/* ── MOUSE ── */}
      <mesh castShadow position={[0.26, 0.764, 0.06]}>
        <boxGeometry args={[0.068, 0.016, 0.115]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.18} />
      </mesh>

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
          <meshStandardMaterial color={LAMP_BODY} roughness={0.3} metalness={0.8} />
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
        {/* Shade */}
        <mesh castShadow position={[0.04, 0.56, -0.06]} rotation={[0.8, 0, 0]}>
          <coneGeometry args={[0.072, 0.11, 14, 1, true]} />
          <meshStandardMaterial
            color="#e8e0cc"
            roughness={0.55}
            metalness={0.08}
            side={2}
          />
        </mesh>
        {/* Inner cone — illuminates when lamp is on */}
        <mesh position={[0.04, 0.56, -0.06]} rotation={[0.8, 0, 0]}>
          <coneGeometry args={[0.065, 0.1, 14, 1, true]} />
          <meshStandardMaterial
            color="#ffd080"
            emissive={isLampOn ? "#ffaa30" : "#221808"}
            emissiveIntensity={isLampOn ? 0.7 : 0.0}
            roughness={0.6}
            metalness={0}
            side={2}
          />
        </mesh>
      </group>

      {/* ── NOTEBOOK ── */}
      <group position={[0.48, 0.762, 0.12]} rotation={[0, 0.18, 0]}>
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
        {/* Pen */}
        <mesh castShadow position={[0.14, 0.015, 0.04]} rotation={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.2, 6]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.4} />
        </mesh>
      </group>

      {/* ── COFFEE CUP ── */}
      <group position={[0.58, 0.762, -0.1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.028, 0.022, 0.072, 12]} />
          <meshStandardMaterial color={CUP} roughness={0.85} metalness={0} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.034, 0, 0]}>
          <torusGeometry args={[0.018, 0.005, 6, 12, Math.PI]} />
          <meshStandardMaterial color={CUP} roughness={0.85} metalness={0} />
        </mesh>
        {/* Coffee */}
        <mesh position={[0, 0.036, 0]}>
          <circleGeometry args={[0.026, 12]} />
          <meshStandardMaterial color="#3a2010" roughness={0.95} metalness={0} />
        </mesh>
      </group>

      {/* ── SMALL DESK PLANT ── */}
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

      {/* ── CABLE DETAIL ── */}
      <mesh position={[-0.08, 0.765, -0.3]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.003, 0.003, 0.18, 4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0} />
      </mesh>
    </group>
  );
}
