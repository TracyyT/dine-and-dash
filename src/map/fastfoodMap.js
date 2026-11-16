// Chapter 7 map: a retro SoCal drive-in strip, drawn as a flat side-view postcard (1950s diner props in a clean 2016 flat-vector style).
// Two stretches of road wind past neon burger shacks with giant rooftop signs; a sunset beach, pier and Hollywood hill sit behind them.
import { levelStop } from './stop.js';
import { el, rnd, seedRandom, WW, WH } from './iso.js';

export const FASTFOOD_DEFS = `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fb0e6"/><stop offset=".15" stop-color="#8fd0f0"/><stop offset=".26" stop-color="#ffd3e2"/><stop offset=".32" stop-color="#ffc4b0"/><stop offset="1" stop-color="#ffc4b0"/></linearGradient>
<linearGradient id="brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="#ffc83a"/><stop offset="1" stop-color="#b8801a"/></linearGradient>
<radialGradient id="sun" cx=".8" cy=".25" r=".6"><stop offset="0" stop-color="#fff4d0" stop-opacity=".55"/><stop offset="1" stop-color="#ffd8e8" stop-opacity="0"/></radialGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#ffe6a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffe6a8" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".8"><stop offset=".7" stop-color="#ff7aa8" stop-opacity="0"/><stop offset="1" stop-color="#ff7aa8" stop-opacity=".16"/></radialGradient>
<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fe8ea"/><stop offset=".55" stop-color="#4cc4e0"/><stop offset="1" stop-color="#2f9fd6"/></linearGradient>
<linearGradient id="cylShade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity=".14"/></linearGradient>
<pattern id="gh" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#fff6e8"/><rect width="13" height="13" fill="#c8322a" opacity=".8"/><rect x="13" y="13" width="13" height="13" fill="#c8322a" opacity=".8"/></pattern>
<pattern id="ffTile" width="80" height="80" patternUnits="userSpaceOnUse"><rect width="80" height="80" fill="#f6d9cc"/><rect width="40" height="40" fill="#f9e2d6"/><rect x="40" y="40" width="40" height="40" fill="#f9e2d6"/></pattern>
<filter id="neon" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="2.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>`;

const C = { teal: '#3cc8c0', mint: '#b4ecd2', pink: '#ff8fb1', hot: '#ff4f86', cream: '#fff3dc', red: '#e8473f', gold: '#ffc93c', navy: '#27305e', sand: '#f7dfb5', road: '#55557a', green: '#2fa37a', lime: '#7fd36b', bun: '#f4a64a', purple: '#7a4fc4', sky: '#8fd0f0' };
const G = (S, x, y, html, extra = '') => { const n = el('g', { transform: `translate(${x},${y}) ${extra}` }, S); n.innerHTML = html; return n; };
const shd = (rx, o = 0.16) => `<ellipse cy="3" rx="${rx}" ry="${rx * 0.14}" fill="#3b2a5a" opacity="${o}"/>`;

