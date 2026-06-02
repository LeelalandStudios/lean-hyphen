let sharedCtx = null;
let bossOsc1 = null;
let bossOsc2 = null;
let bossGain = null;

let finalTimerId = null;
let finalGainNode = null;

function getContext() {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      sharedCtx = new AudioContextClass();
    }
  }
  return sharedCtx;
}

export async function unlockAudio() {
  const ctx = getContext();
  if (!ctx) return null;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch (e) {
      console.warn("Failed to resume AudioContext", e);
    }
  }
  return ctx;
}

if (typeof window !== "undefined") {
  const unlock = () => {
    void unlockAudio();
    window.removeEventListener("click", unlock);
    window.removeEventListener("touchstart", unlock);
  };
  window.addEventListener("click", unlock);
  window.addEventListener("touchstart", unlock);
}

// Helper to run sound with guaranteed context unlock/resume
function withAudio(cb) {
  void unlockAudio().then((ctx) => {
    if (ctx && ctx.state === "running") {
      try {
        cb(ctx);
      } catch (e) {
        console.error("Audio playback error", e);
      }
    }
  });
}

// Group chat message notification: Light WhatsApp/Apple arpeggio chime
export function playNotification() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    const freqs = [880, 1109, 1318.5]; // A5 -> C#6 -> E6
    const delays = [0, 0.07, 0.14];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + delays[idx]);

      gain.gain.setValueAtTime(0.0001, t + delays[idx]);
      gain.gain.exponentialRampToValueAtTime(0.18, t + delays[idx] + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delays[idx] + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t + delays[idx]);
      osc.stop(t + delays[idx] + 0.38);
    });
  });
}

// Scam message notification: Deep ding-dong chime warning sound
export function playScamNotification() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    
    // Ding (low-mid tone: F4)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(349.23, t);
    
    gain1.gain.setValueAtTime(0.0001, t);
    gain1.gain.exponentialRampToValueAtTime(0.3, t + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.58);

    // Dong (deep tone: C4, delayed by 0.25s)
    const delay = 0.25;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(261.63, t + delay);

    gain2.gain.setValueAtTime(0.0001, t + delay);
    gain2.gain.exponentialRampToValueAtTime(0.3, t + delay + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.65);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t + delay);
    osc2.stop(t + delay + 0.68);
  });
}

// Realistic phone typing click sound (fully audible, textured click)
export function playTyping() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    
    // 1. Low click (pop component)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    const pitch = 320 + Math.random() * 50;
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.015);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.65, t + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.02);

    // 2. High-pass noise click (texture component)
    const noiseLength = 0.008; // 8ms
    const bufferSize = ctx.sampleRate * noiseLength;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(1800, t);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + noiseLength);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(t);
    noiseSource.stop(t + noiseLength + 0.002);
  });
}

// Unlock sound: Deeper mechanical double-click pop-pop
export function playUnlock() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    // Pop 1
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(450, t);
    osc1.frequency.exponentialRampToValueAtTime(120, t + 0.015);
    gain1.gain.setValueAtTime(0.0001, t);
    gain1.gain.exponentialRampToValueAtTime(0.4, t + 0.002);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.02);

    // Pop 2
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(580, t + 0.07);
    osc2.frequency.exponentialRampToValueAtTime(180, t + 0.07 + 0.015);
    gain2.gain.setValueAtTime(0.0001, t + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.35, t + 0.07 + 0.002);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.07 + 0.015);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t + 0.07);
    osc2.stop(t + 0.09);
  });
}

// Correct Selection Sound: Satisfying dual chord chime (C6 -> E6 -> G6)
export function playCorrect() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5 -> E5 -> G5 -> C6
    const delays = [0, 0.05, 0.1, 0.15];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + delays[idx]);

      gain.gain.setValueAtTime(0.0001, t + delays[idx]);
      gain.gain.exponentialRampToValueAtTime(0.15, t + delays[idx] + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delays[idx] + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t + delays[idx]);
      osc.stop(t + delays[idx] + 0.38);
    });
  });
}

// Incorrect Selection Sound: Detuned buzzer sound (louder, highly audible)
export function playIncorrect() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    const bursts = [0, 0.14];
    bursts.forEach((delay) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(180, t + delay);

      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(184, t + delay);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, t + delay);

      gain.gain.setValueAtTime(0.0001, t + delay);
      gain.gain.linearRampToValueAtTime(0.38, t + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.12);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(t + delay);
      osc2.start(t + delay);
      
      osc1.stop(t + delay + 0.15);
      osc2.stop(t + delay + 0.15);
    });
  });
}

export function playDealCard() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    const duration = 0.15;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1400, t);
    filter.frequency.exponentialRampToValueAtTime(350, t + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noiseSource.start(t);
    noiseSource.stop(t + duration + 0.05);
  });
}

export function playCompleteCard() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    const delays = [0, 0.06, 0.12, 0.18];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t + delays[idx]);

      gain.gain.setValueAtTime(0.0001, t + delays[idx]);
      gain.gain.exponentialRampToValueAtTime(0.15, t + delays[idx] + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delays[idx] + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t + delays[idx]);
      osc.stop(t + delays[idx] + 0.45);
    });
  });
}

export function playProgressBar() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(987.77, t);
    osc.frequency.exponentialRampToValueAtTime(1479.98, t + 0.08);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);
  });
}

export function playTimerTick() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1500, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.005);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.02, t + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.005);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.006);
  });
}

export function playTimerEnd() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    const beeps = [0, 0.15, 0.3];
    beeps.forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, t + delay);

      gain.gain.setValueAtTime(0.0001, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.12, t + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t + delay);
      osc.stop(t + delay + 0.15);
    });
  });
}

