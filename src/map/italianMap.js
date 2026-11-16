// Chapter 6 map: Italian Trattoria. One storybook scene of a seaside Italian village: pink bougainvillea, ochre houses, a bell tower, a big Trattoria with a striped awning and
// terrace tables, a winding paved road with the level stops, a canal with an arched stone bridge, a market stall, a balustrade over the sea and sunny cliffs.
import { levelStop } from './stop.js';
import { el, rnd, seedRandom, WW, WH } from './iso.js';

export const ITALIAN_DEFS = `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86c4ee"/><stop offset=".6" stop-color="#bfe0f4"/><stop offset="1" stop-color="#fbd8c4"/></linearGradient>
<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46b8d8"/><stop offset="1" stop-color="#1f86b8"/></linearGradient>
<linearGradient id="canal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#58d4d8"/><stop offset="1" stop-color="#2fa4c8"/></linearGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe6a0" stop-opacity=".85"/><stop offset="1" stop-color="#ffe6a0" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".8"><stop offset=".7" stop-color="#5a2a2a" stop-opacity="0"/><stop offset="1" stop-color="#5a2a2a" stop-opacity=".22"/></radialGradient>
<pattern id="cob" width="64" height="48" patternUnits="userSpaceOnUse"><rect width="64" height="48" fill="#e6d5b0"/><g fill="#f2e6c8" stroke="#cdb88e" stroke-width="2"><rect x="3" y="3" width="26" height="19" rx="7"/><rect x="35" y="3" width="26" height="19" rx="7"/><rect x="19" y="26" width="26" height="19" rx="7"/><rect x="-13" y="26" width="26" height="19" rx="7"/><rect x="51" y="26" width="26" height="19" rx="7"/></g></pattern>
<pattern id="chk" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fff"/><rect width="8" height="8" fill="#d8402f"/><rect x="8" y="8" width="8" height="8" fill="#d8402f"/></pattern>
<filter id="itGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>`;

