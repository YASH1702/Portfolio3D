"use client";

/**
 * Room — the architectural shell.
 *
 * Room dimensions: 12 (W) × 4 (H) × 12 (D)
 * Origin: center of floor plane.
 *
 * Walls use a slightly rougher texture than default
 * to pick up light naturally without looking plastic.
 */

// Material palette
const WALL     = "#ede8de";   // warm off-white
const WALL_SIDE = "#e8e3d8";  // slightly cooler for side walls
const CEIL     = "#f0ece4";   // lightest — ceiling
const FLOOR    = "#b89a6a";   // warm wood
const BASE     = "#d8d2c6";   // skirting boards

const W = 12, H = 4, D = 12; // room dimensions

export default function Room() {
  return (
    <group name="room">

      {/* ── FLOOR ── */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color={FLOOR} roughness={0.75} metalness={0.02} />
      </mesh>

      {/* ── CEILING ── */}
      <mesh position={[0, H, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color={CEIL} roughness={0.98} metalness={0} />
      </mesh>

      {/* ── FRONT WALL (hero) — at -Z ── */}
      <mesh receiveShadow position={[0, H / 2, -D / 2]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color={WALL} roughness={0.88} metalness={0} />
      </mesh>

      {/* ── BACK WALL — behind camera ── */}
      <mesh position={[0, H / 2, D / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color={WALL} roughness={0.9} metalness={0} />
      </mesh>

      {/* ── LEFT WALL (project frames) ── */}
      <mesh receiveShadow position={[-W / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={0.88} metalness={0} />
      </mesh>

      {/* ── RIGHT WALL (window side) ── */}
      {/* Lower solid panel */}
      <mesh receiveShadow position={[W / 2, 0.85, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, 1.7]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={0.88} metalness={0} />
      </mesh>
      {/* Upper solid panel */}
      <mesh receiveShadow position={[W / 2, 3.45, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, 1.1]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={0.88} metalness={0} />
      </mesh>
      {/* Left of window */}
      <mesh receiveShadow position={[W / 2, H / 2, 4]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[4, H]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={0.88} metalness={0} />
      </mesh>
      {/* Right of window */}
      <mesh receiveShadow position={[W / 2, H / 2, -4]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[4, H]} />
        <meshStandardMaterial color={WALL_SIDE} roughness={0.88} metalness={0} />
      </mesh>

      {/* ── WINDOW — right wall, mid-room ── */}
      <group position={[W / 2 - 0.02, 0, -1.2]}>
        {/* Window frame — outer */}
        <mesh>
          <boxGeometry args={[0.06, 2.1, 2.6]} />
          <meshStandardMaterial color="#d8d0c4" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Window frame — horizontal bar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.07, 0.06, 2.6]} />
          <meshStandardMaterial color="#d0c8bc" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Window frame — vertical bar */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.07, 2.1, 0.06]} />
          <meshStandardMaterial color="#d0c8bc" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Glass panel — emissive daylight */}
        <mesh position={[-0.04, 0.52, -0.65]}>
          <planeGeometry args={[0.04, 0.98]} />
          <meshStandardMaterial
            color="#d4e8ff"
            emissive="#88b8f0"
            emissiveIntensity={0.4}
            roughness={0.08}
            metalness={0.05}
            transparent
            opacity={0.55}
          />
        </mesh>
        <mesh position={[-0.04, 0.52, 0.65]}>
          <planeGeometry args={[0.04, 0.98]} />
          <meshStandardMaterial
            color="#d4e8ff"
            emissive="#88b8f0"
            emissiveIntensity={0.4}
            roughness={0.08}
            metalness={0.05}
            transparent
            opacity={0.55}
          />
        </mesh>
        <mesh position={[-0.04, -0.52, -0.65]}>
          <planeGeometry args={[0.04, 0.98]} />
          <meshStandardMaterial
            color="#d4e8ff"
            emissive="#88b8f0"
            emissiveIntensity={0.4}
            roughness={0.08}
            metalness={0.05}
            transparent
            opacity={0.55}
          />
        </mesh>
        <mesh position={[-0.04, -0.52, 0.65]}>
          <planeGeometry args={[0.04, 0.98]} />
          <meshStandardMaterial
            color="#d4e8ff"
            emissive="#88b8f0"
            emissiveIntensity={0.4}
            roughness={0.08}
            metalness={0.05}
            transparent
            opacity={0.55}
          />
        </mesh>
      </group>

      {/* ── SKIRTING BOARDS ── */}
      {/* Front wall */}
      <mesh position={[0, 0.06, -D / 2 + 0.03]}>
        <boxGeometry args={[W, 0.12, 0.05]} />
        <meshStandardMaterial color={BASE} roughness={0.7} metalness={0} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-W / 2 + 0.03, 0.06, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[D, 0.12, 0.05]} />
        <meshStandardMaterial color={BASE} roughness={0.7} metalness={0} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 0.06, D / 2 - 0.03]}>
        <boxGeometry args={[W, 0.12, 0.05]} />
        <meshStandardMaterial color={BASE} roughness={0.7} metalness={0} />
      </mesh>

      {/* ── CEILING CORNICE ── thin band where ceiling meets walls ── */}
      {/* Front */}
      <mesh position={[0, H - 0.04, -D / 2 + 0.03]}>
        <boxGeometry args={[W, 0.08, 0.06]} />
        <meshStandardMaterial color={CEIL} roughness={0.9} metalness={0} />
      </mesh>
      {/* Left */}
      <mesh position={[-W / 2 + 0.03, H - 0.04, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[D, 0.08, 0.06]} />
        <meshStandardMaterial color={CEIL} roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}
