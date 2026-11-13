// Chapter 5 map: a ranch plaza at sunset. Steakhouse with a neon sign and star awning, windmill, wagon wheels, barrels, string lights, a stone fountain, and a cream stone path with round stepping stones.
import { el, rnd, seedRandom, WW, WH } from './iso.js';

export const STEAK_DEFS = `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a6ab8"/><stop offset=".08" stop-color="#d88aa8"/><stop offset=".16" stop-color="#ffb08a"/><stop offset=".23" stop-color="#ffd8a0"/><stop offset=".24" stop-color="#8aa84a"/><stop offset=".4" stop-color="#6a9a3a"/><stop offset="1" stop-color="#5a8a3a"/></linearGradient>
<radialGradient id="sun" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#ffd890" stop-opacity=".3"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#2a0e08" stop-opacity="0"/><stop offset="1" stop-color="#2a0e08" stop-opacity=".45"/></radialGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd890" stop-opacity=".6"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/></radialGradient>
<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8dcf0"/><stop offset="1" stop-color="#4a9ac0"/></linearGradient>
<pattern id="gh" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#fff6e6"/><rect width="13" height="26" fill="#d8402f" opacity=".7"/><rect width="26" height="13" fill="#d8402f" opacity=".7"/></pattern>
<radialGradient id="neon" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff5a6a" stop-opacity=".55"/><stop offset="1" stop-color="#ff5a6a" stop-opacity="0"/></radialGradient>
</defs>`;

const OL = '#2a160c', WOOD = '#a8743a', WOOD_D = '#6a4420', BRICK = '#8a2a2a', CREAM = '#f3e6c8', RED = '#b03a30', NAVY = '#1c3a6a';
const G = (S, x, y, html, extra = '') => { const n = el('g', { transform: `translate(${x},${y}) ${extra}` }, S); n.innerHTML = html; return n; };

