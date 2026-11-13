// The cards shown before and after a level. Pictures first, as few words as possible.
import { use } from './sprites.js';
import { objectiveLabel } from '../data/levels.js';

export const OBJ_ICON = { coins: 'ic-bill', guests: 'ic-people', dishes: 'd-sandwich', items: 'ic-chef', happy: 'ic-smile', takeout: 'ic-bag', noAngry: 'ic-noangry' };
const clock = (s) => (s ? `<span class="chip">${use('ic-clock', 18)}${s}s</span>` : '');
const btn = (id, icon, label, cls = '') => `<button class="pbtn ${cls}" data-b="${id}" aria-label="${label}" title="${label}">${use(icon, cls.includes('big') ? 34 : 28)}<span>${label}</span></button>`;

function beachFront(sign) {
  return `<svg viewBox="0 0 320 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="bsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a62b8"/><stop offset=".42" stop-color="#f2889e"/><stop offset=".66" stop-color="#ffd09a"/><stop offset=".67" stop-color="#2a9ab4"/><stop offset="1" stop-color="#1c6a88"/></linearGradient></defs>
    <rect width="320" height="150" fill="url(#bsk)"/><circle cx="250" cy="62" r="18" fill="#fff3b0"/>
    <path d="M0 108Q80 96 160 106T320 100V150H0Z" fill="#f0d4a0"/>
    <path d="M214 98V74l26-6 8 8-24 22z" fill="#fff" stroke="#4a2f18" stroke-width="2"/>
    <g stroke="#4a2f18" stroke-width="2"><path d="M34 112Q32 84 42 64" stroke="#8a5a2a" stroke-width="6" fill="none"/><path d="M42 64Q18 58 8 74Q28 62 42 64ZM42 64Q66 58 76 74Q56 62 42 64ZM42 64Q34 42 42 34Q52 48 42 64Z" fill="#4f9a4a"/></g>
    <rect x="76" y="58" width="150" height="56" rx="3" fill="#b8844a" stroke="#4a2f18" stroke-width="2"/>
    <rect x="86" y="72" width="38" height="30" fill="#ffdc9a" stroke="#4a2f18" stroke-width="2"/><rect x="190" y="72" width="26" height="30" fill="#ffdc9a" stroke="#4a2f18" stroke-width="2"/><rect x="140" y="70" width="34" height="44" fill="#4a2f18"/><rect x="144" y="74" width="26" height="40" fill="#ffd98a"/>
    ${Array.from({ length: 8 }, (_, i) => `<path d="M${70 + i * 20} 52h20v12q-10 8-20 0z" fill="${i % 2 ? '#fff4e0' : '#3f7fc0'}" stroke="#4a2f18" stroke-width="1.5"/>`).join('')}
    <rect x="102" y="26" width="116" height="26" rx="8" fill="#7a4f2a" stroke="#4a2f18" stroke-width="2.5"/><text x="160" y="45" text-anchor="middle" font-family="Pacifico,cursive" font-size="17" fill="#fff4e0">${sign}</text></svg>`;
}

function chineseFront(sign) {
  return `<svg viewBox="0 0 320 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="csk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a58b0"/><stop offset=".5" stop-color="#f08aa6"/><stop offset="1" stop-color="#ffd2a0"/></linearGradient></defs>
    <rect width="320" height="150" fill="url(#csk)"/><path d="M0 96Q60 60 120 86T240 70T320 84V150H0Z" fill="#7a6aa8"/><path d="M0 112Q80 100 160 110T320 104V150H0Z" fill="#6fa862"/>
    <circle cx="40" cy="62" r="22" fill="#ffb3c7"/><circle cx="62" cy="50" r="18" fill="#ffc6d6"/><rect x="38" y="70" width="6" height="40" fill="#6a4430"/>
    <rect x="86" y="62" width="148" height="52" fill="#b02a2a" stroke="#3a1a14" stroke-width="2"/><rect x="98" y="76" width="36" height="28" fill="#ffd98a" stroke="#e8b64a" stroke-width="2.5"/><rect x="190" y="76" width="30" height="28" fill="#ffd98a" stroke="#e8b64a" stroke-width="2.5"/><rect x="146" y="72" width="30" height="42" fill="#4a1212"/><rect x="150" y="76" width="22" height="38" fill="#ffd070"/>
    <path d="M70 66Q160 36 250 66L236 62Q160 44 104 62Z M60 66h200l-14 -8H74z" fill="#3a2a4a" stroke="#3a1a14" stroke-width="2"/><path d="M82 58Q160 26 238 58" fill="#3a2a4a" stroke="#3a1a14" stroke-width="2"/>
    <rect x="112" y="20" width="96" height="24" rx="5" fill="#7a1010" stroke="#e8b64a" stroke-width="2.5"/><text x="160" y="38" text-anchor="middle" font-family="Cinzel Decorative,serif" font-weight="700" font-size="13" fill="#ffe39a">${sign}</text>
    ${[96, 226].map((x) => `<ellipse cx="${x}" cy="78" rx="7" ry="9" fill="#e0382c" stroke="#7a1010" stroke-width="1.5"/>`).join('')}</svg>`;
}

