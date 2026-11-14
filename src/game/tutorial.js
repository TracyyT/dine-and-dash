// First-time help for the very first level: a short how-to card before play, then a pointer that always shows the next thing to tap.
import { use } from './sprites.js';

const KEY = 'dine-and-dash:tutorial:v1';
const read = () => { try { return localStorage.getItem(KEY) === 'done'; } catch { return true; } };
export const tutorialDone = () => { try { localStorage.setItem(KEY, 'done'); } catch { /* storage unavailable: just show it again next time */ } };
// Only the first level of the first chapter, and only until the player has finished the lesson.
export const tutorialNeeded = (chapterId, level) => chapterId === 'city' && level === 1 && !read();

const STEPS = [['ic-guest', 'Seat'], ['ic-order', 'Order'], ['ic-dine', 'Serve'], ['ic-bill', 'Pay'], ['ic-broom', 'Clean']];
export const tutorialCardHTML = () => `<div class="popup tutor">
  <h2>How to play</h2>
  <div class="tsteps">${STEPS.map(([ic, t], i) => `<div class="tstep"><span class="tn">${i + 1}</span>${use(ic, 46)}<b>${t}</b></div>${i < STEPS.length - 1 ? '<i class="tarr">›</i>' : ''}`).join('')}</div>
  <div class="tnote">${use('ic-star', 22)}<span>Tap what glows. Keep guests happy!</span></div>
  <div class="prow"><button class="pbtn primary big" data-b="ok" aria-label="Got it"><span>Got it</span></button><button class="pbtn" data-b="skip" aria-label="Skip">${use('ic-next', 24)}<span>Skip</span></button></div>
</div>`;

// What the player should tap right now, most urgent first. Returns {x, y, icon, text} or a plain message without a target.
function nextHint(g) {
  const dish = g.pickup.find((d) => !d.claimed);
  if (dish) return { x: dish.x, y: dish.y - 60, icon: 'ic-dine', text: 'Serve it' };
  const bill = g.customers.find((c) => c.state === 'wantBill');
  if (bill) return { x: bill.x, y: bill.y - 152, icon: 'ic-bill', text: 'Get paid' };
  const ord = g.customers.find((c) => c.state === 'wantOrder' && !(c.moving));
  if (ord) return { x: ord.x, y: ord.y - 152, icon: 'ic-order', text: 'Take order' };
  const dirty = g.tables.find((t) => t.state === 'dirty' && !t.claimed);
  if (dirty) return { x: dirty.x, y: dirty.y - 70, icon: 'ic-broom', text: 'Clean' };
  const q = g.customers.find((c) => c.state === 'queue');
  if (q && g.tables.some((t) => t.state === 'free')) return { x: q.x, y: q.y - 152, icon: 'ic-guest', text: 'Seat guest' };
  return null;
}

export function createCoach(ents, g) {
  const el = document.createElement('div');
  el.className = 'coach'; el.style.display = 'none';
  ents.appendChild(el);
  let key = '';
  return {
    update(active) {
      const h = active && !g.over ? nextHint(g) : null;
      if (!h) { el.style.display = 'none'; key = ''; return; }
      const k = h.icon;
      if (k !== key) { el.innerHTML = `<div class="cbub">${use(h.icon, 26)}<b>${h.text}</b></div><div class="carr"></div>`; key = k; }
      el.style.display = 'block';
      el.style.transform = `translate(${h.x.toFixed(1)}px,${h.y.toFixed(1)}px)`;
    },
    destroy() { el.remove(); },
  };
}

// ---- spotlight walkthrough: the room goes dark except the part being explained; Next slides the bright circle to the following step ----
const GKEY = 'dine-and-dash:guide:v2'; // v2: the hands-on lesson is new, so everyone sees it once, even if they saw the older tour
export const guideSeen = () => { try { return localStorage.getItem(GKEY) === 'seen'; } catch { return true; } };
export const guideDone = () => { try { localStorage.setItem(GKEY, 'seen'); } catch { /* shown again next time */ } };
// Only the very first level, once; the pause menu can replay it on any level.
export const guideNeeded = (chapterId, level) => chapterId === 'city' && level === 1 && !guideSeen();

