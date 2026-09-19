"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Billboard } from "@react-three/drei";
import { useStudio } from "@/context/StudioContext";
import { playYarnBat } from "@/lib/soundEffects";

// Shared ref for instantaneous zero-latency frame-rate tracking by SleepingCat
export const yarnWorldPosition = new THREE.Vector3(-0.85, 0.045, 1.25);
export const yarnIsRolling = { current: false, speed: 0, lastBatTime: 0 };

// Rug spatial boundary limits (resting on rug in front of couch)
const RUG_MIN_X = -2.25;
const RUG_MAX_X = 0.85;
const RUG_MIN_Z = 0.15;
const RUG_MAX_Z = 2.05;
const BALL_RADIUS = 0.045;
const FLOOR_Y = BALL_RADIUS;

export default function YarnBall({
  initialPosition = [-0.85, 0.045, 1.25],
}: {
  initialPosition?: [number, number, number];
}) {
  const { isNightMode, setYarnState } = useStudio();
  const { camera } = useThree();

  const groupRef = useRef<THREE.Group>(null!);
  const rollingCoreRef = useRef<THREE.Group>(null!);
  const shadowRef = useRef<THREE.Mesh>(null!);
  const hoverBadgeRef = useRef<THREE.Group>(null!);

  const [hovered, setHovered] = useState(false);

  // Physics vectors
  const pos = useRef(new THREE.Vector3(...initialPosition));
  const vel = useRef(new THREE.Vector3(0, 0, 0));
  const rollingQuat = useRef(new THREE.Quaternion());
  const trailPoints = useRef<THREE.Vector3[]>([
    new THREE.Vector3(initialPosition[0] - 0.25, 0.007, initialPosition[2] + 0.18),
    new THREE.Vector3(initialPosition[0] - 0.12, 0.007, initialPosition[2] + 0.09),
    new THREE.Vector3(...initialPosition),
  ]);

  const lastBroadcastTime = useRef(0);

  // Trailing line geometry
  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const pts = new Float32Array(30 * 3);
    geom.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    return geom;
  }, []);

  // Wool colors
  const YARN_PRIMARY   = "#d8523f"; // Warm tactile terracotta-crimson wool
  const YARN_HIGHLIGHT = "#f0725d"; // Lighter twisted ply
  const YARN_SHADOW    = "#b43928"; // Deep core crease

  const threadLine = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: "#d8523f",
      linewidth: 2,
      transparent: true,
      opacity: 0.88,
    });
    return new THREE.Line(lineGeometry, mat);
  }, [lineGeometry]);

  const handlePointerEnter = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerLeave = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "default";
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    playYarnBat();

    // Direction away from camera with a playful scatter angle
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();

    // Add slight random deflection angle (-35 to +35 degrees)
    const angleOffset = (Math.random() - 0.5) * 0.9;
    const cosA = Math.cos(angleOffset);
    const sinA = Math.sin(angleOffset);
    const batDirX = camDir.x * cosA - camDir.z * sinA;
    const batDirZ = camDir.x * sinA + camDir.z * cosA;

    // Impulse magnitude
    const impulseSpeed = 1.35 + Math.random() * 0.55;
    vel.current.x = batDirX * impulseSpeed;
    vel.current.z = batDirZ * impulseSpeed;
    vel.current.y = 0.05; // tiny tactile hop

    yarnIsRolling.current = true;
    yarnIsRolling.lastBatTime = Date.now();
  };

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    // Apply friction and gravity
    const speed2D = Math.hypot(vel.current.x, vel.current.z);
    yarnIsRolling.speed = speed2D;

    if (speed2D > 0.005) {
      // Rug wool rolling friction damping
      const friction = Math.pow(0.15, dt);
      vel.current.x *= friction;
      vel.current.z *= friction;

      // Update position
      const dx = vel.current.x * dt;
      const dz = vel.current.z * dt;
      pos.current.x += dx;
      pos.current.z += dz;

      // Handle vertical bounce / gravity
      if (pos.current.y > FLOOR_Y || vel.current.y > 0) {
        vel.current.y -= 9.8 * dt * 0.45;
        pos.current.y += vel.current.y * dt;
        if (pos.current.y <= FLOOR_Y) {
          pos.current.y = FLOOR_Y;
          vel.current.y = 0;
        }
      }

      // Rug boundary collision with gentle bounce
      let bounced = false;
      if (pos.current.x < RUG_MIN_X) {
        pos.current.x = RUG_MIN_X;
        vel.current.x = -vel.current.x * 0.55;
        bounced = true;
      } else if (pos.current.x > RUG_MAX_X) {
        pos.current.x = RUG_MAX_X;
        vel.current.x = -vel.current.x * 0.55;
        bounced = true;
      }

      if (pos.current.z < RUG_MIN_Z) {
        pos.current.z = RUG_MIN_Z;
        vel.current.z = -vel.current.z * 0.55;
        bounced = true;
      } else if (pos.current.z > RUG_MAX_Z) {
        pos.current.z = RUG_MAX_Z;
        vel.current.z = -vel.current.z * 0.55;
        bounced = true;
      }

      if (bounced) {
        playYarnBat();
      }

      // True 3D Rolling without slipping:
      // Angular velocity vector is perpendicular to (dx, dz)
      const rollDist = Math.hypot(dx, dz);
      if (rollDist > 0.0001) {
        const rollAngle = rollDist / BALL_RADIUS;
        const axisX = -dz / rollDist;
        const axisZ = dx / rollDist;
        const deltaQuat = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(axisX, 0, axisZ),
          rollAngle
        );
        rollingQuat.current.premultiply(deltaQuat);
      }

      // Add trail point if ball moved enough distance
      const lastPoint = trailPoints.current[trailPoints.current.length - 1];
      if (!lastPoint || lastPoint.distanceTo(pos.current) > 0.065) {
        trailPoints.current.push(new THREE.Vector3(pos.current.x, 0.007, pos.current.z));
        if (trailPoints.current.length > 20) {
          trailPoints.current.shift();
        }
      }
      yarnIsRolling.current = true;
    } else {
      vel.current.set(0, 0, 0);
      pos.current.y = FLOOR_Y;
      yarnIsRolling.current = false;
    }

    // Synchronize direct world coordinate reference
    yarnWorldPosition.copy(pos.current);

    // Apply transformation to mesh groups
    if (groupRef.current) {
      groupRef.current.position.copy(pos.current);
    }
    if (rollingCoreRef.current) {
      rollingCoreRef.current.quaternion.copy(rollingQuat.current);
    }

    // Dynamic contact shadow scaling
    if (shadowRef.current) {
      const heightAboveFloor = Math.max(0, pos.current.y - FLOOR_Y);
      const shadowScale = 1 - Math.min(0.5, heightAboveFloor * 4.0);
      shadowRef.current.scale.set(shadowScale, shadowScale, shadowScale);
    }

    // Update trailing line geometry
    if (lineGeometry && trailPoints.current.length >= 2) {
      const positions = lineGeometry.attributes.position as THREE.BufferAttribute;
      const count = trailPoints.current.length;
      for (let i = 0; i < count; i++) {
        const pt = trailPoints.current[i];
        positions.setXYZ(i, pt.x, pt.y, pt.z);
      }
      // Connect final tip directly to current ball position
      positions.setXYZ(count, pos.current.x, 0.007, pos.current.z);
      positions.needsUpdate = true;
      lineGeometry.setDrawRange(0, count + 1);
    }

    // Animate hover badge
    if (hoverBadgeRef.current) {
      const targetScale = hovered ? 1 : 0;
      hoverBadgeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), dt * 14);
      hoverBadgeRef.current.position.y = 0.12 + (hovered ? Math.sin(Date.now() * 0.004) * 0.01 : 0);
    }

    // Periodic broadcast to StudioContext (throttled to 10Hz to preserve 60FPS UI)
    const now = Date.now();
    if (now - lastBroadcastTime.current > 100) {
      lastBroadcastTime.current = now;
      setYarnState([pos.current.x, pos.current.y, pos.current.z], speed2D > 0.04);
    }
  });

  return (
    <>
      {/* ── UNRAVELED TRAILING WOOL YARN THREAD ON RUG ── */}
      <primitive object={threadLine} />

      {/* ── YARN BALL & ACCENT DETAIL GROUP ── */}
      <group
        ref={groupRef}
        position={initialPosition}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {/* Soft contact drop-shadow disc on rug */}
        <mesh
          ref={shadowRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -BALL_RADIUS + 0.002, 0]}
        >
          <circleGeometry args={[BALL_RADIUS * 1.15, 18]} />
          <meshBasicMaterial
            color="#140f0c"
            transparent
            opacity={isNightMode ? 0.45 : 0.28}
          />
        </mesh>

        {/* Rolling internal sphere & wound ribbing loops */}
        <group ref={rollingCoreRef}>
          {/* Main spherical wool yarn core */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[BALL_RADIUS, 22, 18]} />
            <meshStandardMaterial
              color={YARN_PRIMARY}
              roughness={0.94}
              metalness={0.03}
            />
          </mesh>

          {/* Wound Yarn Ribbing Wraps (Cross-wound skein rings) */}
          {/* Ring 1: Diagonal slant */}
          <mesh rotation={[0.45, 0.65, 0.2]}>
            <torusGeometry args={[BALL_RADIUS * 0.99, 0.0036, 8, 28]} />
            <meshStandardMaterial color={YARN_HIGHLIGHT} roughness={0.92} />
          </mesh>

          {/* Ring 2: Opposing cross angle */}
          <mesh rotation={[-0.55, 0.85, -0.35]}>
            <torusGeometry args={[BALL_RADIUS * 0.99, 0.0034, 8, 28]} />
            <meshStandardMaterial color={YARN_SHADOW} roughness={0.95} />
          </mesh>

          {/* Ring 3: Equatorial rib */}
          <mesh rotation={[1.15, -0.25, 0.75]}>
            <torusGeometry args={[BALL_RADIUS * 0.985, 0.0038, 8, 28]} />
            <meshStandardMaterial color={YARN_HIGHLIGHT} roughness={0.92} />
          </mesh>

          {/* Ring 4: Vertical cross wrap */}
          <mesh rotation={[-0.8, 1.25, 0.4]}>
            <torusGeometry args={[BALL_RADIUS * 0.99, 0.0032, 8, 28]} />
            <meshStandardMaterial color={YARN_PRIMARY} roughness={0.94} />
          </mesh>

          {/* Tiny knotted yarn tuft at top */}
          <mesh position={[0, BALL_RADIUS * 0.94, 0]}>
            <sphereGeometry args={[0.007, 8, 6]} />
            <meshStandardMaterial color={YARN_HIGHLIGHT} roughness={0.9} />
          </mesh>
        </group>

        {/* Hover Cue / Interactive Badge */}
        <group ref={hoverBadgeRef} scale={[0, 0, 0]} position={[0, 0.12, 0]}>
          <Billboard>
            <group position={[0, 0, 0]}>
              <mesh position={[0, 0, -0.001]}>
                <planeGeometry args={[0.26, 0.075]} />
                <meshBasicMaterial
                  color={isNightMode ? "#1a2332" : "#ffffff"}
                  transparent
                  opacity={0.92}
                />
              </mesh>
              <mesh position={[0, 0, -0.002]}>
                <planeGeometry args={[0.272, 0.087]} />
                <meshBasicMaterial
                  color={isNightMode ? "#dfba74" : "#8a5e28"}
                  transparent
                  opacity={0.7}
                />
              </mesh>
              <Text
                fontSize={0.032}
                color={isNightMode ? "#dfba74" : "#633c14"}
                anchorX="center"
                anchorY="middle"
                position={[0, 0.002, 0.005]}
                fontWeight={700}
              >
                🧶 Bat Yarn
              </Text>
            </group>
          </Billboard>
        </group>
      </group>
    </>
  );
}
