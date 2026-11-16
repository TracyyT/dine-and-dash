// Chapter 7 (Cali Burger) decorations: big beach-view windows with palms and umbrellas, a neon burger sign, red/orange pendant lamps,
// potted palms, hanging pans, menu boards and a surfboard poster, plus a soda fountain and a milkshake stall.
const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const OL = '#3a1410';

function beachWindow(i) {
  const r = rng(71 + i * 13);
  const cols = ['#e8402f', '#2aa6b8', '#ffc83a', '#f27a9a'];
  const umb = (x, y, c) => `<path d="M${x - 9} ${y}Q${x} ${y - 12} ${x + 9} ${y}Z" fill="${c}" stroke="#7a3418" stroke-width="1"/><path d="M${x - 3} ${y}Q${x} ${y - 10} ${x + 3} ${y}Z" fill="#fff" opacity=".8"/><path d="M${x} ${y}v9" stroke="#7a4a2a" stroke-width="1.4"/>`;
  const palm = (x, h) => `<path d="M${x} 84Q${x - 3} ${84 - h * 0.5} ${x + 2} ${84 - h}" stroke="#7a4a2a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M${x + 2} ${84 - h}Q${x - 14} ${84 - h - 8} ${x - 20} ${84 - h + 8}Q${x - 8} ${84 - h - 2} ${x + 2} ${84 - h}ZM${x + 2} ${84 - h}Q${x + 18} ${84 - h - 8} ${x + 24} ${84 - h + 8}Q${x + 12} ${84 - h - 2} ${x + 2} ${84 - h}ZM${x + 2} ${84 - h}Q${x - 6} ${84 - h - 18} ${x - 14} ${84 - h - 16}Q${x - 4} ${84 - h - 12} ${x + 2} ${84 - h}ZM${x + 2} ${84 - h}Q${x + 10} ${84 - h - 18} ${x + 18} ${84 - h - 16}Q${x + 8} ${84 - h - 12} ${x + 2} ${84 - h}Z" fill="#3f9a4a" stroke="#1f5a2a" stroke-width="1" stroke-linejoin="round"/>`;
  const sun = 20 + r() * 110;
  return `<svg viewBox="0 0 150 100" width="150" height="100"><defs><linearGradient id="fsk${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fa8e8"/><stop offset=".7" stop-color="#bfe6f6"/><stop offset="1" stop-color="#fff0c8"/></linearGradient><linearGradient id="fsea${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3aa8c8"/><stop offset="1" stop-color="#1f7aa8"/></linearGradient></defs>
    <rect width="150" height="100" fill="url(#fsk${i})"/><circle cx="${sun}" cy="22" r="9" fill="#fff6b0" opacity=".95"/><ellipse cx="${30 + r() * 50}" cy="${14 + r() * 8}" rx="18" ry="4" fill="#fff" opacity=".85"/>
    <rect y="52" width="150" height="20" fill="url(#fsea${i})"/><path d="M0 56q8-3 16 0t16 0 16 0 16 0 16 0 16 0 16 0 16 0 16 0" stroke="#fff" stroke-width="1.4" fill="none" opacity=".6"/>
    <rect y="70" width="150" height="30" fill="#f6dca0"/><path d="M0 76q40-6 80 0t70-2" stroke="#e8c484" stroke-width="2" fill="none"/>
    ${umb(28 + r() * 10, 78, cols[i % 4])}${umb(96 + r() * 14, 82, cols[(i + 1) % 4])}${umb(60, 90, cols[(i + 2) % 4])}
    ${palm(12 + r() * 6, 36)}${palm(128 + r() * 6, 30)}
    <path d="M0 0L55 0L0 60Z" fill="#fff" opacity=".1"/><path d="M75 0v100M0 50h150" stroke="#fff6e8" stroke-width="3.5"/><rect x="1.5" y="1.5" width="147" height="97" fill="none" stroke="#fff6e8" stroke-width="3"/></svg>`;
}