function fineFront(sign) {
  return `<svg viewBox="0 0 320 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="fsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1a46"/><stop offset=".7" stop-color="#6a4a8a"/><stop offset="1" stop-color="#e8a888"/></linearGradient></defs>
    <rect width="320" height="150" fill="url(#fsk)"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${i * 56 - 8}" y="${54 + (i % 3) * 10}" width="50" height="100" fill="${i % 2 ? '#2a2548' : '#1f1b3a'}"/><rect x="${i * 56 + 4}" y="${84 + (i % 3) * 10}" width="26" height="22" fill="#ffd98a" opacity=".85"/>`).join('')}
    <rect x="76" y="50" width="168" height="76" fill="#f3ecdc" stroke="#8a6a2a" stroke-width="2.5"/><rect x="70" y="44" width="180" height="10" fill="#d9b66a" stroke="#8a6a2a" stroke-width="2"/>
    ${[88, 126, 194, 220].map((x) => `<rect x="${x}" y="64" width="14" height="62" fill="#e8dfc8" stroke="#b8a06a" stroke-width="1.5"/>`).join('')}
    <rect x="142" y="70" width="36" height="56" rx="18" fill="#15131c" stroke="#d9b66a" stroke-width="2.5"/><rect x="148" y="76" width="24" height="50" rx="12" fill="#ffd070" opacity=".9"/>
    <path d="M116 126h88l14 24H102z" fill="#7a1d3a" stroke="#d9b66a" stroke-width="1.5"/>
    <path d="M70 46Q160 24 250 46L238 56H82Z" fill="#6a1a38" stroke="#d9b66a" stroke-width="2.5"/>
    <rect x="112" y="20" width="96" height="22" rx="3" fill="#15131c" stroke="#d9b66a" stroke-width="2.5"/><text x="160" y="36" text-anchor="middle" font-family="Playfair Display,serif" font-weight="900" font-size="12.5" fill="#f6e2a8">${sign}</text>
    <g fill="#ffe6a8"><circle cx="40" cy="30" r="2"/><circle cx="280" cy="24" r="2"/><circle cx="296" cy="50" r="1.6"/></g></svg>`;
}

function storefront(sign) {
  const win = (x) => `<rect x="${x}" y="78" width="26" height="26" rx="3" fill="#ffd98a" stroke="#8f6a22" stroke-width="2"/><path d="M${x + 13} 78v26M${x} 91h26" stroke="#8f6a22" stroke-width="1.5"/>`;
  const sky = Array.from({ length: 14 }, (_, i) => `<rect x="${i * 24 - 4}" y="${38 + (i * 37) % 26}" width="22" height="${70 - (i * 37) % 26}" fill="${i % 2 ? '#2a1f48' : '#3a2a5e'}"/>`).join('');
  const stars = Array.from({ length: 12 }, (_, i) => `<circle cx="${(i * 47) % 320}" cy="${(i * 29) % 40 + 4}" r="1.3" fill="#fff" opacity=".85"/>`).join('');
  return `<svg viewBox="0 0 320 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="psk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#25357a"/><stop offset=".6" stop-color="#8a4f9c"/><stop offset="1" stop-color="#ffa77a"/></linearGradient></defs>
    <rect width="320" height="150" fill="url(#psk)"/>${stars}${sky}
    <rect x="70" y="52" width="180" height="70" rx="4" fill="#7d1d33" stroke="#4a0f1d" stroke-width="2"/>
    ${win(84)}${win(210)}<rect x="142" y="74" width="36" height="48" rx="3" fill="#2a1a12" stroke="#c9a24a" stroke-width="2"/><circle cx="170" cy="100" r="2" fill="#e8c766"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${64 + i * 21} 52h21v14q-10.5 8-21 0z" fill="${i % 2 ? '#f1e6cf' : '#a52e4a'}"/>`).join('')}
    <rect x="96" y="30" width="128" height="26" rx="13" fill="#1c1620" stroke="#ff5c8a" stroke-width="2.5"/>
    <text x="160" y="49" text-anchor="middle" font-family="Limelight,serif" font-size="18" fill="#ffd0dc" style="filter:drop-shadow(0 0 4px #ff2f6d)">${sign}</text>
    <rect x="0" y="122" width="320" height="28" fill="#2a2030"/><path d="M0 126h320" stroke="#c9a24a" stroke-width="2" opacity=".6"/></svg>`;
}

const flow = [['ic-dine', 'Seat'], ['ic-order', 'Order'], ['d-sandwich', 'Serve'], ['ic-bill', 'Pay'], ['ic-broom', 'Clean']];

export function introHTML(g, info) {
  const dots = [1, 2, 3, 4, 5].map((n) => `<i class="${n === info.level ? 'on' : n < info.level ? 'past' : ''}"></i>`).join('');
  const rows = g.objectives.map((o) => `<div class="orow">${use('ic-star', 26)}<span class="oi">${use(OBJ_ICON[o.type], 34)}</span><b>${objectiveLabel(o)}</b>${clock(o.within)}</div>`).join('');
  return `<div class="popup">
    <div class="pban">${{ beach: beachFront, chinese: chineseFront, fine: fineFront }[info.theme]?.(info.sign || 'TEA') ?? storefront(info.sign || 'CAFE')}</div>
    <h2>${info.name}</h2><div class="dots">${dots}</div>
    <div class="orows">${rows}</div>
    <div class="flow">${flow.map(([ic, t]) => `<span class="step">${use(ic, 28)}<small>${t}</small></span>`).join(use('ic-chev', 14))}</div>
    ${btn('go', 'ic-play', 'Play', 'primary big')}
    <div class="prow">${btn('map', 'ic-pin', 'Map')}</div>
  </div>`;
}

export function pauseHTML() {
  return `<div class="popup slim"><div class="prow wide">${btn('quit', 'ic-pin', 'Map')}${btn('again', 'ic-replay', 'Retry')}${btn('resume', 'ic-play', 'Resume', 'primary')}</div></div>`;
}

const coinPile = `<svg class="pile" viewBox="0 0 160 50" width="160" height="50" aria-hidden="true">${[[30, 36], [56, 40], [84, 36], [110, 40], [132, 36], [44, 26], [72, 28], [100, 26], [58, 16], [86, 16], [72, 6]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="17" ry="7" fill="#e8c766" stroke="#8f6a22" stroke-width="2"/><ellipse cx="${x}" cy="${y - 2}" rx="12" ry="4" fill="#f4dd8e"/>`).join('')}</svg>`;

export function resultsHTML(g, info, hasNext) {
  const n = g.objectives.filter((o) => o.status === 'done').length;
  const win = n > 0;
  const avg = g.stats.satSum && g.served ? Math.round((g.stats.satSum / g.served) * 100) : 0;
  const rows = g.objectives.map((o) => {
    const ok = o.status === 'done';
    return `<div class="orow ${ok ? 'ok' : 'no'}">${use(ok ? 'ic-star' : 'ic-star', 26)}<span class="oi">${use(OBJ_ICON[o.type], 34)}</span><b>${objectiveLabel(o)}</b>${o.type === 'noAngry' ? '' : `<em>${Math.min(o.value, o.target)}/${o.target}</em>`}${clock(o.within)}<span class="mark">${use(ok ? 'ic-check' : 'ic-cross', 26)}</span></div>`;
  }).join('');
  return `<div class="popup ${win ? '' : 'lose'}">
    <div class="ribbon"><span class="hat">${use('ic-chef', 54)}</span><svg viewBox="0 0 360 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 14h40v46H0l16-23zM360 14h-40v46h40l-16-23z" fill="${win ? '#5a0f20' : '#444'}"/><path d="M28 4h304v52H28z" fill="${win ? '#a52e4a' : '#6a6a6a'}" stroke="${win ? '#5a0f20' : '#333'}" stroke-width="3"/><path d="M28 10h304" stroke="#fff" stroke-opacity=".25" stroke-width="3"/></svg><b>${info.name}</b></div>
    <div class="bigstars">${[0, 1, 2].map((i) => `<svg width="70" height="70" viewBox="0 0 40 40" class="${i < n ? 'on' : ''}" style="animation-delay:${i * 0.25}s"><use href="#ic-star"/></svg>`).join('')}</div>
    <div class="orows">${rows}</div>
    <div class="stats2"><span>${use('ic-people', 34)}<div><b>${g.served}</b><small>Guests</small></div></span><span>${use('ic-smile', 34)}<div><b>${avg}%</b><small>Mood</small></div></span><span>${use('ic-bill', 34)}<div><b>+${g.earned}</b><small>Coins</small></div></span></div>
    ${coinPile}
    <div class="prow wide">${btn('map', 'ic-map', 'Map')}${btn('again', 'ic-replay', 'Retry')}${win && hasNext ? btn('next', 'ic-next', 'Next', 'primary') : ''}</div>
  </div>`;
}

// Shown after clearing Level 5: the chapter is done and the next one opens.
export function chapterDoneHTML(chapter, next, starCount) {
  const total = chapter.levels.length * 3;
  const lanternPreview = `<svg viewBox="0 0 320 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="cdk2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a58b0"/><stop offset=".55" stop-color="#f08aa6"/><stop offset="1" stop-color="#ffd2a0"/></linearGradient></defs><rect width="320" height="150" fill="url(#cdk2)"/><path d="M0 96Q80 70 160 92T320 84V150H0Z" fill="#7a6aa8"/><path d="M0 112Q80 102 160 112T320 106V150H0Z" fill="#6fa862"/><circle cx="60" cy="66" r="26" fill="#ffb3c7"/><rect x="56" y="80" width="6" height="34" fill="#6a4430"/><rect x="120" y="70" width="110" height="44" fill="#b02a2a" stroke="#3a1a14" stroke-width="2"/><path d="M104 72Q175 38 246 72Z" fill="#3a2a4a" stroke="#3a1a14" stroke-width="2"/>${[132, 175, 218].map((x) => `<ellipse cx="${x}" cy="60" rx="7" ry="9" fill="#e0382c" stroke="#7a1010" stroke-width="1.5"/>`).join('')}</svg>`;
  const finePreview = `<svg viewBox="0 0 320 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="cdk3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1a46"/><stop offset=".7" stop-color="#6a4a8a"/><stop offset="1" stop-color="#e8a888"/></linearGradient></defs><rect width="320" height="150" fill="url(#cdk3)"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${i * 56 - 8}" y="${50 + (i % 3) * 12}" width="50" height="110" fill="${i % 2 ? '#2a2548' : '#1f1b3a'}"/><rect x="${i * 56 + 6}" y="${86 + (i % 3) * 12}" width="24" height="24" fill="#ffd98a" opacity=".85"/>`).join('')}<rect x="104" y="40" width="112" height="86" fill="#f3ecdc" stroke="#8a6a2a" stroke-width="2.5"/><rect x="98" y="34" width="124" height="10" fill="#d9b66a"/><rect x="146" y="70" width="28" height="56" rx="14" fill="#15131c" stroke="#d9b66a" stroke-width="2"/><path d="M120 126h80l12 24H108z" fill="#7a1d3a"/><g fill="#d9b66a"><circle cx="40" cy="30" r="2"/><circle cx="276" cy="22" r="2"/></g></svg>`;
  const preview = `<svg viewBox="0 0 320 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="cdsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a62b8"/><stop offset=".4" stop-color="#f2889e"/><stop offset=".62" stop-color="#ffd09a"/><stop offset=".63" stop-color="#2a9ab4"/><stop offset="1" stop-color="#1c6a88"/></linearGradient></defs><rect width="320" height="150" fill="url(#cdsk)"/><circle cx="220" cy="78" r="20" fill="#fff3b0"/><path d="M0 112Q80 98 160 110T320 104V150H0Z" fill="#f0d4a0"/><g fill="#4f9a4a" stroke="#2a5f2a" stroke-width="2"><path d="M52 112Q50 80 62 56" stroke="#8a5a2a" stroke-width="6" fill="none"/><path d="M62 56Q36 48 24 66Q46 54 62 56ZM62 56Q88 48 100 66Q78 54 62 56ZM62 56Q52 32 62 24Q72 40 62 56Z"/></g><path d="M236 112V86l30-6 6 8-24 24z" fill="#fff" stroke="#4a2f18" stroke-width="2"/><rect x="120" y="86" width="80" height="26" rx="4" fill="#b8844a" stroke="#4a2f18" stroke-width="2"/>${Array.from({ length: 5 }, (_, i) => `<path d="M${116 + i * 18} 86h18v10q-9 8-18 0z" fill="${i % 2 ? '#fff4e0' : '#3f7fc0'}"/>`).join('')}</svg>`;
  return `<div class="popup">
    <div class="ribbon"><span class="hat">${use('ic-chef', 54)}</span><svg viewBox="0 0 360 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 14h40v46H0l16-23zM360 14h-40v46h40l-16-23z" fill="#5a0f20"/><path d="M30 6h300v58H30z" fill="#a52e4a" stroke="#5a0f20" stroke-width="3"/></svg><b>${chapter.name}</b></div>
    <div class="bigstars">${[0, 1, 2].map((i) => `<svg width="70" height="70" viewBox="0 0 40 40" class="${i < Math.ceil((starCount / total) * 3 - 0.01) ? 'on' : ''}" style="animation-delay:${i * 0.25}s"><use href="#ic-star"/></svg>`).join('')}</div>
    <div class="orow ok">${use('ic-star', 26)}<b>${starCount}/${total}</b></div>
    ${next ? `<div class="pban">${{ chinese: lanternPreview, fine: finePreview }[next.theme] || preview}</div><h2>${next.name}</h2>` : ''}
    ${next ? btn('go', 'ic-play', 'Play', 'primary big') : ''}
    <div class="prow">${btn('map', 'ic-pin', 'Map')}</div>
  </div>`;
}
