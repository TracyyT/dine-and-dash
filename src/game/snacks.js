// The little treat stand in the wait line. Every chapter has its own: it is the same game (empty at the start, the waiter refills it,
// the upgrade adds refills) but dressed to match the restaurant. Lemonade belongs to the steakhouse.
import { fountainSVG } from './sprites.js';

const O = '#3a1f12'; // outline

// 40x40 symbols, shared by the cup counter, the "+35%" float and the toast. Added to the page once with the other icons.
export const SNACK_SYMBOLS = `
 <symbol id="sn-cookie" viewBox="0 0 40 40"><circle cx="20" cy="21" r="14" fill="#e0a85c" stroke="${O}" stroke-width="2.5"/><circle cx="14" cy="16" r="2.6" fill="#5a2f1a"/><circle cx="25" cy="14" r="2.2" fill="#5a2f1a"/><circle cx="26" cy="25" r="2.8" fill="#5a2f1a"/><circle cx="15" cy="27" r="2.2" fill="#5a2f1a"/><circle cx="21" cy="21" r="1.6" fill="#5a2f1a"/></symbol>
 <symbol id="sn-coconut" viewBox="0 0 40 40"><ellipse cx="18" cy="24" rx="13" ry="13" fill="#8a5a32" stroke="${O}" stroke-width="2.5"/><ellipse cx="18" cy="14" rx="9" ry="4" fill="#fff6e0" stroke="${O}" stroke-width="2"/><path d="M20 14L31 3" stroke="#e0533f" stroke-width="3.5" stroke-linecap="round"/><path d="M25 9l3 3" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><circle cx="13" cy="26" r="1.5" fill="${O}"/><circle cx="19" cy="29" r="1.5" fill="${O}"/><circle cx="23" cy="24" r="1.5" fill="${O}"/></symbol>
 <symbol id="sn-tea" viewBox="0 0 40 40"><ellipse cx="20" cy="33" rx="15" ry="4" fill="#fff" stroke="#3a5a8a" stroke-width="2"/><path d="M7 15h24q0 15-12 15T7 15Z" fill="#fff" stroke="#3a5a8a" stroke-width="2.5" stroke-linejoin="round"/><path d="M31 18q8 0 6 6q-2 4-8 3" fill="none" stroke="#3a5a8a" stroke-width="2.5" stroke-linecap="round"/><path d="M8 15h22" stroke="#7bb26a" stroke-width="3"/><path d="M14 10q-3-3 0-6M21 10q-3-3 0-6" stroke="#fff" stroke-opacity=".8" stroke-width="2.5" fill="none" stroke-linecap="round"/></symbol>
 <symbol id="sn-macaron" viewBox="0 0 40 40"><path d="M5 17Q5 6 20 6Q35 6 35 17Z" fill="#f6a8c4" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/><rect x="6" y="17" width="28" height="6" rx="3" fill="#fff6e0" stroke="${O}" stroke-width="2.2"/><path d="M5 23Q5 34 20 34Q35 34 35 23Z" fill="#f6a8c4" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 12q4-3 9-2" stroke="#fff" stroke-opacity=".7" stroke-width="2.5" fill="none" stroke-linecap="round"/></symbol>`;

// 80x110 stands that fit the same spot as the lemonade jar.
const stand = (inner) => `<svg class="fount" viewBox="0 0 80 110" width="80" height="110" aria-hidden="true"><ellipse cx="40" cy="104" rx="30" ry="6" fill="#000" opacity=".28"/>${inner}</svg>`;
const cookieStand = () => stand(`
  <rect x="14" y="84" width="52" height="18" rx="5" fill="#8a5a32" stroke="${O}" stroke-width="2.5"/><rect x="20" y="89" width="40" height="4" rx="2" fill="#c8924e" opacity=".8"/>
  <path d="M16 36Q13 62 19 82H61Q67 62 64 36Z" fill="#fff6e0" fill-opacity=".55" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M17 56Q15 70 20 80H60Q65 70 63 56Z" fill="#e0a85c"/>
  <ellipse cx="30" cy="62" rx="8" ry="5" fill="#d99a48" stroke="#7a4a1c" stroke-width="1.5"/><ellipse cx="50" cy="66" rx="8" ry="5" fill="#d99a48" stroke="#7a4a1c" stroke-width="1.5"/><ellipse cx="38" cy="74" rx="8" ry="5" fill="#d99a48" stroke="#7a4a1c" stroke-width="1.5"/>
  <circle cx="28" cy="61" r="1.4" fill="#5a2f1a"/><circle cx="52" cy="65" r="1.4" fill="#5a2f1a"/><circle cx="40" cy="73" r="1.4" fill="#5a2f1a"/><circle cx="48" cy="63" r="1.2" fill="#5a2f1a"/>
  <path d="M22 44Q22 56 26 70" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none" stroke-linecap="round"/>
  <rect x="12" y="28" width="56" height="10" rx="4" fill="#d83a4a" stroke="${O}" stroke-width="2.5"/><ellipse cx="40" cy="22" rx="9" ry="7" fill="#d83a4a" stroke="${O}" stroke-width="2.5"/>`);
