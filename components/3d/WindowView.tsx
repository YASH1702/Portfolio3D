"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";
import { getWindowSceneryTexture } from "@/lib/rainTexture";

/**
 * WindowView — exterior outdoor scenery visible through the architectural window.
 *
 * Features:
 * - Scenic backdrop plane with misty trees and rainy skyline
 * - Adaptive day (overcast rain) / night (rainy city lights) textures
 * - Gentle falling rain streaks outside the window
 *
 * Positioned just outside the right window opening at X = 6.6.
 */

const RAIN_COUNT = 85;

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

  // Generate deterministic rain streak positions
  const rainDrops = useMemo(() => {
    return Array.from({ length: RAIN_COUNT }, () => ({
      x: (Math.random() - 0.5) * 4.0,
      y: (Math.random() - 0.5) * 2.8,
      z: (Math.random() - 0.5) * 0.3,
      speed: 3.6 + Math.random() * 2.2,
      length: 0.18 + Math.random() * 0.14,
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null!);
  const rainRefs = useRef<THREE.Mesh[]>([]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    rainRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const drop = rainDrops[i];
      mesh.position.y -= dt * drop.speed;
      // Wrap around when falling past bottom of window
      if (mesh.position.y < -1.4) {
        mesh.position.y = 1.4;
      }
    });
  });

  return (
    <group
      name="window-view"
      position={[6.05, 2.0, -1.4]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      {/* ── OUTDOOR SCENIC BACKDROP ── */}
      <mesh position={[0, 0, -0.38]}>
        <planeGeometry args={[6.0, 3.4]} />
        <meshBasicMaterial
          map={texture ?? undefined}
          color="#ffffff"
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>

      {/* Atmospheric volumetric daylight radiance plane (Day mode) */}
      {!isNightMode && (
        <mesh position={[0, 0.4, -0.36]}>
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

      {/* ── FALLING RAIN STREAKS OUTSIDE WINDOW ── */}
      <group ref={groupRef} position={[0, 0, -0.06]}>
        {rainDrops.map((drop, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) rainRefs.current[i] = el;
            }}
            position={[drop.x, drop.y, drop.z]}
            rotation={[0, 0, 0.08]} // slight wind slant
          >
            <planeGeometry args={[0.005, drop.length]} />
            <meshBasicMaterial
              color={isNightMode ? "#8cbcf8" : "#eef6ff"}
              transparent
              opacity={isNightMode ? 0.45 : 0.32}
              side={THREE.DoubleSide}
              fog={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
