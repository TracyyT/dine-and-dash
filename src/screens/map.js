import '../map/map.css';
import { go } from '../router.js';
import { chapters } from '../data/chapters.js';
import { getProgress, isUnlocked, resetProgress, getWallet, isChapterDone, chapterStars, getLives, nextLifeIn, dailyStatus, MAX_LIVES } from '../state/progress.js';
import { COIN_ICON } from '../map/upgradeIcons.js';
import { clearTheme } from '../themes/apply.js';
import { renderCity } from '../map/cityMap.js';
import { renderBeach, BEACH_DEFS } from '../map/beachMap.js';
import { renderChinese, CHINESE_DEFS } from '../map/chineseMap.js';
import { directionBoard } from '../map/board.js';
import { renderFine, FINE_DEFS } from '../map/fineMap.js';
import { renderSteak, STEAK_DEFS } from '../map/steakMap.js';
import { renderItalian, ITALIAN_DEFS } from '../map/italianMap.js';
import { renderFastfood, FASTFOOD_DEFS } from '../map/fastfoodMap.js';
import { createPanZoom } from '../map/panzoom.js';
import { maybeShowDaily, showDaily } from '../map/daily.js';
import { MAP_ICONS } from '../map/icons.js';
import { MINI_LOGO } from '../map/logo.js';
import { openChapters, openSettings } from '../map/panels.js';
import '../map/ui.css';
import { MAP_DEFS } from '../map/defs.js';
import { WW, WH } from '../map/iso.js';

let lastChapter = null;

