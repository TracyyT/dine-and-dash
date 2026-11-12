// Path points are grid coordinates on the street centres. arc = how far along the path (in tiles) each level sits.
export const chapters = [
  {
    id: 'city',
    name: 'City Supper Club',
    theme: 'city',
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
];
