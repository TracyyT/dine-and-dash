// Chapter 6 map: a sunny Tuscan village. A trattoria with a striped awning and vines, the sea and a Colosseum in the distance, vineyard hills with cypress trees,
// a stone fountain with flowers, a grape pergola, a Vespa, and a cream stone path of round stepping stones.
import { levelStop } from './stop.js';
import { el, rnd, seedRandom, WW, WH } from './iso.js';

export const ITALIAN_DEFS = `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f94dd"/><stop offset=".12" stop-color="#8cc4f0"/><stop offset=".22" stop-color="#d6eaf6"/><stop offset=".23" stop-color="#8aa850"/><stop offset=".4" stop-color="#7a9a48"/><stop offset="1" stop-color="#6a8a3a"/></linearGradient>
<radialGradient id="sun" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#fff0b0" stop-opacity=".35"/><stop offset="1" stop-color="#fff0b0" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".66" stop-color="#3a1c0c" stop-opacity="0"/><stop offset="1" stop-color="#3a1c0c" stop-opacity=".3"/></radialGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe6a0" stop-opacity=".6"/><stop offset="1" stop-color="#ffe6a0" stop-opacity="0"/></radialGradient>
<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7acbe8"/><stop offset="1" stop-color="#2f86b8"/></linearGradient>
<pattern id="gh" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#fff6e6"/><rect width="13" height="26" fill="#d8402f" opacity=".75"/><rect width="26" height="13" fill="#d8402f" opacity=".75"/></pattern>
</defs>`;

const OL = '#3a1c0c', TERRA = '#d8683a', TERRA_D = '#a8482a', CREAM = '#f2d49a', RED = '#d8402f', GREEN = '#3f7a4a', WOOD = '#8a5a2a';
const G = (S, x, y, html, extra = '') => { const n = el('g', { transform: `translate(${x},${y}) ${extra}` }, S); n.innerHTML = html; return n; };

