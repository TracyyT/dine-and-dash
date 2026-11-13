// Game rules only. No DOM in here, so it can be tested on its own.
import { DISHES } from '../data/dishes.js';

export const STAGE = { w: 1280, h: 720 };
// Two columns, front of the line at the top left, so thought bubbles don't cover the guest ahead.
export const QUEUE_SPOTS = [[75, 290], [175, 290], [75, 425], [175, 425], [75, 560], [175, 560]].map(([x, y]) => ({ x, y }));
export const DOOR = { x: 125, y: 790 };
export const TABLE_SPOTS = [[420, 290], [620, 290], [820, 290], [420, 520], [620, 520], [820, 520]];
export const STATION_SPOTS = [[985, 385], [1100, 385], [1215, 385]];
export const PICKUP_SPOTS = [0, 1, 2, 3, 4, 5].map((i) => ({ x: 960 + i * 58, y: 520 }));
export const TAKE_SPOTS = [{ x: 1010, y: 700 }, { x: 1190, y: 700 }];
export const DROP_POINT = { x: 1100, y: 450 };
export const PICKUP_POINT = { x: 1100, y: 590 };
export const UPGRADE_COSTS = [30, 60, 100];

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const WORK = { order: 0.5, bill: 0.4, clean: 1.3, pickup: 0.3, drop: 0.3, deliver: 0.4 };
const MOOD_RATE = { queue: 1, wantOrder: 1.3, waitFood: 1, wantBill: 1.5, eating: 0.1 };

export function createGame(cfg) {
  const g = {
    cfg, timeLeft: cfg.duration, earned: 0, wallet: 0, served: 0, lost: 0, turnedAway: 0,
    over: false, customers: [], tables: [], stations: [], tickets: [], pickup: [], takeSlots: [],
    tasks: [], events: [], cookLevel: 0, nextId: 1, nextArrival: 1,
    waiter: { x: 600, y: 650, carry: null, task: null, work: 0, face: 1 },
  };
  TABLE_SPOTS.slice(0, cfg.tables).forEach(([x, y], i) => g.tables.push({ id: i + 1, x, y, state: 'free', guest: null }));
  STATION_SPOTS.slice(0, cfg.stations).forEach(([x, y], i) => g.stations.push({ id: i + 1, x, y, ticket: null, progress: 0, dur: 1, hold: false }));
  TAKE_SPOTS.forEach((s, i) => g.takeSlots.push({ id: i + 1, x: s.x, y: s.y, guest: null }));
  return g;
}

export const stars = (g) => g.cfg.goals.filter((goal) => g.earned >= goal).length;
export const moodOf = (sat) => (sat > 0.66 ? 'green' : sat > 0.4 ? 'yellow' : sat > 0.2 ? 'orange' : 'red');

const byId = (list, id) => list.find((o) => o.id === id);
const emit = (g, e) => g.events.push(e);

function step(o, tx, ty, speed, dt) {
  const dx = tx - o.x, dy = ty - o.y, d = Math.hypot(dx, dy);
  if (d <= speed * dt || d < 0.5) { o.x = tx; o.y = ty; return true; }
  o.x += (dx / d) * speed * dt; o.y += (dy / d) * speed * dt;
  if (Math.abs(dx) > 2) o.face = dx > 0 ? 1 : -1;
  return false;
}

const SKINS = ['#f6d3b3', '#e8b58a', '#c98f62', '#a66a43', '#7a4a2e'];
const HAIRS = ['#2b1d17', '#5a3a22', '#a8651f', '#d9b25a', '#8a2d3b', '#3a3f6b'];
const OUTFITS = ['#a52e4a', '#c9a24a', '#3d7f86', '#6a4c93', '#d9733a', '#4f8a5b', '#2f5d8a'];

function spawn(g) {
  const waiting = g.customers.filter((c) => c.state === 'queue').length;
  if (waiting >= QUEUE_SPOTS.length) { g.turnedAway++; emit(g, { type: 'toast', text: 'Line is full — a guest walked away' }); return; }
  const w = g.cfg.orders, r = Math.random();
  const planned = r < w[0] ? 1 : r < w[0] + w[1] ? 2 : 3;
  const take = Math.random() < g.cfg.take;
  const c = {
    id: g.nextId++, kind: take ? 'take' : 'dine', state: 'queue', next: 'queue', moving: false,
    x: DOOR.x, y: DOOR.y, tx: 0, ty: 0, speed: 170, face: 1, sat: 1, planned: take ? 1 : planned, done: 0, bill: 0,
    dish: null, eatT: 0, table: null, slot: null, happy: true,
    look: { skin: pick(SKINS), hair: pick(HAIRS), style: Math.floor(rand(0, 3)), outfit: pick(OUTFITS), hat: Math.random() < 0.35 ? Math.floor(rand(1, 3)) : 0 },
  };
  g.customers.push(c);
  layoutQueue(g);
}

function layoutQueue(g) {
  g.customers.filter((c) => c.state === 'queue').sort((a, b) => a.id - b.id).forEach((c, i) => {
    c.tx = QUEUE_SPOTS[i].x; c.ty = QUEUE_SPOTS[i].y; c.moving = true; c.next = 'queue';
  });
}

