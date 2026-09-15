"use client";

import { useStudio } from "@/context/StudioContext";

/**
 * Environment — Rich architectural & cozy living/work atmospheric elements:
 * - Woven Scandinavian layered rug with fringes under couch
 * - Sleeping cat on couch (in Couch.tsx)
 * - Standing floor lamp in corner with warm ambient illumination
 * - Cozy beanbag / beanie in corner with subtle warm backlight
 * - Indoor olive / fiddle-leaf fig tree in fluted ceramic pot
 * - Trailing pothos ivy cascading down the bookshelf
 * - Small succulent plant on side table
 * - Acoustic vertical oak slat wall accents and minimal framed wall art
 * - Bookshelf with books, ceiling light fixture, and skirting boards
 */

export default function Environment() {
  const { isNightMode } = useStudio();

  return (
    <group name="environment">
      {/* ── LAYERED WOVEN RUG WITH FRINGES (under couch & coffee area) ── */}
      <group position={[-1.5, 0.005, 1.5]}>
        {/* Underlay border */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.002, 0]}>
          <planeGeometry args={[2.8, 2.2]} />
          <meshStandardMaterial color="#887860" roughness={0.99} metalness={0} />
        </mesh>
        {/* Main woven textured rug */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[2.6, 2.0]} />
          <meshStandardMaterial color="#c2b49c" roughness={0.95} metalness={0} />
        </mesh>
        {/* Woven subtle stripes */}
        {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.001, 0]}>
            <planeGeometry args={[0.06, 1.9]} />
            <meshBasicMaterial color="#a0907a" transparent opacity={0.35} />
          </mesh>
        ))}
        {/* Fringes — left and right */}
        {[-1.31, 1.31].map((x, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.001, 0]}>
            <planeGeometry args={[0.06, 1.98]} />
            <meshBasicMaterial color="#eae4d6" />
          </mesh>
        ))}
      </group>

      {/* ── COZY BEANIE / BEAN BAG CHAIR IN CORNER WITH BACKLIGHT ── */}
      <group position={[-3.8, 0, 3.8]} rotation={[0, 0.65, 0]} name="beanbag">
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
        {/* Subtle warm LED back-glow behind beanie onto wall */}
        <pointLight
          position={[-0.35, 0.45, -0.3]}
          intensity={isNightMode ? 0.75 : 0.4}
          color="#ffb055"
          distance={3.2}
          decay={2}
        />
      </group>

      {/* ── STANDING FLOOR LAMP IN CORNER ── */}
      <group position={[-5.1, 0, 4.3]} name="standing-floor-lamp">
        {/* Solid marble / dark bronze disc base */}
        <mesh castShadow position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.03, 20]} />
          <meshStandardMaterial color="#1c1916" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Slender vertical stem */}
        <mesh castShadow position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 2.1, 10]} />
          <meshStandardMaterial color="#1a1816" roughness={0.35} metalness={0.7} />
        </mesh>
        {/* Brass collar detail */}
        <mesh position={[0, 1.85, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.04, 12]} />
          <meshStandardMaterial color="#c8a45e" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Warm linen cylindrical lamp shade */}
        <mesh castShadow position={[0, 2.0, 0]}>
          <cylinderGeometry args={[0.2, 0.24, 0.34, 18, 1, true]} />
          <meshStandardMaterial
            color="#f4eee2"
            roughness={0.7}
            metalness={0.05}
            side={2}
          />
        </mesh>
        {/* Inner warm light bulb */}
        <mesh position={[0, 1.98, 0]}>
          <sphereGeometry args={[0.04, 10, 8]} />
          <meshStandardMaterial
            color="#fff0cc"
            emissive="#ffaa33"
            emissiveIntensity={isNightMode ? 1.4 : 0.8}
          />
        </mesh>
        {/* Standing lamp warm ambient light */}
        <pointLight
          position={[0, 1.98, 0]}
          intensity={isNightMode ? 1.4 : 0.65}
          color="#ffa844"
          distance={5.0}
          decay={2}
        />
      </group>

      {/* ── GREENERY 1: INDOOR OLIVE / FIDDLE LEAF TREE (near window) ── */}
      <group position={[4.6, 0, 1.2]} name="indoor-tree">
        {/* Fluted ceramic pot */}
        <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.24, 0.19, 0.44, 18]} />
          <meshStandardMaterial color="#ece5d8" roughness={0.85} metalness={0} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.43, 0]}>
          <circleGeometry args={[0.22, 16]} />
          <meshStandardMaterial color="#2c1e12" roughness={1} />
        </mesh>
        {/* Slender twisting trunk */}
        <mesh castShadow position={[0, 0.85, 0]} rotation={[0.04, 0, -0.06]}>
          <cylinderGeometry args={[0.024, 0.035, 0.9, 8]} />
          <meshStandardMaterial color="#544332" roughness={0.88} />
        </mesh>
        {/* Branches & broad sculptural leaves */}
        {[
          { pos: [0.08, 1.25, 0.06], scale: [0.28, 0.24, 0.28], color: "#2d5428" },
          { pos: [-0.08, 1.45, -0.05], scale: [0.32, 0.26, 0.3], color: "#366030" },
          { pos: [0.06, 1.62, -0.04], scale: [0.26, 0.22, 0.25], color: "#264822" },
          { pos: [-0.04, 1.78, 0.05], scale: [0.22, 0.2, 0.22], color: "#3a6834" },
          { pos: [0.02, 1.92, 0], scale: [0.18, 0.16, 0.18], color: "#42783c" },
        ].map((leaf, i) => (
          <mesh key={i} castShadow position={leaf.pos as [number, number, number]} scale={leaf.scale as [number, number, number]}>
            <sphereGeometry args={[1, 10, 8]} />
            <meshStandardMaterial color={leaf.color} roughness={0.92} metalness={0} />
          </mesh>
        ))}
      </group>

      {/* ── GREENERY 2: LARGE FLOOR PLANT (back-left corner) ── */}
      <group position={[-5.4, 0, -4.2]} name="floor-plant">
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

      {/* ── GREENERY 3: TRAILING POTHOS VINES ON BOOKSHELF ── */}
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
        {/* Cascading trailing vines over shelf edge */}
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

      {/* ── SMALL SIDE TABLE NEXT TO COUCH (with succulent) ── */}
      <group position={[-3.1, 0, 1.5]} name="side-table">
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

      {/* ── BOOKSHELF (back-right area) ── */}
      <group position={[5.2, 0, -3.5]} rotation={[0, -Math.PI / 2, 0]} name="bookshelf">
        <mesh castShadow receiveShadow position={[0, 1.0, 0]}>
          <boxGeometry args={[0.9, 2.0, 0.28]} />
          <meshStandardMaterial color="#c4a870" roughness={0.5} metalness={0.05} />
        </mesh>
        <mesh receiveShadow position={[0, 0.6, 0]}>
          <boxGeometry args={[0.86, 0.02, 0.25]} />
          <meshStandardMaterial color="#b89558" roughness={0.4} metalness={0} />
        </mesh>
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

      {/* ── WALL DESIGN 1: ACOUSTIC VERTICAL OAK SLATS (Corner accent) ── */}
      <group position={[-5.96, 2.0, 3.8]} rotation={[0, Math.PI / 2, 0]} name="acoustic-wood-slats">
        {/* Dark felt backing */}
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[1.4, 3.8]} />
          <meshStandardMaterial color="#1a1816" roughness={0.98} />
        </mesh>
        {/* 14 vertical oak wood slats */}
        {Array.from({ length: 14 }).map((_, i) => (
          <mesh key={i} castShadow position={[-0.6 + i * 0.092, 0, 0.008]}>
            <boxGeometry args={[0.045, 3.8, 0.016]} />
            <meshStandardMaterial color="#ad8652" roughness={0.42} metalness={0.02} />
          </mesh>
        ))}
      </group>

      {/* ── WALL DESIGN 2: MINIMAL ARCHITECTURAL FRAMED ART (Front wall) ── */}
      <group position={[-3.8, 2.45, -5.92]} name="wall-art-poster">
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
