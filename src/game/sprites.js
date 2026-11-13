// Small illustrated sprites, drawn as SVG strings. Colours come from the theme's CSS variables where it makes sense.
export const ICONS = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
 <symbol id="ic-dine" viewBox="0 0 40 40"><rect x="4" y="27" width="32" height="4" rx="2" fill="#8f6a22"/><path d="M6 27Q6 11 20 11Q34 11 34 27Z" fill="#e8c766" stroke="#8f6a22" stroke-width="2"/><circle cx="20" cy="8" r="3" fill="#8f6a22"/><path d="M12 22Q13 16 18 14" stroke="#fff6" stroke-width="2" fill="none" stroke-linecap="round"/></symbol>
 <symbol id="ic-bag" viewBox="0 0 40 40"><path d="M10 14h20l2 21H8z" fill="#d9a25a" stroke="#8a5a22" stroke-width="2" stroke-linejoin="round"/><path d="M14 14Q14 5 20 5Q26 5 26 14" fill="none" stroke="#8a5a22" stroke-width="2.4"/><path d="M10 20h20" stroke="#8a5a22" stroke-width="1.4" opacity=".5"/><path d="M17 26h6" stroke="#7d1d33" stroke-width="3" stroke-linecap="round"/></symbol>
 <symbol id="ic-order" viewBox="0 0 40 40"><rect x="9" y="5" width="22" height="30" rx="3" fill="#f1e6cf" stroke="#8f6a22" stroke-width="2"/><path d="M14 13h12M14 19h12M14 25h7" stroke="#8f6a22" stroke-width="2" stroke-linecap="round"/><path d="M27 27l6-6 3 3-6 6-4 1z" fill="#7d1d33"/></symbol>
 <symbol id="ic-bill" viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="#e8c766" stroke="#8f6a22" stroke-width="2.5"/><circle cx="20" cy="20" r="10.5" fill="none" stroke="#8f6a22" stroke-width="1.5"/><text x="20" y="26.5" text-anchor="middle" font-size="17" font-weight="700" fill="#6b4a12" font-family="Josefin Sans,sans-serif">$</text></symbol>
 <symbol id="ic-heart" viewBox="0 0 40 40"><path d="M20 35C6 25 5 14 11 10Q17 7 20 14Q23 7 29 10C35 14 34 25 20 35Z" fill="#e0476a" stroke="#8c1f3d" stroke-width="2"/></symbol>
 <symbol id="ic-angry" viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="#e0533f" stroke="#8c2418" stroke-width="2"/><path d="M10 13l9 4M30 13l-9 4" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="14" cy="21" r="2" fill="#fff"/><circle cx="26" cy="21" r="2" fill="#fff"/><path d="M13 30Q20 24 27 30" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></symbol>
 <symbol id="ic-spark" viewBox="0 0 40 40"><path d="M20 3l4 13 13 4-13 4-4 13-4-13-13-4 13-4z" fill="#ffe6a8" stroke="#c9a24a" stroke-width="1.5" stroke-linejoin="round"/></symbol>
 <symbol id="ic-ticket" viewBox="0 0 40 40"><path d="M9 5h22v30l-4-3-3 3-4-3-4 3-3-3-4 3z" fill="#f1e6cf" stroke="#8f6a22" stroke-width="2"/><path d="M14 13h12M14 19h12M14 25h8" stroke="#8f6a22" stroke-width="2" stroke-linecap="round"/></symbol>
 <symbol id="d-croissant" viewBox="0 0 40 40"><ellipse cx="20" cy="33" rx="16" ry="4" fill="#f1e6cf" stroke="#c9a24a" stroke-width="1.5"/><path d="M5 27Q6 12 20 11Q34 12 35 27Q28 22 20 24Q12 22 5 27Z" fill="#e0a24a" stroke="#9a5f1c" stroke-width="2" stroke-linejoin="round"/><path d="M13 13l2 10M20 11v12M27 13l-2 10" stroke="#9a5f1c" stroke-width="1.6" opacity=".7"/></symbol>
 <symbol id="d-sandwich" viewBox="0 0 40 40"><ellipse cx="20" cy="34" rx="16" ry="4" fill="#f1e6cf" stroke="#c9a24a" stroke-width="1.5"/><path d="M6 15Q6 6 20 6Q34 6 34 15Z" fill="#e0b070" stroke="#9a5f1c" stroke-width="2"/><path d="M5 17q4 4 7 0t7 0 7 0 7 0 3 0v3H5z" fill="#6fae5a" stroke="#3b7a30" stroke-width="1.5"/><rect x="6" y="20" width="28" height="4" fill="#e58a8a" stroke="#a24a4a" stroke-width="1.5"/><rect x="6" y="24" width="28" height="6" rx="3" fill="#e0b070" stroke="#9a5f1c" stroke-width="2"/></symbol>
 <symbol id="d-pasta" viewBox="0 0 40 40"><ellipse cx="20" cy="26" rx="18" ry="9" fill="#f1e6cf" stroke="#c9a24a" stroke-width="1.5"/><ellipse cx="20" cy="23" rx="12" ry="6" fill="#f2cf6b" stroke="#b8902b" stroke-width="1.5"/><path d="M12 22q4-5 8 0t8 0M14 25q3-3 6 0t6 0" stroke="#b8902b" stroke-width="1.4" fill="none"/><circle cx="20" cy="19" r="4" fill="#d6402f" stroke="#8c1f1f" stroke-width="1.5"/><circle cx="26" cy="20" r="1.6" fill="#4f8a3b"/></symbol>
 <symbol id="d-steak" viewBox="0 0 40 40"><ellipse cx="20" cy="26" rx="18" ry="10" fill="#f1e6cf" stroke="#c9a24a" stroke-width="1.5"/><path d="M8 24Q8 14 19 14Q33 13 32 24Q31 32 20 31Q9 31 8 24Z" fill="#8a4a2a" stroke="#4a2410" stroke-width="2"/><path d="M13 17l8 10M19 15l8 10M25 15l5 7" stroke="#4a2410" stroke-width="1.8" opacity=".6"/><circle cx="14" cy="22" r="2" fill="#f1e6cf" opacity=".7"/></symbol>
 <symbol id="d-cheesecake" viewBox="0 0 40 40"><ellipse cx="20" cy="33" rx="17" ry="4" fill="#f1e6cf" stroke="#c9a24a" stroke-width="1.5"/><path d="M5 30L35 30L31 14Q18 10 5 30Z" fill="#fbe9b8" stroke="#c99a3a" stroke-width="2" stroke-linejoin="round"/><path d="M5 30h30v-4H6z" fill="#c98a4a"/><circle cx="26" cy="15" r="4" fill="#d6304a" stroke="#8c1f3d" stroke-width="1.5"/></symbol>
