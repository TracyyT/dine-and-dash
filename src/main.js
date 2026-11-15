import './style.css';
import { register, go } from './router.js';
import { renderMap } from './screens/map.js';
import { renderGame } from './screens/game.js';
import { renderUpgrades } from './screens/upgrades.js';
import { chapters } from './data/chapters.js';
import { devSetup } from './state/progress.js';

register('map', renderMap);
register('game', renderGame);
register('upgrades', renderUpgrades);

// Testing shortcuts, only in `npm run dev` (stripped from the production build):
//   /?fresh        brand-new player: wipes ALL saved data and lessons, then opens Level 1 so you can test the first-time instructions
//   /?unlock=all   /?unlock=beach:3   /?coins=800   /?reset   (combine with &)   -- ?reset also replays the lessons
let openLevel1 = false;
if (import.meta.env.DEV) {
  const params = new URLSearchParams(location.search);
  if (params.has('fresh')) {
    try { Object.keys(localStorage).filter((k) => k.startsWith('dine-and-dash:')).forEach((k) => localStorage.removeItem(k)); } catch { /* ignore */ }
    devSetup(chapters, new URLSearchParams('reset'));
    openLevel1 = true;
    history.replaceState(null, '', location.pathname); // so a refresh does not wipe again
  } else if (['unlock', 'coins', 'reset'].some((k) => params.has(k))) {
    devSetup(chapters, params);
    if (params.has('reset')) ['guide:v1', 'guide:v2', 'features:v1', 'tutorial:v1'].forEach((k) => { try { localStorage.removeItem('dine-and-dash:' + k); } catch { /* ignore */ } }); // ?reset also replays the lessons
    history.replaceState(null, '', location.pathname); // so a refresh does not redo it
  }
}

if (openLevel1) go('game', { chapter: 'city', level: 1 }); else go('map');
