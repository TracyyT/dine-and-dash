// Chapter 3 map: a dusk-lit Chinese restaurant courtyard. Red storefront with a striped awning and a 福 sign on the left, cherry blossoms,
// a canal with a stone arch bridge and a pagoda behind, a lily pond with a glowing lantern, and a glowing path of round red stepping coins.
// The scenery is drawn in a 848x468 "picture" space and scaled up into the 2400x1500 world, so shapes can be placed straight from a reference.
import { el, seedRandom, rnd, WW } from './iso.js';

export const CHINESE_DEFS = `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3f8c"/><stop offset=".1" stop-color="#7a58a4"/><stop offset=".2" stop-color="#d27a9a"/><stop offset=".29" stop-color="#ffb08a"/><stop offset=".37" stop-color="#ffd2a0"/><stop offset=".371" stop-color="#4c7a5a"/><stop offset="1" stop-color="#3a6650"/></linearGradient>
<radialGradient id="sun" cx=".6" cy=".22" r=".5"><stop offset="0" stop-color="#fff0c0" stop-opacity=".55"/><stop offset="1" stop-color="#ffb07a" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#1a0a20" stop-opacity="0"/><stop offset="1" stop-color="#1a0a20" stop-opacity=".4"/></radialGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd070" stop-opacity=".85"/><stop offset="1" stop-color="#ffb040" stop-opacity="0"/></radialGradient>
<linearGradient id="canal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8a0a0"/><stop offset=".5" stop-color="#7a8cc0"/><stop offset="1" stop-color="#3a5a98"/></linearGradient>
<linearGradient id="pond" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a7cc0"/><stop offset="1" stop-color="#2a4a8a"/></linearGradient>
<linearGradient id="awn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d23a34"/><stop offset="1" stop-color="#b02a2a"/></linearGradient>
<pattern id="cobble" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#d8c8a8"/><path d="M0 0H22M0 11H22M0 0V11M11 11V22M0 22H22" stroke="#a8967a" stroke-width="1.3" fill="none"/><rect x="2" y="2" width="7" height="2.5" rx="1" fill="#efe4c8" opacity=".7"/><rect x="13" y="13" width="6" height="2.5" rx="1" fill="#efe4c8" opacity=".7"/></pattern>
<pattern id="tiles" width="12" height="9" patternUnits="userSpaceOnUse"><rect width="12" height="9" fill="#3a3550"/><path d="M0 9Q6 3 12 9M-6 4.5Q0 -1 6 4.5M6 4.5Q12 -1 18 4.5" stroke="#5a5478" stroke-width="1.2" fill="none"/></pattern>
</defs>`;

const OL = '#3a1a14';
const SC = 2.83, TY = 110; // picture space -> world
const wx = (x) => x * SC, wy = (y) => TY + y * SC;