const K = { terra: '#d4673a', terraD: '#b4522c', ochre: '#ecc78c', ochreD: '#d6a96a', pink: '#efb8a0', cream: '#f6e6c4', stone: '#cdb88e', stoneD: '#9a8466', green: '#4f8a44', greenD: '#2f6a3a', shut: '#3f7a52', red: '#d8402f', blue: '#2f78c8', wood: '#8a5a32' };
const G = (S, x, y, html, extra = '') => { const n = el('g', { transform: `translate(${x},${y}) ${extra}` }, S); n.innerHTML = html; return n; };
const shd = (rx, o = 0.2) => `<ellipse cy="4" rx="${rx}" ry="${rx * 0.16}" fill="#3a2a1a" opacity="${o}"/>`;
const sc = (s) => `scale(${s})`;
const cr = (pts, closed = false) => {
  const n = pts.length, g = (i) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]); let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2); d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`; }
  return d + (closed ? 'Z' : '');
};

// ---------- small pieces ----------
function bougain(r, n = 16) { let h = ''; for (let i = 0; i < n; i++) { const a = rnd() * 6.28, d = rnd() * r; h += `<ellipse cx="${Math.cos(a) * d * 1.1}" cy="${Math.sin(a) * d * 0.8}" rx="${r * 0.3}" ry="${r * 0.22}" fill="${['#4f9a48', '#3f8a40', '#62aa52'][i % 3]}"/>`; } for (let i = 0; i < n * 2; i++) { const a = rnd() * 6.28, d = rnd() * r; h += `<circle cx="${Math.cos(a) * d * 1.1}" cy="${Math.sin(a) * d * 0.8}" r="${r * 0.11 + rnd() * 3}" fill="${['#e0408f', '#c8307f', '#f070b0', '#fbd0e4'][Math.floor(rnd() * 4)]}"/>`; } return h; }
function flowers(S, x, y, r = 40) { G(S, x, y, bougain(r)); }
function cypress(S, x, y, s = 1) { G(S, x, y, `${shd(16)}<path d="M0 -150Q22 -92 18 -22Q15 0 0 0T-18 -22Q-22 -92 0 -150Z" fill="#2b6a3a"/><path d="M0 -150Q12 -92 9 -22Q6 0 0 0Z" fill="#3a8248"/>`, sc(s)); }
function olive(S, x, y, s = 1) { G(S, x, y, `${shd(26)}<path d="M-5 0Q-9 -14 -14 -26M5 0Q9 -12 12 -24" stroke="#7a5a3a" stroke-width="6" fill="none" stroke-linecap="round"/>${[[-14, -36, 15], [10, -40, 17], [0, -30, 13]].map(([a, b, r], i) => `<circle cx="${a}" cy="${b}" r="${r}" fill="${['#9fb47e', '#adc08a', '#8aa06a'][i]}"/>`).join('')}`, sc(s)); }
function planter(S, x, y, s = 1) { G(S, x, y, `${shd(34)}<path d="M-30 -26H30L24 0H-24Z" fill="#c8602f"/><rect x="-32" y="-32" width="64" height="9" rx="3" fill="#d9783f"/><g transform="translate(0,-34)">${bougain(26, 8)}</g>`, sc(s)); }
function lamp(S, x, y, s = 1) { G(S, x, y, `${shd(14)}<rect x="-3" y="-120" width="6" height="120" fill="#2f3a3a"/><path d="M-12 -2H12L6 -14H-6Z" fill="#2f3a3a"/><path d="M-3 -96Q-26 -104 -22 -124" stroke="#2f3a3a" stroke-width="4" fill="none"/><g transform="translate(-22,-132)"><circle r="34" fill="url(#glow)"/><path d="M-10 -10H10L7 14H-7Z" fill="#ffe08a" stroke="#2f3a3a" stroke-width="3"/><path d="M-13 -10H13L0 -22Z" fill="#2f3a3a"/></g>`, sc(s)); }
function umbrella(S, x, y, s = 1) { let st = ''; for (let i = 0; i < 6; i++) { const a0 = -64 + i * 21.3, a1 = a0 + 21.3; st += `<path d="M${a0} -92L${a1} -92L0 -128Z" fill="${i % 2 ? '#fff' : K.red}"/>`; } G(S, x, y, `<rect x="-2" y="-120" width="4" height="120" fill="#cfc2ae"/><path d="M-70 -92Q-60 -78 -48 -92Q-36 -78 -24 -92Q-12 -78 0 -92Q12 -78 24 -92Q36 -78 48 -92Q60 -78 70 -92L0 -130Z" fill="${K.red}"/>${st}`, sc(s)); }
function chair(x, flip) { return `<g transform="translate(${x},0) scale(${flip},1)"><rect x="-9" y="-30" width="18" height="4" fill="${K.wood}"/><rect x="-9" y="-56" width="4" height="30" fill="${K.wood}"/><rect x="-9" y="-30" width="4" height="30" fill="#6a4524"/><rect x="5" y="-26" width="4" height="26" fill="#6a4524"/></g>`; }
function tableSet(S, x, y, withUmb, s = 1) { G(S, x, y, `${shd(60)}${chair(-46, 1)}${chair(46, -1)}<rect x="-3" y="-46" width="6" height="46" fill="#5a3a22"/><ellipse cy="-48" rx="40" ry="12" fill="url(#chk)" stroke="#b82a22" stroke-width="2"/><path d="M-40 -48Q-34 -30 -22 -36Q-10 -26 0 -34Q10 -26 22 -36Q34 -30 40 -48Z" fill="url(#chk)" stroke="#b82a22" stroke-width="1.5"/><circle cx="-8" cy="-54" r="4" fill="#fff"/><circle cx="10" cy="-55" r="4" fill="#f7d86a"/>`, sc(s)); if (withUmb) umbrella(S, x, y - 6, s); }
function awning(x, y, w, h = 58) { const n = Math.round(w / 34), sw = w / n; let a = `<path d="M${x} ${y}H${x + w}V${y + 8}H${x}Z" fill="#a8301f"/>`; for (let i = 0; i < n; i++) a += `<path d="M${x + i * sw} ${y}H${x + (i + 1) * sw}V${y + h - 12}Q${x + (i + 0.5) * sw} ${y + h + 10} ${x + i * sw} ${y + h - 12}Z" fill="${i % 2 ? '#fff' : K.red}"/>`; return a; }
function roofTiles(x, y, w, h, rows) { let t = ''; for (let i = 1; i < rows; i++) t += `<path d="M${x + (w * i) / rows * 0} ${y + (h * i) / rows}H${x + w}" stroke="${K.terraD}" stroke-width="2" opacity=".45"/>`; return t; }
function win(x, y, w, h, shutters = true, arched = true) { let s = ''; if (shutters) s += `<rect x="${x - w * 0.55}" y="${y}" width="${w * 0.5}" height="${h}" fill="${K.shut}"/><rect x="${x + w * 1.05}" y="${y}" width="${w * 0.5}" height="${h}" fill="${K.shut}"/>`; s += arched ? `<path d="M${x} ${y + h}V${y + w / 2}a${w / 2} ${w / 2} 0 0 1 ${w} 0V${y + h}Z" fill="#3a4a5a"/><path d="M${x + 3} ${y + h}V${y + w / 2}a${w / 2 - 3} ${w / 2 - 3} 0 0 1 ${w - 6} 0V${y + h}Z" fill="#8fb4d4" opacity=".55"/>` : `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#3a4a5a"/>`; s += `<rect x="${x - 4}" y="${y + h}" width="${w + 8}" height="5" fill="#d6c4a0"/>`; return s; }
function house(S, x, y, w, h, wall, roofH = 50, flat = false, extra = '') {
  let g = `${shd(w * 0.55, 0.14)}<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${wall}"/><rect x="${w * 0.2}" y="${-h}" width="${w * 0.3}" height="${h}" fill="#000" opacity=".07"/>`;
  g += flat ? `<rect x="${-w / 2 - 5}" y="${-h - 8}" width="${w + 10}" height="10" fill="#e8d8b4"/>` : `<path d="M${-w / 2 - 12} ${-h + 4}L${-w / 2 + 18} ${-h - roofH}H${w / 2 - 18}L${w / 2 + 12} ${-h + 4}Z" fill="${K.terra}"/>${roofTiles(-w / 2, -h - roofH, w, roofH, 5)}<path d="M${-w / 2 - 12} ${-h + 4}H${w / 2 + 12}" stroke="${K.terraD}" stroke-width="6"/>`;
  const cols = Math.max(1, Math.floor(w / 78)), rows = Math.max(1, Math.floor((h - 30) / 96));
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) g += win(-w / 2 + (c + 0.5) * (w / cols) - 11, -h + 30 + r * 96, 22, 42);
  g += `<path d="M-18 0V-54a18 18 0 0 1 36 0V0Z" fill="#6a4a30"/><path d="M-14 0V-52a14 14 0 0 1 28 0V0Z" fill="#8a6038"/>` + extra;
  G(S, x, y, g);
}
function bellTower(S, x, y) { G(S, x, y, `${shd(70, 0.16)}<rect x="-62" y="-330" width="124" height="330" fill="#e6d2a4"/><rect x="18" y="-330" width="44" height="330" fill="#000" opacity=".08"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M-62 ${-300 + i * 44}H62" stroke="#c8b488" stroke-width="3" opacity=".5"/>`).join('')}<rect x="-70" y="-342" width="140" height="16" fill="#d2ba88"/><rect x="-52" y="-444" width="104" height="104" fill="#ead7a8"/><path d="M-30 -340v-66a30 30 0 0 1 60 0v66Z" fill="#3a2a22"/><g transform="translate(0,-378)"><path d="M-16 -10Q-16 -26 0 -26T16 -10L22 6H-22Z" fill="#e6b13a" stroke="#a47a1a" stroke-width="2"/><circle cy="9" r="4" fill="#a47a1a"/></g><path d="M-68 -444L0 -540L68 -444Z" fill="${K.terra}"/><path d="M0 -540L68 -444H20Z" fill="${K.terraD}"/>${win(-9, -250, 18, 40, false)}${win(-9, -150, 18, 40, false)}<path d="M-18 0V-54a18 18 0 0 1 36 0V0Z" fill="#6a4a30"/>`); }
function trattoria(S, x, y) {
  let g = `${shd(430, 0.16)}<rect x="-380" y="-300" width="760" height="300" fill="${K.ochre}"/><rect x="230" y="-300" width="150" height="300" fill="#000" opacity=".07"/>`;
  g += `<path d="M-410 -290L-330 -420H330L410 -290Z" fill="${K.terra}"/>${[1, 2, 3, 4].map((i) => `<path d="M${-410 + i * 12} ${-290 - i * 32}H${410 - i * 12}" stroke="${K.terraD}" stroke-width="3" opacity=".5"/>`).join('')}<path d="M-410 -288H410" stroke="${K.terraD}" stroke-width="8"/>`;
  g += `<rect x="150" y="-500" width="46" height="90" fill="#c8ac74"/><rect x="144" y="-512" width="58" height="14" fill="#a88a58"/>`;
  g += `<rect x="-380" y="-300" width="30" height="300" fill="#f0d8a0"/>`;
  [[-300, -230], [-230, -230]].forEach(([a, b]) => g += win(a, b, 30, 60));
  g += `<rect x="-232" y="-232" width="50" height="4" fill="none"/>`;
  [[-110, -240], [-30, -240], [60, -240]].forEach(([a, b]) => g += win(a, b, 36, 70));
  g += `<path d="M-30 0V-90a30 30 0 0 1 60 0V0Z" fill="#6a4a30" transform="translate(-170,0)"/>`;
  // vine on right wall
  g += `<g transform="translate(330,-150)">${bougain(70, 12).replace(/#e0408f|#c8307f|#f070b0|#fbd0e4/g, '#6aae52')}</g><g transform="translate(350,-250)">${bougain(60, 12).replace(/#e0408f|#c8307f|#f070b0|#fbd0e4/g, '#4f9a48')}</g>`;
  g += awning(-250, -128, 480, 66);
  g += `<g transform="translate(-10,-330)"><rect x="-130" y="-34" width="260" height="68" rx="12" fill="#26402f" stroke="#6a4a2a" stroke-width="6"/><text x="0" y="12" text-anchor="middle" font-family="Playfair Display,Georgia,serif" font-style="italic" font-weight="700" font-size="42" fill="#f6e3b8">Trattoria</text></g>`;
  g += `<g transform="translate(-10,-392)"><circle r="40" fill="#e6c48a" stroke="#6a4a2a" stroke-width="5"/><circle r="30" fill="#f2b85a"/>${[[-10, -10], [10, -6], [0, 12], [14, 12], [-14, 8]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="5" fill="#d8402f"/>`).join('')}</g>`;
  g += `<rect x="-260" y="-70" width="500" height="70" fill="#000" opacity=".12"/><path d="M-110 0V-100a46 46 0 0 1 92 0V0Z" fill="#4a3220" transform="translate(64,0)"/>`;
  G(S, x, y, g);
}
function stall(S, x, y) { G(S, x, y, `${shd(110, 0.16)}<rect x="-100" y="-130" width="8" height="130" fill="${K.wood}"/><rect x="92" y="-130" width="8" height="130" fill="${K.wood}"/><rect x="-96" y="-60" width="196" height="60" fill="#a8743a"/><rect x="-96" y="-60" width="196" height="9" fill="#c8924a"/>${awning(-112, -156, 224, 44)}${[-70, -40, -10, 22, 54].map((a, i) => `<circle cx="${a}" cy="-70" r="11" fill="${['#d8402f', '#f0b43a', '#e8602f', '#d8402f', '#7ab048'][i]}"/>`).join('')}${[-60, -20, 30, 66].map((a) => `<ellipse cx="${a}" cy="-24" rx="14" ry="9" fill="#d8402f" opacity=".85"/>`).join('')}<g transform="translate(150,0)"><ellipse cy="-28" rx="30" ry="9" fill="#6a4524"/><path d="M-30 -28V0Q0 12 30 0V-28Z" fill="#8a5a32"/><path d="M-30 -14Q0 -2 30 -14" stroke="#4a2e14" stroke-width="4" fill="none"/></g><g transform="translate(-170,0)"><path d="M-30 0L-18 -86H18L30 0Z" fill="#8a5a32"/><rect x="-24" y="-80" width="48" height="52" fill="#26332a"/><path d="M-16 -66H16M-16 -54H10M-16 -42H14" stroke="#fff" stroke-width="3" opacity=".8"/></g><g transform="translate(-110,0)"><path d="M-30 0V-18H30V0Z" fill="#b4784a"/><circle cx="-14" cy="-24" r="9" fill="#d8402f"/><circle cx="6" cy="-24" r="9" fill="#e8602f"/><circle cx="22" cy="-22" r="8" fill="#7ab048"/></g>`); }
function barrel(S, x, y) { G(S, x, y, `${shd(24)}<path d="M-22 0V-44Q-28 -22 -22 0Q0 8 22 0Q28 -22 22 -44Q0 -50 -22 -44Z" fill="#8a5a32"/><path d="M-24 -32Q0 -26 24 -32M-24 -12Q0 -6 24 -12" stroke="#3a2a1a" stroke-width="4" fill="none"/>`); }
function rowboat(S, x, y) { G(S, x, y, `<path d="M-64 -6Q-70 -28 -50 -30H50Q70 -28 64 -6Q0 16 -64 -6Z" fill="#7a5a3a"/><path d="M-52 -26H52" stroke="#a8844a" stroke-width="5"/><rect x="-30" y="-24" width="60" height="8" fill="#5a3a22"/><ellipse cy="10" rx="80" ry="6" fill="#fff" opacity=".4"/>`); }
function sailboat(S, x, y, s = 1) { G(S, x, y, `<path d="M-24 0H24L16 9H-16Z" fill="#fff"/><path d="M0 -3V-62L24 -6Z" fill="#fff"/><path d="M-3 -3V-48L-18 -6Z" fill="#f6e6d0"/><ellipse cy="12" rx="30" ry="3" fill="#fff" opacity=".5"/>`, sc(s)); }
function rock(S, x, y, w, h, c1 = '#c4b090', c2 = '#a89472') { G(S, x, y, `${shd(w * 0.5, 0.2)}<path d="M${-w / 2} 0L${-w * 0.42} ${-h * 0.6}L${-w * 0.2} ${-h}L${w * 0.15} ${-h * 0.9}L${w * 0.45} ${-h * 0.5}L${w / 2} 0Z" fill="${c1}"/><path d="M${w * 0.15} ${-h * 0.9}L${w * 0.45} ${-h * 0.5}L${w / 2} 0H${w * 0.05}Z" fill="${c2}"/><path d="M${-w * 0.2} ${-h}L${-w * 0.05} ${-h * 0.4}L${-w * 0.3} 0" stroke="#7a6648" stroke-width="3" fill="none" opacity=".5"/>`); }
function balust(S, pts) {
  const path = el('path', { d: cr(pts), fill: 'none', stroke: 'none' }, S), L = path.getTotalLength();
  el('path', { d: cr(pts), fill: 'none', stroke: '#8f7a5a', 'stroke-width': 14, transform: 'translate(0,34)', 'stroke-linecap': 'round' }, S);
  for (let t = 0; t <= L; t += 26) { const q = path.getPointAtLength(t); G(S, q.x, q.y + 34, `<rect x="-5" y="-30" width="10" height="30" rx="3" fill="#f2e6cc" stroke="#b8a47c" stroke-width="1.5"/><circle cy="-16" r="7" fill="#f6ecd6" stroke="#b8a47c" stroke-width="1.5"/>`); }
  el('path', { d: cr(pts), fill: 'none', stroke: '#f2e6cc', 'stroke-width': 12, transform: 'translate(0,2)', 'stroke-linecap': 'round' }, S);
  el('path', { d: cr(pts), fill: 'none', stroke: '#c8b48c', 'stroke-width': 3, transform: 'translate(0,2)', 'stroke-linecap': 'round' }, S);
}
function bridge(S, x, y, w) {
  const n = 3, sw = w / n; let g = `<rect x="${-w / 2 - 14}" y="-60" width="${w + 28}" height="22" rx="8" fill="#e8d8b4" stroke="#b8a47c" stroke-width="3"/><rect x="${-w / 2}" y="-40" width="${w}" height="64" fill="#d4c098"/>`;
  for (let i = 0; i < n; i++) { const cx = -w / 2 + sw * (i + 0.5); g += `<path d="M${cx - sw * 0.36} 24V0a${sw * 0.36} ${sw * 0.36} 0 0 1 ${sw * 0.72} 0V24Z" fill="url(#canal)"/><path d="M${cx - sw * 0.36} 24V0a${sw * 0.36} ${sw * 0.36} 0 0 1 ${sw * 0.72} 0" fill="none" stroke="#a88e66" stroke-width="5"/>`; }
  for (let i = 0; i <= 14; i++) g += `<rect x="${-w / 2 + i * w / 14 - 3}" y="-96" width="6" height="40" fill="${K.wood}"/>`;
  g += `<rect x="${-w / 2}" y="-100" width="${w}" height="8" fill="#a8743a"/><rect x="${-w / 2}" y="-78" width="${w}" height="6" fill="#8a5a32"/>`;
  G(S, x, y, g);
}
function viaduct(S, x, y, w, h) { let g = `${shd(w * 0.5, 0.18)}<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="#d2bc90"/>`; for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) g += `<rect x="${-w / 2 + c * w / 9 + (r % 2) * 14}" y="${-h + r * h / 6}" width="${w / 9 - 3}" height="${h / 6 - 3}" rx="3" fill="${(r + c) % 3 ? '#dcc79c' : '#c9b184'}"/>`; g += `<path d="M${-w * 0.22} 0V${-h * 0.5}a${w * 0.22} ${w * 0.22} 0 0 1 ${w * 0.44} 0V0Z" fill="url(#canal)" stroke="#a88e66" stroke-width="6"/>`; G(S, x, y, g); }
function hillTown(S, x0, x1, y0, y1) { for (let row = 0; row < 7; row++) for (let x = x0 + (row % 2) * 20; x < x1; x += 34 + rnd() * 10) { const y = y0 + row * ((y1 - y0) / 7) + rnd() * 6, w = 24 + rnd() * 14, h = 20 + rnd() * 14, c = ['#f6e6d0', '#f2c8a8', '#f0d8a0', '#e8b8a8', '#fff2e0'][Math.floor(rnd() * 5)]; G(S, x, y, `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${c}"/><path d="M${-w / 2 - 2} ${-h}L0 ${-h - 9}L${w / 2 + 2} ${-h}Z" fill="${rnd() < 0.8 ? '#cf6a3e' : '#e8a050'}"/><rect x="-3" y="${-h + 6}" width="6" height="8" fill="#6a8aa8"/>`); } }