export function renderMap(app, params = {}) {
  clearTheme(); // the restaurant theme belongs to the game screen only
  document.body.classList.add('map-open');
  const open = (i) => chapters.every((c, k) => k >= i || isChapterDone(c)); // chapter i opens when every earlier one is cleared
  const furthest = chapters.reduce((m, c, i) => (open(i) ? i : m), 0);
  let chapterIndex = params.chapter ? chapters.findIndex((c) => c.id === params.chapter) : lastChapter ?? furthest;
  if (chapterIndex < 0 || !open(chapterIndex)) chapterIndex = furthest;
  lastChapter = chapterIndex;
  const chapter = chapters[chapterIndex];
  const progress = getProgress(chapter.id);
  const doneCount = chapter.levels.filter((l) => (progress.stars[l.n] || 0) > 0).length;

  app.innerHTML = `
    <div id="view" tabindex="0" aria-label="${chapter.name} map. Drag or use the arrow keys to move around.">
      <div id="world">
        <svg id="map" viewBox="0 0 ${WW} ${WH}" role="img" aria-label="${chapter.name} map with a path through ${chapter.levels.length} level stops">
          ${{ beach: BEACH_DEFS, chinese: CHINESE_DEFS, fine: FINE_DEFS, steak: STEAK_DEFS, italian: ITALIAN_DEFS, fastfood: FASTFOOD_DEFS }[chapter.map] || MAP_DEFS}
          <rect width="${WW}" height="${WH}" fill="url(#sky)"/>
          <g id="scene"></g>
          <g id="labels"></g>
          <rect width="${WW}" height="${WH}" fill="url(#sun)" style="mix-blend-mode:soft-light" opacity=".8"/>
          <rect width="${WW}" height="${WH}" fill="url(#vig)"/>
        </svg>
      </div>
    </div>
    <div id="vig"></div>
    <div class="mu">
      <div class="mu-side" role="toolbar" aria-label="Menu">
        <button class="mu-btn" id="upb" aria-label="Upgrades"><span class="ic">${MAP_ICONS.upgrade}</span>Upgrade</button>
        <button class="mu-btn" id="chb" aria-label="Chapters"><span class="ic">${MAP_ICONS.chapters}</span>Chapters</button>
        <button class="mu-btn" id="dayb" aria-label="Daily bonus"><span class="ic">${MAP_ICONS.daily}</span>Daily<span class="mu-badge" id="daybadge">1</span></button>
      </div>
      <div class="mu-title" id="hud" aria-label="Chapter ${chapterIndex + 1}: ${chapter.name}"><small>CHAPTER ${chapterIndex + 1}</small><b>${chapter.name}</b><span>&#9733; ${chapterStars(chapter)}/${chapter.levels.length * 3}</span></div>
      <div class="mu-top">
        <div class="mu-pill" id="lives" aria-label="Lives">${MAP_ICONS.heart}<b></b><small></small></div>
        <div class="mu-pill" id="wallet" aria-label="Coins">${COIN_ICON}<b></b></div>
        <button class="mu-gear" id="setb" aria-label="Settings">${MAP_ICONS.settings}</button>
        <button class="mu-logo" id="logob" aria-label="Title screen">${MINI_LOGO}</button>
      </div>
      <div class="mu-hint" id="hint" aria-label="Drag to look around"><span>Drag to look around</span></div>
    </div>
    <div class="mu-toast" id="toast" role="status"></div>`;

  const $ = (id) => app.querySelector('#' + id);
  const view = $('view'), world = $('world');
  const city = ({ beach: renderBeach, chinese: renderChinese, fine: renderFine, steak: renderSteak, italian: renderItalian, fastfood: renderFastfood }[chapter.map] || renderCity)($('scene'), $('labels'), chapter, progress);
  document.body.dataset.map = chapter.map;
  const pz = createPanZoom({ view, world, width: WW, height: WH });
  pz.home(...city.home);
  if (import.meta.env.DEV) window.__pz = pz; // dev-only: lets tests pan the map

  $('wallet').querySelector('b').textContent = getWallet();
  const paintLives = () => {
    const n = getLives(), el = $('lives');
    el.querySelector('b').textContent = n;
    el.classList.toggle('empty', n <= 0);
    const t = nextLifeIn();
    el.querySelector('small').textContent = n < MAX_LIVES ? `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` : '';
  };
  paintLives();
  const livesTimer = setInterval(paintLives, 1000);
  $('upb').onclick = () => go('upgrades', { chapter: chapter.id });
  maybeShowDaily(document.body, () => { $('wallet').querySelector('b').textContent = getWallet(); paintBadge(); }); // today's gift, if it has not been collected yet

  const LOCK = '<span style="margin-right:8px;font-weight:700">Locked</span><svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true"><rect x="8" y="18" width="24" height="18" rx="3" fill="#e8c766" stroke="#8f6a22" stroke-width="2.5"/><path d="M13 18v-5a7 7 0 0 1 14 0v5" fill="none" stroke="#e8c766" stroke-width="4"/><circle cx="20" cy="27" r="3" fill="#6b4a12"/></svg>';
  let toastTimer;
  const toast = (msg) => {
    const t = $('toast');
    t.innerHTML = msg; t.style.opacity = 1;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.style.opacity = 0; }, 2200);
  };
  if (city.board) {
    const nextCh = chapters[chapterIndex + 1] || null, nextOpen = !!nextCh && open(chapterIndex + 1);
    const bd = directionBoard($('scene'), { ...city.board, theme: chapter.theme, next: nextCh, open: nextOpen });
    if (nextOpen) {
      const goNext = () => { if (!pz.isDragging()) go('map', { chapter: nextCh.id }); };
      bd.addEventListener('click', goNext);
      bd.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goNext(); } });
    }
  }
  if (city.prev && chapterIndex > 0) { // a board at the start of the trail pointing back (chapters 2 and up)
    const prevCh = chapters[chapterIndex - 1];
    const pb = directionBoard($('scene'), { ...city.prev, theme: chapter.theme, next: prevCh, open: true, back: true });
    const goBack = () => { if (!pz.isDragging()) go('map', { chapter: prevCh.id }); };
    pb.addEventListener('click', goBack);
    pb.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goBack(); } });
  }
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
  const paintWallet = () => { $('wallet').querySelector('b').textContent = getWallet(); };
  const paintBadge = () => { $('daybadge').style.display = dailyStatus().available ? '' : 'none'; };
  paintBadge();
  $('chb').onclick = () => openChapters(document.body, chapter.id);
  $('dayb').onclick = () => showDaily(document.body, () => { paintWallet(); paintBadge(); });
  $('setb').onclick = () => openSettings(document.body, { onReset: () => { resetProgress(); go('map'); } });
  $('logob').onclick = () => go('title');
  const hintTimer = setTimeout(() => { $('hint').style.opacity = 0; }, 5000);

  return () => { clearInterval(livesTimer); // cleanup when leaving the map
    clearTimeout(hintTimer); clearTimeout(toastTimer); pz.destroy();
    document.body.classList.remove('map-open'); delete document.body.dataset.map;
  };
}
