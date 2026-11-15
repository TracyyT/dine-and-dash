import './daily.css';
import { dailyStatus, claimDaily, DAILY_COINS } from '../state/progress.js';
import { COIN_ICON } from './upgradeIcons.js';
import { sound } from '../game/sound.js';
import { track } from '../game/analytics.js';

// Shows the daily gift when one is waiting. onClaim runs after the coins are added so the map can refresh its coin count.
export function maybeShowDaily(host, onClaim) {
  const s = dailyStatus();
  if (!s.available) return;
  const days = DAILY_COINS.map((c, i) => `<li class="${i + 1 < s.day ? 'got' : i + 1 === s.day ? 'now' : ''}"><small>Day ${i + 1}</small>${COIN_ICON}<b>${c}</b></li>`).join('');
  const o = document.createElement('div');
  o.className = 'daily';
  o.innerHTML = `<div class="daily-card" role="dialog" aria-label="Daily bonus">
    <h2>Daily bonus</h2>
    <p>${s.streak > 0 ? `Day ${s.day} of 7. Nice streak!` : 'Welcome back! Come every day for bigger gifts.'}</p>
    <ul>${days}</ul>
    <button class="daily-claim">Claim ${s.coins} coins</button>
  </div>`;
  host.appendChild(o);
  o.querySelector('.daily-claim').onclick = () => {
    const got = claimDaily();
    sound.unlock(); sound.play('coin');
    track('daily_bonus', { day: s.day, coins: got });
    o.remove();
    if (onClaim) onClaim(got);
  };
}
