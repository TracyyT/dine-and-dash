// The Upgrade screen: three shelves (kitchen, service, staff). Upgrades cost banked coins and last for one chapter.
import '../upgrades/upgrades.css';
import { go } from '../router.js';
import { chapters } from '../data/chapters.js';
import { upgradeList } from '../data/upgrades.js';
import { themes } from '../themes/index.js';
import { applyTheme } from '../themes/apply.js';
import { getWallet, getUpgrades, nextUpgradeCost, buyUpgrade } from '../state/progress.js';
import { UPGRADE_ICONS, COIN_ICON } from '../map/upgradeIcons.js';
import { sound } from '../game/sound.js';

const SHELVES = [['kitchen', 'Kitchen'], ['service', 'Service'], ['staff', 'Staff']];
const BACK = '<svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true"><path d="M4 9l11-4 10 4 11-4v26l-11 4-10-4-11 4z" fill="#f2e2b0" stroke="#8f6a22" stroke-width="2.2" stroke-linejoin="round"/><path d="M15 5v26M25 9v26" stroke="#8f6a22" stroke-width="1.8"/></svg>';
const windowSky = (i) => {
  const b = Array.from({ length: 9 }, (_, k) => { const h = 20 + ((k * 37 + i * 17) % 46); return `<rect x="${k * 17}" y="${90 - h}" width="15" height="${h}" fill="${k % 2 ? '#2a1f48' : '#1d1634'}"/>${[0, 1, 2, 3].map((r) => ((k + r + i) % 3 ? `<rect x="${k * 17 + 4}" y="${90 - h + 6 + r * 11}" width="3" height="4" fill="#ffd98a"/>` : '')).join('')}`; }).join('');
  return `<svg viewBox="0 0 150 90" width="100%" height="100%" preserveAspectRatio="none"><defs><linearGradient id="usk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#25357a"/><stop offset=".62" stop-color="#8a4f9c"/><stop offset="1" stop-color="#ffa77a"/></linearGradient></defs><rect width="150" height="90" fill="url(#usk)"/>${b}</svg>`;
};

export function renderUpgrades(app, { chapter: chapterId = 'city' } = {}) {
  const chapter = chapters.find((c) => c.id === chapterId);
  applyTheme(themes[chapter.theme]);
  document.body.classList.add('upg-open');
  const list = upgradeList(chapterId);
  const root = document.createElement('div');
  root.className = 'upg-root';
  app.appendChild(root);

  const draw = (flash) => {
    const wallet = getWallet(), owned = getUpgrades(chapterId);
    root.innerHTML = `
      <div class="upg-wall"><div class="awn"></div>
        <div class="win w1">${windowSky(1)}</div><div class="win w2">${windowSky(2)}</div>
        <div class="lamp l1"></div><div class="lamp l2"></div>
        <h1 class="neon"><span>Upgrade</span></h1>
        <div class="top-r"><div class="coinpill">${COIN_ICON}<b>${wallet}</b></div><button class="back" aria-label="Map" title="Map">${BACK}</button></div>
      </div>
      <div class="shelves">${SHELVES.map(([g, title]) => `
        <section class="shelf"><h2><span>${title}</span></h2>
          <div class="counter">${list.filter((u) => u.group === g).map((u) => {
            const lvl = owned[u.id] || 0, cost = nextUpgradeCost(chapterId, u.id), max = cost === undefined, many = u.tiers.length > 1;
            const can = !max && wallet >= cost;
            return `<article class="ucard ${max ? 'max' : ''} ${flash === u.id ? 'flash' : ''}">
              <div class="uart">${UPGRADE_ICONS[u.id]}</div>
              <div class="uinfo"><b>${u.label}</b>${many ? `<span>Lv. ${lvl}/${u.tiers.length}</span>` : `<span>${max ? 'Hired' : 'Hire'}</span>`}
                <div class="ubar">${u.tiers.map((_, k) => `<i class="${k < lvl ? 'on' : ''}"></i>`).join('')}</div></div>
              <button class="ubuy ${can ? 'can' : ''}" data-up="${u.id}" ${can ? '' : 'disabled'} aria-label="${u.name}${max ? ', maxed' : `, ${cost} coins`}">${max ? '&#10003;' : `${COIN_ICON}<span>${cost}</span>`}</button>
            </article>`; }).join('')}</div>
        </section>`).join('')}</div>`;
    root.querySelector('.back').onclick = () => go('map', { chapter: chapterId });
    root.querySelectorAll('[data-up]').forEach((b) => {
      b.onclick = () => { if (buyUpgrade(chapterId, b.dataset.up)) { sound.unlock(); sound.play('upgrade'); draw(b.dataset.up); } };
    });
  };
  draw();
  const onKey = (e) => { if (e.key === 'Escape') go('map', { chapter: chapterId }); };
  window.addEventListener('keydown', onKey);
  return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('upg-open'); };
}
