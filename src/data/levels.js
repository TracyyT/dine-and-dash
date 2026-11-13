// Tuning for each level. Key = "chapter:level".
// arrival = seconds between guests, take = share of take-out guests, patience = seconds a guest lasts at full mood,
// orders = chances a dine-in guest orders 1, 2 or 3 times, goals = coins needed for 1, 2 and 3 stars.
export const LEVELS = {
  'city:1': { duration: 90,  tables: 3, stations: 1, dishes: ['croissant', 'sandwich'],                        arrival: 10,   take: 0.15, patience: 62, orders: [0.6, 0.3, 0.1],  goals: [40, 65, 90] },
  'city:2': { duration: 100, tables: 4, stations: 2, dishes: ['croissant', 'sandwich', 'cheesecake'],         arrival: 9,   take: 0.2,  patience: 58, orders: [0.45, 0.35, 0.2], goals: [50, 80, 110] },
  'city:3': { duration: 110, tables: 5, stations: 2, dishes: ['sandwich', 'pasta', 'cheesecake'],             arrival: 8, take: 0.25, patience: 55, orders: [0.35, 0.4, 0.25], goals: [60, 95, 130] },
  'city:4': { duration: 120, tables: 6, stations: 3, dishes: ['sandwich', 'pasta', 'steak', 'cheesecake'],    arrival: 7,   take: 0.25, patience: 52, orders: [0.3, 0.4, 0.3],  goals: [80, 120, 160] },
  'city:5': { duration: 130, tables: 6, stations: 3, dishes: ['croissant', 'pasta', 'steak', 'cheesecake'],   arrival: 6,   take: 0.3,  patience: 48, orders: [0.2, 0.4, 0.4],  goals: [90, 130, 175] },
};
export const levelConfig = (chapterId, n) => LEVELS[`${chapterId}:${n}`] || LEVELS['city:1'];