const blossom = (x, y, r, c = '#ffb3c7', d = '#ff8fb0') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x}" cy="${y}" r="${r * .38}" fill="${d}"/>`;
const flower = (x, y, r, c = '#ffc2d4') => `<g transform="translate(${x},${y})">${[0, 72, 144, 216, 288].map((a) => `<ellipse cy="${-r * .62}" rx="${r * .46}" ry="${r * .6}" fill="${c}" stroke="#d9729a" stroke-width="${r * .08}" transform="rotate(${a})"/>`).join('')}<circle r="${r * .22}" fill="#ffd84a"/></g>`;
const lantern = (x, y, s = 1, glow = true) => `<g transform="translate(${x},${y}) scale(${s})">${glow ? '<circle cy="8" r="22" fill="url(#glow)"/>' : ''}<path d="M0-14V-8" stroke="#e8b64a" stroke-width="1.6"/><rect x="-5" y="-9" width="10" height="3" rx="1" fill="#e8b64a"/><ellipse cy="4" rx="8.5" ry="10.5" fill="#e0342a" stroke="#8a1410" stroke-width="1.4"/><path d="M0-6Q-5 4 0 14M0-6Q5 4 0 14" stroke="#8a1410" stroke-width=".9" fill="none"/><ellipse cy="4" rx="8.5" ry="10.5" fill="#ffd060" opacity=".22"/><rect x="-4.5" y="14" width="9" height="2.6" fill="#e8b64a"/><path d="M0 16.6v8M-2 16.6v6M2 16.6v6" stroke="#e8b64a" stroke-width="1.1"/></g>`;
const skyLantern = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><circle r="14" fill="url(#glow)"/><rect x="-4" y="-6" width="8" height="11" rx="1.5" fill="#ff9a3a" stroke="#c2561a" stroke-width=".8"/><rect x="-3" y="-3" width="6" height="5" fill="#ffe08a" opacity=".8"/></g>`;

function sky() {
  const stars = [];
  for (let i = 0; i < 18; i++) stars.push(skyLantern(20 + rnd() * 800, 6 + rnd() * 90, 0.5 + rnd() * 0.6));
  const cloud = (x, y, w) => `<path d="M${x} ${y}q${w * .1} -9 ${w * .2} 0q${w * .12} -10 ${w * .22} 0q${w * .1} -7 ${w * .2} 0" fill="none" stroke="#fff" stroke-width="3" opacity=".3" stroke-linecap="round"/>`;
  return `${cloud(120, 36, 90)}${cloud(380, 22, 110)}${cloud(620, 50, 90)}${cloud(250, 78, 80)}${stars.join('')}`;
}
function mountains() {
  const m = (pts, c, hi) => `<path d="${pts}" fill="${c}"/><path d="${hi}" fill="none" stroke="#fff" stroke-width="2" opacity=".14"/>`;
  return m('M230 175Q290 120 340 70Q380 110 420 130Q470 100 520 170Z', '#9a86be', 'M340 70Q350 110 395 140')
    + m('M470 175Q560 120 610 60Q650 40 700 70Q760 100 848 90V180H470Z', '#7e6aa6', 'M610 60Q640 100 690 140')
    + m('M520 180Q600 140 660 110Q720 80 780 120T848 130V185H520Z', '#6a5a98', '')
    + `<path d="M520 182Q650 160 848 150V190H520Z" fill="#8a78b0" opacity=".35"/>`;
}
function pagoda(x, y, s = 1) {
  const tier = (i) => { const w = 44 - i * 6, yy = -i * 25; return `<rect x="${-w / 2 + 4}" y="${yy - 18}" width="${w - 8}" height="18" fill="#e0a85a" stroke="${OL}" stroke-width="1.2"/><rect x="${-w / 2 + 8}" y="${yy - 14}" width="${w - 16}" height="9" fill="#ffd98a" opacity=".85"/><path d="M${-w / 2 - 10} ${yy - 17}Q0 ${yy - 32} ${w / 2 + 10} ${yy - 17}L${w / 2 + 5} ${yy - 11}H${-w / 2 - 5}Z" fill="#3a2f55" stroke="${OL}" stroke-width="1.4"/><path d="M${-w / 2 - 10} ${yy - 17}Q${-w / 2 - 14} ${yy - 20} ${-w / 2 - 12} ${yy - 24}M${w / 2 + 10} ${yy - 17}Q${w / 2 + 14} ${yy - 20} ${w / 2 + 12} ${yy - 24}" stroke="${OL}" stroke-width="1.2" fill="none"/>`; };
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cy="3" rx="46" ry="6" fill="#000" opacity=".2"/>${[0, 1, 2, 3, 4].map(tier).join('')}<path d="M0-132V-150" stroke="#e8b64a" stroke-width="2"/><circle cy="-134" r="3.2" fill="#e8b64a"/></g>`;
}
function house(x, y, w, h, hue = '#5a4a70') {
  return `<g transform="translate(${x},${y})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="#5a2a30" stroke="${OL}" stroke-width="1.2"/><rect x="${-w / 2 + 4}" y="${-h + 6}" width="${w - 8}" height="${h - 10}" fill="#ffc870"/><path d="M${-w / 2 + 4} ${-h + 6}V${-4}M${w / 2 - 4} ${-h + 6}V${-4}M0 ${-h + 6}V${-4}" stroke="#7a4a20" stroke-width="1"/>
  <path d="M${-w / 2 - 12} ${-h + 2}Q${-w / 2 + 4} ${-h - 4} 0 ${-h - 22}Q${w / 2 - 4} ${-h - 4} ${w / 2 + 12} ${-h + 2}Q0 ${-h - 6} ${-w / 2 - 12} ${-h + 2}Z" fill="${hue}" stroke="${OL}" stroke-width="1.4"/><path d="M${-w / 2 - 12} ${-h + 2}Q0 ${-h - 6} ${w / 2 + 12} ${-h + 2}" fill="none" stroke="#e8b64a" stroke-width="1"/></g>`;
}
function village() {
  return `<rect x="300" y="168" width="548" height="20" fill="#5a3a58"/>`
    + [[345, 175, 48, 22, '#4a3f64'], [418, 172, 40, 20, '#3f3a58'], [575, 174, 56, 24, '#4a3f64'], [640, 170, 42, 20, '#3f3a58'], [510, 170, 34, 18, '#52446c']].map((a) => house(...a)).join('')
    + `<path d="M330 150Q370 160 410 148T480 150" stroke="#2a1a2a" stroke-width="1" fill="none"/>` + [345, 372, 400, 428, 456].map((x, i) => lantern(x, 154 + (i % 2) * 2, 0.34)).join('')
    + [[470, 168, 16], [560, 166, 14], [684, 170, 14]].map(([x, y, r]) => `<rect x="${x - 1.5}" y="${y}" width="3" height="12" fill="#5a3a2c"/><circle cx="${x}" cy="${y}" r="${r}" fill="#f08fb0"/><circle cx="${x - 6}" cy="${y - 4}" r="${r * .55}" fill="#ffc2d4"/><circle cx="${x + 6}" cy="${y + 2}" r="${r * .5}" fill="#ff9fbd"/>`).join('');
}
function canal() {
  const refl = [320, 380, 440, 520, 600, 660, 740].map((x, i) => `<rect x="${x}" y="${192 + (i % 2) * 6}" width="${10 + (i % 3) * 6}" height="2.4" rx="1.2" fill="${i % 2 ? '#ffd890' : '#ff9a8a'}" opacity=".55"/>`).join('');
  return `<path d="M240 186H848V232Q700 238 560 232T300 236Q255 222 240 186Z" fill="url(#canal)"/>${refl}<path d="M240 186H848" stroke="#e8d8b0" stroke-width="4"/><path d="M260 230Q420 222 600 232T848 228V240H260Z" fill="#8a7a62" opacity=".5"/>`;
}
function backBridge() {
  const bal = Array.from({ length: 14 }, (_, i) => `<rect x="${462 + i * 13.4}" y="${167 + Math.abs(i - 6.5) * .5}" width="3.4" height="9" rx="1" fill="#d8ccb4" stroke="#8a7a66" stroke-width=".6"/>`).join('');
  return `<g><path d="M442 190Q540 150 640 190V204H442Z" fill="#cbbfa4" stroke="#7a6a56" stroke-width="1.6"/><path d="M468 204Q540 168 614 204Z" fill="#5a4a6a" stroke="#7a6a56" stroke-width="1.2"/><path d="M482 204Q541 176 600 204Z" fill="#ffc070" opacity=".75"/>${bal}<path d="M458 172Q540 140 628 172" fill="none" stroke="#e6dcc4" stroke-width="3.2"/><circle cx="458" cy="171" r="3.4" fill="#e6dcc4"/><circle cx="628" cy="171" r="3.4" fill="#e6dcc4"/>${lantern(458, 160, 0.4)}${lantern(628, 160, 0.4)}</g>`;
}
function ground() {
  return `<path d="M0 195H848V468H0Z" fill="#4e7a5a"/><path d="M0 200Q200 214 330 206Q420 230 520 232T848 232V300Q700 290 640 280Q420 270 300 300L0 330Z" fill="#59855f" opacity=".8"/>`
    + `<path d="M0 300Q150 330 330 318Q360 340 372 400Q250 440 0 460Z" fill="#d6c6a4" stroke="#a8967a" stroke-width="2"/>`;
}
function grassBlades() {
  let s = '';
  for (let i = 0; i < 90; i++) { const x = rnd() * 848, y = 215 + rnd() * 250; s += `<path d="M${x} ${y}q1.4 -6 2.8 0M${x + 3.6} ${y}q1.4 -4 2.8 0" fill="none" stroke="#3a6a44" stroke-width="1.1" opacity=".5" stroke-linecap="round"/>`; }
  return s;
}

