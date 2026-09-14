"use client";

/**
 * Environment — atmospheric elements:
 * - Area rug under the coffee table / couch area
 * - Large floor plant in the corner
 * - Small side table next to couch
 * - Subtle ceiling cornice
 * - Floor baseboard on right wall
 */

export default function Environment() {
  return (
    <group name="environment">
      {/* ── AREA RUG ── */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-1.5, 0.005, 1.5]}>
        <planeGeometry args={[2.4, 1.8]} />
        <meshStandardMaterial
          color="#a09070"
          roughness={0.98}
          metalness={0}
        />
      </mesh>
      {/* Rug border */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-1.5, 0.004, 1.5]}>
        <planeGeometry args={[2.6, 2.0]} />
        <meshStandardMaterial
          color="#8b7858"
          roughness={0.99}
          metalness={0}
        />
      </mesh>

      {/* ── LARGE FLOOR PLANT — back-left corner ── */}
      <group position={[-5.4, 0, -4.2]} name="floor-plant">
        {/* Pot */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.14, 0.32, 14]} />
          <meshStandardMaterial color="#9a8060" roughness={0.9} metalness={0} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.16, 0]}>
          <circleGeometry args={[0.17, 14]} />
          <meshStandardMaterial color="#3a2a18" roughness={1} metalness={0} />
        </mesh>
        {/* Main stem cluster */}
        <mesh castShadow position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.28, 10, 8]} />
          <meshStandardMaterial color="#2d5a28" roughness={0.95} metalness={0} />
        </mesh>
        <mesh castShadow position={[0.15, 0.85, 0.1]}>
          <sphereGeometry args={[0.2, 8, 7]} />
          <meshStandardMaterial color="#365e30" roughness={0.95} metalness={0} />
        </mesh>
        <mesh castShadow position={[-0.12, 0.78, -0.08]}>
          <sphereGeometry args={[0.18, 8, 7]} />
          <meshStandardMaterial color="#294824" roughness={0.95} metalness={0} />
        </mesh>
        <mesh castShadow position={[0.05, 1.05, 0]}>
          <sphereGeometry args={[0.15, 8, 6]} />
          <meshStandardMaterial color="#3a6634" roughness={0.95} metalness={0} />
        </mesh>
      </group>

      {/* ── SMALL SIDE TABLE next to couch ── */}
      <group position={[-3.1, 0, 1.5]} name="side-table">
        {/* Table top */}
        <mesh castShadow receiveShadow position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.025, 20]} />
          <meshStandardMaterial color="#c4a870" roughness={0.4} metalness={0.05} />
        </mesh>
        {/* Single pedestal leg */}
        <mesh castShadow position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.035, 0.05, 0.52, 10]} />
          <meshStandardMaterial color="#2a1f14" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Small book on table */}
        <mesh castShadow position={[0.06, 0.545, -0.04]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.16, 0.02, 0.12]} />
          <meshStandardMaterial color="#c0a878" roughness={0.9} metalness={0} />
        </mesh>
      </group>

      {/* ── BOOKSHELF — back-right area ── */}
      <group position={[5.2, 0, -3.5]} rotation={[0, -Math.PI / 2, 0]} name="bookshelf">
        {/* Shelf frame */}
        <mesh castShadow receiveShadow position={[0, 1.0, 0]}>
          <boxGeometry args={[0.9, 2.0, 0.28]} />
          <meshStandardMaterial color="#c4a870" roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Shelf panel 1 */}
        <mesh receiveShadow position={[0, 0.6, 0]}>
          <boxGeometry args={[0.86, 0.02, 0.25]} />
          <meshStandardMaterial color="#b89558" roughness={0.4} metalness={0} />
        </mesh>
        {/* Shelf panel 2 */}
        <mesh receiveShadow position={[0, 1.1, 0]}>
          <boxGeometry args={[0.86, 0.02, 0.25]} />
          <meshStandardMaterial color="#b89558" roughness={0.4} metalness={0} />
        </mesh>
        {/* Books — row 1 */}
        {[
          { x: -0.3, h: 0.22, color: "#8b4040" },
          { x: -0.16, h: 0.19, color: "#405080" },
          { x: -0.02, h: 0.21, color: "#4a7040" },
          { x: 0.12, h: 0.18, color: "#806040" },
          { x: 0.26, h: 0.23, color: "#604080" },
        ].map((b, i) => (
          <mesh key={i} castShadow position={[b.x, 0.72, -0.02]}>
            <boxGeometry args={[0.1, b.h, 0.2]} />
            <meshStandardMaterial color={b.color} roughness={0.8} metalness={0} />
          </mesh>
        ))}
        {/* Books — row 2 */}
        {[
          { x: -0.28, h: 0.20, color: "#705030" },
          { x: -0.14, h: 0.24, color: "#307050" },
          { x: 0.0, h: 0.18, color: "#503070" },
          { x: 0.24, h: 0.22, color: "#704030" },
        ].map((b, i) => (
          <mesh key={i} castShadow position={[b.x, 1.21, -0.02]}>
            <boxGeometry args={[0.1, b.h, 0.2]} />
            <meshStandardMaterial color={b.color} roughness={0.8} metalness={0} />
          </mesh>
        ))}
      </group>

      {/* ── FLOOR BASEBOARD — Right wall ── */}
      <mesh position={[5.96, 0.06, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[12, 0.12, 0.04]} />
        <meshStandardMaterial color="#e0d8cc" roughness={0.7} metalness={0} />
      </mesh>

      {/* ── CEILING LIGHT FIXTURE (decorative) ── */}
      <group position={[0, 3.92, 0]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 16]} />
          <meshStandardMaterial color="#d8d0c0" roughness={0.6} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.06, 0.04, 0.16, 10]} />
          <meshStandardMaterial color="#c0b8a8" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>
    </group>
  );
}
