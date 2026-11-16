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
import { upgradeInfo } from '../data/upgradeInfo.js';

const SHELVES = [['staff', 'Staff'], ['speed', 'Speed Boost'], ['service', 'Service']];
const CLOSE = '<svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true"><path d="M9 9l22 22M31 9L9 31" stroke="#8f6a22" stroke-width="6" stroke-linecap="round" fill="none"/></svg>';
const windowSky = (i) => {
  const b = Array.from({ length: 9 }, (_, k) => { const h = 20 + ((k * 37 + i * 17) % 46); return `<rect x="${k * 17}" y="${90 - h}" width="15" height="${h}" fill="${k % 2 ? '#2a1f48' : '#1d1634'}"/>${[0, 1, 2, 3].map((r) => ((k + r + i) % 3 ? `<rect x="${k * 17 + 4}" y="${90 - h + 6 + r * 11}" width="3" height="4" fill="#ffd98a"/>` : '')).join('')}`; }).join('');
  return `<svg viewBox="0 0 150 90" width="100%" height="100%" preserveAspectRatio="none"><defs><linearGradient id="usk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#25357a"/><stop offset=".62" stop-color="#8a4f9c"/><stop offset="1" stop-color="#ffa77a"/></linearGradient></defs><rect width="150" height="90" fill="url(#usk)"/>${b}</svg>`;
};

export function renderUpgrades(app, { chapter: chapterId = 'city', back = null } = {}) {
  // The cross exits the store: back to where the player came from (e.g. the Failed screen), otherwise to the map.
  const exit = () => (back ? go(back.screen, back.params) : go('map', { chapter: chapterId }));
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
        <div class="top-r"><div class="coinpill">${COIN_ICON}<b>${wallet}</b></div><button class="back" aria-label="Close" title="Close">${CLOSE}</button></div>
      </div>
      <div class="shelves">${SHELVES.map(([g, title]) => `
        <section class="shelf"><h2><span>${title}</span></h2>
          <div class="counter">${list.filter((u) => u.group === g).map((u) => {
            const lvl = owned[u.id] || 0, cost = nextUpgradeCost(chapterId, u.id), max = cost === undefined, many = u.tiers.length > 1;
            const can = !max && wallet >= cost;
            return `<article class="ucard ${max ? 'max' : ''} ${flash === u.id ? 'flash' : ''}">
              <button class="uinfo-btn" data-info="${u.id}" aria-label="About ${u.name}" title="About ${u.name}">i</button>
              <div class="uart">${UPGRADE_ICONS[u.id]}</div>
              <div class="uinfo"><b>${u.label}</b>${many ? `<span>Lv. ${lvl}/${u.tiers.length}</span>` : `<span>${max ? 'Hired' : 'Hire'}</span>`}
                <div class="ubar">${u.tiers.map((_, k) => `<i class="${k < lvl ? 'on' : ''}"></i>`).join('')}</div></div>
              <button class="ubuy ${can ? 'can' : ''}" data-up="${u.id}" ${can ? '' : 'disabled'} aria-label="${u.name}${max ? ', maxed' : `, ${cost} coins`}">${max ? '&#10003;' : `${COIN_ICON}<span>${cost}</span>`}</button>
            </article>`; }).join('')}</div>
        </section>`).join('')}</div>`;
    root.querySelector('.back').onclick = exit;
    root.querySelectorAll('[data-up]').forEach((b) => {
      b.onclick = () => { if (buyUpgrade(chapterId, b.dataset.up)) { sound.unlock(); sound.play('upgrade'); draw(b.dataset.up); } };
    });
  };
  // The (i) popup: what the upgrade does and what one level adds. It closes on its own button, a tap outside, or Escape.
  let pop = null;
  const closeInfo = () => { if (pop) { pop.remove(); pop = null; } };
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-info]'); if (!b) return;
    const u = list.find((x) => x.id === b.dataset.info), info = upgradeInfo(u.id, chapterId), lvl = getUpgrades(chapterId)[u.id] || 0;
    closeInfo(); sound.unlock(); sound.play('click');
    pop = document.createElement('div');
    pop.className = 'upop-wrap';
    pop.innerHTML = `<div class="upop" role="dialog" aria-label="${u.name}"><button class="upop-x" aria-label="Close">&#10005;</button>
      <div class="upop-head"><div class="uart">${UPGRADE_ICONS[u.id]}</div><b>${u.name}</b></div>
      <p>${info.text}</p>
      <div class="upop-each"><span>Each level</span><b>${info.each}</b></div>
      <div class="ubar">${u.tiers.map((_, k) => `<i class="${k < lvl ? 'on' : ''}"></i>`).join('')}</div><small>Level ${lvl} of ${u.tiers.length}</small></div>`;
    pop.addEventListener('click', (ev) => { if (ev.target === pop || ev.target.closest('.upop-x')) closeInfo(); });
    root.appendChild(pop);
  });
  draw();
  const onKey = (e) => { if (e.key !== 'Escape') return; if (pop) closeInfo(); else exit(); };
  window.addEventListener('keydown', onKey);
  return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('upg-open'); };
}
