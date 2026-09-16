"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";

/**
 * Environment — Rich architectural & cozy living/work atmospheric elements:
 * - Woven Scandinavian layered rug with fringes under couch
 * - Standing floor lamp with warm ambient illumination
 * - Cozy beanbag in corner with warm backlight
 * - Living indoor olive / fiddle-leaf fig tree with procedural wind sway
 * - Cascading pothos ivy vines with gentle breeze flutter
 * - Bookshelf with architectural cove backlighting, modern monographs, and brass hourglass
 * - Acoustic vertical oak slat wall accents and minimal framed wall art
 * - Exposed architectural oak ceiling rafters and track lighting system
 * - Hanging living area brass pendant light with subtle microscopic sway
 */

export default function Environment() {
  const { isNightMode } = useStudio();

  // Animation references
  const treeFoliageRef = useRef<THREE.Group>(null!);
  const vinesRef = useRef<THREE.Group>(null!);
  const floorPlantRef = useRef<THREE.Group>(null!);
  const pendantRef = useRef<THREE.Group>(null!);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    timeRef.current += dt;
    const t = timeRef.current;

    // Gentle wind sway on tree foliage
    if (treeFoliageRef.current) {
      treeFoliageRef.current.children.forEach((child, i) => {
        const swayZ = Math.sin(t * 1.2 + i * 0.7) * 0.035;
        const swayX = Math.cos(t * 0.9 + i * 0.5) * 0.025;
        child.rotation.z = swayZ;
        child.rotation.x = swayX;
      });
    }

    // Cascading pothos vines breeze flutter
    if (vinesRef.current) {
      vinesRef.current.children.forEach((child, i) => {
        child.rotation.z = Math.sin(t * 1.6 + i * 0.8) * 0.06;
        child.rotation.x = Math.cos(t * 1.3 + i * 0.6) * 0.04;
      });
    }

    // Corner floor plant leaf sway
    if (floorPlantRef.current) {
      floorPlantRef.current.rotation.y = Math.sin(t * 0.8) * 0.03;
      floorPlantRef.current.rotation.z = Math.cos(t * 0.7) * 0.02;
    }

    // Microscopic pendulum sway on hanging pendant light
    if (pendantRef.current) {
      pendantRef.current.rotation.z = Math.sin(t * 0.65) * 0.012;
      pendantRef.current.rotation.x = Math.cos(t * 0.55) * 0.008;
    }
  });

  return (
    <group name="environment">
      {/* ── LAYERED WOVEN RUG WITH FRINGES (Central living area under & in front of couch) ── */}
      <group position={[-0.7, 0.005, 1.0]}>
        {/* Underlay border */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.002, 0]}>
          <planeGeometry args={[3.8, 2.8]} />
          <meshStandardMaterial color="#84745c" roughness={0.99} metalness={0} />
        </mesh>
        {/* Main woven textured rug */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[3.6, 2.6]} />
          <meshStandardMaterial color="#c6b8a0" roughness={0.95} metalness={0} />
        </mesh>
        {/* Woven subtle pattern stripes */}
        {[-1.2, -0.6, 0.0, 0.6, 1.2].map((x, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.001, 0]}>
            <planeGeometry args={[0.08, 2.5]} />
            <meshBasicMaterial color="#a4937c" transparent opacity={0.35} />
          </mesh>
        ))}
        {/* Fringes — left and right */}
        {[-1.81, 1.81].map((x, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.001, 0]}>
            <planeGeometry args={[0.08, 2.58]} />
            <meshBasicMaterial color="#ebe5d8" />
          </mesh>
        ))}
      </group>

      {/* ── COZY BEANIE / BEAN BAG CHAIR WITH WARM BACKLIGHT ── */}
      <group position={[-2.6, 0, 1.2]} rotation={[0, 0.55, 0]} name="beanbag">
        {/* Slumped beanbag base */}
        <mesh castShadow receiveShadow position={[0, 0.24, 0]} scale={[1.15, 0.72, 1.05]}>
          <sphereGeometry args={[0.42, 18, 14]} />
          <meshStandardMaterial color="#d4c9b8" roughness={0.96} metalness={0.02} />
        </mesh>
        {/* Sloped backrest indent */}
        <mesh castShadow position={[-0.1, 0.46, -0.1]} scale={[0.9, 0.85, 0.8]}>
          <sphereGeometry args={[0.34, 16, 12]} />
          <meshStandardMaterial color="#c8bca8" roughness={0.96} />
        </mesh>
        {/* Soft seat depression */}
        <mesh position={[0.1, 0.28, 0.1]} scale={[0.8, 0.35, 0.7]}>
          <sphereGeometry args={[0.26, 12, 10]} />
          <meshStandardMaterial color="#beb29e" roughness={0.98} />
        </mesh>
        {/* Warm LED back-glow behind beanie */}
        <pointLight
          position={[-0.35, 0.45, -0.25]}
          intensity={isNightMode ? 0.85 : 0.45}
          color="#ffb055"
          distance={3.2}
          decay={2}
        />
      </group>

      {/* ── STANDING FLOOR LAMP (Positioned on right side) ── */}
      <group position={[3.5, 0, 0.9]} name="standing-floor-lamp">
        {/* Solid dark bronze disc base */}
        <mesh castShadow position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.035, 20]} />
          <meshStandardMaterial color="#1c1916" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Slender vertical stem */}
        <mesh castShadow position={[0, 1.08, 0]}>
          <cylinderGeometry args={[0.014, 0.014, 2.15, 10]} />
          <meshStandardMaterial color="#1a1816" roughness={0.35} metalness={0.7} />
        </mesh>
        {/* Brass collar detail */}
        <mesh position={[0, 1.9, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.045, 12]} />
          <meshStandardMaterial color="#c8a45e" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Warm linen cylindrical lamp shade */}
        <mesh castShadow position={[0, 2.06, 0]}>
          <cylinderGeometry args={[0.22, 0.26, 0.36, 18, 1, true]} />
          <meshStandardMaterial
            color="#f4eee2"
            roughness={0.7}
            metalness={0.05}
            side={2}
          />
        </mesh>
        {/* Inner warm light bulb */}
        <mesh position={[0, 2.04, 0]}>
          <sphereGeometry args={[0.045, 10, 8]} />
          <meshStandardMaterial
            color="#fff0cc"
            emissive="#ffaa33"
            emissiveIntensity={isNightMode ? 1.5 : 0.85}
          />
        </mesh>
        {/* Standing lamp warm ambient light */}
        <pointLight
          position={[0, 2.04, 0]}
          intensity={isNightMode ? 1.5 : 0.75}
          color="#ffa844"
          distance={5.5}
          decay={2}
        />
      </group>

      {/* ── GREENERY 1: INDOOR OLIVE / FIDDLE LEAF TREE (WITH PROCEDURAL WIND SWAY) ── */}
      <group position={[3.4, 0, -0.6]} name="indoor-tree">
        {/* Fluted ceramic pot */}
        <mesh castShadow receiveShadow position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.26, 0.2, 0.48, 18]} />
          <meshStandardMaterial color="#ece5d8" roughness={0.85} metalness={0} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.47, 0]}>
          <circleGeometry args={[0.24, 16]} />
          <meshStandardMaterial color="#2c1e12" roughness={1} />
        </mesh>
        {/* Slender twisting trunk */}
        <mesh castShadow position={[0, 0.92, 0]} rotation={[0.04, 0, -0.06]}>
          <cylinderGeometry args={[0.026, 0.038, 1.0, 8]} />
          <meshStandardMaterial color="#544332" roughness={0.88} />
        </mesh>

        {/* Animated swaying foliage group */}
        <group ref={treeFoliageRef}>
          {[
            { pos: [0.08, 1.35, 0.06], scale: [0.3, 0.26, 0.3], color: "#2d5428" },
            { pos: [-0.09, 1.55, -0.05], scale: [0.34, 0.28, 0.32], color: "#366030" },
            { pos: [0.07, 1.74, -0.04], scale: [0.28, 0.24, 0.27], color: "#264822" },
            { pos: [-0.05, 1.92, 0.05], scale: [0.24, 0.22, 0.24], color: "#3a6834" },
            { pos: [0.02, 2.08, 0], scale: [0.2, 0.18, 0.2], color: "#42783c" },
          ].map((leaf, i) => (
            <mesh key={i} castShadow position={leaf.pos as [number, number, number]} scale={leaf.scale as [number, number, number]}>
              <sphereGeometry args={[1, 10, 8]} />
              <meshStandardMaterial color={leaf.color} roughness={0.92} metalness={0} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ── GREENERY 2: LARGE FLOOR PLANT (Back-left corner) ── */}
      <group ref={floorPlantRef} position={[-5.0, 0, -3.8]} name="floor-plant">
        {/* Pot */}
        <mesh castShadow receiveShadow position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 0.36, 16]} />
          <meshStandardMaterial color="#886f52" roughness={0.9} metalness={0} />
        </mesh>
        {/* Foliage cluster */}
        <mesh castShadow position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.3, 12, 10]} />
          <meshStandardMaterial color="#2a5226" roughness={0.95} metalness={0} />
        </mesh>
        <mesh castShadow position={[0.16, 0.88, 0.1]}>
          <sphereGeometry args={[0.22, 10, 8]} />
          <meshStandardMaterial color="#325e2c" roughness={0.95} metalness={0} />
        </mesh>
        <mesh castShadow position={[-0.14, 0.82, -0.08]}>
          <sphereGeometry args={[0.2, 10, 8]} />
          <meshStandardMaterial color="#244420" roughness={0.95} metalness={0} />
        </mesh>
        <mesh castShadow position={[0.06, 1.1, 0]}>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshStandardMaterial color="#3a6834" roughness={0.95} metalness={0} />
        </mesh>
      </group>

      {/* ── GREENERY 3: TRAILING POTHOS VINES ON BOOKSHELF (WITH BREEZE FLUTTER) ── */}
      <group position={[5.2, 1.95, -3.2]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Small pot on top shelf */}
        <mesh castShadow position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.065, 0.05, 0.11, 12]} />
          <meshStandardMaterial color="#d4c8b8" roughness={0.8} />
        </mesh>
        {/* Plant base */}
        <mesh position={[0, 0.13, 0]}>
          <sphereGeometry args={[0.075, 8, 6]} />
          <meshStandardMaterial color="#325e2c" roughness={0.9} />
        </mesh>
        {/* Cascading trailing vines over shelf edge with breeze flutter */}
        <group ref={vinesRef}>
          {[
            { x: 0.04, y: -0.15, z: 0.08, len: 0.28 },
            { x: -0.02, y: -0.28, z: 0.09, len: 0.42 },
            { x: 0.06, y: -0.42, z: 0.08, len: 0.35 },
            { x: -0.05, y: -0.52, z: 0.07, len: 0.22 },
          ].map((vine, i) => (
            <mesh key={i} position={[vine.x, vine.y, vine.z]}>
              <sphereGeometry args={[0.038, 6, 6]} />
              <meshStandardMaterial color="#3e6f36" roughness={0.9} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ── SMALL SIDE TABLE NEXT TO COUCH (with succulent) ── */}
      <group position={[-2.2, 0, 0.3]} name="side-table">
        <mesh castShadow receiveShadow position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.025, 22]} />
          <meshStandardMaterial color="#c4a870" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh castShadow position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.035, 0.05, 0.52, 10]} />
          <meshStandardMaterial color="#2a1f14" roughness={0.5} metalness={0.1} />
        </mesh>
        <mesh castShadow position={[0.06, 0.545, -0.04]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.16, 0.02, 0.12]} />
          <meshStandardMaterial color="#c0a878" roughness={0.9} metalness={0} />
        </mesh>
        {/* Ceramic coffee mug on side table */}
        <mesh castShadow position={[0.08, 0.565, 0.08]}>
          <cylinderGeometry args={[0.025, 0.022, 0.06, 12]} />
          <meshStandardMaterial color="#f0ece2" roughness={0.8} />
        </mesh>
        {/* Small potted succulent on side table */}
        <group position={[-0.08, 0.545, 0.06]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.032, 0.024, 0.045, 10]} />
            <meshStandardMaterial color="#c47a58" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.038, 0]}>
            <sphereGeometry args={[0.03, 8, 6]} />
            <meshStandardMaterial color="#3b6d3b" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* ── BOOKSHELF (Back-right area with architectural cove backlighting) ── */}
      <group position={[5.2, 0, -3.5]} rotation={[0, -Math.PI / 2, 0]} name="bookshelf">
        {/* Main bookshelf case */}
        <mesh castShadow receiveShadow position={[0, 1.0, 0]}>
          <boxGeometry args={[0.92, 2.02, 0.28]} />
          <meshStandardMaterial color="#c4a870" roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Middle shelf slab */}
        <mesh receiveShadow position={[0, 0.6, 0]}>
          <boxGeometry args={[0.88, 0.024, 0.26]} />
          <meshStandardMaterial color="#b89558" roughness={0.4} metalness={0} />
        </mesh>
        {/* Upper shelf slab */}
        <mesh receiveShadow position={[0, 1.1, 0]}>
          <boxGeometry args={[0.88, 0.024, 0.26]} />
          <meshStandardMaterial color="#b89558" roughness={0.4} metalness={0} />
        </mesh>

        {/* Hidden warm LED cove strip light under shelves */}
        <pointLight
          position={[0, 0.65, 0.05]}
          intensity={isNightMode ? 0.75 : 0.25}
          color="#ffc878"
          distance={2.4}
          decay={2}
        />
        <pointLight
          position={[0, 1.15, 0.05]}
          intensity={isNightMode ? 0.75 : 0.25}
          color="#ffc878"
          distance={2.4}
          decay={2}
        />

        {/* Sculptural Brass Hourglass on middle shelf */}
        <group position={[0.32, 0.72, 0]}>
          <mesh castShadow position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.005, 12]} />
            <meshStandardMaterial color="#d4a855" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh castShadow position={[0, -0.07, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.005, 12]} />
            <meshStandardMaterial color="#d4a855" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.032, 0]}>
            <coneGeometry args={[0.018, 0.065, 10]} />
            <meshStandardMaterial color="#f0f6ff" transparent opacity={0.4} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.032, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.018, 0.065, 10]} />
            <meshStandardMaterial color="#f0f6ff" transparent opacity={0.4} roughness={0.1} />
          </mesh>
        </group>

        {/* Minimal ceramic vase on upper shelf */}
        <mesh castShadow position={[-0.28, 1.22, 0]}>
          <cylinderGeometry args={[0.028, 0.042, 0.14, 14]} />
          <meshStandardMaterial color="#ede8dd" roughness={0.9} />
        </mesh>

        {/* Curated Monographs — Row 1 */}
        {[
          { x: -0.32, h: 0.23, color: "#8b3838" }, // Clean Architecture
          { x: -0.20, h: 0.20, color: "#284474" }, // Designing Data-Intensive Apps
          { x: -0.08, h: 0.22, color: "#2d603a" }, // AI Systems & Neural Logic
          { x: 0.06,  h: 0.19, color: "#7a5832" }, // TypeScript Patterns
          { x: 0.18,  h: 0.24, color: "#543874" }, // Modern Distributed Systems
        ].map((b, i) => (
          <mesh key={i} castShadow position={[b.x, 0.72, -0.02]}>
            <boxGeometry args={[0.095, b.h, 0.2]} />
            <meshStandardMaterial color={b.color} roughness={0.75} metalness={0.05} />
          </mesh>
        ))}

        {/* Curated Monographs — Row 2 */}
        {[
          { x: -0.12, h: 0.21, color: "#704828" },
          { x: 0.02,  h: 0.25, color: "#245a44" },
          { x: 0.16,  h: 0.19, color: "#482860" },
          { x: 0.28,  h: 0.22, color: "#643224" },
        ].map((b, i) => (
          <mesh key={i} castShadow position={[b.x, 1.22, -0.02]}>
            <boxGeometry args={[0.095, b.h, 0.2]} />
            <meshStandardMaterial color={b.color} roughness={0.75} metalness={0.05} />
          </mesh>
        ))}
      </group>

      {/* ── WALL DESIGN 1: ACOUSTIC VERTICAL OAK SLATS (Front wall flanking hero typography) ── */}
      <group position={[-4.1, 2.0, -5.84]} name="acoustic-wood-slats">
        {/* Dark felt backing */}
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[1.9, 3.8]} />
          <meshStandardMaterial color="#181614" roughness={0.98} />
        </mesh>
        {/* 19 vertical oak wood slats */}
        {Array.from({ length: 19 }).map((_, i) => (
          <mesh key={i} castShadow position={[-0.85 + i * 0.095, 0, 0.01]}>
            <boxGeometry args={[0.045, 3.8, 0.02]} />
            <meshStandardMaterial color="#b88d58" roughness={0.45} metalness={0.02} />
          </mesh>
        ))}
      </group>

      {/* ── WALL DESIGN 2: MINIMAL ARCHITECTURAL FRAMED ART (Front wall beside slats) ── */}
      <group position={[-3.3, 2.45, -5.80]} name="wall-art-poster">
        {/* Slim black wooden frame */}
        <mesh castShadow>
          <boxGeometry args={[0.82, 1.05, 0.03]} />
          <meshStandardMaterial color="#181614" roughness={0.4} />
        </mesh>
        {/* Off-white art print with geometric minimal shapes */}
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[0.74, 0.97]} />
          <meshStandardMaterial color="#f0ece2" roughness={0.9} />
        </mesh>
        {/* Geometric terracotta arch */}
        <mesh position={[0, -0.06, 0.018]}>
          <circleGeometry args={[0.22, 32, 0, Math.PI]} />
          <meshBasicMaterial color="#c26d48" />
        </mesh>
        {/* Minimal black circle */}
        <mesh position={[0, 0.18, 0.018]}>
          <circleGeometry args={[0.11, 24]} />
          <meshBasicMaterial color="#1a1a18" />
        </mesh>
      </group>

      {/* ── FLOOR BASEBOARD — Right wall ── */}
      <mesh position={[5.96, 0.06, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[12, 0.12, 0.04]} />
        <meshStandardMaterial color="#e0d8cc" roughness={0.7} metalness={0} />
      </mesh>

      {/* ── EXPOSED ARCHITECTURAL OAK CEILING BEAMS (TIMBER RAFTERS) ── */}
      <group name="ceiling-beams">
        {[-4.2, -2.1, 0.0, 2.1, 4.2].map((zPos, idx) => (
          <group key={`beam-${idx}`} position={[0, 3.91, zPos]}>
            {/* Solid oak beam spanning across room width */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[12.0, 0.18, 0.16]} />
              <meshStandardMaterial color="#b48c56" roughness={0.48} metalness={0.03} />
            </mesh>
            {/* Forged dark iron joist hanger plates at both wall ends */}
            {[-5.96, 5.96].map((xEnd, eIdx) => (
              <mesh key={eIdx} position={[xEnd, -0.02, 0]}>
                <boxGeometry args={[0.06, 0.22, 0.19]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.75} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* ── ARCHITECTURAL TRACK LIGHTING SYSTEM (Black rail & brass spotlights) ── */}
      <group name="track-lighting" position={[-1.6, 3.76, 0]}>
        {/* Longitudinal matte black track rail */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.035, 0.04, 8.8]} />
          <meshStandardMaterial color="#161616" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Brass suspension stems attaching to oak beams */}
        {[-4.2, -2.1, 0.0, 2.1, 4.2].map((zBeam, sIdx) => (
          <group key={sIdx} position={[0, 0.08, zBeam]}>
            <mesh>
              <cylinderGeometry args={[0.006, 0.006, 0.16, 8]} />
              <meshStandardMaterial color="#d4a855" roughness={0.3} metalness={0.85} />
            </mesh>
          </group>
        ))}
        {/* Directional track spotlight fixtures */}
        {[
          { z: -3.2, rotY: Math.PI / 4,   rotX: -0.45, label: "spot-hero-left" },
          { z: -1.6, rotY: -Math.PI / 3,  rotX: -0.40, label: "spot-desk" },
          { z: -0.4, rotY: Math.PI / 2,   rotX: -0.35, label: "spot-gallery-center" },
          { z:  1.2, rotY: Math.PI / 2,   rotX: -0.35, label: "spot-gallery-work" },
          { z:  2.6, rotY: -Math.PI / 4,  rotX: -0.40, label: "spot-lounge" },
        ].map((spot, spIdx) => (
          <group key={spIdx} position={[0, -0.04, spot.z]} rotation={[spot.rotX, spot.rotY, 0]}>
            {/* Brass swivel connector stem */}
            <mesh position={[0, 0.02, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.04, 8]} />
              <meshStandardMaterial color="#d4a855" roughness={0.3} metalness={0.85} />
            </mesh>
            {/* Cylindrical spotlight canister body */}
            <mesh castShadow position={[0, -0.07, 0]}>
              <cylinderGeometry args={[0.036, 0.044, 0.12, 14]} />
              <meshStandardMaterial color="#181818" roughness={0.35} metalness={0.7} />
            </mesh>
            {/* Brass trim bezel ring */}
            <mesh position={[0, -0.13, 0]}>
              <torusGeometry args={[0.042, 0.005, 8, 16]} />
              <meshStandardMaterial color="#d4a855" roughness={0.25} metalness={0.88} />
            </mesh>
            {/* Internal warm lens glow */}
            <mesh position={[0, -0.128, 0]}>
              <circleGeometry args={[0.038, 14]} />
              <meshStandardMaterial
                color="#fff6e8"
                emissive="#ffdfaa"
                emissiveIntensity={isNightMode ? 0.9 : 0.4}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── SCANDINAVIAN MINIMALIST LIVING AREA PENDANT LIGHT (WITH MICROSCOPIC SWAY) ── */}
      <group ref={pendantRef} position={[-0.7, 2.92, 1.0]} name="living-pendant-light">
        {/* Ultra-thin black suspension wire dropping from central beam */}
        <mesh position={[0, 0.50, 0]}>
          <cylinderGeometry args={[0.002, 0.002, 1.0, 4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
        {/* Brushed brass ceiling canopy disc */}
        <mesh position={[0, 0.98, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.015, 14]} />
          <meshStandardMaterial color="#d4a855" roughness={0.28} metalness={0.85} />
        </mesh>
        {/* Spun brass minimal wide dome shade */}
        <mesh castShadow position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.18, 0.28, 0.08, 24, 1, true]} />
          <meshStandardMaterial color="#d4a855" roughness={0.3} metalness={0.82} side={2} />
        </mesh>
        {/* Top neck brass collar */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.04, 12]} />
          <meshStandardMaterial color="#b88d3e" roughness={0.25} metalness={0.88} />
        </mesh>
        {/* Frosted opal glass diffuser dome */}
        <mesh position={[0, 0.02, 0]}>
          <sphereGeometry args={[0.075, 16, 12]} />
          <meshStandardMaterial
            color="#fff8ec"
            emissive="#ffdfaa"
            emissiveIntensity={isNightMode ? 0.95 : 0.35}
            roughness={0.2}
          />
        </mesh>
        {/* Warm ambient pool light over living rug */}
        <pointLight
          position={[0, -0.05, 0]}
          intensity={isNightMode ? 0.75 : 0.3}
          color="#ffeed2"
          distance={4.2}
          decay={2}
        />
      </group>
    </group>
  );
}
