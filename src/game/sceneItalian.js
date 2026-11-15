// Chapter 6 (Italian Trattoria) decorations: arched hillside-village windows, a brick pizza oven, hanging iron lanterns, potted lemon trees,
// copper pots with garlic braids, a wine rack and a chalkboard menu, plus little espresso and gelato stalls.
const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const OL = '#3a1c0c';

function villageWindow(i) {
  const r = rng(61 + i * 11);
  const roofs = ['#d8683a', '#c85a30', '#e07a46'], walls = ['#f6e2b8', '#f0d2a0', '#fff0d0'];
  let town = '';
  for (let k = 0, x = 4; x < 140; k++) {
    const w = 18 + Math.floor(r() * 14), h = 14 + Math.floor(r() * 18), y = 74 - h;
    town += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${walls[k % 3]}" stroke="#8a6a4a" stroke-width="1"/><path d="M${x - 2} ${y}L${x + w / 2} ${y - 9}L${x + w + 2} ${y}Z" fill="${roofs[k % 3]}" stroke="#7a3a1c" stroke-width="1"/><rect x="${x + 4}" y="${y + 5}" width="4" height="6" fill="#4a7a8a"/>`;
    x += w + 3 + Math.floor(r() * 6);
  }
  const cyp = (x, h) => `<path d="M${x} ${86 - h}Q${x + 6} ${86 - h * 0.5} ${x + 3} 86H${x - 3}Q${x - 6} ${86 - h * 0.5} ${x} ${86 - h}Z" fill="#2f6a34" stroke="#1c4a22" stroke-width="1"/>`;
  return `<svg viewBox="0 0 150 100" width="150" height="100"><defs><linearGradient id="isk${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6aaae8"/><stop offset=".62" stop-color="#bfe0f4"/><stop offset="1" stop-color="#ffe2b0"/></linearGradient></defs>
    <rect width="150" height="100" fill="url(#isk${i})"/><ellipse cx="${26 + r() * 40}" cy="${16 + r() * 8}" rx="20" ry="5" fill="#fff" opacity=".85"/><ellipse cx="${96 + r() * 30}" cy="${28 + r() * 6}" rx="16" ry="4" fill="#fff" opacity=".7"/>
    <path d="M0 66Q30 52 70 62T150 56V100H0Z" fill="#8fb26a"/>${town}<path d="M0 78Q40 70 80 78T150 74V100H0Z" fill="#6f9a44"/>
    ${cyp(20 + r() * 20, 40)}${cyp(100 + r() * 30, 34)}${cyp(70, 30)}
    <path d="M0 90Q40 84 80 90T150 88V100H0Z" fill="#c8a868" opacity=".8"/>
    <path d="M75 0v100M0 50h150" stroke="#8a5a2a" stroke-width="3.5"/></svg>`;
}

const pizzaOven = () => `<svg viewBox="0 0 110 150" width="110" height="150" style="margin-top:-52px;margin-left:-6px"><ellipse cx="55" cy="146" rx="48" ry="5" fill="#000" opacity=".3"/>
  <rect x="46" y="2" width="18" height="34" rx="2" fill="#b8683c" stroke="${OL}" stroke-width="2.6"/><rect x="42" y="0" width="26" height="8" rx="2" fill="#8a4a28" stroke="${OL}" stroke-width="2.4"/>
  <path d="M10 98Q10 22 55 22T100 98Z" fill="#c8603a" stroke="${OL}" stroke-width="3.2" stroke-linejoin="round"/>
  ${[[28, 52], [46, 40], [64, 40], [82, 52], [20, 72], [90, 72], [34, 66], [76, 66]].map(([x, y], i) => `<path d="M${x - 9} ${y}h18M${x} ${y - 7}v14" stroke="#8a3a1c" stroke-width="1.8" opacity=".7"/>`).join('')}
  <path d="M26 98V70Q26 50 55 50T84 70V98Z" fill="#1c0e08" stroke="${OL}" stroke-width="3.2"/>
  <path d="M55 96Q36 88 44 70Q47 80 55 74Q58 62 68 54Q68 70 78 78Q82 90 55 96Z" fill="#ff8a2a"/><path d="M55 96Q46 90 50 82Q54 86 56 82Q59 74 63 70Q63 80 67 84Q69 92 55 96Z" fill="#ffd84a"/>
  <rect x="8" y="98" width="94" height="48" rx="3" fill="#a8806a" stroke="${OL}" stroke-width="3"/>
  ${Array.from({ length: 5 }, (_, i) => `<path d="M${10 + (i % 2) * 8} ${108 + i * 8}h${86 - (i % 2) * 10}" stroke="#7a5a48" stroke-width="2"/>`).join('')}
  <rect x="22" y="112" width="66" height="30" rx="3" fill="#2a1408" stroke="${OL}" stroke-width="2.4"/>${[[30, 128], [44, 130], [58, 127], [72, 130]].map(([x, y]) => `<rect x="${x}" y="${y - 7}" width="12" height="12" rx="3" fill="#8a5a2a" stroke="${OL}" stroke-width="1.6"/><circle cx="${x + 6}" cy="${y - 1}" r="2.6" fill="#c8945a"/>`).join('')}
  <rect x="4" y="96" width="102" height="8" rx="2" fill="#6a4a30" stroke="${OL}" stroke-width="2.4"/></svg>`;

