// Player progress, saved in the browser (localStorage) so it survives a refresh.
const KEY = 'dine-and-dash:progress:v1';

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    if (data && typeof data.stars === 'object' && data.stars) return data;
  } catch { /* missing or corrupted save: start fresh */ }
  return { stars: {} };
}

let state = load();
const keyOf = (chapterId, n) => `${chapterId}:${n}`;

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage blocked: progress lasts until refresh */ }
}

// Stars earned per level of one chapter, e.g. { 1: 3, 2: 2 }
export function getProgress(chapterId) {
  const stars = {};
  for (const [key, value] of Object.entries(state.stars)) {
    const [id, n] = key.split(':');
    if (id === chapterId) stars[+n] = value;
  }
  return { stars };
}

// Keeps the best result. Pass 0 stars for a failed attempt (it never lowers an earlier score).
export function recordResult(chapterId, n, stars) {
  const key = keyOf(chapterId, n);
  const best = Math.max(state.stars[key] || 0, Math.min(3, Math.max(0, stars)));
  if (best > 0) state.stars[key] = best;
  save();
}

export function isUnlocked(chapterId, n) {
  return n === 1 || (state.stars[keyOf(chapterId, n - 1)] || 0) > 0;
}

export function resetProgress() {
  state = { stars: {} };
  save();
}
