import '../title/title.css';
import { go } from '../router.js';
import { sound } from '../game/sound.js';

const star = (x, y, r, cls) => `<path class="spark ${cls}" d="M${x} ${y - r}Q${x + r * .18} ${y - r * .18} ${x + r} ${y}Q${x + r * .18} ${y + r * .18} ${x} ${y + r}Q${x - r * .18} ${y + r * .18} ${x - r} ${y}Q${x - r * .18} ${y - r * .18} ${x} ${y - r}Z" fill="#fffbe6"/>`;

// The logo: chef hat, burger and noodle bowl behind a wooden sign, with a crossed spoon and spatula. All SVG, so it stays crisp at any size.
const LOGO = `<svg class="logo" viewBox="0 0 600 640" aria-label="Dine and Dash">
  <defs>
    <radialGradient id="tl-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd98a" stop-opacity=".75"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>
    <linearGradient id="tl-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6c06f"/><stop offset=".55" stop-color="#e29a47"/><stop offset="1" stop-color="#c47530"/></linearGradient>
    <linearGradient id="tl-bun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc760"/><stop offset="1" stop-color="#e08a2c"/></linearGradient>
    <linearGradient id="tl-bowl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8493b"/><stop offset="1" stop-color="#a62320"/></linearGradient>
    <linearGradient id="tl-hat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ece6ee"/></linearGradient>
    <g id="tl-hatg">
      <circle cx="300" cy="130" r="78" fill="url(#tl-hat)"/><circle cx="214" cy="172" r="64" fill="url(#tl-hat)"/><circle cx="386" cy="172" r="64" fill="url(#tl-hat)"/>
      <circle cx="262" cy="214" r="54" fill="url(#tl-hat)"/><circle cx="338" cy="214" r="54" fill="url(#tl-hat)"/><circle cx="300" cy="190" r="60" fill="url(#tl-hat)"/>
      <path d="M258 196c-8-26-6-50 4-70M300 190c0-26 0-52 0-76M342 196c8-26 6-50-4-70" fill="none" stroke="#e4dbe6" stroke-width="4" stroke-linecap="round"/>
      <path d="M170 196c-6-18-2-34 10-46M430 196c6-18 2-34-10-46" fill="none" stroke="#e8e0ea" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="222" y="208" width="156" height="100" rx="20" fill="#fffdfa" stroke="#e6dcd8" stroke-width="3.5"/>
      <rect x="236" y="214" width="128" height="14" rx="7" fill="#fff" opacity=".9"/>
      <path d="M230 292h140" stroke="#e1d6da" stroke-width="10" stroke-linecap="round" opacity=".7"/>
      <ellipse cx="258" cy="98" rx="28" ry="14" fill="#fff" opacity=".95" transform="rotate(-24 258 98)"/>
    </g>
  </defs>
  <ellipse cx="300" cy="250" rx="300" ry="230" fill="url(#tl-glow)"/>

  <g transform="translate(30 210) rotate(-9 90 80)">
    <path d="M14 106h150q0 24-22 24H36q-22 0-22-24z" fill="#e8963a" stroke="#a85a1c" stroke-width="3"/>
    <rect x="0" y="78" width="178" height="30" rx="15" fill="#6e301b" stroke="#4a1d10" stroke-width="3"/>
    <path d="M8 72H170L158 96L138 80L118 98L98 80L78 98L58 80L38 96Z" fill="#ffc933" stroke="#d99a0e" stroke-width="2"/>
    <path d="M0 74V66q11-14 22 0t22 0 22 0 22 0 22 0 22 0 22 0 22 0V74Z" fill="#7cc243" stroke="#4d8f26" stroke-width="2"/>
    <path d="M6 60Q6 6 89 6Q172 6 172 60Z" fill="url(#tl-bun)" stroke="#a85a1c" stroke-width="3"/>
    <g fill="#fff3d0"><ellipse cx="50" cy="30" rx="6" ry="3.4" transform="rotate(-25 50 30)"/><ellipse cx="86" cy="22" rx="6" ry="3.4"/><ellipse cx="122" cy="30" rx="6" ry="3.4" transform="rotate(25 122 30)"/><ellipse cx="68" cy="46" rx="6" ry="3.4" transform="rotate(-12 68 46)"/><ellipse cx="108" cy="46" rx="6" ry="3.4" transform="rotate(12 108 46)"/><ellipse cx="144" cy="48" rx="6" ry="3.4" transform="rotate(30 144 48)"/><ellipse cx="32" cy="50" rx="6" ry="3.4" transform="rotate(-30 32 50)"/></g>
  </g>

  <g transform="translate(396 204)">
    <g class="steam" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="7" opacity=".6"><path d="M104 6q-14-18 0-34t0-36"/><path d="M136 10q-12-16 0-30t0-30" class="s2"/></g>
    <path d="M0 44H176C176 108 134 138 88 138C42 138 0 108 0 44Z" fill="url(#tl-bowl)" stroke="#7a1a14" stroke-width="4"/>
    <path d="M18 100Q88 124 158 100" fill="none" stroke="#ff8a78" stroke-width="5" stroke-linecap="round" opacity=".5"/>
    <ellipse cx="88" cy="44" rx="88" ry="17" fill="#8a2a1c"/>
    <ellipse cx="88" cy="46" rx="80" ry="12" fill="#e9a248"/>
    <g fill="none" stroke="#f8dc92" stroke-width="7" stroke-linecap="round"><path d="M22 44q16-16 32 0t32 0 32 0 26-4"/><path d="M30 52q16-12 30 0t30 0 28-2"/></g>
    <rect x="44" y="20" width="30" height="14" rx="4" fill="#2f5a3a" transform="rotate(-10 59 27)"/>
    <ellipse cx="124" cy="32" rx="26" ry="18" fill="#fff6e4" stroke="#e2cfa6" stroke-width="2"/><circle cx="126" cy="33" r="10" fill="#ffc233"/>
    <path d="M40 38Q74 -6 124 24" fill="none" stroke="#f08a4b" stroke-width="16" stroke-linecap="round"/>
    <path d="M52 22l8 10M72 12l6 12M94 12l2 12" stroke="#ffd0a0" stroke-width="3" stroke-linecap="round"/>
    <path d="M126 22l22-12M126 26l26-2M124 30l22 8" stroke="#f08a4b" stroke-width="8" stroke-linecap="round"/>
  </g>

  <use href="#tl-hatg"/>
  ${star(196, 84, 22, '')}${star(238, 50, 12, 'b')}${star(170, 126, 9, 'c')}

  <path d="M16 376C16 338 40 318 82 314L204 298C238 292 268 302 300 298C332 302 362 292 396 298L518 314C560 318 584 338 584 376L584 412C584 452 560 470 520 472L80 472C40 470 16 452 16 412Z" fill="url(#tl-wood)" stroke="#7a3a14" stroke-width="9" stroke-linejoin="round"/>
  <path d="M16 376C16 338 40 318 82 314L204 298C238 292 268 302 300 298C332 302 362 292 396 298L518 314C560 318 584 338 584 376L584 412C584 452 560 470 520 472L80 472C40 470 16 452 16 412Z" fill="none" stroke="#ffd69a" stroke-width="3" opacity=".75" transform="translate(300 386) scale(.95 .88) translate(-300 -386)"/>
  <g fill="none" stroke="#fff0c8" stroke-width="2.5" stroke-linecap="round" opacity=".4"><path d="M50 440q60-8 120 0"/><path d="M430 340q60-8 120 0"/><path d="M60 350q40-6 80 0"/><path d="M440 446q50-6 100 0"/></g>


  <g transform="translate(43 0) skewX(-6)" font-family="'Lilita One','Baloo 2',system-ui,sans-serif" stroke-linejoin="round">
    <g fill="#5a1410" stroke="#5a1410" stroke-width="16" transform="translate(0 7)">
      <text x="40" y="424" font-size="124" textLength="212" lengthAdjust="spacingAndGlyphs">Dine</text>
      <text x="318" y="424" font-size="124" textLength="232" lengthAdjust="spacingAndGlyphs">Dash</text>
      <text x="262" y="414" font-size="88" textLength="62" lengthAdjust="spacingAndGlyphs">&amp;</text>
    </g>
    <g fill="#fff3d9" stroke="#8a2a1c" stroke-width="12" paint-order="stroke">
      <text x="40" y="424" font-size="124" textLength="212" lengthAdjust="spacingAndGlyphs">Dine</text>
      <text x="318" y="424" font-size="124" textLength="232" lengthAdjust="spacingAndGlyphs">Dash</text>
    </g>
    <text x="262" y="414" font-size="88" textLength="62" lengthAdjust="spacingAndGlyphs" fill="#ffb81c" stroke="#8a2a1c" stroke-width="10" paint-order="stroke">&amp;</text>
  </g>

  <g transform="translate(300 556) scale(1.12)">
    <g transform="rotate(40)"><rect x="-7" y="-4" width="14" height="86" rx="7" fill="#f7cd62" stroke="#b98424" stroke-width="4"/><ellipse cx="0" cy="-34" rx="27" ry="34" fill="#ffd96e" stroke="#b98424" stroke-width="4"/><ellipse cx="-8" cy="-44" rx="8" ry="14" fill="#fff0b0" opacity=".8"/></g>
    <g transform="rotate(-40)"><rect x="-6" y="-4" width="12" height="86" rx="6" fill="#f3f1f3" stroke="#b9b2bb" stroke-width="4"/><rect x="-24" y="-82" width="48" height="76" rx="9" fill="#fafafa" stroke="#b9b2bb" stroke-width="4"/><g fill="#b3a9b6"><rect x="-14" y="-72" width="6" height="32" rx="3"/><rect x="-3" y="-72" width="6" height="32" rx="3"/><rect x="8" y="-72" width="6" height="32" rx="3"/></g></g>
  </g>
</svg>`;

export function renderTitle(app) {
  document.body.classList.add('title-open');
  app.innerHTML = `<main class="title">
    <div class="t-windows"></div><div class="t-shade"></div>
    <div class="t-awning"></div>
    <div class="t-cloth"></div>
    <div class="t-rim"></div>
    <div class="t-stage">
      ${LOGO}
      <button class="title-play" id="tplay">Play</button>
    </div>
  </main>`;
  const start = () => { sound.unlock(); sound.play('click'); go('map'); };
  app.querySelector('#tplay').onclick = start;
  const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); start(); } };
  window.addEventListener('keydown', onKey);
  return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('title-open'); };
}
