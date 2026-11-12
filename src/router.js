const app = document.getElementById('app');
const routes = {};
let cleanup = null;

export function register(name, render) {
  routes[name] = render;
}

// A screen may return a function; it runs when the player leaves that screen.
export function go(name, params = {}) {
  if (cleanup) cleanup();
  app.innerHTML = '';
  cleanup = routes[name](app, params) || null;
}
