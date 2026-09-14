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
 * Automatically compensates FOV on portrait/mobile viewports so the
 * room remains beautifully framed on all devices.
 */
export function useScrollCamera({
  scrollProgress,
  enabled = true,
}: UseScrollCameraProps) {
  const { camera, size } = useThree();
  const prefersReduced = useReducedMotion();

  // Current animated camera state (refs to avoid re-renders)
  const currentPos = useRef(new THREE.Vector3(0.0, 1.65, 5.0));
  const currentTarget = useRef(new THREE.Vector3(0.0, 1.80, -5.86));
  const targetPos = useRef(new THREE.Vector3(0.0, 1.65, 5.0));
  const targetLook = useRef(new THREE.Vector3(0.0, 1.80, -5.86));

  // Responsive FOV compensation for mobile portrait aspect ratios
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const aspect = size.width / Math.max(1, size.height);
    // On landscape (desktop), keep standard 55 FOV
    // On portrait (mobile/tablet), increase FOV so room width is not cropped
    const responsiveFov =
      aspect < 1.0
        ? Math.min(72, Math.max(55, 55 / (aspect * 1.05)))
        : 55;

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

    // Mobile adjustment for Project section: pull camera back slightly so all frames fit
    let px = position[0];
    let py = position[1];
    let pz = position[2];

    if (isMobilePortrait && section === "projects") {
      // Pull back in +X direction to widen view of the left wall
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

    // With reduced motion, snap directly — no damping
    const lambda = prefersReduced ? 100 : 5.5;
    const dt = Math.min(delta, 0.05);

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
