"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { useStudio } from "@/context/StudioContext";

export default function VinylPlayer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { isNightMode, isLofiPlaying, toggleLofi } = useStudio();
  const [hovered, setHovered] = useState(false);

  const discRef = useRef<THREE.Group>(null!);
  const armRef = useRef<THREE.Group>(null!);
  const spinSpeed = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    // Smooth spin acceleration/deceleration
    const targetSpeed = isLofiPlaying ? 3.4 : 0;
    spinSpeed.current = THREE.MathUtils.lerp(spinSpeed.current, targetSpeed, dt * 3.5);

    if (discRef.current && spinSpeed.current > 0.001) {
      discRef.current.rotation.y -= spinSpeed.current * dt;
    }

    // Tonearm smooth swing onto vinyl record
    if (armRef.current) {
      const targetAngle = isLofiPlaying ? 0.38 : -0.15;
      armRef.current.rotation.y = THREE.MathUtils.lerp(
        armRef.current.rotation.y,
        targetAngle,
        dt * 4.0
      );
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      name="vinyl-player"
      onClick={(e) => {
        e.stopPropagation();
        toggleLofi();
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* ── TURNTABLE BASE BODY ── */}
      <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
        <boxGeometry args={[0.34, 0.038, 0.28]} />
        <meshStandardMaterial
          color={isNightMode ? "#1a1612" : "#3e2f22"}
          roughness={0.45}
          metalness={0.1}
        />
      </mesh>

      {/* Silver top faceplate */}
      <mesh receiveShadow position={[0, 0.04, 0]}>
        <boxGeometry args={[0.325, 0.004, 0.265]} />
        <meshStandardMaterial
          color={isNightMode ? "#333842" : "#c4c8cf"}
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* ── VINYL PLATTER & DISC ── */}
      <mesh position={[-0.045, 0.043, 0]}>
        <cylinderGeometry args={[0.115, 0.115, 0.005, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Spinning Vinyl Record */}
      <group ref={discRef} position={[-0.045, 0.047, 0]}>
        {/* Black Vinyl Grooves */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.11, 0.11, 0.003, 36]} />
          <meshStandardMaterial
            color="#080808"
            roughness={0.35}
            metalness={0.7}
          />
        </mesh>
        {/* Subtle groove shine rings */}
        <mesh position={[0, 0.0018, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.045, 0.098, 32]} />
          <meshBasicMaterial color="#1f1f1f" />
        </mesh>
        {/* Vintage Orange Center Label */}
        <mesh position={[0, 0.002, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 0.0032, 24]} />
          <meshStandardMaterial color="#ea580c" roughness={0.7} />
        </mesh>
        {/* Center Spindle Cap */}
        <mesh position={[0, 0.006, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.012, 12]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* ── TONEARM ASSEMBLY ── */}
      <group position={[0.105, 0.045, -0.07]}>
        {/* Pivot base */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.016, 0.018, 0.02, 16]} />
          <meshStandardMaterial color="#c4a855" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Rotating arm */}
        <group ref={armRef} position={[0, 0.02, 0]} rotation={[0, -0.15, 0]}>
          {/* Arm bar */}
          <mesh position={[-0.065, 0, 0.065]} rotation={[0, -Math.PI / 4, 0]}>
            <cylinderGeometry args={[0.0025, 0.0025, 0.18, 8]} />
            <meshStandardMaterial color="#d4d4d8" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Cartridge headshell */}
          <mesh position={[-0.13, -0.004, 0.13]} rotation={[0, -Math.PI / 4, 0]}>
            <boxGeometry args={[0.012, 0.008, 0.024]} />
            <meshStandardMaterial color="#18181b" roughness={0.4} />
          </mesh>
          {/* Counterweight */}
          <mesh position={[0.02, 0, -0.02]} rotation={[0, -Math.PI / 4, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.018, 12]} />
            <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* ── POWER & STATUS LED ── */}
      <mesh position={[0.11, 0.043, 0.09]}>
        <cylinderGeometry args={[0.006, 0.006, 0.004, 12]} />
        <meshBasicMaterial color={isLofiPlaying ? "#22c55e" : "#ef4444"} />
      </mesh>
      {isLofiPlaying && (
        <pointLight
          position={[0.11, 0.06, 0.09]}
          intensity={0.4}
          color="#22c55e"
          distance={0.6}
        />
      )}

      {/* ── FLOATING BILLBOARD TOOLTIP ── */}
      <Billboard position={[0, 0.16, 0]} follow={true}>
        {(hovered || isLofiPlaying) && (
          <group scale={hovered ? [1.08, 1.08, 1] : [1, 1, 1]}>
            <Text
              fontSize={0.038}
              color={isLofiPlaying ? "#22c55e" : hovered ? "#dfba74" : "#e2e8f0"}
              anchorX="center"
              anchorY="middle"
              fontWeight={700}
              letterSpacing={0.06}
            >
              {isLofiPlaying ? "♪ Lo-Fi Beats Playing" : "♪ Lo-Fi Vinyl [M]"}
            </Text>
          </group>
        )}
      </Billboard>
    </group>
  );
}
