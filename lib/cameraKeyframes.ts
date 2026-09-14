/**
 * Camera keyframe definitions for the scroll-driven 3D experience.
 *
 * Each keyframe defines:
 * - progress: scroll progress (0–1) where this keyframe applies
 * - position: camera world position [x, y, z]
 * - target: where the camera looks at [x, y, z]
 * - section: human-readable label
 */

export interface CameraKeyframe {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
  section: "home" | "about" | "projects" | "contact";
}

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    // 0%: Initial position — inside the room, facing the front wall
    progress: 0,
    position: [0, 1.6, 5],
    target: [0, 1.4, 0],
    section: "home",
  },
  {
    // 25%: Moved slightly closer to the front wall / workspace
    progress: 0.25,
    position: [0.5, 1.55, 3.2],
    target: [0, 1.4, 0],
    section: "home",
  },
  {
    // 45%: Oriented toward the desk / workspace area (About)
    progress: 0.45,
    position: [1.8, 1.5, 1.8],
    target: [1.5, 1.2, -1],
    section: "about",
  },
  {
    // 65%: Facing the left wall — project frames in view
    progress: 0.65,
    position: [-1.5, 1.6, 0.5],
    target: [-4, 1.5, 0],
    section: "projects",
  },
  {
    // 80%: Closer to project frames
    progress: 0.8,
    position: [-2.5, 1.6, 0.2],
    target: [-4.5, 1.5, 0],
    section: "projects",
  },
  {
    // 100%: Final position — contact area
    progress: 1,
    position: [0, 1.5, -1.5],
    target: [0, 1.2, -4],
    section: "contact",
  },
];

/**
 * Returns an interpolated camera position and target for a given scroll progress.
 * Uses smoothstep easing between keyframes.
 */
export function interpolateCameraKeyframes(progress: number): {
  position: [number, number, number];
  target: [number, number, number];
  section: CameraKeyframe["section"];
} {
  // Clamp progress
  const t = Math.max(0, Math.min(1, progress));

  // Find surrounding keyframes
  let fromFrame = CAMERA_KEYFRAMES[0];
  let toFrame = CAMERA_KEYFRAMES[CAMERA_KEYFRAMES.length - 1];

  for (let i = 0; i < CAMERA_KEYFRAMES.length - 1; i++) {
    if (
      t >= CAMERA_KEYFRAMES[i].progress &&
      t <= CAMERA_KEYFRAMES[i + 1].progress
    ) {
      fromFrame = CAMERA_KEYFRAMES[i];
      toFrame = CAMERA_KEYFRAMES[i + 1];
      break;
    }
  }

  // Local t within this segment
  const segmentDuration = toFrame.progress - fromFrame.progress;
  const localT =
    segmentDuration === 0
      ? 0
      : (t - fromFrame.progress) / segmentDuration;

  // Smoothstep easing
  const easedT = smoothstep(localT);

  return {
    position: lerpV3(fromFrame.position, toFrame.position, easedT),
    target: lerpV3(fromFrame.target, toFrame.target, easedT),
    section: easedT < 0.5 ? fromFrame.section : toFrame.section,
  };
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function lerpV3(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}
