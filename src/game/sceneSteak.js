// Chapter 5 (Big Sky Steakhouse) decorations: prairie-sunset windows, a stone fireplace, iron candle chandeliers, flower barrels and little bar/pie stalls.
const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

function prairieWindow(i) {
  const r = rng(51 + i * 9);
  const mill = 22 + r() * 90;
  return `<svg viewBox="0 0 150 100" width="150" height="100"><defs><linearGradient id="psk${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a58a8"/><stop offset=".5" stop-color="#f08a6a"/><stop offset="1" stop-color="#ffc888"/></linearGradient></defs>
    <rect width="150" height="100" fill="url(#psk${i})"/><circle cx="${40 + r() * 70}" cy="66" r="12" fill="#fff0b8"/>
    <path d="M0 74Q40 60 80 72T150 66V100H0Z" fill="#6a5a8a"/><path d="M0 84Q50 74 100 84T150 80V100H0Z" fill="#3a5a3a"/>
    <g transform="translate(${mill},84)" stroke="#1c100c" stroke-width="2" fill="none"><path d="M-6 0L-2 -34H2L6 0"/><g transform="translate(0,-36)"><path d="M0 0L-18 -10M0 0L18 10M0 0L10 -18M0 0L-10 18"/><circle r="2.4" fill="#1c100c"/></g></g>
    <path d="M0 90h150M20 90v-10M50 90v-10M80 90v-10M110 90v-10M140 90v-10M0 84h150" stroke="#2a160c" stroke-width="2"/>
    <path d="M75 0v100M0 50h150" stroke="#8a5a2a" stroke-width="3.5"/></svg>`;
}
const fireplace = () => `<svg viewBox="0 0 110 190" width="110" height="190" style="margin-top:-92px;margin-left:-6px"><ellipse cx="55" cy="186" rx="46" ry="5" fill="#000" opacity=".3"/>
  <path d="M26 56Q4 56 2 30Q16 40 30 46Z M84 56Q106 56 108 30Q94 40 80 46Z" fill="#f0e2c2" stroke="#3a2a20" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M26 30Q55 22 84 30Q92 52 80 72Q55 82 30 72Q18 52 26 30Z" fill="#6a3a1e" stroke="#2a160c" stroke-width="3"/>
  <ellipse cx="55" cy="68" rx="18" ry="12" fill="#c8946a" stroke="#2a160c" stroke-width="2.4"/><ellipse cx="46" cy="70" rx="3" ry="2.4" fill="#2a160c"/><ellipse cx="64" cy="70" rx="3" ry="2.4" fill="#2a160c"/>
  <circle cx="42" cy="52" r="3" fill="#1c100c"/><circle cx="68" cy="52" r="3" fill="#1c100c"/><circle cx="55" cy="60" r="3.4" fill="#e0a850" opacity="0"/>
  <path d="M10 98V92Q10 84 55 82Q100 84 100 92V186H10Z" fill="#8a7a6a" stroke="#3a2a20" stroke-width="3"/>
  ${Array.from({ length: 11 }, (_, i) => `<path d="M${12 + (i % 2) * 7} ${96 + i * 8}h${86 - (i % 2) * 9}" stroke="#5a4a3a" stroke-width="2"/>`).join('')}
  <rect x="6" y="84" width="98" height="12" rx="3" fill="#6a4a2a" stroke="#3a2a20" stroke-width="2.5"/>
  <path d="M26 186V128Q26 112 55 112T84 128V186Z" fill="#1c100c" stroke="#3a2a20" stroke-width="3"/>
  <path d="M55 180Q38 168 46 150Q48 162 55 156Q57 140 66 130Q66 146 76 154Q80 170 55 180Z" fill="#ff8a2a"/><path d="M55 180Q46 172 50 164Q53 168 55 164Q58 156 62 152Q62 164 66 168Q66 176 55 180Z" fill="#ffd84a"/>
  <path d="M30 184h50" stroke="#ff8a2a" stroke-width="3" opacity=".6"/></svg>`;
