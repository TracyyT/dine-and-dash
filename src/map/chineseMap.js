// Chapter 3 map: a lantern-lit garden with a tea house, pond, red bridge, pagoda and a winding stone path.
import { el, rnd, seedRandom, WW, WH } from './iso.js';

export const CHINESE_DEFS = `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a58b0"/><stop offset=".12" stop-color="#e890b0"/><stop offset=".26" stop-color="#ffc8a0"/><stop offset=".27" stop-color="#8ab87a"/><stop offset=".6" stop-color="#6fa862"/><stop offset="1" stop-color="#5a9552"/></linearGradient>
<radialGradient id="sun" cx=".5" cy=".18" r=".6"><stop offset="0" stop-color="#fff0c0" stop-opacity=".7"/><stop offset="1" stop-color="#ffb07a" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#1a0a20" stop-opacity="0"/><stop offset="1" stop-color="#1a0a20" stop-opacity=".45"/></radialGradient>
<linearGradient id="pond" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e89aa0"/><stop offset=".35" stop-color="#4aa0b8"/><stop offset="1" stop-color="#2a7a98"/></linearGradient>
</defs>`;

const OL = '#3a1a14';
const G = (S, x, y, html, extra = '') => { const n = el('g', { transform: `translate(${x},${y}) ${extra}` }, S); n.innerHTML = html; return n; };
const shadow = (rx) => `<ellipse cx="0" cy="8" rx="${rx}" ry="${rx / 4}" fill="#000" opacity=".18"/>`;

