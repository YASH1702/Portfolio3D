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
const FW = 1.7;    // width (meters)
const FH = 1.25;   // height (meters)
const FD = 0.055;  // frame depth (meters)
const BORDER = 0.05; // outer wooden molding width

interface FrameProps {
  project: Project;
  position: [number, number, number];
}

function ProjectFrame({ project, position }: FrameProps) {
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const artworkMatRef = useRef<THREE.MeshStandardMaterial>(null!);

  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  const scaleRef = useRef(1.0);
  const emissiveRef = useRef(0.0);
  const lightIntensityRef = useRef(0.1);

  // Generate procedural canvas texture on mount
  useEffect(() => {
    const tex = getProjectTexture(project);
    if (tex) setTexture(tex);
  }, [project]);

  // Smooth hover transitions
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const targetScale = hovered ? 1.025 : 1.0;
    const targetEmissive = hovered ? 0.12 : 0.0;
    const targetLight = hovered ? 0.75 : 0.1;

    scaleRef.current = dampedLerp(scaleRef.current, targetScale, 7, dt);
    emissiveRef.current = dampedLerp(emissiveRef.current, targetEmissive, 7, dt);
    lightIntensityRef.current = dampedLerp(lightIntensityRef.current, targetLight, 7, dt);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current);
    }
    if (artworkMatRef.current) {
      artworkMatRef.current.emissiveIntensity = emissiveRef.current;
    }
    if (lightRef.current) {
      lightRef.current.intensity = lightIntensityRef.current;
    }
  });

  const handlePointerEnter = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("project-hover", {
          detail: { active: true, title: project.title },
        })
      );
    }
  };

  const handlePointerLeave = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "default";
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("project-hover", {
          detail: { active: false },
        })
      );
    }
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("project-hover", { detail: { active: false } })
      );
      document.body.style.cursor = "default";
    }
    router.push(`/projects/${project.id}`);
  };

  // Dimensions of inner content
  const innerW = FW - BORDER * 2;
  const innerH = FH - BORDER * 2;
  const artH = innerH * 0.72; // artwork takes ~72%
  const infoH = innerH * 0.28; // info label takes ~28%
  const artY = (innerH - artH) / 2 - 0.01;
  const infoY = -innerH / 2 + infoH / 2 + 0.01;

  return (
    <group
      ref={groupRef}
      name={`frame-${project.id}`}
      position={position}
      rotation={[0, Math.PI / 2, 0]}
    >
      {/* ── WALL SHADOW (subtle ambient occlusion under frame) ── */}
      <mesh position={[0, -0.01, -0.005]}>
        <planeGeometry args={[FW + 0.06, FH + 0.06]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>

      {/* ── OUTER WOODEN FRAME ── */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[FW, FH, FD]} />
        <meshStandardMaterial
          color="#161412"
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>

      {/* ── INNER MATTE BACKING (museum board) ── */}
      <mesh position={[0, 0, FD / 2 + 0.001]}>
        <planeGeometry args={[innerW, innerH]} />
        <meshStandardMaterial
          color="#181714"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* ── ARTWORK SCREENSHOT (Dominant Element) ── */}
      <mesh
        position={[0, artY, FD / 2 + 0.003]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <planeGeometry args={[innerW - 0.04, artH - 0.04]} />
        <meshStandardMaterial
          ref={artworkMatRef}
          map={texture ?? undefined}
          color={texture ? "#ffffff" : "#1e293b"}
          emissive={texture ? "#ffffff" : "#38bdf8"}
          emissiveIntensity={0}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* ── INFORMATION LOWER PANEL ── */}
      <group position={[0, infoY, FD / 2 + 0.004]}>
        {/* Subtle divider line between artwork and metadata */}
        <mesh position={[0, infoH / 2 - 0.01, 0]}>
          <planeGeometry args={[innerW - 0.04, 0.003]} />
          <meshStandardMaterial color="#38342e" roughness={0.8} metalness={0} />
        </mesh>

        {/* Project Number */}
        <Text
          position={[-(innerW / 2 - 0.03), 0.035, 0.002]}
          fontSize={0.052}
          color="#c4a882"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.18}
          fontWeight={700}
        >
          {project.number}
        </Text>

        {/* Project Title */}
        <Text
          position={[-(innerW / 2 - 0.16), 0.035, 0.002]}
          fontSize={0.062}
          color="#f4eee4"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.08}
          fontWeight={700}
          maxWidth={innerW - 0.22}
        >
          {project.title.toUpperCase()}
        </Text>

        {/* Subtitle / Role */}
        <Text
          position={[-(innerW / 2 - 0.03), -0.032, 0.002]}
          fontSize={0.036}
          color="#8c8272"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.12}
          maxWidth={innerW - 0.06}
        >
          {project.subtitle.toUpperCase()}
        </Text>

        {/* Tech Stack Metadata */}
        <Text
          position={[-(innerW / 2 - 0.03), -0.075, 0.002]}
          fontSize={0.028}
          color="#645d52"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.14}
          maxWidth={innerW - 0.06}
        >
          {project.technologies.slice(0, 5).join("  ·  ").toUpperCase()}
        </Text>
      </group>

      {/* ── MUSEUM GLAZING / GLASS REFLECTION ── */}
      <mesh
        position={[0, 0, FD / 2 + 0.008]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <planeGeometry args={[innerW, innerH]} />
        <meshStandardMaterial
          color="#dbeafe"
          roughness={0.08}
          metalness={0.15}
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* ── DEDICATED HOVER ACCENT LIGHT ── */}
      <pointLight
        ref={lightRef}
        position={[0.4, 0.1, 0.35]}
        intensity={0.1}
        color="#fff5e4"
        distance={2.8}
        decay={2}
      />
    </group>
  );
}

// Frame positions along the left wall (X = -5.92)
const FRAME_POSITIONS: [number, number, number][] = [
  [-5.92, 1.95, -2.2], // Project 01: JobPilot AI
  [-5.92, 1.95,  0.0], // Project 02: BusinessFlow
  [-5.92, 1.95,  2.2], // Project 03: AI Automation Platform
];

export default function ProjectWall() {
  return (
    <group name="project-wall">
      {/* Gallery Floor Light Pools beneath each frame */}
      {FRAME_POSITIONS.map((pos, i) => (
        <mesh
          key={`floor-pool-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-5.3, 0.005, pos[2]]}
        >
          <planeGeometry args={[1.5, 1.1]} />
          <meshBasicMaterial
            color="#fff4df"
            transparent
            opacity={0.07}
          />
        </mesh>
      ))}

      {projects.map((project, i) => (
        <ProjectFrame
          key={project.id}
          project={project}
          position={FRAME_POSITIONS[i]}
        />
      ))}
    </group>
  );
}
