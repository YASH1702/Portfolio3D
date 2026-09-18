"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";

/**
 * LaserPointer — Interactive red laser pointer system.
 *
 * Interactivity & Visuals:
 * - Emits a high-luminance glowing red dot with radial pulse & corona on room surfaces.
 * - Smoothly tracks cursor across the 3D floor and furniture.
 * - Broadcasts world position to `StudioContext` so SleepingCat reacts in real-time.
 * - Point light illuminates nearby surfaces with vibrant red emission.
 */
export default function LaserPointer() {
  const { isLaserActive, laserTarget, setLaserTarget } = useStudio();
  const { camera, raycaster, pointer, scene } = useThree();

  const dotRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const currentPos = useRef(new THREE.Vector3(0, 0.02, 0));
  const floorPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const intersectPoint = useRef(new THREE.Vector3());

  // Cursor style management
  useEffect(() => {
    if (isLaserActive) {
      document.body.classList.add("laser-active");
    } else {
      document.body.classList.remove("laser-active");
      setLaserTarget(null);
    }
    return () => {
      document.body.classList.remove("laser-active");
    };
  }, [isLaserActive, setLaserTarget]);

  useFrame((_, delta) => {
    if (!isLaserActive) return;

    const dt = Math.min(delta, 0.05);

    // Raycast against ground plane (y = 0)
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.ray.intersectPlane(floorPlane.current, intersectPoint.current);

    if (hit) {
      // Clamp within room boundaries (-5.5 to +5.5 X and Z)
      const clampedX = Math.max(-5.5, Math.min(5.5, hit.x));
      const clampedZ = Math.max(-5.5, Math.min(5.5, hit.z));

      // If near desk (X ~ [-1.5, 1.5], Z ~ [-3.2, -1.2]), elevate to desk height (0.75m)
      const isOverDesk = clampedX >= -1.6 && clampedX <= 1.6 && clampedZ >= -3.2 && clampedZ <= -1.1;
      // If over couch seat cushions, elevate to cushion height (0.54m)
      const isOverCouch = clampedX >= -2.3 && clampedX <= -0.5 && clampedZ >= 1.25 && clampedZ <= 1.8;
      const targetY = isOverDesk ? 0.76 : isOverCouch ? 0.54 : 0.015;

      const targetVec = new THREE.Vector3(clampedX, targetY, clampedZ);
      currentPos.current.lerp(targetVec, Math.min(1, dt * 25));

      if (dotRef.current) {
        dotRef.current.position.copy(currentPos.current);
      }

      // Pulse ring animation
      if (ringRef.current) {
        const time = Date.now() * 0.008;
        const scale = 1 + (Math.sin(time) * 0.5 + 0.5) * 0.6;
        ringRef.current.scale.set(scale, scale, scale);
      }

      setLaserTarget([currentPos.current.x, currentPos.current.y, currentPos.current.z]);
    }
  });

  if (!isLaserActive) return null;

  return (
    <group ref={dotRef} position={[0, 0.02, 0]}>
      {/* ── CORE HIGH-INTENSITY RED LASER DOT ── */}
      <mesh position={[0, 0.004, 0]}>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* ── RADIANT RED GLOW CORE ── */}
      <mesh position={[0, 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.065, 24]} />
        <meshBasicMaterial
          color="#ff0033"
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── PULSING RADIAL BLOOM CORONA ── */}
      <mesh ref={ringRef} position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.065, 0.14, 24]} />
        <meshBasicMaterial
          color="#ff1744"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── DYNAMIC LOCAL RED POINT LIGHT ── */}
      <pointLight
        ref={lightRef}
        color="#ff0033"
        intensity={2.2}
        distance={1.6}
        decay={2}
        position={[0, 0.12, 0]}
      />
    </group>
  );
}
