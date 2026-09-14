"use client";

import { useEffect, useRef, useCallback } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { interpolateCameraKeyframes } from "@/lib/cameraKeyframes";
import { dampedLerp } from "@/lib/easings";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface UseScrollCameraProps {
  scrollProgress: number;
  enabled?: boolean;
}

/**
 * Drives the R3F camera based on scroll progress.
 * Smoothly interpolates between camera keyframes using damped lerp.
 *
 * Must be used inside an R3F <Canvas> context.
 */
export function useScrollCamera({
  scrollProgress,
  enabled = true,
}: UseScrollCameraProps) {
  const { camera } = useThree();
  const prefersReduced = useReducedMotion();

  // Current animated camera state (refs to avoid re-renders)
  const currentPos = useRef(new THREE.Vector3(0, 1.6, 5));
  const currentTarget = useRef(new THREE.Vector3(0, 1.4, 0));
  const targetPos = useRef(new THREE.Vector3(0, 1.6, 5));
  const targetLook = useRef(new THREE.Vector3(0, 1.4, 0));

  // Update target whenever scroll changes
  const updateTarget = useCallback(() => {
    if (!enabled) return;
    const { position, target } = interpolateCameraKeyframes(scrollProgress);
    targetPos.current.set(...position);
    targetLook.current.set(...target);
  }, [scrollProgress, enabled]);

  useEffect(() => {
    updateTarget();
  }, [updateTarget]);

  // Animate camera every frame
  useFrame((_, delta) => {
    if (!enabled) return;

    // With reduced motion, snap directly — no damping
    const lambda = prefersReduced ? 100 : 5;

    const dt = Math.min(delta, 0.05); // cap delta to avoid large jumps

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

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });
}
