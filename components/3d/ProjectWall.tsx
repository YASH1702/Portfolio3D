"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { projects, type Project } from "@/data/projects";
import { getProjectTexture } from "@/lib/projectTextures";
import { dampedLerp } from "@/lib/easings";

// ── Physical Frame Dimensions ──
const FW = 1.7;
const FH = 1.25;
const FD = 0.055;
const BORDER = 0.05;

// Base resting position mounted flush on the left wall (X = -5.92)
const FRAME_X_WALL = -5.92;
// Subtle elevated focus position when inspected in projects section
const FRAME_X_INSPECT = -5.87;

const PROJ_START = 0.58;
const PROJ_END   = 0.86;

function getActiveFrameIndex(progress: number): number {
  if (progress < PROJ_START || progress > PROJ_END) return -1;
  const t = (progress - PROJ_START) / (PROJ_END - PROJ_START);
  return Math.min(2, Math.floor(t * 3));
}

interface FrameProps {
  project: Project;
  position: [number, number, number];
  isInspecting: boolean;
  isActive: boolean;
}

function ProjectFrame({ project, position, isInspecting, isActive }: FrameProps) {
  const router = useRouter();
  const groupRef      = useRef<THREE.Group>(null!);
  const lightRef      = useRef<THREE.PointLight>(null!);
  const artworkMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(() => {
    if (typeof window !== "undefined") {
      return getProjectTexture(project);
    }
    return null;
  });

  const scaleRef         = useRef(1.0);
  const lightRef2        = useRef(0.35);
  const currentXRef      = useRef(FRAME_X_WALL);
  const dimRef           = useRef(1.0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (project.image && project.image.startsWith("/images/")) {
      const loader = new THREE.TextureLoader();
      loader.load(
        project.image,
        (loadedTex) => {
          loadedTex.colorSpace = THREE.SRGBColorSpace;
          loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
          loadedTex.magFilter = THREE.LinearFilter;
          loadedTex.generateMipmaps = true;
          loadedTex.needsUpdate = true;
          setTexture(loadedTex);
          if (artworkMatRef.current) artworkMatRef.current.needsUpdate = true;
        },
        undefined,
        () => {
          const fallbackTex = getProjectTexture(project);
          if (fallbackTex) {
            fallbackTex.needsUpdate = true;
            setTexture(fallbackTex);
            if (artworkMatRef.current) artworkMatRef.current.needsUpdate = true;
          }
        }
      );
    } else {
      const tex = getProjectTexture(project);
      if (tex) {
        tex.needsUpdate = true;
        setTexture(tex);
        if (artworkMatRef.current) artworkMatRef.current.needsUpdate = true;
      }
    }
  }, [project]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    // Subtle inspection float forward (5cm) when active or inspected in gallery section
    const targetX = (isInspecting && isActive) ? FRAME_X_INSPECT : FRAME_X_WALL;
    currentXRef.current = dampedLerp(currentXRef.current, targetX, 6, dt);

    const targetDim = (isActive || hovered || !isInspecting) ? 1.0 : 0.82;
    dimRef.current  = dampedLerp(dimRef.current, targetDim, 5, dt);

    const targetScale = hovered ? 1.02 : 1.0;
    const targetLight = hovered ? 0.85 : (isInspecting && isActive) ? 0.5 : 0.3;

    scaleRef.current  = dampedLerp(scaleRef.current, targetScale, 7, dt);
    lightRef2.current = dampedLerp(lightRef2.current, targetLight, 7, dt);

    if (groupRef.current) {
      groupRef.current.position.x = currentXRef.current;
      groupRef.current.scale.setScalar(scaleRef.current * dimRef.current);
    }
    if (artworkMatRef.current) {
      artworkMatRef.current.opacity = 0.75 + dimRef.current * 0.25;
    }
    if (lightRef.current) {
      lightRef.current.intensity = lightRef2.current;
    }
  });

  const handlePointerEnter = (e: any) => {
    e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer";
    if (typeof window !== "undefined")
      window.dispatchEvent(new CustomEvent("project-hover", { detail: { active: true, title: project.title } }));
  };
  const handlePointerLeave = (e: any) => {
    e.stopPropagation(); setHovered(false); document.body.style.cursor = "default";
    if (typeof window !== "undefined")
      window.dispatchEvent(new CustomEvent("project-hover", { detail: { active: false } }));
  };
  const handleClick = (e: any) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("project-hover", { detail: { active: false } }));
      document.body.style.cursor = "default";
    }
    router.push(`/projects/${project.id}`);
  };

  const innerW = FW - BORDER * 2;
  const innerH = FH - BORDER * 2;
  const artH   = innerH * 0.72;
  const infoH  = innerH * 0.28;
  const artY   = (innerH - artH) / 2 - 0.01;
  const infoY  = -innerH / 2 + infoH / 2 + 0.01;

  return (
    <group ref={groupRef} name={`frame-${project.id}`} position={[FRAME_X_WALL, position[1], position[2]]} rotation={[0, Math.PI / 2, 0]}>
      {/* ── WALL SHADOW ── */}
      <mesh position={[0, -0.01, -0.005]}>
        <planeGeometry args={[FW + 0.06, FH + 0.06]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.22} />
      </mesh>
      {/* ── OUTER WOODEN FRAME ── */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[FW, FH, FD]} />
        <meshStandardMaterial color="#161412" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* ── INNER MATTE BACKING ── */}
      <mesh position={[0, 0, FD / 2 + 0.001]}>
        <planeGeometry args={[innerW, innerH]} />
        <meshStandardMaterial color="#181714" roughness={0.9} metalness={0} />
      </mesh>
      {/* ── ARTWORK SCREENSHOT (VIBRANT ILLUMINATED PREVIEW) ── */}
      <mesh position={[0, artY, FD / 2 + 0.003]} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} onClick={handleClick}>
        <planeGeometry args={[innerW - 0.04, artH - 0.04]} />
        <meshBasicMaterial
          ref={artworkMatRef}
          map={texture ?? undefined}
          color="#ffffff"
          toneMapped={false}
          transparent
          opacity={1}
        />
      </mesh>
      {/* ── INFORMATION LOWER PANEL ── */}
      <group position={[0, infoY, FD / 2 + 0.004]}>
        <mesh position={[0, infoH / 2 - 0.01, 0]}>
          <planeGeometry args={[innerW - 0.04, 0.003]} />
          <meshStandardMaterial color="#38342e" roughness={0.8} metalness={0} />
        </mesh>
        <Text position={[-(innerW / 2 - 0.03), 0.035, 0.002]} fontSize={0.052} color="#c4a882" anchorX="left" anchorY="middle" letterSpacing={0.18} fontWeight={700}>{project.number}</Text>
        <Text position={[-(innerW / 2 - 0.16), 0.035, 0.002]} fontSize={0.062} color="#f4eee4" anchorX="left" anchorY="middle" letterSpacing={0.08} fontWeight={700} maxWidth={innerW - 0.22}>{project.title.toUpperCase()}</Text>
        <Text position={[-(innerW / 2 - 0.03), -0.032, 0.002]} fontSize={0.036} color="#b8ae9e" anchorX="left" anchorY="middle" letterSpacing={0.12} maxWidth={innerW - 0.06}>{project.subtitle.toUpperCase()}</Text>
        <Text position={[-(innerW / 2 - 0.03), -0.075, 0.002]} fontSize={0.028} color="#9c9284" anchorX="left" anchorY="middle" letterSpacing={0.14} maxWidth={innerW - 0.06}>{project.technologies.slice(0, 5).join("  ·  ").toUpperCase()}</Text>
      </group>
      {/* ── MUSEUM GLAZING GLASS ── */}
      <mesh position={[0, 0, FD / 2 + 0.008]} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} onClick={handleClick}>
        <planeGeometry args={[innerW, innerH]} />
        <meshStandardMaterial color="#dbeafe" roughness={0.04} metalness={0.10} transparent opacity={0.02} />
      </mesh>
      {/* ── DEDICATED HOVER / ACTIVE LIGHT ── */}
      <pointLight ref={lightRef} position={[0.4, 0.1, 0.35]} intensity={0.35} color="#fff5e4" distance={2.8} decay={2} />

      {/* ── DEDICATED BRASS ART PICTURE SCONCE (Above each frame) ── */}
      <group position={[0, FH / 2 + 0.16, FD / 2 + 0.14]}>
        {/* Horizontal tubular brass shade */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.016, 0.016, 0.78, 12]} />
          <meshStandardMaterial color="#d4a855" roughness={0.28} metalness={0.82} />
        </mesh>
        {/* Curved dual mounting arms extending back to wall */}
        {[-0.24, 0.24].map((armX, idx) => (
          <group key={idx} position={[armX, 0, 0]}>
            <mesh position={[0, 0, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.18, 8]} />
              <meshStandardMaterial color="#c49845" roughness={0.3} metalness={0.85} />
            </mesh>
            <mesh position={[0, 0, -0.17]}>
              <cylinderGeometry args={[0.02, 0.02, 0.01, 10]} />
              <meshStandardMaterial color="#c49845" roughness={0.3} metalness={0.85} />
            </mesh>
          </group>
        ))}
        {/* Warm gallery downlight cone illuminating the artwork */}
        <pointLight position={[0, -0.04, 0]} intensity={0.35} color="#ffeed0" distance={2.6} decay={2} />
      </group>
    </group>
  );
}

