// Chapter 2 map: a sunset beach with a winding stone path. Flat illustrated style, drawn as SVG.
import { el, rnd, seedRandom, WW, WH } from './iso.js';

export const BEACH_DEFS = `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5fc0"/><stop offset=".12" stop-color="#e88aa8"/><stop offset=".24" stop-color="#ffc98a"/><stop offset=".25" stop-color="#37a3b6"/><stop offset=".5" stop-color="#1f7fa0"/><stop offset=".51" stop-color="#f0d4a0"/><stop offset="1" stop-color="#dcb98a"/></linearGradient>
<radialGradient id="sun" cx=".7" cy=".16" r=".6"><stop offset="0" stop-color="#fff0b8" stop-opacity=".9"/><stop offset="1" stop-color="#ffb07a" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#1a0a20" stop-opacity="0"/><stop offset="1" stop-color="#1a0a20" stop-opacity=".4"/></radialGradient>
<linearGradient id="shine" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b8" stop-opacity=".7"/><stop offset="1" stop-color="#fff0b8" stop-opacity="0"/></linearGradient>
</defs>`;

const OL = '#4a2f18';
const palm = (g, x, y, s = 1, flip = 1) => {
  const n = el('g', { transform: `translate(${x},${y}) scale(${s * flip},${s})` }, g);
  n.innerHTML = `<ellipse cx="0" cy="6" rx="46" ry="12" fill="#000" opacity=".18"/><path d="M0 0Q-18 -90 6 -190" stroke="#9a6a3a" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M0 0Q-18 -90 6 -190" stroke="#c9954a" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="3 16"/>
  <g transform="translate(6,-190)" fill="#4f9a4a" stroke="#2a5f2a" stroke-width="3" stroke-linejoin="round"><path d="M0 0Q-60 -50 -120 0Q-60 -20 0 0Z"/><path d="M0 0Q60 -50 120 0Q60 -20 0 0Z"/><path d="M0 0Q-50 -80 -90 -50Q-40 -50 0 0Z"/><path d="M0 0Q50 -80 90 -50Q40 -50 0 0Z"/><path d="M0 0Q-20 -90 0 -100Q22 -80 0 0Z" fill="#5fae55"/><path d="M0 0Q-70 20 -100 70Q-50 20 0 0Z" fill="#3f8a40"/><path d="M0 0Q70 20 100 70Q50 20 0 0Z" fill="#3f8a40"/></g><circle cx="6" cy="-186" r="7" fill="#7a4a22"/><circle cx="-4" cy="-182" r="6" fill="#7a4a22"/>`;
};
const umbrella = (g, x, y, c = '#3f7fc0', s = 1) => {
  const n = el('g', { transform: `translate(${x},${y}) scale(${s})` }, g);
  n.innerHTML = `<ellipse cx="0" cy="6" rx="60" ry="12" fill="#000" opacity=".18"/><rect x="-3" y="-110" width="6" height="116" fill="#7a4a22"/><path d="M-84 -108Q0 -190 84 -108Q42 -124 0 -108Q-42 -124 -84 -108Z" fill="#fff4e0" stroke="${OL}" stroke-width="3"/><path d="M-84 -108Q-52 -156 -16 -176Q-36 -128 -28 -114Q-56 -124 -84 -108ZM-16 -176Q0 -178 16 -176Q22 -126 14 -114Q0 -118 -14 -114Q-22 -126 -16 -176Z" fill="${c}" opacity=".95"/><path d="M84 -108Q52 -156 16 -176Q36 -128 28 -114Q56 -124 84 -108Z" fill="${c}"/>`;
};
const surf = (g, x, y, c1, c2, rot = 8) => {
  const n = el('g', { transform: `translate(${x},${y}) rotate(${rot})` }, g);
  n.innerHTML = `<path d="M0 0Q-26 -90 0 -190Q26 -90 0 0Z" fill="${c1}" stroke="${OL}" stroke-width="3"/><path d="M0 -10V-182" stroke="${c2}" stroke-width="7"/>`;
};
const rock = (g, x, y, s = 1) => { const n = el('g', { transform: `translate(${x},${y}) scale(${s})` }, g); n.innerHTML = `<path d="M-70 0Q-72 -50 -30 -62Q10 -90 50 -52Q84 -40 74 0Z" fill="#9a8a86" stroke="${OL}" stroke-width="3"/><path d="M-30 -62Q-10 -40 -20 -20" stroke="#6a5a58" stroke-width="3" fill="none"/><path d="M-60 -20Q-30 -30 -20 -50Z" fill="#b8a8a2"/>`; };
const flower = (g, x, y, c = '#ff6fa0') => { const n = el('g', { transform: `translate(${x},${y})` }, g); n.innerHTML = `<path d="M0 0q-30 -10 -34 -34 24 4 34 34ZM0 0q30 -10 34 -34 -24 4 -34 34Z" fill="#4f9a4a" stroke="#2a5f2a" stroke-width="2"/><g fill="${c}" stroke="#a02a5a" stroke-width="1.6"><circle cx="-9" cy="-14" r="9"/><circle cx="9" cy="-14" r="9"/><circle cx="0" cy="-26" r="9"/><circle cx="0" cy="-8" r="8"/></g><circle cx="0" cy="-16" r="4" fill="#ffd84a"/>`; };
const star = (g, x, y) => { el('path', { transform: `translate(${x},${y})`, d: 'M0-14L4-5 14-4 6 3 9 13 0 8 -9 13 -6 3 -14-4 -4-5Z', fill: '#ff7a4a', stroke: '#a83a1a', 'stroke-width': 2 }, g); };

