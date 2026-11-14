// One level stop for every chapter map: same size, shape, number font, label plate, stars and crown everywhere.
// Only the colours differ, and they live in SKINS below. Change the geometry here and all maps change together.
import { el } from './iso.js';

const FONT = 'Josefin Sans';
const GEO = {
  shadow: { cy: 18, rx: 56, ry: 22 },
  ring: { rx: 48, ry: 23 }, side: 15, // coin top, and how thick its edge is
  inner: { rx: 37, ry: 17 },
  pulse: { rx: 56, ry: 27 },
  numY: 10, numSize: 30,
  lockY: -28, labelY: 66, labelW: 176, starsY: -56, crownY: -100,
};

// Colours per chapter. Each of done / now / lock gives: top + edge of the coin, inner ring, number fill + outline.
export const SKINS = {
  city: {
    ol: '#14100f', shadow: '#1a0a30', pulse: '#ffd96a', starOff: '#3a3050', crown: '#ffd96a',
    done: { top: '#ffd96a', edge: '#a87a22', inFill: '#e8b84a', inStroke: '#fff3c0', num: '#fff8e0', numLine: '#14100f' },
    now: { top: '#ec5a72', edge: '#7d1d33', inFill: '#c43a52', inStroke: '#fff3c0', num: '#fff8e0', numLine: '#14100f' },
    lock: { top: '#a49ab4', edge: '#4a4258', inFill: '#7a7088', inStroke: '#5a5068', num: '#4a4258', numLine: '#14100f', lockFill: '#5a5068' },
    label: { bg: '#14100f', line: '#c9a24a', text: '#f2e2b8', lockLine: '#5a5068', lockText: '#9a90ac' },
  },
  beach: {
    ol: '#4a2f18', shadow: '#5a3a1e', pulse: '#fff0a0', starOff: '#5a6a78', crown: '#ffd96a',
    done: { top: '#f6d27a', edge: '#a87a22', dash: '#fff', num: '#fff', numLine: '#4a2f18' },
    now: { top: '#ff8a6a', edge: '#b8442f', dash: '#fff', num: '#fff', numLine: '#4a2f18' },
    lock: { top: '#b8a890', edge: '#8a7a64', dash: '#fff', num: '#7a6a54', numLine: '#4a2f18', lockFill: '#8a7a64' },
    label: { bg: '#6b4420', line: '#ffe6b0', text: '#fff4e0', lockLine: '#8a7a64', lockText: '#cbb89a' },
  },
  chinese: {
    ol: '#3a1a14', shadow: '#2a1a14', pulse: '#ffe08a', starOff: '#5a6a78', crown: '#ffd96a',
    done: { top: '#a52a2e', edge: '#5a1218', dash: '#f2c75a', num: '#fff', numLine: '#5a0f14' },
    now: { top: '#e0452f', edge: '#7a1810', dash: '#f2c75a', num: '#fff', numLine: '#5a0f14' },
    lock: { top: '#a9a49a', edge: '#6f6a60', dash: '#d9d4c8', num: '#6f6a60', numLine: '#d9d4c8', lockFill: '#8a8478' },
    label: { bg: '#7a1818', line: '#e8b64a', text: '#fff0d8', lockLine: '#8a7a64', lockText: '#cbb89a' },
  },
  fine: {
    ol: '#12101c', shadow: '#000', pulse: '#f6e2a8', starOff: '#5a6a78', crown: '#d9b66a',
    done: { top: '#d9b66a', edge: '#8a6a2a', dash: '#f6e2a8', num: '#fff', numLine: '#2a0a14' },
    now: { top: '#9a1d3a', edge: '#4a0a1c', dash: '#f6e2a8', num: '#fff', numLine: '#2a0a14' },
    lock: { top: '#6a6678', edge: '#3a3648', dash: '#8a869a', num: '#a8a4b8', numLine: '#2a0a14', lockFill: '#8a869a' },
    label: { bg: '#15131c', line: '#d9b66a', text: '#f6e2a8', lockLine: '#6a6678', lockText: '#a8a4b8' },
  },
  steak: {
    ol: '#2a160c', shadow: '#000', pulse: '#ffd890', starOff: '#8a8478', crown: '#e0a850',
    done: { top: '#fff0c0', edge: '#d8b860', dash: '#e0c070', num: '#8a5a1a', numLine: '#fffbe8' },
    now: { top: '#fff4d0', edge: '#d8b860', dash: '#e0c070', num: '#b03a30', numLine: '#fffbe8' },
    lock: { top: '#cfc6b4', edge: '#8a8272', dash: '#a89c88', num: '#9a907c', numLine: '#fffbe8', lockFill: '#8a8272' },
    label: { bg: '#4a2c1c', line: '#e0a850', text: '#ffe9c0', lockLine: '#8a7e72', lockText: '#c8bcb0' },
  },
};

