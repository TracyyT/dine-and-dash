// Game rules only. No DOM in here, so it can be tested on its own.
import { DISHES } from '../data/dishes.js';

import { buildLayout } from './layout.js';
// Upgrades come from the map (see data/upgrades.js) and are passed in as `owned` when a level starts.
export const PRICES = { drink: 5, dessert: 9 };
const ADDON_TIME = { drink: 2.5, dessert: 3.5 };
const LEMON_BOOST = 0.35; // satisfaction a waiting guest regains from a cup of lemonade
const LEMON_BELOW = 0.65; // a cup goes to a waiting guest once they are less happy than this
const BOOST = 0.25; // satisfaction a guest regains each time the waiter completes one of their requests

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const WORK = { refill: 0.8, order: 0.5, bill: 0.4, clean: 2.2, pickup: 0.3, drop: 0.3, deliver: 0.4 };
const MOOD_RATE = { queue: 1, wantOrder: 1.3, waitFood: 1, wantBill: 1.5, eating: 0.1 };

export function createGame(baseCfg, owned = {}) {
  const own = { training: 0, cleaning: 0, chefs: 0, kitchen: 0, ingredients: 0, shoes: 0, seats: 0, tips: 0, host: 0, busser: 0, runner: 0, ...owned };
  const cfg = { ...baseCfg, stations: Math.min(3, 1 + own.chefs) };
  const L = buildLayout(cfg);
  const g = {
    cfg, L, timeLeft: cfg.duration, earned: 0, served: 0, lost: 0, turnedAway: 0,
    over: false, customers: [], tables: [], stations: [], tickets: [], pickup: [], takeSlots: [], stallJobs: [],
    tasks: [], events: [], owned: own, staff: [], nextId: 1, nextArrival: 1,
    stats: { dishes: 0, made: 0, happy: 0, take: 0, satSum: 0 },
    objectives: [{ ...cfg.objective, status: 'open', value: 0 }], // ONE requirement per level
    result: null,
    fountain: { cups: 3, max: 3, claimed: false }, // lemonade in the wait line
    waiter: { x: L.home.x, y: L.home.y, carry: null, task: null, work: 0, face: 1 },
  };
  L.tables.slice(0, cfg.tables).forEach(([x, y], i) => g.tables.push({ id: i + 1, x, y, state: 'free', guest: null }));
  L.stations.slice(0, cfg.stations).forEach(([x, y], i) => g.stations.push({ id: i + 1, x, y, ticket: null, progress: 0, dur: 1, hold: false }));
  L.take.forEach((s, i) => g.takeSlots.push({ id: i + 1, x: s.x, y: s.y, guest: null }));
  // Hired staff start the level already at work.
  for (const role of ['host', 'busser', 'runner']) {
    for (let k = 0; k < (own[role] || 0); k++) { // each tier hires one more person of that role
      const home = role === 'host' ? { x: 215 + k * 36, y: L.queue[0].y + 40 + k * 14 } : role === 'busser' ? { x: L.dineX + 40 + k * 44, y: L.H - 60 } : { x: L.pickupPoint.x - 70 - k * 40, y: L.pickupPoint.y + k * 22 };
      g.staff.push({ id: g.nextId++, role, x: home.x, y: home.y, home, task: null, carry: null, face: 1 });
    }
  }
  return g;
}

