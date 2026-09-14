"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Text } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { projects, type Project } from "@/data/projects";

// ── Per-project accent colours ──
const PROJECT_BG: Record<string, string> = {
  "jobpilot-ai":           "#0a1520",
  businessflow:            "#0a1810",
  "ai-automation-platform": "#180a1e",
};
const PROJECT_ACCENT: Record<string, string> = {
  "jobpilot-ai":           "#2060c0",
  businessflow:            "#208040",
  "ai-automation-platform": "#802080",
};

// ── Frame dimensions ──
const FW = 1.3;   // width
const FH = 1.0;   // height
const FD = 0.045; // depth
const BORDER = 0.055; // matte border

interface FrameProps {
  project: Project;
  position: [number, number, number];
}

function ProjectFrame({ project, position }: FrameProps) {
  const router = useRouter();
  const glowRef = useRef<THREE.PointLight>(null!);
  const matteRef = useRef<THREE.MeshStandardMaterial>(null!);
  const [hovered, setHovered] = useState(false);
  const emissive = useRef(0);
  const glowIntensity = useRef(0);

  useFrame((_, delta) => {
    const targetE = hovered ? 0.08 : 0;
    const targetG = hovered ? 0.6 : 0;
    const speed = 6 * delta;

    emissive.current += (targetE - emissive.current) * Math.min(speed, 1);
    glowIntensity.current += (targetG - glowIntensity.current) * Math.min(speed, 1);

    if (matteRef.current) {
      matteRef.current.emissiveIntensity = emissive.current;
    }
    if (glowRef.current) {
      glowRef.current.intensity = glowIntensity.current;
    }
  });

  const bg = PROJECT_BG[project.id] ?? "#0f0f18";
  const accent = PROJECT_ACCENT[project.id] ?? "#204080";

  return (
    <group
      name={`frame-${project.id}`}
      position={position}
      rotation={[0, Math.PI / 2, 0]}
    >
      {/* ── OUTER FRAME ── */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[FW, FH, FD]} />
        <meshStandardMaterial
          color="#1c1a16"
          roughness={0.35}
          metalness={0.25}
        />
      </mesh>

      {/* ── INNER MATTE / ARTWORK ── */}
      <mesh
        position={[0, 0, FD / 2 + 0.001]}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/projects/${project.id}`);
        }}
      >
        <planeGeometry args={[FW - BORDER * 2, FH - BORDER * 2]} />
        <meshStandardMaterial
          ref={matteRef}
          color={bg}
          roughness={0.85}
          metalness={0}
          emissive={accent}
          emissiveIntensity={0}
        />
      </mesh>

      {/* ── PROJECT INFO via drei Text (no HTML rendering) ── */}
      {/* Number */}
      <Text
        position={[-(FW / 2 - BORDER - 0.03), FH / 2 - BORDER - 0.04, FD / 2 + 0.012]}
        fontSize={0.048}
        color="#604030"
        anchorX="left"
        anchorY="top"
        letterSpacing={0.18}
      >
        {project.number}
      </Text>

      {/* Title */}
      <Text
        position={[-(FW / 2 - BORDER - 0.03), FH / 2 - BORDER - 0.12, FD / 2 + 0.012]}
        fontSize={0.085}
        color="#e8e0d4"
        anchorX="left"
        anchorY="top"
        letterSpacing={0.06}
        fontWeight={700}
        maxWidth={FW - BORDER * 2 - 0.04}
      >
        {project.title.toUpperCase()}
      </Text>

      {/* Subtitle */}
      <Text
        position={[-(FW / 2 - BORDER - 0.03), FH / 2 - BORDER - 0.26, FD / 2 + 0.012]}
        fontSize={0.048}
        color="#7a7060"
        anchorX="left"
        anchorY="top"
        letterSpacing={0.05}
        maxWidth={FW - BORDER * 2 - 0.04}
        lineHeight={1.4}
      >
        {project.subtitle}
      </Text>

      {/* Tech stack */}
      <Text
        position={[-(FW / 2 - BORDER - 0.03), -(FH / 2 - BORDER - 0.06), FD / 2 + 0.012]}
        fontSize={0.038}
        color="#504840"
        anchorX="left"
        anchorY="bottom"
        letterSpacing={0.12}
        maxWidth={FW - BORDER * 2 - 0.04}
      >
        {project.technologies.slice(0, 5).join("  ·  ")}
      </Text>

      {/* ── HOVER GLOW LIGHT ── */}
      <pointLight
        ref={glowRef}
        position={[0.5, 0, 0.3]}
        intensity={0}
        color={accent}
        distance={2.5}
        decay={2}
      />

      {/* ── HOVER LABEL (HTML) ── */}
      {hovered && (
        <Html
          position={[0, 0, FD / 2 + 0.012]}
          center
          style={{ pointerEvents: "none" }}
          transform
          occlude={false}
        >
          <div
            style={{
              position: "absolute",
              bottom: `${((FH / 2 - BORDER) * 0.5 + 0.02) * 120}px`,
              right: `${(BORDER * 0.5) * 120}px`,
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "7.5px",
              letterSpacing: "0.2em",
              color: "#c8b89a",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            VIEW →
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Frame positions on left wall ──
const FRAME_POSITIONS: [number, number, number][] = [
  [-5.92, 2.05, -2.0],
  [-5.92, 2.05,  0.0],
  [-5.92, 2.05,  2.0],
];

export default function ProjectWall() {
  return (
    <group name="project-wall">
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
