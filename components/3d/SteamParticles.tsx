"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 6;

/**
 * SteamParticles — wispy steam rising from the desk coffee cup.
 * Uses instancedMesh for minimal draw calls.
 * Position is relative to the parent Desk group.
 * Cup is at [0.58, 0.762, -0.1] in desk-local space, top at ~Y+0.072.
 */
export default function SteamParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        phase:    (i / PARTICLE_COUNT) * Math.PI * 2,
        driftX:   (Math.random() - 0.5) * 0.012,
        driftZ:   (Math.random() - 0.5) * 0.008,
        speed:    0.22 + Math.random() * 0.12,
        baseSize: 0.006 + Math.random() * 0.004,
      })),
    []
  );

  const dummy   = useMemo(() => new THREE.Object3D(), []);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += Math.min(delta, 0.05);
    const t = timeRef.current;

    particles.forEach((p, i) => {
      const lifetime = ((t * p.speed + p.phase) % (Math.PI * 2)) / (Math.PI * 2);
      const yOffset  = lifetime * 0.12;
      const wobble   = Math.sin(t * 1.4 + p.phase) * 0.006;

      dummy.position.set(p.driftX + wobble, yOffset, p.driftZ);

      const scaleCurve = Math.sin(lifetime * Math.PI);
      const s = p.baseSize * (0.3 + scaleCurve * 1.4);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const gray = 0.82 + lifetime * 0.12;
      meshRef.current.setColorAt(i, new THREE.Color(gray, gray, gray));
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  // Placed inside the coffee cup group in Desk.tsx.
  // Cup liquid surface is at Y=0.036, so steam starts right above at Y=0.042
  return (
    <group position={[0, 0.042, 0]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[1, 5, 4]} />
        <meshStandardMaterial
          color="#e8e4dc"
          transparent
          opacity={0.22}
          roughness={1}
          metalness={0}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}
