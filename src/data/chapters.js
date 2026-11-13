// Path points are grid coordinates on the street centres. arc = how far along the path (in tiles) each level sits.
export const chapters = [
  {
    id: 'city',
    name: 'City Supper Club',
    theme: 'city',
    map: 'city',
    nextLabel: 'CHAPTER 2',
    path: [[5, 23], [5, 17], [11, 17], [11, 11], [17, 11], [17, 5], [20.5, 5]],
    levels: [
      { n: 1, name: 'Corner Cafe', sign: 'CAFE', arc: 3 },
      { n: 2, name: 'Jazz Bar', sign: 'JAZZ', arc: 9.5 },
      { n: 3, name: 'Hotel Lounge', sign: 'HOTEL', arc: 16 },
      { n: 4, name: 'Opera Terrace', sign: 'OPERA', arc: 22.5 },
      { n: 5, name: 'Skyline Gala', sign: 'GALA', arc: 28 },
    ],
  },
  {
    id: 'beach',
    name: 'Beach Bistro',
    theme: 'beach',
    map: 'beach',
    nextLabel: 'CHAPTER 3',
    levels: [
      { n: 1, name: 'Seaside Shack', sign: 'SHACK' },
      { n: 2, name: 'Tiki Bar', sign: 'TIKI' },
      { n: 3, name: 'Surf Club', sign: 'SURF' },
      { n: 4, name: 'Sunset Deck', sign: 'DECK' },
      { n: 5, name: 'Lighthouse Feast', sign: 'LIGHT' },
    ],
  },
  {
    id: 'chinese',
    name: 'Lantern Garden',
    theme: 'chinese',
    map: 'chinese',
    levels: [
      { n: 1, name: 'Tea House', sign: 'TEA' },
      { n: 2, name: 'Dumpling Den', sign: 'DUMPLING' },
      { n: 3, name: 'Noodle Bar', sign: 'NOODLE' },
      { n: 4, name: 'Moon Pavilion', sign: 'MOON' },
      { n: 5, name: 'Dragon Banquet', sign: 'DRAGON' },
    ],
  },
  {
    id: 'fine',
    name: "Maison d'Or",
    theme: 'fine',
    map: 'fine',
    levels: [
      { n: 1, name: 'Champagne Bar', sign: 'BAR' },
      { n: 2, name: 'Velvet Lounge', sign: 'LOUNGE' },
      { n: 3, name: "Chef's Table", sign: 'TABLE' },
      { n: 4, name: 'Crystal Salon', sign: 'SALON' },
      { n: 5, name: 'Royal Gala', sign: 'GALA' },
    ],
  },
];
