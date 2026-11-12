const kebab = (key) => key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
let applied = [];

export function applyTheme(theme) {
  clearTheme();
  const root = document.documentElement;
  const set = (name, value) => { root.style.setProperty(name, value); applied.push(name); };
  for (const [key, value] of Object.entries(theme.palette)) set(`--${kebab(key)}`, value);
  set('--font-display', theme.fonts.display);
  set('--font-body', theme.fonts.body);
  root.dataset.theme = theme.id;
}

export function clearTheme() {
  const root = document.documentElement;
  applied.forEach((name) => root.style.removeProperty(name));
  applied = [];
  delete root.dataset.theme;
}