// the neon burger sign that hangs where the jukebox usually stands
const burgerSign = () => `<svg viewBox="0 0 80 120" width="80" height="120"><rect x="6" y="6" width="68" height="108" rx="8" fill="#2a1418" stroke="#ffc83a" stroke-width="3.4"/><rect x="11" y="11" width="58" height="98" rx="5" fill="#3a1c22"/>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 46Q18 26 40 26T62 46Z" stroke="#ffb030" stroke-width="3.4"/><path d="M18 52q6 5 11 0t11 0 11 0 11 0" stroke="#7aff8a" stroke-width="3"/><path d="M18 60h44" stroke="#ff4a5a" stroke-width="3.6"/><path d="M18 68q0 8 22 8T62 68Z" stroke="#ffb030" stroke-width="3.4"/></g>
  <circle cx="30" cy="34" r="1.4" fill="#ffe8b0"/><circle cx="42" cy="31" r="1.4" fill="#ffe8b0"/><circle cx="52" cy="36" r="1.4" fill="#ffe8b0"/>
  <text x="40" y="94" text-anchor="middle" font-family="Pacifico,cursive" font-size="15" fill="#ff7ac8" stroke="#ff7ac8" stroke-width=".4">Burger</text><path d="M18 100h44" stroke="#5ae8ff" stroke-width="2.6" stroke-linecap="round"/><circle cx="40" cy="8" r="3" fill="#ff4a5a" opacity=".9"/></svg>`;

const pendant = () => `<svg viewBox="0 0 60 90" width="60" height="90"><path d="M30 0V38" stroke="#2a1410" stroke-width="3"/><path d="M6 66Q6 38 30 38Q54 38 54 66Z" fill="#e8402f" stroke="${OL}" stroke-width="2.6"/><path d="M14 58Q16 46 28 43" stroke="#ff8a6a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/><path d="M6 66H54" stroke="#ffc83a" stroke-width="3"/><ellipse cx="30" cy="68" rx="20" ry="5" fill="#ffd890"/><circle cx="30" cy="38" r="3.4" fill="#ffc83a" stroke="${OL}" stroke-width="1.6"/></svg>`;

const pottedPalm = () => `<svg viewBox="0 0 80 110" width="80" height="110"><ellipse cx="40" cy="104" rx="24" ry="5" fill="#000" opacity=".28"/>
  <path d="M40 80Q36 60 42 40" stroke="#8a5a2a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M42 40Q18 32 8 52Q28 38 42 40ZM42 40Q66 32 76 52Q56 38 42 40ZM42 40Q22 16 8 18Q30 20 42 40ZM42 40Q60 16 74 18Q54 20 42 40ZM42 40Q38 12 42 2Q48 22 42 40Z" fill="#3f9a4a" stroke="#1f5a2a" stroke-width="2" stroke-linejoin="round"/>
  <path d="M22 78h36l-5 26H27z" fill="#2aa6b8" stroke="${OL}" stroke-width="2.6"/><rect x="20" y="74" width="40" height="8" rx="2" fill="#4ac0d0" stroke="${OL}" stroke-width="2.4"/><path d="M30 90h20" stroke="#fff6e8" stroke-width="2" opacity=".7"/></svg>`;

const hangingPans = () => `<svg viewBox="0 0 120 70" width="120" height="70"><path d="M0 4H120" stroke="#8d989c" stroke-width="4"/>
  ${[14, 50, 88].map((x, i) => `<path d="M${x + 8} 4V${12 + i * 5}" stroke="#555" stroke-width="2"/>`).join('')}
  <circle cx="22" cy="30" r="13" fill="#3a3e44" stroke="#aab4ba" stroke-width="2"/><circle cx="58" cy="36" r="11" fill="#3a3e44" stroke="#aab4ba" stroke-width="2"/>
  <path d="M86 16v14M86 30h10l-3-6M96 30l3 8" stroke="#aab4ba" stroke-width="2.4" fill="none" stroke-linecap="round"/><rect x="86" y="30" width="20" height="12" rx="2" fill="#c8d0d4" stroke="#6a747a" stroke-width="1.8"/></svg>`;

const menuBoard = () => `<svg viewBox="0 0 84 104" width="84" height="104"><rect x="2" y="2" width="80" height="100" rx="5" fill="#2a1418" stroke="#ffc83a" stroke-width="3.4"/><rect x="8" y="8" width="68" height="88" rx="3" fill="#3a1c22"/>
  <text x="42" y="26" text-anchor="middle" font-family="Pacifico,cursive" font-size="13" fill="#ffd83a">Menu</text><path d="M16 32h52" stroke="#ff7a6a" stroke-width="1.6"/>
  ${[44, 56, 68, 80].map((y, i) => `<path d="M16 ${y}h${[34, 28, 36, 30][i]}" stroke="#fff6e8" stroke-width="2.2" stroke-linecap="round" opacity=".9"/><path d="M58 ${y}h10" stroke="#ffd83a" stroke-width="2.2" stroke-linecap="round"/>`).join('')}</svg>`;