export function renderItalian(S, LB, chapter, progress) {
  seedRandom(66);
  const items = []; const add = (key, fn) => items.push({ key, fn });
  // sky, far mountains and hill town
  el('rect', { width: WW, height: 620, fill: 'url(#sky)' }, S);
  [[1500, 440, 900, 220, '#9fb4d0'], [1800, 420, 700, 280, '#8aa2c4'], [2150, 450, 600, 240, '#7a94b8']].forEach(([x, y, w, h, c]) => el('path', { d: `M${x - w / 2} ${y}L${x - w * 0.1} ${y - h}L${x + w * 0.2} ${y - h * 0.7}L${x + w / 2} ${y}Z`, fill: c }, S));
  [[300, 120, 1.2], [1000, 70, 1.4], [1700, 110, 1], [2200, 60, 1.1]].forEach(([x, y, k]) => G(S, x, y, `<g fill="#fff" opacity=".85"><ellipse rx="80" ry="22"/><ellipse cx="-44" cy="8" rx="50" ry="16"/><ellipse cx="50" cy="10" rx="56" ry="16"/></g>`, sc(k)));
  el('path', { d: 'M1500 520Q1700 400 1900 430T2400 380V560H1500Z', fill: '#a8c488' }, S);
  hillTown(S, 1700, 2400, 400, 540);
  // sea
  el('path', { d: 'M2180 470H2400V1250L2300 1230Q2200 1170 2190 1080Q2230 960 2200 850Q2170 700 2180 470Z', fill: 'url(#water)' }, S);
  for (let i = 0; i < 14; i++) { const x = 2210 + rnd() * 170, y = 520 + rnd() * 650; el('path', { d: `M${x} ${y}q8 -5 16 0t16 0`, fill: 'none', stroke: '#fff', 'stroke-width': 2.4, opacity: 0.5, 'stroke-linecap': 'round' }, S); }
  sailboat(S, 2290, 640, 1.4); sailboat(S, 2340, 820, 1.1); sailboat(S, 2260, 1000, 1.2);
  // ground terrace
  const gd = 'M0 520H1900Q2100 530 2170 700Q2190 850 2210 980Q2190 1100 2120 1180Q1900 1270 1500 1300L1400 1500H0Z';
  el('path', { d: gd, fill: '#e6d5b0' }, S); el('path', { d: gd, fill: 'url(#cob)', opacity: 0.55 }, S);
  // canal
  const cn = 'M540 990H860Q1000 1090 1180 1170Q1400 1290 1460 1500H540Z';
  el('path', { d: cn, fill: '#a88e66', transform: 'translate(0,-12)' }, S); el('path', { d: cn, fill: 'url(#canal)' }, S);
  for (let i = 0; i < 22; i++) { const x = 560 + rnd() * 800, y = 1040 + rnd() * 440; el('path', { d: `M${x} ${y}q8 -5 16 0t16 0`, fill: 'none', stroke: '#fff', 'stroke-width': 2.4, opacity: 0.5, 'stroke-linecap': 'round' }, S); }
  // road
  const spots = [[330, 650], [522, 585], [760, 625], [930, 760], [1170, 800], [1440, 800], [1700, 860], [1940, 810], [2010, 1040], [1700, 1235]];
  const route = [[90, 690], spots[0], [430, 600], spots[1], [640, 600], spots[2], [850, 690], spots[3], [1050, 800], spots[4], [1310, 790], spots[5], [1560, 830], spots[6], [1830, 850], spots[7], [2030, 890], [2050, 960], spots[8], [1960, 1140], [1850, 1215], spots[9], [1540, 1300]];
  const d = cr(route), rd = { d, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  el('path', { ...rd, stroke: '#3a2a1a', 'stroke-width': 150, opacity: 0.2, transform: 'translate(0,32)' }, S);
  el('path', { ...rd, stroke: '#7a6a52', 'stroke-width': 146, transform: 'translate(0,24)' }, S);
  el('path', { ...rd, stroke: '#a8987a', 'stroke-width': 142, transform: 'translate(0,10)' }, S);
  el('path', { ...rd, stroke: '#f4ead2', 'stroke-width': 132 }, S);
  el('path', { ...rd, stroke: '#cfc2a4', 'stroke-width': 112 }, S);
  el('path', { ...rd, stroke: '#e0d4b6', 'stroke-width': 104 }, S);
  const road = el('path', { ...rd, stroke: 'none' }, S); const total = road.getTotalLength();
  const done = (n) => (progress.stars[n] || 0) > 0, current = chapter.levels.find((l) => !done(l.n));
  const lvl = chapter.levels.map((l, i) => ({ n: l.n, name: l.name, sg: l.sign, a: 0, pos: spots[i], s: progress.stars[l.n] || 0, st: done(l.n) ? 'done' : (current && current.n === l.n ? 'now' : 'lock') }));
  const doneCount = lvl.filter((l) => l.st === 'done').length;
  if (doneCount) {
    let best = 0, bd = 1e9; const last = spots[doneCount - 1];
    for (let t = 0; t <= total; t += 4) { const q = road.getPointAtLength(t), dd = Math.hypot(q.x - last[0], q.y - last[1]); if (dd < bd) { bd = dd; best = t; } }
    el('path', { ...rd, stroke: '#ffd890', 'stroke-width': 24, 'stroke-dasharray': `${best} ${total}`, opacity: 0.9 }, S);
  }
  // sea edge balustrade
  add(900, () => balust(S, [[2050, 690], [2130, 780], [2160, 890], [2150, 1000], [2120, 1090], [2060, 1160]]));
  // buildings: left cluster, bell tower, trattoria
  add(560, () => { house(S, 120, 560, 250, 360, K.pink, 56, false); house(S, 360, 540, 220, 280, '#f0d08a', 50, false); house(S, 590, 560, 190, 220, '#e8c0a0', 44, true); });
  add(560, () => bellTower(S, 850, 570)); add(600, () => trattoria(S, 1520, 610));
  add(560, () => G(S, 80, 470, '', '')); // anchor
  add(520, () => { flowers(S, 70, 180, 190); flowers(S, 210, 290, 150); flowers(S, 110, 440, 140); flowers(S, 350, 110, 110); flowers(S, 30, 330, 110); flowers(S, 420, 250, 70); });
  [[1130, 520, 1], [1190, 500, 0.9], [1250, 515, 1.1], [270, 740, 0.7], [210, 780, 0.8]].forEach(([x, y, s]) => add(y, () => cypress(S, x, y, s)));
  // terrace tables in front of the trattoria
  [[1260, 700, true], [1420, 690, false], [1580, 700, true], [1740, 690, false], [1880, 700, true]].forEach(([x, y, u]) => add(y, () => tableSet(S, x, y, u, 0.9)));
  add(715, () => { for (let x = 1180; x < 1960; x += 70) planter(S, x, 744, 0.55); });
  [[1130, 700], [1990, 700], [350, 700], [1060, 960], [1580, 960], [1840, 990]].forEach(([x, y]) => add(y, () => lamp(S, x, y, 1)));
  // left foreground house with vine pergola
  add(1180, () => { G(S, 230, 1180, `${shd(330, 0.16)}<rect x="-250" y="-340" width="500" height="340" fill="#f0d49a"/><rect x="110" y="-340" width="140" height="340" fill="#000" opacity=".07"/><path d="M-300 -330L-210 -470H210L300 -330Z" fill="${K.terra}"/>${[1, 2, 3, 4].map((i) => `<path d="M${-300 + i * 14} ${-330 - i * 28}H${300 - i * 14}" stroke="${K.terraD}" stroke-width="3" opacity=".5"/>`).join('')}<path d="M-300 -328H300" stroke="${K.terraD}" stroke-width="9"/>${win(-120, -270, 34, 66)}${win(40, -270, 34, 66)}${win(-120, -150, 34, 66)}<path d="M40 0V-110a36 36 0 0 1 72 0V0Z" fill="#6a4a30"/>`); G(S, 60, 1070, `<g>${bougain(120, 24).replace(/#e0408f|#c8307f|#f070b0|#fbd0e4/g, '#4f9a48')}</g>${[[-60, 20], [-20, 50], [30, 30], [70, 60], [-90, 70], [10, 90]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="9" ry="12" fill="#6a3a8a"/><ellipse cx="${a - 3}" cy="${b - 4}" rx="3" ry="4" fill="#9a6ab8" opacity=".7"/>`).join('')}`); tableSet(S, 130, 1450, false, 1); });
  // canal furniture
  add(1010, () => viaduct(S, 660, 1010, 260, 150)); add(1130, () => bridge(S, 860, 1140, 600));
  add(1020, () => house(S, 1090, 1020, 210, 130, '#f0d49a', 40, false)); add(1300, () => rowboat(S, 800, 1390));
  add(1130, () => stall(S, 1330, 1140)); add(1170, () => barrel(S, 1220, 1165));
  [[880, 1100], [1010, 1080], [560, 1000], [1180, 1160], [740, 1240]].forEach(([x, y]) => add(y, () => flowers(S, x, y - 20, 50)));
  [[1100, 1220], [1600, 1090], [1250, 560], [1390, 590]].forEach(([x, y]) => add(y, () => planter(S, x, y, 0.8)));
  // cliffs and cypresses (bottom right)
  add(1500, () => { rock(S, 2150, 1500, 520, 300); rock(S, 1900, 1500, 420, 220, '#d0bc9c', '#b0a07c'); rock(S, 2330, 1420, 300, 340); rock(S, 1730, 1500, 340, 160); flowers(S, 2000, 1330, 70); flowers(S, 2200, 1290, 60); flowers(S, 1830, 1360, 50); });
  [[2250, 1160, 1.1], [2330, 1250, 0.9], [2120, 1210, 0.8]].forEach(([x, y, s]) => add(y, () => cypress(S, x, y, s)));
  [[1620, 1340], [1500, 1400]].forEach(([x, y]) => add(y, () => olive(S, x, y, 1.1)));
  items.sort((a, b) => a.key - b.key).forEach((i) => i.fn(S));
  el('rect', { width: WW, height: WH, fill: 'url(#vig)', 'pointer-events': 'none' }, S);
  lvl.forEach((l) => levelStop({ parent: S, labels: LB, l, chapter, skin: 'italian' }));
  const end = route[route.length - 1];
  return { nodes: lvl, board: { x: end[0], y: end[1], dir: 1 }, prev: { x: 90, y: 690, dir: -1 }, home: (lvl.find((l) => l.st === 'now') || lvl[lvl.length - 1]).pos };
}
