"use client";

/**
 * Desk — a modern developer workstation.
 *
 * Components:
 * - Desk surface (natural wood)
 * - Desk legs (thin dark metal)
 * - Monitor (dark, modern)
 * - Monitor stand
 * - Keyboard
 * - Mouse
 * - Desk lamp
 * - Notebook
 * - Coffee cup
 * - Small plant
 *
 * All geometry is procedural — no GLTF needed for Phase 3.
 * Can be replaced with a GLB model in Phase 11.
 *
 * Position: right side of room, facing front wall
 * Approx: [2, 0, -1]
 */

const DESK_WOOD = "#8b6914";
const DESK_WOOD_LIGHT = "#c4985e";
const DARK_METAL = "#1a1a1a";
const MONITOR_DARK = "#111111";
const KEY_COLOR = "#1e1e1e";
const LAMP_METAL = "#2a2a2a";
const NOTEBOOK_COLOR = "#f0ede5";
const CUP_COLOR = "#d4c5a0";

export default function Desk() {
  return (
    <group name="desk" position={[2.2, 0, -1.2]}>
      {/* ── DESK SURFACE ── */}
      <mesh castShadow receiveShadow position={[0, 0.74, 0]}>
        <boxGeometry args={[1.6, 0.04, 0.75]} />
        <meshStandardMaterial
          color={DESK_WOOD_LIGHT}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* ── DESK LEGS ── */}
      {[
        [-0.72, 0.37, 0.33],
        [0.72, 0.37, 0.33],
        [-0.72, 0.37, -0.33],
        [0.72, 0.37, -0.33],
      ].map((pos, i) => (
        <mesh
          key={i}
          castShadow
          position={pos as [number, number, number]}
        >
          <boxGeometry args={[0.04, 0.74, 0.04]} />
          <meshStandardMaterial
            color={DARK_METAL}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* ── MONITOR STAND ── */}
      <mesh castShadow position={[-0.1, 0.82, -0.2]}>
        <boxGeometry args={[0.14, 0.02, 0.14]} />
        <meshStandardMaterial
          color={DARK_METAL}
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>
      {/* Monitor neck */}
      <mesh position={[-0.1, 0.92, -0.22]}>
        <boxGeometry args={[0.04, 0.2, 0.04]} />
        <meshStandardMaterial
          color={DARK_METAL}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* ── MONITOR SCREEN ── */}
      <group position={[-0.1, 1.08, -0.24]}>
        {/* Monitor body */}
        <mesh castShadow>
          <boxGeometry args={[0.62, 0.37, 0.025]} />
          <meshStandardMaterial
            color={MONITOR_DARK}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
        {/* Screen surface — subtle glow */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[0.56, 0.31]} />
          <meshStandardMaterial
            color="#0d1117"
            emissive="#1e4080"
            emissiveIntensity={0.25}
            roughness={0.05}
            metalness={0.1}
          />
        </mesh>

        {/* Code lines on screen — simple bar shapes */}
        {[
          { y: 0.08, width: 0.28, x: -0.08, color: "#61dafb" },
          { y: 0.04, width: 0.18, x: -0.14, color: "#c084fc" },
          { y: 0.0, width: 0.32, x: -0.06, color: "#4ade80" },
          { y: -0.04, width: 0.22, x: -0.12, color: "#fbbf24" },
          { y: -0.08, width: 0.16, x: -0.16, color: "#c084fc" },
        ].map((line, i) => (
          <mesh key={i} position={[line.x + line.width / 2 - 0.12, line.y, 0.018]}>
            <planeGeometry args={[line.width, 0.012]} />
            <meshStandardMaterial
              color={line.color}
              emissive={line.color}
              emissiveIntensity={0.6}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
      </group>

      {/* ── KEYBOARD ── */}
      <mesh castShadow position={[-0.05, 0.778, 0.02]}>
        <boxGeometry args={[0.36, 0.012, 0.14]} />
        <meshStandardMaterial
          color={KEY_COLOR}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* ── MOUSE ── */}
      <mesh castShadow position={[0.24, 0.778, 0.02]}>
        <boxGeometry args={[0.07, 0.018, 0.12]} />
        <meshStandardMaterial
          color={KEY_COLOR}
          roughness={0.5}
          metalness={0.15}
        />
      </mesh>

      {/* ── DESK LAMP ── */}
      <group position={[0.62, 0.76, -0.2]}>
        {/* Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.07, 0.02, 12]} />
          <meshStandardMaterial
            color={LAMP_METAL}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        {/* Arm */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.4, 6]} />
          <meshStandardMaterial
            color={LAMP_METAL}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        {/* Shade */}
        <mesh position={[0, 0.42, 0]} rotation={[0.4, 0, 0]} castShadow>
          <coneGeometry args={[0.07, 0.1, 12, 1, true]} />
          <meshStandardMaterial
            color="#e8e0d0"
            roughness={0.5}
            metalness={0.1}
            side={2}
          />
        </mesh>
      </group>

      {/* ── NOTEBOOK ── */}
      <mesh
        castShadow
        position={[0.45, 0.776, 0.08]}
        rotation={[0, 0.15, 0]}
      >
        <boxGeometry args={[0.2, 0.012, 0.15]} />
        <meshStandardMaterial
          color={NOTEBOOK_COLOR}
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      {/* ── COFFEE CUP ── */}
      <group position={[0.55, 0.78, -0.05]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.03, 0.025, 0.07, 10]} />
          <meshStandardMaterial
            color={CUP_COLOR}
            roughness={0.8}
            metalness={0}
          />
        </mesh>
        {/* Coffee surface */}
        <mesh position={[0, 0.035, 0]}>
          <circleGeometry args={[0.027, 10]} />
          <meshStandardMaterial
            color="#3d2010"
            roughness={0.9}
            metalness={0}
          />
        </mesh>
      </group>

      {/* ── SMALL DESK PLANT ── */}
      <group position={[-0.65, 0.76, -0.12]}>
        {/* Pot */}
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.03, 0.06, 10]} />
          <meshStandardMaterial
            color="#8b7355"
            roughness={0.9}
            metalness={0}
          />
        </mesh>
        {/* Plant body — simplified sphere */}
        <mesh castShadow position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.05, 8, 6]} />
          <meshStandardMaterial
            color="#3a6b35"
            roughness={0.95}
            metalness={0}
          />
        </mesh>
        {/* Second leaf cluster */}
        <mesh castShadow position={[0.03, 0.1, 0.02]}>
          <sphereGeometry args={[0.035, 6, 5]} />
          <meshStandardMaterial
            color="#4a7a3f"
            roughness={0.95}
            metalness={0}
          />
        </mesh>
      </group>
    </group>
  );
}
