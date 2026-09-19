"use client";

import { useEffect, useRef, useCallback } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { interpolateCameraKeyframes } from "@/lib/cameraKeyframes";
import { dampedLerp } from "@/lib/easings";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useStudio } from "@/context/StudioContext";

interface UseScrollCameraProps {
  scrollProgress: number;
  enabled?: boolean;
}

/**
 * Drives the R3F camera based on scroll progress.
 * Smoothly interpolates between camera keyframes using damped lerp.
 * Features:
 * - Automatic vertical FOV compensation for portrait/mobile screens
 * - Subtle, weighted mouse micro-parallax (disabled on touch / reduced motion)
 * - Safe clamped delta time to prevent large jumps
 */
export function useScrollCamera({
  scrollProgress,
  enabled = true,
}: UseScrollCameraProps) {
  const { camera, size } = useThree();
  const prefersReduced = useReducedMotion();
  const { isGyroActive } = useStudio();

  // Base keyframe animated camera state
  const currentPos = useRef(new THREE.Vector3(0.0, 1.65, 5.2));
  const currentTarget = useRef(new THREE.Vector3(0.0, 1.80, -5.86));
  const targetPos = useRef(new THREE.Vector3(0.0, 1.65, 5.2));
  const targetLook = useRef(new THREE.Vector3(0.0, 1.80, -5.86));

  // Mouse & Gyroscope normalized coordinates [-1, 1] for micro-parallax
  const mouseNorm = useRef({ x: 0, y: 0 });
  const gyroNorm = useRef({ x: 0, y: 0 });
  const parallaxPos = useRef({ x: 0, y: 0 });
  const parallaxLook = useRef({ x: 0, y: 0 });

  // Touch / pointer drag orbital look-around state
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragTarget = useRef({ x: 0, y: 0 });
  const dragCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReduced) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (isFinePointer) {
        mouseNorm.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseNorm.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      }
    };

    // Mobile Gyroscope Parallax Listener
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Clamp gamma (tilt left/right, ±15 deg)
        const g = Math.max(-15, Math.min(15, e.gamma)) / 15;
        // Clamp beta (tilt front/back centered at ~45 deg hand holding posture, ±15 deg)
        const b = Math.max(-15, Math.min(15, e.beta - 45)) / 15;
        gyroNorm.current.x = g;
        gyroNorm.current.y = b;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Don't intercept clicks on interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("[role='button']"))
      ) {
        return;
      }

      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragStart.current = { x: e.clientX, y: e.clientY };

      const sensitivityX = 0.003;
      const sensitivityY = 0.003;

      // Update drag target look offset with clamps
      dragTarget.current.x = Math.max(-0.75, Math.min(0.75, dragTarget.current.x + dx * sensitivityX));
      dragTarget.current.y = Math.max(-0.40, Math.min(0.40, dragTarget.current.y - dy * sensitivityY));
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [prefersReduced]);

  // Responsive FOV compensation for mobile portrait aspect ratios
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const aspect = size.width / Math.max(1, size.height);
    const responsiveFov =
      aspect < 1.0
        ? Math.min(72, Math.max(60, 60 / (aspect * 1.05)))
        : 60;

    if (Math.abs(camera.fov - responsiveFov) > 0.5) {
      camera.fov = responsiveFov;
      camera.updateProjectionMatrix();
    }
  }, [size, camera]);

  // Update target whenever scroll changes
  const updateTarget = useCallback(() => {
    if (!enabled) return;
    const { position, target, section } = interpolateCameraKeyframes(scrollProgress);

    const aspect = size.width / Math.max(1, size.height);
    const isMobilePortrait = aspect < 0.9;

    let px = position[0];
    let py = position[1];
    let pz = position[2];

    if (isMobilePortrait && section === "projects") {
      px = Math.min(-1.0, px + 0.8);
    }

    targetPos.current.set(px, py, pz);
    targetLook.current.set(...target);
  }, [scrollProgress, enabled, size]);

  useEffect(() => {
    updateTarget();
  }, [updateTarget]);

  // Animate camera every frame
  useFrame((_, delta) => {
    if (!enabled) return;

    const lambda = prefersReduced ? 100 : 5.5;
    const dt = Math.min(delta, 0.05);

    // Primary scroll position interpolation
    currentPos.current.x = dampedLerp(
      currentPos.current.x,
      targetPos.current.x,
      lambda,
      dt
    );
    currentPos.current.y = dampedLerp(
      currentPos.current.y,
      targetPos.current.y,
      lambda,
      dt
    );
    currentPos.current.z = dampedLerp(
      currentPos.current.z,
      targetPos.current.z,
      lambda,
      dt
    );

    // Primary scroll target lookAt interpolation
    currentTarget.current.x = dampedLerp(
      currentTarget.current.x,
      targetLook.current.x,
      lambda,
      dt
    );
    currentTarget.current.y = dampedLerp(
      currentTarget.current.y,
      targetLook.current.y,
      lambda,
      dt
    );
    currentTarget.current.z = dampedLerp(
      currentTarget.current.z,
      targetLook.current.z,
      lambda,
      dt
    );

    // Gentle micro-parallax offset calculation (mouse + mobile gyroscope)
    if (!prefersReduced) {
      const gyroWeight = isGyroActive ? 1.8 : 0.6;
      const combinedX = mouseNorm.current.x + gyroNorm.current.x * gyroWeight;
      const combinedY = mouseNorm.current.y + gyroNorm.current.y * gyroWeight;

      const scaleMult = isGyroActive ? 1.4 : 1.0;
      const targetParallaxPosX = combinedX * 0.045 * scaleMult;
      const targetParallaxPosY = -combinedY * 0.035 * scaleMult;
      const targetParallaxLookX = combinedX * 0.07 * scaleMult;
      const targetParallaxLookY = -combinedY * 0.045 * scaleMult;

      parallaxPos.current.x = dampedLerp(
        parallaxPos.current.x,
        targetParallaxPosX,
        3.5,
        dt
      );
      parallaxPos.current.y = dampedLerp(
        parallaxPos.current.y,
        targetParallaxPosY,
        3.5,
        dt
      );

      parallaxLook.current.x = dampedLerp(
        parallaxLook.current.x,
        targetParallaxLookX,
        3.5,
        dt
      );
      parallaxLook.current.y = dampedLerp(
        parallaxLook.current.y,
        targetParallaxLookY,
        3.5,
        dt
      );
    }

    // Orbital touch/pointer drag damping
    if (!isDragging.current) {
      dragTarget.current.x = dampedLerp(dragTarget.current.x, 0, 2.2, dt);
      dragTarget.current.y = dampedLerp(dragTarget.current.y, 0, 2.2, dt);
    }
    dragCurrent.current.x = dampedLerp(dragCurrent.current.x, dragTarget.current.x, 8.0, dt);
    dragCurrent.current.y = dampedLerp(dragCurrent.current.y, dragTarget.current.y, 8.0, dt);

    // Apply combined camera position and lookAt
    camera.position.set(
      currentPos.current.x + parallaxPos.current.x + dragCurrent.current.x * 0.12,
      currentPos.current.y + parallaxPos.current.y + dragCurrent.current.y * 0.08,
      currentPos.current.z
    );

    camera.lookAt(
      currentTarget.current.x + parallaxLook.current.x + dragCurrent.current.x,
      currentTarget.current.y + parallaxLook.current.y + dragCurrent.current.y,
      currentTarget.current.z
    );
  });
}