// Each step: where to shine (a function of the live room, in room pixels), up to two pictures and a few words.
const guideSteps = (g, L, rectOf, stage) => {
  const q = (sel) => stage.querySelector(sel);
  const union = (...rs) => { const a = rs.filter(Boolean); const x = Math.min(...a.map((r) => r.x)), y = Math.min(...a.map((r) => r.y)), x2 = Math.max(...a.map((r) => r.x + r.w)), y2 = Math.max(...a.map((r) => r.y + r.h)); return { x, y, w: x2 - x, h: y2 - y }; };
  const dineRect = { x: L.dineX - 6, y: L.tables[0][1] - 100, w: L.cols * L.cellW + 12, h: (L.rows - 1) * 215 + 200 };
  const guest = () => q('.ent.guest');
  return [
    { icons: ['ic-star'], text: 'Reach the goal', rect: () => union(rectOf(q('.objs')), rectOf(q('.hstars'))) },
    { icons: ['ic-clock', 'ic-bill'], text: 'Before time runs out', rect: () => union(rectOf(q('.timer')), rectOf(q('.coins'))) },
    { icons: ['ic-guest', 'ic-dine'], text: 'Tap a guest, then a free table', rect: () => ({ x: 8, y: L.queue[0].y - 100, w: 236, h: L.queue[5].y - L.queue[0].y + 150 }) },
    { icons: ['ic-smile'], text: 'Keep the bar green', rect: () => { const c = g.customers[0]; return c ? { x: c.x - 42, y: c.y - 150, w: 84, h: 60 } : { x: 40, y: L.queue[0].y - 130, w: 120, h: 70 }; } },
    { icons: ['ic-order'], text: 'Tap guests who want to order', rect: () => dineRect },
    { icons: ['ic-dine'], text: 'The chefs cook it', rect: () => ({ x: L.kx, y: 232, w: L.kw, h: 190 }) },
    { icons: ['ic-dine'], text: 'Tap finished dishes to serve', rect: () => ({ x: L.kx, y: 410, w: L.kw, h: 120 }) },
    { icons: ['ic-bill', 'ic-broom'], text: 'Collect pay, then clean up', rect: () => dineRect },
    { icons: ['ic-cup'], text: 'Lemonade cheers up waiting guests', rect: () => ({ x: L.fountain.x - 50, y: L.fountain.y - 100, w: 100, h: 130 }) },
    { icons: ['ic-play'], text: 'Ready? Go!', rect: null },
  ];
};

