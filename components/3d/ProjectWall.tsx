"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { projects, type Project } from "@/data/projects";
import { getProjectTexture } from "@/lib/projectTextures";
import { dampedLerp } from "@/lib/easings";

const FW = 1.7;
const FH = 1.25;
const FD = 0.055;
const BORDER = 0.05;

const FRAME_X_FINAL = -5.92;
const FRAME_X_START = -6.65;

const PROJ_START = 0.58;
const PROJ_END   = 0.86;
const STAGGER_DELAY = [0, 0.22, 0.44];

function smoothstep(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function getActiveFrameIndex(progress: number): number {
  if (progress < PROJ_START || progress > PROJ_END) return -1;
  const t = (progress - PROJ_START) / (PROJ_END - PROJ_START);
  return Math.min(2, Math.floor(t * 3));
}

interface FrameProps {
  project: Project;
  position: [number, number, number];
  entryProgress: number;
  isActive: boolean;
}

function ProjectFrame({ project, position, entryProgress, isActive }: FrameProps) {
  const router = useRouter();
  const groupRef      = useRef<THREE.Group>(null!);
  const lightRef      = useRef<THREE.PointLight>(null!);
  const artworkMatRef = useRef<THREE.MeshStandardMaterial>(null!);

  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  const scaleRef         = useRef(1.0);
  const emissiveRef      = useRef(0.0);
  const lightRef2        = useRef(0.1);
  const currentXRef      = useRef(FRAME_X_START);
  const dimRef           = useRef(1.0);

  useEffect(() => {
    const tex = getProjectTexture(project);
    if (tex) setTexture(tex);
  }, [project]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    // Smooth progressive slide-in from behind the wall using smoothstep
    const targetX = THREE.MathUtils.lerp(FRAME_X_START, FRAME_X_FINAL, smoothstep(entryProgress));
    currentXRef.current = dampedLerp(currentXRef.current, targetX, 8, dt);

    // Spotlight active frame; gently dim others unless hovered
    const targetDim = (isActive || hovered) ? 1.0 : 0.65;
    dimRef.current  = dampedLerp(dimRef.current, targetDim, 5, dt);

    const targetScale    = hovered ? 1.025 : 1.0;
    const targetEmissive = hovered ? 0.12  : isActive ? 0.04 : 0.0;
    const targetLight    = hovered ? 0.75  : isActive ? 0.28 : 0.08;

    scaleRef.current    = dampedLerp(scaleRef.current, targetScale, 7, dt);
    emissiveRef.current = dampedLerp(emissiveRef.current, targetEmissive, 7, dt);
    lightRef2.current   = dampedLerp(lightRef2.current, targetLight, 7, dt);

    if (groupRef.current) {
      groupRef.current.position.x = currentXRef.current;
      groupRef.current.scale.setScalar(scaleRef.current * dimRef.current);
    }
    if (artworkMatRef.current) {
      artworkMatRef.current.emissiveIntensity = emissiveRef.current;
      artworkMatRef.current.opacity = 0.4 + dimRef.current * 0.6;
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
    <group ref={groupRef} name={`frame-${project.id}`} position={[FRAME_X_START, position[1], position[2]]} rotation={[0, Math.PI / 2, 0]}>
      <mesh position={[0, -0.01, -0.005]}>
        <planeGeometry args={[FW + 0.06, FH + 0.06]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[FW, FH, FD]} />
        <meshStandardMaterial color="#161412" roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0, FD / 2 + 0.001]}>
        <planeGeometry args={[innerW, innerH]} />
        <meshStandardMaterial color="#181714" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, artY, FD / 2 + 0.003]} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} onClick={handleClick}>
        <planeGeometry args={[innerW - 0.04, artH - 0.04]} />
        <meshStandardMaterial ref={artworkMatRef} map={texture ?? undefined} color={texture ? "#ffffff" : "#1e293b"} emissive={texture ? "#ffffff" : "#38bdf8"} emissiveIntensity={0} roughness={0.4} metalness={0.05} transparent opacity={1} />
      </mesh>
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
      <mesh position={[0, 0, FD / 2 + 0.008]} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} onClick={handleClick}>
        <planeGeometry args={[innerW, innerH]} />
        <meshStandardMaterial color="#dbeafe" roughness={0.08} metalness={0.15} transparent opacity={0.06} />
      </mesh>
      <pointLight ref={lightRef} position={[0.4, 0.1, 0.35]} intensity={0.1} color="#fff5e4" distance={2.8} decay={2} />
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
  const elapsedTimeRef = useRef(0);
  const inProjectsRef  = useRef(false);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const inProjects = scrollProgress >= PROJ_START;

    if (!inProjectsRef.current && inProjects) {
      // Just entered the projects zone — reset timer for reveal animation
      elapsedTimeRef.current = 0;
    }
    inProjectsRef.current = inProjects;

    if (inProjects) {
      elapsedTimeRef.current = Math.min(3.0, elapsedTimeRef.current + dt);
    } else {
      // Retract when scrolling back before projects
      elapsedTimeRef.current = Math.max(0, elapsedTimeRef.current - dt * 2.0);
    }
  });

  const activeIndex = getActiveFrameIndex(scrollProgress);

  return (
    <group name="project-wall">
      {FRAME_POSITIONS.map((pos, i) => (
        <mesh key={`floor-pool-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-5.3, 0.005, pos[2]]}>
          <planeGeometry args={[1.5, 1.1]} />
          <meshBasicMaterial color="#fff4df" transparent opacity={0.07} />
        </mesh>
      ))}
      {projects.map((project, i) => {
        const frameElapsed = Math.max(0, elapsedTimeRef.current - STAGGER_DELAY[i]);
        const entryProg    = Math.min(1.0, frameElapsed / 0.65);
        return (
          <ProjectFrame
            key={project.id}
            project={project}
            position={FRAME_POSITIONS[i]}
            entryProgress={entryProg}
            isActive={activeIndex === i || activeIndex === -1}
          />
        );
      })}
    </group>
  );
}
