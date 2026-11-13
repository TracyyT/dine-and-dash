// Player progress, saved in the browser (localStorage) so it survives a refresh.
import { upgradeList } from '../data/upgrades.js';
const KEY = 'dine-and-dash:progress:v1';

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    if (data && typeof data.stars === 'object' && data.stars) return { stars: data.stars, wallet: +data.wallet || 0, upgrades: data.upgrades && typeof data.upgrades === 'object' ? data.upgrades : {} };
  } catch { /* missing or corrupted save: start fresh */ }
  return { stars: {}, wallet: 0, upgrades: {} };
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

// Coins carry over between chapters. Upgrades belong to one chapter only.
export const getWallet = () => state.wallet;
export function bankCoins(n) {
  state.wallet += Math.max(0, Math.round(n));
  save();
}
export const getUpgrades = (chapterId) => ({ ...(state.upgrades[chapterId] || {}) });
export function nextUpgradeCost(chapterId, id) {
  const item = upgradeList(chapterId).find((u) => u.id === id);
  return item ? item.tiers[(state.upgrades[chapterId] || {})[id] || 0] : undefined; // undefined = fully upgraded
}
export function buyUpgrade(chapterId, id) {
  const cost = nextUpgradeCost(chapterId, id);
  if (cost === undefined || state.wallet < cost) return false;
  state.wallet -= cost;
  state.upgrades[chapterId] = { ...(state.upgrades[chapterId] || {}), [id]: ((state.upgrades[chapterId] || {})[id] || 0) + 1 };
  save();
  return true;
}

export function resetProgress() {
  state = { stars: {}, wallet: 0, upgrades: {} };
  save();
}
