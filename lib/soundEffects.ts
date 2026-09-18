/**
 * soundEffects.ts — Procedural Web Audio API sound design for 3D studio interactions.
 *
 * 100% synthesized in real time. Zero external audio files, zero network bandwidth.
 * Only plays on direct user interactions (clicks, keypresses).
 */

let sfxCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sfxCtx) {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtxClass) {
      sfxCtx = new AudioCtxClass();
    }
  }
  if (sfxCtx && sfxCtx.state === "suspended") {
    sfxCtx.resume().catch(() => {});
  }
  return sfxCtx;
}

/**
 * Trigger subtle physical vibration haptics on supported mobile/touch devices
 */
export function triggerHaptic(type: "light" | "medium" | "heavy" | "success" = "light") {
  if (typeof window === "undefined" || !("vibrate" in navigator)) return;
  try {
    switch (type) {
      case "light":
        navigator.vibrate(10);
        break;
      case "medium":
        navigator.vibrate(22);
        break;
      case "heavy":
        navigator.vibrate([35, 25, 35]);
        break;
      case "success":
        navigator.vibrate([15, 30, 20]);
        break;
    }
  } catch {}
}

/**
 * Tactile mechanical click when toggling the Desk Lamp
 */
export function playLampClick() {
  triggerHaptic("medium");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // High-frequency transient click
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(2200, now);
  osc1.frequency.exponentialRampToValueAtTime(350, now + 0.025);

  gain1.gain.setValueAtTime(0.22, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);

  osc1.start(now);
  osc1.stop(now + 0.03);

  // Lower body resonant "clack"
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(280, now);
  osc2.frequency.exponentialRampToValueAtTime(80, now + 0.045);

  gain2.gain.setValueAtTime(0.18, now);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);

  osc2.start(now);
  osc2.stop(now + 0.05);
}

/**
 * Atmospheric ambient chime when toggling Day / Night mode
 */
export function playDayNightSound(toNight: boolean) {
  triggerHaptic("medium");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const frequencies = toNight ? [330, 261.63, 196] : [261.63, 329.63, 392]; // Am / C chord

  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + i * 0.06);

    gain.gain.setValueAtTime(0.001, now + i * 0.06);
    gain.gain.linearRampToValueAtTime(0.09, now + i * 0.06 + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.75);
  });
}

/**
 * Cozy rhythmic cat purr vibration
 */
export function playCatPurr() {
  triggerHaptic("heavy");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 1.4;

  // Low frequency rumble carrier
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(32, now);

  // Purr rhythm modulator (26Hz vibration)
  const modOsc = ctx.createOscillator();
  modOsc.type = "sine";
  modOsc.frequency.setValueAtTime(24, now);

  const modGain = ctx.createGain();
  modGain.gain.setValueAtTime(16, now);
  modOsc.connect(modGain);
  modGain.connect(osc.frequency);

  // Envelope gain
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.001, now);
  masterGain.gain.linearRampToValueAtTime(0.22, now + 0.25);
  masterGain.gain.linearRampToValueAtTime(0.18, now + 0.9);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(masterGain);
  masterGain.connect(ctx.destination);

  modOsc.start(now);
  osc.start(now);

  modOsc.stop(now + duration);
  osc.stop(now + duration);
}

/**
 * High-tech tactile tick when cycling monitor mode
 */
export function playTerminalTick() {
  triggerHaptic("light");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1400, now);
  osc.frequency.exponentialRampToValueAtTime(450, now + 0.02);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.025);
}

/**
 * Subtle feedback for navigation key shortcuts [1-4]
 */
export function playNavBlip() {
  triggerHaptic("light");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(587.33, now); // D5 note

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}

/**
 * Retro-mechanical terminal keypress tick
 */
export function playTerminalKey() {
  triggerHaptic("light");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Subtle pitch variation for natural typing feel
  const baseFreq = 1800 + (Math.random() * 400 - 200);
  osc.type = "sine";
  osc.frequency.setValueAtTime(baseFreq, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.012);

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.015);
}

/**
 * Tactile vinyl player needle drop / start sound
 */
export function playVinylDrop() {
  triggerHaptic("medium");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}

/**
 * Soft book page turn paper sweep sound
 */
export function playBookFlip() {
  triggerHaptic("light");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(640, now + 0.04);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.07);
}

/**
 * Soft ceramic mug clink and warm sip sound
 */
export function playCoffeeSip() {
  triggerHaptic("medium");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Ceramic tap/clink
  const clinkOsc = ctx.createOscillator();
  const clinkGain = ctx.createGain();
  clinkOsc.type = "sine";
  clinkOsc.frequency.setValueAtTime(2600, now);
  clinkOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.035);

  clinkGain.gain.setValueAtTime(0.12, now);
  clinkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  clinkOsc.connect(clinkGain);
  clinkGain.connect(ctx.destination);
  clinkOsc.start(now);
  clinkOsc.stop(now + 0.045);

  // Soft gulp/sip body
  const sipOsc = ctx.createOscillator();
  const sipGain = ctx.createGain();
  sipOsc.type = "triangle";
  sipOsc.frequency.setValueAtTime(210, now + 0.03);
  sipOsc.frequency.exponentialRampToValueAtTime(140, now + 0.14);

  sipGain.gain.setValueAtTime(0.001, now + 0.03);
  sipGain.gain.linearRampToValueAtTime(0.09, now + 0.06);
  sipGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

  sipOsc.connect(sipGain);
  sipGain.connect(ctx.destination);
  sipOsc.start(now + 0.03);
  sipOsc.stop(now + 0.17);
}

/**
 * Clicky tactile microswitch sound for laser pointer toggle
 */
export function playLaserClick() {
  triggerHaptic("light");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(3200, now);
  osc.frequency.exponentialRampToValueAtTime(1400, now + 0.025);

  gain.gain.setValueAtTime(0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.035);
}

/**
 * Playful kitten chirp / curious chirp when swatting at laser
 */
export function playLaserChirp() {
  triggerHaptic("light");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  // Pitch bend upward then downward chirp (like an excited "mrr-ep!")
  osc.frequency.setValueAtTime(680, now);
  osc.frequency.exponentialRampToValueAtTime(1240, now + 0.08);
  osc.frequency.exponentialRampToValueAtTime(920, now + 0.18);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.24);
}

/**
 * Tactile wooden/aluminum venetian blind slat rattle and cord flutter
 */
export function playBlindsRattle() {
  triggerHaptic("medium");
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Flutter burst across 5 rapid clicks
  for (let i = 0; i < 5; i++) {
    const clickTime = now + i * 0.038 + Math.random() * 0.01;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = i % 2 === 0 ? "triangle" : "sine";
    osc.frequency.setValueAtTime(900 + Math.random() * 700, clickTime);
    osc.frequency.exponentialRampToValueAtTime(240, clickTime + 0.03);

    const amp = 0.07 * (1 - i * 0.15);
    gain.gain.setValueAtTime(amp, clickTime);
    gain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(clickTime);
    osc.stop(clickTime + 0.04);
  }
}
