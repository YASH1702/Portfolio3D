/**
 * studioAudio.ts — Procedural ambient rain sound via Web Audio API.
 *
 * Generates filtered white noise to simulate rain on a window.
 * No external audio files — fully procedural.
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let bufferSource: AudioBufferSourceNode | null = null;
let initialized = false;
let muted = false;
let currentMode: "day" | "night" = "day";

const GAIN_DAY   = 0.018;
const GAIN_NIGHT = 0.036;

function buildNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const sampleRate  = ctx.sampleRate;
  const length      = sampleRate * 3;
  const buffer      = ctx.createBuffer(2, length, sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return buffer;
}

export function initRainAudio(): void {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;
  try {
    audioCtx   = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = GAIN_DAY;
    masterGain.connect(audioCtx.destination);

    const lowpass = audioCtx.createBiquadFilter();
    lowpass.type  = "lowpass";
    lowpass.frequency.value = 1400;
    lowpass.Q.value = 0.7;
    lowpass.connect(masterGain);

    const bandpass = audioCtx.createBiquadFilter();
    bandpass.type  = "bandpass";
    bandpass.frequency.value = 900;
    bandpass.Q.value = 0.4;
    bandpass.connect(lowpass);

    bufferSource         = audioCtx.createBufferSource();
    bufferSource.buffer  = buildNoiseBuffer(audioCtx);
    bufferSource.loop    = true;
    bufferSource.connect(bandpass);
    bufferSource.start(0);
  } catch {
    initialized = false;
  }
}

export function setRainIntensity(mode: "day" | "night"): void {
  currentMode = mode;
  if (!masterGain || !audioCtx || muted) return;
  const target = mode === "night" ? GAIN_NIGHT : GAIN_DAY;
  masterGain.gain.setTargetAtTime(target, audioCtx.currentTime, 0.8);
}

export function muteRainAudio(): void {
  muted = true;
  if (!masterGain || !audioCtx) return;
  masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.4);
}

export function unmuteRainAudio(mode: "day" | "night"): void {
  muted = false;
  currentMode = mode;
  if (!masterGain || !audioCtx) return;
  const target = mode === "night" ? GAIN_NIGHT : GAIN_DAY;
  masterGain.gain.setTargetAtTime(target, audioCtx.currentTime, 0.5);
}

export function stopRainAudio(): void {
  try { bufferSource?.stop(); audioCtx?.close(); } catch { /* ignore */ }
  bufferSource = null;
  audioCtx     = null;
  masterGain   = null;
  initialized  = false;
  muted        = false;
}

export function isAudioInitialized(): boolean {
  return initialized;
}