</defs></svg>`;

export const use = (id, size = 28) => `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 40 40"><use href="#${id}"/></svg>`;

export function customerSVG(l) {
  const hair = {
    0: `<path d="M15 22Q14 6 30 6Q46 6 45 22Q38 13 30 13Q22 13 15 22Z" fill="${l.hair}"/>`,
    1: `<path d="M14 30Q11 8 30 7Q49 8 46 30L42 30Q43 16 30 14Q17 16 18 30Z" fill="${l.hair}"/>`,
    2: `<circle cx="30" cy="5" r="6" fill="${l.hair}"/><path d="M15 22Q14 7 30 7Q46 7 45 22Q38 13 30 13Q22 13 15 22Z" fill="${l.hair}"/>`,
  }[l.style];
  const hat = l.hat === 1
    ? `<ellipse cx="30" cy="12" rx="20" ry="4.5" fill="#1c1620"/><path d="M18 12Q18 -1 30 -1Q42 -1 42 12Z" fill="#2c2433"/><rect x="18" y="8" width="24" height="3" fill="#c9a24a"/>`
    : l.hat === 2
      ? `<path d="M14 18Q12 -1 30 -1Q48 -1 46 18Q40 12 30 12Q20 12 14 18Z" fill="#7d1d33"/><circle cx="40" cy="8" r="3" fill="#e8c766"/>`
      : '';
  return `<svg class="cust" viewBox="0 0 60 84" width="60" height="84">
    <ellipse cx="30" cy="80" rx="17" ry="5" fill="#000" opacity=".28"/>
    <rect x="20" y="64" width="8" height="14" rx="3" fill="#2a2030"/><rect x="32" y="64" width="8" height="14" rx="3" fill="#2a2030"/>
    <rect x="13" y="34" width="34" height="36" rx="13" fill="${l.outfit}" stroke="#0006" stroke-width="1.5"/>
    <path d="M24 34l6 9 6-9" fill="#f1e6cf" opacity=".9"/><circle cx="30" cy="52" r="1.8" fill="#e8c766"/><circle cx="30" cy="60" r="1.8" fill="#e8c766"/>
    <ellipse cx="11" cy="48" rx="5" ry="9" fill="${l.outfit}" stroke="#0006" stroke-width="1.2"/><ellipse cx="49" cy="48" rx="5" ry="9" fill="${l.outfit}" stroke="#0006" stroke-width="1.2"/>
    <circle cx="30" cy="25" r="16" fill="${l.skin}" stroke="#0004" stroke-width="1.4"/>
    ${hair}${hat}
    <circle cx="23.5" cy="26" r="2" fill="#1b1220"/><circle cx="36.5" cy="26" r="2" fill="#1b1220"/>
    <circle cx="20" cy="31" r="3" fill="#e0476a" opacity=".28"/><circle cx="40" cy="31" r="3" fill="#e0476a" opacity=".28"/>
    <path class="m-happy" d="M25 32Q30 38 35 32" stroke="#1b1220" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path class="m-ok" d="M26 34h8" stroke="#1b1220" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path class="m-sad" d="M25 36Q30 30 35 36" stroke="#1b1220" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`;
}

