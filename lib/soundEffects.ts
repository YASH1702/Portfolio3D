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
 * Tactile mechanical click when toggling the Desk Lamp
 */
export function playLampClick() {
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