function cypress(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="4" rx="22" ry="5" fill="#000" opacity=".2"/><path d="M0 -190Q26 -120 22 -30Q20 0 0 0T-22 -30Q-26 -120 0 -190Z" fill="#2f6a34" stroke="#1c4a22" stroke-width="3"/><path d="M0 -170Q10 -110 8 -20M-10 -120Q-12 -60 -8 -10" stroke="#4a8a4a" stroke-width="3" fill="none" opacity=".7"/>`, `scale(${s})`);
}
function olive(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="6" rx="54" ry="9" fill="#000" opacity=".2"/><path d="M-8 0Q-14 -40 -24 -70M8 0Q12 -36 26 -66M0 0Q-2 -50 0 -76" stroke="#7a5a3a" stroke-width="9" fill="none" stroke-linecap="round"/>${[[-40, -90, 34], [0, -112, 40], [42, -88, 34], [-10, -82, 30], [22, -76, 26]].map(([a, b, r], i) => `<ellipse cx="${a}" cy="${b}" rx="${r * 1.2}" ry="${r}" fill="${['#8aa86a', '#9ab87a', '#7a9a5a'][i % 3]}" stroke="#4a6a3a" stroke-width="2.4"/>`).join('')}`, `scale(${s})`);
}
function lemon(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="8" rx="40" ry="8" fill="#000" opacity=".22"/><path d="M0 0V-46" stroke="#6a4420" stroke-width="7" stroke-linecap="round"/>${[[0, -86, 36], [-30, -62, 26], [30, -62, 26], [0, -58, 24]].map(([a, b, r], i) => `<circle cx="${a}" cy="${b}" r="${r}" fill="${['#4f9a44', '#5aaa4a', '#3f8a3a', '#4f9a44'][i]}" stroke="#1f5a22" stroke-width="2.6"/>`).join('')}${[[-14, -96], [12, -78], [-24, -62], [26, -58], [2, -64], [14, -104]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="7" ry="5" fill="#ffe14a" stroke="#a8861a" stroke-width="2" transform="rotate(-20 ${a} ${b})"/>`).join('')}<path d="M-30 -10h60l-8 40h-44z" fill="${TERRA}" stroke="${OL}" stroke-width="3.2"/><rect x="-34" y="-16" width="68" height="12" rx="3" fill="#e07a46" stroke="${OL}" stroke-width="3"/>`, `scale(${s})`);
}
function bush(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="8" rx="64" ry="12" fill="#000" opacity=".22"/>${[[-32, -22, 30], [8, -34, 36], [40, -20, 28], [0, -14, 30]].map(([a, b, r], i) => `<circle cx="${a}" cy="${b}" r="${r}" fill="${['#3f8a3a', '#4f9a44', '#2f7a30'][i % 3]}" stroke="#1f5a22" stroke-width="2.4"/>`).join('')}${Array.from({ length: 9 }, (_, i) => `<circle cx="${-44 + i * 11}" cy="${-34 + (i % 3) * 12}" r="5.5" fill="${['#ff7aa8', '#fff', '#ffd1dc', '#ff9ab8'][i % 4]}" stroke="#a83a5a" stroke-width="1.4"/>`).join('')}`, `scale(${s})`);
}
function pot(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="6" rx="28" ry="6" fill="#000" opacity=".25"/>${[[-14, -44, '#ff6a8a'], [0, -56, '#fff'], [14, -46, '#ff9ab8'], [-4, -40, '#ffd84a']].map(([a, b, c]) => `<path d="M${a} -24V${b + 8}" stroke="#3f8a3a" stroke-width="3"/><circle cx="${a}" cy="${b}" r="9" fill="${c}" stroke="#a83a5a" stroke-width="1.8"/><circle cx="${a}" cy="${b}" r="2.6" fill="#ffd84a"/>`).join('')}<path d="M-20 -24h40l-6 30h-28z" fill="${TERRA}" stroke="${OL}" stroke-width="3"/><rect x="-24" y="-30" width="48" height="10" rx="3" fill="#e07a46" stroke="${OL}" stroke-width="3"/>`, `scale(${s})`);
}
function barrel(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="6" rx="40" ry="9" fill="#000" opacity=".28"/><path d="M-32 0Q-40 -36 -32 -70H32Q40 -36 32 0Z" fill="${WOOD}" stroke="${OL}" stroke-width="3.4"/><path d="M-36 -52h72M-37 -18h74" stroke="${OL}" stroke-width="5"/><path d="M-14 -70v70M0 -70v70M14 -70v70" stroke="#6a4420" stroke-width="2"/><ellipse cy="-70" rx="32" ry="8" fill="#a8743a" stroke="${OL}" stroke-width="3"/>${[[-18, -92, '#ff6a8a'], [-2, -104, '#fff'], [14, -94, '#ffd84a'], [24, -84, '#ff9ab8']].map(([a, b, c]) => `<path d="M${a} -70V${b + 8}" stroke="#3f8a3a" stroke-width="3"/><circle cx="${a}" cy="${b}" r="10" fill="${c}" stroke="${OL}" stroke-width="2"/>`).join('')}`, `scale(${s})`);
}
function crate(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="8" rx="48" ry="8" fill="#000" opacity=".25"/><rect x="-42" y="-34" width="84" height="38" rx="4" fill="#c8945a" stroke="${OL}" stroke-width="3"/><path d="M-42 -20h84M-42 -8h84" stroke="#8a5a2a" stroke-width="2"/>${[[-26, -44], [-8, -48], [12, -44], [30, -42], [-16, -38], [4, -38], [22, -36]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="11" fill="${RED}" stroke="#7a1810" stroke-width="2.2"/><path d="M${a - 4} ${b - 10}q4 -4 8 0" stroke="#3f8a3a" stroke-width="3" fill="none"/>`).join('')}`, `scale(${s})`);
}
function lantern(S, x, y, s = 1) {
  G(S, x, y, `<circle cy="-60" r="40" fill="url(#glow)"/><path d="M0 0V-100" stroke="#2a1c14" stroke-width="7"/><path d="M-12 -108h24l-4 -14h-16z" fill="#2a1c14"/><rect x="-11" y="-108" width="22" height="34" rx="3" fill="#ffd890" stroke="#2a1c14" stroke-width="3"/><path d="M0 -108v34M-11 -91h22" stroke="#2a1c14" stroke-width="2"/><ellipse cy="2" rx="14" ry="5" fill="#2a1c14"/>`, `scale(${s})`);
}
function gtable(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="26" rx="100" ry="18" fill="#000" opacity=".22"/><path d="M-82 4Q-82 40 -66 44H66Q82 40 82 4Z" fill="url(#gh)" stroke="#a8503a" stroke-width="2.4"/><ellipse cy="4" rx="86" ry="30" fill="url(#gh)" stroke="#a8503a" stroke-width="3"/><ellipse cy="4" rx="86" ry="30" fill="#fff" opacity=".1"/>${[-40, 40].map((q) => `<ellipse cx="${q}" cy="6" rx="20" ry="8" fill="#fff" stroke="#b8a888" stroke-width="2"/>`).join('')}<rect x="-6" y="-26" width="12" height="26" rx="3" fill="#f6efe0" stroke="#8a7a5a" stroke-width="2"/><path d="M0 -26q-6 -12 0 -22q6 10 0 22z" fill="#ffc83a" stroke="#ff7a1a" stroke-width="1.6"/><circle cy="-34" r="18" fill="url(#glow)"/>`, `scale(${s})`);
}
function chair(S, x, y, flip = 1, s = 1) {
  G(S, x, y, `<ellipse cy="6" rx="26" ry="6" fill="#000" opacity=".25"/><rect x="-22" y="-80" width="44" height="52" rx="8" fill="${WOOD}" stroke="${OL}" stroke-width="3.2"/><rect x="-15" y="-73" width="30" height="38" rx="8" fill="#4f8a52" stroke="#2a5a30" stroke-width="2.4"/><rect x="-26" y="-30" width="52" height="12" rx="4" fill="#68a86a" stroke="#2a5a30" stroke-width="2.4"/><path d="M-20 -18v22M20 -18v22" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>`, `scale(${flip * s},${s})`);
}
function vespa(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="14" rx="70" ry="10" fill="#000" opacity=".25"/><circle cx="-46" cy="0" r="17" fill="#2a2a30" stroke="#111" stroke-width="3"/><circle cx="-46" cy="0" r="7" fill="#c8cad4"/><circle cx="46" cy="0" r="17" fill="#2a2a30" stroke="#111" stroke-width="3"/><circle cx="46" cy="0" r="7" fill="#c8cad4"/>
  <path d="M-62 -4Q-66 -34 -40 -42Q-8 -48 10 -34L40 -34Q62 -38 66 -4Q40 -14 18 -4Q-10 -10 -40 -4Z" fill="#8fd8c0" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-16 -42Q-12 -62 8 -58L24 -42Z" fill="#6a3a22" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M40 -34L48 -74M34 -76H62" stroke="${OL}" stroke-width="5" stroke-linecap="round"/><ellipse cx="64" cy="-60" rx="7" ry="9" fill="#fff6c0" stroke="${OL}" stroke-width="2.4"/><rect x="-72" y="-14" width="16" height="8" rx="3" fill="#c8cad4" stroke="${OL}" stroke-width="2"/><path d="M-30 -22q18 -8 40 0" stroke="#fff" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/>`, `scale(${s})`);
}
function fountain(S, x, y) {
  G(S, x, y, `<ellipse cx="0" cy="20" rx="170" ry="56" fill="#000" opacity=".26"/><ellipse cx="0" cy="0" rx="160" ry="52" fill="#d8c8a8" stroke="${OL}" stroke-width="4"/>${Array.from({ length: 12 }, (_, i) => `<ellipse cx="${Math.cos(i / 12 * 6.28) * 148}" cy="${Math.sin(i / 12 * 6.28) * 44}" rx="16" ry="8" fill="${i % 2 ? '#c4b290' : '#d8c8a8'}" stroke="#7a6a50" stroke-width="2"/>`).join('')}<ellipse cx="0" cy="-2" rx="140" ry="42" fill="url(#water)" stroke="#8a7a60" stroke-width="3"/>
  ${Array.from({ length: 6 }, (_, i) => `<path d="M${-90 + i * 36} ${-6 + (i % 2) * 10}q10 -5 22 0" fill="none" stroke="#fff" stroke-width="2.4" opacity=".55" stroke-linecap="round"/>`).join('')}
  <path d="M-34 -4h68l-10 -30h-48z" fill="#d8c8a8" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="-34" rx="44" ry="13" fill="#d8c8a8" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="-36" rx="36" ry="9" fill="url(#water)"/>
  <path d="M-8 -36h16v-38h-16z" fill="#d8c8a8" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="-76" rx="28" ry="8" fill="#d8c8a8" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="-77" rx="22" ry="5" fill="url(#water)"/><rect x="-6" y="-112" width="12" height="36" fill="#d8c8a8" stroke="${OL}" stroke-width="3"/><circle cy="-116" r="9" fill="#e8d8b8" stroke="${OL}" stroke-width="3"/>
  <path d="M0 -122Q-30 -140 -56 -92M0 -122Q30 -140 56 -92M0 -122V-82" fill="none" stroke="#d8f0fa" stroke-width="5" stroke-linecap="round" opacity=".85"/>
  ${[[-120, -4, '#ff6a8a'], [-100, 20, '#fff'], [110, 14, '#ffd1dc'], [128, -6, '#ff9ab8'], [-70, 36, '#ffd84a'], [70, 38, '#ff6a8a']].map(([a, b, c]) => `<circle cx="${a}" cy="${b}" r="9" fill="${c}" stroke="#a83a5a" stroke-width="1.6"/><circle cx="${a}" cy="${b}" r="2.6" fill="#ffd84a"/>`).join('')}`);
}
function lights(S, x1, x2, y, sag = 36) {
  let h = `<path d="M${x1} ${y}Q${(x1 + x2) / 2} ${y + sag} ${x2} ${y}" fill="none" stroke="${OL}" stroke-width="3"/>`;
  const n = Math.round((x2 - x1) / 52);
  for (let i = 1; i < n; i++) { const t = i / n, px = x1 + (x2 - x1) * t, py = y + sag * 2 * t * (1 - t); h += `<circle cx="${px}" cy="${py + 8}" r="16" fill="url(#glow)"/><circle cx="${px}" cy="${py + 8}" r="6" fill="${['#fff0b0', '#ffd890', '#ffe6a0'][i % 3]}" stroke="${OL}" stroke-width="1.4"/>`; }
  return G(S, 0, 0, h);
}
function pergola(S, x, y) {
  const leaves = Array.from({ length: 22 }, (_, i) => `<circle cx="${-14 + i * 22}" cy="${-262 + (i % 3) * 9}" r="${15 + (i % 4) * 3}" fill="${['#4f9a44', '#5aaa4a', '#3f8a3a'][i % 3]}" stroke="#1f5a22" stroke-width="2"/>`).join('');
  const grapes = [60, 150, 240, 330, 420].map((q, i) => `<g transform="translate(${q},${-244 + (i % 2) * 6})">${[[0, 0], [8, 6], [-8, 6], [0, 12], [8, 18], [-8, 18], [0, 24]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="6" fill="#7a3a9a" stroke="#4a1a6a" stroke-width="1.6"/>`).join('')}</g>`).join('');
  G(S, x, y, `${[0, 460].map((q) => `<rect x="${q - 12}" y="-220" width="24" height="230" fill="${WOOD}" stroke="${OL}" stroke-width="3.4"/>`).join('')}<rect x="-30" y="-236" width="520" height="26" fill="${WOOD}" stroke="${OL}" stroke-width="3.4"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${-20 + i * 58}" y="-256" width="14" height="24" fill="#a8743a" stroke="${OL}" stroke-width="2.4"/>`).join('')}${leaves}${grapes}`);
}
function house(S, x, y, w, h, wall, roof, s = 1) {
  G(S, x, y, `<rect x="0" y="${-h}" width="${w}" height="${h}" fill="${wall}" stroke="#8a6a4a" stroke-width="2.4"/><path d="M-6 ${-h}L${w / 2} ${-h - 30}L${w + 6} ${-h}Z" fill="${roof}" stroke="#7a3a1c" stroke-width="2.4" stroke-linejoin="round"/>${[0.22, 0.62].map((f) => `<rect x="${w * f}" y="${-h * 0.7}" width="${w * 0.16}" height="${h * 0.34}" fill="#4a7a8a" stroke="#3a4a50" stroke-width="1.6"/><rect x="${w * f - 4}" y="${-h * 0.7}" width="4" height="${h * 0.34}" fill="${GREEN}"/><rect x="${w * f + w * 0.16}" y="${-h * 0.7}" width="4" height="${h * 0.34}" fill="${GREEN}"/>`).join('')}`, `scale(${s})`);
}
function belltower(S, x, y) {
  G(S, x, y, `<rect x="0" y="-170" width="46" height="170" fill="#f0d8a8" stroke="#8a6a4a" stroke-width="2.4"/><path d="M-4 -170L23 -214L50 -170Z" fill="${TERRA}" stroke="#7a3a1c" stroke-width="2.4" stroke-linejoin="round"/><rect x="12" y="-150" width="22" height="34" rx="11" fill="#6a4a30"/><path d="M23 -214V-228M17 -222h12" stroke="#7a3a1c" stroke-width="2.4"/>`);
}
function colosseum(S, x, y, s = 1) {
  const tier = (yy, hh, n, w, x0) => `<rect x="${x0}" y="${yy}" width="${w}" height="${hh}" fill="#e8d0a0" stroke="#a8845a" stroke-width="2.4"/>${Array.from({ length: n }, (_, i) => `<path d="M${x0 + (i + 0.5) * (w / n) - 8} ${yy + hh}v-${hh * 0.5}q8 -12 16 0v${hh * 0.5}z" fill="#9a7a56"/>`).join('')}`;
  G(S, x, y, `<ellipse cy="6" rx="190" ry="12" fill="#000" opacity=".15"/>${tier(-40, 40, 12, 360, -180)}${tier(-84, 44, 12, 360, -180)}<path d="M-180 -84V-124Q-180 -134 -168 -134H70L130 -84Z" fill="#e8d0a0" stroke="#a8845a" stroke-width="2.4"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${-170 + i * 28} -84v-22q8 -12 16 0v22z" fill="#9a7a56"/>`).join('')}<path d="M70 -134L130 -84H180V-84L150 -108Z" fill="#d8bf90" stroke="#a8845a" stroke-width="2"/>`, `scale(${s})`);
}
function sailboat(S, x, y, s = 1) {
  G(S, x, y, `<path d="M-24 0h48l-8 10h-32z" fill="#8a5a2a" stroke="${OL}" stroke-width="2"/><path d="M0 -4V-50L22 -8Z" fill="#fff" stroke="#6a7a8a" stroke-width="1.6"/><path d="M-3 -4V-42L-22 -8Z" fill="#f6e8c8" stroke="#6a7a8a" stroke-width="1.6"/>`, `scale(${s})`);
}
function trattoria(S, x, y) {
  const W = 640;
  const shutters = (px, py, w, h) => `<rect x="${px - 12}" y="${py}" width="12" height="${h}" fill="${GREEN}" stroke="${OL}" stroke-width="2.4"/><rect x="${px + w}" y="${py}" width="12" height="${h}" fill="${GREEN}" stroke="${OL}" stroke-width="2.4"/>`;
  const upper = (px) => `<rect x="${px}" y="150" width="60" height="88" rx="30" fill="#ffd98a" stroke="${OL}" stroke-width="4"/><path d="M${px + 30} 150v88M${px} 200h60" stroke="${OL}" stroke-width="3"/>${shutters(px, 168, 60, 70)}<rect x="${px - 8}" y="232" width="76" height="22" rx="3" fill="${TERRA_D}" stroke="${OL}" stroke-width="3"/>${[8, 22, 36, 50, 64].map((q, i) => `<circle cx="${px - 4 + q}" cy="228" r="7" fill="${['#ff6a8a', '#fff', '#ff9ab8', '#ffd1dc', '#ff6a8a'][i]}" stroke="#a83a5a" stroke-width="1.4"/>`).join('')}`;
  G(S, x, y, `
  <ellipse cx="320" cy="560" rx="360" ry="22" fill="#000" opacity=".22"/>
  <path d="M-34 110L56 8H584L674 110Z" fill="${TERRA}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${-24 + i * 11} ${104 - i * 16}H${664 - i * 11}" stroke="${TERRA_D}" stroke-width="2.4"/>`).join('')}${Array.from({ length: 28 }, (_, i) => `<path d="M${-10 + i * 24} 108q6 -6 12 0" stroke="#f08a5a" stroke-width="2" fill="none" opacity=".7"/>`).join('')}
  <rect x="470" y="-36" width="46" height="70" fill="#c8704a" stroke="${OL}" stroke-width="4"/><rect x="462" y="-44" width="62" height="14" rx="3" fill="#a8482a" stroke="${OL}" stroke-width="3.4"/>
  <rect x="0" y="108" width="${W}" height="452" fill="${CREAM}" stroke="${OL}" stroke-width="5"/>
  <rect x="0" y="480" width="${W}" height="80" fill="#c8a070" stroke="${OL}" stroke-width="4"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 72 + (i % 2) * 14} 482v${78}M0 ${500 + (i % 3) * 20}H${W}" stroke="#8a6a48" stroke-width="2" opacity=".6"/>`).join('')}
  ${upper(70)}${upper(510)}${upper(290)}
  ${[-10, 40, 130, 500, 560, 620].map((q, i) => `<circle cx="${q + 20}" cy="${130 + (i % 3) * 36}" r="${28 + (i % 2) * 8}" fill="${['#4f9a44', '#3f8a3a', '#5aaa4a'][i % 3]}" stroke="#1f5a22" stroke-width="2.4"/>`).join('')}
  ${[[30, 160], [150, 150], [560, 190], [610, 150], [90, 200]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="6" fill="#ff7aa8" stroke="#a83a5a" stroke-width="1.4"/>`).join('')}
  <path d="M-30 290H670L640 360Q320 392 0 360Z" fill="${RED}" stroke="${OL}" stroke-width="4"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${-30 + i * 64} 290h32l-6 76h-28z" fill="#fff4e0"/>`).join('')}<path d="M-30 290H670V312H-30z" fill="${GREEN}" stroke="${OL}" stroke-width="3"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${-30 + i * 64} 360q16 20 32 0" fill="${i % 2 ? RED : '#fff4e0'}" stroke="${OL}" stroke-width="2.6"/>`).join('')}
  <path d="M236 560V440Q236 376 320 376T404 440V560Z" fill="#4a2210" stroke="${OL}" stroke-width="5"/><path d="M246 560V444Q246 388 320 388T394 444V560Z" fill="#ffc870" stroke="${OL}" stroke-width="3"/><path d="M246 560V444Q246 388 320 388T394 444V560Z" fill="url(#glow)"/><path d="M320 388V560M246 470H394" stroke="${OL}" stroke-width="3.4"/>
  ${[[28, 392], [440, 392]].map(([q, yy]) => `<rect x="${q}" y="${yy}" width="168" height="96" rx="12" fill="#ffc870" stroke="${OL}" stroke-width="5"/><rect x="${q}" y="${yy}" width="168" height="96" rx="12" fill="url(#glow)"/><path d="M${q + 84} ${yy}V${yy + 96}M${q} ${yy + 48}H${q + 168}" stroke="${OL}" stroke-width="3.4"/><path d="M${q - 8} ${yy + 96}h184v14H${q - 8}z" fill="${TERRA_D}" stroke="${OL}" stroke-width="3"/>${[20, 56, 92, 128, 156].map((a, i) => `<circle cx="${q + a}" cy="${yy + 92}" r="7" fill="${['#ff6a8a', '#fff', '#ff9ab8', '#ffd1dc', '#ff6a8a'][i]}" stroke="#a83a5a" stroke-width="1.4"/>`).join('')}${shutters(q, yy + 6, 168, 84)}`).join('')}
  <ellipse cx="320" cy="338" rx="108" ry="30" fill="#4a2a14" stroke="#c8a070" stroke-width="4"/><text x="320" y="349" text-anchor="middle" font-family="Playfair Display,serif" font-style="italic" font-weight="900" font-size="32" fill="#fff4dc">Trattoria</text>
  ${[200, 440].map((q) => `<g transform="translate(${q},414)"><circle cy="14" r="44" fill="url(#glow)"/><path d="M0 -20V-4" stroke="#2a1c14" stroke-width="3"/><rect x="-10" y="-4" width="20" height="36" rx="3" fill="#ffd890" stroke="#2a1c14" stroke-width="3"/><path d="M-10 14h20M0 -4V32" stroke="#2a1c14" stroke-width="2"/></g>`).join('')}
  <g transform="translate(-6,470)"><path d="M0 90L12 -4L52 -4L64 90Z" fill="#3a3a30" stroke="${WOOD}" stroke-width="5" stroke-linejoin="round"/><rect x="10" y="4" width="44" height="72" fill="#2a3a30"/><text x="32" y="26" text-anchor="middle" font-family="Playfair Display,serif" font-style="italic" font-weight="700" font-size="13" fill="#f6efe0">Tavoli</text><path d="M16 36h32M16 48h28M16 60h32" stroke="#f6efe0" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></g>
  <rect x="-20" y="560" width="${W + 40}" height="22" fill="#b8a888" stroke="${OL}" stroke-width="4"/><path d="M150 582h340v22H150zM120 604h400v22H120z" fill="#d8c4a0" stroke="${OL}" stroke-width="3"/>`);
}

export function renderItalian(S, LB, chapter, progress) {
  seedRandom(66);
  // sky, sun glow, clouds
  el('rect', { width: WW, height: 760, fill: 'url(#sun)' }, S);
  for (let i = 0; i < 12; i++) { const cx = 60 + i * 210 + rnd() * 90, cy = 40 + rnd() * 150; el('ellipse', { cx, cy, rx: 100 + rnd() * 70, ry: 16 + rnd() * 10, fill: '#fff', opacity: 0.8 }, S); el('ellipse', { cx: cx + 40, cy: cy - 12, rx: 70, ry: 14, fill: '#fff', opacity: 0.85 }, S); }
  // the sea and the cliffs on the left
  el('rect', { x: 0, y: 330, width: 1000, height: 120, fill: 'url(#water)' }, S);
  for (let i = 0; i < 40; i++) el('path', { d: `M${rnd() * 960} ${346 + rnd() * 90}q8 -5 16 0t16 0`, fill: 'none', stroke: '#fff', 'stroke-width': 2.4, opacity: 0.45, 'stroke-linecap': 'round' }, S);
  sailboat(S, 250, 372, 1.2); sailboat(S, 470, 400, 0.9); sailboat(S, 700, 366, 1); sailboat(S, 880, 410, 0.8);
  el('path', { d: 'M0 250Q140 210 280 250L470 320Q400 366 240 366L0 380Z', fill: '#d8b078', stroke: '#8a6a40', 'stroke-width': 3 }, S);
  el('path', { d: 'M0 280Q140 250 300 290', fill: 'none', stroke: '#e8c898', 'stroke-width': 8, opacity: 0.6 }, S);
  [['#f6c8a0', 40, 300], ['#fff0d0', 100, 292], ['#f8e0a0', 160, 288], ['#f2b8a0', 220, 296], ['#fff0d0', 290, 312]].forEach(([c, x, y], i) => house(S, x, y, 44 + (i % 2) * 10, 30 + (i % 3) * 6, c, i % 2 ? TERRA : '#c8603a', 0.9));
  // far hills, vineyards, village and the Colosseum
  el('path', { d: `M780 470Q1000 380 1300 420T1900 400T${WW} 380V520H780Z`, fill: '#9ab870' }, S);
  colosseum(S, 1420, 440, 0.9);
  el('path', { d: `M900 520Q1200 440 1600 480T${WW} 440V600H900Z`, fill: '#b8cc78' }, S);
  for (let i = 0; i < 30; i++) el('path', { d: `M${1000 + i * 44} 560Q${1020 + i * 44} 520 ${1070 + i * 44} 480`, fill: 'none', stroke: i % 2 ? '#6a9a3a' : '#8ab84a', 'stroke-width': 7, opacity: 0.8, 'stroke-linecap': 'round' }, S);
  el('path', { d: `M0 470Q300 430 800 520V600H0Z`, fill: '#a8c070' }, S);
  [[1960, 470, 54, 42, '#f6d8a8'], [2030, 440, 60, 48, '#f2c898'], [2110, 460, 50, 40, '#fff0d0'], [2180, 430, 64, 52, '#f6d8a8'], [2270, 455, 56, 44, '#f8e0b0'], [2340, 420, 52, 50, '#f2c898']].forEach(([x, y, w, h, c], i) => house(S, x, y, w, h, c, i % 2 ? TERRA : '#c8603a', 1));
  belltower(S, 2150, 440);
  [[900, 510], [1060, 470], [1180, 450], [1700, 490], [1860, 470], [2300, 490]].forEach(([x, y], i) => cypress(S, x, y, 0.5 + (i % 3) * 0.1));
  // sandstone plaza
  el('path', { d: `M0 600Q500 580 1100 610T2400 600V${WH}H0Z`, fill: '#d8c09a' }, S);
  const cols = ['#e6d0aa', '#d8c09a', '#ecd8b4', '#cdb48c', '#e2ccA4', '#d4bc94'];
  for (let ty = 600, row = 0; ty < WH; ty += 54, row++) for (let tx = -40 + (row % 2) * 60; tx < WW; tx += 120) el('rect', { x: tx + 2, y: ty + 2, width: 112 + rnd() * 6, height: 48, rx: 10, fill: cols[Math.floor(rnd() * cols.length)], stroke: '#a8885a', 'stroke-width': 2, opacity: 0.95 }, S);
  el('rect', { x: 0, y: 600, width: WW, height: WH - 600, fill: 'url(#glow)', opacity: 0.12 }, S);

  trattoria(S, 240, 40);
  cypress(S, 130, 640, 1.1); cypress(S, 960, 650, 1.0);
  pergola(S, 1050, 650);
  gtable(S, 1130, 800, 0.9); gtable(S, 1450, 790, 0.9);
  chair(S, 1060, 860, 1, 0.9); chair(S, 1202, 862, -1, 0.9); chair(S, 1382, 852, 1, 0.9); chair(S, 1522, 850, -1, 0.9);
  gtable(S, 330, 790, 0.8); chair(S, 262, 840, 1, 0.8); chair(S, 398, 842, -1, 0.8);
  gtable(S, 800, 780, 0.8); chair(S, 732, 830, 1, 0.8); chair(S, 868, 832, -1, 0.8);

  // stone path
  const YS = [1230, 1140, 1240, 1140, 1240, 1140, 1240, 1140, 1240, 1150];
  const spots = YS.map((y, i) => [280 + i * 190, y]);
  const done = (n) => (progress.stars[n] || 0) > 0;
  const current = chapter.levels.find((l) => !done(l.n));
  const lvl = chapter.levels.map((l, i) => ({ n: l.n, name: l.name, s: progress.stars[l.n] || 0, st: done(l.n) ? 'done' : (current && current.n === l.n ? 'now' : 'lock'), pos: spots[i] }));
  const route = [[560, 790], [560, 930], ...spots];
  let d = `M${route[0].join(' ')}`;
  for (let i = 1; i < route.length; i++) {
    const a = route[i - 1], b = route[i], p0 = route[i - 2] || a, p1 = route[i + 1] || b;
    d += ` C${a[0] + (b[0] - p0[0]) / 6} ${a[1] + (b[1] - p0[1]) / 6} ${b[0] - (p1[0] - a[0]) / 6} ${b[1] - (p1[1] - a[1]) / 6} ${b[0]} ${b[1]}`;
  }
  const rd = { d, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  el('path', { ...rd, stroke: '#000', 'stroke-width': 80, opacity: 0.2, transform: 'translate(0,8)' }, S);
  el('path', { ...rd, stroke: '#d8b078', 'stroke-width': 74 }, S);
  el('path', { ...rd, stroke: '#f6e4bc', 'stroke-width': 62 }, S);
  el('path', { ...rd, stroke: '#fff6dc', 'stroke-width': 34, opacity: 0.7 }, S);
  const road = el('path', { ...rd, stroke: 'none' }, S);
  const total = road.getTotalLength();
  const doneCount = lvl.filter((l) => l.st === 'done').length;
  if (doneCount) {
    let best = 0, bd = 1e9; const last = spots[doneCount - 1];
    for (let t = 0; t <= total; t += 4) { const q = road.getPointAtLength(t), dd = Math.hypot(q.x - last[0], q.y - last[1]); if (dd < bd) { bd = dd; best = t; } }
    el('path', { ...rd, stroke: '#ffd890', 'stroke-width': 16, 'stroke-dasharray': `${best} ${total}`, opacity: 0.95 }, S);
    el('path', { ...rd, stroke: '#fff', 'stroke-width': 5, 'stroke-dasharray': `${best} ${total}` }, S);
  }

  // plaza furniture
  bush(S, 1500, 770, 1.1); bush(S, 1850, 880, 1); bush(S, 640, 1440, 1); bush(S, 1000, 1450, 1.1);
  fountain(S, 1640, 940);
  lemon(S, 900, 1010, 1.1); lemon(S, 2120, 840, 1.2); lemon(S, 140, 880, 1.2); lemon(S, 1900, 1400, 1);
  olive(S, 2250, 930, 1); olive(S, 1260, 1010, 0.8);
  pot(S, 700, 1040, 1.2); pot(S, 1500, 1050, 1.1); pot(S, 470, 830, 1); pot(S, 2020, 1030, 1);
  lantern(S, 700, 1000, 1.2); lantern(S, 1500, 1010, 1.2); lantern(S, 470, 790, 1.1);
  barrel(S, 100, 780, 1); barrel(S, 960, 840, 0.9); barrel(S, 1700, 1440, 0.9); barrel(S, 2330, 1440, 1);
  crate(S, 1330, 1030, 1); crate(S, 560, 1430, 1);
  vespa(S, 2130, 1010, 1);
  gtable(S, 230, 1000, 0.9); chair(S, 140, 1060, 1, 0.9); chair(S, 322, 1062, -1, 0.9);
  lights(S, 40, 760, 650, 40); lights(S, 1700, 2380, 650, 40);

  // stops
  lvl.forEach((l) => levelStop({ parent: S, labels: LB, l, chapter, skin: 'italian' }));
  return { nodes: lvl, board: { x: 2290, y: 1190, dir: 1 }, prev: { x: 110, y: 1240, dir: -1 }, home: (lvl.find((l) => l.st === 'now') || lvl[lvl.length - 1]).pos };
}