export const waiterSVG = () => `<svg viewBox="0 0 64 90" width="64" height="90">
  <ellipse cx="32" cy="86" rx="18" ry="5" fill="#000" opacity=".3"/>
  <rect x="21" y="68" width="9" height="15" rx="3" fill="#15101a"/><rect x="34" y="68" width="9" height="15" rx="3" fill="#15101a"/>
  <rect x="14" y="36" width="36" height="38" rx="13" fill="#1c1620" stroke="#000" stroke-width="1.5"/>
  <path d="M24 36l8 20 8-20z" fill="#f1e6cf"/><path d="M27 40l5 4 5-4-2 6h-6z" fill="#7d1d33"/>
  <circle cx="32" cy="58" r="1.8" fill="#e8c766"/><circle cx="32" cy="65" r="1.8" fill="#e8c766"/>
  <ellipse cx="12" cy="52" rx="5" ry="10" fill="#1c1620"/><ellipse cx="52" cy="48" rx="5" ry="9" fill="#1c1620"/>
  <circle cx="52" cy="58" r="4" fill="#f6d3b3"/>
  <ellipse cx="55" cy="42" rx="12" ry="3.2" fill="#c9a24a" stroke="#8f6a22" stroke-width="1.5"/>
  <circle cx="32" cy="26" r="16" fill="#f6d3b3" stroke="#0004" stroke-width="1.4"/>
  <path d="M15 24Q14 7 32 7Q50 7 49 24Q42 15 32 15Q22 15 15 24Z" fill="#1b1220"/>
  <circle cx="25.5" cy="27" r="2" fill="#1b1220"/><circle cx="38.5" cy="27" r="2" fill="#1b1220"/>
  <circle cx="22" cy="32" r="3" fill="#e0476a" opacity=".3"/><circle cx="42" cy="32" r="3" fill="#e0476a" opacity=".3"/>
  <path d="M27 33Q32 38 37 33" stroke="#1b1220" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>`;