// ---- the level's single requirement ----
// A level is passed or failed by this one requirement alone. Stars are separate: they only count angry guests who stormed out.
const objectiveValue = (g, type) => ({ coins: g.earned, guests: g.served, dishes: g.stats.dishes, items: g.stats.made, happy: g.stats.happy, takeout: g.stats.take, noAngry: g.lost })[type];
function evalObjectives(g, final) {
  const o = g.objectives[0];
  if (o.status === 'failed') return;
  o.value = objectiveValue(g, o.type); // keeps counting after the goal is met: the level plays on until the timer ends
  if (o.type === 'noAngry') {
    if (g.lost > 0) o.status = 'failed'; // the one case that ends the level early: an angry guest leaving
  } else if (o.status === 'open' && o.value >= o.target) { o.status = 'done'; emit(g, { type: 'goal' }); } // met: stays met
  if (o.status === 'failed') { g.over = true; g.result = 'fail'; return; }
  if (final) { g.over = true; g.result = o.type === 'noAngry' || o.status === 'done' ? 'pass' : 'fail'; if (g.result === 'fail') o.status = 'failed'; else o.status = 'done'; }
}
// 3 stars = nobody left angry, 2 = one angry guest left, 1 = two or more. A failed level earns none.
export const stars = (g) => (g.result !== 'pass' ? 0 : g.lost === 0 ? 3 : g.lost === 1 ? 2 : 1);
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
  if (waiting >= g.L.queue.length) { g.turnedAway++; emit(g, { type: 'toast', icon: 'ic-people', text: 'Line full', bad: true }); return; }
  const w = g.cfg.orders, r = Math.random();
  const planned = r < w[0] ? 1 : r < w[0] + w[1] ? 2 : 3;
  const take = Math.random() < g.cfg.take;
  const c = {
    id: g.nextId++, kind: take ? 'take' : 'dine', state: 'queue', next: 'queue', moving: false,
    x: g.L.door.x, y: g.L.door.y, tx: 0, ty: 0, speed: 170, face: 1, sat: 1, planned: take ? 1 : planned, done: 0, bill: 0,
    dish: null, eatT: 0, table: null, slot: null, happy: true, addons: [],
    look: { skin: pick(SKINS), hair: pick(HAIRS), style: Math.floor(rand(0, 3)), outfit: pick(OUTFITS), hat: Math.random() < 0.35 ? Math.floor(rand(1, 3)) : 0 },
  };
  g.customers.push(c);
  emit(g, { type: 'arrive' });
  layoutQueue(g);
}

function layoutQueue(g) {
  g.customers.filter((c) => c.state === 'queue').sort((a, b) => a.id - b.id).forEach((c, i) => {
    c.tx = g.L.queue[i].x; c.ty = g.L.queue[i].y; c.moving = true; c.next = 'queue';
  });
}

function sendTo(c, x, y, next, speed = 300) { c.tx = x; c.ty = y; c.moving = true; c.state = 'walking'; c.next = next; c.speed = speed; }

function release(g, c) {
  if (c.table) { const t = byId(g.tables, c.table); if (t) { t.guest = null; t.state = c.done > 0 ? 'dirty' : 'free'; } }
  if (c.slot) { const s = byId(g.takeSlots, c.slot); if (s) s.guest = null; }
  g.tickets = g.tickets.filter((t) => t.cid !== c.id);
  g.pickup = g.pickup.filter((d) => d.cid !== c.id);
  g.stallJobs = g.stallJobs.filter((j) => j.cid !== c.id);
  g.stations.forEach((s) => { if (s.ticket && s.ticket.cid === c.id) { s.ticket = null; s.hold = false; } });
}

function leave(g, c, happy) {
  release(g, c);
  c.happy = happy;
  c.state = 'leaving'; c.moving = true; c.tx = g.L.door.x; c.ty = g.L.door.y; c.speed = 230;
  if (!happy) { g.lost++; emit(g, { type: 'angry', x: c.x, y: c.y }); }
  layoutQueue(g);
}

// The waiter's to-do list in the order it will be done, for the numbers shown in the room.
// The current job counts as 1 when it has something to point at (a carry-to-kitchen walk does not).
export const QUEUE_MAX = 10;
export function taskOrder(g) {
  const cur = g.waiter.task;
  const list = cur && ['order', 'bill', 'pickup', 'clean', 'deliver', 'refill'].includes(cur.type) ? [cur] : [];
  return list.concat(g.tasks).slice(0, QUEUE_MAX);
}