function bistro(g, x, y) {
  const n = el('g', { transform: `translate(${x},${y})` }, g);
  n.innerHTML = `<ellipse cx="260" cy="10" rx="330" ry="26" fill="#000" opacity=".16"/>
  <rect x="-20" y="-300" width="560" height="300" fill="#b8844a" stroke="${OL}" stroke-width="4"/>
  <path d="M-20 -230H540M-20 -170H540M-20 -110H540M-20 -50H540" stroke="#8a5a2a" stroke-width="3" opacity=".6"/>
  <rect x="20" y="-250" width="200" height="200" fill="#ffdc9a" stroke="${OL}" stroke-width="4"/><path d="M120 -250V-50M20 -150H220" stroke="${OL}" stroke-width="4"/>
  <circle cx="70" cy="-100" r="22" fill="#d9a060"/><circle cx="170" cy="-90" r="22" fill="#d9a060"/>
  <rect x="270" y="-250" width="120" height="250" fill="#4a2f18" stroke="${OL}" stroke-width="4"/><rect x="284" y="-236" width="92" height="236" fill="#ffd98a" opacity=".85"/><path d="M330 -236V0" stroke="${OL}" stroke-width="3"/>
  <rect x="410" y="-250" width="110" height="130" fill="#ffdc9a" stroke="${OL}" stroke-width="4"/>
  ${Array.from({ length: 14 }, (_, i) => `<path d="M${-40 + i * 42} -300h42v44q-21 28 -42 0z" fill="${i % 2 ? '#fff4e0' : '#3f7fc0'}" stroke="${OL}" stroke-width="2.5"/>`).join('')}
  <rect x="-40" y="-310" width="620" height="16" rx="6" fill="#6b4420" stroke="${OL}" stroke-width="3"/>
  <rect x="-60" y="-12" width="640" height="26" fill="#9a6a3a" stroke="${OL}" stroke-width="4"/><path d="M-40 -2H560" stroke="#6b4420" stroke-width="3" stroke-dasharray="40 4"/>
  <g stroke="#6b4420" stroke-width="4">${[-40, 40, 140, 240, 340, 440, 540].map((q) => `<path d="M${q} -4V-70M${q} -70q40 -20 80 0" fill="none"/>`).join('')}</g>
  <path d="M-40 -100q40 30 80 0t80 0 80 0 80 0 80 0 80 0 80 0" fill="none" stroke="#6b4420" stroke-width="2"/>${Array.from({ length: 12 }, (_, i) => `<circle cx="${-30 + i * 50}" cy="${-84 + (i % 2) * 14}" r="6" fill="#ffe6a0"/>`).join('')}`;
}
function tiki(g, x, y) {
  const n = el('g', { transform: `translate(${x},${y})` }, g);
  n.innerHTML = `<ellipse cx="0" cy="8" rx="190" ry="28" fill="#000" opacity=".16"/>
  <path d="M-110 -80Q-60 -108 -10 -112 -108 -140 0 -208 100 -144 10 -112 60 -108 110 -80Z" fill="#d9b06a" stroke="${OL}" stroke-width="3" opacity=".01"/>
  <rect x="-150" y="-70" width="300" height="70" rx="22" fill="#a8743a" stroke="${OL}" stroke-width="4"/><path d="M-130 -50H130" stroke="#7a4f24" stroke-width="3"/>
  <rect x="-110" y="-160" width="10" height="92" fill="#6b4420"/><rect x="100" y="-160" width="10" height="92" fill="#6b4420"/><rect x="-6" y="-170" width="12" height="102" fill="#6b4420"/>
  <path d="M-185 -156Q0 -290 185 -156Q100 -176 0 -164Q-100 -176 -185 -156Z" fill="#d9b06a" stroke="${OL}" stroke-width="4"/>
  <path d="M-170 -158Q-90 -176 0 -164M-140 -176q70 -50 140 -66" stroke="#a8803a" stroke-width="3" fill="none"/>
  ${[-120, -60, 0, 60, 120].map((q) => `<path d="M${q} -156v22" stroke="#b8924a" stroke-width="6"/>`).join('')}
  ${Array.from({ length: 11 }, (_, i) => `<circle cx="${-150 + i * 30}" cy="${-150 + Math.sin(i * 1.4) * 8}" r="5.5" fill="#ffe6a0"/>`).join('')}
  ${[-90, 0, 90].map((q) => `<g transform="translate(${q},30)"><rect x="-4" y="-2" width="8" height="30" fill="#6b4420"/><ellipse cy="-6" rx="22" ry="8" fill="#d9a060" stroke="${OL}" stroke-width="3"/></g>`).join('')}
  <g transform="translate(230,-12)"><rect x="-34" y="-84" width="68" height="84" rx="4" fill="#26323a" stroke="#8a5a2a" stroke-width="5"/><path d="M-12 -52h24l-4 22h-16z" fill="#ff8aa8"/><path d="M-20 -26h40" stroke="#fff" stroke-width="3" opacity=".6"/></g>`;
}
function lighthouse(g, x, y) {
  const n = el('g', { transform: `translate(${x},${y})` }, g);
  n.innerHTML = `<path d="M-140 0Q-100 -60 -40 -70Q40 -90 120 -40Q150 -20 160 0Z" fill="#9a7a62" stroke="${OL}" stroke-width="3"/><path d="M-60 -64Q0 -86 60 -64V-40H-60Z" fill="#5f9a4a"/>
  <path d="M-26 -60L-18 -200H18L26 -60Z" fill="#fff4e0" stroke="${OL}" stroke-width="3"/><path d="M-22 -100h44l-3 26h-38zM-18 -160h36l-3 26h-30z" fill="#d9435f"/><rect x="-22" y="-224" width="44" height="26" fill="#ffe27a" stroke="${OL}" stroke-width="3"/><path d="M-30 -224h60l-30 -30z" fill="#d9435f" stroke="${OL}" stroke-width="3"/><path d="M-22 -212L-150 -240V-190Z" fill="#fff0b8" opacity=".35"/>`;
}
const boat = (g, x, y) => { const n = el('g', { transform: `translate(${x},${y})` }, g); n.innerHTML = `<path d="M-30 0Q0 18 34 0L26 -14H-22Z" fill="#a8743a" stroke="${OL}" stroke-width="2.5"/><path d="M2 -16V-96L44 -26Z" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M-4 -16V-80L-32 -26Z" fill="#ffe6c0" stroke="${OL}" stroke-width="2"/>`; };

