// The direction board at the end of every chapter's path: points on to the next chapter (or says "coming soon" after the last one).
import { el } from './iso.js';

const THEMES = {
  city: { face: '#1a1430', edge: '#c9a24a', text: '#ffe9a8', sub: '#c9a24a', post: '#6a4a34', font: 'Limelight,serif' },
  beach: { face: '#7a4a22', edge: '#4a2f18', text: '#fff4e0', sub: '#ffd9a0', post: '#7a4a22', font: 'Pacifico,cursive' },
  chinese: { face: '#8a1414', edge: '#e8b64a', text: '#ffe39a', sub: '#ffc87a', post: '#5a2a18', font: 'Cinzel Decorative,serif' },
  fine: { face: '#15131c', edge: '#d9b66a', text: '#f6e2a8', sub: '#d9b66a', post: '#8a6a2a', font: 'Playfair Display,serif' },
  steak: { face: '#4a2c1c', edge: '#e0a850', text: '#ffe9c0', sub: '#ffc870', post: '#6a4420', font: 'Rye,serif' },
};

// x,y = where the post stands. dir = 1 (arrow right) or -1 (arrow left). next = the next chapter (or null). open = it can be entered.
export function directionBoard(parent, { x, y, dir = 1, theme = 'city', next = null, open = false }) {
  const c = THEMES[theme] || THEMES.city;
  const g = el('g', { class: 'board', transform: `translate(${x},${y})`, role: next && open ? 'button' : 'img', tabindex: next && open ? 0 : -1, 'aria-label': next ? `${next.name}, next chapter${open ? '' : ', locked'}` : 'More chapters coming soon', style: next && open ? 'cursor:pointer' : '' }, parent);
  const title = next ? next.name : 'COMING SOON';
  const sub = next ? (open ? 'NEXT CHAPTER' : 'LOCKED') : 'MORE TO COME';
  el('ellipse', { cy: 8, rx: 34, ry: 10, fill: '#000', opacity: 0.3 }, g);
  el('rect', { x: -7, y: -150, width: 14, height: 156, rx: 3, fill: c.post, stroke: '#000', 'stroke-opacity': 0.5, 'stroke-width': 2.5 }, g);
  const face = el('g', { opacity: next && !open ? 0.78 : 1 }, g);
  const W = 210, H = 76, tip = 40;
  // arrow-shaped plank; mirrored for dir -1
  const body = el('g', { transform: `translate(0,-118) scale(${dir},1)` }, face);
  el('path', { d: `M${-W + 30} ${-H / 2}H${tip} L${tip + 34} 0 L${tip} ${H / 2}H${-W + 30}Z`, fill: c.face, stroke: c.edge, 'stroke-width': 5, 'stroke-linejoin': 'round' }, body);
  el('path', { d: `M${-W + 40} ${-H / 2 + 8}H${tip - 4}`, stroke: c.edge, 'stroke-width': 1.6, opacity: 0.5 }, body);
  const cx = dir * (-W / 2 + 22), len = title.length;
  const t = el('text', { x: cx, y: -118 + 2, 'text-anchor': 'middle', 'font-family': c.font, 'font-weight': 700, 'font-size': Math.min(25, 400 / Math.max(len, 10)), fill: c.text, stroke: '#00000066', 'stroke-width': 0.8, 'paint-order': 'stroke' }, face); t.textContent = title;
  const s2 = el('text', { x: cx, y: -118 + 24, 'text-anchor': 'middle', 'font-family': 'Josefin Sans,sans-serif', 'font-weight': 700, 'font-size': 12.5, 'letter-spacing': 2.4, fill: c.sub }, face); s2.textContent = sub;
  if (!next || !open) el('g', { transform: `translate(${dir * (-W / 2 + 22)},-160) scale(1.1)` }, g).innerHTML = `<rect x="-8" y="-2" width="16" height="12" rx="2" fill="${c.edge}" stroke="#000" stroke-opacity=".6"/><path d="M-5-2V-8a5 5 0 0 1 10 0V-2" fill="none" stroke="${c.edge}" stroke-width="2.8"/>`;
  return g;
}
