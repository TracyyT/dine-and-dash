import '../title/title.css';
import { go } from '../router.js';
import { sound } from '../game/sound.js';

// The storefront, drawn in SVG so it stays sharp at any size.
const FRONT = `<svg class="front" viewBox="0 0 360 300" aria-hidden="true">
  <defs>
    <linearGradient id="tsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1a4a"/><stop offset="1" stop-color="#c0517a"/></linearGradient>
  </defs>
  <rect width="360" height="300" rx="26" fill="url(#tsky)"/>
  <g fill="#1d1236"><rect x="10" y="120" width="50" height="180"/><rect x="66" y="90" width="40" height="210"/><rect x="262" y="100" width="46" height="200"/><rect x="312" y="140" width="40" height="160"/></g>
  <g fill="#ffd978" opacity=".8"><rect x="18" y="134" width="8" height="8"/><rect x="34" y="150" width="8" height="8"/><rect x="74" y="108" width="8" height="8"/><rect x="88" y="130" width="8" height="8"/><rect x="272" y="118" width="8" height="8"/><rect x="288" y="146" width="8" height="8"/><rect x="322" y="158" width="8" height="8"/></g>
  <g fill="#fff"><circle class="tw" cx="40" cy="40" r="2"/><circle class="tw d2" cx="300" cy="50" r="2"/><circle class="tw d3" cx="200" cy="26" r="1.6"/><circle class="tw d2" cx="120" cy="56" r="1.6"/></g>
  <rect x="70" y="120" width="220" height="150" rx="6" fill="#7d1d33"/>
  <rect x="70" y="262" width="220" height="14" fill="#4a0f1d"/>
  <path d="M60 120h240l-12-40H72z" fill="#f4ead2"/>
  <g fill="#c62839"><path d="M72 80h30l-4 40H66z"/><path d="M132 80h30l-2 40h-30z"/><path d="M192 80h30l2 40h-30z"/><path d="M252 80h30l8 40h-34z"/></g>
  <rect x="96" y="48" width="168" height="40" rx="14" fill="#1c1620" stroke="#ff7aa8" stroke-width="3"/>
  <text x="180" y="76" text-anchor="middle" font-size="24" textLength="150" lengthAdjust="spacingAndGlyphs" fill="#ffb3cc" style="font-family:var(--title-font)" class="sign-text">DINE &amp; DASH</text>
  <rect x="86" y="146" width="62" height="64" rx="6" fill="#ffd978" stroke="#e8b64a" stroke-width="4"/>
  <path d="M117 146v64M86 178h62" stroke="#e8b64a" stroke-width="3"/>
  <rect x="212" y="146" width="62" height="64" rx="6" fill="#ffd978" stroke="#e8b64a" stroke-width="4"/>
  <path d="M243 146v64M212 178h62" stroke="#e8b64a" stroke-width="3"/>
  <rect x="154" y="156" width="52" height="114" rx="26 26 0 0" fill="#2b1810" stroke="#e8b64a" stroke-width="4"/>
  <circle cx="196" cy="216" r="3" fill="#e8b64a"/>
  <g class="open"><rect x="161" y="176" width="38" height="18" rx="5" fill="#1c1620" stroke="#7ee0a0" stroke-width="2"/><text x="180" y="189" text-anchor="middle" font-size="11" fill="#7ee0a0" style="font-family:var(--title-body);font-weight:700;letter-spacing:1px">OPEN</text></g>
  <g class="plant"><rect x="40" y="244" width="22" height="26" rx="4" fill="#c62839"/><path d="M51 244c-14-14-10-30 0-34 10 4 14 20 0 34z" fill="#4aa86a"/><path d="M51 244c-20-4-24-16-20-24 10 0 22 8 20 24z" fill="#3a8f58"/></g>
  <rect x="0" y="270" width="360" height="30" rx="0" fill="#2a1a22"/>
  <g class="guests">
    <g transform="translate(26 232)"><circle cx="0" cy="0" r="12" fill="#f4c9a0"/><rect x="-11" y="10" width="22" height="26" rx="8" fill="#f2a43a"/><circle cx="-4" cy="-2" r="1.6" fill="#3a1d1d"/><circle cx="4" cy="-2" r="1.6" fill="#3a1d1d"/></g>
    <g transform="translate(318 236)"><circle cx="0" cy="0" r="12" fill="#c98f66"/><rect x="-11" y="10" width="22" height="26" rx="8" fill="#5aa0d6"/><circle cx="-4" cy="-2" r="1.6" fill="#3a1d1d"/><circle cx="4" cy="-2" r="1.6" fill="#3a1d1d"/></g>
  </g>
</svg>`;

export function renderTitle(app) {
  document.body.classList.add('title-open');
  app.innerHTML = `<main class="title">
    <div class="title-glow"></div>
    ${FRONT}
    <h1 class="title-name">Dine <span>&amp;</span> Dash</h1>
    <p class="title-tag">Seat them, serve them, send them home happy.</p>
    <button class="title-play" id="tplay">Play</button>
    <p class="title-hint">Tap Play to start</p>
  </main>`;
  const start = () => { sound.unlock(); sound.play('click'); go('map'); };
  app.querySelector('#tplay').onclick = start;
  const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); start(); } };
  window.addEventListener('keydown', onKey);
  return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('title-open'); };
}
