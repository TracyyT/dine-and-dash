// Where everything sits in a level. The room gets wider (more table columns) and taller (a second row)
// as levels grow, and the camera zooms out to fit it, so bigger levels still feel roomy.
export const HUD_H = 84;
export const WALL_BOTTOM = 294; // back wall ends here, floor starts

export function buildLayout(cfg) {
  const { cols, rows } = cfg;
  const CELL_W = 220, CELL_H = 215;
  const dineX = 270;
  const H = rows === 1 ? 720 : 830;
  const rowY0 = rows === 1 ? 470 : 430;
  const tables = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) tables.push([dineX + CELL_W / 2 + c * CELL_W, rowY0 + r * CELL_H]);
  const kx = dineX + cols * CELL_W + 24;
  const kw = Math.max(340, cfg.stations * 125 + 70);
  const stallW = 150, stallGap = 16, sx0 = kx + kw + 30;
  const W = Math.max(1280, cfg.stalls ? sx0 + stallW * 2 + stallGap + 16 : kx + kw + 14);
  const stalls = cfg.stalls ? ['drink', 'dessert'].map((kind, i) => {
    const x0 = sx0 + i * (stallW + stallGap);
    return { kind, x0, w: stallW, cx: x0 + stallW / 2, slots: [0, 1, 2].map((k) => ({ x: x0 + 30 + k * 45, y: 432 })), point: { x: x0 + stallW / 2, y: 512 } };
  }) : [];
  const stations = Array.from({ length: cfg.stations }, (_, i) => [kx + kw / 2 + (i - (cfg.stations - 1) / 2) * 125, 332]);
  const slots = cfg.stations >= 3 ? 8 : 6;
  const pickup = Array.from({ length: slots }, (_, i) => ({ x: kx + kw / 2 + (i - (slots - 1) / 2) * 58, y: 432 }));
  const takeY = H - 40;
  const take = [{ x: kx + kw * 0.28, y: takeY }, { x: kx + kw * 0.72, y: takeY }];
  const queue = [];
  for (let i = 0; i < 6; i++) queue.push({ x: i % 2 ? 180 : 80, y: 420 + Math.floor(i / 2) * 125 });
  return {
    W, H, dineX, kx, kw, cols, rows, cellW: CELL_W,
    tables, stations, pickup, take, queue, stalls,
    door: { x: 130, y: H + 80 },
    drop: { x: kx + kw / 2, y: 392 },
    pickupPoint: { x: kx + kw / 2, y: 512 },
    home: { x: dineX + (cols * CELL_W) / 2, y: rowY0 + (rows - 1) * CELL_H + 110 },
  };
}
