// The cards shown before and after a level. Pictures first, as few words as possible.
import { use } from './sprites.js';
import { objectiveLabel } from '../data/levels.js';

export const OBJ_ICON = { coins: 'ic-bill', guests: 'ic-people', dishes: 'd-sandwich', items: 'ic-chef', happy: 'ic-smile', takeout: 'ic-bag', noAngry: 'ic-noangry' };
const clock = (s) => (s ? `<span class="chip">${use('ic-clock', 18)}${s}s</span>` : '');
const btn = (id, icon, label, cls = '') => `<button class="pbtn ${cls}" data-b="${id}" aria-label="${label}" title="${label}">${use(icon, cls.includes('big') ? 34 : 28)}<span>${label}</span></button>`;

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
    <div class="pban">${storefront(info.sign || 'CAFE')}</div>
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
