/**
 * Procedural Web Audio Lo-Fi Beats Music Engine
 *
 * 100% synthesized in real time via Web Audio API.
 * - Zero external mp3/wav files
 * - Warm 7th jazz chord progression (Fmaj7 - Em7 - Dm7 - Cmaj7)
 * - Analog tape wow/flutter modulation & low-pass filtering (warmth)
 * - Procedural vinyl surface crackle buffer
 * - Safe browser autoplay compliance
 */

class LofiAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private vinylNode: AudioBufferSourceNode | null = null;
  private vinylGain: GainNode | null = null;
  private stepTimer: NodeJS.Timeout | null = null;
  private chordIndex = 0;
  private activeVoices: { osc: OscillatorNode; gain: GainNode }[] = [];

  // Fmaj7 -> Em7 -> Dm7 -> Cmaj7 (Hz frequencies)
  private readonly chords: number[][] = [
    [174.61, 220.0, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
    [164.81, 196.0, 246.94, 293.66], // Em7   (E3, G3, B3, D4)
    [146.83, 174.61, 220.0, 261.63], // Dm7   (D3, F3, A3, C4)
    [130.81, 164.81, 196.0, 246.94], // Cmaj7 (C3, E3, G3, B3)
  ];

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Generates a 4-second procedural vinyl crackle audio buffer
   */
  private createVinylCrackleBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Background pinkish noise
      const noise = (Math.random() * 2 - 1) * 0.008;
      // Occasional vinyl pops / crackle clicks
      const isPop = Math.random() < 0.00035;
      const pop = isPop ? (Math.random() * 2 - 1) * 0.09 : 0;
      output[i] = noise + pop;
    }
    return buffer;
  }

  private playChord(frequencies: number[]) {
    if (!this.ctx || !this.isPlaying || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const chordDuration = 3.6; // seconds per chord

    // Clean up previous chord voices
    this.activeVoices.forEach(({ osc, gain }) => {
      try {
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.stop(now + 0.35);
      } catch {
        // Voice might already be stopped
      }
    });
    this.activeVoices = [];

    // Master filter for the chord — warm low-pass
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(420, now);
    filter.Q.setValueAtTime(2.5, now);
    filter.connect(this.masterGain);

    // Subtle pitch wow/flutter LFO
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.4, now); // 0.4 Hz tape wobble
    lfoGain.gain.setValueAtTime(1.8, now); // subtle pitch drift (Hz)
    lfo.connect(lfoGain);
    lfo.start(now);
    lfo.stop(now + chordDuration);

    frequencies.forEach((freq, idx) => {
      // Warm blend of triangle and sine wave
      const osc = ctx.createOscillator();
      osc.type = idx === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now);
      lfoGain.connect(osc.frequency);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      // Soft gentle attack
      gain.gain.exponentialRampToValueAtTime(0.032, now + 0.45);
      // Gentle sustain
      gain.gain.setValueAtTime(0.026, now + chordDuration - 0.5);
      // Soft release
      gain.gain.exponentialRampToValueAtTime(0.0001, now + chordDuration);

      osc.connect(gain);
      gain.connect(filter);

      osc.start(now);
      osc.stop(now + chordDuration + 0.05);

      this.activeVoices.push({ osc, gain });
    });
  }

  public start(): boolean {
    if (typeof window === "undefined") return false;
    if (this.isPlaying) return true;

    try {
      const ctx = this.getAudioContext();
      this.isPlaying = true;

      // Master Gain
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.75, ctx.currentTime + 1.2);
      this.masterGain.connect(ctx.destination);

      // Start Vinyl Crackle loop
      const vinylBuffer = this.createVinylCrackleBuffer(ctx);
      this.vinylNode = ctx.createBufferSource();
      this.vinylNode.buffer = vinylBuffer;
      this.vinylNode.loop = true;

      this.vinylGain = ctx.createGain();
      this.vinylGain.gain.setValueAtTime(0.4, ctx.currentTime);

      this.vinylNode.connect(this.vinylGain);
      this.vinylGain.connect(this.masterGain);
      this.vinylNode.start();

      // Step loop
      this.chordIndex = 0;
      this.playChord(this.chords[this.chordIndex]);

      this.stepTimer = setInterval(() => {
        if (!this.isPlaying) return;
        this.chordIndex = (this.chordIndex + 1) % this.chords.length;
        this.playChord(this.chords[this.chordIndex]);
      }, 3600);

      return true;
    } catch {
      this.isPlaying = false;
      return false;
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.stepTimer) {
      clearInterval(this.stepTimer);
      this.stepTimer = null;
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);
    }

    setTimeout(() => {
      if (this.vinylNode) {
        try {
          this.vinylNode.stop();
          this.vinylNode.disconnect();
        } catch {}
        this.vinylNode = null;
      }
      this.activeVoices.forEach(({ osc }) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.activeVoices = [];
    }, 650);
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const lofiAudio = new LofiAudioEngine();