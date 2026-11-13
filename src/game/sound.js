// All sound is synthesized with the Web Audio API, so there are no audio files to load.
// makeSynth works with any AudioContext (a real one in the game, an offline one in tests).
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

export function makeSynth(ctx, sfxOut, musicOut) {
  const noiseBuf = (() => {
    const b = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  })();

  function tone(out, f, t, dur, { type = 'sine', vol = 0.3, to = 0, attack = 0.004 } = {}) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(out, t, dur, { vol = 0.2, f = 2000, to = 0, q = 1, type = 'bandpass' } = {}) {
    const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; fl.type = type; fl.Q.value = q; fl.frequency.setValueAtTime(f, t);
    if (to) fl.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(fl).connect(g).connect(out); s.start(t); s.stop(t + dur + 0.05);
  }
  const bell = (f, t, vol = 0.25, dur = 0.9) => { tone(sfxOut, f, t, dur, { vol }); tone(sfxOut, f * 2.01, t, dur * 0.5, { vol: vol * 0.4 }); tone(sfxOut, f * 3.02, t, dur * 0.25, { vol: vol * 0.15 }); };

  const SFX = {
    coin: (t) => { tone(sfxOut, 1319, t, 0.12, { type: 'triangle', vol: 0.28 }); tone(sfxOut, 1976, t + 0.07, 0.35, { type: 'triangle', vol: 0.28 }); },
    tip: (t) => { SFX.coin(t); tone(sfxOut, 2637, t + 0.16, 0.4, { type: 'triangle', vol: 0.2 }); },
    ding: (t) => bell(1568, t),                         // food is ready
    serve: (t) => { tone(sfxOut, 523, t, 0.12, { type: 'triangle', vol: 0.22 }); tone(sfxOut, 784, t + 0.08, 0.2, { type: 'triangle', vol: 0.22 }); },
    order: (t) => { noise(sfxOut, t, 0.08, { vol: 0.12, f: 4000, q: 2 }); noise(sfxOut, t + 0.09, 0.08, { vol: 0.1, f: 5000, q: 2 }); tone(sfxOut, 392, t + 0.16, 0.12, { type: 'triangle', vol: 0.2 }); },
    boost: (t) => { tone(sfxOut, 880, t, 0.1, { type: 'sine', vol: 0.14 }); tone(sfxOut, 1175, t + 0.07, 0.18, { type: 'sine', vol: 0.14 }); },
    seat: (t) => tone(sfxOut, 380, t, 0.14, { vol: 0.3, to: 760 }),
    clean: (t) => noise(sfxOut, t, 0.4, { vol: 0.22, f: 800, to: 5000, q: 0.8 }),
    arrive: (t) => { bell(880, t, 0.1, 0.5); bell(659, t + 0.16, 0.1, 0.6); },
    angry: (t) => { tone(sfxOut, 300, t, 0.25, { type: 'sawtooth', vol: 0.14, to: 200 }); tone(sfxOut, 220, t + 0.2, 0.35, { type: 'sawtooth', vol: 0.14, to: 140 }); },
    upgrade: (t) => [523, 659, 784, 1047].forEach((f, i) => tone(sfxOut, f, t + i * 0.08, 0.3, { type: 'triangle', vol: 0.22 })),
    nope: (t) => tone(sfxOut, 160, t, 0.16, { type: 'square', vol: 0.12, to: 120 }),
    click: (t) => tone(sfxOut, 700, t, 0.05, { type: 'triangle', vol: 0.18 }),
    tick: (t) => tone(sfxOut, 1000, t, 0.05, { type: 'square', vol: 0.08 }),
    sizzle: (t) => noise(sfxOut, t, 0.5, { vol: 0.08, f: 6000, q: 0.5, type: 'highpass' }),
    win1: (t) => [523, 659, 784].forEach((f, i) => tone(sfxOut, f, t + i * 0.14, 0.5, { type: 'triangle', vol: 0.26 })),
    win2: (t) => [523, 659, 784, 1047].forEach((f, i) => tone(sfxOut, f, t + i * 0.13, 0.55, { type: 'triangle', vol: 0.26 })),
    win3: (t) => { [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => tone(sfxOut, f, t + i * 0.11, 0.7, { type: 'triangle', vol: 0.26 })); bell(2093, t + 0.7, 0.2, 1.4); },
    lose: (t) => [392, 349, 311, 262].forEach((f, i) => tone(sfxOut, f, t + i * 0.22, 0.5, { type: 'triangle', vol: 0.22 })),
  };

  // ---- music: a slow jazzy loop (Dm7 - G7 - Cmaj7 - A7) ----
  const BPM = 88, BEAT = 60 / BPM;
  const BARS = [
    { root: 38, chord: [62, 65, 69, 72], pent: [74, 77, 79, 81, 84] },
    { root: 43, chord: [59, 62, 65, 67], pent: [71, 74, 76, 79, 83] },
    { root: 36, chord: [64, 67, 71, 72], pent: [72, 74, 76, 79, 81] },
    { root: 45, chord: [61, 64, 67, 69], pent: [73, 76, 78, 81, 85] },
  ];
  function pianoNote(m, t, dur, vol) {
    tone(musicOut, mtof(m), t, dur, { type: 'triangle', vol, attack: 0.01 });
    tone(musicOut, mtof(m) * 2, t, dur * 0.4, { type: 'sine', vol: vol * 0.25, attack: 0.01 });
  }
  function scheduleBar(i, t0) {
    const bar = BARS[i % BARS.length];
    const swing = (b) => t0 + b * BEAT;
    // chord stabs: beat 1, "and" of 2, beat 4
    [[0, 1.6], [1.67, 0.6], [3, 0.9]].forEach(([b, d], k) => bar.chord.forEach((m) => pianoNote(m - 12, swing(b), d * BEAT, k === 0 ? 0.05 : 0.04)));
    // walking bass
    [bar.root, bar.root + 4, bar.root + 7, bar.root + 9].forEach((m, k) => tone(musicOut, mtof(m - 12 + 12), swing(k), BEAT * 0.9, { type: 'sine', vol: 0.16, attack: 0.02 }));
    // brushes
    for (let k = 0; k < 4; k++) { noise(musicOut, swing(k), 0.07, { vol: 0.035, f: 7000, q: 0.6, type: 'highpass' }); noise(musicOut, swing(k + 0.67), 0.05, { vol: 0.02, f: 8000, q: 0.6, type: 'highpass' }); }
    // sparse melody
    [0.5, 1.67, 2.5, 3.67].forEach((b) => { if (Math.random() < 0.45) pianoNote(bar.pent[Math.floor(Math.random() * bar.pent.length)], swing(b), BEAT * 0.8, 0.05); });
  }
  return { play: (name, t = ctx.currentTime) => SFX[name] && SFX[name](t + 0.005), scheduleBar, BEAT, names: Object.keys(SFX) };
}

