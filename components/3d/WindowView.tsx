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
const SNOW_COUNT = 90;

export default function WindowView() {
  const { isNightMode, weather } = useStudio();
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

  // Multi-depth gentle snow particles
  const snowFlakes = useMemo(() => {
    return Array.from({ length: SNOW_COUNT }, (_, i) => {
      const isFore = i < 30;
      return {
        baseX: (Math.random() - 0.5) * 4.4,
        y: (Math.random() - 0.5) * 2.8,
        z: isFore ? (Math.random() * 0.08 - 0.03) : (Math.random() * 0.15 - 0.12),
        speed: 0.35 + Math.random() * 0.45,
        size: isFore ? 0.024 + Math.random() * 0.016 : 0.014 + Math.random() * 0.012,
        wobbleSpeed: 1.2 + Math.random() * 1.4,
        wobbleAmp: 0.06 + Math.random() * 0.07,
        offset: Math.random() * Math.PI * 2,
        opacity: isFore ? 0.75 : 0.45,
      };
    });
  }, []);

  const groupRef = useRef<THREE.Group>(null!);
  const rainRefs = useRef<THREE.Mesh[]>([]);
  const snowRefs = useRef<THREE.Mesh[]>([]);
  const mistRef = useRef<THREE.Mesh>(null!);
  const sunGlowRef = useRef<THREE.Mesh>(null!);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    timeRef.current += dt;
    const t = timeRef.current;

    // Atmospheric wind gust modulation
    const windSlant = 0.08 + Math.sin(t * 0.45) * 0.035;

    // Rain update
    if (weather === "rain") {
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
    }

    // Snow update
    if (weather === "snow") {
      snowRefs.current.forEach((mesh, i) => {
        if (!mesh) return;
        const flake = snowFlakes[i];
        mesh.position.y -= dt * flake.speed;
        mesh.position.x = flake.baseX + Math.sin(t * flake.wobbleSpeed + flake.offset) * flake.wobbleAmp;

        if (mesh.position.y < -1.45) {
          mesh.position.y = 1.45;
        }
      });
    }

    // Sunny glow breathing
    if (weather === "sunny" && sunGlowRef.current) {
      sunGlowRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04);
    }

    // Rolling horizon mist panning
    if (mistRef.current) {
      mistRef.current.position.x = Math.sin(t * 0.12) * 0.25;
    }
  });

  const mistColor = useMemo(() => {
    if (weather === "snow") {
      return isNightMode ? "#1e293b" : "#e2e8f0";
    }
    if (weather === "sunny") {
      return isNightMode ? "#1e1b4b" : "#fef3c7";
    }
    return isNightMode ? "#1a243a" : "#d8e4ee";
  }, [weather, isNightMode]);

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

      {/* ── ROLLING HORIZON MIST / ATMOSPHERE LAYER ── */}
      <mesh ref={mistRef} position={[0, -0.4, -0.32]}>
        <planeGeometry args={[6.8, 1.8]} />
        <meshBasicMaterial
          color={mistColor}
          transparent
          opacity={weather === "sunny" ? (isNightMode ? 0.15 : 0.12) : isNightMode ? 0.32 : 0.25}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>

      {/* ── SUNNY WEATHER: RADIANT SUNBEAMS & GOLDEN GLOW ── */}
      {weather === "sunny" && (
        <group position={[0, 0.3, -0.2]}>
          {/* Ambient Warm Volumetric Sunlight Plane */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[6.0, 3.0]} />
            <meshBasicMaterial
              color={isNightMode ? "#93c5fd" : "#fef08a"}
              transparent
              opacity={isNightMode ? 0.12 : 0.22}
              side={THREE.DoubleSide}
              fog={false}
            />
          </mesh>

          {/* Warm Radiant Sun / Moon Core Disc */}
          <mesh ref={sunGlowRef} position={[1.2, 0.8, -0.05]}>
            <circleGeometry args={[0.42, 32]} />
            <meshBasicMaterial
              color={isNightMode ? "#e0f2fe" : "#ffedd5"}
              transparent
              opacity={isNightMode ? 0.5 : 0.75}
              side={THREE.DoubleSide}
              fog={false}
            />
          </mesh>

          {/* Angled Godray / Beam Plane */}
          <mesh position={[-0.3, -0.2, 0.05]} rotation={[0, 0, -0.35]}>
            <planeGeometry args={[4.5, 1.2]} />
            <meshBasicMaterial
              color={isNightMode ? "#93c5fd" : "#fef3c7"}
              transparent
              opacity={isNightMode ? 0.08 : 0.15}
              side={THREE.DoubleSide}
              fog={false}
            />
          </mesh>
        </group>
      )}

      {/* Atmospheric volumetric daylight radiance plane (Rain mode, day only) */}
      {weather === "rain" && !isNightMode && (
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
      {weather === "rain" && (
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
      )}

      {/* ── DRIFTING SNOWFLAKES ── */}
      {weather === "snow" && (
        <group position={[0, 0, -0.04]}>
          {snowFlakes.map((flake, i) => (
            <mesh
              key={i}
              ref={(el) => {
                if (el) snowRefs.current[i] = el;
              }}
              position={[flake.baseX, flake.y, flake.z]}
            >
              <circleGeometry args={[flake.size, 8]} />
              <meshBasicMaterial
                color={isNightMode ? "#e0f2fe" : "#ffffff"}
                transparent
                opacity={isNightMode ? flake.opacity * 0.9 : flake.opacity}
                side={THREE.DoubleSide}
                fog={false}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
