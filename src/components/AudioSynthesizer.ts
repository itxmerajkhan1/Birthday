/**
 * A highly polished, custom client-side audio synthesizer using Web Audio API.
 * Synthesizes a music-box style, warm crystal chime melody of "Happy Birthday"
 * and ambient starry soundscapes.
 */
class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timeouts: number[] = [];
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  private notes: { note: string; freq: number }[] = [
    { note: "C4", freq: 261.63 },
    { note: "D4", freq: 293.66 },
    { note: "E4", freq: 329.63 },
    { note: "F4", freq: 349.23 },
    { note: "G4", freq: 392.00 },
    { note: "A4", freq: 440.00 },
    { note: "A#4", freq: 466.16 },
    { note: "C5", freq: 523.25 },
    { note: "D5", freq: 587.33 },
    { note: "E5", freq: 659.25 },
    { note: "F5", freq: 698.46 },
    { note: "G5", freq: 783.99 },
    { note: "A5", freq: 880.00 },
  ];

  constructor() {}

  private initCtx() {
    if (!this.ctx) {
      // @ts-ignore
      const AudioCtxFn = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtxFn();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  /**
   * Synthesize a single crystal music box chime
   */
  public playChime(freq: number, duration: number = 2.0, volume: number = 0.15) {
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Create nodes
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator(); // Subharmonic
    const gainNode = ctx.createGain();
    
    // Low-pass filter to sound soft like wood/crystal bells
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    // Sine and Triangle combination for organic music box sound
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, now); // Add higher octave harmonic

    // Volume envelope (immediate attack, long decay)
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Simple delay-reverb effect simulation
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.25;
    const delayGain = ctx.createGain();
    delayGain.gain.value = 0.25; // Reverb tail feedback

    // Hookups
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(filter);
    
    filter.connect(ctx.destination);

    // Delay loop for spacious sound
    filter.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(ctx.destination);
    delayGain.connect(delay); // loop back

    // Play
    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + duration + 0.5);
    osc2.stop(now + duration + 0.5);
  }

  /**
   * Plays a quick magical sparkle chime chord (e.g. on star hover or firework explosion)
   */
  public playSparkleChord() {
    this.initCtx();
    if (!this.ctx) return;

    // Arpeggiated high chime chord
    const scale = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    scale.forEach((freq, index) => {
      const t = setTimeout(() => {
        this.playChime(freq, 1.2, 0.08);
      }, index * 80);
      this.timeouts.push(t as unknown as number);
    });
  }

  /**
   * Plays the Happy Birthday melody in music box bells style
   */
  public playBirthdayMelody() {
    this.initCtx();
    if (!this.ctx) return;

    this.stopMelody();
    this.isPlaying = true;

    // Happy Birthday melody notes and durations (in seconds per beat)
    // Tempo: 110 BPM -> ~0.54s per beat
    const beat = 0.65;
    
    // Note frequencies from our map
    const getFreq = (noteName: string) => {
      const found = this.notes.find(n => n.note === noteName);
      return found ? found.freq : 261.63;
    };

    const melody = [
      // Phrase 1: Happy Birthday to you
      { note: "C4", dur: 0.75 * beat },
      { note: "C4", dur: 0.25 * beat },
      { note: "D4", dur: 1.0 * beat },
      { note: "C4", dur: 1.0 * beat },
      { note: "F4", dur: 1.0 * beat },
      { note: "E4", dur: 2.0 * beat },

      // Phrase 2: Happy Birthday to you
      { note: "C4", dur: 0.75 * beat },
      { note: "C4", dur: 0.25 * beat },
      { note: "D4", dur: 1.0 * beat },
      { note: "C4", dur: 1.0 * beat },
      { note: "G4", dur: 1.0 * beat },
      { note: "F4", dur: 2.0 * beat },

      // Phrase 3: Happy Birthday dear Muneeza
      { note: "C4", dur: 0.75 * beat },
      { note: "C4", dur: 0.25 * beat },
      { note: "C5", dur: 1.0 * beat },
      { note: "A4", dur: 1.0 * beat },
      { note: "F4", dur: 1.0 * beat },
      { note: "E4", dur: 1.0 * beat },
      { note: "D4", dur: 2.0 * beat },

      // Phrase 4: Happy Birthday to you
      { note: "A#4", dur: 0.75 * beat },
      { note: "A#4", dur: 0.25 * beat },
      { note: "A4", dur: 1.0 * beat },
      { note: "F4", dur: 1.0 * beat },
      { note: "G4", dur: 1.0 * beat },
      { note: "F4", dur: 3.0 * beat },
    ];

    let accumTime = 0;

    const playLoop = () => {
      if (!this.isPlaying) return;
      accumTime = 0;

      melody.forEach((item) => {
        const playTime = accumTime;
        const t = setTimeout(() => {
          if (!this.isPlaying) return;
          this.playChime(getFreq(item.note), 2.2, 0.16);
        }, playTime * 1000);

        this.timeouts.push(t as unknown as number);
        accumTime += item.dur;
      });

      // Schedule the next loop after melody finishes + brief pause
      const loopTimeout = setTimeout(() => {
        if (this.isPlaying) {
          playLoop();
        }
      }, (accumTime + 2.0) * 1000);
      this.timeouts.push(loopTimeout as unknown as number);
    };

    // Play initial loop
    playLoop();
    this.startAmbientLull();
  }

  /**
   * Starts a very soft, low-frequency ambient drone to make the app feel warm and cozy
   */
  private startAmbientLull() {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc.type = "sine";
      // Harmonic comforting frequencies (e.g., F2 = 87.31 Hz or C2 = 65.41 Hz)
      this.ambientOsc.frequency.setValueAtTime(87.31, now); 

      // Extremely quiet ambient volume
      this.ambientGain.gain.setValueAtTime(0, now);
      this.ambientGain.gain.linearRampToValueAtTime(0.02, now + 3.0);

      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc.start(now);
    } catch (e) {
      console.warn("Ambient Audio failed to start:", e);
    }
  }

  /**
   * Stops all active play schedules and melodies
   */
  public stopMelody() {
    this.isPlaying = false;
    this.timeouts.forEach(t => clearTimeout(t));
    this.timeouts = [];

    // Stop ambient drone
    if (this.ambientOsc) {
      try {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
      } catch (e) {}
      this.ambientOsc = null;
    }
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch (e) {}
      this.ambientGain = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

// Singleton audio instance
export const synth = new AudioSynthesizer();
