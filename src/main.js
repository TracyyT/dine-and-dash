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

// Testing shortcut, only in `npm run dev` (stripped from the production build):
//   /?unlock=all   /?unlock=beach:3   /?coins=800   /?reset   (combine with &)
if (import.meta.env.DEV) {
  const params = new URLSearchParams(location.search);
  if (['unlock', 'coins', 'reset'].some((k) => params.has(k))) {
    devSetup(chapters, params);
    history.replaceState(null, '', location.pathname); // so a refresh does not redo it
  }
}

go('map');
