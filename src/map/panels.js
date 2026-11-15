import { go } from '../router.js';
import { chapters } from '../data/chapters.js';
import { isChapterDone, chapterStars } from '../state/progress.js';
import { sound } from '../game/sound.js';
import { MAP_ICONS } from './icons.js';

// A simple modal that closes on the X, the backdrop or Escape.
function modal(host, title, body) {
  const o = document.createElement('div');
  o.className = 'mu-modal';
  o.innerHTML = `<div class="mu-card" role="dialog" aria-label="${title}"><button class="mu-x" aria-label="Close">&times;</button><h2>${title}</h2>${body}</div>`;
  host.appendChild(o);
  const close = () => { o.remove(); window.removeEventListener('keydown', onKey); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  window.addEventListener('keydown', onKey);
  o.addEventListener('click', (e) => { if (e.target === o) close(); });
  o.querySelector('.mu-x').onclick = close;
  return { el: o, close };
}

// Chapter list: how much of each chapter is done, and a way to jump to any chapter that has opened.
export function openChapters(host, currentId) {
  const open = (i) => chapters.every((c, k) => k >= i || isChapterDone(c));
  const rows = chapters.map((c, i) => {
    const max = c.levels.length * 3, got = chapterStars(c), pct = Math.round((100 * got) / max), ok = open(i), done = isChapterDone(c);
    return `<button class="ch-row${c.id === currentId ? ' cur' : ''}" data-id="${c.id}"${ok ? '' : ' disabled'}>
      <span class="ch-n">${i + 1}</span>
      <span class="ch-main"><b>${c.name}</b><span class="ch-bar"><i style="width:${pct}%"></i></span></span>
      <span class="ch-stat">${ok ? `<span class="ch-star">&#9733;</span> ${got}/${max}` : MAP_ICONS.lock}</span>
      ${done ? `<span class="ch-done">${MAP_ICONS.check}</span>` : ''}
    </button>`;
  }).join('');
  const m = modal(host, 'Chapters', `<div class="ch-list">${rows}</div>`);
  m.el.querySelectorAll('.ch-row:not([disabled])').forEach((b) => { b.onclick = () => { m.close(); if (b.dataset.id !== currentId) go('map', { chapter: b.dataset.id }); }; });
}

// Settings: sound, music, full screen, back to the title screen (and a reset button in dev builds).
export function openSettings(host, { onReset } = {}) {
  const row = (id, label, on) => `<button class="set-row" data-k="${id}" aria-pressed="${on}"><span>${label}</span><i class="tog${on ? ' on' : ''}"></i></button>`;
  const m = modal(host, 'Settings', `<div class="set-list">
    ${row('sfx', 'Sound effects', sound.sfx)}${row('music', 'Music', sound.music)}
    <button class="set-row" data-k="fs"><span>Full screen</span><i class="tog"></i></button>
    <button class="set-row" data-k="title"><span>Title screen</span></button>
    ${import.meta.env.DEV ? '<button class="set-row" data-k="reset"><span>Reset progress (dev)</span></button>' : ''}
  </div>`);
  const flip = (btn, on) => { btn.setAttribute('aria-pressed', on); btn.querySelector('.tog').classList.toggle('on', on); };
  m.el.querySelector('[data-k=sfx]').onclick = (e) => { const b = e.currentTarget; sound.setSfx(!sound.sfx); flip(b, sound.sfx); };
  m.el.querySelector('[data-k=music]').onclick = (e) => { const b = e.currentTarget; sound.setMusic(!sound.music); flip(b, sound.music); };
  m.el.querySelector('[data-k=fs]').onclick = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.());
  m.el.querySelector('[data-k=title]').onclick = () => { m.close(); go('title'); };
  const r = m.el.querySelector('[data-k=reset]'); if (r) r.onclick = () => { m.close(); if (onReset) onReset(); };
}
