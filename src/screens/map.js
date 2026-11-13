import '../map/map.css';
import { go } from '../router.js';
import { chapters } from '../data/chapters.js';
import { getProgress, isUnlocked, resetProgress, getWallet, getUpgrades, nextUpgradeCost, buyUpgrade } from '../state/progress.js';
import { upgradeList } from '../data/upgrades.js';
import { UPGRADE_ICONS, COIN_ICON } from '../map/upgradeIcons.js';
import { sound } from '../game/sound.js';
import { clearTheme } from '../themes/apply.js';
import { renderCity } from '../map/cityMap.js';
import { createPanZoom } from '../map/panzoom.js';
import { MAP_DEFS } from '../map/defs.js';
import { WW, WH } from '../map/iso.js';

export function renderMap(app) {
  clearTheme(); // the restaurant theme belongs to the game screen only
  document.body.classList.add('map-open');
  const chapterIndex = 0;
  const chapter = chapters[chapterIndex];
  const progress = getProgress(chapter.id);
  const doneCount = chapter.levels.filter((l) => (progress.stars[l.n] || 0) > 0).length;

  app.innerHTML = `
    <div id="view" tabindex="0" aria-label="City map. Drag or use the arrow keys to move around.">
      <div id="world">
        <svg id="map" viewBox="0 0 ${WW} ${WH}" role="img" aria-label="Isometric city map with a path through ${chapter.levels.length} level stops">
          ${MAP_DEFS}
          <rect width="${WW}" height="${WH}" fill="url(#sky)"/>
          <g id="scene"></g>
          <g id="labels"></g>
          <rect width="${WW}" height="${WH}" fill="url(#sun)" style="mix-blend-mode:soft-light" opacity=".8"/>
          <rect width="${WW}" height="${WH}" fill="url(#vig)"/>
        </svg>
      </div>
    </div>
    <div id="vig"></div>
    <div id="hud"><b>${chapter.name}</b><div class="pips" aria-label="${doneCount} of ${chapter.levels.length} levels done">${chapter.levels.map((l) => `<i class="${(progress.stars[l.n] || 0) > 0 ? 'on' : ''}"></i>`).join('')}</div></div>
    <div id="wallet" aria-label="Coins">${COIN_ICON}<b></b></div>
    <div id="up" hidden></div>
    <div id="tools">
      <button id="upb" aria-label="Upgrades" title="Upgrades"><svg viewBox="0 0 48 48" width="26" height="26" aria-hidden="true"><path d="M24 5L38 21H29V43H19V21H10Z" fill="#ffe9a8" stroke="#8f6a22" stroke-width="2" stroke-linejoin="round"/></svg></button>
      <button id="zin" aria-label="Zoom in">+</button>
      <button id="zout" aria-label="Zoom out">&minus;</button>
      <button id="ctr" aria-label="Current level" title="Current level"><svg viewBox="0 0 40 40" width="24" height="24" aria-hidden="true"><circle cx="20" cy="20" r="11" fill="none" stroke="#ffe9a8" stroke-width="3.5"/><circle cx="20" cy="20" r="4" fill="#ffe9a8"/><path d="M20 2v7M20 31v7M2 20h7M31 20h7" stroke="#ffe9a8" stroke-width="3.5" stroke-linecap="round"/></svg></button>
      <button id="fs" aria-label="Full screen" title="Full screen"><svg viewBox="0 0 40 40" width="24" height="24" aria-hidden="true"><path d="M6 15V6h9M25 6h9v9M34 25v9h-9M15 34H6v-9" fill="none" stroke="#ffe9a8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button id="rst" aria-label="Reset progress" title="Reset progress (testing)"><svg viewBox="0 0 40 40" width="24" height="24" aria-hidden="true"><path d="M8 12h24M15 12V7h10v5M11 12l2 24h14l2-24" fill="none" stroke="#ffe9a8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    </div>
    <div id="hint" aria-label="Drag to look around, scroll to zoom"><svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true"><path d="M13 22V9a2.5 2.5 0 0 1 5 0v9m0-3V7a2.5 2.5 0 0 1 5 0v8m0-4a2.5 2.5 0 0 1 5 0v9c0 8-4 13-10 13-5 0-8-3-10-8l-3-6a2.4 2.4 0 0 1 4-2.5l3 4" fill="#fff" stroke="#14100f" stroke-width="2" stroke-linejoin="round"/></svg><svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true"><circle cx="17" cy="17" r="10" fill="none" stroke="#ffe9a8" stroke-width="3.5"/><path d="M25 25l11 11" stroke="#ffe9a8" stroke-width="4.5" stroke-linecap="round"/></svg></div>
    <div id="toast" role="status"></div>`;

  const $ = (id) => app.querySelector('#' + id);
  const view = $('view'), world = $('world');
  const city = renderCity($('scene'), $('labels'), chapter, progress);
  const pz = createPanZoom({ view, world, width: WW, height: WH });
  pz.home(...city.home);

  // ---- upgrades: graphics only, bought with banked coins, and they last for this chapter ----
  const panel = $('up');
  const drawUpgrades = () => {
    const owned = getUpgrades(chapter.id), wallet = getWallet();
    $('wallet').querySelector('b').textContent = wallet;
    panel.innerHTML = `<div class="up-grid">${upgradeList(chapter.id).map((u) => {
      const lvl = owned[u.id] || 0, cost = nextUpgradeCost(chapter.id, u.id), max = cost === undefined;
      const pips = u.tiers.map((_, k) => `<i class="${k < lvl ? 'on' : ''}"></i>`).join('');
      return `<button class="up-tile ${max ? 'max' : ''}" data-up="${u.id}" ${max || wallet < cost ? 'disabled' : ''} aria-label="${u.name}${max ? ', fully upgraded' : `, costs ${cost} coins`}" title="${u.name}">
        ${UPGRADE_ICONS[u.id]}<div class="pips">${pips}</div><span class="cost">${max ? '&#10003;' : `${COIN_ICON}${cost}`}</span></button>`;
    }).join('')}</div>`;
    panel.querySelectorAll('[data-up]').forEach((b) => {
      b.onclick = () => { if (buyUpgrade(chapter.id, b.dataset.up)) { sound.unlock(); sound.play('upgrade'); drawUpgrades(); } };
    });
  };
  drawUpgrades();
  $('upb').onclick = () => panel.toggleAttribute('hidden');

  const LOCK = '<svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true"><rect x="8" y="18" width="24" height="18" rx="3" fill="#e8c766" stroke="#8f6a22" stroke-width="2.5"/><path d="M13 18v-5a7 7 0 0 1 14 0v5" fill="none" stroke="#e8c766" stroke-width="4"/><circle cx="20" cy="27" r="3" fill="#6b4a12"/></svg>';
  let toastTimer;
  const toast = (msg) => {
    const t = $('toast');
    t.innerHTML = msg; t.style.opacity = 1;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.style.opacity = 0; }, 2200);
  };
  const choose = (n) => {
    if (pz.isDragging()) return; // a drag is not a click
    if (!isUnlocked(chapter.id, n)) toast(LOCK);
    else go('game', { chapter: chapter.id, level: n });
  };
  app.querySelectorAll('.node').forEach((node) => {
    const n = +node.dataset.n;
    node.addEventListener('click', () => choose(n));
    node.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(n); } });
  });
  view.addEventListener('panstart', () => { $('hint').style.opacity = 0; });
  $('zin').onclick = () => pz.zoomBy(1.2);
  $('zout').onclick = () => pz.zoomBy(1 / 1.2);
  $('ctr').onclick = () => pz.home(...city.home);
  $('rst').onclick = () => { resetProgress(); go('map'); }; // temporary: handy while testing
  $('fs').onclick = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.());
  const hintTimer = setTimeout(() => { $('hint').style.opacity = 0; }, 5000);

  return () => { // cleanup when leaving the map
    clearTimeout(hintTimer); clearTimeout(toastTimer); pz.destroy();
    document.body.classList.remove('map-open');
  };
}