// Hands-on lesson for the first two guests only. Every action step waits for the player's tap (done() says when it worked), then the room carries on.
// kind: tap = wait for the player's tap, wait = nothing to tap yet, info = Next button.
const liveSteps = (g, L, rectOf, stage, ids) => {
  const q = (sel) => stage.querySelector(sel);
  const union = (...rs) => { const a = rs.filter(Boolean); const x = Math.min(...a.map((r) => r.x)), y = Math.min(...a.map((r) => r.y)), x2 = Math.max(...a.map((r) => r.x + r.w)), y2 = Math.max(...a.map((r) => r.y + r.h)); return { x, y, w: x2 - x, h: y2 - y }; };
  const cu = (i) => g.customers.find((c) => c.id === ids[i]);
  // Room things are drawn around a point at their feet and have no box of their own, so the spotlight is sized from that point.
  const guestRect = (i) => () => { const c = cu(i); return c ? { x: c.x - 42, y: c.y - 150, w: 84, h: 170 } : null; };
  const tableRect = () => { const t = g.tables.find((x) => x.state === 'dirty') || g.tables[0]; return { x: t.x - 78, y: t.y - 70, w: 156, h: 120 }; };
  const fountainRect = () => ({ x: L.fountain.x - 50, y: L.fountain.y - 100, w: 100, h: 130 });
  // One guest from the line to a clean table. The second time the words are shorter: "your turn".
  const round = (i) => {
    const first = i === 0;
    return [
      { kind: 'tap', icons: ['ic-guest', 'ic-table'], text: first ? 'Tap the guest to seat them' : 'Your turn! Seat the next guest', only: 'c' + i, rect: guestRect(i), done: () => !cu(i) || cu(i).state !== 'queue' },
      { kind: 'tap', icons: ['ic-order'], text: first ? 'Tap the guest to take the order' : 'Take their order', only: 'c' + i, rect: guestRect(i), done: () => !cu(i) || !!cu(i).dish },
      { kind: 'wait', icons: ['ic-chef'], text: first ? 'The chef is cooking...' : 'Cooking...', rect: () => ({ x: L.kx, y: 232, w: L.kw, h: 190 }), done: () => g.pickup.length > 0 || !cu(i) || cu(i).state === 'eating' },
      { kind: 'tap', icons: ['ic-dine'], text: first ? 'Tap the dish to serve it' : 'Serve the dish', only: 'd', rect: () => { const d = g.pickup[0]; return d ? { x: d.x - 40, y: d.y - 64, w: 80, h: 90 } : null; }, done: () => !cu(i) || ['eating', 'wantBill', 'leaving'].includes(cu(i).state) },
      { kind: 'tap', icons: ['ic-bill'], text: first ? 'When they finish, tap to get paid' : 'Get paid', only: 'c' + i, rect: guestRect(i), done: () => !cu(i) || cu(i).state === 'leaving' },
      { kind: 'tap', icons: ['ic-broom'], text: first ? 'Tap the table to clean it' : 'Clean the table', only: 't', rect: tableRect, done: () => !g.tables.some((t) => t.state === 'dirty') },
    ];
  };
  return [
    { kind: 'info', icons: ['ic-star'], text: 'Reach the goal', rect: () => union(rectOf(q('.objs')), rectOf(q('.hstars'))) },
    { kind: 'info', icons: ['ic-clock', 'ic-bill'], text: 'Before time runs out', rect: () => union(rectOf(q('.timer')), rectOf(q('.coins'))) },
    { kind: 'info', icons: ['ic-smile'], text: 'Keep the bar green', rect: () => { const c = cu(0); return c ? { x: c.x - 42, y: c.y - 150, w: 84, h: 60 } : null; } },
    ...round(0),
    { kind: 'info', icons: ['ic-cup'], text: 'Lemonade cheers up waiting guests', rect: fountainRect },
    ...round(1),
    { kind: 'info', icons: ['ic-play'], text: 'Ready? Go!', rect: null },
  ];
};