export function renderBeach(S, LB, chapter, progress) {
  seedRandom(7);
  const horizon = 640, shoreY = 640;
  // sky details
  el('circle', { cx: 1620, cy: 470, r: 64, fill: '#fff3b0' }, S);
  el('circle', { cx: 1620, cy: 470, r: 150, fill: '#fff0b8', opacity: 0.22 }, S);
  el('rect', { x: 1560, y: horizon - 170, width: 120, height: 280, fill: 'url(#shine)', opacity: 0.5 }, S);
  for (let i = 0; i < 5; i++) el('path', { d: `M${200 + i * 380} ${130 + (i % 2) * 70}q30 -26 62 0q30 -26 62 0`, fill: 'none', stroke: '#fff', 'stroke-width': 4, opacity: 0.35, 'stroke-linecap': 'round' }, S);
  // sea waves
  for (let y = 700; y < 790; y += 30) for (let x = (y % 76) * 2; x < WW; x += 150) el('path', { d: `M${x} ${y}q16 -10 34 0t34 0`, fill: 'none', stroke: '#fff', 'stroke-width': 3, opacity: 0.35, 'stroke-linecap': 'round' }, S);
  // shoreline curve (sand over sea)
  el('path', { d: `M0 ${shoreY + 160}Q300 ${shoreY + 90} 700 ${shoreY + 140}T1500 ${shoreY + 100}T2400 ${shoreY + 150}V${WH}H0Z`, fill: '#f0d4a0' }, S);
  el('path', { d: `M0 ${shoreY + 160}Q300 ${shoreY + 90} 700 ${shoreY + 140}T1500 ${shoreY + 100}T2400 ${shoreY + 150}`, fill: 'none', stroke: '#fff', 'stroke-width': 12, opacity: 0.8 }, S);
  el('path', { d: `M0 ${shoreY + 200}Q300 ${shoreY + 130} 700 ${shoreY + 180}T1500 ${shoreY + 140}T2400 ${shoreY + 190}`, fill: 'none', stroke: '#c9a874', 'stroke-width': 4, opacity: 0.5, 'stroke-dasharray': '2 14', 'stroke-linecap': 'round' }, S);
  // sand ripples
  for (let i = 0; i < 70; i++) { const x = rnd() * WW, y = 820 + rnd() * 640; el('path', { d: `M${x} ${y}q14 -7 28 0`, fill: 'none', stroke: '#c9a874', 'stroke-width': 3, opacity: 0.45, 'stroke-linecap': 'round' }, S); }

  lighthouse(S, 2060, 700);
  boat(S, 1230, 700); boat(S, 760, 735);

  // level stops
  const YS = [1250, 1140, 1250, 1140, 1250, 1140, 1250, 1140];
  const spots = YS.map((y, i) => [280 + i * 235, y]);
  const done = (n) => (progress.stars[n] || 0) > 0;
  const current = chapter.levels.find((l) => !done(l.n));
  const lvl = chapter.levels.map((l, i) => ({ n: l.n, name: l.name, s: progress.stars[l.n] || 0, st: done(l.n) ? 'done' : (current && current.n === l.n ? 'now' : 'lock'), pos: spots[i] }));
  // path through the stops (smooth)
  const route = [[110, 1330], ...spots];
  let d = `M${route[0].join(' ')}`;
  for (let i = 1; i < route.length; i++) {
    const a = route[i - 1], b = route[i], p0 = route[i - 2] || a, p1 = route[i + 1] || b;
    const c1 = [a[0] + (b[0] - p0[0]) / 6, a[1] + (b[1] - p0[1]) / 6], c2 = [b[0] - (p1[0] - a[0]) / 6, b[1] - (p1[1] - a[1]) / 6];
    d += ` C${c1.join(' ')} ${c2.join(' ')} ${b.join(' ')}`;
  }
  const rd = { d, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  el('path', { ...rd, stroke: '#a87a42', 'stroke-width': 30, opacity: 0.35, transform: 'translate(0,6)' }, S);
  el('path', { ...rd, stroke: '#fff4d0', 'stroke-width': 14, 'stroke-dasharray': '2 24' }, S);
  const road = el('path', { ...rd, stroke: 'none' }, S);
  const total = road.getTotalLength();
  const doneIdx = lvl.filter((l) => l.st === 'done').length;
  if (doneIdx) {
    // find how far along the route the last finished stop is
    let best = 0, bd = 1e9;
    const last = spots[doneIdx - 1];
    for (let t = 0; t <= total; t += 4) { const q = road.getPointAtLength(t), dd = Math.hypot(q.x - last[0], q.y - last[1]); if (dd < bd) { bd = dd; best = t; } }
    el('path', { ...rd, stroke: '#ffd96a', 'stroke-width': 18, 'stroke-dasharray': `${best} ${total}`, opacity: 0.9 }, S);
    el('path', { ...rd, stroke: '#fff', 'stroke-width': 6, 'stroke-dasharray': `${best} ${total}` }, S);
  }

  // scenery (back to front)
  bistro(S, 90, 800);
  tiki(S, 1060, 830);
  palm(S, 780, 840, 1.1); palm(S, 1480, 820, 1); palm(S, 2230, 960, 1.3, -1); palm(S, 40, 1010, 1.25);
  rock(S, 150, 1450, 1.4); rock(S, 300, 1470, 1); rock(S, 2000, 1440, 1.2);
  surf(S, 700, 830, '#e9f3f6', '#2f7fb0'); surf(S, 740, 840, '#ff9a4a', '#fff', -4);
  umbrella(S, 560, 1450, '#3f7fc0', 1.15); umbrella(S, 1180, 1485, '#ff7a6a', 1);
  // table under the umbrella
  el('g', { transform: 'translate(560,1452)' }, S).innerHTML = `<ellipse rx="52" ry="14" fill="#a87a42" stroke="${OL}" stroke-width="3"/><rect x="-5" y="-30" width="10" height="30" fill="#7a4a22"/><ellipse cy="-30" rx="46" ry="12" fill="#d9a060" stroke="${OL}" stroke-width="3"/>`;
  flower(S, 90, 1220, '#ff6fa0'); flower(S, 140, 1250, '#ff9a4a'); flower(S, 2330, 940, '#ff6fa0'); flower(S, 600, 1020, '#ffd84a');
  star(S, 640, 1400); star(S, 1500, 1410); star(S, 1180, 940);
  // sun lounger + cabana
  el('g', { transform: 'translate(2200,1420)' }, S).innerHTML = `<ellipse cx="0" cy="40" rx="130" ry="22" fill="#000" opacity=".16"/><rect x="-110" y="-110" width="220" height="130" rx="10" fill="#fff4e0" stroke="${OL}" stroke-width="3"/><path d="M-110 -110Q0 -170 110 -110" fill="#e8f2f4" stroke="${OL}" stroke-width="3"/><rect x="-100" y="-50" width="200" height="60" rx="8" fill="#9ac8d6" stroke="${OL}" stroke-width="3"/><path d="M-110 -110V30M110 -110V30" stroke="#8a5a2a" stroke-width="8"/>`;

  // stops
  const star5 = (x, y, on) => `<path transform="translate(${x},${y}) scale(1.4)" d="M0-9L2.7-3 9-2.4 4.2 1.8 5.6 8 0 4.8 -5.6 8 -4.2 1.8 -9-2.4 -2.7-3Z" fill="${on ? '#ffd84a' : '#5a6a78'}" stroke="#14100f" stroke-width="1.2"/>`;
  lvl.forEach((l) => {
    const [x, y] = l.pos, lock = l.st === 'lock';
    const n = el('g', { class: 'node', 'data-n': l.n, transform: `translate(${x},${y})`, tabindex: lock ? -1 : 0, role: 'button', 'aria-label': `Level ${l.n}, ${l.name}, ` + (lock ? 'locked' : l.st === 'now' ? 'next up' : l.s + ' stars') }, S);
    el('ellipse', { cy: 16, rx: 56, ry: 22, fill: '#5a3a1e', opacity: 0.3 }, n);
    const u = el('g', { class: 'lift' }, n);
    if (l.st === 'now') el('ellipse', { rx: 52, ry: 24, fill: '#fff0a0', class: 'pulse' }, u);
    const top = lock ? '#b8a890' : l.st === 'now' ? '#ff8a6a' : '#f6d27a', edge = lock ? '#8a7a64' : l.st === 'now' ? '#b8442f' : '#a87a22';
    el('path', { d: 'M-48 0v14a48 22 0 0 0 96 0v-14Z', fill: edge, stroke: OL, 'stroke-width': 2 }, u);
    el('ellipse', { class: 'ring', rx: 48, ry: 23, fill: top, stroke: OL, 'stroke-width': 2.5 }, u);
    el('ellipse', { rx: 36, ry: 16, fill: 'none', stroke: '#fff', 'stroke-width': 2, opacity: 0.6, 'stroke-dasharray': '3 6' }, u);
    const t = el('text', { y: 11, 'text-anchor': 'middle', 'font-family': 'Pacifico,cursive', 'font-size': 32, fill: lock ? '#7a6a54' : '#fff', stroke: '#4a2f18', 'stroke-width': 1.4, 'paint-order': 'stroke' }, u); t.textContent = l.n;
    if (lock) el('g', { transform: 'translate(0,-26) scale(1.4)' }, u).innerHTML = '<rect x="-7" y="-2" width="14" height="11" rx="2" fill="#8a7a64" stroke="#14100f"/><path d="M-4-2V-6a4 4 0 0 1 8 0V-2" fill="none" stroke="#14100f" stroke-width="2"/>';
    const g = el('g', { transform: `translate(${x},${y})`, 'pointer-events': 'none' }, LB);
    const lab = el('g', { transform: 'translate(0,64)' }, g);
    el('rect', { x: -86, y: -17, width: 172, height: 32, rx: 8, fill: '#6b4420', stroke: lock ? '#8a7a64' : '#ffe6b0', 'stroke-width': 2 }, lab);
    const tt = el('text', { y: 6, 'text-anchor': 'middle', 'font-family': 'Josefin Sans', 'font-weight': 700, 'font-size': 18, fill: lock ? '#cbb89a' : '#fff4e0' }, lab); tt.textContent = l.name;
    if (!lock) el('g', { transform: 'translate(0,-56)' }, g).innerHTML = star5(-30, 0, l.s >= 1) + star5(0, -8, l.s >= 2) + star5(30, 0, l.s >= 3);
    if (l.n === chapter.levels.length) el('path', { transform: 'translate(0,-100)', d: 'M-20 0L-12-16-3-4 0-20 3-4 12-16 20 0Z', fill: '#ffd96a', stroke: OL, 'stroke-width': 1.5 }, g);
  });
  // start sign + next-chapter sign
  el('g', { transform: 'translate(110,1330)' }, S).innerHTML = `<ellipse cy="6" rx="30" ry="10" fill="#000" opacity=".2"/><rect x="-4" y="-70" width="8" height="74" fill="#7a4a22"/><path d="M4 -70h54l-12 14 12 14H4z" fill="#ff7a6a" stroke="${OL}" stroke-width="2.5"/>`;
  return { nodes: lvl, board: { x: 2290, y: 1200, dir: 1 }, home: (lvl.find((l) => l.st === 'now') || lvl[lvl.length - 1]).pos };
}
