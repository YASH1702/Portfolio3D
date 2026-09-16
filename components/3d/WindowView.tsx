"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";
import { getWindowSceneryTexture } from "@/lib/rainTexture";

/**
 * WindowView — exterior outdoor scenery visible through the architectural window.
 *
 * Enhanced with:
 * - Multi-depth rain simulation (foreground streaks + midground mist)
 * - Dynamic gusting wind slant that sways with atmospheric currents
 * - Rolling horizon mist plane that softly shifts across the backdrop
 * - Adaptive day (overcast rain) / night (rainy city lights) textures
 *
 * Positioned just outside the right window opening at X = 6.05.
 */

const RAIN_COUNT = 110;

export default function WindowView() {
  const { isNightMode } = useStudio();
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(() => {
    if (typeof window !== "undefined") {
      return getWindowSceneryTexture(false);
    }
    return null;
  });

  // Generate scenic texture based on day/night mode
  useEffect(() => {
    const tex = getWindowSceneryTexture(isNightMode);
    if (tex) setTexture(tex);
  }, [isNightMode]);

  // Multi-depth rain particles
  const rainDrops = useMemo(() => {
    return Array.from({ length: RAIN_COUNT }, (_, i) => {
      const isFore = i < 35;
      return {
        x: (Math.random() - 0.5) * 4.2,
        y: (Math.random() - 0.5) * 2.8,
        z: isFore ? (Math.random() * 0.08 - 0.04) : (Math.random() * 0.15 - 0.15),
        speed: isFore ? (4.2 + Math.random() * 2.4) : (2.8 + Math.random() * 1.6),
        length: isFore ? (0.22 + Math.random() * 0.16) : (0.12 + Math.random() * 0.10),
        width: isFore ? 0.0055 : 0.0035,
        opacity: isFore ? 0.48 : 0.28,
      };
    });
  }, []);

  const groupRef = useRef<THREE.Group>(null!);
  const rainRefs = useRef<THREE.Mesh[]>([]);
  const mistRef = useRef<THREE.Mesh>(null!);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    timeRef.current += dt;
    const t = timeRef.current;

    // Atmospheric wind gust modulation
    const windSlant = 0.08 + Math.sin(t * 0.45) * 0.035;

    rainRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const drop = rainDrops[i];
      mesh.position.y -= dt * drop.speed;
      mesh.rotation.z = windSlant;

      // Wrap around when falling past bottom of window
      if (mesh.position.y < -1.45) {
        mesh.position.y = 1.45;
      }
    });

    // Rolling horizon mist panning
    if (mistRef.current) {
      mistRef.current.position.x = Math.sin(t * 0.12) * 0.25;
    }
  });

  return (
    <group
      name="window-view"
      position={[6.05, 2.0, -1.4]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      {/* ── OUTDOOR SCENIC BACKDROP ── */}
      <mesh position={[0, 0, -0.38]}>
        <planeGeometry args={[6.2, 3.5]} />
        <meshBasicMaterial
          map={texture ?? undefined}
          color="#ffffff"
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>

      {/* ── ROLLING HORIZON MIST LAYER ── */}
      <mesh ref={mistRef} position={[0, -0.4, -0.32]}>
        <planeGeometry args={[6.8, 1.8]} />
        <meshBasicMaterial
          color={isNightMode ? "#1a243a" : "#d8e4ee"}
          transparent
          opacity={isNightMode ? 0.28 : 0.22}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>

      {/* Atmospheric volumetric daylight radiance plane (Day mode) */}
      {!isNightMode && (
        <mesh position={[0, 0.4, -0.35]}>
          <planeGeometry args={[5.8, 2.4]} />
          <meshBasicMaterial
            color="#e8f4fc"
            transparent
            opacity={0.14}
            side={THREE.DoubleSide}
            fog={false}
          />
        </mesh>
      )}

      {/* ── FALLING MULTI-DEPTH RAIN STREAKS ── */}
      <group ref={groupRef} position={[0, 0, -0.06]}>
        {rainDrops.map((drop, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) rainRefs.current[i] = el;
            }}
            position={[drop.x, drop.y, drop.z]}
            rotation={[0, 0, 0.08]}
          >
            <planeGeometry args={[drop.width, drop.length]} />
            <meshBasicMaterial
              color={isNightMode ? "#93c5fd" : "#eaf2fb"}
              transparent
              opacity={isNightMode ? drop.opacity * 1.1 : drop.opacity}
              side={THREE.DoubleSide}
              fog={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
