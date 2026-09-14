/**
 * Custom easing functions for cinematic camera movement.
 * All functions take t ∈ [0, 1] and return a value in [0, 1].
 */

/** Smoothstep — S-curve easing */
export function smoothstep(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

/** Smoother step — C2-continuous, less mechanical */
export function smootherstep(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/** Ease out cubic */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Ease in-out cubic */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Ease out quart — very smooth deceleration */
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Exponential damping for real-time camera lerp.
 * dt: delta time (seconds), lambda: ~5–10 for natural feel
 */
export function dampedLerp(
  current: number,
  target: number,
  lambda: number,
  dt: number
): number {
  return target + (current - target) * Math.exp(-lambda * dt);
}

/**
 * Lerp between two values.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Map a value from one range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clampOutput = true
): number {
  const mapped = ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  return clampOutput ? clamp(mapped, outMin, outMax) : mapped;
}
