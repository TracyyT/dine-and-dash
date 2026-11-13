// Upgrades are bought on the Upgrade screen with banked coins and last for ONE chapter (each chapter has its own menu and food).
// tiers = price of each level, label = short card title, group = which shelf it sits on.
// The in-game effect of each id is applied in game/engine.js and game/scene.js.
export const UPGRADES = {
  city: [
    { id: 'chefs',       group: 'kitchen', label: 'Chefs',        name: 'More chefs',        tiers: [40, 80] },
    { id: 'kitchen',     group: 'kitchen', label: 'Kitchen',      name: 'Better kitchen',    tiers: [50, 90, 140] },
    { id: 'ingredients', group: 'kitchen', label: 'Ingredients',  name: 'Finer ingredients', tiers: [40, 80, 130] },
    { id: 'shoes',       group: 'service', label: 'Quick shoes',  name: 'Quick shoes',       tiers: [30, 60] },
    { id: 'seats',       group: 'service', label: 'Patience',     name: 'Cozy seats',        tiers: [35, 70] },
    { id: 'tips',        group: 'service', label: 'Tips',         name: 'Tip bonus',         tiers: [45, 90] },
    { id: 'host',        group: 'staff',   label: 'Host',         name: 'Hire a host',       tiers: [60] },
    { id: 'busser',      group: 'staff',   label: 'Busser',       name: 'Hire a busser',     tiers: [50] },
    { id: 'runner',      group: 'staff',   label: 'Runner',       name: 'Hire a runner',     tiers: [80] },
  ],
};
export const upgradeList = (chapterId) => UPGRADES[chapterId] || [];
