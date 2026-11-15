// The little treat stand in the wait line. Every chapter has its own: it is the same game (empty at the start, the waiter refills it,
// the upgrade adds refills) but dressed to match the restaurant. Lemonade belongs to the steakhouse.

const O = '#3a1f12'; // outline

// 40x40 symbols, shared by the cup counter, the "+35%" float and the toast. Added to the page once with the other icons.
export const SNACK_SYMBOLS = `
 <symbol id="sn-cookie" viewBox="0 0 40 40"><circle cx="20" cy="21" r="14" fill="#e0a85c" stroke="${O}" stroke-width="2.5"/><circle cx="14" cy="16" r="2.6" fill="#5a2f1a"/><circle cx="25" cy="14" r="2.2" fill="#5a2f1a"/><circle cx="26" cy="25" r="2.8" fill="#5a2f1a"/><circle cx="15" cy="27" r="2.2" fill="#5a2f1a"/><circle cx="21" cy="21" r="1.6" fill="#5a2f1a"/></symbol>
 <symbol id="sn-coconut" viewBox="0 0 40 40"><ellipse cx="18" cy="24" rx="13" ry="13" fill="#8a5a32" stroke="${O}" stroke-width="2.5"/><ellipse cx="18" cy="14" rx="9" ry="4" fill="#fff6e0" stroke="${O}" stroke-width="2"/><path d="M20 14L31 3" stroke="#e0533f" stroke-width="3.5" stroke-linecap="round"/><path d="M25 9l3 3" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><circle cx="13" cy="26" r="1.5" fill="${O}"/><circle cx="19" cy="29" r="1.5" fill="${O}"/><circle cx="23" cy="24" r="1.5" fill="${O}"/></symbol>
 <symbol id="sn-tea" viewBox="0 0 40 40"><ellipse cx="20" cy="33" rx="15" ry="4" fill="#fff" stroke="#3a5a8a" stroke-width="2"/><path d="M7 15h24q0 15-12 15T7 15Z" fill="#fff" stroke="#3a5a8a" stroke-width="2.5" stroke-linejoin="round"/><path d="M31 18q8 0 6 6q-2 4-8 3" fill="none" stroke="#3a5a8a" stroke-width="2.5" stroke-linecap="round"/><path d="M8 15h22" stroke="#7bb26a" stroke-width="3"/><path d="M14 10q-3-3 0-6M21 10q-3-3 0-6" stroke="#fff" stroke-opacity=".8" stroke-width="2.5" fill="none" stroke-linecap="round"/></symbol>
 <symbol id="sn-macaron" viewBox="0 0 40 40"><path d="M5 17Q5 6 20 6Q35 6 35 17Z" fill="#f6a8c4" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/><rect x="6" y="17" width="28" height="6" rx="3" fill="#fff6e0" stroke="${O}" stroke-width="2.2"/><path d="M5 23Q5 34 20 34Q35 34 35 23Z" fill="#f6a8c4" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 12q4-3 9-2" stroke="#fff" stroke-opacity=".7" stroke-width="2.5" fill="none" stroke-linecap="round"/></symbol>`;

// ---- the treat station: a little "maker" machine with a tray at the front. Each refill puts items on the tray;
// buying the upgrade makes the whole machine fancier (3 looks per chapter: 0 = basic, 1 = upgraded, 2 = high-end). ----
const PAL = {
  city:    { top: '#b98048', dk: '#6a4420', cloth: '#b8323f', cloth2: '#fff6e0', gold: '#e8c766', tray: '#c8d0d4', trayIn: '#eef1f2' },
  beach:   { top: '#d8a85e', dk: '#7a5426', cloth: '#2aa6b8', cloth2: '#ffffff', gold: '#f0c060', tray: '#e8c88a', trayIn: '#f8ecd0' },
  chinese: { top: '#b8312f', dk: '#6a1414', cloth: '#c8282a', cloth2: '#e8c766', gold: '#e8c766', tray: '#d8a85e', trayIn: '#f0d8a0' },
  fine:    { top: '#f1e6cf', dk: '#b8a888', cloth: '#7d1d33', cloth2: '#e8c766', gold: '#e8c766', tray: '#e8c766', trayIn: '#f8ecc0' },
  steak:   { top: '#9a6a3a', dk: '#4a2c14', cloth: '#c83a3a', cloth2: '#ffffff', gold: '#c8d0d4', tray: '#9aa4aa', trayIn: '#dfe5e8' },
};
// Where the tray sits (svg units, 80x110 box), so the items can be laid on it.
export const PLATE = [{ cy: 90, rx: 34 }, { cy: 90, rx: 35 }, { cy: 90, rx: 36 }];
// Positions (px from the tray centre) of the items on a tray that holds `n`. The last one is the first to be taken.
export const plateSlots = (n) => (n <= 1 ? [[0, 0]] : n === 2 ? [[-13, 1], [13, 1]] : [[-17, 2], [17, 2], [0, -2]]);

