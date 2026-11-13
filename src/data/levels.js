// Tuning for each level. Key = "chapter:level".
// cols/rows = size of the dining room grid (tables <= cols x rows). arrival = seconds between guests,
// take = share of take-out guests, patience = seconds a guest lasts at full mood,
// orders = chances a dine-in guest orders 1, 2 or 3 times. stalls = drinks & dessert stalls open (widens the room).
// objectives = the three star goals. Each star is earned separately:
//   type: coins | guests | dishes | items | happy | takeout | noAngry
//   target: how many; within: seconds from the start of the level (omit = any time before the level ends)
//   noAngry: nobody storms out (during the first `within` seconds, or the whole level).
export const LEVELS = {
  'city:1': { duration: 100, cols: 3, rows: 1, tables: 3, dishes: ['croissant', 'sandwich'],                      arrival: 13, take: 0.1,  patience: 90, orders: [0.7, 0.25, 0.05], stalls: false,
    objectives: [{ type: 'guests', target: 3 }, { type: 'coins', target: 30 }, { type: 'noAngry' }] },
  'city:2': { duration: 110, cols: 3, rows: 2, tables: 4, dishes: ['croissant', 'sandwich', 'cheesecake'],        arrival: 12, take: 0.15, patience: 85, orders: [0.55, 0.3, 0.15], stalls: false,
    objectives: [{ type: 'dishes', target: 5 }, { type: 'coins', target: 60 }, { type: 'happy', target: 3 }] },
  'city:3': { duration: 120, cols: 3, rows: 2, tables: 6, dishes: ['sandwich', 'pasta', 'cheesecake'],            arrival: 11, take: 0.35, patience: 80, orders: [0.45, 0.35, 0.2], stalls: false,
    objectives: [{ type: 'guests', target: 5 }, { type: 'takeout', target: 2 }, { type: 'noAngry', within: 80 }] },
  'city:4': { duration: 130, cols: 4, rows: 2, tables: 7, dishes: ['sandwich', 'pasta', 'steak', 'cheesecake'],   arrival: 10, take: 0.25, patience: 76, orders: [0.4, 0.35, 0.25], stalls: true,
    objectives: [{ type: 'items', target: 10 }, { type: 'coins', target: 100 }, { type: 'happy', target: 3 }] },
  'city:5': { duration: 140, cols: 4, rows: 2, tables: 8, dishes: ['croissant', 'pasta', 'steak', 'cheesecake'],  arrival: 9,  take: 0.3,  patience: 72, orders: [0.3, 0.4, 0.3],   stalls: true,
    objectives: [{ type: 'guests', target: 5 }, { type: 'coins', target: 100 }, { type: 'noAngry', within: 90 }] },
};
export const levelConfig = (chapterId, n) => LEVELS[`${chapterId}:${n}`] || LEVELS['city:1'];

// One-line wording for an objective, used on the intro, HUD and results screens.
export function objectiveText(o) {
  const t = o.within ? ` in ${o.within}s` : '';
  switch (o.type) {
    case 'coins': return `Earn ${o.target} coins${t}`;
    case 'guests': return `Serve ${o.target} guests${t}`;
    case 'dishes': return `Deliver ${o.target} items${t}`;
    case 'items': return `Make ${o.target} items${t}`;
    case 'happy': return `${o.target} guests leave happy${t}`;
    case 'takeout': return `Serve ${o.target} take-out orders${t}`;
    case 'noAngry': return o.within ? `No guest storms out in the first ${o.within}s` : 'No guest storms out';
    default: return '';
  }
}

// Short label without the time limit (that is shown separately as a clock chip).
export function objectiveLabel(o) {
  switch (o.type) {
    case 'coins': return `Earn ${o.target} coins`;
    case 'guests': return `Serve ${o.target} guests`;
    case 'dishes': return `Deliver ${o.target} items`;
    case 'items': return `Make ${o.target} items`;
    case 'happy': return `${o.target} happy guests`;
    case 'takeout': return `${o.target} take-out orders`;
    case 'noAngry': return 'No angry guests';
    default: return '';
  }
}
