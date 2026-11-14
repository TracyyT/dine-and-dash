import '../game/game.css';
import { go } from '../router.js';
import { chapters } from '../data/chapters.js';
import { levelConfig } from '../data/levels.js';
import { themes } from '../themes/index.js';
import { applyTheme } from '../themes/apply.js';
import { recordResult, getUpgrades, bankCoins, chapterStars, getLives, loseLife, nextLifeIn } from '../state/progress.js';
import { createGame, tick, tapCustomer, tapTable, tapDish, tapFountain, stars } from '../game/engine.js';
import { createView } from '../game/view.js';
import { introHTML, pauseHTML, resultsHTML, chapterDoneHTML } from '../game/popups.js';
import { sound } from '../game/sound.js';
import { tutorialNeeded, tutorialDone, createCoach, guideNeeded, createGuide, newFeatures } from '../game/tutorial.js';

export function renderGame(app, { chapter: chapterId = 'city', level = 1 } = {}) {
  const chapter = chapters.find((c) => c.id === chapterId);
  applyTheme(themes[chapter.theme]); // the restaurant look applies inside a level only
  document.body.classList.add('game-open');
  const info = { ...chapter.levels.find((l) => l.n === level), level, num: chapter.levels.find((l) => l.n === level)?.num, theme: chapter.theme, total: chapter.levels.length };
  const g = createGame(levelConfig(chapterId, level), getUpgrades(chapterId));

  const root = document.createElement('div');
  root.className = 'game-root';
  app.appendChild(root);
  const rot = document.createElement('div');
  rot.className = 'rotate-hint';
  rot.innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="20" y="6" width="24" height="46" rx="5" fill="#fff4e0" stroke="#e0b070" stroke-width="3"/><circle cx="32" cy="45" r="2.5" fill="#e0b070"/></svg><span>Turn your phone</span>';
  root.appendChild(rot);

  let mode = 'intro'; // intro | play | pause | guide | over
  let guide = null;
  const canTap = (type, id) => mode === 'play' || (mode === 'guide' && !!guide && guide.interactive && guide.accepts(type, id)); // the hands-on lesson lets the player tap the glowing spot
  let overlay = null;
  const view = createView(root, g, info, {
    customer: (id) => canTap('c', id) && tapCustomer(g, id),
    table: (id) => canTap('t', id) && tapTable(g, id),
    dish: (id) => canTap('d', id) && tapDish(g, id),
    fountain: () => canTap('f') && tapFountain(g),
    pause: () => mode === 'play' && openPause(),
    sfx: () => sound.setSfx(!sound.sfx),
    music: () => sound.setMusic(!sound.music),
  });

  const coach = tutorialNeeded(chapterId, level) ? createCoach(view.ents, g) : null; // first-ever level: pointers show what to tap next
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
    for (const [id, fn] of Object.entries(buttons)) { const b = overlay.querySelector(`[data-b="${id}"]`); if (b) b.onclick = fn; } // a missing button must never stop the others from working
  };

  const next = chapter.levels.find((l) => l.n === level + 1);
  const nextChapter = next ? null : chapters[chapters.indexOf(chapter) + 1];
  const toMap = () => go('map', { chapter: chapterId });
  const replay = () => go('game', { chapter: chapterId, level });

  let introTimer = 0;
  function openIntro() {
    const lives = getLives();
    show(introHTML(g, info, lives, nextLifeIn()), { map: toMap, ...(lives > 0 ? { go: () => { sound.unlock(); sound.play('click'); if (guideNeeded(chapterId, level)) openGuide(startPlay, true); else if (newFeatures(chapterId, g.owned).length) openFeatures(startPlay); else startPlay(); } } : {}) });
    if (lives <= 0) { // count down to the next life, then let the player in
      introTimer = setInterval(() => { if (mode === 'intro' && getLives() > 0) { clearInterval(introTimer); openIntro(); } else if (mode === 'intro') { const sm = overlay?.querySelector('.lives small'); if (sm) sm.textContent = `Next life ${Math.floor(nextLifeIn() / 60)}:${String(nextLifeIn() % 60).padStart(2, '0')}`; } }, 1000);
    }
  }
  function startPlay() { sound.startMusic(); close(); mode = 'play'; }
  // Spotlight walkthrough. The room is paused; a single guest is called in first so there is something to point at.
  function openGuide(after, interactive = false) {
    close(); mode = 'guide';
    if (!g.customers.length) {
      const want = interactive ? 2 : 1; // the hands-on lesson covers the first two guests only
      for (let k = 0; k < want; k++) { g.nextArrival = 0; tick(g, 0.1); }
      for (let k = 0; k < 80 && g.customers.some((c) => c.moving); k++) tick(g, 0.1);
      g.customers.length = Math.min(g.customers.length, want);
      g.timeLeft = g.cfg.duration; g.nextArrival = g.cfg.arrival; g.customers.forEach((c) => { c.sat = 1; });
    }
    if (interactive) g.customers.forEach((c) => { c.kind = 'dine'; c.planned = 1; }); // one dish each, so the lesson stays short
    view.sync();
    try { guide = createGuide({ stage: view.stage, g, interactive, ids: g.customers.map((c) => c.id), onDone: () => { guide = null; g.timeLeft = g.cfg.duration; g.nextArrival = Math.min(g.cfg.arrival, 3); after(); } }); } catch (err) { console.error(err); guide = null; after(); }
  }
  // A bought upgrade is explained once, in the first chapter only: the room stays paused and the new thing is lit up.
  function openFeatures(after) {
    close(); mode = 'guide'; view.sync();
    guide = createGuide({ stage: view.stage, g, features: newFeatures(chapterId, g.owned), onDone: () => { guide = null; after(); } });
  }
  function openPause() {
    mode = 'pause'; sound.stopMusic();
    show(pauseHTML(), { help: () => openGuide(openPause), quit: toMap, again: replay, resume: () => { sound.startMusic(); close(); mode = 'play'; } });
  }
  function openResults() {
    mode = 'over'; sound.stopMusic();
    const n = stars(g);
    sound.play(n === 3 ? 'win3' : n === 2 ? 'win2' : n === 1 ? 'win1' : 'lose');
    recordResult(chapterId, level, n); // saved once; a worse replay never lowers the best score
    if (g.result !== 'pass') loseLife(); // failing costs one life, passing never does
    bankCoins(g.earned); // coins carry over to the map, where you spend them on upgrades
    const win = g.result === 'pass';
    show(resultsHTML(g, info, !!next || !!nextChapter, getLives()), { map: toMap, again: replay, ...(win && next ? { next: () => go('game', { chapter: chapterId, level: level + 1 }) } : {}), ...(win && nextChapter ? { next: openChapterDone } : {}) });
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
    if (mode === 'guide' && guide && guide.interactive) { // hands-on lesson: the room runs as you tap, but the clock, new guests and moods are held
      tick(g, dt); g.timeLeft = g.cfg.duration; g.nextArrival = 999; g.customers.forEach((c) => { c.sat = 1; });
      guide.update();
    }
    view.sync();
    if (coach) { if (g.served >= 1) tutorialDone(); coach.update(mode === 'play' && g.served < 1); }
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  openIntro();

  // Test hook so automated checks can read the game state. Harmless in production.
  window.__game = { g, get mode() { return mode; } };

  return () => {
    cancelAnimationFrame(raf);
    sound.stopMusic(); clearInterval(introTimer);
    portrait.removeEventListener('change', onTurn);
    window.removeEventListener('resize', fit); if (guide) guide.destroy();
    window.removeEventListener('keydown', onKey);
    document.body.classList.remove('game-open');
    delete window.__game;
  };
}