const pendants = () => `<svg viewBox="0 0 150 70" width="150" height="70">${[22, 75, 128].map((x, i) => `<path d="M${x} 0V${14 + i % 2 * 8}" stroke="#2a2018" stroke-width="2.6"/><path d="M${x - 17} ${38 + i % 2 * 8}Q${x - 17} ${18 + i % 2 * 8} ${x} ${16 + i % 2 * 8}T${x + 17} ${38 + i % 2 * 8}Z" fill="#c8743a" stroke="#4a2410" stroke-width="2.4"/><ellipse cx="${x}" cy="${40 + i % 2 * 8}" rx="14" ry="4" fill="#ffe6a0"/><ellipse cx="${x}" cy="${46 + i % 2 * 8}" rx="22" ry="10" fill="#ffc870" opacity=".28"/>`).join('')}</svg>`;
const fern = () => `<svg viewBox="0 0 80 110" width="80" height="110"><ellipse cx="40" cy="104" rx="26" ry="5" fill="#000" opacity=".28"/>
  <path d="M40 76Q8 70 4 30Q34 38 40 76ZM40 76Q72 70 76 30Q46 38 40 76ZM40 74Q20 44 38 4Q58 40 40 74ZM40 78Q14 80 6 56Q30 58 40 78ZM40 78Q66 80 74 56Q50 58 40 78Z" fill="#4f9a4a" stroke="#2a5f2a" stroke-width="1.8" stroke-linejoin="round"/><path d="M40 76Q38 40 38 8M40 76Q18 50 8 34M40 76Q62 50 72 34" stroke="#2f6f2f" stroke-width="1.6" fill="none"/>
  <path d="M22 78h36l-5 28H27z" fill="#6a3a1e" stroke="#2a160c" stroke-width="2.6"/><path d="M24 86h32" stroke="#e0a850" stroke-width="2.4"/></svg>`;
const wine = () => `<svg viewBox="0 0 78 150" width="78" height="150"><rect x="2" y="2" width="74" height="146" rx="4" fill="#3a2214" stroke="#e0a850" stroke-width="3"/><rect x="8" y="8" width="62" height="134" fill="#1c0e06"/>
  ${[0, 1, 2, 3].map((r) => `<path d="M8 ${40 + r * 32}h62" stroke="#8a5a2a" stroke-width="4"/>${[0, 1, 2].map((c) => { const x = 18 + c * 20, y = 14 + r * 32, col = ['#2a5a3a', '#6a1c2a', '#3a2a1a'][(c + r) % 3]; return `<rect x="${x - 4}" y="${y + 8}" width="8" height="18" rx="2" fill="${col}" stroke="#0a0604" stroke-width="1"/><rect x="${x - 1.6}" y="${y}" width="3.2" height="10" fill="${col}"/><rect x="${x - 4}" y="${y + 14}" width="8" height="5" fill="#f0e2c2"/>`; }).join('')}`).join('')}
  <circle cx="39" cy="3" r="0" fill="none"/><path d="M8 8h62" stroke="#ffc870" stroke-width="2" opacity=".5"/></svg>`;
const painting = () => `<svg viewBox="0 0 84 104" width="84" height="104"><rect x="2" y="2" width="80" height="100" rx="3" fill="#6a4420" stroke="#e0a850" stroke-width="3.4"/><rect x="9" y="9" width="66" height="86" fill="#2a1a10"/>
  <defs><linearGradient id="pnt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a78b8"/><stop offset=".6" stop-color="#f0a080"/><stop offset="1" stop-color="#ffc888"/></linearGradient></defs>
  <rect x="9" y="9" width="66" height="86" fill="url(#pnt)"/><path d="M9 62L26 42 40 56 56 36 75 60V95H9Z" fill="#4a4a78"/><path d="M9 78Q40 64 75 80V95H9Z" fill="#3a5a3a"/><circle cx="58" cy="30" r="7" fill="#fff0b8"/><path d="M30 78l6-14 6 14z" fill="#1c3a20"/></svg>`;
