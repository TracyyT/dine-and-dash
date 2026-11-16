// Chapter 7 (Cali Burger) buildings for the isometric city grid: little fast-food joints with giant burgers, fries and shakes on the roof,
// a chrome diner, taco and surf shops, pastel beach condos and a motel. Same drawing helpers as the city buildings.
import { FL, OUT, P, el, poly, shade } from './iso.js';
import { box, door, balconies, shadow, sc } from './props.js';

const OL = '#3a1410';
const roof = (g, b, svg, s = 1, dx = 0, dy = 0) => { const t = P(b.x0 + b.w / 2, b.y0 + b.d / 2, b.h); const k = el('g', { transform: `translate(${t[0] + dx},${t[1] + dy}) scale(${s})` }, g); k.innerHTML = svg; };
const W = (c, w = 3.4) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" fill="${c}"`;

const BURGER = `<ellipse cy="6" rx="62" ry="12" fill="#000" opacity=".2"/><path d="M-54 -14H54q4 14 -10 14H-44q-14 0 -10 -14Z" ${W('#e8a048')}/><rect x="-56" y="-30" width="112" height="16" rx="8" ${W('#6a3418')}/><path d="M-58 -30H58L48 -19 36 -32 24 -19 12 -32 0 -19 -12 -32 -24 -19 -36 -32 -48 -19Z" ${W('#ffc83a', 2.6)}/><path d="M-60 -34q10 10 20 0t20 0 20 0 20 0 20 0 20 0v8h-120Z" ${W('#4fa84a', 2.6)}/><path d="M-56 -40Q-56 -98 0 -100T56 -40Z" ${W('#e8a048')}/><path d="M-40 -62Q-30 -86 -8 -90" stroke="#f6c878" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>${[[-26, -62], [4, -80], [30, -62], [-6, -54], [40, -48]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.4" ry="2.6" fill="#fff4d0" transform="rotate(-20 ${x} ${y})"/>`).join('')}`;
const FRIES = `<ellipse cy="6" rx="46" ry="10" fill="#000" opacity=".2"/>${[-30, -18, -6, 6, 18, 30].map((x, i) => `<path d="M${x} -48L${x + (i % 2 ? 7 : -5)} ${-84 - (i % 3) * 10}" stroke="${OL}" stroke-width="15" stroke-linecap="round"/><path d="M${x} -48L${x + (i % 2 ? 7 : -5)} ${-84 - (i % 3) * 10}" stroke="${i % 2 ? '#ffd84a' : '#ffc83a'}" stroke-width="9" stroke-linecap="round"/>`).join('')}<path d="M-36 0L-44 -54H44L36 0Z" ${W('#d8302a')}/><path d="M-40 -20L-42 -40H42L40 -20Z" fill="#fff6e8"/><text y="-25" text-anchor="middle" font-family="Pacifico,cursive" font-size="17" fill="#d8302a">Fries</text>`;
const SHAKE = `<ellipse cy="6" rx="44" ry="9" fill="#000" opacity=".2"/><path d="M-30 0L-40 -66H40L30 0Z" ${W('#fff6f0')}/><path d="M-34 -12L-38 -52H38L34 -12Z" fill="#f6a8c4"/><path d="M-34 -30H34" stroke="#fff" stroke-width="5" opacity=".7"/><path d="M-44 -66Q-50 -84 -24 -88Q-20 -106 6 -102Q28 -106 30 -88Q50 -84 44 -66Z" ${W('#fffaf0')}/><circle cx="4" cy="-106" r="8" ${W('#d8302a', 2.6)}/><path d="M16 -98L32 -128" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M16 -98L32 -128" stroke="#2f9aaa" stroke-width="5" stroke-linecap="round"/>`;
const HOTDOG = `<ellipse cy="4" rx="76" ry="12" fill="#000" opacity=".2"/><path d="M-74 -24Q-74 -48 0 -48T74 -24Q74 -6 0 -4T-74 -24Z" ${W('#e8b068')}/><rect x="-78" y="-38" width="156" height="26" rx="13" ${W('#d8402a')}/><path d="M-66 -26q8 -9 16 0t16 0 16 0 16 0 16 0 16 0 16 0 16 0" stroke="#ffd83a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-72 -16Q-70 6 0 6T72 -16Q0 -4 -72 -16Z" ${W('#e8b068')}/>`;
const TACO = `<ellipse cy="4" rx="56" ry="10" fill="#000" opacity=".2"/><path d="M-52 0A52 58 0 0 1 52 0Z" ${W('#ffc83a')}/><path d="M-40 -2q9 -16 20 -4t20 -4 20 4 20 -4" ${W('#4fa84a', 2.6)}/>${[[-24, -14], [2, -22], [26, -12]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.6" ${W('#d8302a', 2)}/>`).join('')}<path d="M-34 -46Q-12 -66 18 -62" stroke="#fff0a0" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>`;
const SURF = `<ellipse cy="4" rx="70" ry="10" fill="#000" opacity=".18"/>${[[-48, 80, '#fff6e8', '#d8302a'], [-16, 94, '#ffc83a', '#fff'], [16, 84, '#2aa6b8', '#fff6e8'], [48, 76, '#f27a9a', '#fff']].map(([x, h, c, c2]) => `<path d="M${x - 15} 0Q${x - 20} ${-h * 0.5} ${x} ${-h}Q${x + 20} ${-h * 0.5} ${x + 15} 0Z" ${W(c, 3)}/><path d="M${x} ${-h + 8}V-4" stroke="${c2}" stroke-width="4"/>`).join('')}`;
const DINERSIGN = `<ellipse cy="4" rx="50" ry="8" fill="#000" opacity=".18"/><path d="M-34 0V-34M34 0V-34" stroke="${OL}" stroke-width="5"/><rect x="-54" y="-80" width="108" height="48" rx="10" ${W('#2a1418')}/><rect x="-47" y="-73" width="94" height="34" rx="6" fill="none" stroke="#5ae8ff" stroke-width="3"/><text y="-47" text-anchor="middle" font-family="Pacifico,cursive" font-size="28" fill="#ff9ad8" stroke="#ff4aa8" stroke-width=".8">Diner</text>`;
const MOTEL = `<ellipse cy="4" rx="50" ry="8" fill="#000" opacity=".18"/><path d="M-30 0V-30M30 0V-30" stroke="${OL}" stroke-width="5"/><rect x="-50" y="-76" width="100" height="46" rx="8" ${W('#2a1418')}/><text y="-44" text-anchor="middle" font-family="Josefin Sans,sans-serif" font-weight="900" font-size="24" fill="#5ae8ff" stroke="#2aa6b8" stroke-width=".8" letter-spacing="2">MOTEL</text><path d="M-38 -56h76" stroke="#ff4aa8" stroke-width="3"/>`;
const PALMTOP = (s) => `<g transform="scale(${s})"><path d="M0 0Q4 -30 0 -58" stroke="#8a5a2a" stroke-width="6" fill="none" stroke-linecap="round"/><g transform="translate(0,-58)">${[-160, -125, -90, -55, -20, 15, 160, 200].map((a) => { const r = a * Math.PI / 180, ex = Math.cos(r) * 34, ey = Math.sin(r) * 22; return `<path d="M0 0Q${ex * .5} ${ey * .5 - 10} ${ex} ${ey + 4}Q${ex * .5} ${ey * .5 + 2} 0 0Z" ${W('#3f9a4a', 1.6)}/>`; }).join('')}</g></g>`;

// a row of stripes on the street-facing wall (an awning), like the city shops
function stripes(g, b, c1, c2, n = 6, proj = 0.55, zt = 40, zb = 26) {
  const { x0, y0, w, d } = b;
  for (let i = 0; i < n; i++) { const a = 0.04 + 0.92 * i / n, c = 0.04 + 0.92 * (i + 1) / n; poly([P(x0 + w * a, y0 + d, zt), P(x0 + w * c, y0 + d, zt), P(x0 + w * c, y0 + d + proj, zb), P(x0 + w * a, y0 + d + proj, zb)], i % 2 ? c2 : c1, OUT, g); }
}
function band(g, b, col, z0, z1) {
  const { x0, y0, w, d } = b;
  poly([P(x0, y0 + d, z0), P(x0 + w, y0 + d, z0), P(x0 + w, y0 + d, z1), P(x0, y0 + d, z1)], col, OUT, g);
  poly([P(x0 + w, y0 + d, z0), P(x0 + w, y0, z0), P(x0 + w, y0, z1), P(x0 + w, y0 + d, z1)], shade(col, .78), OUT, g);
}
function joint(g, b, o) {
  const { x0, y0, w, d, h, base } = b;
  box(g, x0, y0, w, d, h, base, { win: true, wo: { cell: 1.0, wf: .74, vh: 24, v0: 8, top: 6, skipG: false, glass: !!o.glass } });
  band(g, b, o.band, h - 10, h);
  stripes(g, b, o.s1, o.s2, o.n || 6);
  door(g, x0, y0, w, d, .4, .6, 24, '#2a1418', '#fff6e8');
  if (o.prop) roof(g, b, o.prop, o.ps || 0.9, o.dx || 0, o.dy || 0);
}

const STYLE = {
  burger(g, b) { joint(g, b, { band: '#d8302a', s1: '#d8302a', s2: '#fff6e8', prop: BURGER, ps: 0.95, dy: 4 }); },
  fries(g, b) { joint(g, b, { band: '#ffc83a', s1: '#ffc83a', s2: '#d8302a', prop: FRIES, ps: 0.95, dy: 4 }); },
  shake(g, b) { joint(g, b, { band: '#2aa6b8', s1: '#f27a9a', s2: '#fff6e8', prop: SHAKE, ps: 0.95, dy: 4 }); },
  hotdog(g, b) { joint(g, b, { band: '#d8302a', s1: '#ffc83a', s2: '#d8302a', prop: HOTDOG, ps: 0.8, dy: 6 }); },
  taco(g, b) { joint(g, b, { band: '#2aa6b8', s1: '#2aa6b8', s2: '#fff6e8', prop: TACO, ps: 0.85, dy: 6 }); },
  surf(g, b) { joint(g, b, { band: '#fff6e8', s1: '#ff9a4a', s2: '#fff6e8', prop: SURF, ps: 0.9, dy: 6 }); },
  diner(g, b) { // chrome diner with a pink and cyan neon sign
    const { x0, y0, w, d, h } = b;
    box(g, x0, y0, w, d, h, '#d6dde2', { win: true, wo: { glass: true, cell: 1.0, wf: .82, vh: 24, v0: 8, top: 2, skipG: false } });
    band(g, b, '#d8302a', 20, 30);
    for (let i = 0; i < 8; i++) { const a = .04 + .92 * i / 8, c = .04 + .92 * (i + 1) / 8; poly([P(x0 + w * a, y0 + d, 0), P(x0 + w * c, y0 + d, 0), P(x0 + w * c, y0 + d, 8), P(x0 + w * a, y0 + d, 8)], i % 2 ? '#2a1418' : '#fff6e8', {}, g); }
    box(g, x0 - .1, y0 - .1, w + .2, d + .2, 8, '#f0f4f6', { z: h });
    stripes(g, b, '#fff6e8', '#2aa6b8', 6, .5, 46, 34);
    door(g, x0, y0, w, d, .42, .58, 24, '#2a1418', '#fff6e8');
    roof(g, b, DINERSIGN, 0.9, 0, 4);
  },
  shop(g, b) {
    const { x0, y0, w, d, h } = b, names = ['ICE CREAM', 'DONUTS', 'PIZZA', 'SMOOTHIE', 'COFFEE', 'BAGELS'], nm = names[Math.abs(Math.floor(x0 * 7 + y0 * 3)) % 6];
    joint(g, b, { band: b.aw, s1: b.aw, s2: '#fff6e8' });
    const t = P(x0 + w / 2, y0 + d / 2, h + 7);
    el('rect', { x: t[0] - 54, y: t[1] - 40, width: 108, height: 26, rx: 5, fill: '#2a1418', stroke: b.aw, 'stroke-width': 3 }, g);
    const tx = el('text', { x: t[0], y: t[1] - 21, 'text-anchor': 'middle', 'font-family': 'Josefin Sans,sans-serif', 'font-weight': 800, 'font-size': 15, fill: '#ffe9a8', 'letter-spacing': 1 }, g); tx.textContent = nm;
    [-34, 34].forEach((o) => el('line', { x1: t[0] + o, y1: t[1] - 14, x2: t[0] + o, y2: t[1], stroke: '#6a4a34', 'stroke-width': 3 }, g));
  },
  condo(g, b) { // pastel beach condo with balconies and a rooftop palm
    const { x0, y0, w, d, h, base } = b, rows = Math.floor(h / FL);
    box(g, x0, y0, w, d, h, base, { trim: false, win: true, wo: { cell: .8, wf: .46, vh: 20, v0: 16 } });
    box(g, x0 - .08, y0 - .08, w + .16, d + .16, 8, '#fff6e8', { z: h });
    balconies(g, x0, y0, w, d, rows, 'L', '#fff6e8'); balconies(g, x0, y0, w, d, rows, 'R', '#fff6e8');
    door(g, x0, y0, w, d, .4, .6, 30, '#2a1418', '#fff6e8');
    stripes(g, b, b.aw, '#fff6e8', 5, .45, 38, 26);
    roof(g, b, PALMTOP(1.1), 1, -18, 0); roof(g, b, PALMTOP(0.9), 1, 26, 8);
  },
  motel(g, b) {
    const { x0, y0, w, d, h, base } = b, rows = Math.floor(h / FL);
    box(g, x0, y0, w, d, h, base, { trim: false, win: true, wo: { cell: .8, wf: .5, vh: 20, v0: 14 } });
    band(g, b, '#2aa6b8', h - 10, h);
    balconies(g, x0, y0, w, d, rows, 'L', '#fff6e8');
    door(g, x0, y0, w, d, .42, .58, 30, '#2a1418', '#fff6e8');
    roof(g, b, MOTEL, 0.9, 0, 4);
  },
};
export function drawFastBuilding(g, b) { shadow(g, b.x0, b.y0, b.w, b.d, b.h); STYLE[b.style](g, b); if (b.sign) fastSign(g, b); }
function fastSign(g, b) { // level name on a neon plaque by the door
  const fl = Math.min(b.h - 44, 70); if (fl < 24) return;
  const [sx, sy] = P(b.x0 + b.w * .08, b.y0 + b.d, fl), t = el('g', { transform: `matrix(1 .5 0 1 ${sx} ${sy})` }, g), tw = b.sign.length * 14 + 16;
  el('rect', { x: 0, y: -20, width: tw, height: 26, rx: 4, fill: '#2a1418', stroke: '#ff9ad8', 'stroke-width': 2.4 }, t);
  const tx = el('text', { x: 8, y: -1, 'font-family': 'Josefin Sans,sans-serif', 'font-weight': 800, 'font-size': 17, fill: '#ff9ad8', 'letter-spacing': 1 }, t); tx.textContent = b.sign;
}
export function palmXY(g, x, y, s = 1, lean = 1) {
  const t = sc(g, x, y, s);
  const fr = (a, l) => { const r = a * Math.PI / 180, ex = Math.cos(r) * l, ey = Math.sin(r) * l * .6; return `<path d="M0 0Q${ex * .5} ${ey * .5 - 10} ${ex} ${ey + 4}Q${ex * .55} ${ey * .5 + 1} 0 0Z" ${W('#3f9a4a', 1.4)}/>`; };
  t.innerHTML = `<ellipse cx="4" cy="2" rx="18" ry="6" fill="#000" opacity=".25"/><path d="M0 0Q${6 * lean} -40 ${3 * lean} -84" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M0 0Q${6 * lean} -40 ${3 * lean} -84" stroke="#9a6a34" stroke-width="5.6" fill="none" stroke-linecap="round"/><g transform="translate(${3 * lean},-84)">${[-170, -140, -105, -75, -40, -10, 25, 60, 150, 190].map((a, i) => fr(a, 34 + (i % 3) * 5)).join('')}<circle cx="-3" cy="3" r="3.4" fill="#7a4a1c"/><circle cx="3" cy="4" r="3.4" fill="#7a4a1c"/></g>`;
}
export const FSTY = ['burger', 'fries', 'shake', 'hotdog', 'diner', 'taco', 'surf', 'condo', 'shop', 'motel'];
export const FPAL = { burger: ['#fff0d8', '#ffe8c8'], fries: ['#fff0c0', '#ffe9a8'], shake: ['#ffd8e4', '#fbc8d8'], hotdog: ['#ffe8a0', '#ffd890'], taco: ['#ffb78a', '#f2a07a'], surf: ['#7fd0d8', '#5ec0cc'], diner: ['#d6dde2'], shop: ['#fbd0c0', '#c8e8d8', '#fff0b8', '#c8d8f4'], condo: ['#fbd0c0', '#f4e2a8', '#c8e6d8', '#e0d0f0', '#bfe0f2'], motel: ['#fff0d8', '#fbd0c0'] };
export const FFLR = { burger: [2, 2], fries: [2, 2], shake: [2, 2], hotdog: [2, 2], taco: [2, 2], surf: [2, 2], diner: [1, 1], shop: [2, 2], condo: [3, 5], motel: [2, 3] };
