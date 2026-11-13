import './style.css';
import { register, go } from './router.js';
import { renderMap } from './screens/map.js';
import { renderGame } from './screens/game.js';
import { renderUpgrades } from './screens/upgrades.js';

register('map', renderMap);
register('game', renderGame);
register('upgrades', renderUpgrades);
go('map');
