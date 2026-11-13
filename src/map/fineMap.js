// Chapter 4 map: an evening luxury shopping street. Boutiques across the top, Maison d'Or in the middle, a marble plaza with a fountain, and a red-carpet path.
import { el, rnd, seedRandom, WW, WH } from './iso.js';

export const FINE_DEFS = `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1a4a"/><stop offset=".12" stop-color="#5a3a86"/><stop offset=".2" stop-color="#e89a98"/><stop offset=".21" stop-color="#2a2a40"/><stop offset="1" stop-color="#1c1c2e"/></linearGradient>
<radialGradient id="sun" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#ffe6a8" stop-opacity=".22"/><stop offset="1" stop-color="#ffe6a8" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".6" stop-color="#05040f" stop-opacity="0"/><stop offset="1" stop-color="#05040f" stop-opacity=".55"/></radialGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe6a8" stop-opacity=".55"/><stop offset="1" stop-color="#ffe6a8" stop-opacity="0"/></radialGradient>
<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ad0e8"/><stop offset="1" stop-color="#3a8ab0"/></linearGradient>
</defs>`;

const OL = '#12101c', GOLD = '#d9b66a', GOLD_L = '#f6e2a8', GOLD_D = '#8a6a2a';
const G = (S, x, y, html, extra = '') => { const n = el('g', { transform: `translate(${x},${y}) ${extra}` }, S); n.innerHTML = html; return n; };

const bag = (c, x, y) => `<g transform="translate(${x},${y})"><path d="M-9 0h18l2 22h-22z" fill="${c}" stroke="${OL}" stroke-width="1.6"/><path d="M-5 0Q-5 -9 0 -9T5 0" fill="none" stroke="${OL}" stroke-width="1.6"/></g>`;
const mannequin = (c, x, y) => `<g transform="translate(${x},${y})"><ellipse cx="0" cy="92" rx="16" ry="4" fill="#000" opacity=".3"/><rect x="-1.5" y="40" width="3" height="52" fill="#8a7a6a"/><circle cx="0" cy="8" r="8" fill="#e9dccb"/><path d="M-12 20Q0 14 12 20L22 80H-22Z" fill="${c}" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/><path d="M-10 36h20" stroke="${GOLD}" stroke-width="2.4"/></g>`;