const sw = (w = 2.5) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round"`;
// the cabinet the maker stands on
const base = (c, t) => {
  let s = '';
  if (t === 0) {
    s += `<rect x="14" y="66" width="52" height="24" rx="3" fill="${c.top}" ${sw()}/><path d="M14 74h52M14 82h52" stroke="${c.dk}" stroke-width="1.6" opacity=".7"/><rect x="10" y="60" width="60" height="7" rx="3" fill="${c.dk}" ${sw()}/>`;
  } else {
    s += `<rect x="13" y="66" width="54" height="24" rx="4" fill="${c.cloth}" ${sw()}/><rect x="18" y="71" width="44" height="14" rx="3" fill="none" stroke="${c.cloth2}" stroke-width="2" ${t === 1 ? 'stroke-dasharray="5 3"' : ''}/>`;
    if (t === 2) s += `<path d="M24 78q4-6 8 0t8 0t8 0t8 0" stroke="${c.gold}" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="13" y="84" width="54" height="4" fill="${c.gold}" ${sw(1.8)}/><circle cx="22" cy="99" r="4.5" fill="${c.dk}" ${sw(2)}/><circle cx="58" cy="99" r="4.5" fill="${c.dk}" ${sw(2)}/><circle cx="22" cy="99" r="1.6" fill="${c.gold}"/><circle cx="58" cy="99" r="1.6" fill="${c.gold}"/>`;
    s += `<rect x="9" y="59" width="62" height="8" rx="3.5" fill="${t === 2 ? c.gold : c.cloth2}" ${sw()}/>`;
  }
  return s;
};
const steam = (x, y) => `<path class="stm" d="M${x} ${y}q-4-4 0-8t0-8M${x + 6} ${y}q-4-4 0-8t0-8" stroke="#fff" stroke-opacity=".85" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
const macaron = (x, y, col) => `<rect x="${x - 5}" y="${y - 3.5}" width="10" height="7" rx="3.2" fill="${col}" ${sw(1.5)}/><path d="M${x - 4.5} ${y}h9" stroke="#fff6e0" stroke-width="1.6"/>`;

// the maker on top of the cabinet, one per chapter
const maker = (theme, t, c) => {
  if (theme === 'city') { // a cookie oven with a glowing window
    const body = t === 0 ? '#8d959b' : t === 1 ? '#b8323f' : '#8a1f33';
    let s = `<defs><linearGradient id="ovg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#ff7a1a"/></linearGradient></defs>`;
    if (t >= 1) s += `<rect x="49" y="12" width="9" height="16" rx="2" fill="#6a7278" ${sw(2)}/>`;
    if (t === 2) s += steam(52, 10);
    s += `<rect x="14" y="26" width="52" height="34" rx="7" fill="${body}" ${sw()}/>`;
    if (t >= 1) s += Array.from({ length: 7 }, (_, i) => `<rect x="${12 + i * 8}" y="22" width="8" height="7" fill="${i % 2 ? '#fff6e0' : c.cloth}" stroke="${O}" stroke-width="1.5"/>`).join('');
    s += `<rect x="20" y="34" width="40" height="20" rx="5" fill="#2a1410" ${sw(2)}/><rect x="22" y="36" width="36" height="16" rx="4" fill="url(#ovg)"/>`;
    const ck = (x, y) => `<circle cx="${x}" cy="${y}" r="4.6" fill="#e0a85c" ${sw(1.5)}/><circle cx="${x - 1.5}" cy="${y - 1}" r=".9" fill="#5a2f1a"/><circle cx="${x + 1.6}" cy="${y + 1.4}" r=".9" fill="#5a2f1a"/>`;
    s += ck(31, 47) + ck(49, 47) + (t >= 1 ? ck(40, 44) : '');
    s += `<circle cx="24" cy="30" r="2.2" fill="${c.gold}" ${sw(1.2)}/><circle cx="32" cy="30" r="2.2" fill="${c.gold}" ${sw(1.2)}/>`;
    if (t === 2) s += `<path d="M14 60h52" stroke="${c.gold}" stroke-width="3"/>`;
    return s;
  }
  if (theme === 'beach') { // a tiki coconut bar: thatched roof, posts, a coconut keg with a tap
    const rf = t === 0 ? 22 : 14;
    let s = `<rect x="15" y="34" width="5" height="26" fill="#a8743c" ${sw(2)}/><rect x="60" y="34" width="5" height="26" fill="#a8743c" ${sw(2)}/>`;
    s += `<rect x="27" y="40" width="26" height="20" rx="6" fill="#8a5a32" ${sw()}/><path d="M27 46h26M27 54h26" stroke="#4a2c14" stroke-width="2"/><rect x="38" y="53" width="5" height="7" rx="1.5" fill="${c.gold}" ${sw(1.5)}/><path d="M40.5 60v3" stroke="${O}" stroke-width="2"/>`;
    s += `<circle cx="21" cy="55" r="5" fill="#8a5a32" ${sw(1.8)}/><circle cx="59" cy="55" r="5" fill="#8a5a32" ${sw(1.8)}/>`;
    s += `<path d="M8 38L40 ${rf}L72 38Z" fill="#d8b050" ${sw()}/><path d="M18 33l-3 5M28 27l-3 11M40 ${rf + 3}v15M52 27l3 11M62 33l3 5" stroke="#9a7a28" stroke-width="1.8" stroke-linecap="round"/>`;
    if (t >= 1) s += `<path d="M10 38q5 7 10 0t10 0t10 0t10 0t10 0t10 0" fill="${c.cloth}" ${sw(2)}/><circle cx="22" cy="33" r="3.6" fill="#f27a9a" ${sw(1.4)}/><circle cx="58" cy="33" r="3.6" fill="#f27a9a" ${sw(1.4)}/>`;
    if (t === 2) s += `<path d="M40 40v5" stroke="${O}" stroke-width="2"/><rect x="36" y="45" width="8" height="9" rx="3" fill="#ffe9a0" ${sw(1.6)}/><circle cx="40" cy="22" r="3" fill="#f27a9a" ${sw(1.4)}/><circle cx="30" cy="30" r="3" fill="#f27a9a" ${sw(1.4)}/><circle cx="50" cy="30" r="3" fill="#f27a9a" ${sw(1.4)}/>`;
    return s;
  }
  if (theme === 'chinese') { // a big tea urn with a tap and steam
    const bodyC = t === 0 ? '#c87a3a' : '#c8282a';
    let s = t >= 1 ? steam(36, 14) : '';
    s += `<path d="M23 42q-9 0-9 6t9 3" stroke="${c.gold}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M57 42q9 0 9 6t-9 3" stroke="${c.gold}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    s += `<ellipse cx="40" cy="42" rx="18" ry="17" fill="${bodyC}" ${sw()}/><path d="M24 40q16 7 32 0" stroke="${c.gold}" stroke-width="3" fill="none"/>`;
    if (t >= 1) s += `<path d="M23 48q17 8 34 0" stroke="${c.gold}" stroke-width="2.4" fill="none"/>`;
    if (t === 2) s += `<path d="M30 54q5-6 10 0t10 0" stroke="${c.gold}" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="26" cy="44" r="1.6" fill="${c.gold}"/><circle cx="54" cy="44" r="1.6" fill="${c.gold}"/>`;
    s += `<path d="M26 28Q40 12 54 28Z" fill="${bodyC}" ${sw()}/><circle cx="40" cy="15" r="3.4" fill="${c.gold}" ${sw(1.8)}/>`;
    s += `<rect x="55" y="49" width="10" height="5" rx="2" fill="${c.gold}" ${sw(1.5)}/><path d="M63 54v6" stroke="${O}" stroke-width="2.2" stroke-linecap="round"/>`;
    if (t === 2) s += `<path d="M10 52v-6" stroke="${c.gold}" stroke-width="2.4"/><ellipse cx="10" cy="56" rx="4.6" ry="5.6" fill="#d83a2a" ${sw(1.6)}/>`;
    return s;
  }
  if (theme === 'fine') { // a glass pastry dome with shelves of macarons
    let s = `<path d="M16 60V36Q16 20 40 20Q64 20 64 36V60Z" fill="#dff0f6" fill-opacity=".55" stroke="${t === 0 ? '#9a8a6a' : c.gold}" stroke-width="3" stroke-linejoin="round"/>`;
    s += `<path d="M21 36q0-10 12-12" stroke="#fff" stroke-opacity=".8" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    s += `<rect x="18" y="56" width="44" height="3" fill="${c.gold}" ${sw(1.4)}/>`;
    const cols = ['#f6a8c4', '#a8d8b0', '#f6d98a', '#c8b0e8', '#f6a8c4'];
    const row = (n, y) => Array.from({ length: n }, (_, i) => macaron(40 + (i - (n - 1) / 2) * 11, y, cols[i % 5])).join('');
    s += row(t === 0 ? 3 : 4, 52);
    if (t >= 1) { s += `<rect x="20" y="42" width="40" height="3" fill="${c.gold}" ${sw(1.4)}/>` + row(3, 38.5); }
    if (t === 2) s += row(5, 52).replace(/^/, '') + `<circle cx="40" cy="17" r="3.6" fill="${c.gold}" ${sw(1.8)}/><path d="M32 20h16" stroke="${c.gold}" stroke-width="3"/>`;
    return s;
  }
  // steakhouse: a lemonade dispenser with glass tanks and a tap
  const tank = (x, w, liq, cap) => `<rect x="${x}" y="24" width="${w}" height="34" rx="8" fill="#fff6c8" fill-opacity=".55" ${sw()}/><rect x="${x + 2}" y="32" width="${w - 4}" height="24" rx="6" fill="${liq}"/><circle cx="${x + w / 2}" cy="42" r="4.6" fill="#fff27a" stroke="#a8861a" stroke-width="1.5"/><circle cx="${x + w / 2 + 5}" cy="50" r="3.6" fill="#fff27a" stroke="#a8861a" stroke-width="1.4"/><rect x="${x + w * 0.15}" y="19" width="${w * 0.7}" height="6" rx="2.5" fill="${cap}" ${sw(1.8)}/><rect x="${x + w / 2 - 4}" y="57" width="8" height="5" rx="2" fill="#c8d0d4" ${sw(1.5)}/><path d="M${x + w / 2} 62v3" stroke="${O}" stroke-width="2.2" stroke-linecap="round"/>`;
  let s = t === 0 ? tank(22, 36, '#ffd93a', '#8a949a') : tank(14, 24, '#ffd93a', t === 2 ? c.gold : '#8a949a') + tank(42, 24, '#f6a8c4', t === 2 ? c.gold : '#8a949a');
  if (t === 2) s += `<path d="M6 30Q40 46 74 30" stroke="${O}" stroke-width="1.8" fill="none"/>` + [[12, 33], [24, 37], [40, 40], [56, 37], [68, 33]].map(([bx, by]) => `<circle cx="${bx}" cy="${by + 1}" r="2.6" fill="#ffe14a" stroke="#a8861a" stroke-width="1"/>`).join('');
  return s;
};

export const stationSVG = (theme, tier = 0) => {
  const c = PAL[theme] || PAL.steak, t = Math.max(0, Math.min(2, tier)), P = PLATE[t];
  let s = `<ellipse cx="40" cy="97" rx="38" ry="5" fill="#000" opacity=".22"/>`;
  if (t === 2) s += `<defs><radialGradient id="stg"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient></defs><circle cx="40" cy="56" r="46" fill="url(#stg)"/>`;
  s += base(c, t) + maker(theme, t, c);
  // the tray at the front: wide and flat with a raised rim and two handles
  const hw = P.rx, y0 = P.cy - 4;
  s += `<path d="M${40 - hw} ${P.cy - 1}q-6-1-6 3.5t6 3.5M${40 + hw} ${P.cy - 1}q6-1 6 3.5t-6 3.5" stroke="${t === 2 ? c.gold : O}" stroke-width="${t === 2 ? 3 : 2.5}" fill="none" stroke-linecap="round"/>`;
  s += `<rect x="${40 - hw}" y="${y0}" width="${hw * 2}" height="9" rx="4.5" fill="${t === 2 ? c.gold : c.tray}" ${sw()}/><rect x="${40 - hw + 3}" y="${y0 + 1.6}" width="${hw * 2 - 6}" height="4.6" rx="2.3" fill="${c.trayIn}"/>`;
  if (t >= 1) s += [-0.7, -0.35, 0, 0.35, 0.7].map((f) => `<circle cx="${40 + f * hw}" cy="${y0 + 7.4}" r="1" fill="${t === 2 ? '#fff6c0' : c.cloth}"/>`).join('');
  if (t === 2) s += `<path class="twk" d="M6 40l1.6 4 4 1.6-4 1.6L6 51l-1.6-3.8-4-1.6 4-1.6Z" fill="#fff6c0"/><path class="twk twk2" d="M74 52l1.3 3.2 3.2 1.3-3.2 1.3L74 61l-1.3-3.2-3.2-1.3 3.2-1.3Z" fill="#fff6c0"/>`;
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
