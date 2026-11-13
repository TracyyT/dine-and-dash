import '../map/map.css';
import { go } from '../router.js';
import { chapters } from '../data/chapters.js';
import { getProgress, isUnlocked, resetProgress } from '../state/progress.js';
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
    <div id="hud"><b>${chapter.name}</b><span>CHAPTER ${chapterIndex + 1} · ${doneCount} OF ${chapter.levels.length} DONE</span></div>
    <div id="tools">
      <button id="zin" aria-label="Zoom in">+</button>
      <button id="zout" aria-label="Zoom out">&minus;</button>
      <button id="ctr">Current level</button>
      <button id="fs">Full screen</button>
      <button id="rst">Reset progress</button>
    </div>
    <div id="hint">Drag to look around · scroll to zoom</div>
    <div id="toast" role="status"></div>`;

  const $ = (id) => app.querySelector('#' + id);
  const view = $('view'), world = $('world');
  const city = renderCity($('scene'), $('labels'), chapter, progress);
  const pz = createPanZoom({ view, world, width: WW, height: WH });
  pz.home(...city.home);

  let toastTimer;
  const toast = (msg) => {
    const t = $('toast');
    t.textContent = msg; t.style.opacity = 1;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.style.opacity = 0; }, 2200);
  };
  const choose = (n) => {
    if (pz.isDragging()) return; // a drag is not a click
    if (!isUnlocked(chapter.id, n)) toast(`Level ${n} is locked. Finish level ${n - 1} first.`);
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