const extra = (g, L, put, { WALL_BOTTOM }) => {
  let h = '';
  const gap = (c) => L.dineX + (c + 1) * L.cellW - 27; // centre of the gap between windows c and c+1
  if (L.cols >= 2) h += put('sc-wine', gap(0), WALL_BOTTOM - 150, wine(), 'transform:scale(.68);transform-origin:0 0');
  if (L.cols >= 3) h += put('sc-painting', gap(1), WALL_BOTTOM - 150, painting(), 'transform:scale(.62);transform-origin:0 0');
  if (L.cols >= 4) h += put('sc-wine', gap(2), WALL_BOTTOM - 150, wine(), 'transform:scale(.68);transform-origin:0 0');
  return h;
};
const chandelier = () => `<svg viewBox="0 0 120 100" width="120" height="100" style="margin-left:-30px"><path d="M60 0V22" stroke="#2a2018" stroke-width="3.5"/><ellipse cx="60" cy="46" rx="56" ry="24" fill="#ffc870" opacity=".13"/>
  <path d="M60 22Q50 40 14 42M60 22Q70 40 106 42M60 22V44" stroke="#2a2018" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M8 44h104" stroke="#2a2018" stroke-width="5" stroke-linecap="round"/><circle cx="60" cy="22" r="6" fill="#2a2018"/>
  ${[14, 37, 60, 83, 106].map((x) => `<rect x="${x - 4}" y="34" width="8" height="12" fill="#f3e6c8" stroke="#8a7a5a" stroke-width="1.2"/><path d="M${x} 24Q${x - 5} 31 ${x} 36Q${x + 5} 31 ${x} 24Z" fill="#ffd84a" stroke="#ff8a2a" stroke-width="1.2"/><circle cx="${x}" cy="30" r="9" fill="#ffc870" opacity=".3"/>`).join('')}
  <path d="M30 48q4 14 0 22M60 48v34M90 48q-4 14 0 22" stroke="#2a2018" stroke-width="2.2" fill="none"/><circle cx="30" cy="72" r="3.6" fill="#2a2018"/><circle cx="60" cy="86" r="4.4" fill="#2a2018"/><circle cx="90" cy="72" r="3.6" fill="#2a2018"/></svg>`;
const stall = (kind) => `<svg viewBox="0 0 150 130" width="150" height="130"><rect x="8" y="42" width="134" height="88" rx="6" fill="#6a4420" stroke="#2a160c" stroke-width="4"/><path d="M8 64h134M8 88h134" stroke="#8a5a2a" stroke-width="2.4"/><path d="M0 44Q75 6 150 44Z" fill="#fff0d8" stroke="#2a160c" stroke-width="4" stroke-linejoin="round"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${6 + i * 24} 42Q${14 + i * 24} 14 ${30 + i * 24} 22L${28 + i * 24} 42Z" fill="${kind === 'drink' ? '#8a2a2a' : '#2a4a8a'}" opacity=".9"/>`).join('')}<path d="M0 44q18 12 37 0t38 0 38 0 37 0" fill="#fff0d8" stroke="#2a160c" stroke-width="3"/><circle cx="75" cy="98" r="20" fill="#fff0d8" stroke="#2a160c" stroke-width="3"/>${kind === 'drink' ? '<path d="M68 84h14q2 14 -7 16T68 84z" fill="#a82a3a" stroke="#4a0a1a" stroke-width="1.8"/><path d="M75 100v8M68 108h14" stroke="#4a0a1a" stroke-width="2"/>' : '<path d="M60 102q15-24 30 0z" fill="#e8b868" stroke="#8a5a1a" stroke-width="2"/><path d="M64 98h22" stroke="#fff" stroke-width="3" opacity=".7"/><circle cx="75" cy="88" r="4" fill="#c82a3a"/>'}</svg>`;

export const steakKit = { window: prairieWindow, jukebox: fireplace, lamp: chandelier, plant: fern, pans: pendants, extra, stall, sign: 'Big Sky Grill' };
