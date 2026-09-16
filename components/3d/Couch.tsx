"use client";

import SleepingCat from "./SleepingCat";

/**
 * Couch — a modern living room sofa with a sleeping cat.
 *
 * Upgraded with:
 * - Seat cushion base and plump split cushions
 * - Draped wool throw blanket cascading over the right arm
 * - Layered Scandinavian accent throw pillows (terracotta & oatmeal)
 * - Curled sleeping cat on the left cushion
 *
 * Position: center-left of room, facing slightly inward
 */

const FABRIC = "#8b8070";   // warm grey/taupe fabric
const FABRIC_DARK = "#6b6058";
const LEG_COLOR = "#2a1f14";

export default function Couch() {
  return (
    <group name="couch" position={[-1.4, 0, 1.4]} rotation={[0, -0.15, 0]}>
      {/* ── SEAT BASE ── */}
      <mesh castShadow receiveShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[1.8, 0.22, 0.78]} />
        <meshStandardMaterial color={FABRIC} roughness={0.95} metalness={0} />
      </mesh>

      {/* ── SEAT CUSHIONS ── */}
      <mesh castShadow position={[-0.44, 0.5, 0]}>
        <boxGeometry args={[0.82, 0.09, 0.74]} />
        <meshStandardMaterial color={FABRIC_DARK} roughness={0.98} metalness={0} />
      </mesh>
      <mesh castShadow position={[0.44, 0.5, 0]}>
        <boxGeometry args={[0.82, 0.09, 0.74]} />
        <meshStandardMaterial color={FABRIC_DARK} roughness={0.98} metalness={0} />
      </mesh>

      {/* ── SLEEPING CAT ON LEFT CUSHION ── */}
      <SleepingCat position={[-0.34, 0.54, 0.05]} rotation={[0, 0.45, 0]} />

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

      {/* ── DRAPED WOOL THROW BLANKET (Draped over right arm and seat cushion) ── */}
      <group position={[0.72, 0.56, 0.05]} rotation={[0, 0.08, -0.05]}>
        {/* Arm fold top */}
        <mesh castShadow position={[0.12, 0.12, 0]}>
          <boxGeometry args={[0.22, 0.04, 0.46]} />
          <meshStandardMaterial color="#b29e84" roughness={0.98} />
        </mesh>
        {/* Outer drop down the sofa arm side */}
        <mesh castShadow position={[0.24, -0.04, 0]}>
          <boxGeometry args={[0.03, 0.32, 0.46]} />
          <meshStandardMaterial color="#a69278" roughness={0.98} />
        </mesh>
        {/* Inner cascade onto the right cushion */}
        <mesh castShadow position={[0.0, -0.04, 0]} rotation={[0, 0, 0.18]}>
          <boxGeometry args={[0.26, 0.03, 0.44]} />
          <meshStandardMaterial color="#b8a48a" roughness={0.98} />
        </mesh>
        {/* Fringed blanket hem */}
        <mesh position={[-0.14, -0.06, 0]}>
          <boxGeometry args={[0.03, 0.015, 0.42]} />
          <meshBasicMaterial color="#dfd4c4" />
        </mesh>
      </group>

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

      {/* ── THROW PILLOW 1 (Terracotta accent) ── */}
      <mesh castShadow position={[0.48, 0.64, -0.12]} rotation={[0, 0.18, 0.12]}>
        <boxGeometry args={[0.28, 0.24, 0.11]} />
        <meshStandardMaterial color="#b8684a" roughness={0.94} metalness={0} />
      </mesh>

      {/* ── THROW PILLOW 2 (Oatmeal neutral) ── */}
      <mesh castShadow position={[0.62, 0.62, -0.08]} rotation={[0, -0.22, -0.08]}>
        <boxGeometry args={[0.26, 0.22, 0.09]} />
        <meshStandardMaterial color="#dcd4c6" roughness={0.96} metalness={0} />
      </mesh>
    </group>
  );
}