const mountain = (S, x, w, h, c) => G(S, x, 640, `<path d="M${-w} 0Q${-w * .5} ${-h * .6} ${-w * .12} ${-h}Q${w * .2} ${-h * .7} ${w * .5} ${-h * .3}T${w} 0Z" fill="${c}"/><path d="M${-w * .12} ${-h}Q${w * .05} ${-h * .5} ${w * .35} ${-h * .2}" stroke="#fff" stroke-width="5" opacity=".18" fill="none"/>`);
const pagoda = (S, x, y, s = 1) => G(S, x, y, `${[0, 1, 2, 3].map((i) => { const w = 70 - i * 10, yy = -i * 46; return `<rect x="${-w * .5 + 6}" y="${yy - 36}" width="${w - 12}" height="36" fill="#a82a30" stroke="${OL}" stroke-width="2.5"/><path d="M${-w * .5 - 16} ${yy - 34}Q0 ${yy - 56} ${w * .5 + 16} ${yy - 34}L${w * .5 + 8} ${yy - 24}H${-w * .5 - 8}Z" fill="#3a2a4a" stroke="${OL}" stroke-width="2.5"/>`; }).join('')}<path d="M0 -190V-226" stroke="#e8b64a" stroke-width="4"/><circle cx="0" cy="-196" r="6" fill="#e8b64a"/>`, `scale(${s})`);
const lanternSvg = (S, x, y, s = 1) => G(S, x, y, `<path d="M0 -40V-20" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="0" rx="22" ry="26" fill="#e0382c" stroke="#7a1010" stroke-width="3"/><path d="M0 -26Q-14 0 0 26M0 -26Q14 0 0 26" stroke="#7a1010" stroke-width="2" fill="none"/><ellipse cx="0" cy="0" rx="22" ry="26" fill="#ffd060" opacity=".25"/><rect x="-10" y="26" width="20" height="5" fill="#e8b64a"/><path d="M0 31v22" stroke="#e8b64a" stroke-width="3"/>`, `scale(${s})`);
const sakura = (S, x, y, s = 1, c = '#ffb3c7') => G(S, x, y, `${shadow(70)}<path d="M0 0Q-8 -80 6 -150" stroke="#6a4430" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M4 -90Q-50 -120 -86 -110M6 -120Q60 -150 96 -138" stroke="#6a4430" stroke-width="9" fill="none" stroke-linecap="round"/>${[[-84, -120, 52], [-40, -170, 60], [20, -200, 66], [86, -150, 54], [50, -118, 46], [-20, -128, 50]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" opacity=".95"/><circle cx="${cx - 12}" cy="${cy - 10}" r="${r * .6}" fill="#ffd0de"/>`).join('')}`, `scale(${s})`);
const bamboo = (S, x, y, s = 1) => G(S, x, y, `${shadow(40)}${[-26, 0, 24].map((q, k) => `<rect x="${q - 6}" y="${-170 + k * 14}" width="12" height="${170 - k * 14}" rx="4" fill="#6fb35a" stroke="#2f6a2a" stroke-width="2.5"/>${[40, 80, 120].map((h) => `<path d="M${q - 7} ${-h + k * 8}h14" stroke="#2f6a2a" stroke-width="3"/>`).join('')}<path d="M${q + 6} ${-120 + k * 10}q26-6 32-24-22 4-32 24ZM${q - 6} ${-80 + k * 8}q-26-6-32-24 22 4 32 24Z" fill="#8fd070" stroke="#2f6a2a" stroke-width="2"/>`).join('')}`, `scale(${s})`);
const rock = (S, x, y, s = 1) => G(S, x, y, `<path d="M-60 0Q-62 -40 -26 -50Q8 -74 42 -42Q70 -32 62 0Z" fill="#a8a29a" stroke="${OL}" stroke-width="3"/><path d="M-24 -50Q-8 -30 -16 -14" stroke="#7a746a" stroke-width="3" fill="none"/><path d="M-50 -16Q-26 -26 -16 -42Z" fill="#c8c2b8"/>`, `scale(${s})`);
const lotus = (S, x, y) => G(S, x, y, `<ellipse rx="34" ry="12" fill="#3f9a5a" stroke="#1f5a30" stroke-width="2"/><path d="M0 -2Q-10 -22 0 -34Q10 -22 0 -2ZM-12 0Q-26 -14 -18 -28Q-4 -16 -12 0ZM12 0Q26 -14 18 -28Q4 -16 12 0Z" fill="#ffb3d0" stroke="#b85a7a" stroke-width="2"/><circle cy="-8" r="4" fill="#ffd84a"/>`);

function teahouse(S, x, y) {
  G(S, x, y, `<ellipse cx="280" cy="14" rx="360" ry="34" fill="#000" opacity=".18"/>
  <rect x="0" y="-210" width="560" height="210" fill="#b02a2a" stroke="${OL}" stroke-width="4"/>
  <rect x="30" y="-190" width="190" height="150" fill="#ffd98a" stroke="#e8b64a" stroke-width="6"/><path d="M125 -190V-40M30 -115H220" stroke="#8a5a10" stroke-width="5"/>
  <path d="M78 -150l14 14M172 -150l-14 14M78 -80l14-14M172 -80l-14-14" stroke="#8a5a10" stroke-width="3"/>
  <rect x="250" y="-210" width="110" height="210" fill="#5a1818" stroke="${OL}" stroke-width="4"/><rect x="262" y="-196" width="86" height="196" fill="#ffd070" opacity=".85"/><path d="M305 -196V0" stroke="${OL}" stroke-width="3"/>
  <rect x="390" y="-190" width="140" height="130" fill="#ffd98a" stroke="#e8b64a" stroke-width="6"/><path d="M460 -190V-60M390 -125H530" stroke="#8a5a10" stroke-width="5"/>
  ${[20, 240, 380, 530].map((q) => `<rect x="${q - 7}" y="-216" width="14" height="216" fill="#8a1e1e" stroke="${OL}" stroke-width="2.5"/>`).join('')}
  <path d="M-70 -200Q60 -240 140 -330Q280 -360 420 -330Q500 -240 630 -200Q560 -190 520 -208H40Q0 -190 -70 -200Z" fill="#3a2a4a" stroke="${OL}" stroke-width="4"/>
  <path d="M-30 -204Q280 -270 590 -204" stroke="#e8b64a" stroke-width="5" fill="none"/>
  ${Array.from({ length: 11 }, (_, i) => `<path d="M${-40 + i * 58} -216q14 12 28 0" stroke="#5a4a6a" stroke-width="3" fill="none"/>`).join('')}
  <rect x="200" y="-262" width="160" height="40" rx="6" fill="#7a1010" stroke="#e8b64a" stroke-width="4"/><text x="280" y="-234" text-anchor="middle" font-size="26" font-weight="700" fill="#ffe39a" font-family="Cinzel Decorative,serif">TEA HOUSE</text>
  <rect x="-20" y="-6" width="600" height="22" fill="#d9c7a0" stroke="${OL}" stroke-width="3"/>${[120, 260, 400].map((q) => `<path d="M${q} 16l-20 24h40z" fill="#c9b78e" stroke="${OL}" stroke-width="2"/>`).join('')}`);
  [[100, -140], [255, -110], [455, -140]].forEach(([q, h]) => lanternSvg(S, x + q, y + h, 0.7));
}
function gazebo(S, x, y) {
  G(S, x, y, `${shadow(150)}<rect x="-110" y="-70" width="220" height="70" rx="6" fill="#8a2020" stroke="${OL}" stroke-width="3"/>${[-100, -34, 34, 100].map((q) => `<rect x="${q - 7}" y="-150" width="14" height="82" fill="#b02a2a" stroke="${OL}" stroke-width="2.5"/>`).join('')}<path d="M-134 -140Q0 -178 134 -140Q70 -230 0 -240Q-70 -230 -134 -140Z" fill="#3a2a4a" stroke="${OL}" stroke-width="3.5"/><path d="M0 -240v-30" stroke="#e8b64a" stroke-width="4"/><path d="M-100 -120h66M34 -120h66" stroke="#e8b64a" stroke-width="3"/><circle cx="0" cy="-30" r="22" fill="#e8c88a" stroke="${OL}" stroke-width="2.5"/>`);
  lanternSvg(S, x - 90, y - 110, 0.5); lanternSvg(S, x + 90, y - 110, 0.5);
}
function bridge(S, x, y) {
  G(S, x, y, `<path d="M-170 0Q0 -150 170 0V26Q0 -118 -170 26Z" fill="#c0302a" stroke="${OL}" stroke-width="4"/><path d="M-160 -4Q0 -140 160 -4" fill="none" stroke="#7a1010" stroke-width="22" stroke-linecap="round"/><path d="M-160 -26Q0 -160 160 -26" fill="none" stroke="#e8b64a" stroke-width="5"/><g stroke="#e8b64a" stroke-width="4">${[-120, -70, -20, 30, 80, 130].map((q) => `<path d="M${q} ${-14 - (1 - (q / 170) ** 2) * 100}v28"/>`).join('')}</g><path d="M-170 26Q0 -118 170 26" fill="none" stroke="#7a1010" stroke-width="3"/>`);
}

export function renderChinese(S, LB, chapter, progress) {
  seedRandom(21);
  // sky glow, sun, far mountains, waterfall
  el('rect', { width: WW, height: 700, fill: 'url(#sun)' }, S);
  el('circle', { cx: 1400, cy: 330, r: 70, fill: '#fff0c0', opacity: 0.8 }, S);
  for (let i = 0; i < 4; i++) el('path', { d: `M${180 + i * 560} ${150 + (i % 2) * 90}q40 -30 84 0q40 -30 84 0`, fill: 'none', stroke: '#fff', 'stroke-width': 5, opacity: 0.35, 'stroke-linecap': 'round' }, S);
  mountain(S, 520, 520, 360, '#7a6aa8'); mountain(S, 1500, 560, 420, '#8a74b0'); mountain(S, 2050, 420, 300, '#6a5a98'); mountain(S, 1000, 380, 250, '#9a86be');
  el('rect', { x: 1790, y: 380, width: 34, height: 250, fill: '#e8f4ff', opacity: 0.8 }, S);
  el('ellipse', { cx: 1807, cy: 630, rx: 70, ry: 14, fill: '#fff', opacity: 0.7 }, S);
  pagoda(S, 1240, 640, 1.15);
  // grass texture
  for (let i = 0; i < 110; i++) { const x = rnd() * WW, y = 700 + rnd() * 780; el('path', { d: `M${x} ${y}q3 -14 6 0M${x + 8} ${y}q3 -10 6 0`, fill: 'none', stroke: '#4a8a42', 'stroke-width': 3, opacity: 0.5, 'stroke-linecap': 'round' }, S); }
  // pond (lower right) + stream
  el('path', { d: 'M1380 1260Q1500 1160 1760 1190T2330 1210Q2400 1330 2330 1440Q2100 1500 1760 1480T1400 1400Q1340 1330 1380 1260Z', fill: 'url(#pond)', stroke: '#e8d9b0', 'stroke-width': 10 }, S);
  for (let i = 0; i < 12; i++) el('path', { d: `M${1480 + (i % 6) * 140} ${1240 + Math.floor(i / 6) * 120 + (i % 3) * 20}q14 -8 30 0t30 0`, fill: 'none', stroke: '#fff', 'stroke-width': 3, opacity: 0.45, 'stroke-linecap': 'round' }, S);

  // stops along a stone path
  const spots = [[420, 1210], [860, 1090], [1290, 1010], [1720, 960], [2060, 1070]];
  const done = (n) => (progress.stars[n] || 0) > 0;
  const current = chapter.levels.find((l) => !done(l.n));
  const lvl = chapter.levels.map((l, i) => ({ n: l.n, name: l.name, s: progress.stars[l.n] || 0, st: done(l.n) ? 'done' : (current && current.n === l.n ? 'now' : 'lock'), pos: spots[i] }));
  const route = [[210, 1330], ...spots];
  let d = `M${route[0].join(' ')}`;
  for (let i = 1; i < route.length; i++) {
    const a = route[i - 1], b = route[i], p0 = route[i - 2] || a, p1 = route[i + 1] || b;
    d += ` C${a[0] + (b[0] - p0[0]) / 6} ${a[1] + (b[1] - p0[1]) / 6} ${b[0] - (p1[0] - a[0]) / 6} ${b[1] - (p1[1] - a[1]) / 6} ${b[0]} ${b[1]}`;
  }
  const rd = { d, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  el('path', { ...rd, stroke: '#6a5a4a', 'stroke-width': 50, opacity: 0.3, transform: 'translate(0,6)' }, S);
  el('path', { ...rd, stroke: '#d8cdb4', 'stroke-width': 44 }, S);
  el('path', { ...rd, stroke: '#efe6d0', 'stroke-width': 30, 'stroke-dasharray': '46 6' }, S);
  const road = el('path', { ...rd, stroke: 'none' }, S);
  const total = road.getTotalLength(), doneCount = lvl.filter((l) => l.st === 'done').length;
  if (doneCount) {
    let best = 0, bd = 1e9; const last = spots[doneCount - 1];
    for (let t = 0; t <= total; t += 4) { const q = road.getPointAtLength(t), dd = Math.hypot(q.x - last[0], q.y - last[1]); if (dd < bd) { bd = dd; best = t; } }
    el('path', { ...rd, stroke: '#ffd96a', 'stroke-width': 18, 'stroke-dasharray': `${best} ${total}`, opacity: 0.9 }, S);
    el('path', { ...rd, stroke: '#fff', 'stroke-width': 6, 'stroke-dasharray': `${best} ${total}` }, S);
  }

  // scenery
  teahouse(S, 90, 960);
  gazebo(S, 1020, 880);
  bridge(S, 1800, 1260);
  [[330, 1010], [640, 940], [1130, 960]].forEach(([x, y], i) => sakura(S, x, y, i ? 0.8 : 1));
  sakura(S, 2230, 880, 1.2, '#f08aa0'); sakura(S, 60, 1280, 1.3);
  bamboo(S, 2340, 1000, 1.3); bamboo(S, 2280, 1020, 1); bamboo(S, 1530, 880, 0.9);
  rock(S, 1520, 1430, 1); rock(S, 2300, 1460, 1.2); rock(S, 700, 1450, 1);
  lotus(S, 1560, 1330); lotus(S, 1980, 1380); lotus(S, 2140, 1300);
  [[560, 1310], [940, 1370], [1180, 1290]].forEach(([x, y]) => G(S, x, y, `<path d="M0 0q-30 -10 -34 -34 24 4 34 34ZM0 0q30 -10 34 -34 -24 4 -34 34Z" fill="#4f9a4a" stroke="#2a5f2a" stroke-width="2"/><circle cx="-8" cy="-14" r="8" fill="#ffb3c7" stroke="#b85a7a" stroke-width="1.6"/><circle cx="8" cy="-14" r="8" fill="#ffb3c7" stroke="#b85a7a" stroke-width="1.6"/><circle cx="0" cy="-24" r="8" fill="#ffb3c7" stroke="#b85a7a" stroke-width="1.6"/>`));
  // hanging lanterns along the path
  [[620, 1060], [1080, 1030], [1500, 960], [1900, 1010]].forEach(([x, y]) => { G(S, x, y, `<rect x="-4" y="-120" width="8" height="120" fill="#6a3a22"/><path d="M0 -118h40" stroke="#6a3a22" stroke-width="5"/>`); lanternSvg(S, x + 40, y - 96, 0.5); });

  // stops
  const star5 = (x, y, on) => `<path transform="translate(${x},${y}) scale(1.4)" d="M0-9L2.7-3 9-2.4 4.2 1.8 5.6 8 0 4.8 -5.6 8 -4.2 1.8 -9-2.4 -2.7-3Z" fill="${on ? '#ffd84a' : '#5a6a78'}" stroke="#14100f" stroke-width="1.2"/>`;
  lvl.forEach((l) => {
    const [x, y] = l.pos, lock = l.st === 'lock';
    const n = el('g', { class: 'node', 'data-n': l.n, transform: `translate(${x},${y})`, tabindex: lock ? -1 : 0, role: 'button', 'aria-label': `Level ${l.n}, ${l.name}, ` + (lock ? 'locked' : l.st === 'now' ? 'next up' : l.s + ' stars') }, S);
    el('ellipse', { cy: 16, rx: 56, ry: 22, fill: '#3a2a1e', opacity: 0.3 }, n);
    const u = el('g', { class: 'lift' }, n);
    if (l.st === 'now') el('ellipse', { rx: 54, ry: 25, fill: '#fff0a0', class: 'pulse' }, u);
    const top = lock ? '#c4b8a4' : l.st === 'now' ? '#e0382c' : '#f6d27a', edge = lock ? '#8a7a64' : l.st === 'now' ? '#7a1010' : '#a87a22';
    el('path', { d: 'M-48 0v14a48 22 0 0 0 96 0v-14Z', fill: edge, stroke: OL, 'stroke-width': 2 }, u);
    el('ellipse', { class: 'ring', rx: 48, ry: 23, fill: top, stroke: OL, 'stroke-width': 2.5 }, u);
    el('ellipse', { rx: 36, ry: 16, fill: 'none', stroke: '#e8b64a', 'stroke-width': 2.4, opacity: 0.8 }, u);
    const t = el('text', { y: 11, 'text-anchor': 'middle', 'font-family': 'Cinzel Decorative,serif', 'font-weight': 700, 'font-size': 30, fill: lock ? '#7a6a54' : '#fff', stroke: '#4a1010', 'stroke-width': 1.4, 'paint-order': 'stroke' }, u); t.textContent = l.n;
    if (lock) el('g', { transform: 'translate(0,-26) scale(1.4)' }, u).innerHTML = '<rect x="-7" y="-2" width="14" height="11" rx="2" fill="#8a7a64" stroke="#14100f"/><path d="M-4-2V-6a4 4 0 0 1 8 0V-2" fill="none" stroke="#14100f" stroke-width="2"/>';
    const g = el('g', { transform: `translate(${x},${y})`, 'pointer-events': 'none' }, LB);
    const lab = el('g', { transform: 'translate(0,64)' }, g);
    el('rect', { x: -88, y: -17, width: 176, height: 32, rx: 8, fill: '#7a1818', stroke: lock ? '#8a7a64' : '#e8b64a', 'stroke-width': 2 }, lab);
    const tt = el('text', { y: 6, 'text-anchor': 'middle', 'font-family': 'Josefin Sans', 'font-weight': 700, 'font-size': 18, fill: lock ? '#cbb89a' : '#fff0d8' }, lab); tt.textContent = l.name;
    if (l.st === 'done') el('g', { transform: 'translate(0,-56)' }, g).innerHTML = star5(-30, 0, l.s >= 1) + star5(0, -8, l.s >= 2) + star5(30, 0, l.s >= 3);
    if (l.st === 'now') { const s = el('g', { transform: 'translate(0,-84)', class: 'bob' }, g); el('rect', { x: -42, y: -16, width: 84, height: 32, rx: 10, fill: '#fff0d8', stroke: OL, 'stroke-width': 2 }, s); el('path', { d: 'M-8 16L0 26L8 16Z', fill: '#fff0d8', stroke: OL, 'stroke-width': 2 }, s); el('path', { transform: 'scale(.9)', d: 'M-9-8L9 0L-9 8Z', fill: '#d9302a' }, s); }
    if (l.n === 5) el('path', { transform: 'translate(0,-60)', d: 'M-20 0L-12-16-3-4 0-20 3-4 12-16 20 0Z', fill: '#ffd96a', stroke: OL, 'stroke-width': 1.5 }, g);
  });
  // start flag + "coming soon" sign
  G(S, 210, 1330, `<ellipse cy="6" rx="30" ry="10" fill="#000" opacity=".2"/><rect x="-4" y="-70" width="8" height="74" fill="#6a3a22"/><path d="M4 -70h54l-12 14 12 14H4z" fill="#d9302a" stroke="${OL}" stroke-width="2.5"/>`);
  return { nodes: lvl, home: (lvl.find((l) => l.st === 'now') || lvl[lvl.length - 1]).pos };
}