function shop(S, x, name, accent, items) {
  G(S, x, 260, `<rect x="0" y="0" width="420" height="500" fill="#2a2640" stroke="${OL}" stroke-width="4"/>
  <rect x="0" y="0" width="420" height="38" fill="#1c1a30" stroke="${OL}" stroke-width="3"/><path d="M0 38h420" stroke="${GOLD}" stroke-width="4"/>
  ${Array.from({ length: 10 }, (_, i) => `<rect x="${12 + i * 41}" y="48" width="12" height="46" rx="3" fill="#ffd98a" opacity="${i % 2 ? 0.35 : 0.2}"/>`).join('')}
  <rect x="40" y="108" width="340" height="52" rx="6" fill="#12101c" stroke="${GOLD}" stroke-width="3"/><text x="210" y="145" text-anchor="middle" font-family="Playfair Display,serif" font-weight="900" font-size="30" letter-spacing="4" fill="${GOLD_L}">${name}</text>
  <path d="M10 196h400l-14 54q-186 22 -372 0z" fill="${accent}" stroke="${OL}" stroke-width="3"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${10 + i * 40} 196h20l-3 54h-14z" fill="#fbf3e2" opacity=".22"/>`).join('')}<path d="M24 250q186 22 372 0" stroke="${GOLD}" stroke-width="3" fill="none"/>
  <rect x="24" y="268" width="372" height="200" rx="6" fill="#ffe6b0" stroke="${GOLD}" stroke-width="5"/><rect x="24" y="268" width="372" height="200" rx="6" fill="url(#glow)"/>
  <path d="M210 268V468" stroke="${GOLD_D}" stroke-width="4"/><path d="M24 440h372" stroke="${GOLD_D}" stroke-width="3" opacity=".6"/>
  <rect x="0" y="476" width="420" height="24" fill="#3a3550" stroke="${OL}" stroke-width="3"/>
  <rect x="0" y="-26" width="420" height="30" fill="#15131c" stroke="${OL}" stroke-width="3"/><path d="M0 -8h420" stroke="${GOLD_D}" stroke-width="3"/>
  ${items}`);
}
function restaurant(S, x) {
  G(S, x, 196, `<rect x="0" y="40" width="720" height="564" fill="#f3ecdc" stroke="${OL}" stroke-width="4"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M0 ${96 + i * 56}h720" stroke="#d8cdb0" stroke-width="2"/>`).join('')}
  <path d="M-30 40h780l-20 -50H-10z" fill="#e8dfc8" stroke="${OL}" stroke-width="4"/><path d="M-30 40h780" stroke="${GOLD}" stroke-width="8"/>
  <rect x="250" y="-60" width="220" height="60" rx="4" fill="#15131c" stroke="${GOLD}" stroke-width="5"/><path d="M262 -48h196v36H262z" fill="none" stroke="${GOLD_D}" stroke-width="2"/>
  <text x="360" y="-17" text-anchor="middle" font-family="Playfair Display,serif" font-weight="900" font-size="34" letter-spacing="2" fill="${GOLD_L}">Maison d'Or</text>
  ${[40, 200, 480, 640].map((q) => `<rect x="${q}" y="110" width="40" height="440" fill="#e9e2d2" stroke="#8a7a5a" stroke-width="3"/><rect x="${q - 6}" y="104" width="52" height="14" fill="#d8cdb0" stroke="#8a7a5a" stroke-width="2"/><rect x="${q - 6}" y="540" width="52" height="16" fill="#d8cdb0" stroke="#8a7a5a" stroke-width="2"/>`).join('')}
  ${[100, 520].map((q) => `<rect x="${q}" y="170" width="100" height="270" rx="50" fill="#ffd98a" stroke="${GOLD}" stroke-width="6"/><rect x="${q}" y="170" width="100" height="270" rx="50" fill="url(#glow)"/><path d="M${q + 50} 170V440M${q} 300h100" stroke="${GOLD_D}" stroke-width="3"/>`).join('')}
  <rect x="300" y="190" width="120" height="360" rx="60" fill="#15131c" stroke="${GOLD}" stroke-width="6"/><rect x="312" y="204" width="96" height="346" rx="48" fill="#ffd070" opacity=".92"/><path d="M360 204V550" stroke="${GOLD_D}" stroke-width="3"/><circle cx="346" cy="390" r="5" fill="${GOLD_D}"/><circle cx="374" cy="390" r="5" fill="${GOLD_D}"/>
  <path d="M280 150Q360 108 440 150L426 168H294Z" fill="#6a1a38" stroke="${GOLD}" stroke-width="4"/>
  <g transform="translate(360,110)"><path d="M0 -22V-6" stroke="${GOLD}" stroke-width="2"/><path d="M-26 6h52l-8 14h-36z" fill="${GOLD}"/>${[-18, -6, 6, 18].map((q) => `<path d="M${q} 20l-3 10 3 6 3-6z" fill="#e8f4ff" stroke="#9ab8d0" stroke-width=".8"/>`).join('')}</g>
  <path d="M286 604h148l34 80H252z" fill="#7a1d3a" stroke="${GOLD}" stroke-width="3"/><path d="M296 604L270 684M424 604L450 684" stroke="${GOLD}" stroke-width="2"/>
  ${[250, 466].map((q) => `<g transform="translate(${q},604)"><rect x="-3" y="-60" width="6" height="64" fill="${GOLD}"/><circle cy="-62" r="8" fill="${GOLD_L}" stroke="${GOLD_D}" stroke-width="2"/></g>`).join('')}
  ${[-8, 8].map((q) => `<g transform="translate(${360 + q * 12},0)"><ellipse cy="0" rx="0" ry="0"/></g>`).join('')}`);
  // doorman
  G(S, x + 440, 880, `<ellipse cy="8" rx="20" ry="6" fill="#000" opacity=".3"/><rect x="-10" y="-50" width="8" height="58" fill="#15101a"/><rect x="2" y="-50" width="8" height="58" fill="#15101a"/><rect x="-16" y="-110" width="32" height="64" rx="12" fill="#15131c" stroke="#000" stroke-width="1.5"/><path d="M-9 -108l9 22 9-22z" fill="#fbf3e2"/><rect x="-16" y="-84" width="32" height="5" fill="${GOLD}"/><circle cy="-128" r="17" fill="#f6d3b3" stroke="#0004" stroke-width="1.4"/><path d="M-19 -134h38l-2 -14q-17 -10 -34 0z" fill="#15131c"/><rect x="-19" y="-136" width="38" height="5" fill="${GOLD}"/><circle cx="-6" cy="-127" r="2" fill="#1b1220"/><circle cx="6" cy="-127" r="2" fill="#1b1220"/><path d="M-5 -120q5 5 10 0" stroke="#1b1220" stroke-width="2" fill="none"/>`);
}
function fountain(S, x, y) {
  G(S, x, y, `<ellipse cx="0" cy="20" rx="190" ry="62" fill="#000" opacity=".3"/>
  <ellipse cx="0" cy="0" rx="180" ry="58" fill="#e9e2d2" stroke="#8a7a5a" stroke-width="4"/><ellipse cx="0" cy="-6" rx="160" ry="48" fill="url(#water)" stroke="#8a7a5a" stroke-width="3"/>
  ${Array.from({ length: 7 }, (_, i) => `<path d="M${-110 + i * 36} ${-6 + (i % 2) * 10}q10 -5 22 0" fill="none" stroke="#fff" stroke-width="2.4" opacity=".5" stroke-linecap="round"/>`).join('')}
  <path d="M-34 -4h68l-8 -40h-52z" fill="#e9e2d2" stroke="#8a7a5a" stroke-width="3"/><ellipse cx="0" cy="-44" rx="48" ry="14" fill="#e9e2d2" stroke="#8a7a5a" stroke-width="3"/><ellipse cx="0" cy="-46" rx="38" ry="10" fill="url(#water)"/>
  <rect x="-8" y="-100" width="16" height="56" fill="#e9e2d2" stroke="#8a7a5a" stroke-width="3"/><ellipse cx="0" cy="-100" rx="24" ry="8" fill="#e9e2d2" stroke="#8a7a5a" stroke-width="3"/>
  <path d="M0 -112Q-46 -150 -80 -86M0 -112Q46 -150 80 -86M0 -112V-60M0 -112Q-22 -140 -40 -70M0 -112Q22 -140 40 -70" fill="none" stroke="#cdeaf8" stroke-width="5" stroke-linecap="round" opacity=".85"/>
  <circle cx="0" cy="-118" r="8" fill="${GOLD}" stroke="${GOLD_D}" stroke-width="2"/>`);
}
const lamp = (S, x, y, s = 1) => G(S, x, y, `<ellipse cx="0" cy="6" rx="22" ry="6" fill="#000" opacity=".3"/><rect x="-6" y="-170" width="12" height="172" fill="${OL}"/><rect x="-12" y="-20" width="24" height="22" fill="#2a2640" stroke="${GOLD}" stroke-width="2"/><path d="M-30 -170h60" stroke="${GOLD}" stroke-width="5"/>${[-30, 30].map((q) => `<g transform="translate(${q},-190)"><path d="M-14 12h28l-4 -26h-20z" fill="#fff0c0" stroke="${GOLD}" stroke-width="3"/><circle cy="-4" r="30" fill="url(#glow)"/></g>`).join('')}<circle cx="0" cy="-196" r="30" fill="url(#glow)" opacity=".5"/>`, `scale(${s})`);
const planter = (S, x, y, s = 1) => G(S, x, y, `<ellipse cx="0" cy="8" rx="46" ry="10" fill="#000" opacity=".3"/><path d="M-36 0h72l-6 -42h-60z" fill="#2a2640" stroke="${GOLD}" stroke-width="3"/><circle cx="0" cy="-84" r="46" fill="#2f8a52" stroke="#1a5a30" stroke-width="3"/><circle cx="-14" cy="-98" r="16" fill="#4fae72" opacity=".6"/><rect x="-5" y="-42" width="10" height="14" fill="#5a3a22"/>${Array.from({ length: 10 }, (_, i) => `<circle cx="${-36 + i * 8}" cy="${-84 + Math.sin(i * 2) * 30}" r="2.4" fill="#ffe6a8"/>`).join('')}`, `scale(${s})`);
function car(S, x, y, c, long = false) {
  const w = long ? 330 : 240;
  G(S, x, y, `<ellipse cx="${w / 2}" cy="48" rx="${w / 2 + 10}" ry="12" fill="#000" opacity=".35"/><path d="M0 40Q0 12 24 8L${w * .3} 0Q${w * .45} -34 ${w * .6} -30Q${w * .78} -26 ${w * .88} 4Q${w} 10 ${w} 40Z" fill="${c}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/><path d="M${w * .32} 2Q${w * .46} -26 ${w * .58} -24L${w * .62} 2Z M${w * .66} 2L${w * .62} -24Q${w * .8} -20 ${w * .84} 2Z" fill="#9ad0e8" stroke="${OL}" stroke-width="2.5"/><path d="M8 28h${w - 16}" stroke="#fff" stroke-width="2.5" opacity=".35"/><rect x="${w - 22}" y="14" width="14" height="8" rx="3" fill="#fff0b0"/>${[w * .22, w * .78].map((q) => `<circle cx="${q}" cy="42" r="19" fill="#15131c" stroke="#000" stroke-width="3"/><circle cx="${q}" cy="42" r="9" fill="${GOLD}"/>`).join('')}`);
}

