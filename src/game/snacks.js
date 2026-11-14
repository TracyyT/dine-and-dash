// The little treat stand in the wait line. Every chapter has its own: it is the same game (empty at the start, the waiter refills it,
// the upgrade adds refills) but dressed to match the restaurant. Lemonade belongs to the steakhouse.

const O = '#3a1f12'; // outline

// 40x40 symbols, shared by the cup counter, the "+35%" float and the toast. Added to the page once with the other icons.
export const SNACK_SYMBOLS = `
 <symbol id="sn-cookie" viewBox="0 0 40 40"><circle cx="20" cy="21" r="14" fill="#e0a85c" stroke="${O}" stroke-width="2.5"/><circle cx="14" cy="16" r="2.6" fill="#5a2f1a"/><circle cx="25" cy="14" r="2.2" fill="#5a2f1a"/><circle cx="26" cy="25" r="2.8" fill="#5a2f1a"/><circle cx="15" cy="27" r="2.2" fill="#5a2f1a"/><circle cx="21" cy="21" r="1.6" fill="#5a2f1a"/></symbol>
 <symbol id="sn-coconut" viewBox="0 0 40 40"><ellipse cx="18" cy="24" rx="13" ry="13" fill="#8a5a32" stroke="${O}" stroke-width="2.5"/><ellipse cx="18" cy="14" rx="9" ry="4" fill="#fff6e0" stroke="${O}" stroke-width="2"/><path d="M20 14L31 3" stroke="#e0533f" stroke-width="3.5" stroke-linecap="round"/><path d="M25 9l3 3" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><circle cx="13" cy="26" r="1.5" fill="${O}"/><circle cx="19" cy="29" r="1.5" fill="${O}"/><circle cx="23" cy="24" r="1.5" fill="${O}"/></symbol>
 <symbol id="sn-tea" viewBox="0 0 40 40"><ellipse cx="20" cy="33" rx="15" ry="4" fill="#fff" stroke="#3a5a8a" stroke-width="2"/><path d="M7 15h24q0 15-12 15T7 15Z" fill="#fff" stroke="#3a5a8a" stroke-width="2.5" stroke-linejoin="round"/><path d="M31 18q8 0 6 6q-2 4-8 3" fill="none" stroke="#3a5a8a" stroke-width="2.5" stroke-linecap="round"/><path d="M8 15h22" stroke="#7bb26a" stroke-width="3"/><path d="M14 10q-3-3 0-6M21 10q-3-3 0-6" stroke="#fff" stroke-opacity=".8" stroke-width="2.5" fill="none" stroke-linecap="round"/></symbol>
 <symbol id="sn-macaron" viewBox="0 0 40 40"><path d="M5 17Q5 6 20 6Q35 6 35 17Z" fill="#f6a8c4" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/><rect x="6" y="17" width="28" height="6" rx="3" fill="#fff6e0" stroke="${O}" stroke-width="2.2"/><path d="M5 23Q5 34 20 34Q35 34 35 23Z" fill="#f6a8c4" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 12q4-3 9-2" stroke="#fff" stroke-opacity=".7" stroke-width="2.5" fill="none" stroke-linecap="round"/></symbol>`;