const star5 = (x, y, on, off) => `<path transform="translate(${x},${y}) scale(1.4)" d="M0-9L2.7-3 9-2.4 4.2 1.8 5.6 8 0 4.8 -5.6 8 -4.2 1.8 -9-2.4 -2.7-3Z" fill="${on ? '#ffd84a' : off}" stroke="#14100f" stroke-width="1.2"/>`;

// Draws one stop. `parent` gets the clickable coin, `labels` gets the name plate, stars and crown (non-interactive overlay).
export function levelStop({ parent, labels, l, chapter, skin, x = l.pos[0], y = l.pos[1] }) {
  const K = SKINS[skin], lock = l.st === 'lock', c = K[l.st === 'now' ? 'now' : lock ? 'lock' : 'done'], R = GEO.ring;
  const n = el('g', { class: 'node', 'data-n': l.n, transform: `translate(${x},${y})`, tabindex: lock ? -1 : 0, role: 'button', 'aria-label': `Level ${l.n}, ${l.name}, ` + (lock ? 'locked' : l.st === 'now' ? 'next up' : l.s + ' stars') }, parent);
  el('ellipse', { ...GEO.shadow, fill: K.shadow, opacity: 0.38 }, n);
  const u = el('g', { class: 'lift' }, n);
  if (l.st === 'now') el('ellipse', { ...GEO.pulse, fill: K.pulse, class: 'pulse' }, u);
  el('path', { d: `M${-R.rx} 0v${GEO.side}a${R.rx} ${R.ry - 1} 0 0 0 ${R.rx * 2} 0v${-GEO.side}Z`, fill: c.edge, stroke: K.ol, 'stroke-width': 2.2 }, u);
  el('ellipse', { class: 'ring', ...R, fill: c.top, stroke: K.ol, 'stroke-width': 2.5 }, u);
  el('ellipse', { ...GEO.inner, fill: c.inFill || 'none', stroke: c.inStroke || c.dash, 'stroke-width': 2, opacity: 0.85, ...(c.inFill ? {} : { 'stroke-dasharray': '4 5' }) }, u);
  const t = el('text', { y: GEO.numY, 'text-anchor': 'middle', 'font-family': FONT, 'font-weight': 700, 'font-size': GEO.numSize, fill: c.num, stroke: c.numLine, 'stroke-width': 1.3, 'paint-order': 'stroke' }, u); t.textContent = l.n;
  if (lock) el('g', { transform: `translate(0,${GEO.lockY}) scale(1.4)` }, u).innerHTML = `<rect x="-7" y="-2" width="14" height="11" rx="2" fill="${c.lockFill}" stroke="#14100f"/><path d="M-4-2V-6a4 4 0 0 1 8 0V-2" fill="none" stroke="#14100f" stroke-width="2"/>`;
  const g = el('g', { transform: `translate(${x},${y})`, 'pointer-events': 'none' }, labels);
  const lab = el('g', { transform: `translate(0,${GEO.labelY})` }, g), L = K.label, w = GEO.labelW;
  el('rect', { x: -w / 2, y: -17, width: w, height: 32, rx: 8, fill: L.bg, stroke: lock ? L.lockLine : L.line, 'stroke-width': 2 }, lab);
  const tt = el('text', { y: 6, 'text-anchor': 'middle', 'font-family': FONT, 'font-weight': 700, 'font-size': 18, fill: lock ? L.lockText : L.text }, lab); tt.textContent = l.name;
  if (!lock) el('g', { transform: `translate(0,${GEO.starsY})` }, g).innerHTML = star5(-30, 0, l.s >= 1, K.starOff) + star5(0, -8, l.s >= 2, K.starOff) + star5(30, 0, l.s >= 3, K.starOff);
  if (l.n === chapter.levels.length) el('path', { transform: `translate(0,${GEO.crownY})`, d: 'M-20 0L-12-16-3-4 0-20 3-4 12-16 20 0Z', fill: K.crown, stroke: K.ol, 'stroke-width': 1.5 }, g);
}
