// Draws the restaurant and keeps it in sync with the engine. Clicks are reported through callbacks.
import { ICONS, use, customerSVG, waiterSVG, tableSVG, chairSVG, stoveSVG, chefSVG } from './sprites.js';
import { DISHES } from '../data/dishes.js';
import { moodOf, upgradeCost } from './engine.js';
import { sceneHTML } from './scene.js';
import { sound } from './sound.js';

const mk = (cls, html = '') => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; return d; };
const place = (el, x, y) => { el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`; el.style.zIndex = Math.round(y); };

export function createView(host, g, info, handlers) {
  const L = g.L;
  const stage = mk('stage');
  stage.style.width = L.W + 'px'; stage.style.height = L.H + 'px';
  stage.innerHTML = `${ICONS}${sceneHTML(g, info)}
    <div class="tickets" style="left:${L.kx + 14}px;width:${L.kw - 28}px"></div>
    <div class="ents"></div><div class="fx"></div>
    <div class="hud">
      <button class="hud-btn" data-act="pause" aria-label="Pause">II</button>
      <div class="hud-title"><b>Level ${info.level}</b><span>${info.name}</span></div>
      <div class="goal"><div class="goal-fill"></div>
        ${g.cfg.goals.map((v, i) => `<i class="mark" style="left:${(v / g.cfg.goals[2]) * 100}%"><svg width="18" height="18" viewBox="0 0 40 40"><use href="#ic-spark"/></svg><em>${v}</em></i>`).join('')}
      </div>
      <div class="pill timer"><span class="t">0:00</span></div>
      <div class="pill coins">${use('ic-bill', 24)}<span class="c">0</span></div>
      <button class="hud-btn snd" data-act="sfx" aria-label="Sound effects" title="Sound effects">${use('ic-sfx', 22)}</button>
      <button class="hud-btn snd" data-act="music" aria-label="Music" title="Music">${use('ic-music', 22)}</button>
      <button class="hud-btn upg" data-act="upgrade"><span>Faster stoves</span><b class="cost"></b></button>
    </div>
    <div class="toast" role="status"></div>`;
  host.appendChild(stage);
  const $ = (s) => stage.querySelector(s);
  const ents = $('.ents'), fx = $('.fx'), toast = $('.toast');

  // static pieces
  const tableEls = g.tables.map((t) => {
    const chair = mk('ent chair', chairSVG()); place(chair, t.x, t.y - 36); chair.style.zIndex = Math.round(t.y - 60);
    const el = mk('ent table', `${tableSVG(t.id)}<div class="mess"></div><div class="bubble tb">${use('ic-spark', 24)}</div>`);
    el.dataset.t = t.id; place(el, t.x, t.y);
    ents.append(chair, el);
    return { t, el };
  });
  const stationEls = g.stations.map((s) => {
    const el = mk('ent station', `<div class="chef">${chefSVG()}</div>${stoveSVG()}<div class="cooking-dish"></div><div class="steam"><i></i><i></i><i></i></div><div class="meter"><div></div></div>`);
    place(el, s.x, s.y); ents.append(el); return { s, el };
  });
  L.take.forEach((s) => { const el = mk('take-mat'); el.style.left = s.x - 60 + 'px'; el.style.top = s.y - 14 + 'px'; stage.insertBefore(el, ents); });

  const waiter = mk('ent waiter', `<div class="wbody">${waiterSVG()}</div><div class="carry"></div><div class="meter work"><div></div></div>`);
  ents.append(waiter);
  const guests = new Map(), dishes = new Map();
  let toastT = 0;

  const showToast = (text) => { toast.textContent = text; toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('on'), 1600); };
  const float = (html, x, y, cls = '') => { const f = mk('float ' + cls, html); f.style.left = x + 'px'; f.style.top = y + 'px'; fx.appendChild(f); f.addEventListener('animationend', () => f.remove()); };

  function bubbleFor(c) {
    if (c.state === 'queue') return use(c.kind === 'take' ? 'ic-bag' : 'ic-dine', 26);
    if (c.state === 'wantOrder') return use('ic-order', 26);
    if (c.state === 'waitFood') return use('d-' + c.dish, 28);
    if (c.state === 'wantBill') return use('ic-bill', 26);
    if (c.state === 'leaving') return use(c.happy ? 'ic-heart' : 'ic-angry', 26);
    return '';
  }
  const tappable = (c) => ['queue', 'wantOrder', 'wantBill'].includes(c.state);

  stage.addEventListener('click', (e) => {
    const t = e.target.closest('[data-c],[data-t],[data-d],[data-act]');
    if (!t) return;
    if (t.dataset.c) handlers.customer(+t.dataset.c);
    else if (t.dataset.t) handlers.table(+t.dataset.t);
    else if (t.dataset.d) handlers.dish(+t.dataset.d);
    else if (t.dataset.act === 'pause') handlers.pause();
    else if (t.dataset.act === 'upgrade') handlers.upgrade();
    else if (t.dataset.act === 'sfx') handlers.sfx();
    else if (t.dataset.act === 'music') handlers.music();
  });

  function sync() {
    // customers
    const live = new Set();
    for (const c of g.customers) {
      live.add(c.id);
      let e = guests.get(c.id);
      if (!e) {
        const el = mk('ent guest', `${customerSVG(c.look)}<div class="bar"><div></div></div><div class="bubble"></div>`);
        el.dataset.c = c.id; ents.appendChild(el); e = { el, sig: '', bubble: el.querySelector('.bubble'), fill: el.querySelector('.bar div'), svg: el.querySelector('svg.cust') };
        guests.set(c.id, e);
      }
      place(e.el, c.x, c.y);
      const sig = c.state + c.dish + c.kind + c.happy;
      if (sig !== e.sig) { e.sig = sig; e.bubble.innerHTML = bubbleFor(c); e.bubble.style.display = e.bubble.innerHTML ? '' : 'none'; e.el.classList.toggle('tap', tappable(c)); e.el.classList.toggle('walk', c.moving); e.el.classList.toggle('eat', c.state === 'eating'); }
      e.el.classList.toggle('walk', c.moving);
      const mood = moodOf(c.sat);
      e.fill.style.width = Math.max(0, c.sat * 100) + '%';
      e.fill.className = 'm-' + mood;
      e.el.dataset.mood = mood === 'green' ? 'happy' : mood === 'yellow' ? 'ok' : 'sad';
      e.el.querySelector('.bar').style.visibility = c.state === 'leaving' ? 'hidden' : '';
      e.svg.style.transform = `scaleX(${c.face})`;
    }
    for (const [id, e] of guests) if (!live.has(id)) { e.el.remove(); guests.delete(id); }

    // tables
    for (const { t, el } of tableEls) {
      el.classList.toggle('dirty', t.state === 'dirty');
      el.classList.toggle('used', t.state === 'taken');
      el.classList.toggle('tap', t.state === 'dirty');
    }
    // kitchen
    for (const { s, el } of stationEls) {
      el.classList.toggle('busy', !!s.ticket && !s.hold);
      el.classList.toggle('full', !!s.hold);
      el.querySelector('.meter div').style.width = s.ticket ? Math.min(100, (s.progress / s.dur) * 100) + '%' : '0';
      const dish = el.querySelector('.cooking-dish');
      const want = s.ticket ? s.ticket.dish : '';
      if (dish.dataset.d !== want) { dish.dataset.d = want; dish.innerHTML = want ? use('d-' + want, 34) : ''; }
    }
    // order tickets waiting in the kitchen
    const tk = [...g.stations.filter((x) => x.ticket).map((x) => x.ticket), ...g.tickets];
    const tsig = tk.map((t) => t.id).join(',');
    const row = $('.tickets');
    if (row.dataset.s !== tsig) {
      row.dataset.s = tsig;
      row.innerHTML = tk.slice(0, 7).map((t) => `<div class="tk">${use('d-' + t.dish, 26)}<em>${t.label === 'GO' ? 'GO' : 'T' + t.label}</em></div>`).join('');
    }
    // pickup counter
    const seen = new Set();
    for (const d of g.pickup) {
      seen.add(d.id);
      let e = dishes.get(d.id);
      if (!e) {
        const el = mk('ent dish tap', `${use('d-' + d.dish, 44)}<span class="tag">${d.label === 'GO' ? use('ic-bag', 16) : 'T' + d.label}</span>`);
        el.dataset.d = d.id; const p = L.pickup[d.slot]; place(el, p.x, p.y); ents.appendChild(el); e = { el }; dishes.set(d.id, e);
      }
      e.el.classList.toggle('late', d.age > 8);
    }
    for (const [id, e] of dishes) if (!seen.has(id)) { e.el.remove(); dishes.delete(id); }
    // waiter
    const w = g.waiter;
    place(waiter, w.x, w.y);
    waiter.classList.toggle('walk', !!w.task && w.task.phase === 'walk' || (Math.abs(w.x - L.home.x) > 1 || Math.abs(w.y - L.home.y) > 1));
    waiter.querySelector('.wbody').style.transform = `scaleX(${w.face})`;
    const carry = waiter.querySelector('.carry');
    const cs = w.carry ? (w.carry.kind === 'dish' ? 'd-' + w.carry.dish : 'ic-ticket') : '';
    if (carry.dataset.c !== cs) { carry.dataset.c = cs; carry.innerHTML = cs ? use(cs, 30) : ''; }
    const wm = waiter.querySelector('.work');
    wm.style.visibility = w.task && w.task.phase === 'work' ? 'visible' : 'hidden';
    if (w.task && w.task.phase === 'work') wm.firstChild.style.width = Math.min(100, (w.task.t / ({ order: .5, bill: .4, clean: 1.3, pickup: .3, drop: .3, deliver: .4 })[w.task.type]) * 100) + '%';

    // HUD
    const m = Math.floor(g.timeLeft / 60), s = Math.ceil(g.timeLeft % 60);
    $('.t').textContent = `${m}:${String(s === 60 ? 59 : s).padStart(2, '0')}`;
    $('.timer').classList.toggle('low', g.timeLeft < 15);
    $('.c').textContent = g.wallet;
    $('.goal-fill').style.width = Math.min(100, (g.earned / g.cfg.goals[2]) * 100) + '%';
    stage.querySelectorAll('.mark').forEach((mk2, i) => mk2.classList.toggle('got', g.earned >= g.cfg.goals[i]));
    const cost = upgradeCost(g);
    const ub = $('.upg'); ub.disabled = cost === undefined;
    ub.classList.toggle('can', cost !== undefined && g.wallet >= cost);
    $('.cost').textContent = cost === undefined ? 'MAX' : `${cost}`;

    stage.querySelector('[data-act=sfx]').classList.toggle('off', !sound.sfx);
    stage.querySelector('[data-act=music]').classList.toggle('off', !sound.music);
    // events
    for (const ev of g.events.splice(0)) {
      if (ev.type === 'coin') float(`${use('ic-bill', 22)}<b>${ev.text}</b>`, ev.x - 24, ev.y, ev.tip ? 'tip' : '');
      else if (ev.type === 'heart') float(use('ic-heart', 22), ev.x + 12, ev.y + 10, 'heart');
      else if (ev.type === 'angry') float(use('ic-angry', 26), ev.x - 13, ev.y - 90, 'heart');
      else if (ev.type === 'sparkle' || ev.type === 'ding' || ev.type === 'serve' || ev.type === 'clean') float(use('ic-spark', 26), ev.x - 13, ev.y - 40, 'spark');
      else if (ev.type === 'toast') showToast(ev.text);
      else if (ev.type === 'upgrade') showToast('Stoves upgraded — cooking is faster!');
      const snd = { coin: ev.tip ? 'tip' : 'coin', ding: 'ding', serve: 'serve', clean: 'clean', angry: 'angry', upgrade: 'upgrade', toast: 'nope', seat: 'seat', order: 'order', arrive: 'arrive', cook: 'sizzle' }[ev.type];
      if (snd) sound.play(snd);
    }
  }

  const overlay = (html) => { const o = mk('overlay', `<div class="card">${html}</div>`); stage.appendChild(o); return o; };
  return { stage, sync, overlay, destroy: () => stage.remove(), dishName: (id) => DISHES[id].name };
}
