"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";

const MOTE_COUNT = 45;

/**
 * DustMotes — microscopic atmospheric dust motes slowly drifting through
 * the studio air, catching sunlight in Day Mode and warm lamp light in Night Mode.
 *
 * Uses instanced mesh for 0 CPU overhead and 60 FPS performance.
 */
export default function DustMotes() {
  const { isNightMode } = useStudio();
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate bounded positions inside the main room volume
  const motes = useMemo(() => {
    return Array.from({ length: MOTE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 6.5,
      y: 0.6 + Math.random() * 2.8,
      z: (Math.random() - 0.5) * 6.0,
      speedY: 0.04 + Math.random() * 0.05,
      speedX: (Math.random() - 0.5) * 0.06,
      speedZ: (Math.random() - 0.5) * 0.06,
      wobbleSpeed: 0.6 + Math.random() * 1.2,
      wobbleOffset: Math.random() * Math.PI * 2,
      size: 0.007 + Math.random() * 0.009,
    }));
  }, []);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.05);
    timeRef.current += dt;
    const t = timeRef.current;

    motes.forEach((mote, i) => {
      // Gentle Brownian floating motion
      let curX = mote.x + Math.sin(t * mote.wobbleSpeed + mote.wobbleOffset) * 0.12 + mote.speedX * t;
      let curY = mote.y + Math.cos(t * (mote.wobbleSpeed * 0.8) + mote.wobbleOffset) * 0.08 - (t * mote.speedY) % 2.5;
      let curZ = mote.z + Math.sin(t * (mote.wobbleSpeed * 0.9) + mote.wobbleOffset) * 0.1 + mote.speedZ * t;

      // Wrap around bounds so motes continuously cycle
      if (curY < 0.4) curY += 2.5;
      if (curX > 3.5) curX -= 7.0;
      if (curX < -3.5) curX += 7.0;
      if (curZ > 3.2) curZ -= 6.4;
      if (curZ < -3.2) curZ += 6.4;

      dummy.position.set(curX, curY, curZ);

      // Shimmering brightness
      const shimmer = 0.5 + Math.sin(t * 2.5 + mote.wobbleOffset) * 0.4;
      dummy.scale.setScalar(mote.size * shimmer);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, MOTE_COUNT]}
      frustumCulled={false}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color={isNightMode ? "#ffd899" : "#fff8e7"}
        transparent
        opacity={isNightMode ? 0.45 : 0.65}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
