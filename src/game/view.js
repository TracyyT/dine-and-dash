// Draws the restaurant and keeps it in sync with the engine. Clicks are reported through callbacks.
import { ICONS, use, fountainSVG, customerSVG, waiterSVG, STAFF_LOOK, tableSVG, chairSVG, stoveSVG, chefSVG } from './sprites.js';
import { DISHES } from '../data/dishes.js';
import { moodOf, taskOrder } from './engine.js';
import { OBJ_ICON } from './popups.js';
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
      <div class="objs"></div>
      <div class="hstars" aria-label="Stars"><svg viewBox="0 0 40 40"><use href="#ic-star"/></svg><svg viewBox="0 0 40 40"><use href="#ic-star"/></svg><svg viewBox="0 0 40 40"><use href="#ic-star"/></svg></div>
      <div class="pill timer"><span class="t">0:00</span></div>
      <div class="pill coins">${use('ic-bill', 24)}<span class="c">0</span></div>
      <button class="hud-btn snd" data-act="sfx" aria-label="Sound effects" title="Sound effects">${use('ic-sfx', 22)}</button>
      <button class="hud-btn snd" data-act="music" aria-label="Music" title="Music">${use('ic-music', 22)}</button>
    </div>
    <div class="toast" role="status"></div>`;
  host.appendChild(stage);
  const $ = (s) => stage.querySelector(s);
  const ents = $('.ents'), fx = $('.fx'), toast = $('.toast');

  // static pieces
  const tableEls = g.tables.map((t) => {
    const chair = mk('ent chair' + (info.theme === 'steak' ? ' booth' : ''), chairSVG(info.theme === 'steak')); place(chair, t.x, t.y - 36); chair.style.zIndex = Math.round(t.y - 60);
    const el = mk('ent table', `${tableSVG(t.id, info.theme === 'steak')}<div class="mess"></div><div class="bubble tb">${use('ic-spark', 24)}</div><div class="qn"></div>`);
    el.dataset.t = t.id; place(el, t.x, t.y);
    ents.append(chair, el);
    return { t, el };
  });
  const stationEls = g.stations.map((s) => {
    const el = mk('ent station', `<div class="chef">${chefSVG()}</div>${stoveSVG(info.theme === 'steak')}<div class="cooking-dish"></div><div class="steam"><i></i><i></i><i></i></div><div class="meter"><div></div></div>`);
    place(el, s.x, s.y); ents.append(el); return { s, el };
  });
  L.take.forEach((s) => { const el = mk('take-mat'); el.style.left = s.x - 60 + 'px'; el.style.top = s.y - 14 + 'px'; stage.insertBefore(el, ents); });

  const FP = L.fountain;
  const fountainEl = mk('ent fountain', `${fountainSVG()}<div class="cups">${[0, 1, 2].map(() => `<i>${use('ic-cup', 16)}</i>`).join('')}</div><div class="qn"></div>`);
  fountainEl.dataset.f = 1; place(fountainEl, FP.x, FP.y); ents.append(fountainEl);

  const waiter = mk('ent waiter', `<div class="wbody">${waiterSVG()}</div><div class="carry"></div><div class="meter work"><div></div></div>`);
  ents.append(waiter);
  const guests = new Map(), dishes = new Map(), staffEls = new Map();
  let toastT = 0;

  const showToast = (icon, bad, text = '') => { toast.innerHTML = use(icon, 28) + (bad ? '<b class="x">&#10005;</b>' : '') + (text ? `<span>${text}</span>` : ''); toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('on'), 1600); };
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
    const t = e.target.closest('[data-c],[data-t],[data-d],[data-f],[data-act]');
    if (!t) return;
    if (t.dataset.c) handlers.customer(+t.dataset.c);
    else if (t.dataset.t) handlers.table(+t.dataset.t);
    else if (t.dataset.d) handlers.dish(+t.dataset.d);
    else if (t.dataset.f) handlers.fountain();
    else if (t.dataset.act === 'pause') handlers.pause();
    else if (t.dataset.act === 'sfx') handlers.sfx();
    else if (t.dataset.act === 'music') handlers.music();
  });

  // numbers on whatever the waiter will do next, in order (1 = now / next)
  function queueNumbers() {
    const num = new Map();
    taskOrder(g).forEach((t, i) => {
      const key = (t.type === 'clean' ? 't' : t.type === 'pickup' ? 'd' : t.type === 'refill' ? 'f' : 'c') + t.id;
      if (!num.has(key)) num.set(key, i + 1);
    });
    const mark = (el, key) => {
      const q = el.querySelector('.qn'), n = num.get(key);
      if (!q) return;
      const txt = n ? String(n) : '';
      if (q.textContent !== txt) { q.textContent = txt; q.style.display = txt ? 'block' : 'none'; q.classList.toggle('first', n === 1); }
    };
    return { num, mark };
  }

  function sync() {
    const qn = queueNumbers();
    // customers
    const live = new Set();
    for (const c of g.customers) {
      live.add(c.id);
      let e = guests.get(c.id);
      if (!e) {
        const el = mk('ent guest', `${customerSVG(c.look, info.theme === 'fine')}<div class="bar"><div></div></div><div class="bubble"></div><div class="qn"></div><div class="addons"></div>`);
        el.dataset.c = c.id; ents.appendChild(el); e = { el, sig: '', ad: '', addons: el.querySelector('.addons'), bubble: el.querySelector('.bubble'), fill: el.querySelector('.bar div'), svg: el.querySelector('svg.cust') };
        guests.set(c.id, e);
      }
      place(e.el, c.x, c.y);
      qn.mark(e.el, 'c' + c.id);
      const adSig = c.addons.join(',');
      if (e.ad !== adSig) { e.ad = adSig; e.addons.innerHTML = c.addons.map((k) => `<div class="ad">${use('d-' + k, 18)}</div>`).join(''); }
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
      qn.mark(el, 't' + t.id);
    }
    // lemonade fountain
    [...fountainEl.querySelectorAll('.cups i')].forEach((c, i) => c.classList.toggle('empty', i >= g.fountain.cups));
    fountainEl.classList.toggle('tap', g.fountain.cups < g.fountain.max);
    fountainEl.classList.toggle('dry', g.fountain.cups === 0);
    qn.mark(fountainEl, 'f1');
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
        const el = mk('ent dish tap', `${use('d-' + d.dish, 44)}<span class="tag">${d.label === 'GO' ? use('ic-bag', 16) : 'T' + d.label}</span><div class="qn"></div>`);
        el.dataset.d = d.id; place(el, d.x, d.y); ents.appendChild(el); e = { el }; dishes.set(d.id, e);
      }
      e.el.classList.toggle('late', d.age > 8);
      qn.mark(e.el, 'd' + d.id);
    }
    for (const [id, e] of dishes) if (!seen.has(id)) { e.el.remove(); dishes.delete(id); }
    // hired staff
    for (const m of g.staff) {
      let e = staffEls.get(m.id);
      if (!e) {
        const el = mk('ent waiter staff', `<div class="wbody">${waiterSVG(STAFF_LOOK[m.role])}</div><div class="carry"></div><span class="role">${m.role}</span>`);
        ents.appendChild(el); e = { el, carry: '' }; staffEls.set(m.id, e);
      }
      place(e.el, m.x, m.y);
      e.el.querySelector('.wbody').style.transform = `scaleX(${m.face})`;
      e.el.classList.toggle('walk', !!m.task && m.task.phase === 'walk');
      const cs = m.carry ? 'd-' + m.carry.dish : '';
      if (e.carry !== cs) { e.carry = cs; e.el.querySelector('.carry').innerHTML = cs ? use(cs, 28) : ''; }
    }
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
    $('.timer .t').textContent = `${m}:${String(s === 60 ? 59 : s).padStart(2, '0')}`;
    $('.timer').classList.toggle('low', g.timeLeft < 15);
    $('.c').textContent = g.earned;
    // star objectives: icon + count, a thin bar, and a clock when timed
    const objsEl = $('.objs');
    const elapsed = g.cfg.duration - g.timeLeft;
    if (!objsEl.children.length) objsEl.innerHTML = g.objectives.map((o) => `<div class="obj"><span class="oic">${use(OBJ_ICON[o.type], 30)}</span><div class="mid"><b class="num"></b><div class="bar"><i></i></div></div><span class="st"></span></div>`).join('');
    g.objectives.forEach((o, i) => {
      const el = objsEl.children[i];
      el.className = 'obj ' + (o.status === 'open' ? '' : o.status);
      const frac = o.type === 'noAngry' ? (o.status === 'open' ? (o.within ? elapsed / o.within : elapsed / g.cfg.duration) : o.status === 'done' ? 1 : 0) : Math.min(1, o.value / o.target);
      el.querySelector('i').style.width = frac * 100 + '%';
      const left = o.within && o.status === 'open' ? Math.max(0, Math.ceil(o.within - elapsed)) : 0;
      const num = o.type === 'noAngry' ? '' : `${o.value}/${o.target}`;
      const sig = o.status + '|' + left + '|' + num;
      if (el.dataset.s !== sig) {
        el.dataset.s = sig;
        el.querySelector('.num').textContent = num;
        el.querySelector('.st').innerHTML = o.status === 'done' ? use('ic-check', 20) : o.status === 'failed' ? use('ic-cross', 20) : left ? `<span class="chip">${use('ic-clock', 16)}${left}</span>` : '';
      }
    });
    const hs = stage.querySelector('.hstars'), keep = g.objectives[0].type === 'noAngry' ? 3 : g.lost === 0 ? 3 : g.lost === 1 ? 2 : 1;
    hs.classList.toggle('hide', g.objectives[0].type === 'noAngry'); // that level has no star rule: one angry guest simply ends it
    [...hs.children].forEach((st, i) => st.classList.toggle('off', i >= keep));
    stage.querySelector('[data-act=sfx]').classList.toggle('off', !sound.sfx);
    stage.querySelector('[data-act=music]').classList.toggle('off', !sound.music);
    // events
    for (const ev of g.events.splice(0)) {
      if (ev.type === 'coin') float(`${use('ic-bill', 22)}<b>${ev.text}</b>`, ev.x - 24, ev.y, ev.tip ? 'tip' : '');
      else if (ev.type === 'heart') float(use('ic-heart', 22), ev.x + 12, ev.y + 10, 'heart');
      else if (ev.type === 'angry') float(use('ic-angry', 26), ev.x - 13, ev.y - 90, 'heart');
      else if (ev.type === 'sparkle' || ev.type === 'ding' || ev.type === 'serve' || ev.type === 'clean') float(use('ic-spark', 26), ev.x - 13, ev.y - 40, 'spark');
      else if (ev.type === 'toast') showToast(ev.icon, ev.bad, ev.text);
            else if (ev.type === 'goal') showToast('ic-check', false, 'Goal reached!');
      else if (ev.type === 'boost') float('<b>+25%</b>', ev.x - 22, ev.y + 14, 'tip');
      else if (ev.type === 'lemon') { float(`${use('ic-lemon', 24)}<b>+35%</b>`, ev.x - 34, ev.y + 14, 'tip'); float(use('ic-heart', 20), ev.x + 12, ev.y + 30, 'heart'); }
      else if (ev.type === 'pour') float(use('ic-spark', 26), ev.x - 13, ev.y - 70, 'spark');
      const snd = { coin: ev.tip ? 'tip' : 'coin', ding: 'ding', serve: 'serve', clean: 'clean', angry: 'angry', upgrade: 'upgrade', toast: 'nope', seat: 'seat', order: 'order', arrive: 'arrive', cook: 'sizzle', boost: 'boost', lemon: 'boost', pour: 'serve', goal: 'upgrade' }[ev.type];
      if (snd) sound.play(snd);
    }
  }

  const overlay = (html) => { const o = mk('overlay', html); stage.appendChild(o); return o; };
  return { stage, sync, overlay, destroy: () => stage.remove(), dishName: (id) => DISHES[id].name };
}