export function playScore80() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    const delays = [0, 0.06, 0.12, 0.18, 0.24];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + delays[idx]);

      gain.gain.setValueAtTime(0.0001, t + delays[idx]);
      gain.gain.exponentialRampToValueAtTime(0.1, t + delays[idx] + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delays[idx] + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t + delays[idx]);
      osc.stop(t + delays[idx] + 0.45);
    });
  });
}

export function playScorePerfect() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51, 1567.98, 2093.0];
    const delays = [0, 0.04, 0.08, 0.12, 0.16, 0.20, 0.24, 0.28];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t + delays[idx]);

      gain.gain.setValueAtTime(0.0001, t + delays[idx]);
      gain.gain.exponentialRampToValueAtTime(0.08, t + delays[idx] + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delays[idx] + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t + delays[idx]);
      osc.stop(t + delays[idx] + 0.55);
    });
  });
}

export function startBossAmbient() {
  const ctx = getContext();
  if (!ctx || ctx.state !== "running") return;

  try {
    stopBossAmbient();

    const t = ctx.currentTime;
    bossOsc1 = ctx.createOscillator();
    bossOsc2 = ctx.createOscillator();
    bossGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    bossOsc1.type = "sawtooth";
    bossOsc1.frequency.setValueAtTime(55, t);

    bossOsc2.type = "triangle";
    bossOsc2.frequency.setValueAtTime(55.6, t);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(130, t);

    bossGain.gain.setValueAtTime(0.0001, t);
    bossGain.gain.linearRampToValueAtTime(0.18, t + 2.0);

    bossOsc1.connect(filter);
    bossOsc2.connect(filter);
    filter.connect(bossGain);
    bossGain.connect(ctx.destination);

    bossOsc1.start(t);
    bossOsc2.start(t);
  } catch (e) {
    console.error("Audio playback error", e);
  }
}

export function stopBossAmbient() {
  try {
    if (bossOsc1) {
      bossOsc1.stop();
      bossOsc1 = null;
    }
    if (bossOsc2) {
      bossOsc2.stop();
      bossOsc2 = null;
    }
    if (bossGain) {
      bossGain.disconnect();
      bossGain = null;
    }
  } catch (e) {
    /* ignore */
  }
}

export function startFinalAmbient() {
  const ctx = getContext();
  if (!ctx || ctx.state !== "running") return;

  try {
    stopFinalAmbient();

    finalGainNode = ctx.createGain();
    finalGainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    finalGainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5);
    finalGainNode.connect(ctx.destination);

    const chords = [
      [130.81, 164.81, 196.00, 246.94],
      [174.61, 220.00, 261.63, 329.63],
      [196.00, 246.94, 293.66, 392.00],
      [220.00, 261.63, 329.63, 440.00],
    ];

    let chordIndex = 0;
    const playChord = () => {
      const now = ctx.currentTime;
      const notes = chords[chordIndex];
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(0.035, now + 1.2);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(g);
        g.connect(finalGainNode);
        osc.start(now);
        osc.stop(now + 4.0);
      });
      chordIndex = (chordIndex + 1) % chords.length;
    };

    playChord();
    finalTimerId = window.setInterval(playChord, 4000);
  } catch (e) {
    console.error("Audio playback error", e);
  }
}

export function stopFinalAmbient() {
  try {
    if (finalTimerId) {
      window.clearInterval(finalTimerId);
      finalTimerId = null;
    }
    if (finalGainNode) {
      finalGainNode.disconnect();
      finalGainNode = null;
    }
  } catch (e) {
    /* ignore */
  }
}

// Thwack Sound: Thin book or card deck being placed on wood
export function playThwack() {
  withAudio((ctx) => {
    const t = ctx.currentTime;
    
    // 1. Woody table surface resonance (mid-low resonance around 220Hz)
    const woodOsc = ctx.createOscillator();
    const woodGain = ctx.createGain();
    woodOsc.type = "triangle";
    woodOsc.frequency.setValueAtTime(240, t);
    woodOsc.frequency.exponentialRampToValueAtTime(140, t + 0.07);

    woodGain.gain.setValueAtTime(0.0001, t);
    woodGain.gain.exponentialRampToValueAtTime(0.7, t + 0.004);
    woodGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

    woodOsc.connect(woodGain);
    woodGain.connect(ctx.destination);
    woodOsc.start(t);
    woodOsc.stop(t + 0.08);

    // 2. Paper slap (higher frequency noise for the pages/cover hitting first)
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    // First slap: Front cover/pages landing
    const noise1 = ctx.createBufferSource();
    noise1.buffer = buffer;
    
    const filter1 = ctx.createBiquadFilter();
    filter1.type = "bandpass";
    filter1.frequency.setValueAtTime(2500, t);
    filter1.Q.setValueAtTime(2.0, t);

    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.6, t);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

    noise1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(ctx.destination);
    noise1.start(t);
    noise1.stop(t + 0.05);

    // Second slap: Slightly delayed (15ms) as pages/back cover settle
    const noise2 = ctx.createBufferSource();
    noise2.buffer = buffer;

    const filter2 = ctx.createBiquadFilter();
    filter2.type = "bandpass";
    filter2.frequency.setValueAtTime(1600, t + 0.015);
    filter2.Q.setValueAtTime(1.5, t + 0.015);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.0001, t);
    gain2.gain.setValueAtTime(0.5, t + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.075);

    noise2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(ctx.destination);
    noise2.start(t + 0.015);
    noise2.stop(t + 0.08);
  });
}
