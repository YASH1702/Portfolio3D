"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { projects, type Project } from "@/data/projects";

/**
 * ProjectFrame — a single framed project display on the left wall.
 *
 * Geometry:
 * - Outer frame (dark wood)
 * - Matte / artwork area (placeholder color gradient)
 * - Project info overlay (HTML label via Drei Html)
 *
 * Interaction:
 * - Hover: brightness increase, cursor change
 * - Click: navigate to /projects/[id]
 */

interface ProjectFrameProps {
  project: Project;
  position: [number, number, number];
}

export function ProjectFrame({ project, position }: ProjectFrameProps) {
  const router = useRouter();
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const emissiveRef = useRef(0);

  useFrame((_, delta) => {
    // Smooth emissive glow on hover
    const target = hovered ? 0.12 : 0;
    emissiveRef.current += (target - emissiveRef.current) * 0.08;

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = emissiveRef.current;
    }
  });

  const handleClick = () => {
    router.push(`/projects/${project.id}`);
  };

  // Frame dimensions
  const fw = 1.2; // frame width
  const fh = 0.9; // frame height
  const fd = 0.04; // frame depth
  const border = 0.06;

  return (
    <group
      position={position}
      rotation={[0, Math.PI / 2, 0]}
      name={`frame-${project.id}`}
    >
      {/* ── OUTER FRAME ── */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[fw, fh, fd]} />
        <meshStandardMaterial
          color="#1e1c18"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* ── ARTWORK AREA ── */}
      <mesh
        ref={meshRef}
        position={[0, 0, fd / 2 + 0.001]}
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
          handleClick();
        }}
      >
        <planeGeometry args={[fw - border * 2, fh - border * 2]} />
        <meshStandardMaterial
          color={PROJECT_COLORS[project.id] || "#1a1a2e"}
          roughness={0.8}
          metalness={0}
          emissive={PROJECT_COLORS[project.id] || "#1a1a2e"}
          emissiveIntensity={0}
        />
      </mesh>

      {/* ── PROJECT INFO OVERLAY ── */}
      <Html
        position={[0, 0, fd / 2 + 0.012]}
        center
        style={{ pointerEvents: "none", width: `${(fw - border * 2) * 120}px` }}
        transform
        occlude={false}
      >
        <div
          style={{
            fontFamily: "var(--font-geist-sans), sans-serif",
            color: "#f5f0e8",
            textAlign: "left",
            padding: "8px",
            userSelect: "none",
            width: "100%",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px",
              color: "#a09080",
              letterSpacing: "0.15em",
              marginBottom: "6px",
            }}
          >
            {project.number}
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "4px",
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: "8px",
              color: "#a09080",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            {project.subtitle}
          </div>
          {/* Tech tags */}
          <div
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "7px",
              color: "#706050",
              letterSpacing: "0.08em",
              lineHeight: 1.8,
            }}
          >
            {project.technologies.slice(0, 4).join(" · ")}
          </div>
        </div>

        {/* Hover label */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "8px",
              color: "#c8b89a",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            VIEW →
          </div>
        )}
      </Html>
    </group>
  );
}

// Distinct but muted color per project
const PROJECT_COLORS: Record<string, string> = {
  "jobpilot-ai": "#0d1520",
  businessflow: "#0f1a10",
  "ai-automation-platform": "#1a0d1a",
};

/**
 * ProjectWall — the left wall containing all three project frames.
 */
export default function ProjectWall() {
  // Frame positions on the left wall (X = -5.95 is near the wall)
  const framePositions: [number, number, number][] = [
    [-5.95, 2.0, -1.6],
    [-5.95, 2.0, 0.0],
    [-5.95, 2.0, 1.6],
  ];

  return (
    <group name="project-wall">
      {projects.map((project, i) => (
        <ProjectFrame
          key={project.id}
          project={project}
          position={framePositions[i]}
        />
      ))}
    </group>
  );
}