const ironLantern = () => `<svg viewBox="0 0 60 90" width="60" height="90"><path d="M30 0V16" stroke="#2a1c14" stroke-width="3"/><circle cx="30" cy="18" r="4" fill="none" stroke="#2a1c14" stroke-width="2.6"/>
  <path d="M18 24L30 16 42 24Z" fill="#2a1c14"/><circle cx="30" cy="48" r="26" fill="#ffd890" opacity=".25"/>
  <path d="M19 26H41L44 66H16Z" fill="#ffe2a0" stroke="#2a1c14" stroke-width="3" stroke-linejoin="round"/><path d="M30 26V66M17.5 46h25" stroke="#2a1c14" stroke-width="2.2"/>
  <path d="M30 62Q24 54 28 46Q30 52 33 48Q36 56 30 62Z" fill="#ff9a2a"/><path d="M14 66h32l-4 6H18Z" fill="#2a1c14"/><path d="M30 72v8" stroke="#2a1c14" stroke-width="3"/><circle cx="30" cy="83" r="3.4" fill="#2a1c14"/></svg>`;

const lemonTree = () => `<svg viewBox="0 0 80 110" width="80" height="110"><ellipse cx="40" cy="104" rx="26" ry="5" fill="#000" opacity=".28"/>
  <path d="M40 78V52" stroke="#6a4420" stroke-width="5" stroke-linecap="round"/>
  ${[[40, 32, 22], [22, 46, 16], [58, 46, 16], [40, 52, 14]].map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${['#4f9a44', '#5aaa4a', '#3f8a3a', '#4f9a44'][i]}" stroke="#1f5a22" stroke-width="2"/>`).join('')}
  ${[[30, 28], [48, 36], [38, 48], [24, 48], [56, 48], [44, 22]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.6" ry="3.4" fill="#ffe14a" stroke="#a8861a" stroke-width="1.4" transform="rotate(-20 ${x} ${y})"/>`).join('')}
  <path d="M22 78h36l-5 26H27z" fill="#c8643c" stroke="${OL}" stroke-width="2.6"/><rect x="20" y="74" width="40" height="8" rx="2" fill="#d8744a" stroke="${OL}" stroke-width="2.4"/><path d="M30 88h20" stroke="#8a3a1c" stroke-width="2" opacity=".6"/></svg>`;

const copperPots = () => `<svg viewBox="0 0 120 70" width="120" height="70"><path d="M0 4H120" stroke="#6a4a30" stroke-width="4"/>
  ${[16, 52, 90].map((x, i) => `<path d="M${x + 8} 4V${12 + i * 6}" stroke="#5a3a20" stroke-width="2"/><path d="M${x - 8} ${20 + i * 6}h24l-3 18q-9 6 -18 0z" fill="#d8844a" stroke="#6a3418" stroke-width="2.2" stroke-linejoin="round"/><path d="M${x - 5} ${23 + i * 6}h18" stroke="#f6b078" stroke-width="2" opacity=".8"/>`).join('')}
  <path d="M104 4Q110 16 104 26Q110 38 104 48" stroke="#e8d8b0" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M104 8Q110 18 104 28" stroke="#c8b888" stroke-width="2" fill="none"/><path d="M116 4v20" stroke="#6a4a30" stroke-width="1.8"/><path d="M114 24q2 14 4 0z" fill="#d8302a" stroke="#7a1010" stroke-width="1.2"/><path d="M110 4v26" stroke="#6a4a30" stroke-width="1.8"/><path d="M108 30q2 14 4 0z" fill="#d8302a" stroke="#7a1010" stroke-width="1.2"/></svg>`;

const wineRack = () => `<svg viewBox="0 0 78 150" width="78" height="150"><rect x="2" y="2" width="74" height="146" rx="4" fill="#8a5a2a" stroke="${OL}" stroke-width="3"/><rect x="8" y="8" width="62" height="134" fill="#3a2010"/>
  ${[0, 1, 2, 3].map((r) => `<path d="M8 ${40 + r * 32}h62" stroke="#b8844a" stroke-width="4"/>${[0, 1, 2].map((c) => { const x = 18 + c * 20, y = 14 + r * 32, col = ['#2a5a3a', '#7a1c2a', '#3a2a1a'][(c + r) % 3]; return `<rect x="${x - 4}" y="${y + 8}" width="8" height="18" rx="2" fill="${col}" stroke="#0a0604" stroke-width="1"/><rect x="${x - 1.6}" y="${y}" width="3.2" height="10" fill="${col}"/><rect x="${x - 3}" y="${y + 14}" width="6" height="5" fill="#f6e8c8"/>`; }).join('')}`).join('')}</svg>`;

const chalkboard = () => `<svg viewBox="0 0 84 104" width="84" height="104"><rect x="2" y="2" width="80" height="100" rx="4" fill="#a8743a" stroke="${OL}" stroke-width="3.4"/><rect x="9" y="9" width="66" height="86" rx="2" fill="#2a3a30"/>
  <text x="42" y="28" text-anchor="middle" font-family="Playfair Display,serif" font-style="italic" font-weight="700" font-size="13" fill="#f6efe0">Menu</text><path d="M18 34h48" stroke="#f6efe0" stroke-width="1.6" opacity=".7"/>
  ${[44, 56, 68].map((y, i) => `<path d="M16 ${y}h${[34, 28, 36][i]}" stroke="#f6efe0" stroke-width="2.2" stroke-linecap="round" opacity=".85"/><path d="M58 ${y}h10" stroke="#ffd890" stroke-width="2.2" stroke-linecap="round"/>`).join('')}
  <circle cx="42" cy="84" r="6" fill="none" stroke="#ff8a6a" stroke-width="2"/><path d="M38 84h8M42 80v8" stroke="#ff8a6a" stroke-width="1.6"/></svg>`;

const extra = (g, L, put, { WALL_BOTTOM }) => {
  let h = '';
  const gap = (c) => L.dineX + (c + 1) * L.cellW - 27;
  if (L.cols >= 2) h += put('sc-wine', gap(0), WALL_BOTTOM - 150, wineRack(), 'transform:scale(.68);transform-origin:0 0');
  if (L.cols >= 3) h += put('sc-painting', gap(1), WALL_BOTTOM - 150, chalkboard(), 'transform:scale(.62);transform-origin:0 0');
  if (L.cols >= 4) h += put('sc-wine', gap(2), WALL_BOTTOM - 150, wineRack(), 'transform:scale(.68);transform-origin:0 0');
  return h;
};

// the two little stalls by the kitchen: an espresso bar (drinks) and a gelato cart (desserts)
const stall = (kind) => {
  const col = kind === 'drink' ? '#3f7a4a' : '#e89ab4';
  const awn = Array.from({ length: 6 }, (_, i) => `<path d="M${i * 25} 44q0 -26 12.5 -26T${(i + 1) * 25} 44Z" fill="${i % 2 ? '#fff4e0' : '#d8402f'}" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>`).join('');
  const body = kind === 'drink'
    ? '<rect x="50" y="64" width="50" height="26" rx="5" fill="#c8d0d4" stroke="#3a1c0c" stroke-width="3"/><rect x="58" y="70" width="14" height="10" rx="2" fill="#4a5058"/><circle cx="86" cy="75" r="4" fill="#d8402f" stroke="#3a1c0c" stroke-width="1.6"/><path d="M52 64h46" stroke="#fff" stroke-width="2" opacity=".6"/><g fill="#fff" stroke="#3a1c0c" stroke-width="1.8"><path d="M24 94h14l-2 12q-5 3 -10 0z"/><path d="M112 94h14l-2 12q-5 3 -10 0z"/></g>'
    : `<ellipse cx="75" cy="94" rx="40" ry="8" fill="#fff4e0" stroke="${OL}" stroke-width="3"/>${[[46, '#f6a8c4'], [64, '#a8d8b0'], [82, '#f6e2a0'], [100, '#c8a078']].map(([x, c]) => `<ellipse cx="${x}" cy="88" rx="9" ry="7" fill="${c}" stroke="${OL}" stroke-width="2"/><circle cx="${x}" cy="80" r="6" fill="${c}" stroke="${OL}" stroke-width="2"/>`).join('')}`;
  return `<svg viewBox="0 0 150 130" width="150" height="130"><rect x="8" y="44" width="134" height="86" rx="6" fill="${col}" stroke="${OL}" stroke-width="4"/><path d="M8 66h134M8 90h134" stroke="#000" stroke-width="2" opacity=".18"/>${awn}<path d="M0 44q18 10 37 0t38 0 38 0 37 0" fill="#fff4e0" stroke="${OL}" stroke-width="3"/>${body}</svg>`;
};

export const italianKit = { window: villageWindow, jukebox: pizzaOven, lamp: ironLantern, plant: lemonTree, pans: copperPots, extra, stall, sign: 'Trattoria' };
