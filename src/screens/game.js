import '../game/game.css';
import { go } from '../router.js';
import { chapters } from '../data/chapters.js';
import { levelConfig } from '../data/levels.js';
import { themes } from '../themes/index.js';
import { applyTheme } from '../themes/apply.js';
import { recordResult } from '../state/progress.js';
import { createGame, tick, tapCustomer, tapTable, tapDish, buyUpgrade, stars, STAGE } from '../game/engine.js';
import { createView } from '../game/view.js';
import { use } from '../game/sprites.js';

export function renderGame(app, { chapter: chapterId = 'city', level = 1 } = {}) {
  const chapter = chapters.find((c) => c.id === chapterId);
  applyTheme(themes[chapter.theme]); // the restaurant look applies inside a level only
  document.body.classList.add('game-open');
  const info = { ...chapter.levels.find((l) => l.n === level), level };
  const g = createGame(levelConfig(chapterId, level));

  const root = document.createElement('div');
  root.className = 'game-root';
  app.appendChild(root);

  let mode = 'intro'; // intro | play | pause | over
  let overlay = null;
  const view = createView(root, g, info, {
    customer: (id) => mode === 'play' && tapCustomer(g, id),
    table: (id) => mode === 'play' && tapTable(g, id),
    dish: (id) => mode === 'play' && tapDish(g, id),
    upgrade: () => mode === 'play' && buyUpgrade(g),
    pause: () => mode === 'play' && openPause(),
  });

  const fit = () => {
    const s = Math.min(window.innerWidth / STAGE.w, window.innerHeight / STAGE.h);
    view.stage.style.transform = `scale(${s})`;
  };
  fit();
  window.addEventListener('resize', fit);

  const close = () => { if (overlay) { overlay.remove(); overlay = null; } };
  const show = (html, buttons) => {
    close();
    overlay = view.overlay(html);
    for (const [id, fn] of Object.entries(buttons)) overlay.querySelector(`[data-b="${id}"]`).onclick = fn;
  };

  const next = chapter.levels.find((l) => l.n === level + 1);
  const toMap = () => go('map');
  const replay = () => go('game', { chapter: chapterId, level });

  function openIntro() {
    show(`<h2>${info.name}</h2>
      <p>Earn <b>${g.cfg.goals[0]}</b> coins for one star, <b>${g.cfg.goals[2]}</b> for three.</p>
      <div class="how">
        <span>${use('ic-dine', 30)}${use('ic-bag', 30)}</span><span>Tap a guest in line. Dine-in guests take a free table, take-out guests go to the window.</span>
        <span>${use('ic-order', 30)}</span><span>Tap a guest with a notepad to take their order. It goes to the kitchen.</span>
        <span>${use('d-sandwich', 30)}</span><span>Tap a finished dish on the pickup counter. Your waiter delivers it to the tag's table.</span>
        <span>${use('ic-bill', 30)}</span><span>Tap a guest with a coin to collect payment, then tap the dirty table to clean it.</span>
      </div>
      <p>Watch the bar above each head: green is happy, red means they are about to leave.</p>
      <div class="row"><button data-b="map">Back to map</button><button class="primary" data-b="go">Open the doors</button></div>`,
    { map: toMap, go: () => { close(); mode = 'play'; } });
  }
  function openPause() {
    mode = 'pause';
    show(`<h2>Paused</h2><div class="row"><button data-b="quit">Quit to map</button><button data-b="again">Restart level</button><button class="primary" data-b="resume">Resume</button></div>`,
      { quit: toMap, again: replay, resume: () => { close(); mode = 'play'; } });
  }
  function openResults() {
    mode = 'over';
    const n = stars(g);
    recordResult(chapterId, level, n); // saved once; a worse replay never lowers the best score
    const win = n > 0;
    show(`<h2>${win ? (n === 3 ? 'Standing ovation!' : 'Well served') : 'Closed for the night'}</h2>
      <div class="stars">${[0, 1, 2].map((i) => `<svg width="56" height="56" viewBox="0 0 40 40" class="${i < n ? 'on' : ''}" style="animation-delay:${i * 0.25}s"><use href="#ic-spark"/></svg>`).join('')}</div>
      <div class="stats"><div><b>${g.earned}</b>coins earned</div><div><b>${g.served}</b>guests served</div><div><b>${g.lost}</b>guests lost</div></div>
      <p>${win ? '' : `You needed ${g.cfg.goals[0]} coins for the first star. Give it another go!`}</p>
      <div class="row"><button data-b="map">Map</button><button data-b="again">Play again</button>${win && next ? '<button class="primary" data-b="next">Next level</button>' : ''}</div>`,
    { map: toMap, again: replay, ...(win && next ? { next: () => go('game', { chapter: chapterId, level: level + 1 }) } : {}) });
  }

  const onKey = (e) => { if (e.key === 'Escape') { if (mode === 'play') openPause(); else if (mode === 'pause') { close(); mode = 'play'; } } };
  window.addEventListener('keydown', onKey);

  let raf = 0, last = performance.now();
  const loop = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (mode === 'play') {
      tick(g, dt);
      if (g.over) openResults();
    }
    view.sync();
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  openIntro();

  // Test hook so automated checks can read the game state. Harmless in production.
  window.__game = { g, get mode() { return mode; } };

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', fit);
    window.removeEventListener('keydown', onKey);
    document.body.classList.remove('game-open');
    delete window.__game;
  };
}
