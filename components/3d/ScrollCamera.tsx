"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import { useScrollCamera } from "@/hooks/useScrollCamera";

interface ScrollCameraProps {
  scrollProgress: number;
}

/**
 * ScrollCamera — renders nothing, just drives the camera.
 * Must be placed inside the R3F Canvas.
 */
export default function ScrollCamera({ scrollProgress }: ScrollCameraProps) {
  useScrollCamera({ scrollProgress, enabled: true });
  return null;
}