const surfPoster = () => `<svg viewBox="0 0 84 104" width="84" height="104"><rect x="2" y="2" width="80" height="100" rx="3" fill="#fff6e8" stroke="${OL}" stroke-width="3.2"/><rect x="8" y="8" width="68" height="62" fill="#ffb86a"/><circle cx="42" cy="46" r="16" fill="#ff6a4a"/><rect x="8" y="50" width="68" height="20" fill="#2a9ab8"/><path d="M8 56q8-4 17 0t17 0 17 0 17 0" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/><path d="M40 86l4-14" stroke="${OL}" stroke-width="2"/><text x="42" y="86" text-anchor="middle" font-family="Pacifico,cursive" font-size="11" fill="#c8322a">California</text><text x="42" y="97" text-anchor="middle" font-family="Josefin Sans,sans-serif" font-size="7" font-weight="700" fill="#2a1410">SURF · SAND · BURGERS</text></svg>`;

const extra = (g, L, put, { WALL_BOTTOM }) => {
  let h = '';
  const gap = (c) => L.dineX + (c + 1) * L.cellW - 27;
  if (L.cols >= 2) h += put('sc-wine', gap(0), WALL_BOTTOM - 150, menuBoard(), 'transform:scale(.62);transform-origin:0 0');
  if (L.cols >= 3) h += put('sc-painting', gap(1), WALL_BOTTOM - 150, surfPoster(), 'transform:scale(.62);transform-origin:0 0');
  if (L.cols >= 4) h += put('sc-wine', gap(2), WALL_BOTTOM - 150, menuBoard(), 'transform:scale(.62);transform-origin:0 0');
  return h;
};

// two little stands by the kitchen: a soda fountain (drinks) and a milkshake bar (desserts)
const stall = (kind) => {
  const col = kind === 'drink' ? '#2aa6b8' : '#f27a9a';
  const awn = Array.from({ length: 6 }, (_, i) => `<path d="M${i * 25} 44q0 -26 12.5 -26T${(i + 1) * 25} 44Z" fill="${i % 2 ? '#fff6e8' : '#e8402f'}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>`).join('');
  const body = kind === 'drink'
    ? `<rect x="44" y="60" width="62" height="30" rx="5" fill="#c8322a" stroke="${OL}" stroke-width="3"/><rect x="50" y="66" width="50" height="8" rx="2" fill="#fff6e8"/><text x="75" y="73" text-anchor="middle" font-size="7.5" font-weight="800" fill="#c8322a" font-family="Josefin Sans,sans-serif">SODA</text>${[58, 75, 92].map((x, i) => `<rect x="${x - 4}" y="78" width="8" height="6" rx="1.5" fill="${['#ffc83a', '#2f9aaa', '#fff6e8'][i]}" stroke="${OL}" stroke-width="1.4"/>`).join('')}<g fill="#fff6f0" stroke="${OL}" stroke-width="1.8"><path d="M20 92h14l-2 14q-5 3 -10 0z"/><path d="M116 92h14l-2 14q-5 3 -10 0z"/></g><path d="M27 92v-8M123 92v-8" stroke="#2f9aaa" stroke-width="2.4"/>`
    : `<rect x="46" y="62" width="58" height="28" rx="5" fill="#c8d0d4" stroke="${OL}" stroke-width="3"/><path d="M62 62V50q0-6 6-6h14q6 0 6 6v12Z" fill="#fff6f0" fill-opacity=".8" stroke="${OL}" stroke-width="2.4"/><path d="M62 56h26" stroke="#f6a8c4" stroke-width="7"/><circle cx="58" cy="80" r="4" fill="#d8302a" stroke="${OL}" stroke-width="1.6"/><circle cx="92" cy="80" r="4" fill="#ffc83a" stroke="${OL}" stroke-width="1.6"/><g fill="#fff6f0" stroke="#b85a7a" stroke-width="1.8"><path d="M22 92h14l-2 14q-5 3 -10 0z"/><path d="M114 92h14l-2 14q-5 3 -10 0z"/></g><path d="M29 92v-10M121 92v-10" stroke="#d8302a" stroke-width="2.4"/><circle cx="29" cy="82" r="3.4" fill="#d8302a"/><circle cx="121" cy="82" r="3.4" fill="#d8302a"/>`;
  return `<svg viewBox="0 0 150 130" width="150" height="130"><rect x="8" y="44" width="134" height="86" rx="6" fill="${col}" stroke="${OL}" stroke-width="4"/><path d="M8 66h134M8 90h134" stroke="#000" stroke-width="2" opacity=".18"/>${awn}<path d="M0 44q18 10 37 0t38 0 38 0 37 0" fill="#fff6e8" stroke="${OL}" stroke-width="3"/>${body}</svg>`;
};

export const fastfoodKit = { window: beachWindow, jukebox: burgerSign, lamp: pendant, plant: pottedPalm, pans: hangingPans, extra, stall, sign: 'Cali Burger' };