function sendTo(c, x, y, next, speed = 300) { c.tx = x; c.ty = y; c.moving = true; c.state = 'walking'; c.next = next; c.speed = speed; }

function release(g, c) {
  if (c.table) { const t = byId(g.tables, c.table); if (t) { t.guest = null; t.state = c.done > 0 ? 'dirty' : 'free'; } }
  if (c.slot) { const s = byId(g.takeSlots, c.slot); if (s) s.guest = null; }
  g.tickets = g.tickets.filter((t) => t.cid !== c.id);
  g.pickup = g.pickup.filter((d) => d.cid !== c.id);
  g.stations.forEach((s) => { if (s.ticket && s.ticket.cid === c.id) { s.ticket = null; s.hold = false; } });
}

function leave(g, c, happy) {
  release(g, c);
  c.happy = happy;
  c.state = 'leaving'; c.moving = true; c.tx = DOOR.x; c.ty = DOOR.y; c.speed = 230;
  if (!happy) { g.lost++; emit(g, { type: 'angry', x: c.x, y: c.y }); }
  layoutQueue(g);
}

function enqueue(g, type, id) {
  if (g.tasks.length >= 4) { emit(g, { type: 'toast', text: 'Your waiter has enough to do!' }); return; }
  const cur = g.waiter.task;
  if ((cur && cur.type === type && cur.id === id) || g.tasks.some((t) => t.type === type && t.id === id)) return;
  g.tasks.push({ type, id });
}

const workSpot = (g, c) => {
  if (c.table) { const t = byId(g.tables, c.table); return { x: t.x, y: t.y + 66 }; }
  const s = byId(g.takeSlots, c.slot); return { x: s.x - 60, y: s.y };
};

function aim(g, task) {
  if (task.type === 'order' || task.type === 'bill' || task.type === 'deliver') {
    const c = byId(g.customers, task.id);
    if (c) return workSpot(g, c);
    return null;
  }
  if (task.type === 'clean') { const t = byId(g.tables, task.id); return { x: t.x, y: t.y + 66 }; }
  if (task.type === 'pickup') return PICKUP_POINT;
  if (task.type === 'drop') return DROP_POINT;
}

function valid(g, task) {
  const c = ['order', 'bill'].includes(task.type) ? byId(g.customers, task.id) : null;
  if (task.type === 'order') return !!c && c.state === 'wantOrder';
  if (task.type === 'bill') return !!c && c.state === 'wantBill';
  if (task.type === 'clean') return byId(g.tables, task.id).state === 'dirty';
  if (task.type === 'pickup') return !!byId(g.pickup, task.id);
  return true;
}

function finish(g, task) {
  const w = g.waiter;
  // The guest may have left, or the dish vanished, while the waiter was busy.
  if (['order', 'bill', 'pickup', 'clean'].includes(task.type) && !valid(g, task)) { w.task = null; return; }
  if (task.type === 'order') {
    const c = byId(g.customers, task.id);
    c.dish = pick(g.cfg.dishes); c.state = 'waitFood';
    w.carry = { kind: 'ticket' };
    w.task = { type: 'drop', id: c.id, dish: c.dish, phase: 'walk', t: 0 }; return;
  }
  if (task.type === 'drop') {
    const c = byId(g.customers, task.id);
    w.carry = null;
    if (c) {
      const label = c.table ? String(c.table) : 'GO';
      g.tickets.push({ id: g.nextId++, cid: c.id, dish: task.dish, label });
    }
  }
  if (task.type === 'pickup') {
    const d = byId(g.pickup, task.id);
    g.pickup = g.pickup.filter((x) => x !== d);
    w.carry = { kind: 'dish', dish: d.dish };
    w.task = { type: 'deliver', id: d.cid, phase: 'walk', t: 0 }; return;
  }
  if (task.type === 'deliver') {
    const c = byId(g.customers, task.id);
    const dish = w.carry && w.carry.dish; w.carry = null;
    if (c && c.state === 'waitFood') serve(g, c, dish);
  }
  if (task.type === 'bill') collect(g, byId(g.customers, task.id));
  if (task.type === 'clean') { byId(g.tables, task.id).state = 'free'; emit(g, { type: 'sparkle', x: byId(g.tables, task.id).x, y: byId(g.tables, task.id).y }); }
  w.task = null;
}

function serve(g, c, dish) {
  c.bill += DISHES[dish].price; c.done++;
  emit(g, { type: 'sparkle', x: c.x, y: c.y - 30 });
  if (c.kind === 'take') { collect(g, c); return; }
  c.state = 'eating'; c.eatT = rand(3, 5);
}

function collect(g, c) {
  const pay = Math.round(c.bill * (0.7 + 0.3 * c.sat));
  const tip = Math.round(c.bill * 0.35 * Math.max(0, c.sat - 0.35));
  g.earned += pay + tip; g.wallet += pay + tip; g.served++;
  emit(g, { type: 'coin', x: c.x, y: c.y - 70, text: `+${pay + tip}`, tip });
  if (c.sat > 0.55) emit(g, { type: 'heart', x: c.x, y: c.y - 70 });
  leave(g, c, true);
}