// ---- one-time intros for a bought upgrade, in the first chapter only ----
const FKEY = 'dine-and-dash:features:v1';
const seenFeatures = () => { try { return JSON.parse(localStorage.getItem(FKEY) || '[]'); } catch { return ['*']; } };
// Which owned upgrades the player has not been shown yet. Only the first chapter teaches them.
export const newFeatures = (chapterId, owned) => {
  if (chapterId !== 'city') return [];
  const seen = seenFeatures(); if (seen.includes('*')) return [];
  return FEATURES.map((f) => f.id).filter((id) => (owned[id] || 0) > 0 && !seen.includes(id));
};
const markFeatures = (ids) => { try { localStorage.setItem(FKEY, JSON.stringify([...new Set([...seenFeatures(), ...ids])])); } catch { /* shown again next time */ } };
const FEATURES = [
  { id: 'chefs', icons: ['ic-chef'], text: 'New chef! Cooks more dishes at once' },
  { id: 'host', icons: ['ic-guest', 'ic-table'], text: 'Your host seats guests for you' },
  { id: 'busser', icons: ['ic-broom'], text: 'Your busser cleans the tables' },
  { id: 'runner', icons: ['ic-dine'], text: 'Your runner serves the dishes' },
  { id: 'kitchen', icons: ['ic-dine'], text: 'Better kitchen: food cooks faster' },
  { id: 'ingredients', icons: ['ic-star'], text: 'Finer ingredients: dishes pay more' },
  { id: 'shoes', icons: ['ic-waiter'], text: 'Quick shoes: you walk faster' },
  { id: 'seats', icons: ['ic-smile'], text: 'Cozy seats: guests stay patient longer' },
  { id: 'cleaning', icons: ['ic-broom'], text: 'Quick clean: tables are ready sooner' },
  { id: 'tips', icons: ['ic-bill'], text: 'Tip bonus: happy guests tip more' },
  { id: 'training', icons: ['ic-star', 'ic-people'], text: 'Training: your staff work faster' },
];
const featureSteps = (g, L, rectOf, stage, ids) => {
  const q = (sel) => stage.querySelector(sel);
  const dineRect = { x: L.dineX - 6, y: L.tables[0][1] - 100, w: L.cols * L.cellW + 12, h: (L.rows - 1) * 215 + 200 };
  const person = (m) => (m ? { x: m.x - 44, y: m.y - 120, w: 88, h: 150 } : null);
  const staff = (role) => g.staff.find((m) => m.role === role);
  const kitchen = { x: L.kx, y: 232, w: L.kw, h: 190 }, pickup = { x: L.kx, y: 410, w: L.kw, h: 120 };
  const rects = {
    chefs: () => { const s = g.stations[g.stations.length - 1]; return s ? { x: s.x - 70, y: s.y - 120, w: 140, h: 160 } : kitchen; },
    host: () => person(staff('host')), busser: () => person(staff('busser')), runner: () => person(staff('runner')),
    kitchen: () => kitchen, ingredients: () => pickup, shoes: () => person(g.waiter),
    seats: () => ({ x: 8, y: L.queue[0].y - 100, w: 236, h: L.queue[5].y - L.queue[0].y + 150 }),
    cleaning: () => dineRect, tips: () => rectOf(q('.coins')), training: () => person(g.staff[0] || g.waiter),
  };
  return ids.map((id) => { const f = FEATURES.find((x) => x.id === id); return { kind: 'info', icons: f.icons, text: f.text, rect: rects[id] }; });
};