// ---------- flat props (all drawn with the origin at bottom-centre) ----------
function palm(S, x, y, s = 1, lean = 1) {
  const L = (a, len, c) => `<path d="M0 0Q${len * 0.5} ${-len * 0.45} ${len} ${len * 0.24}Q${len * 0.5} ${-len * 0.1} 0 0Z" fill="${c}" transform="rotate(${a})"/>`;
  let h = shd(36) + `<path d="M-6 0Q${9 * lean} -85 ${12 * lean} -172L${12 * lean + 8} -172Q${9 * lean + 10} -85 6 0Z" fill="#a8744c"/>`;
  for (let i = 1; i < 8; i++) { const yy = -i * 21, cx = lean * 12 * (i * 21 / 172) * 0.85; h += `<path d="M${cx - 6} ${yy}h12" stroke="#8a5a3a" stroke-width="3" stroke-linecap="round"/>`; }
  h += `<g transform="translate(${lean * 14} -172)">${[-168, -140, -112, -80, -48, -14, 18, 150].map((a, i) => L(a, 92 + (i % 3) * 10, i % 2 ? '#4cc79a' : C.green)).join('')}<circle cx="-5" cy="6" r="6" fill="#7a4a2a"/><circle cx="6" cy="8" r="6" fill="#8a5a3a"/></g>`;
  G(S, x, y, h, `scale(${s})`);
}
function bush(S, x, y, s = 1, c = C.hot) { G(S, x, y, `${shd(34)}<circle cx="-18" cy="-14" r="16" fill="#3fae7e"/><circle cx="14" cy="-16" r="18" fill="#2fa37a"/><circle cx="0" cy="-24" r="16" fill="#4cc79a"/>${[[-20, -18], [-4, -30], [10, -20], [20, -12], [-12, -8], [4, -12]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="4.4" fill="${c}"/>`).join('')}`, `scale(${s})`); }
function conv(S, x, y, c = C.pink, s = 1, flip = 1) {
  G(S, x, y, `${shd(70, 0.18)}<path d="M-64 -14Q-64 -30 -46 -31L-24 -31L-13 -48L8 -48L19 -31L48 -31Q66 -31 66 -17V-9H-64Z" fill="${c}"/><path d="M-12 -31L-6 -44H4L9 -31Z" fill="#bfeaf0"/><circle cx="-30" cy="-44" r="7.5" fill="#ffd9b0"/><path d="M-37 -46q8 -12 15 0z" fill="#7a4a30"/><rect x="-64" y="-21" width="130" height="3.4" fill="${C.cream}" opacity=".9"/><rect x="-66" y="-15" width="10" height="7" rx="3" fill="${C.cream}"/><rect x="58" y="-15" width="10" height="7" rx="3" fill="${C.cream}"/><circle cx="-38" cy="-8" r="12.5" fill="${C.navy}"/><circle cx="-38" cy="-8" r="5.6" fill="${C.cream}"/><circle cx="40" cy="-8" r="12.5" fill="${C.navy}"/><circle cx="40" cy="-8" r="5.6" fill="${C.cream}"/>`, `scale(${flip * s} ${s})`);
}
function carhop(S, x, y, s = 1, c = C.hot) {
  G(S, x, y, `${shd(22)}<circle cx="-7" cy="-3" r="4" fill="${C.navy}"/><circle cx="8" cy="-3" r="4" fill="${C.navy}"/><rect x="-9" y="-26" width="5" height="20" fill="#ffd9b0"/><rect x="4" y="-26" width="5" height="20" fill="#ffd9b0"/><path d="M-13 -58L13 -58L18 -26H-18Z" fill="${c}"/><path d="M-9 -58h18l-2 18h-14Z" fill="${C.cream}"/><circle cy="-68" r="10" fill="#ffd9b0"/><path d="M-10 -70q10 -14 20 0q-10 -4 -20 0Z" fill="#6a3a22"/><circle cx="-12" cy="-64" r="4.4" fill="#6a3a22"/><rect x="12" y="-52" width="34" height="4" rx="2" fill="${C.navy}"/><path d="M20 -53a8 6 0 0 1 16 0z" fill="${C.bun}"/><rect x="20" y="-55" width="16" height="2.4" fill="${C.lime}"/>`, `scale(${s})`);
}
function tableUmb(S, x, y, c = C.red, s = 1) {
  G(S, x, y, `${shd(40)}<rect x="-2" y="-82" width="4" height="82" fill="#ddd2c4"/><path d="M-46 -78Q0 -126 46 -78Z" fill="${c}"/><path d="M-46 -78q7.7 7 15.3 0t15.3 0t15.3 0t15.3 0t15.3 0t15.3 0Z" fill="${c}"/><path d="M-16 -80Q-8 -110 0 -118Q8 -110 16 -80Z" fill="${C.cream}" opacity=".55"/><ellipse cy="-30" rx="30" ry="8" fill="${C.cream}"/><circle cx="-34" cy="-12" r="8" fill="${C.teal}"/><circle cx="34" cy="-12" r="8" fill="${C.teal}"/>`, `scale(${s})`);
}
function lamp(S, x, y, s = 1) { G(S, x, y, `${shd(14)}<circle cy="-92" r="26" fill="url(#glow)"/><rect x="-3" y="-90" width="6" height="90" fill="${C.navy}"/><circle cy="-94" r="9" fill="${C.cream}"/><path d="M-9 -102h18l-9 -8Z" fill="${C.navy}"/>`, `scale(${s})`); }
function gull(S, x, y, s = 1) { G(S, x, y, `<path d="M-16 0Q-8 -10 0 0Q8 -10 16 0" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>`, `scale(${s})`); }
function sailboat(S, x, y, s = 1, c = '#fff') { G(S, x, y, `<path d="M-30 0H30L20 12H-20Z" fill="${C.red}"/><path d="M0 -4V-68L26 -8Z" fill="${c}"/><path d="M-4 -4V-52L-24 -8Z" fill="${C.cream}" opacity=".85"/>`, `scale(${s})`); }
function umbrellaB(S, x, y, c = C.red, s = 1) { G(S, x, y, `${shd(40)}<rect x="-2" y="-90" width="4" height="90" fill="#ddd2c4" transform="rotate(8)"/><path d="M-44 -76Q-4 -118 40 -76Z" fill="${c}" transform="rotate(8 0 -76)"/><path d="M-14 -80Q-6 -108 4 -112Q10 -104 14 -80Z" fill="${C.cream}" opacity=".6" transform="rotate(8 0 -76)"/><ellipse cx="34" cy="-2" rx="30" ry="6" fill="${C.gold}"/>`, `scale(${s})`); }
function surfRack(S, x, y, s = 1) { G(S, x, y, `${shd(40)}${[[-26, C.pink], [0, C.gold], [26, C.teal]].map(([a, c], i) => `<ellipse cx="${a}" cy="-48" rx="13" ry="50" fill="${c}" transform="rotate(${(i - 1) * 7} ${a} 0)"/><path d="M${a} -96V-2" stroke="${C.cream}" stroke-width="3" transform="rotate(${(i - 1) * 7} ${a} 0)"/>`).join('')}`, `scale(${s})`); }
function lifeguard(S, x, y, s = 1) { G(S, x, y, `${shd(40)}<path d="M-26 0L-20 -52M26 0L20 -52" stroke="#c49060" stroke-width="5"/><rect x="-32" y="-60" width="64" height="9" fill="#c49060"/><rect x="-24" y="-104" width="48" height="44" rx="3" fill="${C.cream}"/><rect x="-24" y="-104" width="48" height="12" fill="${C.red}"/><rect x="-15" y="-84" width="30" height="14" fill="#bfeaf0"/><path d="M-32 -106H32L20 -122H-20Z" fill="${C.red}"/><path d="M0 -122V-146L20 -139L0 -133" fill="${C.gold}"/>`, `scale(${s})`); }
function pierAndWheel(S) {
  let h = '';
  for (let x = 40; x < 640; x += 70) h += `<rect x="${x}" y="14" width="14" height="46" fill="#a8744c"/>`;
  h += `<rect y="0" width="660" height="16" fill="#d9a066"/><rect y="12" width="660" height="6" fill="#b8804a"/>`;
  h += `<g transform="translate(250,-120)"><circle r="118" fill="none" stroke="${C.cream}" stroke-width="7"/><circle r="84" fill="none" stroke="${C.pink}" stroke-width="4" opacity=".8"/>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M0 0L${Math.cos(i * Math.PI / 6) * 118} ${Math.sin(i * Math.PI / 6) * 118}M0 0L${-Math.cos(i * Math.PI / 6) * 118} ${-Math.sin(i * Math.PI / 6) * 118}" stroke="${C.cream}" stroke-width="4"/>`).join('')}${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<rect x="${Math.cos(a) * 118 - 9}" y="${Math.sin(a) * 118}" width="18" height="16" rx="4" fill="${[C.hot, C.gold, C.teal][i % 3]}"/>`; }).join('')}<circle r="12" fill="${C.gold}"/></g><path d="M250 -120L200 0M250 -120L300 0" stroke="${C.cream}" stroke-width="7" stroke-linecap="round"/>`;
  h += `<g transform="translate(470,-4)"><rect x="-44" y="-56" width="88" height="56" fill="${C.cream}"/><path d="M-52 -56h104l-10 -22h-84Z" fill="${C.red}"/><rect x="-30" y="-42" width="60" height="26" fill="#bfeaf0"/></g>`;
  G(S, 1740, 612, h);
}