function enqueue(g, type, id) {
  if (taskOrder(g).length >= QUEUE_MAX) { emit(g, { type: 'toast', icon: 'ic-waiter', text: 'Busy', bad: true }); return; }
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
  if (task.type === 'pickup') { const d = byId(g.pickup, task.id); return d ? { x: d.px, y: d.py } : g.L.pickupPoint; }
  if (task.type === 'drop') return g.L.drop;
  if (task.type === 'refill') return g.L.fountain.spot;
}

function valid(g, task) {
  const c = ['order', 'bill'].includes(task.type) ? byId(g.customers, task.id) : null;
  if (task.type === 'order') return !!c && c.state === 'wantOrder';
  if (task.type === 'bill') return !!c && c.state === 'wantBill';
  if (task.type === 'clean') { const t = byId(g.tables, task.id); return t.state === 'dirty' && !t.claimed; }
  if (task.type === 'pickup') { const d = byId(g.pickup, task.id); return !!d && !d.claimed; }
  if (task.type === 'refill') return g.fountain.cups < g.fountain.max && !g.fountain.claimed;
  return true;
}

function finish(g, task) {
  const w = g.waiter;
  // The guest may have left, or the dish vanished, while the waiter was busy.
  if (['order', 'bill', 'pickup', 'clean', 'refill'].includes(task.type) && !valid(g, task)) { w.task = null; return; }
  if (task.type === 'order') {
    const c = byId(g.customers, task.id);
    c.dish = pick(g.cfg.dishes); c.state = 'waitFood'; emit(g, { type: 'order' }); boost(g, c);
    if (g.cfg.stalls && c.kind === 'dine') {
      for (const [kind, chance] of [['drink', 0.55], ['dessert', 0.35]]) {
        if (Math.random() < chance) { c.addons.push(kind); g.stallJobs.push({ id: g.nextId++, cid: c.id, kind, label: String(c.table), progress: 0 }); }
      }
    }
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
    w.carry = { kind: 'dish', dish: d.dish, addon: !!d.addon };
    w.task = { type: 'deliver', id: d.cid, phase: 'walk', t: 0 }; return;
  }
  if (task.type === 'deliver') {
    const c = byId(g.customers, task.id);
    const carry = w.carry || {}; w.carry = null;
    if (carry.addon) { if (c && c.state !== 'leaving') addon(g, c, carry.dish); }
    else if (c && c.state === 'waitFood') serve(g, c, carry.dish);
  }
  if (task.type === 'refill') refill(g);
  if (task.type === 'bill') collect(g, byId(g.customers, task.id));
  if (task.type === 'clean') { byId(g.tables, task.id).state = 'free'; emit(g, { type: 'clean', x: byId(g.tables, task.id).x, y: byId(g.tables, task.id).y }); }
  w.task = null;
}

function refill(g) {
  g.fountain.cups = g.fountain.max; g.fountain.claimed = false;
  emit(g, { type: 'pour', x: g.L.fountain.x, y: g.L.fountain.y });
}
// A cup goes to the waiting guest who is least happy, once they dip below LEMON_BELOW. One cup per guest.
function serveLemonade(g) {
  const f = g.fountain;
  while (f.cups > 0) {
    const c = g.customers.filter((x) => x.state === 'queue' && !x.lemon && x.sat < LEMON_BELOW).sort((a, b) => a.sat - b.sat)[0];
    if (!c) return;
    f.cups--; c.lemon = true; c.sat = Math.min(1, c.sat + LEMON_BOOST);
    emit(g, { type: 'lemon', x: c.x, y: c.y - 70 });
  }
}

function boost(g, c) {
  c.sat = Math.min(1, c.sat + BOOST);
  emit(g, { type: 'boost', x: c.x, y: c.y - 70 });
}

function serve(g, c, dish) {
  boost(g, c);
  c.bill += Math.round(DISHES[dish].price * (1 + 0.15 * g.owned.ingredients)); c.done++; g.stats.dishes++;
  emit(g, { type: 'serve', x: c.x, y: c.y - 30 });
  if (c.kind === 'take') { collect(g, c); return; }
  c.state = 'eating'; c.eatT = rand(3, 5);
}

