// Upgrades are bought on the map with banked coins and last for ONE chapter (each chapter has its own menu and food).
// tiers = price of each level. The in-game effect of each id is applied in game/engine.js and game/scene.js.
export const UPGRADES = {
  city: [
    { id: 'chefs',       name: 'More chefs',        tiers: [40, 80] },
    { id: 'kitchen',     name: 'Better kitchen',    tiers: [50, 90, 140] },
    { id: 'ingredients', name: 'Finer ingredients', tiers: [40, 80, 130] },
    { id: 'shoes',       name: 'Quick shoes',       tiers: [30, 60] },
    { id: 'seats',       name: 'Cozy seats',        tiers: [35, 70] },
    { id: 'host',        name: 'Hire a host',       tiers: [60] },
    { id: 'busser',      name: 'Hire a busser',     tiers: [50] },
    { id: 'runner',      name: 'Hire a runner',     tiers: [80] },
  ],
};
export const upgradeList = (chapterId) => UPGRADES[chapterId] || [];
