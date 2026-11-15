// Tuning for each level. Key = "chapter:level". 10 levels per chapter, each harder than the last.
// duration = seconds on the clock (45-90). cols/rows = size of the dining room grid (tables <= cols x rows). arrival = seconds between guests,
// take = share of take-out guests, patience = seconds a guest lasts at full mood,
// orders = chances a dine-in guest orders 1, 2 or 3 times. stalls = drinks & dessert stalls open (widens the room).
// objective = the ONE requirement. Reach it before the clock runs out and the level is passed; otherwise it is failed (and costs a life).
//   type: coins | guests | dishes (meals delivered) | items (meals cooked) | noAngry (nobody storms out until time is up) | cleanServe (serve `target` guests and not one of them storms out)
//   target: how many (noAngry has none)
// Stars are separate and only count guests who left angry: 0 = 3 stars, 1 = 2 stars, 2 or more = 1 star.
// Levels 1-2 are easy, 3-5 build up, 6-8 are tuned so they need upgrades or hired staff. 9 asks for a flawless run (cleanServe); 10 asks for double the coins of level 8.
export const LEVELS = {
  // City Supper Club
  'city:1': { duration: 70, cols: 3, rows: 1, tables: 3, dishes: ['croissant', 'cheesecake'], arrival: 8, take: .10, patience: 95, orders: [.8,.2,0], stalls: false,
    objective: { type: 'guests', target: 3 } },
  'city:2': { duration: 65, cols: 3, rows: 2, tables: 4, dishes: ['croissant', 'cheesecake', 'sandwich'], arrival: 8.5, take: .15, patience: 90, orders: [.6,.3,.1], stalls: false,
    objective: { type: 'coins', target: 36 } },
  'city:3': { duration: 70, cols: 3, rows: 2, tables: 5, dishes: ['croissant', 'sandwich', 'pasta'], arrival: 8, take: .25, patience: 82, orders: [.5,.3,.2], stalls: false,
    objective: { type: 'dishes', target: 5 } },
  'city:4': { duration: 80, cols: 4, rows: 2, tables: 6, dishes: ['cheesecake', 'sandwich', 'pasta'], arrival: 7.5, take: .25, patience: 78, orders: [.4,.35,.25], stalls: true,
    objective: { type: 'items', target: 9 } },
  'city:5': { duration: 85, cols: 4, rows: 2, tables: 7, dishes: ['cheesecake', 'sandwich', 'pasta', 'steak'], arrival: 7.4, take: .25, patience: 55, orders: [.35,.35,.3], stalls: true,
    objective: { type: 'noAngry' } },
  'city:6': { duration: 100, cols: 4, rows: 2, tables: 8, dishes: ['sandwich', 'pasta', 'steak'], arrival: 5.5, take: .25, patience: 60, orders: [.3,.4,.3], stalls: true,
    objective: { type: 'dishes', target: 19 } },
  'city:7': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['sandwich', 'pasta', 'steak'], arrival: 4.8, take: .25, patience: 57, orders: [.25,.4,.35], stalls: true,
    objective: { type: 'items', target: 25 } },
  'city:8': { duration: 120, cols: 4, rows: 2, tables: 8, dishes: ['pasta', 'steak', 'sandwich'], arrival: 4.2, take: .25, patience: 55, orders: [.2,.4,.4], stalls: true,
    objective: { type: 'coins', target: 275 } },
  'city:9': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['cheesecake', 'sandwich', 'pasta', 'steak'], arrival: 6.5, take: .25, patience: 70, orders: [.5,.35,.15], stalls: true,
    objective: { type: 'cleanServe', target: 10 } },
  'city:10': { duration: 165, cols: 4, rows: 2, tables: 8, dishes: ['pasta', 'steak', 'sandwich'], arrival: 3.8, take: .25, patience: 52, orders: [.15,.4,.45], stalls: true,
    objective: { type: 'coins', target: 550 } },
  // Beach Bistro
  'beach:1': { duration: 60, cols: 3, rows: 1, tables: 3, dishes: ['salad', 'fishtaco'], arrival: 9, take: .10, patience: 95, orders: [.8,.2,0], stalls: false,
    objective: { type: 'guests', target: 3 } },
  'beach:2': { duration: 65, cols: 3, rows: 2, tables: 4, dishes: ['salad', 'fishtaco', 'burger'], arrival: 8.5, take: .15, patience: 90, orders: [.6,.3,.1], stalls: false,
    objective: { type: 'coins', target: 27 } },
  'beach:3': { duration: 70, cols: 3, rows: 2, tables: 5, dishes: ['salad', 'burger', 'shrimp'], arrival: 8, take: .25, patience: 82, orders: [.5,.3,.2], stalls: false,
    objective: { type: 'dishes', target: 5 } },
  'beach:4': { duration: 80, cols: 4, rows: 2, tables: 6, dishes: ['fishtaco', 'burger', 'shrimp'], arrival: 7.5, take: .25, patience: 78, orders: [.4,.35,.25], stalls: true,
    objective: { type: 'items', target: 9 } },
  'beach:5': { duration: 85, cols: 4, rows: 2, tables: 7, dishes: ['fishtaco', 'burger', 'shrimp', 'lobster'], arrival: 7.4, take: .25, patience: 55, orders: [.35,.35,.3], stalls: true,
    objective: { type: 'noAngry' } },
  'beach:6': { duration: 100, cols: 4, rows: 2, tables: 8, dishes: ['burger', 'shrimp', 'lobster'], arrival: 5.5, take: .25, patience: 60, orders: [.3,.4,.3], stalls: true,
    objective: { type: 'dishes', target: 18 } },
  'beach:7': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['burger', 'shrimp', 'lobster'], arrival: 4.8, take: .25, patience: 57, orders: [.25,.4,.35], stalls: true,
    objective: { type: 'items', target: 25 } },
  'beach:8': { duration: 120, cols: 4, rows: 2, tables: 8, dishes: ['shrimp', 'lobster', 'burger'], arrival: 4.2, take: .25, patience: 55, orders: [.2,.4,.4], stalls: true,
    objective: { type: 'coins', target: 305 } },
  'beach:9': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['fishtaco', 'burger', 'shrimp', 'lobster'], arrival: 6.5, take: .25, patience: 70, orders: [.5,.35,.15], stalls: true,
    objective: { type: 'cleanServe', target: 10 } },
  'beach:10': { duration: 165, cols: 4, rows: 2, tables: 8, dishes: ['shrimp', 'lobster', 'burger'], arrival: 3.8, take: .25, patience: 52, orders: [.15,.4,.45], stalls: true,
    objective: { type: 'coins', target: 610 } },
  // Lantern Garden
  'chinese:1': { duration: 60, cols: 3, rows: 1, tables: 3, dishes: ['dumpling', 'friedrice'], arrival: 9, take: .10, patience: 95, orders: [.8,.2,0], stalls: false,
    objective: { type: 'guests', target: 3 } },
  'chinese:2': { duration: 65, cols: 3, rows: 2, tables: 4, dishes: ['dumpling', 'friedrice', 'noodles'], arrival: 8.5, take: .15, patience: 90, orders: [.6,.3,.1], stalls: false,
    objective: { type: 'coins', target: 33 } },
  'chinese:3': { duration: 70, cols: 3, rows: 2, tables: 5, dishes: ['dumpling', 'noodles', 'duck'], arrival: 8, take: .25, patience: 82, orders: [.5,.3,.2], stalls: false,
    objective: { type: 'dishes', target: 4 } },
  'chinese:4': { duration: 80, cols: 4, rows: 2, tables: 6, dishes: ['friedrice', 'noodles', 'duck'], arrival: 7.5, take: .25, patience: 78, orders: [.4,.35,.25], stalls: true,
    objective: { type: 'items', target: 9 } },
  'chinese:5': { duration: 85, cols: 4, rows: 2, tables: 7, dishes: ['friedrice', 'noodles', 'duck', 'dimsum'], arrival: 7.4, take: .25, patience: 55, orders: [.35,.35,.3], stalls: true,
    objective: { type: 'noAngry' } },
  'chinese:6': { duration: 100, cols: 4, rows: 2, tables: 8, dishes: ['noodles', 'duck', 'dimsum'], arrival: 5.5, take: .25, patience: 60, orders: [.3,.4,.3], stalls: true,
    objective: { type: 'dishes', target: 17 } },
  'chinese:7': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['noodles', 'duck', 'dimsum'], arrival: 4.8, take: .25, patience: 57, orders: [.25,.4,.35], stalls: true,
    objective: { type: 'items', target: 26 } },
  'chinese:8': { duration: 120, cols: 4, rows: 2, tables: 8, dishes: ['duck', 'dimsum', 'noodles'], arrival: 4.2, take: .25, patience: 55, orders: [.2,.4,.4], stalls: true,
    objective: { type: 'coins', target: 305 } },
  'chinese:9': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['friedrice', 'noodles', 'duck', 'dimsum'], arrival: 6.5, take: .25, patience: 70, orders: [.5,.35,.15], stalls: true,
    objective: { type: 'cleanServe', target: 10 } },
  'chinese:10': { duration: 165, cols: 4, rows: 2, tables: 8, dishes: ['duck', 'dimsum', 'noodles'], arrival: 3.8, take: .25, patience: 52, orders: [.15,.4,.45], stalls: true,
    objective: { type: 'coins', target: 610 } },
  // Maison d'Or
  'fine:1': { duration: 60, cols: 3, rows: 1, tables: 3, dishes: ['caviar', 'bisque'], arrival: 9, take: .10, patience: 95, orders: [.8,.2,0], stalls: false,
    objective: { type: 'guests', target: 3 } },
  'fine:2': { duration: 65, cols: 3, rows: 2, tables: 4, dishes: ['caviar', 'bisque', 'truffle'], arrival: 8.5, take: .15, patience: 90, orders: [.6,.3,.1], stalls: false,
    objective: { type: 'coins', target: 41 } },
  'fine:3': { duration: 70, cols: 3, rows: 2, tables: 5, dishes: ['caviar', 'truffle', 'wagyu'], arrival: 8, take: .25, patience: 82, orders: [.5,.3,.2], stalls: false,
    objective: { type: 'dishes', target: 4 } },
  'fine:4': { duration: 80, cols: 4, rows: 2, tables: 6, dishes: ['bisque', 'truffle', 'wagyu'], arrival: 7.5, take: .25, patience: 78, orders: [.4,.35,.25], stalls: true,
    objective: { type: 'items', target: 9 } },
  'fine:5': { duration: 85, cols: 4, rows: 2, tables: 7, dishes: ['bisque', 'truffle', 'wagyu', 'souffle'], arrival: 7.4, take: .25, patience: 55, orders: [.35,.35,.3], stalls: true,
    objective: { type: 'noAngry' } },
  'fine:6': { duration: 100, cols: 4, rows: 2, tables: 8, dishes: ['truffle', 'wagyu', 'souffle'], arrival: 5.5, take: .25, patience: 60, orders: [.3,.4,.3], stalls: true,
    objective: { type: 'dishes', target: 18 } },
  'fine:7': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['truffle', 'wagyu', 'souffle'], arrival: 4.8, take: .25, patience: 57, orders: [.25,.4,.35], stalls: true,
    objective: { type: 'items', target: 25 } },
  'fine:8': { duration: 120, cols: 4, rows: 2, tables: 8, dishes: ['wagyu', 'souffle', 'truffle'], arrival: 4.2, take: .25, patience: 55, orders: [.2,.4,.4], stalls: true,
    objective: { type: 'coins', target: 430 } },
  'fine:9': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['bisque', 'truffle', 'wagyu', 'souffle'], arrival: 6.5, take: .25, patience: 70, orders: [.5,.35,.15], stalls: true,
    objective: { type: 'cleanServe', target: 10 } },
  'fine:10': { duration: 165, cols: 4, rows: 2, tables: 8, dishes: ['wagyu', 'souffle', 'truffle'], arrival: 3.8, take: .25, patience: 52, orders: [.15,.4,.45], stalls: true,
    objective: { type: 'coins', target: 860 } },
  // Big Sky Steakhouse
  'steak:1': { duration: 60, cols: 3, rows: 1, tables: 3, dishes: ['fries', 'wings'], arrival: 9, take: .10, patience: 95, orders: [.8,.2,0], stalls: false,
    objective: { type: 'guests', target: 3 } },
  'steak:2': { duration: 65, cols: 3, rows: 2, tables: 4, dishes: ['fries', 'wings', 'ribs'], arrival: 8.5, take: .15, patience: 90, orders: [.6,.3,.1], stalls: false,
    objective: { type: 'coins', target: 41 } },
  'steak:3': { duration: 70, cols: 3, rows: 2, tables: 5, dishes: ['fries', 'ribs', 'ribeye'], arrival: 8, take: .25, patience: 82, orders: [.5,.3,.2], stalls: false,
    objective: { type: 'dishes', target: 4 } },
  'steak:4': { duration: 80, cols: 4, rows: 2, tables: 6, dishes: ['wings', 'ribs', 'ribeye'], arrival: 7.5, take: .25, patience: 78, orders: [.4,.35,.25], stalls: true,
    objective: { type: 'items', target: 8 } },
  'steak:5': { duration: 85, cols: 4, rows: 2, tables: 7, dishes: ['wings', 'ribs', 'ribeye', 'tomahawk'], arrival: 7.4, take: .25, patience: 55, orders: [.35,.35,.3], stalls: true,
    objective: { type: 'noAngry' } },
  'steak:6': { duration: 100, cols: 4, rows: 2, tables: 8, dishes: ['ribs', 'ribeye', 'tomahawk'], arrival: 5.5, take: .25, patience: 60, orders: [.3,.4,.3], stalls: true,
    objective: { type: 'dishes', target: 18 } },
  'steak:7': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['ribs', 'ribeye', 'tomahawk'], arrival: 4.8, take: .25, patience: 57, orders: [.25,.4,.35], stalls: true,
    objective: { type: 'items', target: 25 } },
  'steak:8': { duration: 120, cols: 4, rows: 2, tables: 8, dishes: ['ribeye', 'tomahawk', 'ribs'], arrival: 4.2, take: .25, patience: 55, orders: [.2,.4,.4], stalls: true,
    objective: { type: 'coins', target: 405 } },
  'steak:9': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['wings', 'ribs', 'ribeye', 'tomahawk'], arrival: 6.5, take: .25, patience: 70, orders: [.5,.35,.15], stalls: true,
    objective: { type: 'cleanServe', target: 10 } },
  'steak:10': { duration: 165, cols: 4, rows: 2, tables: 8, dishes: ['ribeye', 'tomahawk', 'ribs'], arrival: 3.8, take: .25, patience: 52, orders: [.15,.4,.45], stalls: true,
    objective: { type: 'coins', target: 810 } },
  'italian:1': { duration: 60, cols: 3, rows: 1, tables: 3, dishes: ['caprese', 'pizza'], arrival: 9, take: .10, patience: 95, orders: [.8,.2,0], stalls: false,
    objective: { type: 'guests', target: 3 } },
  'italian:2': { duration: 65, cols: 3, rows: 2, tables: 4, dishes: ['caprese', 'pizza', 'spaghetti'], arrival: 8.5, take: .15, patience: 90, orders: [.6,.3,.1], stalls: false,
    objective: { type: 'coins', target: 41 } },
  'italian:3': { duration: 70, cols: 3, rows: 2, tables: 5, dishes: ['caprese', 'spaghetti', 'tiramisu'], arrival: 8, take: .25, patience: 82, orders: [.5,.3,.2], stalls: false,
    objective: { type: 'dishes', target: 4 } },
  'italian:4': { duration: 80, cols: 4, rows: 2, tables: 6, dishes: ['pizza', 'spaghetti', 'tiramisu'], arrival: 7.5, take: .25, patience: 78, orders: [.4,.35,.25], stalls: true,
    objective: { type: 'items', target: 8 } },
  'italian:5': { duration: 85, cols: 4, rows: 2, tables: 7, dishes: ['pizza', 'spaghetti', 'tiramisu', 'lasagna'], arrival: 7.4, take: .25, patience: 55, orders: [.35,.35,.3], stalls: true,
    objective: { type: 'noAngry' } },
  'italian:6': { duration: 100, cols: 4, rows: 2, tables: 8, dishes: ['spaghetti', 'tiramisu', 'lasagna'], arrival: 5.5, take: .25, patience: 60, orders: [.3,.4,.3], stalls: true,
    objective: { type: 'dishes', target: 18 } },
  'italian:7': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['spaghetti', 'tiramisu', 'lasagna'], arrival: 4.8, take: .25, patience: 57, orders: [.25,.4,.35], stalls: true,
    objective: { type: 'items', target: 25 } },
  'italian:8': { duration: 120, cols: 4, rows: 2, tables: 8, dishes: ['tiramisu', 'lasagna', 'spaghetti'], arrival: 4.2, take: .25, patience: 55, orders: [.2,.4,.4], stalls: true,
    objective: { type: 'coins', target: 385 } },
  'italian:9': { duration: 110, cols: 4, rows: 2, tables: 8, dishes: ['pizza', 'spaghetti', 'tiramisu', 'lasagna'], arrival: 6.5, take: .25, patience: 70, orders: [.5,.35,.15], stalls: true,
    objective: { type: 'cleanServe', target: 10 } },
  'italian:10': { duration: 165, cols: 4, rows: 2, tables: 8, dishes: ['tiramisu', 'lasagna', 'spaghetti'], arrival: 3.8, take: .25, patience: 52, orders: [.15,.4,.45], stalls: true,
    objective: { type: 'coins', target: 770 } },
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
    case 'cleanServe': return `Serve ${o.target} guests, none angry`;
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
    case 'cleanServe': return `Serve ${o.target}, none angry`;
    case 'noAngry': return 'No angry guests';
    default: return '';
  }
}