// ---- the treat station: a little table with a plate. Each refill puts items on the plate; buying the upgrade dresses the whole table up. ----
// Three looks per chapter: 0 = plain table, 1 = dressed table (cloth + decoration), 2 = high-end (cloth with gold, raised stand, glow, sparkle).
const PAL = {
  city:    { top: '#b98048', dk: '#6a4420', cloth: '#d83a4a', cloth2: '#fff6e0', gold: '#e8c766', plate: '#fff6e0', inner: '#f1e0c0', tray: '#c8d0d4', trayIn: '#eef1f2' },
  beach:   { top: '#d8a85e', dk: '#7a5426', cloth: '#2aa6b8', cloth2: '#ffffff', gold: '#f0c060', plate: '#fff8e8', inner: '#f3e6c8', tray: '#e8c88a', trayIn: '#f8ecd0' },
  chinese: { top: '#b8312f', dk: '#6a1414', cloth: '#c8282a', cloth2: '#e8c766', gold: '#e8c766', plate: '#ffffff', inner: '#e8f0f8', tray: '#d8a85e', trayIn: '#f0d8a0' },
  fine:    { top: '#f1e6cf', dk: '#b8a888', cloth: '#7d1d33', cloth2: '#e8c766', gold: '#e8c766', plate: '#ffffff', inner: '#f4eee0', tray: '#e8c766', trayIn: '#f8ecc0' },
  steak:   { top: '#9a6a3a', dk: '#4a2c14', cloth: '#c83a3a', cloth2: '#ffffff', gold: '#c8d0d4', plate: '#e8ecee', inner: '#cfd6da', tray: '#9aa4aa', trayIn: '#dfe5e8' },
};
// Where the tray sits (svg units, 80x110 box) for each look, so the items can be laid on it.
export const PLATE = [{ cy: 66, rx: 22 }, { cy: 64, rx: 24 }, { cy: 58, rx: 26 }];
// Positions (px from the tray centre) of the items on a tray that holds `n`. The last one is the first to be taken.
export const plateSlots = (n) => (n <= 1 ? [[0, 0]] : n === 2 ? [[-11, 1], [11, 1]] : [[-15, 2], [15, 2], [0, -2]]);