export const tableSVG = (n) => `<svg viewBox="0 0 130 92" width="130" height="92">
  <ellipse cx="65" cy="78" rx="48" ry="11" fill="#000" opacity=".28"/>
  <rect x="58" y="48" width="14" height="30" fill="#8f6a22"/><ellipse cx="65" cy="78" rx="24" ry="6" fill="#c9a24a"/>
  <ellipse cx="65" cy="42" rx="58" ry="28" fill="#c9a24a"/>
  <ellipse cx="65" cy="40" rx="54" ry="25" fill="#1c1620"/>
  <ellipse cx="65" cy="40" rx="54" ry="25" fill="none" stroke="#f4dd8e" stroke-width="1.5" opacity=".6"/>
  <path d="M30 32Q55 22 90 30" stroke="#fff" stroke-width="2" opacity=".14" fill="none"/>
  <circle cx="65" cy="82" r="9" fill="#7d1d33" stroke="#f4dd8e" stroke-width="1.5"/><text x="65" y="86.5" text-anchor="middle" font-size="12" font-weight="700" fill="#f4dd8e" font-family="Josefin Sans,sans-serif">${n}</text>
</svg>`;

export const chairSVG = () => `<svg viewBox="0 0 80 70" width="80" height="70">
  <rect x="12" y="6" width="56" height="48" rx="18" fill="#7d1d33" stroke="#f4dd8e" stroke-width="2.5"/>
  <rect x="22" y="14" width="36" height="30" rx="10" fill="#a52e4a" opacity=".6"/>
</svg>`;

export const stoveSVG = () => `<svg viewBox="0 0 110 80" width="110" height="80">
  <rect x="4" y="22" width="102" height="54" rx="8" fill="#2a2233" stroke="#c9a24a" stroke-width="3"/>
  <rect x="4" y="22" width="102" height="14" rx="6" fill="#4a3f57"/>
  <circle cx="30" cy="29" r="7" fill="#12101a"/><circle cx="55" cy="29" r="7" fill="#12101a"/>
  <rect x="62" y="48" width="36" height="20" rx="4" fill="#12101a" stroke="#c9a24a" stroke-width="1.5"/>
  <circle cx="20" cy="56" r="5" fill="#c9a24a"/><circle cx="38" cy="56" r="5" fill="#c9a24a"/>
</svg>`;

export const chefSVG = () => `<svg viewBox="0 0 60 84" width="60" height="84">
  <rect x="13" y="34" width="34" height="36" rx="13" fill="#f6efe2" stroke="#0004" stroke-width="1.5"/>
  <path d="M22 36l8 10 8-10" fill="none" stroke="#c9a24a" stroke-width="2"/><circle cx="26" cy="52" r="1.8" fill="#c9a24a"/><circle cx="34" cy="52" r="1.8" fill="#c9a24a"/>
  <circle cx="30" cy="25" r="16" fill="#e8b58a" stroke="#0004" stroke-width="1.4"/>
  <path d="M14 18Q10 4 20 4Q22 -4 30 0Q38 -4 40 4Q50 4 46 18Z" fill="#fff" stroke="#cfc6b4" stroke-width="1.5"/><rect x="15" y="15" width="30" height="5" fill="#f1e6cf"/>
  <circle cx="23.5" cy="26" r="2" fill="#1b1220"/><circle cx="36.5" cy="26" r="2" fill="#1b1220"/>
  <path d="M25 32Q30 37 35 32" stroke="#1b1220" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M25 31q5 3 10 0" stroke="#3a2418" stroke-width="2" fill="none" opacity="0"/>
</svg>`;