function windmill(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="4" rx="40" ry="8" fill="#000" opacity=".2"/><path d="M-26 0L-6 -170H6L26 0" fill="none" stroke="#4a4a58" stroke-width="5"/><path d="M-20 -30L20 -30M-16 -60L16 -60M-12 -92L12 -92M-8 -126L8 -126M-26 0L6 -170M26 0L-6 -170" stroke="#5a5a68" stroke-width="2.6"/>
  <g transform="translate(0,-176)"><g class="wm">${Array.from({ length: 16 }, (_, i) => `<path transform="rotate(${i * 22.5})" d="M0 0L-5 -62H5Z" fill="#c8cad4" stroke="#4a4a58" stroke-width="1.6"/>`).join('')}</g><circle r="10" fill="#6a6a78" stroke="#2a2a38" stroke-width="2.4"/><path d="M0 0H44L54 -8V8L44 0" fill="#c8cad4" stroke="#4a4a58" stroke-width="2"/></g>`, `scale(${s})`);
}
function barn(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="6" rx="130" ry="12" fill="#000" opacity=".2"/><path d="M-110 0V-90L-80 -130H80L110 -90V0Z" fill="#b8402f" stroke="#4a1410" stroke-width="3.4"/><path d="M-120 -88L0 -176 120 -88" fill="none" stroke="#4a1410" stroke-width="10" stroke-linejoin="round"/><path d="M-120 -88L0 -176 120 -88" fill="none" stroke="#6a3a28" stroke-width="5" stroke-linejoin="round"/><rect x="-38" y="-70" width="76" height="70" fill="#8a2a22" stroke="#fff0d8" stroke-width="4"/><path d="M-38 -70L38 0M38 -70L-38 0" stroke="#fff0d8" stroke-width="4"/><rect x="-12" y="-122" width="24" height="24" fill="#2a160c" stroke="#fff0d8" stroke-width="3"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${-104 + i * 26} -2V-86" stroke="#8a2a22" stroke-width="2"/>`).join('')}
  <rect x="124" y="-130" width="40" height="130" rx="18" fill="#c8cad4" stroke="#4a4a58" stroke-width="3"/><path d="M124 -112Q144 -150 164 -112Z" fill="#8a8a98" stroke="#4a4a58" stroke-width="3"/>`, `scale(${s})`);
}
function cow(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="8" rx="30" ry="5" fill="#000" opacity=".2"/><path d="M-26 -12Q-28 -30 -10 -32H18Q30 -30 28 -14V0H20V-8H-18V0H-26Z" fill="#6a3a22" stroke="#2a160c" stroke-width="2.2"/><path d="M26 -28Q40 -32 40 -18Q40 -10 30 -12Z" fill="#7a4a2a" stroke="#2a160c" stroke-width="2"/><path d="M-4 -30Q4 -22 10 -30" fill="#f0e2c2"/>`, `scale(${s})`);
}
function tree(S, x, y, s = 1) {
  G(S, x, y, `<path d="M-14 0Q-10 -90 -26 -150H22Q10 -90 14 0Z" fill="#6a4420" stroke="#2a160c" stroke-width="3.4"/>${[[-70, -190, 80], [50, -200, 90], [-10, -250, 90], [-110, -140, 56], [100, -150, 60], [0, -170, 80]].map(([a, b, r], i) => `<circle cx="${a}" cy="${b}" r="${r}" fill="${['#3f8a3a', '#4f9a44', '#5aaa4a'][i % 3]}" stroke="#2a5a28" stroke-width="3"/>`).join('')}${Array.from({ length: 16 }, (_, i) => `<circle cx="${-120 + (i * 53) % 240}" cy="${-260 + (i * 37) % 150}" r="9" fill="#7acc5a" opacity=".7"/>`).join('')}`, `scale(${s})`);
}
function bush(S, x, y, s = 1, flowers = true) {
  G(S, x, y, `<ellipse cy="8" rx="64" ry="12" fill="#000" opacity=".22"/>${[[-32, -22, 30], [8, -34, 36], [40, -20, 28], [0, -14, 30]].map(([a, b, r], i) => `<circle cx="${a}" cy="${b}" r="${r}" fill="${['#3f8a3a', '#4f9a44', '#2f7a30'][i % 3]}" stroke="#1f5a22" stroke-width="2.4"/>`).join('')}${flowers ? Array.from({ length: 8 }, (_, i) => `<circle cx="${-40 + i * 11}" cy="${-36 + ((i * 17) % 30)}" r="4.2" fill="${['#fff', '#ffd84a', '#ff9ab8'][i % 3]}"/>`).join('') : ''}`, `scale(${s})`);
}
function boulder(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="8" rx="56" ry="10" fill="#000" opacity=".25"/><path d="M-52 4Q-58 -34 -26 -44Q10 -56 40 -36Q60 -14 50 4Z" fill="#a89a8a" stroke="#3a2e26" stroke-width="3"/><path d="M-30 -30Q0 -48 30 -32" stroke="#d0c4b4" stroke-width="3" fill="none" opacity=".6"/><path d="M-10 4Q-14 -14 0 -22" stroke="#7a6e60" stroke-width="2" fill="none"/>`, `scale(${s})`);
}
function lantern(S, x, y, s = 1) {
  G(S, x, y, `<circle cy="-20" r="34" fill="url(#glow)"/><path d="M-10 -40Q0 -56 10 -40" fill="none" stroke="#2a160c" stroke-width="3"/><rect x="-11" y="-40" width="22" height="34" rx="3" fill="#ffd890" stroke="#2a160c" stroke-width="3"/><path d="M0 -40V-6M-11 -23h22" stroke="#2a160c" stroke-width="2"/><rect x="-14" y="-8" width="28" height="6" rx="2" fill="#2a160c"/>`, `scale(${s})`);
}
function chair(S, x, y, flip = 1, s = 1) {
  G(S, x, y, `<ellipse cy="6" rx="26" ry="6" fill="#000" opacity=".25"/><path d="M-20 -80H20L24 -30H-24Z" fill="#8a4a24" stroke="#2a160c" stroke-width="3.2" stroke-linejoin="round"/><path d="M-12 -72V-38M0 -72V-38M12 -72V-38" stroke="#4a2410" stroke-width="2.6"/><rect x="-28" y="-30" width="56" height="12" rx="3" fill="#a8602e" stroke="#2a160c" stroke-width="3"/><path d="M-22 -18L-26 4M22 -18L26 4" stroke="#2a160c" stroke-width="5" stroke-linecap="round"/>`, `scale(${flip * s},${s})`);
}
function gtable(S, x, y, s = 1, lamp = true) {
  G(S, x, y, `<ellipse cy="26" rx="100" ry="18" fill="#000" opacity=".22"/><path d="M-82 4Q-82 40 -66 44H66Q82 40 82 4Z" fill="url(#gh)" stroke="#8a6a4a" stroke-width="2.4"/><ellipse cy="4" rx="86" ry="30" fill="url(#gh)" stroke="#8a6a4a" stroke-width="3"/><ellipse cy="4" rx="86" ry="30" fill="#fff" opacity=".12"/>${[-40, 40].map((q) => `<g transform="translate(${q},0)"><path d="M0 -6V-26" stroke="#e8f4fa" stroke-width="1.6"/><path d="M-9 -26h18l-2 14h-14z" fill="#e8f4fa" opacity=".7" stroke="#8aa8b8" stroke-width="1.6"/></g>`).join('')}<g transform="translate(0,-4)"><rect x="-8" y="-24" width="16" height="22" rx="2" fill="#a8602e" stroke="#2a160c" stroke-width="2"/><path d="M-6 -18h12" stroke="#fff0d8" stroke-width="2"/></g>${lamp ? '<g transform="translate(0,-12)"><circle cy="-30" r="30" fill="url(#glow)"/><rect x="-9" y="-44" width="18" height="30" rx="3" fill="#ffd890" stroke="#2a160c" stroke-width="2.6"/><path d="M-9 -29h18M0 -44V-14" stroke="#2a160c" stroke-width="1.6"/></g>' : ''}`, `scale(${s})`);
}
function grill(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="30" rx="170" ry="22" fill="#000" opacity=".3"/><rect x="-130" y="-60" width="260" height="84" rx="22" fill="#1c1c24" stroke="#0a0a10" stroke-width="4"/><path d="M-130 -30H130" stroke="#3a3a48" stroke-width="3"/><ellipse cy="-60" rx="130" ry="22" fill="#14141a" stroke="#0a0a10" stroke-width="3"/><ellipse cy="-60" rx="116" ry="16" fill="#ff6a1a"/><ellipse cy="-60" rx="116" ry="16" fill="url(#glow)"/>${Array.from({ length: 13 }, (_, i) => `<path d="M${-108 + i * 18} -72V-48" stroke="#2a2a32" stroke-width="3.6"/>`).join('')}${[[-70, -66, 0], [10, -70, 8], [70, -64, -6]].map(([a, b, r]) => `<g transform="translate(${a},${b}) rotate(${r})"><path d="M-30 4Q-36 -14 -10 -18Q24 -22 34 -4Q30 12 0 12Q-24 14 -30 4Z" fill="#7a2e1a" stroke="#3a1008" stroke-width="2.6"/><path d="M-16 -4l14 -6M-4 4l20 -10M10 6l16 -8" stroke="#2a0a04" stroke-width="3" stroke-linecap="round"/></g>`).join('')}${[-90, -40, 20, 70, 100].map((q, i) => `<path d="M${q} -76Q${q - 10} -100 ${q + 4} -120Q${q + 14} -100 ${q + 4} -76Z" fill="${i % 2 ? '#ff8a2a' : '#ffb030'}" opacity=".85"/>`).join('')}<path d="M-100 -130Q-80 -170 -100 -210M-30 -140Q-10 -180 -34 -230M40 -134Q60 -176 40 -220" stroke="#ddd" stroke-width="12" stroke-linecap="round" fill="none" opacity=".35"/>`, `scale(${s})`);
}
function pergola(S, x, y) {
  G(S, x, y, `${[0, 460].map((q) => `<rect x="${q - 12}" y="-220" width="24" height="230" fill="${WOOD}" stroke="${OL}" stroke-width="3.4"/>`).join('')}<rect x="-30" y="-236" width="520" height="26" fill="${WOOD}" stroke="${OL}" stroke-width="3.4"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${-20 + i * 58}" y="-256" width="14" height="22" fill="${WOOD_D}" stroke="${OL}" stroke-width="2.4"/>`).join('')}<path d="M0 -206Q115 -150 230 -190T460 -206" fill="none" stroke="${OL}" stroke-width="2.4"/>${Array.from({ length: 16 }, (_, i) => { const t = i / 15, px = t * 460, py = -206 + Math.sin(t * Math.PI * 3) * -22 + Math.sin(t * Math.PI) * 52; return `<circle cx="${px}" cy="${py + 8}" r="17" fill="url(#glow)"/><circle cx="${px}" cy="${py + 8}" r="5.4" fill="#fff0c0" stroke="${OL}" stroke-width="1.2"/>`; }).join('')}`);
}
function steakhouse(S, x, y) {
  G(S, x, y, `<path d="M-20 70L70 -20H610L690 70Z" fill="#4a3a3a" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${-10 + i * 12} ${64 - i * 12}H${680 - i * 10}" stroke="#3a2c2c" stroke-width="2.4"/>`).join('')}
  <rect x="0" y="70" width="660" height="470" fill="#b8402f" stroke="${OL}" stroke-width="5"/>${Array.from({ length: 22 }, (_, i) => `<path d="M${i * 30} 70V540" stroke="#8a2a22" stroke-width="2.4"/>`).join('')}
  <rect x="500" y="-60" width="150" height="600" fill="#a89a88" stroke="${OL}" stroke-width="5"/>${Array.from({ length: 15 }, (_, i) => `<path d="M500 ${-40 + i * 40}H650M${520 + (i % 2) * 40} ${-40 + i * 40}v40" stroke="#6a5e50" stroke-width="2.4"/>`).join('')}<path transform="translate(575,70) scale(2.2)" d="M0-9L2.7-3 9-2.4 4.2 1.8 5.6 8 0 4.8 -5.6 8 -4.2 1.8 -9-2.4 -2.7-3Z" fill="#3a5aa8" stroke="#f0e2c2" stroke-width="2"/>
  <ellipse cx="260" cy="30" rx="210" ry="80" fill="url(#neon)"/>
  <g transform="translate(260,28)"><path d="M-130 8Q-146 -34 -80 -52Q-10 -66 70 -50Q140 -36 134 12Q124 56 40 54Q-30 60 -80 52Q-122 46 -130 8Z" fill="#7a2418" stroke="#ff5a6a" stroke-width="7"/><path d="M-130 8Q-146 -34 -80 -52Q-10 -66 70 -50Q140 -36 134 12Q124 56 40 54Q-30 60 -80 52Q-122 46 -130 8Z" fill="none" stroke="#ffd0d0" stroke-width="2.4"/><path d="M-82 -2Q-76 -34 -30 -28Q16 -24 10 6Q4 30 -34 28Q-80 30 -82 -2Z" fill="#c8402f" stroke="#ff9aa0" stroke-width="3"/><path d="M-54 -2Q-34 -14 -14 4M-46 14Q-22 10 -6 18" stroke="#ff9aa0" stroke-width="3" fill="none"/><circle cx="68" cy="2" r="22" fill="#e8b0a0" stroke="#ff5a6a" stroke-width="3"/><circle cx="68" cy="2" r="9" fill="#7a2418"/><path d="M-40 -66Q-30 -88 -40 -108M0 -70Q10 -92 0 -112M40 -66Q50 -88 40 -108" stroke="#ff7a8a" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M-40 -66Q-30 -88 -40 -108M0 -70Q10 -92 0 -112M40 -66Q50 -88 40 -108" stroke="#fff0f0" stroke-width="2" stroke-linecap="round" fill="none"/></g>
  <path d="M-30 190H540L500 252Q250 280 0 252Z" fill="#d8402f" stroke="${OL}" stroke-width="4"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${-30 + i * 60} 190h30l-6 66h-26z" fill="#fff0d8"/>`).join('')}<path d="M-30 190H540V212H-30z" fill="${NAVY}" stroke="${OL}" stroke-width="3"/>${Array.from({ length: 10 }, (_, i) => `<path transform="translate(${10 + i * 52},201) scale(.9)" d="M0-8L2.4-2.6 8-2.2 3.8 1.6 5 7 0 4.2 -5 7 -3.8 1.6 -8-2.2 -2.4-2.6Z" fill="#fff0d8"/>`).join('')}<path d="M-30 252q64 24 128 0t128 0 128 0 128 0 56 0" fill="none" stroke="${OL}" stroke-width="3"/>
  <path d="M-40 150Q-30 120 -10 110L20 190H-40Z" fill="#c8402f" stroke="${OL}" stroke-width="3"/><path d="M-40 150h40" stroke="#fff" stroke-width="5"/><path d="M-40 164l36 0" stroke="${NAVY}" stroke-width="6"/>
  <rect x="190" y="300" width="190" height="240" rx="6" fill="#4a2a14" stroke="${OL}" stroke-width="5"/>${[200, 292].map((q) => `<rect x="${q}" y="310" width="82" height="226" fill="#ffc870" stroke="${OL}" stroke-width="3"/><rect x="${q}" y="310" width="82" height="226" fill="url(#glow)"/><path d="M${q + 41} 310V536M${q} 380H${q + 82}M${q} 450H${q + 82}" stroke="#6a4420" stroke-width="3"/>`).join('')}<path d="M190 300Q285 262 380 300" fill="none" stroke="#6a4420" stroke-width="10"/>
  ${[30, 430].map((q) => `<rect x="${q}" y="300" width="110" height="170" rx="4" fill="#ffc870" stroke="#4a2a14" stroke-width="6"/><rect x="${q}" y="300" width="110" height="170" fill="url(#glow)"/><path d="M${q + 55} 300V470M${q} 385H${q + 110}" stroke="#4a2a14" stroke-width="4"/><path d="M${q + 14} 440h26v-30h-26zM${q + 66} 440h30v-26h-30z" fill="#8a2a22" opacity=".8"/>`).join('')}
  <rect x="-20" y="540" width="700" height="22" fill="#8a7a6a" stroke="${OL}" stroke-width="4"/><path d="M150 562h260v22H150zM120 584h320v22H120z" fill="#c8a878" stroke="${OL}" stroke-width="3"/>
  ${[150, 400].map((q) => `<g transform="translate(${q},300)"><path d="M0 -26V-6" stroke="${OL}" stroke-width="2.4"/><circle cy="30" r="46" fill="url(#glow)"/><rect x="-12" y="-6" width="24" height="42" rx="3" fill="#ffd890" stroke="${OL}" stroke-width="3"/><path d="M-12 14h24M0 -6V36" stroke="${OL}" stroke-width="2"/></g>`).join('')}`);
}
function fence(S, x, y, n) {
  G(S, x, y, `<path d="M0 -26h${n * 46}M0 -50h${n * 46}" stroke="${WOOD_D}" stroke-width="7" stroke-linecap="round"/><path d="M0 -26h${n * 46}M0 -50h${n * 46}" stroke="${WOOD}" stroke-width="3.6" stroke-linecap="round"/>${Array.from({ length: n + 1 }, (_, i) => `<rect x="${i * 46 - 6}" y="-66" width="12" height="70" rx="3" fill="${WOOD}" stroke="${OL}" stroke-width="2.5"/>`).join('')}`);
}
function wheel(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="58" rx="46" ry="9" fill="#000" opacity=".25"/><circle r="52" fill="none" stroke="${OL}" stroke-width="12"/><circle r="52" fill="none" stroke="${WOOD}" stroke-width="7"/>${Array.from({ length: 8 }, (_, i) => `<path transform="rotate(${i * 22.5})" d="M0 -50V50" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path transform="rotate(${i * 22.5})" d="M0 -50V50" stroke="${WOOD}" stroke-width="3.4" stroke-linecap="round"/>`).join('')}<circle r="10" fill="#e0a850" stroke="${OL}" stroke-width="3"/>`, `scale(${s})`);
}
function barrel(S, x, y, s = 1, flowers = true) {
  G(S, x, y, `<ellipse cy="6" rx="40" ry="9" fill="#000" opacity=".28"/><path d="M-32 0Q-40 -36 -32 -70H32Q40 -36 32 0Z" fill="${WOOD}" stroke="${OL}" stroke-width="3.4"/><path d="M-36 -52h72M-37 -18h74" stroke="${OL}" stroke-width="5"/><path d="M-14 -70v70M0 -70v70M14 -70v70" stroke="${WOOD_D}" stroke-width="2"/><ellipse cy="-70" rx="32" ry="8" fill="${WOOD_D}" stroke="${OL}" stroke-width="3"/>
  ${flowers ? [[-18, -92, '#ff6a6a'], [-2, -104, '#fff'], [14, -94, '#ffd84a'], [24, -84, '#ff9ab8'], [-10, -80, '#ffd84a']].map(([a, b, c]) => `<path d="M${a} -70V${b + 8}" stroke="#3f8a3a" stroke-width="3"/><circle cx="${a}" cy="${b}" r="10" fill="${c}" stroke="${OL}" stroke-width="2"/><circle cx="${a}" cy="${b}" r="3.4" fill="#ffd84a"/>`).join('') : ''}`, `scale(${s})`);
}
function hay(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="8" rx="52" ry="10" fill="#000" opacity=".25"/><rect x="-46" y="-56" width="92" height="62" rx="12" fill="#e8c258" stroke="${OL}" stroke-width="3.4"/>${[-30, -14, 2, 18, 34].map((q) => `<path d="M${q} -52V2" stroke="#b8902a" stroke-width="2.4"/>`).join('')}<path d="M-46 -34h92M-46 -14h92" stroke="#8a6a1a" stroke-width="3"/>`, `scale(${s})`);
}
function picnic(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="40" rx="90" ry="14" fill="#000" opacity=".25"/><rect x="-76" y="-8" width="152" height="22" rx="4" fill="${RED}" stroke="${OL}" stroke-width="3"/><path d="M-76 6h152M-38 -8v22M0 -8v22M38 -8v22" stroke="#fff0d8" stroke-width="2.4" opacity=".6"/><rect x="-86" y="24" width="172" height="12" rx="3" fill="${WOOD}" stroke="${OL}" stroke-width="2.6"/><rect x="-86" y="-34" width="172" height="12" rx="3" fill="${WOOD}" stroke="${OL}" stroke-width="2.6"/><path d="M-60 14l-12 30M60 14l12 30M-60 -22l-12 -14M60 -22l12 -14" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>`, `scale(${s})`);
}
function fountain(S, x, y) {
  G(S, x, y, `<ellipse cx="0" cy="20" rx="170" ry="56" fill="#000" opacity=".28"/><ellipse cx="0" cy="0" rx="160" ry="52" fill="#a89a88" stroke="${OL}" stroke-width="4"/>${Array.from({ length: 12 }, (_, i) => `<ellipse cx="${Math.cos(i / 12 * 6.28) * 148}" cy="${Math.sin(i / 12 * 6.28) * 44}" rx="16" ry="8" fill="${i % 2 ? '#8a7a6a' : '#b8aa98'}" stroke="${OL}" stroke-width="1.6"/>`).join('')}<ellipse cx="0" cy="-6" rx="132" ry="38" fill="url(#water)" stroke="#6a5a4a" stroke-width="3"/>
  ${Array.from({ length: 6 }, (_, i) => `<path d="M${-90 + i * 36} ${-6 + (i % 2) * 10}q10 -5 22 0" fill="none" stroke="#fff" stroke-width="2.4" opacity=".55" stroke-linecap="round"/>`).join('')}
  <path d="M-30 -4h60l-8 -34h-44z" fill="#a89a88" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="-38" rx="40" ry="12" fill="#a89a88" stroke="${OL}" stroke-width="3"/><ellipse cx="0" cy="-40" rx="32" ry="8" fill="url(#water)"/>
  <rect x="-7" y="-86" width="14" height="48" fill="#a89a88" stroke="${OL}" stroke-width="3"/><path d="M0 -96Q-38 -126 -66 -74M0 -96Q38 -126 66 -74M0 -96V-54" fill="none" stroke="#d8f0fa" stroke-width="5" stroke-linecap="round" opacity=".85"/>`);
}
function lights(S, x1, x2, y, sag = 36) {
  let h = `<path d="M${x1} ${y}Q${(x1 + x2) / 2} ${y + sag} ${x2} ${y}" fill="none" stroke="${OL}" stroke-width="3"/>`;
  const n = Math.round((x2 - x1) / 52);
  for (let i = 1; i < n; i++) { const t = i / n, px = x1 + (x2 - x1) * t, py = y + sag * 2 * t * (1 - t); h += `<circle cx="${px}" cy="${py + 8}" r="16" fill="url(#glow)"/><circle cx="${px}" cy="${py + 8}" r="6" fill="${['#ffe08a', '#ffb860', '#fff0c8'][i % 3]}" stroke="${OL}" stroke-width="1.4"/>`; }
  return G(S, 0, 0, h);
}
function cactus(S, x, y, s = 1) {
  G(S, x, y, `<ellipse cy="6" rx="26" ry="6" fill="#000" opacity=".25"/><path d="M-10 0V-70Q-10 -86 0 -86T10 -70V0Z" fill="#4a9a4a" stroke="${OL}" stroke-width="3"/><path d="M-10 -28H-24Q-30 -28 -30 -40V-54" fill="none" stroke="${OL}" stroke-width="13" stroke-linecap="round"/><path d="M-10 -28H-24Q-30 -28 -30 -40V-54" fill="none" stroke="#4a9a4a" stroke-width="7" stroke-linecap="round"/><path d="M10 -40H22Q28 -40 28 -50V-60" fill="none" stroke="${OL}" stroke-width="13" stroke-linecap="round"/><path d="M10 -40H22Q28 -40 28 -50V-60" fill="none" stroke="#4a9a4a" stroke-width="7" stroke-linecap="round"/><circle cx="0" cy="-90" r="6" fill="#ff7aa8" stroke="${OL}" stroke-width="1.6"/>`, `scale(${s})`);
}

