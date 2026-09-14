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
    // 0%: Initial establishing shot — whole studio visible, facing front wall
    progress: 0.0,
    position: [0.0, 1.65, 5.0],
    target: [0.0, 1.80, -5.86],
    section: "home",
  },
  {
    // 22%: Gliding closer to the front wall — typography becomes commanding
    progress: 0.22,
    position: [0.1, 1.65, 3.0],
    target: [0.0, 1.80, -5.86],
    section: "home",
  },
  {
    // 42%: Pivot and focus on the modern developer desk / workspace
    progress: 0.42,
    position: [1.3, 1.35, 0.4],
    target: [2.2, 1.05, -1.2],
    section: "about",
  },
  {
    // 64%: Transition toward the LEFT wall containing the 3 project frames
    progress: 0.64,
    position: [-1.4, 1.95, 0.0],
    target: [-5.92, 1.95, 0.0],
    section: "projects",
  },
  {
    // 74%: Direct, perpendicular gallery view of all 3 framed projects
    progress: 0.74,
    position: [-2.3, 1.95, 0.0],
    target: [-5.92, 1.95, 0.0],
    section: "projects",
  },
  {
    // 84%: Intimate inspection view of project frames
    progress: 0.84,
    position: [-2.9, 1.95, 0.0],
    target: [-5.92, 1.95, 0.0],
    section: "projects",
  },
  {
    // 100%: Wide, calm final composition — contact card is presented
    progress: 1.0,
    position: [0.0, 1.7, 3.6],
    target: [0.0, 1.4, -2.0],
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
  const t = Math.max(0, Math.min(1, progress));

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

  const segmentDuration = toFrame.progress - fromFrame.progress;
  const localT =
    segmentDuration === 0 ? 0 : (t - fromFrame.progress) / segmentDuration;

  // Smoothstep easing
  const easedT = smoothstep(localT);

  return {
    position: lerpV3(fromFrame.position, toFrame.position, easedT),
    target: lerpV3(fromFrame.target, toFrame.target, easedT),
    section: easedT < 0.5 ? fromFrame.section : toFrame.section,
  };
}

function smoothstep(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
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