// ----- the restaurant on the left -----
function restaurant() {
  const win = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#ffd27a" stroke="#7a1a1a" stroke-width="3"/><rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" fill="#ffe7a8" opacity=".9"/>`
    + `<g stroke="#8a4a1a" stroke-width="1.5" fill="none"><path d="M${x + w / 2} ${y}V${y + h}M${x} ${y + h / 2}H${x + w}"/>${Array.from({ length: Math.round(w / 14) }, (_, i) => `<path d="M${x + 7 + i * 14} ${y + 3}l7 ${h / 2 - 3}l-7 ${h / 2 - 3}l-7 -${h / 2 - 3}Z"/>`).join('')}</g>`;
  const interior = (x, y, w, h) => `<g clip-path="url(#cl)"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffd890"/>${[0, 1].map((i) => `<ellipse cx="${x + 30 + i * 64}" cy="${y + h - 14}" rx="17" ry="6" fill="#fff6e0" stroke="#a87a42" stroke-width="1"/><path d="M${x + 22 + i * 64} ${y + h - 14}v12M${x + 38 + i * 64} ${y + h - 14}v12" stroke="#a87a42" stroke-width="1.4"/>${lantern(x + 30 + i * 64, y + 12, 0.5)}`).join('')}</g>`;
  const awning = Array.from({ length: 11 }, (_, i) => { const x = 94 + i * 20.5; return `<path d="M${x} 112L${x + 20.5} 112L${x + 21.5 + (i % 2 ? 0 : 0)} 154Q${x + 11} 162 ${x + 1} 154Z" fill="${i % 2 ? '#8e1e24' : '#d8423a'}" stroke="#5a0f14" stroke-width="1"/>`; }).join('');
  return `<defs><clipPath id="cl"><rect x="68" y="176" width="148" height="118"/></clipPath></defs>
  <!-- roof and upper wall -->
  <rect x="40" y="46" width="300" height="70" fill="#5a2224" stroke="${OL}" stroke-width="2"/>
  <rect x="40" y="46" width="300" height="70" fill="url(#tiles)" opacity="0"/>
  <path d="M10 66Q60 54 70 16V0H350V16Q362 56 384 66Q340 66 322 60L48 60Q30 66 10 66Z" fill="url(#tiles)" stroke="${OL}" stroke-width="2.4"/>
  <path d="M10 66Q60 54 70 16M384 66Q362 56 350 16" fill="none" stroke="#e8b64a" stroke-width="2"/>
  <path d="M22 66Q100 60 196 62T372 66" fill="none" stroke="#e8b64a" stroke-width="2.4"/>
  <rect x="60" y="68" width="260" height="44" fill="#7a2a2c"/>
  ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${72 + i * 36}" y="76" width="22" height="26" rx="2" fill="#ffd27a" stroke="#4a1414" stroke-width="2"/><path d="M${83 + i * 36} 76V102M${72 + i * 36} 89H${94 + i * 36}" stroke="#8a4a1a" stroke-width="1"/>`).join('')}
  ${lantern(68, 112, 0.9)}${lantern(336, 106, 0.8)}
  <!-- front wall -->
  <rect x="56" y="112" width="288" height="210" fill="#8a2024" stroke="${OL}" stroke-width="2.4"/>
  ${win(68, 174, 150, 124)}${interior(68, 176, 148, 120)}
  <rect x="68" y="174" width="150" height="124" rx="2" fill="none" stroke="#7a1a1a" stroke-width="4"/>
  <g stroke="#e8b64a" stroke-width="1.5" fill="none" opacity=".85">${Array.from({ length: 9 }, (_, i) => `<path d="M${83 + i * 15} 174V298"/>`).join('')}${Array.from({ length: 8 }, (_, i) => `<path d="M68 ${189 + i * 15}H218"/>`).join('')}</g>
  <!-- door -->
  <rect x="226" y="176" width="68" height="146" fill="#5a1418" stroke="${OL}" stroke-width="2.4"/>
  <rect x="232" y="182" width="26" height="136" fill="#ffd070"/><rect x="262" y="182" width="26" height="136" fill="#ffd070"/>
  <g stroke="#8a4a1a" stroke-width="1.6" fill="none">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M232 ${182 + i * 22.6}H258M262 ${182 + i * 22.6}H288"/>`).join('')}<path d="M245 182V318M275 182V318"/></g>
  <rect x="230" y="180" width="62" height="140" fill="none" stroke="#c8322c" stroke-width="3"/>
  <circle cx="258" cy="260" r="2.4" fill="#e8b64a"/><circle cx="266" cy="260" r="2.4" fill="#e8b64a"/>
  <rect x="304" y="176" width="34" height="124" rx="2" fill="#ffd27a" stroke="#7a1a1a" stroke-width="3"/><path d="M321 176V300M304 238H338" stroke="#8a4a1a" stroke-width="1.5"/>
  <!-- pillars -->
  ${[60, 222, 298, 342].map((x) => `<rect x="${x - 5}" y="110" width="10" height="214" fill="#b3242a" stroke="${OL}" stroke-width="1.6"/><rect x="${x - 7}" y="316" width="14" height="10" fill="#5a2a1a"/>`).join('')}
  <!-- stoop -->
  <path d="M40 322H352V334H40Z" fill="#c9b894" stroke="#7a6a56" stroke-width="1.8"/><path d="M30 334H362V344H30Z" fill="#b5a47e" stroke="#7a6a56" stroke-width="1.8"/>
  <!-- awning, sign -->
  <path d="M86 110H316L326 158H76Z" fill="#8e1e24"/>${awning}<path d="M86 110H316" stroke="#5a0f14" stroke-width="3"/>
  <path d="M76 158Q200 166 326 158" fill="none" stroke="#e8b64a" stroke-width="1.6" opacity=".6"/>
  <circle cx="213" cy="160" r="24" fill="#b3242a" stroke="#e8b64a" stroke-width="4"/><circle cx="213" cy="160" r="18.5" fill="none" stroke="#e8b64a" stroke-width="1.4"/>
  <text x="213" y="171" text-anchor="middle" font-size="31" font-weight="700" fill="#ffe39a" font-family="Ma Shan Zheng,Noto Serif SC,Songti SC,STKaiti,KaiTi,serif">福</text>
  ${lantern(96, 170, 1.15)}${lantern(318, 166, 1)}
  `;
}
function easel() {
  return `<g transform="translate(160,278)"><ellipse cy="46" rx="26" ry="5" fill="#000" opacity=".22"/><path d="M-22 44L-14 -34M22 44L14 -34M0 44V-30" stroke="#6a4020" stroke-width="3.4" stroke-linecap="round"/><rect x="-24" y="-38" width="48" height="58" rx="3" fill="#6a4020" stroke="${OL}" stroke-width="2"/><rect x="-20" y="-34" width="40" height="50" rx="2" fill="#2f2a28"/><path d="M-14 -4Q0 12 14 -4Z" fill="#fff6e8" stroke="#c9b894" stroke-width="1"/><path d="M-9 -4Q-6 -14 0 -9Q6 -14 9 -4Z" fill="#fde3b4" stroke="#c9a46a" stroke-width="1"/><path d="M-8 -22q2 -6 0 -9M0 -22q2 -6 0 -9M8 -22q2 -6 0 -9" stroke="#ffffff" stroke-width="1.2" fill="none" opacity=".7" stroke-linecap="round"/><path d="M-14 -28H14" stroke="#ffd84a" stroke-width="1.4" stroke-dasharray="3 2"/><path d="M-12 12H12" stroke="#fff" stroke-width="1" opacity=".6"/></g>`;
}
function lion() {
  return `<g transform="translate(52,308)"><ellipse cy="20" rx="30" ry="6" fill="#000" opacity=".22"/><rect x="-26" y="-6" width="52" height="28" rx="3" fill="#cfc8bc" stroke="#6a6258" stroke-width="2"/><rect x="-30" y="16" width="60" height="9" rx="2" fill="#b9b2a6" stroke="#6a6258" stroke-width="2"/>
  <path d="M-18 -8Q-22 -34 -8 -44Q-12 -62 4 -66Q22 -68 22 -48Q28 -34 20 -8Z" fill="#d9d3c8" stroke="#6a6258" stroke-width="2"/><circle cx="2" cy="-50" r="18" fill="#cfc8bc" stroke="#6a6258" stroke-width="2"/><g fill="#cfc8bc" stroke="#6a6258" stroke-width="1.4">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${2 + Math.cos(i * .785) * 17}" cy="${-50 + Math.sin(i * .785) * 17}" r="5.5"/>`).join('')}</g><circle cx="2" cy="-50" r="13" fill="#e2dccf" stroke="#6a6258" stroke-width="1.4"/><circle cx="-3" cy="-53" r="2.2" fill="#3a352e"/><circle cx="7" cy="-53" r="2.2" fill="#3a352e"/><path d="M-3 -46Q2 -42 7 -46" fill="none" stroke="#3a352e" stroke-width="1.6"/><circle cx="2" cy="-48" r="2.4" fill="#8a8274"/><path d="M-14 -62Q-18 -72 -8 -68M18 -62Q22 -72 12 -68" fill="#d9d3c8" stroke="#6a6258" stroke-width="1.6"/></g>`;
}
function pot(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cy="4" rx="22" ry="5" fill="#000" opacity=".2"/>${[[-12, -26, -50], [0, -34, -10], [12, -26, 40], [-4, -22, -28], [6, -22, 20]].map(([a, h, r]) => `<path d="M0 -14Q${a * 2} ${h - 10} ${a * 2.8} ${h - 24}Q${a * 1.2} ${h - 14} 0 -14Z" fill="#5fae52" stroke="#2c6a2c" stroke-width="1.4" transform="rotate(${r * .25})"/>`).join('')}<path d="M-14 -14H14L11 4H-11Z" fill="#c4683a" stroke="#6a2a14" stroke-width="1.6"/><rect x="-15" y="-17" width="30" height="5" rx="2" fill="#d9794a" stroke="#6a2a14" stroke-width="1.4"/></g>`;
}
function branch() {
  const fl = [[18, 26, 11], [46, 18, 13], [78, 30, 12], [104, 14, 10], [132, 38, 11], [160, 24, 12], [188, 12, 10], [214, 30, 11], [34, 56, 12], [66, 62, 11], [98, 70, 10], [20, 86, 10], [150, 62, 10], [176, 52, 12], [236, 8, 9], [58, 40, 9], [122, 56, 9], [200, 56, 9], [6, 50, 10], [82, 98, 8], [-4, 110, 9]];
  return `<path d="M-6 74Q40 42 90 52Q150 62 190 24Q220 4 250 -6" fill="none" stroke="#5a3a2c" stroke-width="7" stroke-linecap="round"/><path d="M60 50Q80 78 110 82M140 54Q160 40 168 20M20 58Q10 84 -4 98" fill="none" stroke="#5a3a2c" stroke-width="3.6" stroke-linecap="round"/>${fl.map(([x, y, r], i) => `<g>${blossom(x, y, r + 2, i % 3 ? '#ffb3c7' : '#ff9fbd', '#e8709a')}${flower(x - 3, y - 2, r * .9, i % 2 ? '#ffc2d4' : '#ffd0de')}</g>`).join('')}`;
}
function sakuraTree(x, y, s = 1) {
  const cl = [[-44, -92, 34], [-6, -118, 40], [38, -100, 36], [-26, -72, 30], [24, -70, 30], [58, -68, 24], [-64, -66, 22], [0, -92, 30]];
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cy="6" rx="52" ry="8" fill="#000" opacity=".2"/><path d="M0 4Q-6 -34 -12 -66M2 -26Q24 -50 40 -68" stroke="#5a3a2c" stroke-width="7" fill="none" stroke-linecap="round"/>${cl.map(([a, b, r], i) => `<circle cx="${a}" cy="${b}" r="${r}" fill="${['#f7a3bf', '#ffb8cc', '#f08fb0', '#ffc6d6'][i % 4]}"/>`).join('')}${Array.from({ length: 18 }, (_, i) => flower(-70 + (i * 37) % 140, -128 + ((i * 53) % 90), 7 + (i % 3), i % 2 ? '#ffd2e0' : '#ff9fbd')).join('')}${Array.from({ length: 6 }, (_, i) => `<circle cx="${-50 + i * 20}" cy="${4 + (i % 2) * 4}" r="2.4" fill="#ffc2d4"/>`).join('')}</g>`;
}
function bamboo(x, y, s = 1) {
  const stalk = (q, h, k) => `<rect x="${q - 3.6}" y="${y - h}" width="7.2" height="${h}" rx="3" fill="${k % 2 ? '#78b85e' : '#6aab55'}" stroke="#2f6a2a" stroke-width="1.2"/>${[0.2, 0.45, 0.7].map((f) => `<path d="M${q - 4} ${y - h * f}h8" stroke="#2f6a2a" stroke-width="1.6"/>`).join('')}<path d="M${q + 3} ${y - h * .78}q18 -4 22 -16-14 4-22 16ZM${q - 3} ${y - h * .55}q-18 -4 -22 -16 14 4 22 16ZM${q + 3} ${y - h * .35}q14 -3 18 -13-11 3-18 13Z" fill="#8fd070" stroke="#2f6a2a" stroke-width="1"/>`;
  return `<g transform="scale(${s})">${[[-14, 200, 0], [-2, 232, 1], [12, 190, 2], [24, 214, 3]].map(([q, h, k]) => stalk(x + q, h, k)).join('')}</g>`;
}
function stoneLantern(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cy="4" rx="22" ry="5" fill="#000" opacity=".25"/><rect x="-12" y="-14" width="24" height="18" rx="2" fill="#8a8478" stroke="#3a352e" stroke-width="1.6"/><rect x="-7" y="-52" width="14" height="38" fill="#9a9488" stroke="#3a352e" stroke-width="1.6"/><circle cy="-36" r="30" fill="url(#glow)"/><rect x="-14" y="-72" width="28" height="22" rx="2" fill="#ffd070" stroke="#3a352e" stroke-width="1.8"/><path d="M0 -72V-50M-14 -61H14" stroke="#3a352e" stroke-width="1.2"/><path d="M-26 -72L0 -92L26 -72Z" fill="#8a8478" stroke="#3a352e" stroke-width="1.8"/><path d="M-22 -74Q0 -80 22 -74" fill="none" stroke="#b8b2a4" stroke-width="1.4"/><circle cy="-95" r="4" fill="#9a9488" stroke="#3a352e" stroke-width="1.4"/></g>`;
}
function boxLantern(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cy="6" rx="30" ry="6" fill="#000" opacity=".25"/><circle cy="-18" r="38" fill="url(#glow)"/><rect x="-18" y="-40" width="36" height="42" rx="3" fill="#ffd27a" stroke="#6a3a1a" stroke-width="2.4"/><path d="M-18 -26H18M-18 -12H18M0 -40V2" stroke="#8a4a1a" stroke-width="1.6"/><rect x="-22" y="-46" width="44" height="8" rx="2" fill="#7a2a1a" stroke="#3a1a14" stroke-width="2"/><rect x="-22" y="0" width="44" height="7" rx="2" fill="#7a2a1a" stroke="#3a1a14" stroke-width="2"/></g>`;
}
function lily(x, y, s = 1, flower_ = true) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse rx="15" ry="5.5" fill="#4aa860" stroke="#1f5a30" stroke-width="1.3"/><path d="M0 0L15 -1" stroke="#2a7a40" stroke-width="1"/>${flower_ ? `<g transform="translate(0,-3)">${[-40, -20, 0, 20, 40].map((a) => `<path d="M0 0Q-5 -9 0 -15Q5 -9 0 0Z" fill="#ffb3d0" stroke="#c85a8a" stroke-width="1" transform="rotate(${a})"/>`).join('')}<circle cy="-2" r="2" fill="#ffd84a"/></g>` : ''}</g>`;
}
function frontBridge() {
  const posts = Array.from({ length: 9 }, (_, i) => { const t = i / 8, x = 462 + t * 250, yTop = 300 - Math.sin(t * Math.PI) * 52; return `<rect x="${x - 4}" y="${yTop}" width="8" height="22" rx="1.5" fill="#d8ccb4" stroke="#8a7a66" stroke-width="1"/>`; }).join('');
  const rail = (dy) => `<path d="M458 ${324 + dy}Q585 ${240 + dy} 716 ${324 + dy}" fill="none" stroke="#e6dcc4" stroke-width="6" stroke-linecap="round"/><path d="M458 ${324 + dy}Q585 ${240 + dy} 716 ${324 + dy}" fill="none" stroke="#a8967a" stroke-width="1.4"/>`;
  return `<g><path d="M440 372Q585 262 730 372V392H440Z" fill="#cbbfa4" stroke="#7a6a56" stroke-width="2.4"/><path d="M440 374Q585 270 730 374" fill="none" stroke="#e8dcc0" stroke-width="5"/>
  <path d="M482 392Q585 306 690 392Z" fill="#4a3a62" stroke="#7a6a56" stroke-width="2"/><path d="M498 392Q585 322 674 392Z" fill="#ff9a40" opacity=".7"/><path d="M512 392Q585 338 660 392Z" fill="#ffd070" opacity=".75"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${470 + i * 21} ${382 - Math.sin((i + .5) / 12 * Math.PI) * 40}v-8" stroke="#a8967a" stroke-width="1"/>`).join('')}
  ${posts}${rail(0)}${rail(-18)}
  <ellipse cx="585" cy="408" rx="130" ry="10" fill="#ffd070" opacity=".35"/></g>`;
}
function pondWater() {
  return `<path d="M430 392Q470 372 585 378T760 392Q830 410 848 430V468H420Q400 430 430 392Z" fill="url(#pond)" stroke="#d8cdb0" stroke-width="3"/><path d="M430 400Q585 384 760 400" fill="none" stroke="#ffd890" stroke-width="2" opacity=".5"/>`
    + [[500, 424], [560, 440], [650, 432], [720, 448], [610, 456]].map(([x, y], i) => `<path d="M${x} ${y}q8 -3 16 0t16 0" fill="none" stroke="#fff" stroke-width="1.4" opacity=".45" stroke-linecap="round"/>`).join('');
}
function smallPond() {
  return `<path d="M232 412Q268 396 330 402T420 420Q430 448 400 462Q330 470 270 462Q226 446 232 412Z" fill="url(#pond)" stroke="#d8cdb0" stroke-width="3"/><path d="M246 420Q330 408 410 424" fill="none" stroke="#ffd890" stroke-width="1.6" opacity=".5"/>`
    + `${lily(262, 436, 1.1)}${lily(300, 448, 1)}${lily(330, 428, 0.9, false)}${lily(408, 446, 1.1)}${lily(284, 424, 0.8, false)}${lily(376, 454, 0.9)}`;
}
function balustrade() {
  const n = 12;
  return `<g><path d="M596 468V430Q700 424 848 416V468Z" fill="#c9bda2" stroke="#7a6a56" stroke-width="2"/>${Array.from({ length: n }, (_, i) => `<rect x="${604 + i * 21}" y="${432 - i * .7}" width="7" height="30" rx="2" fill="#e2d8c0" stroke="#8a7a66" stroke-width="1"/>`).join('')}<path d="M596 432Q720 426 848 418" stroke="#ece2cc" stroke-width="7" stroke-linecap="round" fill="none"/>${[596, 700, 808].map((x, i) => `<rect x="${x - 7}" y="${414 - i * 3}" width="14" height="52" rx="2" fill="#d8ccb4" stroke="#8a7a66" stroke-width="1.6"/><rect x="${x - 9}" y="${410 - i * 3}" width="18" height="7" rx="2" fill="#ece2cc" stroke="#8a7a66" stroke-width="1.4"/>`).join('')}</g>`;
}
function petals() {
  let s = '';
  for (let i = 0; i < 40; i++) { const x = rnd() * 848, y = 20 + rnd() * 420; s += `<ellipse cx="${x}" cy="${y}" rx="2.2" ry="1.2" fill="#ffc2d4" opacity="${(0.5 + rnd() * 0.4).toFixed(2)}" transform="rotate(${Math.round(rnd() * 180)} ${x} ${y})"/>`; }
  for (let i = 0; i < 14; i++) s += `<circle cx="${rnd() * 848}" cy="${200 + rnd() * 250}" r="1.3" fill="#ffe9a0" opacity=".8"/>`;
  return s;
}

export function renderChinese(S, LB, chapter, progress) {
  seedRandom(21);
  const W = el('g', { transform: `translate(0,${TY}) scale(${SC})` }, S);
  const add = (html) => { const g = el('g', {}, W); g.innerHTML = html; return g; };
  // backdrop
  add(sky());
  add(mountains());
  add(`<ellipse cx="640" cy="150" rx="140" ry="26" fill="#ffb98a" opacity=".35"/>`);
  add(pagoda(676, 168, 1.05));
  add(`<path d="M610 178Q676 150 760 176V186H610Z" fill="#5a4a6a"/>${[[630, 176, 14], [716, 170, 12], [750, 176, 16]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#3f6a4a"/>`).join('')}`);
  add(ground());
  add(village());
  add(canal());
  add(backBridge());
  add(grassBlades());

  // the path: spots in picture space
  const SP = [[142, 355], [242, 332], [338, 300], [425, 268], [512, 243], [602, 228], [688, 200], [748, 160]];
  const done = (n) => (progress.stars[n] || 0) > 0;
  const current = chapter.levels.find((l) => !done(l.n));
  const lvl = chapter.levels.map((l, i) => ({ n: l.n, name: l.name, s: progress.stars[l.n] || 0, st: done(l.n) ? 'done' : (current && current.n === l.n ? 'now' : 'lock'), pos: [Math.round(wx(SP[i][0])), Math.round(wy(SP[i][1]))], sp: SP[i] }));
  const route = [[8, 392], ...SP, [800, 138]];
  let d = `M${route[0].join(' ')}`;
  for (let i = 1; i < route.length; i++) {
    const a = route[i - 1], b = route[i], p0 = route[i - 2] || a, p1 = route[i + 1] || b;
    d += ` C${a[0] + (b[0] - p0[0]) / 6} ${a[1] + (b[1] - p0[1]) / 6} ${b[0] - (p1[0] - a[0]) / 6} ${b[1] - (p1[1] - a[1]) / 6} ${b[0]} ${b[1]}`;
  }
  const rd = { d, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  // lit path: warm glow under cobbles, bright gold for the stretch you have already walked
  const road = el('path', { ...rd, stroke: 'none' }, W);
  const total = road.getTotalLength(), doneCount = lvl.filter((l) => l.st === 'done').length;
  el('path', { ...rd, stroke: '#ffcf6a', 'stroke-width': 40, opacity: 0.35, filter: 'blur(4px)' }, W);
  el('path', { ...rd, stroke: '#6a5a4a', 'stroke-width': 31, opacity: 0.35, transform: 'translate(0,2)' }, W);
  el('path', { ...rd, stroke: '#f6dc8a', 'stroke-width': 31 }, W);
  el('path', { ...rd, stroke: 'url(#cobble)', 'stroke-width': 26 }, W);
  el('path', { ...rd, stroke: '#ffe9a0', 'stroke-width': 1.6, opacity: 0.8, transform: 'translate(0,-12.8)' }, W);
  if (doneCount) {
    let best = 0, bd = 1e9; const last = SP[doneCount - 1];
    for (let t = 0; t <= total; t += 2) { const q = road.getPointAtLength(t), dd = Math.hypot(q.x - last[0], q.y - last[1]); if (dd < bd) { bd = dd; best = t; } }
    el('path', { ...rd, stroke: '#ffd45a', 'stroke-width': 30, 'stroke-dasharray': `${best} ${total}`, opacity: 0.4 }, W);
  }

  // scenery in front of the path, left to right
  add(restaurant());
  add(easel());
  add(lion());
  add(pot(344, 296, 1.25));
  add(pot(30, 440, 1.5));
  add(`<g transform="translate(0,0)">${[[0, 400], [24, 412], [-6, 428]].map(([x, y]) => `<path d="M${x} ${y}Q${x + 24} ${y - 34} ${x + 38} ${y - 14}Q${x + 20} ${y - 12} ${x} ${y}Z" fill="#4f9a4a" stroke="#2a5f2a" stroke-width="1.3"/>`).join('')}</g>`);
  add(smallPond());
  add(boxLantern(366, 404, 0.8));
  add(pondWater());
  add(frontBridge());
  [[470, 424], [540, 446], [620, 438], [690, 452], [758, 430], [806, 448]].forEach(([x, y], i) => add(lily(x, y, 1 + (i % 3) * 0.1, i % 2 === 0)));
  add(sakuraTree(772, 380, 1.05));
  add(stoneLantern(822, 352, 1));
  add(bamboo(828, 286, 1));
  add(balustrade());
  add(branch());
  add(petals());

  // stops: round red coins with a gold rim; the next one glows, locked ones are grey stone
  const star5 = (x, y, on) => `<path transform="translate(${x},${y}) scale(1.4)" d="M0-9L2.7-3 9-2.4 4.2 1.8 5.6 8 0 4.8 -5.6 8 -4.2 1.8 -9-2.4 -2.7-3Z" fill="${on ? '#ffd84a' : '#5a6a78'}" stroke="#14100f" stroke-width="1.2"/>`;
  lvl.forEach((l) => {
    const [x, y] = l.pos, lock = l.st === 'lock';
    const n = el('g', { class: 'node', 'data-n': l.n, transform: `translate(${x},${y})`, tabindex: lock ? -1 : 0, role: 'button', 'aria-label': `Level ${l.n}, ${l.name}, ` + (lock ? 'locked' : l.st === 'now' ? 'next up' : l.s + ' stars') }, S);
    const k = el('g', { transform: 'scale(0.6)' }, n); // same footprint as the stops on the other maps
    el('ellipse', { cy: 26, rx: 92, ry: 30, fill: '#2a1a14', opacity: 0.35 }, k);
    const u = el('g', { class: 'lift' }, k);
    if (l.st === 'now') { el('ellipse', { rx: 108, ry: 44, fill: '#ffe08a', class: 'pulse' }, u); el('ellipse', { cy: 4, rx: 120, ry: 52, fill: 'url(#glow)' }, u); }
    const top = lock ? '#a9a49a' : l.st === 'now' ? '#e0452f' : '#a52a2e', side = lock ? '#6f6a60' : l.st === 'now' ? '#7a1810' : '#5a1218', rim = lock ? '#c8c2b6' : '#f2c75a';
    el('path', { d: 'M-80 0v26a80 34 0 0 0 160 0v-26Z', fill: side, stroke: OL, 'stroke-width': 3 }, u);
    el('path', { d: 'M-80 12v14a80 34 0 0 0 160 0v-14a80 34 0 0 1 -160 0Z', fill: rim, opacity: 0.9 }, u);
    el('ellipse', { class: 'ring', rx: 80, ry: 34, fill: rim, stroke: OL, 'stroke-width': 3 }, u);
    el('ellipse', { rx: 69, ry: 28, fill: top, stroke: lock ? '#7a756a' : '#7a1810', 'stroke-width': 2.4 }, u);
    el('ellipse', { cy: -6, rx: 56, ry: 15, fill: '#fff', opacity: lock ? 0.12 : 0.16 }, u);
    const t = el('text', { y: 16, 'text-anchor': 'middle', 'font-family': 'Cinzel Decorative,serif', 'font-weight': 700, 'font-size': 56, fill: lock ? '#6f6a60' : '#fff', stroke: lock ? '#d9d4c8' : '#5a0f14', 'stroke-width': 2.4, 'paint-order': 'stroke' }, u); t.textContent = lock ? '' : l.n;
    if (lock) {
      el('g', { transform: 'translate(0,-10) scale(2.5)' }, u).innerHTML = '<rect x="-8" y="-2" width="16" height="13" rx="2.4" fill="#f2c75a" stroke="#14100f" stroke-width="1.2"/><path d="M-4.6-2V-6.4a4.6 4.6 0 0 1 9.2 0V-2" fill="none" stroke="#14100f" stroke-width="2.4"/><circle cy="5" r="1.7" fill="#14100f"/>';
    }
    const g = el('g', { transform: `translate(${x},${y})`, 'pointer-events': 'none' }, LB);
    const lab = el('g', { transform: 'translate(0,64)' }, g);
    el('rect', { x: -88, y: -17, width: 176, height: 32, rx: 8, fill: '#7a1818', stroke: lock ? '#8a7a64' : '#e8b64a', 'stroke-width': 2, opacity: 0.94 }, lab);
    const tt = el('text', { y: 6, 'text-anchor': 'middle', 'font-family': 'Josefin Sans', 'font-weight': 700, 'font-size': 18, fill: lock ? '#cbb89a' : '#fff0d8' }, lab); tt.textContent = l.name;
    if (!lock) el('g', { transform: 'translate(0,-58)' }, g).innerHTML = star5(-30, 0, l.s >= 1) + star5(0, -8, l.s >= 2) + star5(30, 0, l.s >= 3);
    if (l.n === chapter.levels.length) el('path', { transform: 'translate(0,-102)', d: 'M-20 0L-12-16-3-4 0-20 3-4 12-16 20 0Z', fill: '#ffd96a', stroke: OL, 'stroke-width': 1.5 }, g);
  });
  const home = (lvl.find((l) => l.st === 'now') || lvl[lvl.length - 1]).pos;
  return { nodes: lvl, board: { x: Math.round(wx(822)), y: Math.round(wy(186)), dir: 1 }, home };
}