export function renderSteak(S, LB, chapter, progress) {
  seedRandom(55);
  // sky, sun glow, clouds
  el('rect', { width: WW, height: 760, fill: 'url(#sun)' }, S);
  el('circle', { cx: 1620, cy: 300, r: 210, fill: 'url(#glow)' }, S);
  for (let i = 0; i < 11; i++) { const cx = 100 + i * 230 + rnd() * 90, cy = 40 + rnd() * 150; el('ellipse', { cx, cy, rx: 110 + rnd() * 70, ry: 14 + rnd() * 9, fill: i % 2 ? '#ffd0c8' : '#ffb8b0', opacity: 0.5 }, S); el('ellipse', { cx: cx + 40, cy: cy - 10, rx: 70, ry: 12, fill: '#fff0e0', opacity: 0.45 }, S); }
  // far hills, meadow
  el('path', { d: `M0 420Q260 330 560 400T1180 380T1820 410T${WW} 360V470H0Z`, fill: '#8a7aa8' }, S);
  el('path', { d: `M0 450Q300 380 700 440T1500 420T${WW} 430V520H0Z`, fill: '#7aa04a' }, S);
  el('rect', { x: 0, y: 500, width: WW, height: 90, fill: '#6a9a3a' }, S);
  for (let i = 0; i < 120; i++) { const x = rnd() * WW, y = 470 + rnd() * 120; el('path', { d: `M${x} ${y}l-4 -10M${x} ${y}l0 -12M${x} ${y}l4 -10`, stroke: '#4a7a2a', 'stroke-width': 2.2, 'stroke-linecap': 'round', fill: 'none', opacity: 0.5 }, S); }
  barn(S, 1980, 520, 1); windmill(S, 1560, 540, 1.15);
  cow(S, 1180, 560, 1); cow(S, 1290, 572, 0.85); cow(S, 1420, 556, 0.8);
  fence(S, 900, 590, 28);
  tree(S, 960, 470, 1.35); tree(S, 2290, 470, 0.9); tree(S, 60, 420, 0.9);
  // flagstone plaza
  el('path', { d: `M0 600Q500 580 1100 610T2400 600V${WH}H0Z`, fill: '#a8909a' }, S);
  const cols = ['#b8a0a8', '#a8909a', '#c4aab0', '#9a8490', '#bca4a4', '#b09aa0'];
  for (let ty = 600, row = 0; ty < WH; ty += 54, row++) for (let tx = -40 + (row % 2) * 60; tx < WW; tx += 120) el('rect', { x: tx + 2, y: ty + 2, width: 112 + rnd() * 6, height: 48, rx: 10, fill: cols[Math.floor(rnd() * cols.length)], stroke: '#6a5460', 'stroke-width': 2, opacity: 0.95 }, S);
  el('rect', { x: 0, y: 600, width: WW, height: WH - 600, fill: 'url(#glow)', opacity: 0.1 }, S);

  steakhouse(S, 200, 120);
  wheel(S, 900, 700, 1.15);
  pergola(S, 1050, 650);
  gtable(S, 1130, 800, 0.9); gtable(S, 1450, 790, 0.9);
  chair(S, 1060, 860, 1, 0.9); chair(S, 1202, 862, -1, 0.9); chair(S, 1382, 852, 1, 0.9); chair(S, 1522, 850, -1, 0.9);

  // stone path
  const YS = [1230, 1140, 1240, 1140, 1240, 1140, 1240, 1150];
  const spots = YS.map((y, i) => [280 + i * 235, y]);
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
  el('path', { ...rd, stroke: '#d8c8a0', 'stroke-width': 74 }, S);
  el('path', { ...rd, stroke: '#f6ecd0', 'stroke-width': 62 }, S);
  el('path', { ...rd, stroke: '#fff8e4', 'stroke-width': 34, opacity: 0.7 }, S);
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
  bush(S, 1500, 790, 1.1); bush(S, 1850, 880, 1); bush(S, 640, 1440, 1); bush(S, 1000, 1450, 1.1);
  fountain(S, 1640, 940); boulder(S, 1380, 960, 1); boulder(S, 1880, 1010, 0.9); boulder(S, 1480, 1030, 0.7);
  gtable(S, 230, 990, 0.9); chair(S, 140, 1050, 1, 0.9); chair(S, 322, 1052, -1, 0.9);
  lantern(S, 700, 1040, 1.3); lantern(S, 1500, 1050, 1.2); lantern(S, 470, 830, 1.1);
  barrel(S, 100, 880, 1); barrel(S, 720, 820, 0.9); barrel(S, 1700, 1440, 0.9); barrel(S, 2330, 1440, 1);
  hay(S, 1780, 720, 0.9);
  grill(S, 2170, 970, 1);
  cactus(S, 1330, 1445, 0.9);
  lights(S, 40, 760, 640, 40); lights(S, 1700, 2380, 640, 40);

  // stops (cream coins)
  const star5 = (x, y, on) => `<path transform="translate(${x},${y}) scale(1.4)" d="M0-9L2.7-3 9-2.4 4.2 1.8 5.6 8 0 4.8 -5.6 8 -4.2 1.8 -9-2.4 -2.7-3Z" fill="${on ? '#ffd84a' : '#8a8478'}" stroke="#14100f" stroke-width="1.2"/>`;
  lvl.forEach((l) => {
    const [x, y] = l.pos, lock = l.st === 'lock';
    const n = el('g', { class: 'node', 'data-n': l.n, transform: `translate(${x},${y})`, tabindex: lock ? -1 : 0, role: 'button', 'aria-label': `Level ${l.n}, ${l.name}, ` + (lock ? 'locked' : l.st === 'now' ? 'next up' : l.s + ' stars') }, S);
    el('ellipse', { cy: 18, rx: 58, ry: 22, fill: '#000', opacity: 0.4 }, n);
    const u = el('g', { class: 'lift' }, n);
    if (l.st === 'now') el('ellipse', { rx: 58, ry: 28, fill: '#ffd890', class: 'pulse' }, u);
    const top = lock ? '#cfc6b4' : l.st === 'now' ? '#fff4d0' : '#fff0c0', edge = lock ? '#8a8272' : '#d8b860';
    el('path', { d: 'M-48 0v16a48 22 0 0 0 96 0v-16Z', fill: edge, stroke: OL, 'stroke-width': 2.2 }, u);
    el('ellipse', { class: 'ring', rx: 48, ry: 23, fill: top, stroke: OL, 'stroke-width': 2.6 }, u);
    el('ellipse', { rx: 38, ry: 17, fill: 'none', stroke: lock ? '#a89c88' : '#e0c070', 'stroke-width': 2, opacity: 0.85, 'stroke-dasharray': '4 5' }, u);
    const t = el('text', { y: 10, 'text-anchor': 'middle', 'font-family': 'Rye,serif', 'font-size': 28, fill: lock ? '#9a907c' : l.st === 'now' ? '#b03a30' : '#8a5a1a', stroke: '#fffbe8', 'stroke-width': 1.2, 'paint-order': 'stroke' }, u); t.textContent = l.n;
    if (lock) el('g', { transform: 'translate(0,-28) scale(1.4)' }, u).innerHTML = '<rect x="-7" y="-2" width="14" height="11" rx="2" fill="#8a8272" stroke="#14100f"/><path d="M-4-2V-6a4 4 0 0 1 8 0V-2" fill="none" stroke="#14100f" stroke-width="2"/>';
    const g = el('g', { transform: `translate(${x},${y})`, 'pointer-events': 'none' }, LB);
    const lab = el('g', { transform: 'translate(0,70)' }, g);
    el('rect', { x: -90, y: -17, width: 180, height: 32, rx: 8, fill: '#4a2c1c', stroke: lock ? '#8a7e72' : '#e0a850', 'stroke-width': 2 }, lab);
    const tt = el('text', { y: 6, 'text-anchor': 'middle', 'font-family': 'Josefin Sans', 'font-weight': 700, 'font-size': 18, fill: lock ? '#c8bcb0' : '#ffe9c0' }, lab); tt.textContent = l.name;
    if (!lock) el('g', { transform: 'translate(0,-56)' }, g).innerHTML = star5(-30, 0, l.s >= 1) + star5(0, -8, l.s >= 2) + star5(30, 0, l.s >= 3);
    if (l.n === chapter.levels.length) el('path', { transform: 'translate(0,-100)', d: 'M-20 0L-12-16-3-4 0-20 3-4 12-16 20 0Z', fill: '#e0a850', stroke: OL, 'stroke-width': 1.5 }, g);
  });
  return { nodes: lvl, board: { x: 2290, y: 1190, dir: 1 }, home: (lvl.find((l) => l.st === 'now') || lvl[lvl.length - 1]).pos };
}