function addon(g, c, item) {
  boost(g, c);
  c.bill += Math.round(PRICES[item] * (1 + 0.15 * g.owned.ingredients));
  c.addons.splice(c.addons.indexOf(item), 1);
  g.stats.dishes++;
  emit(g, { type: 'serve', x: c.x, y: c.y - 30 });
}

function collect(g, c) {
  const pay = Math.round(c.bill * (0.7 + 0.3 * c.sat));
  const tip = Math.round(c.bill * 0.35 * Math.max(0, c.sat - 0.35) * (1 + 0.3 * g.owned.tips));
  g.earned += pay + tip; g.served++;
  g.stats.satSum += c.sat;
  if (c.sat >= 0.7) g.stats.happy++;
  if (c.kind === 'take') g.stats.take++;
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
  if (!task) { step(w, g.L.home.x, g.L.home.y, 300, dt); return; }
  if (task.phase === 'walk') {
    const spot = aim(g, task);
    if (!spot) { w.task = null; w.carry = null; return; }
    if (step(w, spot.x, spot.y, 400 * (1 + 0.25 * g.owned.shoes), dt)) {
      if (!valid(g, task)) { w.task = null; w.carry = null; return; }
      task.phase = 'work'; task.t = 0;
    }
  } else {
    task.t += dt;
    if (task.t >= WORK[task.type] * (task.type === 'clean' ? 1 - 0.3 * g.owned.cleaning : 1)) finish(g, task);
  }
}

function updateKitchen(g, dt) {
  for (const s of g.stations) {
    if (!s.ticket && g.tickets.length) {
      s.ticket = g.tickets.shift(); s.progress = 0; s.hold = false; emit(g, { type: 'cook' });
      s.dur = DISHES[s.ticket.dish].time / (1 + 0.25 * g.owned.kitchen);
    } else if (s.ticket) {
      if (!s.hold) { s.progress += dt; if (s.progress >= s.dur) s.hold = true; }
      if (s.hold && g.pickup.filter((d) => !d.addon).length < g.L.pickup.length) {
        const used = new Set(g.pickup.filter((d) => !d.addon).map((d) => d.slot));
        const slot = g.L.pickup.findIndex((_, i) => !used.has(i));
        g.stats.made++;
        g.pickup.push({ id: g.nextId++, cid: s.ticket.cid, dish: s.ticket.dish, label: s.ticket.label, slot, age: 0, x: g.L.pickup[slot].x, y: g.L.pickup[slot].y, px: g.L.pickupPoint.x, py: g.L.pickupPoint.y });
        emit(g, { type: 'ding', x: g.L.pickup[slot].x, y: g.L.pickup[slot].y });
        s.ticket = null; s.hold = false;
      }
    }
  }
  // drinks & dessert stalls make add-ons on their own
  for (const stall of g.L.stalls) {
    const job = g.stallJobs.find((j) => j.kind === stall.kind);
    if (!job) continue;
    job.progress += dt;
    if (job.progress < ADDON_TIME[stall.kind]) continue;
    const used = new Set(g.pickup.filter((d) => d.addon && d.dish === stall.kind).map((d) => d.slot));
    const slot = stall.slots.findIndex((_, i) => !used.has(i));
    if (slot < 0) continue; // counter full: wait
    g.stallJobs = g.stallJobs.filter((j) => j !== job);
    g.stats.made++;
    g.pickup.push({ id: g.nextId++, cid: job.cid, dish: stall.kind, label: job.label, slot, addon: true, age: 0, x: stall.slots[slot].x, y: stall.slots[slot].y, px: stall.point.x, py: stall.point.y });
    emit(g, { type: 'ding', x: stall.slots[slot].x, y: stall.slots[slot].y });
  }
  g.pickup.forEach((d) => { d.age += dt; });
}

