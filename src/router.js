const app = document.getElementById('app');
const routes = {};

export function register(name, render) {
  routes[name] = render;
}

export function go(name, params = {}) {
  app.innerHTML = '';
  routes[name](app, params);
}