// ---- the game's sound: one shared instance with mute settings saved in the browser ----
const KEY = 'dine-and-dash:sound:v1';
let settings = { sfx: true, music: true };
try { Object.assign(settings, JSON.parse(localStorage.getItem(KEY)) || {}); } catch { /* use defaults */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(settings)); } catch { /* ignore */ } };

let ctx = null, synth = null, sfxGain = null, musicGain = null, timer = 0, nextBar = 0, barIndex = 0;

export const sound = {
  get sfx() { return settings.sfx; },
  get music() { return settings.music; },
  // Browsers only allow audio after a click, so call this from a button handler.
  unlock() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      const master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
      sfxGain = ctx.createGain(); sfxGain.gain.value = settings.sfx ? 1 : 0; sfxGain.connect(master);
      musicGain = ctx.createGain(); musicGain.gain.value = settings.music ? 0.55 : 0; musicGain.connect(master);
      synth = makeSynth(ctx, sfxGain, musicGain);
    }
    if (ctx.state === 'suspended') ctx.resume();
  },
  play(name) { if (synth && settings.sfx) synth.play(name); },
  startMusic() {
    if (!synth || timer) return;
    nextBar = ctx.currentTime + 0.1;
    const pump = () => {
      while (nextBar < ctx.currentTime + 0.8) { synth.scheduleBar(barIndex++, nextBar); nextBar += synth.BEAT * 4; }
    };
    pump(); timer = setInterval(pump, 150);
  },
  stopMusic() { clearInterval(timer); timer = 0; },
  setSfx(on) { settings.sfx = on; save(); if (sfxGain) sfxGain.gain.value = on ? 1 : 0; if (on) this.play('click'); },
  setMusic(on) { settings.music = on; save(); if (musicGain) musicGain.gain.value = on ? 0.55 : 0; },
};
