// The room itself: back wall with windows, floor, kitchen, counters. Pure decoration, positioned from the layout.
import { HUD_H, WALL_BOTTOM } from './layout.js';

const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

function windowSVG(i) {
  const r = rng(11 + i * 7);
  let bld = '';
  for (let x = 4, k = 0; x < 146; k++) {
    const w = 14 + Math.floor(r() * 14), h = 22 + Math.floor(r() * 44);
    bld += `<rect x="${x}" y="${100 - h}" width="${w}" height="${h}" fill="${k % 2 ? '#1d1634' : '#2a1f48'}"/>`;
    for (let wy = 100 - h + 5; wy < 94; wy += 9) for (let wx = x + 3; wx < x + w - 4; wx += 7) if (r() > 0.45) bld += `<rect x="${wx}" y="${wy}" width="3" height="4" fill="#ffd98a"/>`;
    x += w + 1;
  }
  const stars = Array.from({ length: 7 }, () => `<circle cx="${r() * 150}" cy="${r() * 34}" r="${0.6 + r()}" fill="#fff" opacity=".8"/>`).join('');
  return `<svg viewBox="0 0 150 100" width="150" height="100"><defs><linearGradient id="nsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#25357a"/><stop offset=".62" stop-color="#8a4f9c"/><stop offset="1" stop-color="#ffa77a"/></linearGradient></defs>
    <rect width="150" height="100" fill="url(#nsk)"/>${stars}${bld}
    <path d="M0 0L55 0L0 60Z" fill="#fff" opacity=".07"/><path d="M75 0v100M0 50h150" stroke="#c9a24a" stroke-width="3"/></svg>`;
}
const jukebox = () => `<svg viewBox="0 0 80 120" width="80" height="120"><path d="M8 118V40Q8 6 40 6Q72 6 72 40V118Z" fill="#7d1d33" stroke="#c9a24a" stroke-width="4"/><path d="M18 118V42Q18 16 40 16Q62 16 62 42V118Z" fill="#241830"/><path d="M24 54Q24 26 40 26Q56 26 56 54Z" fill="#ffd98a" opacity=".9"/><rect x="22" y="62" width="36" height="22" rx="4" fill="#3a2a52" stroke="#c9a24a" stroke-width="2"/><circle cx="32" cy="73" r="4" fill="#e0476a"/><circle cx="48" cy="73" r="4" fill="#5fd0c8"/><rect x="26" y="92" width="28" height="6" rx="3" fill="#c9a24a"/></svg>`;
const plant = () => `<svg viewBox="0 0 70 100" width="70" height="100"><ellipse cx="35" cy="95" rx="22" ry="5" fill="#000" opacity=".25"/><path d="M35 62Q8 56 6 24Q30 30 35 62ZM35 62Q62 56 64 24Q40 30 35 62ZM35 60Q22 34 35 6Q48 34 35 60Z" fill="#4f8a5b" stroke="#2f5d3a" stroke-width="1.5"/><path d="M20 66h30l-4 28H24z" fill="#a52e4a" stroke="#f4dd8e" stroke-width="2"/></svg>`;
const fridge = () => `<svg viewBox="0 0 60 150" width="60" height="150"><rect x="3" y="3" width="54" height="144" rx="6" fill="#cfd6d8" stroke="#8d989c" stroke-width="3"/><path d="M3 56h54" stroke="#8d989c" stroke-width="3"/><rect x="10" y="22" width="4" height="22" rx="2" fill="#6c777b"/><rect x="10" y="68" width="4" height="30" rx="2" fill="#6c777b"/></svg>`;
const hood = (w) => `<svg viewBox="0 0 ${w} 70" width="${w}" height="70"><path d="M${w * 0.1} 70L${w * 0.2} 14H${w * 0.8}L${w * 0.9} 70Z" fill="#c8d0d4" stroke="#8d989c" stroke-width="3"/><path d="M${w * 0.22} 30H${w * 0.78}" stroke="#fff" stroke-width="3" opacity=".5"/><rect x="${w * 0.4}" y="0" width="${w * 0.2}" height="16" fill="#8d989c"/></svg>`;
const lamp = () => `<svg viewBox="0 0 60 90" width="60" height="90"><path d="M30 0V44" stroke="#2a2030" stroke-width="3"/><path d="M8 66Q8 40 30 40Q52 40 52 66Z" fill="#c9a24a" stroke="#8f6a22" stroke-width="2.5"/><ellipse cx="30" cy="68" rx="22" ry="6" fill="#ffe6a8"/></svg>`;
const pans = () => `<svg viewBox="0 0 120 70" width="120" height="70"><path d="M0 4H120" stroke="#8d989c" stroke-width="4"/>${[14, 50, 88].map((x, i) => `<path d="M${x + 8} 4V${14 + i * 6}" stroke="#555" stroke-width="2"/><circle cx="${x + 8}" cy="${34 + i * 6}" r="${14 - i * 2}" fill="#2a2630" stroke="#8d989c" stroke-width="2"/>`).join('')}</svg>`;

