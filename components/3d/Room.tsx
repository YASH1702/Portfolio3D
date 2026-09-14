"use client";

import * as THREE from "three";

/**
 * Room — the architectural shell of the studio.
 *
 * Geometry:
 * - Floor (natural wood tone)
 * - Back wall (behind camera origin — invisible but needed for lighting)
 * - Front wall (main hero wall — warm off-white)
 * - Left wall (project frames go here)
 * - Right wall (subtle)
 * - Ceiling
 * - Window opening on left wall (light source area)
 * - Skirting board details
 *
 * All geometry is simple BoxGeometry — no heavy models needed.
 * Texture maps added in Phase 11.
 */

const ROOM = {
  width: 12, // X axis — left to right
  height: 4, // Y axis — floor to ceiling
  depth: 12, // Z axis — front to back
};

// Warm, neutral material palette
const WALL_COLOR = "#f0ebe0";
const FLOOR_COLOR = "#c8a87a";
const CEILING_COLOR = "#ede8df";
const FLOOR_SPECULAR = "#a08060";

export default function Room() {
  return (
    <group name="room">
      {/* ── FLOOR ── */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        name="floor"
      >
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
        <meshStandardMaterial
          color={FLOOR_COLOR}
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* ── CEILING ── */}
      <mesh
        position={[0, ROOM.height, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        name="ceiling"
      >
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
        <meshStandardMaterial
          color={CEILING_COLOR}
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      {/* ── FRONT WALL (hero wall — negative Z, facing camera) ── */}
      <mesh
        receiveShadow
        position={[0, ROOM.height / 2, -ROOM.depth / 2]}
        name="front-wall"
      >
        <planeGeometry args={[ROOM.width, ROOM.height]} />
        <meshStandardMaterial
          color={WALL_COLOR}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* ── BACK WALL (behind camera) ── */}
      <mesh
        position={[0, ROOM.height / 2, ROOM.depth / 2]}
        rotation={[0, Math.PI, 0]}
        name="back-wall"
      >
        <planeGeometry args={[ROOM.width, ROOM.height]} />
        <meshStandardMaterial
          color={WALL_COLOR}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* ── LEFT WALL (project frames) ── */}
      <mesh
        receiveShadow
        position={[-ROOM.width / 2, ROOM.height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        name="left-wall"
      >
        <planeGeometry args={[ROOM.depth, ROOM.height]} />
        <meshStandardMaterial
          color={WALL_COLOR}
          roughness={0.88}
          metalness={0}
        />
      </mesh>

      {/* ── RIGHT WALL ── */}
      <mesh
        position={[ROOM.width / 2, ROOM.height / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        name="right-wall"
      >
        <planeGeometry args={[ROOM.depth, ROOM.height]} />
        <meshStandardMaterial
          color={WALL_COLOR}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* ── FLOOR BASEBOARD — Left wall ── */}
      <mesh
        position={[-ROOM.width / 2 + 0.04, 0.06, 0]}
        rotation={[0, Math.PI / 2, 0]}
        name="baseboard-left"
      >
        <boxGeometry args={[ROOM.depth, 0.12, 0.04]} />
        <meshStandardMaterial color="#e0d8cc" roughness={0.7} metalness={0} />
      </mesh>

      {/* ── FLOOR BASEBOARD — Front wall ── */}
      <mesh
        position={[0, 0.06, -ROOM.depth / 2 + 0.04]}
        name="baseboard-front"
      >
        <boxGeometry args={[ROOM.width, 0.12, 0.04]} />
        <meshStandardMaterial color="#e0d8cc" roughness={0.7} metalness={0} />
      </mesh>

      {/* ── WINDOW FRAME on right wall — light source area ── */}
      {/* Window outline */}
      <group position={[ROOM.width / 2 - 0.05, 2.2, -1.5]}>
        {/* Window frame — outer box */}
        <mesh rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.4, 2.0]} />
          <meshStandardMaterial
            color="#d4c9b4"
            roughness={0.5}
            metalness={0.05}
          />
        </mesh>
        {/* Window glass — emissive to simulate daylight */}
        <mesh position={[-0.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.2, 1.8]} />
          <meshStandardMaterial
            color="#d8e8ff"
            emissive="#9bbaf0"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.1}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}