const scallops = (x0, x1, y) => { let d = `M${x0} ${y}`; for (let x = x0; x < x1; x += 10) d += `q5 7 10 0`; return d; };
const deco = (theme, t, c) => {
  const x = theme === 'fine' && t === 2 ? 8 : 12; // beside the plate, on the left (the rope post is on the right)
  if (theme === 'city') return `<path d="M${x} 72V${t === 2 ? 32 : 42}" stroke="${O}" stroke-width="2.5" stroke-linecap="round"/><path d="M${x} ${t === 2 ? 32 : 42}l13 4-13 6Z" fill="${c.cloth}" stroke="${O}" stroke-width="2" stroke-linejoin="round"/>${t === 2 ? `<path d="M${x} 44l11 3.5-11 5Z" fill="${c.gold}" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><circle cx="${x}" cy="31" r="2.6" fill="${c.gold}" stroke="${O}" stroke-width="1.5"/>` : ''}`;
  if (theme === 'beach') { const top = t === 2 ? 26 : 38, w = t === 2 ? 17 : 13; return `<path d="M${x} 72V${top}" stroke="${O}" stroke-width="2.5" stroke-linecap="round"/><path d="M${x - w} ${top + 12}Q${x} ${top - 8} ${x + w} ${top + 12}Z" fill="${c.cloth}" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><path d="M${x - w / 2} ${top + 4}l${w / 4} 8M${x} ${top}v12M${x + w / 2} ${top + 4}l${-w / 4} 8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>${t === 2 ? `<circle cx="64" cy="68" r="4" fill="#f27a9a" stroke="${O}" stroke-width="1.5"/><circle cx="64" cy="68" r="1.5" fill="#ffe14a"/><path d="M58 74q6-5 12 0" stroke="#2f6a2a" stroke-width="2" fill="none"/>` : ''}`; }
  if (theme === 'chinese') { const lan = (lx, ly, r) => `<path d="M${lx} ${ly - r - 5}v5" stroke="${O}" stroke-width="2"/><ellipse cx="${lx}" cy="${ly}" rx="${r * 0.85}" ry="${r}" fill="#d83a2a" stroke="${O}" stroke-width="2"/><path d="M${lx - r * 0.4} ${ly - r + 1}Q${lx - r * 0.2} ${ly} ${lx - r * 0.4} ${ly + r - 1}M${lx + r * 0.4} ${ly - r + 1}Q${lx + r * 0.2} ${ly} ${lx + r * 0.4} ${ly + r - 1}" stroke="#a82010" stroke-width="1.5" fill="none"/><rect x="${lx - r * 0.45}" y="${ly - r - 2}" width="${r * 0.9}" height="3" rx="1.5" fill="${c.gold}" stroke="${O}" stroke-width="1.2"/><rect x="${lx - r * 0.45}" y="${ly + r - 1}" width="${r * 0.9}" height="3" rx="1.5" fill="${c.gold}" stroke="${O}" stroke-width="1.2"/><path d="M${lx} ${ly + r + 2}v7" stroke="${c.gold}" stroke-width="2" stroke-linecap="round"/>`; return `<path d="M${x} 72V${t === 2 ? 32 : 40}" stroke="${c.gold}" stroke-width="3" stroke-linecap="round"/>${lan(x, t === 2 ? 40 : 48, t === 2 ? 8 : 6.5)}${t === 2 ? lan(0, 54, 5.5) : ''}`; }
  if (theme === 'fine') { const flame = (fx, fy) => `<path d="M${fx} ${fy - 8}q3.5 5 0 8q-3.5-3 0-8Z" fill="#ffb830" stroke="#e07a10" stroke-width="1"/>`; return t === 2 ? `<path d="M${x} 72V50M${x - 7} 56q0 8 7 8t7-8" stroke="${c.gold}" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="${x - 9}" y="46" width="4" height="10" rx="1.5" fill="${c.plate}" stroke="${O}" stroke-width="1.5"/><rect x="${x - 2}" y="40" width="4" height="10" rx="1.5" fill="${c.plate}" stroke="${O}" stroke-width="1.5"/><rect x="${x + 5}" y="46" width="4" height="10" rx="1.5" fill="${c.plate}" stroke="${O}" stroke-width="1.5"/>${flame(x - 7, 46)}${flame(x, 40)}${flame(x + 7, 46)}<ellipse cx="${x}" cy="72" rx="8" ry="2.5" fill="${c.gold}" stroke="${O}" stroke-width="1.5"/>` : `<rect x="${x - 1.5}" y="60" width="3" height="12" fill="${c.gold}" stroke="${O}" stroke-width="1.5"/><rect x="${x - 2.5}" y="50" width="5" height="11" rx="1.5" fill="${c.plate}" stroke="${O}" stroke-width="1.5"/>${flame(x, 50)}`; }
  // steakhouse: a hurricane lamp, and with the top look a string of lights over the table
  return `<rect x="${x - 6}" y="${t === 2 ? 50 : 54}" width="12" height="${t === 2 ? 22 : 18}" rx="5" fill="#ffe9a0" fill-opacity=".8" stroke="${O}" stroke-width="2"/><path d="M${x} ${t === 2 ? 66 : 68}q3-5 0-9q-3 4 0 9Z" fill="#ff9a30"/><rect x="${x - 7}" y="${t === 2 ? 70 : 70}" width="14" height="3" rx="1.5" fill="${c.dk}" stroke="${O}" stroke-width="1.5"/>${t === 2 ? `<path d="M6 36Q40 54 74 36" stroke="${O}" stroke-width="1.8" fill="none"/>${[[14, 41], [26, 46], [40, 48], [54, 46], [66, 41]].map(([bx, by]) => `<circle cx="${bx}" cy="${by + 2}" r="2.6" fill="#ffe14a" stroke="#a8861a" stroke-width="1"/>`).join('')}` : ''}`;
};
export const stationSVG = (theme, tier = 0) => {
  const c = PAL[theme] || PAL.steak, t = Math.max(0, Math.min(2, tier)), P = PLATE[t];
  let s = `<ellipse cx="40" cy="104" rx="32" ry="6" fill="#000" opacity=".28"/>`;
  if (t === 2) s += `<defs><radialGradient id="stg"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient></defs><circle cx="40" cy="62" r="42" fill="url(#stg)"/>`;
  // ---- the serving station itself: a small cabinet / cart ----
  if (t === 0) {
    s += `<rect x="15" y="76" width="50" height="25" rx="3" fill="${c.top}" stroke="${O}" stroke-width="2.5"/><path d="M15 84h50M15 92h50" stroke="${c.dk}" stroke-width="1.6" opacity=".7"/><rect x="19" y="99" width="8" height="4" rx="1.5" fill="${c.dk}" stroke="${O}" stroke-width="1.5"/><rect x="53" y="99" width="8" height="4" rx="1.5" fill="${c.dk}" stroke="${O}" stroke-width="1.5"/>`;
    s += `<rect x="10" y="70" width="60" height="8" rx="3" fill="${c.dk}" stroke="${O}" stroke-width="2.5"/>`;
  } else {
    s += `<rect x="13" y="75" width="54" height="${t === 2 ? 24 : 26}" rx="4" fill="${c.cloth}" stroke="${O}" stroke-width="2.5"/>`;
    s += `<rect x="18" y="81" width="44" height="${t === 2 ? 14 : 15}" rx="3" fill="none" stroke="${c.cloth2}" stroke-width="2" ${t === 1 ? 'stroke-dasharray="5 3"' : ''}/>`;
    if (t === 1) s += `<circle cx="40" cy="88.5" r="4" fill="${c.cloth2}" stroke="${O}" stroke-width="1.5"/>`;
    if (t === 2) {
      s += `<path d="M24 88q4-6 8 0t8 0t8 0t8 0" stroke="${c.gold}" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="21" cy="84" r="1.6" fill="${c.gold}"/><circle cx="59" cy="84" r="1.6" fill="${c.gold}"/><circle cx="21" cy="92" r="1.6" fill="${c.gold}"/><circle cx="59" cy="92" r="1.6" fill="${c.gold}"/>`;
      s += `<rect x="13" y="96" width="54" height="4" fill="${c.gold}" stroke="${O}" stroke-width="1.8"/><circle cx="22" cy="102" r="4.5" fill="${c.dk}" stroke="${O}" stroke-width="2"/><circle cx="58" cy="102" r="4.5" fill="${c.dk}" stroke="${O}" stroke-width="2"/><circle cx="22" cy="102" r="1.5" fill="${c.gold}"/><circle cx="58" cy="102" r="1.5" fill="${c.gold}"/>`;
    }
    s += `<rect x="9" y="69" width="62" height="8" rx="3.5" fill="${t === 2 ? c.gold : c.cloth2}" stroke="${O}" stroke-width="2.5"/>`;
  }
  if (t >= 1) s += deco(theme, t, c);
  // ---- the tray: wide and flat, with a raised rim and two handles ----
  const hw = P.rx, y0 = P.cy - 4;
  if (t === 2) s += `<rect x="${40 - hw * 0.6}" y="${P.cy + 4}" width="5" height="${69 - P.cy - 4}" fill="${c.gold}" stroke="${O}" stroke-width="1.6"/><rect x="${40 + hw * 0.6 - 5}" y="${P.cy + 4}" width="5" height="${69 - P.cy - 4}" fill="${c.gold}" stroke="${O}" stroke-width="1.6"/>`;
  s += `<path d="M${40 - hw} ${P.cy - 1}q-6-1-6 3.5t6 3.5M${40 + hw} ${P.cy - 1}q6-1 6 3.5t-6 3.5" stroke="${t === 2 ? c.gold : O}" stroke-width="${t === 2 ? 3 : 2.5}" fill="none" stroke-linecap="round"/>`;
  s += `<rect x="${40 - hw}" y="${y0}" width="${hw * 2}" height="9" rx="4.5" fill="${t === 2 ? c.gold : c.tray}" stroke="${O}" stroke-width="2.5"/><rect x="${40 - hw + 3}" y="${y0 + 1.6}" width="${hw * 2 - 6}" height="4.6" rx="2.3" fill="${c.trayIn}"/>`;
  if (t >= 1) s += [-0.7, -0.35, 0, 0.35, 0.7].map((f) => `<circle cx="${40 + f * hw}" cy="${y0 + 7.4}" r="1" fill="${t === 2 ? '#fff6c0' : c.cloth}"/>`).join('');
  if (t === 2) s += `<path class="twk" d="M8 44l1.6 4 4 1.6-4 1.6L8 55l-1.6-3.8-4-1.6 4-1.6Z" fill="#fff6c0"/><path class="twk twk2" d="M74 58l1.3 3.2 3.2 1.3-3.2 1.3L74 67l-1.3-3.2-3.2-1.3 3.2-1.3Z" fill="#fff6c0"/>`;
  return `<svg class="fount" viewBox="0 0 80 110" width="80" height="110" aria-hidden="true">${s}</svg>`;
};