const coconutStand = () => stand(`
  <path d="M12 70h56l-5 32H17Z" fill="#a8743c" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 80h52M16 91h48" stroke="#6a4420" stroke-width="2"/><path d="M26 70l3 32M54 70l-3 32" stroke="#6a4420" stroke-width="1.5"/>
  <path d="M12 70q28-8 56 0" fill="#7bb26a" stroke="${O}" stroke-width="2.5"/>
  <ellipse cx="40" cy="50" rx="19" ry="21" fill="#8a5a32" stroke="${O}" stroke-width="2.5"/><ellipse cx="40" cy="33" rx="13" ry="5.5" fill="#fff6e0" stroke="${O}" stroke-width="2"/>
  <circle cx="31" cy="52" r="2" fill="${O}"/><circle cx="40" cy="58" r="2" fill="${O}"/><circle cx="47" cy="50" r="2" fill="${O}"/>
  <path d="M44 33L58 8" stroke="#e0533f" stroke-width="4.5" stroke-linecap="round"/><path d="M51 21l4 4" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <path d="M30 31Q24 14 10 14Q18 8 26 14Q22 20 30 31Z" fill="#6fae5a" stroke="#2f6a2a" stroke-width="2"/>`);
const teaStand = () => stand(`
  <rect x="10" y="80" width="60" height="22" rx="5" fill="#b8312f" stroke="${O}" stroke-width="2.5"/><rect x="10" y="80" width="60" height="6" rx="3" fill="#e8c766" stroke="${O}" stroke-width="2"/><path d="M22 90h36" stroke="#e8c766" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M18 56Q14 80 40 80Q66 80 62 56Q62 40 40 40Q18 40 18 56Z" fill="#fff" stroke="#3a5a8a" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M20 56Q18 66 24 74" stroke="#9cc3ea" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M30 52q10-8 20 0" stroke="#3a5a8a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M34 66q6 5 12 0" stroke="#3a5a8a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M62 52q14-2 12 10q-2 8-12 8" fill="none" stroke="#3a5a8a" stroke-width="3" stroke-linecap="round"/><path d="M18 58Q4 52 8 40Q10 36 14 38" fill="none" stroke="#3a5a8a" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M28 40Q28 30 40 30Q52 30 52 40Z" fill="#fff" stroke="#3a5a8a" stroke-width="2.5" stroke-linejoin="round"/><circle cx="40" cy="26" r="4" fill="#7bb26a" stroke="#2f6a2a" stroke-width="2"/>
  <path d="M10 22q-3-5 0-9M17 20q-3-5 0-9" stroke="#fff" stroke-opacity=".85" stroke-width="3" fill="none" stroke-linecap="round"/>`);
const macaronStand = () => stand(`
  <rect x="36" y="46" width="8" height="52" rx="3" fill="#e8c766" stroke="${O}" stroke-width="2.5"/><ellipse cx="40" cy="98" rx="20" ry="5" fill="#e8c766" stroke="${O}" stroke-width="2.5"/>
  <ellipse cx="40" cy="84" rx="30" ry="6" fill="#f1e6cf" stroke="${O}" stroke-width="2.5"/><ellipse cx="40" cy="62" rx="22" ry="5" fill="#f1e6cf" stroke="${O}" stroke-width="2.5"/><ellipse cx="40" cy="42" rx="14" ry="4" fill="#f1e6cf" stroke="${O}" stroke-width="2.5"/>
  ${[[18, 78, '#f6a8c4'], [32, 79, '#a8d8b0'], [47, 79, '#f6d98a'], [61, 78, '#c8b0e8'], [28, 57, '#f6d98a'], [42, 58, '#f6a8c4'], [54, 57, '#a8d8b0'], [34, 37, '#c8b0e8'], [47, 37, '#f6a8c4']].map(([x, y, c]) => `<rect x="${x - 7}" y="${y - 5}" width="14" height="11" rx="5" fill="${c}" stroke="${O}" stroke-width="2"/><path d="M${x - 6} ${y + 1}h12" stroke="#fff6e0" stroke-width="2.5"/>`).join('')}
  <circle cx="40" cy="30" r="4" fill="#d83a4a" stroke="${O}" stroke-width="2"/>`);

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
  city:    { id: 'cookies',   name: 'cookies',   label: 'Cookies',   upName: 'Bigger cookie jar', cup: 'sn-cookie',  stand: cookieStand },
  beach:   { id: 'coconuts',  name: 'coconuts',  label: 'Coconuts',  upName: 'More coconuts',     cup: 'sn-coconut', stand: coconutStand },
  chinese: { id: 'tea',       name: 'tea',       label: 'Tea',       upName: 'Bigger tea pot',    cup: 'sn-tea',     stand: teaStand },
  fine:    { id: 'macarons',  name: 'macarons',  label: 'Macarons',  upName: 'More macarons',     cup: 'sn-macaron', stand: macaronStand },
  steak:   { id: 'lemonade',  name: 'lemonade',  label: 'Lemonade',  upName: 'Bigger jar',        cup: 'ic-cup',     stand: fountainSVG },
};
export const snackFor = (theme) => SNACKS[theme] || SNACKS.steak;
