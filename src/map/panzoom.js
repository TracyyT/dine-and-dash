// How close the camera sits when it centers on the current level (1 = full size, smaller = farther out).
const HOME_ZOOM = 0.8;
// Drag to pan, wheel / buttons / keys to zoom. The world is a fixed-size layer inside a full-screen view.
export function createPanZoom({ view, world, width, height }) {
  const st = { x: 0, y: 0, s: 1 };
  let dragged = false, down = null, last = null, vel = { x: 0, y: 0 }, raf = 0;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const minScale = () => Math.max(innerWidth / width, innerHeight / height);
  const clamp = () => {
    st.s = Math.min(Math.max(st.s, minScale()), 3);
    st.x = Math.min(0, Math.max(innerWidth - width * st.s, st.x));
    st.y = Math.min(0, Math.max(innerHeight - height * st.s, st.y));
  };
  const apply = () => { clamp(); world.style.transform = `translate(${st.x}px,${st.y}px) scale(${st.s})`; };
  const focusOn = (wx, wy, s = st.s) => { st.s = s; st.x = innerWidth / 2 - wx * st.s; st.y = innerHeight / 2 - wy * st.s; apply(); };
  const zoomAt = (cx, cy, f) => {
    const ox = (cx - st.x) / st.s, oy = (cy - st.y) / st.s;
    st.s *= f; clamp(); st.x = cx - ox * st.s; st.y = cy - oy * st.s; apply();
  };
  const onDown = (e) => {
    if (e.button) return;
    cancelAnimationFrame(raf);
    down = { x: e.clientX, y: e.clientY }; last = { x: e.clientX, y: e.clientY }; dragged = false; vel = { x: 0, y: 0 };
  };
  const onMove = (e) => {
    if (!down) return;
    const dx = e.clientX - last.x, dy = e.clientY - last.y;
    if (!dragged && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) {
      dragged = true; view.setPointerCapture(e.pointerId); view.classList.add('drag');
      view.dispatchEvent(new CustomEvent('panstart'));
    }
    if (dragged) { st.x += dx; st.y += dy; vel = { x: dx, y: dy }; apply(); }
    last = { x: e.clientX, y: e.clientY };
  };
  const onUp = () => {
    if (!down) return;
    down = null; view.classList.remove('drag');
    if (dragged && !reduce) {
      const glide = () => {
        vel.x *= 0.92; vel.y *= 0.92;
        if (Math.hypot(vel.x, vel.y) < 0.4) return;
        st.x += vel.x; st.y += vel.y; apply(); raf = requestAnimationFrame(glide);
      };
      glide();
    }
    setTimeout(() => { dragged = false; }, 0); // lets the click handler see "dragged" first
  };
  const onWheel = (e) => { e.preventDefault(); zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.12 : 1 / 1.12); };
  const onKey = (e) => {
    const k = { ArrowLeft: [60, 0], ArrowRight: [-60, 0], ArrowUp: [0, 60], ArrowDown: [0, -60] }[e.key];
    if (k) { e.preventDefault(); st.x += k[0]; st.y += k[1]; apply(); }
    else if (e.key === '+' || e.key === '=') zoomAt(innerWidth / 2, innerHeight / 2, 1.15);
    else if (e.key === '-') zoomAt(innerWidth / 2, innerHeight / 2, 1 / 1.15);
  };
  view.addEventListener('pointerdown', onDown);
  view.addEventListener('pointermove', onMove);
  view.addEventListener('pointerup', onUp);
  view.addEventListener('pointercancel', onUp);
  view.addEventListener('wheel', onWheel, { passive: false });
  view.addEventListener('keydown', onKey);
  addEventListener('resize', apply);
  return {
    isDragging: () => dragged,
    focusOn,
    home: (wx, wy) => focusOn(wx, wy, Math.max(minScale(), HOME_ZOOM)),
    zoomBy: (f) => zoomAt(innerWidth / 2, innerHeight / 2, f),
    destroy() { cancelAnimationFrame(raf); removeEventListener('resize', apply); },
  };
}
