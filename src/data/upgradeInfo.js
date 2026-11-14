// What each upgrade does, in a few words, for the little (i) popup on the Upgrade page. `each` says what one level adds.
import { snackFor } from '../game/snacks.js';

export const upgradeInfo = (id, chapterId) => {
  const sn = snackFor(chapterId);
  return ({
    chefs: { text: 'A new chef and stove: more dishes cook at the same time.', each: '+1 chef' },
    kitchen: { text: 'Every dish cooks faster.', each: '+25% cooking speed' },
    ingredients: { text: 'Every dish and drink earns more coins.', each: '+15% coins per dish' },
    shoes: { text: 'You walk to every job faster.', each: '+25% walking speed' },
    seats: { text: 'Guests stay happy for longer while they wait.', each: '-20% patience loss' },
    lemonade: { text: `Tap the ${sn.name} station to refill its tray and cheer up waiting guests (+35% mood). Each level upgrades the machine and puts more on the tray.`, each: '+1 item per refill (up to 3)' },
    cleaning: { text: 'Dirty tables are ready again sooner.', each: '-30% cleaning time' },
    tips: { text: 'Happy guests leave bigger tips.', each: '+30% tips' },
    host: { text: `Seats waiting guests and keeps the ${sn.name} filled, so you don't have to.`, each: '+1 host' },
    busser: { text: 'Cleans the dirty tables for you.', each: '+1 busser' },
    runner: { text: 'Picks up finished dishes and serves them to the guests.', each: '+1 runner' },
    training: { text: 'All your hired staff walk and work faster.', each: '+25% work, +20% walking speed' },
  })[id] || { text: '', each: '' };
};