const STAFF_WORK = { refill: 0.8, seat: 0.4, clean: 1.6, fetch: 0.3, bring: 0.4 };
const STAFF_SPEED = { host: 260, busser: 260, runner: 340 };
const waiterBusyWith = (g, type, id) => (g.waiter.task && g.waiter.task.type === type && g.waiter.task.id === id) || g.tasks.some((t) => t.type === type && t.id === id);

function pickStaffTask(g, s) {
  if (s.role === 'host') {
    const c = g.customers.filter((x) => x.state === 'queue' && !g.staff.some((o) => o !== s && o.task && o.task.type === 'seat' && o.task.id === x.id)).sort((a, b) => a.id - b.id)
      .find((x) => (x.kind === 'dine' ? g.tables.some((t) => t.state === 'free') : g.takeSlots.some((t) => !t.guest)));
    if (c) return { type: 'seat', id: c.id };
    if (g.fountain.cups === 0 && !g.fountain.claimed) { g.fountain.claimed = true; return { type: 'refill', id: 1 }; } // the host keeps the lemonade topped up
  } else if (s.role === 'busser') {
    const t = g.tables.find((x) => x.state === 'dirty' && !x.claimed && !waiterBusyWith(g, 'clean', x.id));
    if (t) { t.claimed = true; return { type: 'clean', id: t.id }; }
  } else if (s.role === 'runner') {
    const d = g.pickup.find((x) => !x.claimed && !waiterBusyWith(g, 'pickup', x.id) && byId(g.customers, x.cid));
    if (d) { d.claimed = true; return { type: 'fetch', id: d.id }; }
  }
  return null;
}
function staffSpot(g, s, t) {
  if (t.type === 'refill') return g.L.fountain.spot;
  if (t.type === 'seat') { const c = byId(g.customers, t.id); return c && { x: c.x + 48, y: c.y }; }
  if (t.type === 'clean') { const tb = byId(g.tables, t.id); return { x: tb.x, y: tb.y + 66 }; }
  if (t.type === 'fetch') { const d = byId(g.pickup, t.id); return d && { x: d.px - 60, y: d.py }; }
  if (t.type === 'bring') { const c = byId(g.customers, t.id); return c && workSpot(g, c); }
}
function staffValid(g, t) {
  if (t.type === 'refill') return g.fountain.cups < g.fountain.max;
  if (t.type === 'seat') { const c = byId(g.customers, t.id); return !!c && c.state === 'queue' && (c.kind === 'dine' ? g.tables.some((x) => x.state === 'free') : g.takeSlots.some((x) => !x.guest)); }
  if (t.type === 'clean') return byId(g.tables, t.id).state === 'dirty';
  if (t.type === 'fetch') return !!byId(g.pickup, t.id);
  return true;
}
function staffDrop(g, s) {
  const t = s.task;
  if (t && t.type === 'clean') byId(g.tables, t.id).claimed = false;
  if (t && t.type === 'refill') g.fountain.claimed = false;
  if (t && t.type === 'fetch') { const d = byId(g.pickup, t.id); if (d) d.claimed = false; }
  s.task = null; s.carry = null;
}
function staffFinish(g, s, t) {
  if (t.type === 'seat') tapCustomer(g, t.id);
  else if (t.type === 'refill') refill(g);
  else if (t.type === 'clean') { const tb = byId(g.tables, t.id); tb.state = 'free'; tb.claimed = false; emit(g, { type: 'clean', x: tb.x, y: tb.y }); }
  else if (t.type === 'fetch') {
    const d = byId(g.pickup, t.id);
    g.pickup = g.pickup.filter((x) => x !== d);
    s.carry = { dish: d.dish };
    s.task = { type: 'bring', id: d.cid, dish: d.dish, addon: !!d.addon, phase: 'walk', t: 0 }; return;
  } else if (t.type === 'bring') {
    const c = byId(g.customers, t.id);
    if (t.addon) { if (c && c.state !== 'leaving') addon(g, c, t.dish); }
    else if (c && c.state === 'waitFood') serve(g, c, t.dish);
  }
  s.task = null; s.carry = null;
}
function updateStaff(g, dt) {
  for (const s of g.staff) {
    if (!s.task) {
      const t = pickStaffTask(g, s);
      if (t) s.task = { ...t, phase: 'walk', t: 0 };
      else { step(s, s.home.x, s.home.y, 200, dt); continue; }
    }
    const t = s.task;
    if (t.phase === 'walk') {
      const spot = staffSpot(g, s, t);
      if (!spot || !staffValid(g, t)) { staffDrop(g, s); continue; }
      if (step(s, spot.x, spot.y, STAFF_SPEED[s.role] * (1 + 0.2 * g.owned.training), dt)) {
        if (!staffValid(g, t)) { staffDrop(g, s); continue; }
        t.phase = 'work'; t.t = 0;
      }
    } else {
      t.t += dt;
      if (!staffValid(g, t)) { staffDrop(g, s); continue; }
      if (t.t >= (STAFF_WORK[t.type] * (t.type === 'clean' ? 1 - 0.3 * g.owned.cleaning : 1)) / (1 + 0.25 * g.owned.training)) staffFinish(g, s, t);
    }
  }
}

