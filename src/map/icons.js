// Icons for the map's buttons (48x48, drawn to match the cream-and-brown button style).
const svg = (inner, s = 40) => `<svg viewBox="0 0 48 48" width="${s}" height="${s}" aria-hidden="true">${inner}</svg>`;
const O = 'stroke="#6a3510" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
export const MAP_ICONS = {
  upgrade: svg(`<path d="M8 18h32l-3-9H11z" fill="#fff" ${O}/><path d="M11 9h6l-1 9H8zM23 9h6l1 9h-8zM35 9h-6l1 9h8z" fill="#d8403a" ${O}/><rect x="10" y="18" width="28" height="22" fill="#f4cf8a" ${O}/><rect x="20" y="26" width="9" height="14" rx="2" fill="#a8693a" ${O}/><rect x="12" y="23" width="6" height="7" fill="#9fd8ee" ${O}/>`),
  chapters: svg(`<path d="M5 12l12-4 14 4 12-4v28l-12 4-14-4-12 4z" fill="#f6dfa4" ${O}/><path d="M17 8v28M31 12v28" fill="none" ${O}/><path d="M9 30q6-8 10-2t8-4 9 4" fill="none" stroke="#d8403a" stroke-width="2.5" stroke-dasharray="3 3" stroke-linecap="round"/><circle cx="34" cy="20" r="5" fill="#d8403a" ${O}/>`),
  daily: svg(`<rect x="7" y="10" width="34" height="30" rx="6" fill="#fffaf0" ${O}/><path d="M7 20h34" ${O}/><path d="M7 16a6 6 0 0 1 6-6h22a6 6 0 0 1 6 6v4H7z" fill="#d8403a" ${O}/><path d="M16 6v8M32 6v8" ${O}/><path d="M16 30l5 5 11-11" fill="none" stroke="#3d9a4a" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  settings: svg(`<path d="M24 6l4 3 5-1 2 5 5 2-1 5 3 4-3 4 1 5-5 2-2 5-5-1-4 3-4-3-5 1-2-5-5-2 1-5-3-4 3-4-1-5 5-2 2-5 5 1z" fill="#d9a35c" ${O}/><circle cx="24" cy="24" r="7" fill="#fff2d2" ${O}/>`),
  heart: svg(`<path d="M24 41C8 29 6 17 13 12Q20 8 24 16Q28 8 35 12C42 17 40 29 24 41Z" fill="#e0476a" stroke="#8c1f3d" stroke-width="2.5" stroke-linejoin="round"/>`, 26),
  lock: svg(`<rect x="10" y="22" width="28" height="20" rx="4" fill="#e8c766" ${O}/><path d="M16 22v-6a8 8 0 0 1 16 0v6" fill="none" ${O}/>`, 22),
  check: svg(`<circle cx="24" cy="24" r="18" fill="#59b85f" stroke="#2f7a38" stroke-width="3"/><path d="M15 25l6 6 12-13" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`, 24),
};