// ---------- the rooftop signs ----------
const PROP = {
  burger: () => `<g transform="translate(0,-36)"><path d="M-46 0A46 40 0 0 1 46 0Z" fill="${C.bun}"/>${[[-22, -18], [-6, -27], [12, -21], [27, -9], [-31, -6]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="4.4" ry="2.4" fill="${C.cream}" transform="rotate(-20 ${a} ${b})"/>`).join('')}<path d="M-48 2q8 8 16 0t16 0t16 0t16 0t16 0t16 0v6h-96Z" fill="${C.lime}"/><rect x="-46" y="8" width="92" height="12" rx="6" fill="#7a4a30"/><rect x="-44" y="18" width="88" height="6" fill="${C.gold}"/><path d="M-44 24h88v4a10 10 0 0 1-10 10h-68a10 10 0 0 1-10-10Z" fill="${C.bun}"/></g>`,
  fries: () => `${Array.from({ length: 9 }, (_, i) => { const a = i - 4; return `<rect x="${a * 8 - 3.5}" y="${-84 + Math.abs(a) * 3 + (i % 3) * 5}" width="7" height="${58 - Math.abs(a) * 3}" rx="2" fill="${C.gold}" transform="rotate(${a * 4} ${a * 8} -30)"/>`; }).join('')}<path d="M-32 -38L32 -38L25 0H-25Z" fill="${C.red}"/><path d="M-28 -26H28L26 -14H-26Z" fill="${C.cream}"/>`,
  shake: () => `<path d="M-26 -58L26 -58L19 0H-19Z" fill="${C.cream}"/><path d="M-24 -44H24L22 -34H-22Z" fill="${C.pink}"/><path d="M-21 -24H21L19 -14H-19Z" fill="${C.pink}"/><ellipse cy="-62" rx="30" ry="11" fill="#fff"/><ellipse cy="-74" rx="21" ry="9" fill="#fff"/><ellipse cy="-84" rx="12" ry="7" fill="#fff"/><circle cx="2" cy="-93" r="6" fill="${C.red}"/><path d="M16 -70L36 -112" stroke="${C.teal}" stroke-width="5" stroke-linecap="round"/>`,
  hotdog: () => `<g transform="translate(0,-8) rotate(-6)"><ellipse cy="-6" rx="58" ry="17" fill="${C.bun}"/><rect x="-62" y="-22" width="124" height="16" rx="8" fill="#d44a32"/><path d="M-50 -22q8 -8 16 0t16 0t16 0t16 0t16 0t16 0" stroke="${C.gold}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-58 -8q58 22 116 0v8q-58 22 -116 0Z" fill="#e8923a"/></g>`,
  wheel: () => `<g transform="translate(0,-46)"><circle r="40" fill="none" stroke="${C.gold}" stroke-width="7"/><circle r="9" fill="${C.gold}"/>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M0 0L${Math.cos(a) * 52} ${Math.sin(a) * 52}" stroke="${C.gold}" stroke-width="5" stroke-linecap="round"/><circle cx="${Math.cos(a) * 52}" cy="${Math.sin(a) * 52}" r="5" fill="${C.gold}"/>`; }).join('')}</g>`,
  surf: () => `${[[-26, C.pink], [0, C.gold], [26, C.teal]].map(([a, c], i) => `<ellipse cx="${a}" cy="-46" rx="13" ry="48" fill="${c}" transform="rotate(${(i - 1) * 8} ${a} 0)"/><path d="M${a} -92V-2" stroke="${C.cream}" stroke-width="3" transform="rotate(${(i - 1) * 8} ${a} 0)"/>`).join('')}`,
  bunting: () => `<path d="M-90 -6Q0 -64 90 -6" fill="none" stroke="${C.navy}" stroke-width="2.6"/>${Array.from({ length: 9 }, (_, i) => { const t = (i + 0.5) / 9, x = -90 + 180 * t, y = -6 - 4 * 58 * t * (1 - t) * 0.86 * 1.1; return `<path d="M${x - 9} ${y}L${x + 9} ${y}L${x} ${y + 20}Z" fill="${[C.hot, C.gold, C.teal, C.lime][i % 4]}"/>`; }).join('')}`,
  motel: () => `<rect x="-4" y="-96" width="8" height="96" fill="${C.navy}"/><g transform="translate(0,-122)"><path d="M-62 -26H34L66 0L34 26H-62Z" fill="${C.navy}"/><path d="M-56 -20H31L57 0L31 20H-56Z" fill="none" stroke="${C.hot}" stroke-width="2.6" filter="url(#neon)"/><text x="-8" y="6" text-anchor="middle" font-family="Josefin Sans,Arial Black,sans-serif" font-weight="900" font-size="15" fill="#fff" stroke="${C.hot}" stroke-width=".6" filter="url(#neon)">VACANCY</text></g>`,
  bubbles: () => `${[[-34, -16, 16], [-8, -34, 22], [22, -18, 17], [40, -48, 12], [-30, -58, 11], [10, -70, 14], [-6, -92, 9]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="#e8fbff" fill-opacity=".85" stroke="#7fd6f0" stroke-width="3"/><circle cx="${a - r * 0.35}" cy="${b - r * 0.35}" r="${r * 0.22}" fill="#fff"/>`).join('')}`,
  star: () => `<g transform="translate(0,-62)"><path d="${Array.from({ length: 24 }, (_, i) => { const a = i * Math.PI / 12 - Math.PI / 2, r = i % 2 ? 40 : 62; return `${i ? 'L' : 'M'}${Math.cos(a) * r} ${Math.sin(a) * r}`; }).join('')}Z" fill="${C.gold}"/><circle r="34" fill="${C.red}"/><path d="${Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5 - Math.PI / 2, r = i % 2 ? 9 : 22; return `${i ? 'L' : 'M'}${Math.cos(a) * r} ${Math.sin(a) * r}`; }).join('')}Z" fill="${C.cream}"/></g>`,
};

function neon(S, x, y, txt, col, w) {
  G(S, x, y, `<rect x="${-w / 2}" y="-18" width="${w}" height="36" rx="13" fill="${C.navy}"/><rect x="${-w / 2 + 4}" y="-14" width="${w - 8}" height="28" rx="10" fill="none" stroke="${col}" stroke-width="2.4" filter="url(#neon)"/><text y="8" text-anchor="middle" font-family="Pacifico,Josefin Sans,cursive" font-size="22" fill="#fff" stroke="${col}" stroke-width=".7" filter="url(#neon)">${txt}</text>`);
}

// a flat drive-in: checkered band, scalloped awning, big window, door, roof style, giant prop on top
function joint(S, b) {
  const { x, base, w, h } = b, sw = (w + 20) / 8, a0 = -h + 26;
  let s = `<path d="M0 0H${w}L${w + h * 0.5} 22H${h * 0.5}Z" fill="#3b2a5a" opacity=".13"/><rect y="${-h}" width="${w}" height="${h}" fill="${b.wall}"/><rect y="-9" width="${w}" height="9" fill="${b.trim}"/>`;
  for (let i = 0; i < Math.ceil(w / 13); i++) for (let r = 0; r < 2; r++) if ((i + r) % 2) s += `<rect x="${i * 13}" y="${-h + r * 13}" width="${Math.min(13, w - i * 13)}" height="13" fill="${b.trim}"/>`;
  s += `<rect x="${w * 0.1}" y="${a0 + 44}" width="${w * 0.5}" height="${h - 26 - 44 - 14}" rx="4" fill="#bfeaf0"/><rect x="${w * 0.1}" y="${-34}" width="${w * 0.5}" height="14" fill="#ffe3a8"/><path d="M${w * 0.1 + 8} ${a0 + 44}l26 0l-34 ${h - 26 - 44 - 14}h-18Z" fill="#fff" opacity=".35"/><rect x="${w * 0.7}" y="${-72}" width="${w * 0.17}" height="72" rx="3" fill="${C.navy}"/><rect x="${w * 0.7 + 4}" y="${-66}" width="${w * 0.17 - 8}" height="26" fill="#bfeaf0"/><circle cx="${w * 0.7 + w * 0.17 - 8}" cy="-34" r="2.6" fill="${C.gold}"/>`;
  for (let i = 0; i < 8; i++) { const c = i % 2 ? C.cream : b.awn; s += `<rect x="${-10 + i * sw}" y="${a0}" width="${sw + 0.6}" height="34" fill="${c}"/><path d="M${-10 + i * sw} ${a0 + 34}a${sw / 2} ${sw / 2} 0 0 0 ${sw} 0Z" fill="${c}"/>`; }
  let ry = -h - 12;
  if (b.roof === 'flat') s += `<rect x="-8" y="${-h - 12}" width="${w + 16}" height="13" rx="3" fill="${b.trim}"/><rect x="-8" y="${-h - 4}" width="${w + 16}" height="4" fill="${C.cream}" opacity=".55"/>`;
  if (b.roof === 'googie') { s += `<path d="M-16 ${-h + 2}L${w + 16} ${-h - 30}V${-h - 14}L-16 ${-h + 18}Z" fill="${b.trim}"/><path d="M-16 ${-h + 2}L${w + 16} ${-h - 30}" stroke="${C.cream}" stroke-width="3"/>`; ry = -h - 20; }
  if (b.roof === 'aframe') { s += `<path d="M-12 ${-h + 2}L${w / 2} ${-h - 56}L${w + 12} ${-h + 2}Z" fill="${b.trim}"/><path d="M${w * 0.2} ${-h - 4}L${w / 2} ${-h - 40}L${w * 0.8} ${-h - 4}" fill="none" stroke="${C.cream}" stroke-width="3" opacity=".7"/>`; ry = -h - 46; }
  const n = G(S, x, base, s);
  const px = b.px != null ? b.px : w / 2;
  el('g', { transform: `translate(${px},${ry + 6}) scale(${b.ps || 1})` }, n).innerHTML = PROP[b.prop]();
  neon(n, w / 2, a0 + 17, b.name, b.neon, Math.max(96, Math.min(w - 20, b.name.length * 15 + 36)));
  bush(n, -14, 0, 0.7, b.neon); bush(n, w + 14, 0, 0.7, C.gold);
}

function cart(S, x, y, b) {
  const w = Math.max(70, b.name.length * 8 + 26);
  G(S, x, y, `${shd(64)}<circle cx="-36" cy="-9" r="10" fill="${C.navy}"/><circle cx="36" cy="-9" r="10" fill="${C.navy}"/><rect x="-52" y="-50" width="104" height="38" rx="7" fill="${b.wall}"/><rect x="-52" y="-50" width="104" height="11" rx="5" fill="${b.trim}"/><rect x="-42" y="-36" width="62" height="16" fill="#bfeaf0"/><rect x="26" y="-36" width="18" height="24" rx="3" fill="${C.navy}"/><rect x="-2" y="-92" width="4" height="44" fill="#ddd2c4"/><path d="M-66 -78Q0 -124 66 -78Z" fill="${b.awn}"/>${[-44, -22, 0, 22, 44].map((a, i) => `<path d="M${a - 11} -78a11 11 0 0 0 22 0Z" fill="${i % 2 ? C.cream : b.awn}"/>`).join('')}<g transform="translate(0,-104) scale(.38)">${PROP[b.prop]()}</g><rect x="${-w / 2}" y="-148" width="${w}" height="24" rx="9" fill="${C.navy}"/><text y="-131" text-anchor="middle" font-family="Pacifico,Josefin Sans,cursive" font-size="15" fill="#fff" stroke="${b.neon}" stroke-width=".6" filter="url(#neon)">${b.name}</text>`, 'scale(.75)');
}

const BUILD = [
  { sg: 'STAND', w: 210, h: 120, wall: '#ffe3b8', trim: C.teal, awn: C.teal, roof: 'aframe', prop: 'surf', neon: C.teal },
  { sg: 'BURGER', w: 250, h: 150, wall: C.cream, trim: C.red, awn: C.red, roof: 'flat', prop: 'burger', neon: C.hot },
  { sg: 'FRIES', w: 230, h: 140, wall: '#fff0c0', trim: C.gold, awn: C.red, roof: 'flat', prop: 'fries', neon: C.gold },
  { sg: 'SHAKE', w: 240, h: 150, wall: '#ffd6e4', trim: C.hot, awn: C.hot, roof: 'googie', prop: 'shake', neon: C.teal },
  { sg: 'PIER', w: 250, h: 150, wall: '#cfeef2', trim: C.teal, awn: C.navy, roof: 'aframe', prop: 'wheel', neon: C.gold },
  { sg: 'RUSH', w: 250, h: 140, wall: '#ffe0a8', trim: '#ff8a3c', awn: '#ff8a3c', roof: 'flat', prop: 'hotdog', neon: C.hot },
  { sg: 'TRUCK', w: 250, h: 130, wall: '#d9f3e6', trim: C.green, awn: C.green, roof: 'googie', prop: 'bunting', neon: C.lime },
  { sg: 'STRIP', w: 290, h: 150, wall: '#ffd2c4', trim: C.purple, awn: C.purple, roof: 'flat', prop: 'motel', neon: C.hot, px: 40 },
  { sg: 'CLEAN', w: 250, h: 140, wall: '#e0f6ff', trim: '#3cc8e0', awn: C.teal, roof: 'flat', prop: 'bubbles', neon: C.teal },
  { sg: 'SLAM', w: 300, h: 170, wall: C.cream, trim: C.red, awn: C.red, roof: 'googie', prop: 'star', neon: C.gold },
];

export function renderFastfood(S, LB, chapter, progress) {
  seedRandom(77);
  const items = []; const add = (key, fn) => items.push({ key, fn });
  const HZ = 480;

  // ---- sky: retro striped sun, clouds, Hollywood hill, far skyline ----
  el('rect', { width: WW, height: WH, fill: C.sand }, S);
  el('rect', { width: WW, height: 760, fill: 'url(#sun)' }, S);
  el('circle', { cx: 1740, cy: 420, r: 135, fill: '#ffd45a' }, S);
  [[444, 4], [458, 6], [472, 9]].forEach(([y, hh]) => el('rect', { x: 1600, y, width: 280, height: hh, fill: '#ffcdc8' }, S));
  for (let i = 0; i < 8; i++) { const cx = 100 + i * 300 + rnd() * 100, cy = 60 + rnd() * 160; el('rect', { x: cx, y: cy, width: 150 + rnd() * 90, height: 26, rx: 13, fill: '#fff', opacity: 0.9 }, S); el('rect', { x: cx + 30, y: cy - 16, width: 80, height: 26, rx: 13, fill: '#fff', opacity: 0.9 }, S); }
  el('path', { d: `M0 ${HZ}V430Q300 420 520 330L760 205Q840 185 920 270Q1100 400 1300 ${HZ}Z`, fill: '#c9a8dc' }, S);
  el('path', { d: `M880 ${HZ}Q1100 360 1330 400Q1500 430 1600 ${HZ}Z`, fill: '#b896d0' }, S);
  [...'HOLLYWOOD'].forEach((c, i) => { const t = el('text', { x: 760 + (i - 4) * 38, y: 372 - Math.sin(i / 8 * Math.PI) * 10, 'text-anchor': 'middle', 'font-family': 'Josefin Sans,Arial Black,sans-serif', 'font-weight': 900, 'font-size': 40, fill: '#fff' }, S); t.textContent = c; });
  for (let x = 20; x < 700; x += 20 + rnd() * 22) { const hh = 10 + rnd() * 34; el('rect', { x, y: HZ - hh, width: 14 + rnd() * 12, height: hh, fill: '#a98ac4', opacity: 0.9 }, S); }

  // ---- ocean, pier + ferris wheel, sailboats ----
  el('rect', { y: HZ, width: WW, height: 190, fill: 'url(#water)' }, S);
  [[1740, 500, 220], [1740, 516, 150], [1740, 534, 90]].forEach(([cx, y, rx]) => el('ellipse', { cx, cy: y, rx, ry: 3.4, fill: '#ffe9a0', opacity: 0.55 }, S));
  for (let i = 0; i < 40; i++) { const x = rnd() * WW, y = HZ + 14 + rnd() * 150; el('path', { d: `M${x} ${y}q8 -5 16 0t16 0`, fill: 'none', stroke: '#fff', 'stroke-width': 2.4, opacity: 0.5, 'stroke-linecap': 'round' }, S); }
  sailboat(S, 470, 566, 1.1); sailboat(S, 1180, 540, 0.8, '#ffe8b0'); sailboat(S, 1480, 590, 1); sailboat(S, 880, 600, 0.7);
  pierAndWheel(S);
  gull(S, 420, 250, 1); gull(S, 520, 210, 0.8); gull(S, 1260, 280, 1.1); gull(S, 1360, 240, 0.8);

  // ---- ground: warm sand strip, then pastel tiled promenade ----
  el('path', { d: `M0 640Q300 626 600 640T1200 636T1800 642T2400 634V${WH}H0Z`, fill: C.sand }, S);
  el('path', { d: `M0 730Q300 718 600 730T1200 726T1800 732T2400 724V${WH}H0Z`, fill: 'url(#ffTile)' }, S);
  el('path', { d: `M0 730Q300 718 600 730T1200 726T1800 732T2400 724`, fill: 'none', stroke: '#fff3dc', 'stroke-width': 10 }, S);

  // ---- the road: a big letter Z (top bar to the right, long diagonal back down-left, bottom bar to the right) ----
  const D = 'M120 790C250 760 420 830 600 790S1000 760 1300 790C1560 790 1640 830 1600 890C1560 960 1380 975 1250 1015S1080 1085 940 1085C820 1085 820 1215 940 1215S1150 1260 1300 1215S1700 1180 2000 1215S2250 1240 2330 1215';
  const rd = { d: D, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  el('path', { ...rd, stroke: '#3b2a5a', 'stroke-width': 146, opacity: 0.14, transform: 'translate(0,10)' }, S);
  el('path', { ...rd, stroke: C.cream, 'stroke-width': 144 }, S);
  el('path', { ...rd, stroke: '#44456a', 'stroke-width': 126 }, S);
  const road = el('path', { ...rd, stroke: C.road, 'stroke-width': 116 }, S);
  el('path', { ...rd, stroke: C.gold, 'stroke-width': 5, 'stroke-dasharray': '30 24' }, S);
  const pathLen = road.getTotalLength();
  const smp = []; for (let i = 0; i <= 1100; i++) { const p = road.getPointAtLength(pathLen * i / 1100); smp.push([p.x, p.y, pathLen * i / 1100]); }
  const done = (n) => (progress.stars[n] || 0) > 0;
  const current = chapter.levels.find((l) => !done(l.n));
  const N = chapter.levels.length;
  const lvl = chapter.levels.map((l, i) => { const k = Math.round((0.05 + 0.9 * i / (N - 1)) * (smp.length - 1)), p = smp[k]; return { n: l.n, name: l.name, sg: l.sign, a: p[2], pos: [p[0], p[1]], s: progress.stars[l.n] || 0, st: done(l.n) ? 'done' : (current && current.n === l.n ? 'now' : 'lock') }; });
  const doneLen = lvl.filter((l) => l.st === 'done').reduce((m, l) => Math.max(m, l.a + 50), 0);
  el('path', { ...rd, stroke: '#ffd84a', 'stroke-width': 14, opacity: 0.85, 'stroke-dasharray': `${doneLen} ${pathLen}` }, S);
  const clear = (x, y, h, r = 95) => { for (let k = 0; k <= h; k += 40) if (smp.some((p) => Math.hypot(p[0] - x, p[1] - (y - k)) < r)) return false; return true; };

  // ---- the drive-ins: the top row faces the beach from the north of the road, the bottom row sits south of its road ----
  const carts = [];
  lvl.forEach((l, i) => {
    const bd0 = BUILD[i], y = l.pos[1], mode = y < 860 ? 'top' : y > 1170 ? 'bot' : 'mid', name = chapter.levels[i].sign || bd0.sg;
    if (mode === 'mid') {
      const bd = (px, py, bx0, by0, bx1, by1) => Math.hypot(Math.max(bx0 - px, 0, px - bx1), Math.max(by0 - py, 0, py - by1));
      let cx = l.pos[0], base = y + 150, best = 1e9;
      for (let dx = -360; dx <= 360; dx += 30) for (let by = y - 330; by <= y + 330; by += 22) {
        const x0 = dx + l.pos[0], box = [x0 - 62, by - 118, x0 + 62, by + 8], d = Math.hypot(dx, by - y);
        if (box[1] < 858 || by > 1330 || box[0] < 60 || box[2] > 2330 || d >= best) continue;
        if (smp.some((p) => bd(p[0], p[1], ...box) < 66)) continue;
        if (!(box[2] < l.pos[0] - 85 || box[0] > l.pos[0] + 85 || box[3] < y - 70 || box[1] > y + 92)) continue;
        if (carts.some((c) => Math.abs(c[0] - x0) < 150 && Math.abs(c[1] - by) < 130)) continue;
        best = d; cx = x0; base = by;
      }
      carts.push([cx, base]);
      add(base, (g) => cart(g, cx, base, { ...bd0, name }));
      return;
    }
    const top = mode === 'top', bd = { ...bd0, w: Math.round(bd0.w * (top ? 0.86 : 0.8)) };
    const b = { ...bd, name, x: l.pos[0] - bd.w / 2 + (top ? 14 : 0), base: top ? l.pos[1] - 98 : 1478, h: top ? bd.h : Math.round(bd.h * 0.68), ps: top ? 1 : (i === 9 ? 0.4 : 0.55), px: bd.px };
    add(b.base, (g) => joint(g, b));
    add(b.base + 1, (g) => lamp(g, l.pos[0] + bd.w / 2 + 34, b.base + 2, 0.9));
  });
  // palms, bougainvillea and beach scenes in the gaps along the top row
  add(742, () => lifeguard(S, 1850, 742, 1)); add(744, () => umbrellaB(S, 1960, 752, C.red, 1)); add(745, () => umbrellaB(S, 2090, 756, C.teal, 0.95)); add(746, () => surfRack(S, 2200, 770, 0.9)); add(740, () => palm(S, 1700, 745, 1.05, -1)); add(740, () => palm(S, 2040, 745, 1.1, 1)); add(741, () => palm(S, 2320, 748, 1, -1)); add(746, () => umbrellaB(S, 2300, 790, C.gold, 0.9)); add(747, () => bush(S, 1760, 790, 1, C.hot)); add(740, () => palm(S, 1640, 745, 1, -1));
  // and along the bottom row
  add(1492, () => palm(S, 2290, 1496, 1, -1)); add(1493, () => bush(S, 560, 1494, 0.9, C.hot));
  // the drive-in lot (bottom-left) with parking stalls and cars
  let lot = ''; for (let x = 70; x <= 700; x += 110) lot += `<path d="M${x} 1352L${x + 16} 1440" stroke="${C.cream}" stroke-width="5" stroke-linecap="round" opacity=".9"/>`;
  G(S, 0, 0, `<rect x="40" y="1340" width="720" height="110" rx="10" fill="${C.road}" opacity=".9"/>${lot}`);
  [[110, C.pink, 1], [250, C.teal, -1], [400, C.gold, 1], [560, C.mint, -1]].forEach(([x, c, f]) => add(1440, () => conv(S, x, 1436, c, 0.75, f)));
  add(1452, () => lamp(S, 780, 1452, 1));
  // the open ground between the bars: carhops, convertibles, umbrella tables, palms and flowers placed wherever the road leaves room
  const kinds = ['conv', 'table', 'palm', 'hop', 'bush', 'table', 'conv', 'palm']; let kk = 0, placed = [];
  for (let y = 940; y <= 1330; y += 58) for (let x = 100; x <= 2320; x += 110) {
    const px = x + (rnd() - 0.5) * 70, py = y + (rnd() - 0.5) * 30, k = kinds[kk++ % kinds.length], tall = k === 'palm' ? 230 : 80;
    if ((px < 300 && py > 880 && py < 1120) || px < 80 || px > 2320 || py < 940 || py > 1330) continue;
    if (!clear(px, py, tall, k === 'conv' ? 105 : 82) || placed.some(([a, b]) => Math.hypot(a - px, (b - py) * 1.5) < 135)) continue;
    placed.push([px, py]); const c = [C.pink, C.teal, C.gold, C.hot, C.mint][kk % 5];
    add(py, () => (k === 'conv' ? conv(S, px, py, c, 0.9, kk % 2 ? 1 : -1) : k === 'table' ? tableUmb(S, px, py, [C.red, C.teal][kk % 2], 0.9) : k === 'palm' ? palm(S, px, py, 0.85, kk % 2 ? 1 : -1) : k === 'hop' ? carhop(S, px, py, 1, c) : bush(S, px, py, 1, c)));
  }

  // levels and start flag
  lvl.forEach((l) => add(l.pos[1] + 1, (g) => levelStop({ parent: g, labels: LB, l, chapter, skin: 'fastfood', x: l.pos[0], y: l.pos[1] })));

  items.sort((a, b) => a.key - b.key).forEach((i) => i.fn(S));
  const end = smp[smp.length - 1];
  return { nodes: lvl, board: { x: end[0], y: end[1], dir: 1 }, prev: { x: 60, y: 1010, dir: -1 }, home: (lvl.find((l) => l.st === 'now') || lvl[lvl.length - 1]).pos };
}
