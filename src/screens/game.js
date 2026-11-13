import '../game/game.css';
import { go } from '../router.js';
import { chapters } from '../data/chapters.js';
import { levelConfig } from '../data/levels.js';
import { themes } from '../themes/index.js';
import { applyTheme } from '../themes/apply.js';
import { recordResult, getUpgrades, bankCoins, chapterStars } from '../state/progress.js';
import { createGame, tick, tapCustomer, tapTable, tapDish, stars } from '../game/engine.js';
import { createView } from '../game/view.js';
import { introHTML, pauseHTML, resultsHTML, chapterDoneHTML } from '../game/popups.js';
import { sound } from '../game/sound.js';

export function renderGame(app, { chapter: chapterId = 'city', level = 1 } = {}) {
  const chapter = chapters.find((c) => c.id === chapterId);
  applyTheme(themes[chapter.theme]); // the restaurant look applies inside a level only
  document.body.classList.add('game-open');
  const info = { ...chapter.levels.find((l) => l.n === level), level, theme: chapter.theme };
  const g = createGame(levelConfig(chapterId, level), getUpgrades(chapterId));

  const root = document.createElement('div');
  root.className = 'game-root';
  app.appendChild(root);
  const rot = document.createElement('div');
  rot.className = 'rotate-hint';
  rot.innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="20" y="6" width="24" height="46" rx="5" fill="#fff4e0" stroke="#e0b070" stroke-width="3"/><circle cx="32" cy="45" r="2.5" fill="#e0b070"/></svg><span>Turn your phone</span>';
  root.appendChild(rot);

  let mode = 'intro'; // intro | play | pause | over
  let overlay = null;
  const view = createView(root, g, info, {
    customer: (id) => mode === 'play' && tapCustomer(g, id),
    table: (id) => mode === 'play' && tapTable(g, id),
    dish: (id) => mode === 'play' && tapDish(g, id),
    pause: () => mode === 'play' && openPause(),
    sfx: () => sound.setSfx(!sound.sfx),
    music: () => sound.setMusic(!sound.music),
  });

  const fit = () => {
    const s = Math.min(window.innerWidth / g.L.W, window.innerHeight / g.L.H);
    view.stage.style.transform = `translate(-50%,-50%) scale(${s})`;
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
  const nextChapter = next ? null : chapters[chapters.indexOf(chapter) + 1];
  const toMap = () => go('map', { chapter: chapterId });
  const replay = () => go('game', { chapter: chapterId, level });

  function openIntro() {
    show(introHTML(g, info), { map: toMap, go: () => { sound.unlock(); sound.startMusic(); sound.play('click'); close(); mode = 'play'; } });
  }
  function openPause() {
    mode = 'pause'; sound.stopMusic();
    show(pauseHTML(), { quit: toMap, again: replay, resume: () => { sound.startMusic(); close(); mode = 'play'; } });
  }
  function openResults() {
    mode = 'over'; sound.stopMusic();
    const n = stars(g);
    sound.play(n === 3 ? 'win3' : n === 2 ? 'win2' : n === 1 ? 'win1' : 'lose');
    recordResult(chapterId, level, n); // saved once; a worse replay never lowers the best score
    bankCoins(g.earned); // coins carry over to the map, where you spend them on upgrades
    const win = n > 0;
    show(resultsHTML(g, info, !!next || !!nextChapter), { map: toMap, again: replay, ...(win && next ? { next: () => go('game', { chapter: chapterId, level: level + 1 }) } : {}), ...(win && nextChapter ? { next: openChapterDone } : {}) });
  }

  function openChapterDone() {
    sound.play('win3');
    show(chapterDoneHTML(chapter, nextChapter, chapterStars(chapter)), { map: toMap, go: () => go('map', { chapter: nextChapter.id }) });
  }

  // Turning a phone upright covers the room with a "turn your phone" message, so pause the shift meanwhile.
  const portrait = matchMedia('(orientation: portrait) and (max-width: 820px)');
  const onTurn = () => { if (portrait.matches && mode === 'play') openPause(); };
  portrait.addEventListener('change', onTurn);

  const onKey = (e) => { if (e.key === 'Escape') { if (mode === 'play') openPause(); else if (mode === 'pause') { sound.startMusic(); close(); mode = 'play'; } } };
  window.addEventListener('keydown', onKey);

  let raf = 0, last = performance.now();
  const loop = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (mode === 'play') {
      const before = Math.ceil(g.timeLeft);
      tick(g, dt);
      if (g.timeLeft < 10 && Math.ceil(g.timeLeft) !== before && g.timeLeft > 0) sound.play('tick');
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
    sound.stopMusic();
    portrait.removeEventListener('change', onTurn);
    window.removeEventListener('resize', fit);
    window.removeEventListener('keydown', onKey);
    document.body.classList.remove('game-open');
    delete window.__game;
  };
}