export function createGuide({ stage, g, onDone, interactive = false, ids = [], features = null }) {
  const L = g.L;
  const rectOf = (el) => {
    if (!el) return null;
    const st = stage.getBoundingClientRect(), r = el.getBoundingClientRect(), s = st.width / L.W;
    return { x: (r.left - st.left) / s, y: (r.top - st.top) / s, w: r.width / s, h: r.height / s };
  };
  const steps = features ? featureSteps(g, L, rectOf, stage, features) : interactive ? liveSteps(g, L, rectOf, stage, ids) : guideSteps(g, L, rectOf, stage).map((s) => ({ ...s, kind: 'info' }));
  const root = document.createElement('div');
  root.className = 'guide' + (interactive ? ' live' : '');
  const skip = interactive || features ? '' : `<button class="pbtn" data-g="skip" aria-label="Skip">${use('ic-next', 22)}<span>Skip</span></button>`; // the first-time lesson cannot be skipped
  root.innerHTML = `<div class="gblk" data-k="all"></div><div class="gblk" data-k="t"></div><div class="gblk" data-k="b"></div><div class="gblk" data-k="l"></div><div class="gblk" data-k="r"></div><div class="ghole"></div><div class="gcard" role="dialog" aria-label="How to play"><div class="gic"></div><b class="gtxt"></b><div class="gdots"></div><div class="gbtns">${skip}<button class="pbtn primary" data-g="next" aria-label="Next"><span>Next</span></button></div></div>`;
  stage.appendChild(root);
  const hole = root.querySelector('.ghole'), card = root.querySelector('.gcard');
  const blk = Object.fromEntries([...root.querySelectorAll('.gblk')].map((b) => [b.dataset.k, b]));
  let i = 0, finished = false, trackT = 0;
  const cw = 300, ch = 190;
  // Place the bright hole (and the clickable gap in the dark layer) around the current step's target.
  const place = (st) => {
    const r = st.rect && st.rect();
    const tap = st.kind === 'tap' && r;
    root.classList.toggle('nohole', !r);
    blk.all.style.display = tap ? 'none' : 'block'; // a step with nothing to tap blocks the whole room
    for (const k of ['t', 'b', 'l', 'r']) blk[k].style.display = tap ? 'block' : 'none';
    if (!r) {
      Object.assign(hole.style, { left: L.W / 2 + 'px', top: L.H / 2 + 'px', width: '0px', height: '0px', opacity: 0 });
      Object.assign(card.style, { left: (L.W - cw) / 2 + 'px', top: (L.H - ch) / 2 + 'px' });
      return;
    }
    const pad = 12, x = Math.max(4, r.x - pad), y = Math.max(4, r.y - pad), w = Math.min(L.W - x - 4, r.w + pad * 2), h = Math.min(L.H - y - 4, r.h + pad * 2);
    Object.assign(hole.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', borderRadius: Math.min(46, Math.min(w, h) / 2) + 'px', opacity: 1 });
    if (tap) {
      Object.assign(blk.t.style, { left: '0', top: '0', width: L.W + 'px', height: y + 'px' });
      Object.assign(blk.b.style, { left: '0', top: y + h + 'px', width: L.W + 'px', height: Math.max(0, L.H - y - h) + 'px' });
      Object.assign(blk.l.style, { left: '0', top: y + 'px', width: x + 'px', height: h + 'px' });
      Object.assign(blk.r.style, { left: x + w + 'px', top: y + 'px', width: Math.max(0, L.W - x - w) + 'px', height: h + 'px' });
    }
    let cx, cy; // put the card beside the bright part, wherever there is room
    if (y + h + 16 + ch <= L.H) { cx = x + w / 2 - cw / 2; cy = y + h + 16; }
    else if (y - 16 - ch >= 0) { cx = x + w / 2 - cw / 2; cy = y - 16 - ch; }
    else if (x + w + 16 + cw <= L.W) { cx = x + w + 16; cy = y + h / 2 - ch / 2; }
    else { cx = x - 16 - cw; cy = y + h / 2 - ch / 2; }
    cx = Math.max(10, Math.min(L.W - cw - 10, cx)); cy = Math.max(10, Math.min(L.H - ch - 10, cy));
    Object.assign(card.style, { left: cx + 'px', top: cy + 'px' });
  };
  const show = () => {
    const st = steps[i], last = i === steps.length - 1;
    root.querySelector('.gic').innerHTML = st.icons.map((ic) => use(ic, 54)).join('<i>›</i>');
    root.querySelector('.gtxt').textContent = st.text;
    root.querySelector('.gdots').innerHTML = steps.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('');
    const nx = root.querySelector('[data-g=next]');
    nx.querySelector('span').textContent = last ? 'Go' : 'Next';
    nx.style.display = st.kind === 'info' ? '' : 'none'; // tap and wait steps move on by themselves
    const sk = root.querySelector('[data-g=skip]'); if (sk) sk.style.display = last ? 'none' : '';
    root.classList.remove('trk'); clearTimeout(trackT);
    place(st);
    trackT = setTimeout(() => root.classList.add('trk'), 600); // after the glide, follow moving guests without lag
  };
  const finish = () => { if (finished) return; finished = true; clearTimeout(trackT); if (features) markFeatures(features); else guideDone(); root.remove(); onDone(); };
  const advance = () => { if (i >= steps.length - 1) return finish(); i++; show(); };
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-g]'); if (!b) return;
    if (b.dataset.g === 'skip') return finish();
    advance();
  });
  show();
  return {
    interactive,
    // Only the thing the current step asks for may be tapped, so a double tap can never seat or serve the wrong one.
    accepts(type, id) { const st = steps[i]; if (!st || st.kind !== 'tap') return false; return st.only === 'c' + ids.indexOf(id) ? type === 'c' : st.only === type; },
    // Called every frame in the hands-on lesson: moves on when the player's tap worked and keeps the spotlight on the target.
    update() {
      if (finished || !interactive) return;
      const st = steps[i];
      if (st.done && st.done()) { advance(); return; }
      if (root.classList.contains('trk')) place(st);
    },
    destroy: () => { finished = true; clearTimeout(trackT); root.remove(); },
  };
}
