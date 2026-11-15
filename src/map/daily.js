import './daily.css';
import { dailyStatus, claimDaily, DAILY_COINS } from '../state/progress.js';
import { COIN_ICON } from './upgradeIcons.js';
import { sound } from '../game/sound.js';
import { track } from '../game/analytics.js';

// Shows the daily gift when one is waiting. onClaim runs after the coins are added so the map can refresh its coin count.
export function maybeShowDaily(host, onClaim) { if (dailyStatus().available) showDaily(host, onClaim); }

// The calendar. When today's gift is already collected it shows the streak and when to come back.
export function showDaily(host, onClaim) {
  const s = dailyStatus();
  const days = DAILY_COINS.map((c, i) => `<li class="${i + 1 < s.day ? 'got' : i + 1 === s.day ? 'now' : ''}"><small>Day ${i + 1}</small>${COIN_ICON}<b>${c}</b></li>`).join('');
  const o = document.createElement('div');
  o.className = 'daily';
  o.innerHTML = `<div class="daily-card" role="dialog" aria-label="Daily bonus"><button class="mu-x" aria-label="Close">&times;</button>
    <h2>Daily bonus</h2>
    <p>${!s.available ? `Collected today! Day ${s.day} of 7. See you tomorrow.` : s.streak > 0 ? `Day ${s.day} of 7. Nice streak!` : 'Welcome back! Come every day for bigger gifts.'}</p>
    <ul>${days}</ul>
    ${s.available ? `<button class="daily-claim">Claim ${s.coins} coins</button>` : '<button class="daily-claim" disabled>Come back tomorrow</button>'}
  </div>`;
  host.appendChild(o);
  o.querySelector('.mu-x').onclick = () => o.remove();
  const cb = o.querySelector('.daily-claim');
  o.addEventListener('click', (e) => { if (e.target === o) o.remove(); });
  if (!s.available) { cb.onclick = () => o.remove(); return; }
  cb.onclick = () => {
    const got = claimDaily();
    sound.unlock(); sound.play('coin');
    track('daily_bonus', { day: s.day, coins: got });
    o.remove();
    if (onClaim) onClaim(got);
  };
}