export function sceneHTML(g, info) {
  const L = g.L, { W, H } = L;
  const kitchenRight = W - 14;
  let h = '';
  const put = (cls, x, y, inner = '', extra = '') => `<div class="${cls}" style="left:${x}px;top:${y}px;${extra}">${inner}</div>`;

  // floor + back wall
  h += `<div class="sc-floor" style="top:${WALL_BOTTOM}px"></div>`;
  h += `<div class="sc-wall" style="top:${HUD_H}px;height:${WALL_BOTTOM - HUD_H}px"><div class="paper"></div><div class="checker"></div><div class="wains"></div></div>`;
  h += `<div class="sc-awning" style="top:${HUD_H}px"></div>`;

  // windows over the dining room
  for (let c = 0; c < L.cols; c++) h += put('sc-window', L.dineX + c * L.cellW + (L.cellW - 150) / 2, 128, windowSVG(c));
  // neon sign + jukebox
  h += put('sc-neon', 22, 130, `<span>${info.sign || 'CAFE'}</span>`, 'width:226px');
  h += put('sc-jukebox', L.dineX + L.cols * L.cellW - 78, WALL_BOTTOM - 98, jukebox());
  h += put('sc-plant', L.dineX - 6, WALL_BOTTOM - 70, plant());
  h += put('sc-plant', L.kx - 56, H - 100, plant());

  // waiting line: carpet, rope, sign
  h += `<div class="sc-carpet" style="left:14px;top:${WALL_BOTTOM + 12}px;width:228px;height:${H - WALL_BOTTOM - 26}px"></div>`;
  h += put('sc-sign', 40, WALL_BOTTOM - 68, 'WAIT LINE <b>→</b>', 'z-index:3');
  for (let y = WALL_BOTTOM + 130, i = 0; y < H - 40; y += 150, i++) {
    h += put('sc-post', 244, y, '<i></i>');
    if (y + 150 < H - 40) h += put('sc-rope', 250, y + 14, '', 'height:140px');
  }
  h += put('sc-door', 130 - 60, H - 52, '<span>ENTRANCE</span>');

  // light pools under each table
  g.tables.forEach((t) => { h += put('sc-pool', t.x - 120, t.y - 70, '', 'width:240px;height:170px'); });
  for (let c = 0; c < L.cols; c++) h += put('sc-lamp', L.dineX + c * L.cellW + L.cellW / 2 - 30, HUD_H, lamp());

  // kitchen
  const kx = L.kx, kw = L.kw;
  h += `<div class="sc-kitchen" style="left:${kx}px;top:${HUD_H}px;width:${kw}px;height:${WALL_BOTTOM + 8 - HUD_H}px"></div>`;
  h += put('sc-hood', kx + 60, 132, hood(kw - 120));
  h += put('sc-pans', kx + 22, 150, pans());
  h += put('sc-fridge', kitchenRight - 66, WALL_BOTTOM - 148, fridge());
  h += `<div class="sc-pillar" style="left:${kx - 16}px;top:${HUD_H}px;height:${430 - HUD_H}px"></div>`;
  h += `<div class="sc-rail" style="left:${kx}px;top:340px;width:${kw}px"></div>`;
  h += `<div class="sc-counter" style="left:${kx}px;top:424px;width:${kw}px"><span>PICKUP</span></div>`;
  h += put('sc-takeplate', kx, H - 82, `<span>TAKE-OUT</span>`, `width:${kw}px;z-index:1`);
  h += `<div class="sc-takefloor" style="left:${kx}px;top:${H - 128}px;width:${kw}px;height:114px"></div>`;
  return h;
}
