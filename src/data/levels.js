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
  // Chapter 2: Beach Bistro. Levels 1-2 stay basic, drinks & dessert stalls arrive on level 4.
  'beach:1': { duration: 110, cols: 3, rows: 1, tables: 3, dishes: ['salad', 'fishtaco'],                        arrival: 12, take: 0.1,  patience: 85, orders: [0.65, 0.25, 0.1],  stalls: false,
    objectives: [{ type: 'guests', target: 4 }, { type: 'coins', target: 45 }, { type: 'noAngry' }] },
  'beach:2': { duration: 120, cols: 3, rows: 2, tables: 4, dishes: ['salad', 'fishtaco', 'burger'],              arrival: 11, take: 0.2,  patience: 80, orders: [0.5, 0.3, 0.2],    stalls: false,
    objectives: [{ type: 'dishes', target: 6 }, { type: 'coins', target: 80 }, { type: 'happy', target: 3 }] },
  'beach:3': { duration: 130, cols: 3, rows: 2, tables: 6, dishes: ['fishtaco', 'burger', 'shrimp'],            arrival: 10, take: 0.35, patience: 76, orders: [0.4, 0.35, 0.25], stalls: false,
    objectives: [{ type: 'guests', target: 6 }, { type: 'takeout', target: 3 }, { type: 'noAngry', within: 80 }] },
  'beach:4': { duration: 140, cols: 4, rows: 2, tables: 7, dishes: ['salad', 'burger', 'shrimp', 'fishtaco'],  arrival: 9,  take: 0.25, patience: 72, orders: [0.35, 0.35, 0.3], stalls: true,
    objectives: [{ type: 'items', target: 12 }, { type: 'coins', target: 120 }, { type: 'happy', target: 4 }] },
  'beach:5': { duration: 150, cols: 4, rows: 2, tables: 8, dishes: ['salad', 'burger', 'shrimp', 'lobster'],   arrival: 8,  take: 0.3,  patience: 70, orders: [0.25, 0.4, 0.35], stalls: true,
    objectives: [{ type: 'guests', target: 5 }, { type: 'coins', target: 130 }, { type: 'noAngry', within: 100 }] },
  // Chapter 3: Lantern Garden.
  'chinese:1': { duration: 110, cols: 3, rows: 1, tables: 3, dishes: ['dumpling', 'friedrice'],                  arrival: 12, take: 0.1,  patience: 85, orders: [0.6, 0.3, 0.1],   stalls: false,
    objectives: [{ type: 'guests', target: 4 }, { type: 'coins', target: 50 }, { type: 'noAngry' }] },
  'chinese:2': { duration: 120, cols: 3, rows: 2, tables: 4, dishes: ['dumpling', 'friedrice', 'noodles'],       arrival: 11, take: 0.2,  patience: 80, orders: [0.5, 0.3, 0.2],   stalls: false,
    objectives: [{ type: 'dishes', target: 6 }, { type: 'coins', target: 90 }, { type: 'happy', target: 3 }] },
  'chinese:3': { duration: 130, cols: 3, rows: 2, tables: 6, dishes: ['friedrice', 'noodles', 'duck'],          arrival: 10, take: 0.35, patience: 76, orders: [0.4, 0.35, 0.25], stalls: false,
    objectives: [{ type: 'guests', target: 6 }, { type: 'takeout', target: 3 }, { type: 'noAngry', within: 80 }] },
  'chinese:4': { duration: 140, cols: 4, rows: 2, tables: 7, dishes: ['dumpling', 'noodles', 'duck', 'friedrice'], arrival: 9, take: 0.25, patience: 72, orders: [0.35, 0.35, 0.3], stalls: true,
    objectives: [{ type: 'items', target: 12 }, { type: 'coins', target: 115 }, { type: 'happy', target: 3 }] },
  'chinese:5': { duration: 150, cols: 4, rows: 2, tables: 8, dishes: ['dumpling', 'noodles', 'duck', 'dimsum'],  arrival: 8,  take: 0.3,  patience: 70, orders: [0.25, 0.4, 0.35], stalls: true,
    objectives: [{ type: 'guests', target: 5 }, { type: 'coins', target: 140 }, { type: 'noAngry', within: 100 }] },
  // Chapter 4: Maison d'Or (fine dining). Bigger bills, pickier guests.
  'fine:1': { duration: 110, cols: 3, rows: 1, tables: 3, dishes: ['caviar', 'bisque'],                       arrival: 12, take: 0.05, patience: 85, orders: [0.6, 0.3, 0.1],   stalls: false,
    objectives: [{ type: 'guests', target: 4 }, { type: 'coins', target: 70 }, { type: 'noAngry' }] },
  'fine:2': { duration: 120, cols: 3, rows: 2, tables: 4, dishes: ['caviar', 'bisque', 'truffle'],             arrival: 11, take: 0.1,  patience: 80, orders: [0.5, 0.3, 0.2],   stalls: false,
    objectives: [{ type: 'dishes', target: 6 }, { type: 'coins', target: 130 }, { type: 'happy', target: 3 }] },
  'fine:3': { duration: 130, cols: 3, rows: 2, tables: 6, dishes: ['bisque', 'truffle', 'wagyu'],              arrival: 10, take: 0.3, patience: 76, orders: [0.4, 0.35, 0.25], stalls: false,
    objectives: [{ type: 'guests', target: 6 }, { type: 'takeout', target: 2 }, { type: 'noAngry', within: 80 }] },
  'fine:4': { duration: 140, cols: 4, rows: 2, tables: 7, dishes: ['caviar', 'truffle', 'wagyu', 'bisque'],   arrival: 9,  take: 0.15, patience: 72, orders: [0.35, 0.35, 0.3], stalls: true,
    objectives: [{ type: 'items', target: 12 }, { type: 'coins', target: 190 }, { type: 'happy', target: 3 }] },
  'fine:5': { duration: 150, cols: 4, rows: 2, tables: 8, dishes: ['caviar', 'truffle', 'wagyu', 'souffle'], arrival: 8,  take: 0.2,  patience: 70, orders: [0.25, 0.4, 0.35], stalls: true,
    objectives: [{ type: 'guests', target: 4 }, { type: 'coins', target: 220 }, { type: 'noAngry', within: 100 }] },
  // Chapter 5: Big Sky Steakhouse. Hearty plates, long grill times.
  'steak:1': { duration: 110, cols: 3, rows: 1, tables: 3, dishes: ['fries', 'wings'],                         arrival: 12, take: 0.1,  patience: 85, orders: [0.6, 0.3, 0.1],   stalls: false,
    objectives: [{ type: 'guests', target: 4 }, { type: 'coins', target: 60 }, { type: 'noAngry' }] },
  'steak:2': { duration: 120, cols: 3, rows: 2, tables: 4, dishes: ['fries', 'wings', 'ribs'],                 arrival: 11, take: 0.15, patience: 80, orders: [0.5, 0.3, 0.2],   stalls: false,
    objectives: [{ type: 'dishes', target: 6 }, { type: 'coins', target: 110 }, { type: 'happy', target: 3 }] },
  'steak:3': { duration: 130, cols: 3, rows: 2, tables: 6, dishes: ['wings', 'ribs', 'ribeye'],                arrival: 10, take: 0.3,  patience: 76, orders: [0.4, 0.35, 0.25], stalls: false,
    objectives: [{ type: 'guests', target: 6 }, { type: 'takeout', target: 2 }, { type: 'noAngry', within: 80 }] },
  'steak:4': { duration: 140, cols: 4, rows: 2, tables: 7, dishes: ['fries', 'ribs', 'ribeye', 'wings'],      arrival: 9,  take: 0.2,  patience: 72, orders: [0.35, 0.35, 0.3], stalls: true,
    objectives: [{ type: 'items', target: 12 }, { type: 'coins', target: 160 }, { type: 'happy', target: 3 }] },
  'steak:5': { duration: 150, cols: 4, rows: 2, tables: 8, dishes: ['fries', 'ribs', 'ribeye', 'tomahawk'],   arrival: 8,  take: 0.2,  patience: 70, orders: [0.25, 0.4, 0.35], stalls: true,
    objectives: [{ type: 'guests', target: 4 }, { type: 'coins', target: 190 }, { type: 'noAngry', within: 100 }] },
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