const FRAME_POSITIONS: [number, number, number][] = [
  [-5.92, 1.95, -2.2],
  [-5.92, 1.95,  0.0],
  [-5.92, 1.95,  2.2],
];

interface ProjectWallProps {
  scrollProgress: number;
}

export default function ProjectWall({ scrollProgress }: ProjectWallProps) {
  const isInspecting = scrollProgress >= PROJ_START && scrollProgress <= PROJ_END + 0.05;
  const activeIndex  = getActiveFrameIndex(scrollProgress);

  return (
    <group name="project-wall">
      {/* ── CONTINUOUS BRUSHED BRASS GALLERY HANGING RAIL ── */}
      <group position={[-5.96, 3.32, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Horizontal main rail rod */}
        <mesh castShadow>
          <cylinderGeometry args={[0.012, 0.012, 7.8, 12]} />
          <meshStandardMaterial color="#d4a855" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Wall standoffs supporting the rail */}
        {[-3.6, -1.8, 0, 1.8, 3.6].map((zPos, idx) => (
          <mesh key={idx} position={[0, 0, zPos]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
            <meshStandardMaterial color="#b88d3e" roughness={0.35} metalness={0.85} />
          </mesh>
        ))}
      </group>

      {/* ── FINE BRASS SUSPENSION DROP-WIRES (hanging down to each frame) ── */}
      {FRAME_POSITIONS.map((pos, i) => (
        <group key={`wires-${i}`}>
          {[-0.65, 0.65].map((zOffset, wIdx) => (
            <mesh
              key={wIdx}
              position={[-5.94, 2.95, pos[2] + zOffset]}
            >
              <cylinderGeometry args={[0.0018, 0.0018, 0.74, 4]} />
              <meshStandardMaterial color="#c49a4e" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── EXHIBITION IDENTITY PLAQUE (Wall Plaque at front edge of gallery) ── */}
      <group position={[-5.95, 2.05, -3.75]} rotation={[0, Math.PI / 2, 0]}>
        {/* Plaque backplate */}
        <mesh castShadow>
          <boxGeometry args={[0.74, 0.44, 0.018]} />
          <meshStandardMaterial color="#161412" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Brass inner border inlay */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.70, 0.40]} />
          <meshStandardMaterial color="#221e1a" roughness={0.6} metalness={0.1} />
        </mesh>
        {/* Small brass accent screw caps in 4 corners */}
        {[
          [-0.32,  0.17],
          [ 0.32,  0.17],
          [-0.32, -0.17],
          [ 0.32, -0.17],
        ].map(([sx, sy], sIdx) => (
          <mesh key={sIdx} position={[sx, sy, 0.012]}>
            <circleGeometry args={[0.008, 10]} />
            <meshStandardMaterial color="#d4a855" metalness={0.85} roughness={0.3} />
          </mesh>
        ))}
        {/* Engraved plaque typography */}
        <Text position={[0, 0.11, 0.014]} fontSize={0.044} color="#d4a855" anchorX="center" anchorY="middle" letterSpacing={0.22} fontWeight={700}>
          SELECTED WORKS
        </Text>
        <mesh position={[0, 0.05, 0.012]}>
          <planeGeometry args={[0.48, 0.003]} />
          <meshStandardMaterial color="#b88d3e" metalness={0.7} roughness={0.3} />
        </mesh>
        <Text position={[0, 0.00, 0.014]} fontSize={0.026} color="#c8bea8" anchorX="center" anchorY="middle" letterSpacing={0.24}>
          2024 — 2025
        </Text>
        <Text position={[0, -0.06, 0.014]} fontSize={0.022} color="#948c7c" anchorX="center" anchorY="middle" letterSpacing={0.16}>
          FULL-STACK &amp; AI ARCHITECTURE
        </Text>
        <Text position={[0, -0.11, 0.014]} fontSize={0.018} color="#70685c" anchorX="center" anchorY="middle" letterSpacing={0.18}>
          CURATED GALLERY EXHIBITION
        </Text>
      </group>

      {/* ── MINIMAL GALLERY EXHIBITION BENCH (Sitting on floor in gallery area) ── */}
      <group position={[-5.35, 0, 0]}>
        {/* Low smoked dark oak bench slab */}
        <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
          <boxGeometry args={[0.62, 0.045, 2.2]} />
          <meshStandardMaterial color="#201c18" roughness={0.65} metalness={0.05} />
        </mesh>
        {/* Bench legs — 2 minimal black steel slab legs */}
        {[-0.85, 0.85].map((zLeg, lIdx) => (
          <mesh key={lIdx} castShadow position={[0, 0.10, zLeg]}>
            <boxGeometry args={[0.54, 0.20, 0.035]} />
            <meshStandardMaterial color="#141414" roughness={0.3} metalness={0.75} />
          </mesh>
        ))}
        {/* Decorative architectural art monograph book on the bench */}
        <group position={[0.02, 0.25, -0.4]} rotation={[0, 0.15, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.022, 0.34]} />
            <meshStandardMaterial color="#edeae2" roughness={0.85} metalness={0} />
          </mesh>
          <mesh position={[0, 0.012, 0]}>
            <planeGeometry args={[0.24, 0.32]} />
            <meshBasicMaterial color="#181816" />
          </mesh>
        </group>
        {/* Minimal ceramic vase on the bench */}
        <mesh castShadow position={[0, 0.32, 0.5]}>
          <cylinderGeometry args={[0.035, 0.055, 0.16, 14]} />
          <meshStandardMaterial color="#d4cec2" roughness={0.88} metalness={0.02} />
        </mesh>
      </group>

      {/* ── GALLERY FLOOR LIGHT POOLS ── */}
      {FRAME_POSITIONS.map((pos, i) => (
        <mesh key={`floor-pool-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-5.3, 0.005, pos[2]]}>
          <planeGeometry args={[1.5, 1.1]} />
          <meshBasicMaterial color="#fff4df" transparent opacity={0.07} />
        </mesh>
      ))}

      {/* ── PROJECT FRAMES ── */}
      {projects.map((project, i) => (
        <ProjectFrame
          key={project.id}
          project={project}
          position={FRAME_POSITIONS[i]}
          isInspecting={isInspecting}
          isActive={activeIndex === i || activeIndex === -1}
        />
      ))}
    </group>
  );
}
