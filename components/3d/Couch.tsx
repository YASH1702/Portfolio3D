"use client";

/**
 * Couch — a simple modern sofa.
 *
 * Geometry:
 * - Seat cushion base
 * - Back cushion
 * - Two arm rests
 * - Legs (4 dark wood)
 *
 * Position: center-left of room, facing slightly inward
 */

const FABRIC = "#8b8070";   // warm grey fabric
const FABRIC_DARK = "#6b6058";
const LEG_COLOR = "#2a1f14";

export default function Couch() {
  return (
    <group name="couch" position={[-1.5, 0, 1.5]} rotation={[0, -0.2, 0]}>
      {/* ── SEAT BASE ── */}
      <mesh castShadow receiveShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[1.8, 0.22, 0.78]} />
        <meshStandardMaterial color={FABRIC} roughness={0.95} metalness={0} />
      </mesh>

      {/* ── SEAT CUSHIONS (2 visual dividers) ── */}
      <mesh castShadow position={[-0.44, 0.5, 0]}>
        <boxGeometry args={[0.82, 0.08, 0.74]} />
        <meshStandardMaterial color={FABRIC_DARK} roughness={0.98} metalness={0} />
      </mesh>
      <mesh castShadow position={[0.44, 0.5, 0]}>
        <boxGeometry args={[0.82, 0.08, 0.74]} />
        <meshStandardMaterial color={FABRIC_DARK} roughness={0.98} metalness={0} />
      </mesh>

      {/* ── BACK CUSHION ── */}
      <mesh castShadow receiveShadow position={[0, 0.72, -0.3]}>
        <boxGeometry args={[1.8, 0.48, 0.18]} />
        <meshStandardMaterial color={FABRIC} roughness={0.95} metalness={0} />
      </mesh>

      {/* ── LEFT ARM ── */}
      <mesh castShadow position={[-0.92, 0.56, 0]}>
        <boxGeometry args={[0.16, 0.44, 0.78]} />
        <meshStandardMaterial color={FABRIC_DARK} roughness={0.95} metalness={0} />
      </mesh>

      {/* ── RIGHT ARM ── */}
      <mesh castShadow position={[0.92, 0.56, 0]}>
        <boxGeometry args={[0.16, 0.44, 0.78]} />
        <meshStandardMaterial color={FABRIC_DARK} roughness={0.95} metalness={0} />
      </mesh>

      {/* ── LEGS ── 4 corners ── */}
      {[
        [-0.82, 0.08, 0.32],
        [0.82, 0.08, 0.32],
        [-0.82, 0.08, -0.32],
        [0.82, 0.08, -0.32],
      ].map((pos, i) => (
        <mesh key={i} castShadow position={pos as [number, number, number]}>
          <boxGeometry args={[0.06, 0.16, 0.06]} />
          <meshStandardMaterial color={LEG_COLOR} roughness={0.3} metalness={0.1} />
        </mesh>
      ))}

      {/* ── THROW PILLOW (decorative) ── */}
      <mesh castShadow position={[0.55, 0.62, -0.1]} rotation={[0, 0.2, 0.1]}>
        <boxGeometry args={[0.26, 0.22, 0.1]} />
        <meshStandardMaterial color="#c4a882" roughness={0.95} metalness={0} />
      </mesh>
    </group>
  );
}