export function renderFine(S, LB, chapter, progress) {
  seedRandom(41);
  // night sky, far skyline
  el('rect', { width: WW, height: 760, fill: 'url(#sun)' }, S);
  for (let i = 0; i < 38; i++) el('circle', { cx: rnd() * WW, cy: 20 + rnd() * 150, r: 1.4 + rnd() * 2, fill: '#fff', opacity: 0.4 + rnd() * 0.5 }, S);
  for (let i = 0; i < 22; i++) { const h = 90 + rnd() * 150, x = i * 112; el('rect', { x, y: 310 - h, width: 100, height: h + 4, fill: i % 2 ? '#2a2548' : '#322a58' }, S); for (let k = 0; k < 6; k++) if (rnd() > 0.35) el('rect', { x: x + 12 + (k % 3) * 28, y: 310 - h + 14 + Math.floor(k / 3) * 34, width: 14, height: 18, fill: '#ffd98a', opacity: 0.8 }, S); }

  // street surface: pavement, plaza tiles
  el('rect', { x: 0, y: 760, width: WW, height: 80, fill: '#d8cdb0' }, S);
  el('rect', { x: 0, y: 836, width: WW, height: 8, fill: GOLD }, S);
  const tile = 110;
  for (let ty = 844; ty < 1380; ty += tile) for (let tx = 0; tx < WW; tx += tile) el('rect', { x: tx, y: ty, width: tile, height: tile, fill: ((tx + ty) / tile) % 2 < 1 ? '#efe7d4' : '#3a3550', opacity: 0.96 }, S);
  el('rect', { x: 0, y: 1380, width: WW, height: 14, fill: '#8a7a5a' }, S);
  el('rect', { x: 0, y: 1394, width: WW, height: WH - 1394, fill: '#26242e' }, S);
  for (let x = 40; x < WW; x += 200) el('rect', { x, y: 1446, width: 110, height: 8, rx: 3, fill: '#d9c88a', opacity: 0.7 }, S);

  shop(S, 0, 'COUTURE', '#7a1d3a', `${mannequin('#8a1d3a', 110, 290)}${mannequin('#1d4a6a', 210, 290)}${mannequin('#d9b66a', 310, 290)}`);
  shop(S, 420, 'JEWELS', '#1d4a5a', `<g transform="translate(60,300)">${[0, 1, 2].map((i) => `<rect x="${i * 100}" y="60" width="70" height="90" rx="4" fill="#1c1a30" stroke="${GOLD}" stroke-width="2.5"/><path d="M${14 + i * 100} 100l10-16h30l10 16-25 30z" fill="#e8f4ff" stroke="#9ab8d0" stroke-width="2"/>`).join('')}</g>`);
  restaurant(S, 840);
  shop(S, 1560, 'PARFUM', '#2a6a5a', `<g transform="translate(60,300)">${[0, 1, 2, 3].map((i) => `<g transform="translate(${i * 80},60)"><rect x="0" y="40" width="44" height="76" rx="6" fill="${['#e8a0c0', '#a0d0e8', '#f2d87a', '#c8a0e8'][i]}" stroke="${OL}" stroke-width="2"/><rect x="14" y="22" width="16" height="20" fill="${GOLD}" stroke="${OL}" stroke-width="2"/></g>`).join('')}</g>`);
  shop(S, 1980, 'ATELIER', '#6a4a1a', `${mannequin('#2a3a7a', 120, 290)}${mannequin('#fbf3e2', 220, 290)}${mannequin('#7a1d3a', 320, 290)}`);

  // red-carpet path
  const YS = [1260, 1190, 1270, 1190, 1270, 1190, 1270, 1190];
  const spots = YS.map((y, i) => [280 + i * 235, y]);
  const done = (n) => (progress.stars[n] || 0) > 0;
  const current = chapter.levels.find((l) => !done(l.n));
  const lvl = chapter.levels.map((l, i) => ({ n: l.n, name: l.name, s: progress.stars[l.n] || 0, st: done(l.n) ? 'done' : (current && current.n === l.n ? 'now' : 'lock'), pos: spots[i] }));
  // start the carpet at the restaurant door, then wind through the stops (level 1 first)
  const order = [[100, 1330], ...spots];
  let d = `M${order[0].join(' ')}`;
  for (let i = 1; i < order.length; i++) {
    const a = order[i - 1], b = order[i], p0 = order[i - 2] || a, p1 = order[i + 1] || b;
    d += ` C${a[0] + (b[0] - p0[0]) / 6} ${a[1] + (b[1] - p0[1]) / 6} ${b[0] - (p1[0] - a[0]) / 6} ${b[1] - (p1[1] - a[1]) / 6} ${b[0]} ${b[1]}`;
  }
  const rd = { d, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  el('path', { ...rd, stroke: '#000', 'stroke-width': 64, opacity: 0.28, transform: 'translate(0,7)' }, S);
  el('path', { ...rd, stroke: GOLD, 'stroke-width': 60 }, S);
  el('path', { ...rd, stroke: '#7a1d3a', 'stroke-width': 48 }, S);
  el('path', { ...rd, stroke: '#9a2a4c', 'stroke-width': 30, opacity: 0.55 }, S);
  el('path', { ...rd, stroke: GOLD_L, 'stroke-width': 4, 'stroke-dasharray': '2 20', opacity: 0.8 }, S);
  const road = el('path', { ...rd, stroke: 'none' }, S);
  const total = road.getTotalLength(), doneCount = lvl.filter((l) => l.st === 'done').length;
  if (doneCount) {
    let best = 0, bd = 1e9; const last = spots[doneCount - 1];
    for (let t = 0; t <= total; t += 4) { const q = road.getPointAtLength(t), dd = Math.hypot(q.x - last[0], q.y - last[1]); if (dd < bd) { bd = dd; best = t; } }
    el('path', { ...rd, stroke: GOLD_L, 'stroke-width': 16, 'stroke-dasharray': `${best} ${total}`, opacity: 0.95 }, S);
    el('path', { ...rd, stroke: '#fff', 'stroke-width': 5, 'stroke-dasharray': `${best} ${total}` }, S);
  }

  // street furniture
  fountain(S, 1500, 1010);
  [90, 600, 840, 1560, 1820, 2300].forEach((x) => lamp(S, x, 860));
  [[300, 880], [720, 900], [1460, 880], [1900, 900]].forEach(([x, y]) => planter(S, x, y, 0.9));
  [[110, 1210], [2380, 1340]].forEach(([x, y]) => planter(S, x, y, 0.8));
  car(S, 240, 1420, '#15131c', true); car(S, 900, 1424, '#9a1d3a'); car(S, 1500, 1420, '#f3ecdc', true); car(S, 2060, 1424, '#2a3a7a');
  G(S, 1000, 880, `${bag('#7a1d3a', 0, 0)}${bag('#d9b66a', 22, 8)}`); G(S, 2290, 1290, `${bag('#1d4a5a', 0, 0)}${bag('#fbf3e2', 20, 6)}`);

  // stops (gold medallions)
  const star5 = (x, y, on) => `<path transform="translate(${x},${y}) scale(1.4)" d="M0-9L2.7-3 9-2.4 4.2 1.8 5.6 8 0 4.8 -5.6 8 -4.2 1.8 -9-2.4 -2.7-3Z" fill="${on ? '#ffd84a' : '#5a6a78'}" stroke="#14100f" stroke-width="1.2"/>`;
  lvl.forEach((l) => {
    const [x, y] = l.pos, lock = l.st === 'lock';
    const n = el('g', { class: 'node', 'data-n': l.n, transform: `translate(${x},${y})`, tabindex: lock ? -1 : 0, role: 'button', 'aria-label': `Level ${l.n}, ${l.name}, ` + (lock ? 'locked' : l.st === 'now' ? 'next up' : l.s + ' stars') }, S);
    el('ellipse', { cy: 16, rx: 58, ry: 22, fill: '#000', opacity: 0.4 }, n);
    const u = el('g', { class: 'lift' }, n);
    if (l.st === 'now') el('ellipse', { rx: 56, ry: 26, fill: GOLD_L, class: 'pulse' }, u);
    const top = lock ? '#6a6678' : l.st === 'now' ? '#9a1d3a' : GOLD, edge = lock ? '#3a3648' : l.st === 'now' ? '#4a0a1c' : GOLD_D;
    el('path', { d: 'M-48 0v14a48 22 0 0 0 96 0v-14Z', fill: edge, stroke: OL, 'stroke-width': 2 }, u);
    el('ellipse', { class: 'ring', rx: 48, ry: 23, fill: top, stroke: OL, 'stroke-width': 2.5 }, u);
    el('ellipse', { rx: 37, ry: 17, fill: 'none', stroke: lock ? '#8a869a' : GOLD_L, 'stroke-width': 2, opacity: 0.85, 'stroke-dasharray': '4 5' }, u);
    const t = el('text', { y: 11, 'text-anchor': 'middle', 'font-family': 'Playfair Display,serif', 'font-weight': 900, 'font-size': 30, fill: lock ? '#a8a4b8' : '#fff', stroke: '#2a0a14', 'stroke-width': 1.4, 'paint-order': 'stroke' }, u); t.textContent = l.n;
    if (lock) el('g', { transform: 'translate(0,-26) scale(1.4)' }, u).innerHTML = '<rect x="-7" y="-2" width="14" height="11" rx="2" fill="#8a869a" stroke="#14100f"/><path d="M-4-2V-6a4 4 0 0 1 8 0V-2" fill="none" stroke="#14100f" stroke-width="2"/>';
    const g = el('g', { transform: `translate(${x},${y})`, 'pointer-events': 'none' }, LB);
    const lab = el('g', { transform: 'translate(0,64)' }, g);
    el('rect', { x: -90, y: -17, width: 180, height: 32, rx: 8, fill: '#15131c', stroke: lock ? '#6a6678' : GOLD, 'stroke-width': 2 }, lab);
    const tt = el('text', { y: 6, 'text-anchor': 'middle', 'font-family': 'Josefin Sans', 'font-weight': 700, 'font-size': 18, fill: lock ? '#a8a4b8' : GOLD_L }, lab); tt.textContent = l.name;
    if (!lock) el('g', { transform: 'translate(0,-56)' }, g).innerHTML = star5(-30, 0, l.s >= 1) + star5(0, -8, l.s >= 2) + star5(30, 0, l.s >= 3);
    if (l.n === chapter.levels.length) el('path', { transform: 'translate(0,-100)', d: 'M-20 0L-12-16-3-4 0-20 3-4 12-16 20 0Z', fill: GOLD, stroke: OL, 'stroke-width': 1.5 }, g);
  });
  return { nodes: lvl, board: { x: 2290, y: 1200, dir: 1 }, home: (lvl.find((l) => l.st === 'now') || lvl[lvl.length - 1]).pos };
}