function updateWaiter(g, dt) {
  const w = g.waiter;
  for (let guard = 0; !w.task && g.tasks.length && guard < 8; guard++) {
    const t = g.tasks.shift();
    if (valid(g, t)) w.task = { ...t, phase: 'walk', t: 0 };
  }
  const task = w.task;
  if (!task) { step(w, 600, 650, 300, dt); return; }
  if (task.phase === 'walk') {
    const spot = aim(g, task);
    if (!spot) { w.task = null; w.carry = null; return; }
    if (step(w, spot.x, spot.y, 400, dt)) {
      if (!valid(g, task)) { w.task = null; w.carry = null; return; }
      task.phase = 'work'; task.t = 0;
    }
  } else {
    task.t += dt;
    if (task.t >= WORK[task.type]) finish(g, task);
  }
}

function updateKitchen(g, dt) {
  for (const s of g.stations) {
    if (!s.ticket && g.tickets.length) {
      s.ticket = g.tickets.shift(); s.progress = 0; s.hold = false;
      s.dur = DISHES[s.ticket.dish].time / (1 + 0.4 * g.cookLevel);
    } else if (s.ticket) {
      if (!s.hold) { s.progress += dt; if (s.progress >= s.dur) s.hold = true; }
      if (s.hold && g.pickup.length < PICKUP_SPOTS.length) {
        const used = new Set(g.pickup.map((d) => d.slot));
        const slot = PICKUP_SPOTS.findIndex((_, i) => !used.has(i));
        g.pickup.push({ id: g.nextId++, cid: s.ticket.cid, dish: s.ticket.dish, label: s.ticket.label, slot, age: 0 });
        emit(g, { type: 'ding', x: PICKUP_SPOTS[slot].x, y: PICKUP_SPOTS[slot].y });
        s.ticket = null; s.hold = false;
      }
    }
  }
  g.pickup.forEach((d) => { d.age += dt; });
}

export function tick(g, dt) {
  if (g.over) return;
  g.timeLeft -= dt;
  if (g.timeLeft <= 0) { g.timeLeft = 0; g.over = true; return; }
  g.nextArrival -= dt;
  if (g.nextArrival <= 0) {
    if (g.timeLeft > 8) spawn(g);
    g.nextArrival = g.cfg.arrival * rand(0.75, 1.25);
  }
  for (const c of [...g.customers]) {
    if (c.moving && step(c, c.tx, c.ty, c.speed, dt)) {
      c.moving = false;
      if (c.state === 'leaving') { g.customers = g.customers.filter((x) => x !== c); continue; }
      c.state = c.next;
    }
    if (c.state === 'eating') { c.eatT -= dt; if (c.eatT <= 0) c.state = c.done < c.planned ? 'wantOrder' : 'wantBill'; }
    const rate = MOOD_RATE[c.state];
    if (rate) {
      const late = c.state === 'waitFood' && g.pickup.some((d) => d.cid === c.id) ? 1.6 : 1;
      c.sat -= (rate * late * dt) / g.cfg.patience;
      if (c.sat <= 0) { c.sat = 0; leave(g, c, false); }
    }
  }
  updateKitchen(g, dt);
  updateWaiter(g, dt);
}

// ---- player taps ----
export function tapCustomer(g, id) {
  const c = byId(g.customers, id);
  if (!c || g.over) return;
  if (c.state === 'queue') {
    if (c.kind === 'dine') {
      const t = g.tables.find((x) => x.state === 'free');
      if (!t) return emit(g, { type: 'toast', text: t === undefined && g.tables.some((x) => x.state === 'dirty') ? 'Clean a table first!' : 'No free table yet' });
      t.state = 'taken'; t.guest = c.id; c.table = t.id;
      sendTo(c, t.x, t.y - 22, 'wantOrder'); layoutQueue(g);
    } else {
      const s = g.takeSlots.find((x) => !x.guest);
      if (!s) return emit(g, { type: 'toast', text: 'Take-out window is busy' });
      s.guest = c.id; c.slot = s.id; sendTo(c, s.x, s.y, 'wantOrder'); layoutQueue(g);
    }
  } else if (c.state === 'wantOrder') enqueue(g, 'order', c.id);
  else if (c.state === 'wantBill') enqueue(g, 'bill', c.id);
}
export function tapTable(g, id) {
  const t = byId(g.tables, id);
  if (!t || g.over) return;
  if (t.state === 'dirty') enqueue(g, 'clean', t.id);
  else if (t.guest) tapCustomer(g, t.guest);
}
export function tapDish(g, id) { if (byId(g.pickup, id) && !g.over) enqueue(g, 'pickup', id); }
export function upgradeCost(g) { return UPGRADE_COSTS[g.cookLevel]; }
export function buyUpgrade(g) {
  const cost = upgradeCost(g);
  if (cost === undefined) return false;
  if (g.wallet < cost) { emit(g, { type: 'toast', text: `Need ${cost} coins` }); return false; }
  g.wallet -= cost; g.cookLevel++; emit(g, { type: 'upgrade' }); return true;
}
