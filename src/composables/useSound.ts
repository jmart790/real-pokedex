// Original 8-bit style button sounds generated with Web Audio (no audio files),
// plus Pokemon cries from PokeAPI's cries repo (same source family as the sprites).
// Module-level state so every caller shares one AudioContext and one volume level.

type TSound = 'move' | 'select' | 'back' | 'toggle' | 'tab' | 'powerOn' | 'powerOff' | 'volume';
type TNote = [freq: number, ms: number];

const MAX_VOLUME = 5;
const STORAGE_KEY = 'pokedex-volume';
const CRY_URL = 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest';

// Square-wave note sequences; frequencies in Hz.
const SOUNDS: Record<TSound, TNote[]> = {
  move: [[1320, 30]],
  select: [
    [988, 50],
    [1319, 80]
  ],
  back: [
    [1319, 50],
    [880, 80]
  ],
  toggle: [
    [1175, 40],
    [1175, 40]
  ],
  tab: [[784, 60]],
  powerOn: [
    [523, 70],
    [659, 70],
    [784, 70],
    [1047, 160]
  ],
  powerOff: [
    [1047, 70],
    [784, 70],
    [523, 160]
  ],
  volume: [[880, 60]]
};

function readVolume() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const level = saved === null ? NaN : Number(saved);
    return Number.isInteger(level) && level >= 0 && level <= MAX_VOLUME ? level : 3;
  } catch {
    return 3;
  }
}

let volume = readVolume();
let ctx: AudioContext | null = null;
let cry: HTMLAudioElement | null = null;

// Created lazily: browsers only allow audio after a user gesture (the first key press/click).
function getContext() {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function playSound(name: TSound) {
  if (!volume) return;
  const audio = getContext();
  // Square waves are loud; keep the peak low and scale it by the volume level.
  const peak = 0.06 * (volume / MAX_VOLUME);
  let start = audio.currentTime;

  for (const [freq, ms] of SOUNDS[name]) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const end = start + ms / 1000;
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(peak, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, end); // fade out to avoid clicks
    osc.connect(gain).connect(audio.destination);
    osc.start(start);
    osc.stop(end);
    start = end;
  }
}

// ponytail: cries are .ogg; Safari can't play Ogg Vorbis, so it silently skips them there.
export function playCry(id: number | string) {
  cry?.pause(); // one cry at a time when scrolling quickly
  if (!volume || !id || id === '0') return;
  cry = new Audio(`${CRY_URL}/${id}.ogg`);
  cry.volume = 0.5 * (volume / MAX_VOLUME);
  cry.play().catch(() => {});
}

export function changeVolume(step: 1 | -1) {
  volume = Math.min(MAX_VOLUME, Math.max(0, volume + step));
  try {
    localStorage.setItem(STORAGE_KEY, String(volume));
  } catch {
    // storage blocked (private mode); volume still applies for this visit
  }
  playSound('volume');
  return volume;
}