// 48x48 pictures for the Upgrade shop.
const ui = (inner) => `<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">${inner}</svg>`;
const OUT = 'stroke="#2a1a12" stroke-width="2" stroke-linejoin="round"';
const shadow = '<ellipse cx="24" cy="43" rx="14" ry="3.5" fill="#2a1a12" opacity=".3"/>';
export const SNACK_SHOP_ICONS = {
  city: ui(`${shadow}<path d="M11 14h26l-2 26Q24 45 13 40Z" fill="#fff6e0" fill-opacity=".8" ${OUT}/><path d="M13 30h22l-1 10Q24 44 14 40Z" fill="#e0a85c"/><circle cx="19" cy="34" r="3.5" fill="#d99a48" ${OUT}/><circle cx="29" cy="36" r="3.5" fill="#d99a48" ${OUT}/><rect x="9" y="8" width="30" height="8" rx="3" fill="#d83a4a" ${OUT}/><circle cx="24" cy="6" r="3.5" fill="#d83a4a" ${OUT}/>`),
  beach: ui(`${shadow}<ellipse cx="22" cy="28" rx="14" ry="15" fill="#8a5a32" ${OUT}/><ellipse cx="22" cy="17" rx="9" ry="4" fill="#fff6e0" ${OUT}/><path d="M25 17L38 4" stroke="#e0533f" stroke-width="4" stroke-linecap="round"/><circle cx="17" cy="30" r="1.6" fill="#2a1a12"/><circle cx="24" cy="34" r="1.6" fill="#2a1a12"/><circle cx="28" cy="28" r="1.6" fill="#2a1a12"/>`),
  chinese: ui(`${shadow}<path d="M10 30Q8 44 24 44Q40 44 38 30Q38 20 24 20Q10 20 10 30Z" fill="#fff" stroke="#3a5a8a" stroke-width="2" stroke-linejoin="round"/><path d="M38 28q8-1 6 6q-1 4-7 4" fill="none" stroke="#3a5a8a" stroke-width="2.5" stroke-linecap="round"/><path d="M10 32Q2 28 5 20" fill="none" stroke="#3a5a8a" stroke-width="3" stroke-linecap="round"/><path d="M17 20Q17 13 24 13Q31 13 31 20Z" fill="#fff" stroke="#3a5a8a" stroke-width="2"/><circle cx="24" cy="10" r="3" fill="#7bb26a" stroke="#2f6a2a" stroke-width="1.5"/><path d="M16 36q8 5 16 0" stroke="#3a5a8a" stroke-width="2" fill="none" stroke-linecap="round"/>`),
  fine: ui(`${shadow}<path d="M6 20Q6 8 24 8Q42 8 42 20Z" fill="#f6a8c4" ${OUT}/><rect x="7" y="20" width="34" height="7" rx="3.5" fill="#fff6e0" ${OUT}/><path d="M6 27Q6 42 24 42Q42 42 42 27Z" fill="#a8d8b0" ${OUT}/><path d="M12 14q6-4 12-2" stroke="#fff" stroke-opacity=".7" stroke-width="3" fill="none" stroke-linecap="round"/>`),
};

export const SNACKS = {
  city:    { id: 'cookies',   name: 'cookies',   label: 'Cookies',   upName: 'Bigger cookie jar', cup: 'sn-cookie',  stand: (t) => stationSVG('city', t) },
  beach:   { id: 'coconuts',  name: 'coconuts',  label: 'Coconuts',  upName: 'More coconuts',     cup: 'sn-coconut', stand: (t) => stationSVG('beach', t) },
  chinese: { id: 'tea',       name: 'tea',       label: 'Tea',       upName: 'Bigger tea pot',    cup: 'sn-tea',     stand: (t) => stationSVG('chinese', t) },
  fine:    { id: 'macarons',  name: 'macarons',  label: 'Macarons',  upName: 'More macarons',     cup: 'sn-macaron', stand: (t) => stationSVG('fine', t) },
  steak:   { id: 'lemonade',  name: 'lemonade',  label: 'Lemonade',  upName: 'Bigger jar',        cup: 'ic-cup',     stand: (t) => stationSVG('steak', t) },
};
export const snackFor = (theme) => SNACKS[theme] || SNACKS.steak;
