/**
 * Web Audio API based ambient romantic chord generator
 * Creates a soft, warm, ethereal soundscape with gentle acoustic chords.
 * Zero external audio files needed; guarantees 100% offline reliability.
 */

class RomanticAtmosphere {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: NodeJS.Timeout | null = null;
  private gainNode: GainNode | null = null;

  // Romantic chord progression in D major / B minor:
  // Dmaj7 -> Bm9 -> Gmaj7 -> A9sus4
  private chords = [
    [293.66, 369.99, 440.0, 554.37], // D4, F#4, A4, C#5 (Dmaj7)
    [246.94, 293.66, 369.99, 440.0],  // B3, D4, F#4, A4 (Bm7)
    [196.0, 246.94, 293.66, 369.99],  // G3, B3, D4, F#4 (Gmaj7)
    [220.0, 293.66, 329.63, 440.0],   // A3, D4, E4, A4 (A9sus4)
  ];
  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime); // gentle, unobtrusive volume
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private playGentleNote(freq: number, delayMs: number, duration: number) {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;

    setTimeout(() => {
      if (!this.ctx || !this.gainNode || !this.isPlaying) return;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft sine + subtle triangle warmth
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const startTime = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, startTime);
      noteGain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.8);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    }, delayMs);
  }

  public play() {
    this.initContext();
    this.isPlaying = true;

    const playNextArpeggio = () => {
      if (!this.isPlaying) return;
      const chord = this.chords[this.currentChordIndex];
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

      // Arpeggiate the notes gently
      chord.forEach((freq, idx) => {
        this.playGentleNote(freq, idx * 350, 4.5);
      });
    };

    playNextArpeggio();
    this.intervalId = setInterval(playNextArpeggio, 3600);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

export const romanticAudio = typeof window !== "undefined" ? new RomanticAtmosphere() : null;