export function tick(g, dt) {
  if (g.over) return;
  g.timeLeft -= dt;
  if (g.timeLeft <= 0) { g.timeLeft = 0; g.over = true; evalObjectives(g, true); return; }
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
    const rate = MOOD_RATE[c.state] * (1 - 0.2 * g.owned.seats);
    if (rate) {
      const late = c.state === 'waitFood' && g.pickup.some((d) => d.cid === c.id && !d.addon) ? 1.6 : 1;
      c.sat -= (rate * late * dt) / g.cfg.patience;
      if (c.sat <= 0) { c.sat = 0; leave(g, c, false); }
    }
  }
  serveLemonade(g);
  updateKitchen(g, dt);
  updateWaiter(g, dt);
  updateStaff(g, dt);
  evalObjectives(g, false);
}

// ---- player taps ----
export function tapCustomer(g, id) {
  const c = byId(g.customers, id);
  if (!c || g.over) return;
  if (c.state === 'queue') {
    if (c.kind === 'dine') {
      const t = g.tables.find((x) => x.state === 'free');
      if (!t) return emit(g, { type: 'toast', icon: g.tables.some((x) => x.state === 'dirty') ? 'ic-broom' : 'ic-table', text: g.tables.some((x) => x.state === 'dirty') ? 'Clean a table' : 'No table', bad: !g.tables.some((x) => x.state === 'dirty') });
      t.state = 'taken'; t.guest = c.id; c.table = t.id; emit(g, { type: 'seat' });
      sendTo(c, t.x, t.y - 22, 'wantOrder'); layoutQueue(g);
    } else {
      const s = g.takeSlots.find((x) => !x.guest);
      if (!s) return emit(g, { type: 'toast', icon: 'ic-bag', text: 'Window full', bad: true });
      s.guest = c.id; c.slot = s.id; emit(g, { type: 'seat' }); sendTo(c, s.x, s.y, 'wantOrder'); layoutQueue(g);
    }
  } else if (c.state === 'wantOrder') enqueue(g, 'order', c.id);
  else if (c.state === 'wantBill') enqueue(g, 'bill', c.id);
}
export function tapTable(g, id) {
  const t = byId(g.tables, id);
  if (!t || g.over) return;
  if (t.state === 'dirty' && !t.claimed) { if (!g.owned.busser) enqueue(g, 'clean', t.id); } // a hired busser handles cleaning, so it is not in the waiter's queue
  else if (t.guest) tapCustomer(g, t.guest);
}
export function tapFountain(g) {
  if (g.over) return;
  if (g.fountain.cups >= g.fountain.max) return emit(g, { type: 'toast', icon: 'ic-lemon', text: 'Full' });
  if (!g.fountain.claimed) enqueue(g, 'refill', 1);
}
export function tapDish(g, id) { const d = byId(g.pickup, id); if (d && !d.claimed && !g.over) enqueue(g, 'pickup', id); }
