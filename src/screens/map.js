import { go } from '../router.js';
import { chapters } from '../data/chapters.js';

export function renderMap(app) {
  const chapter = chapters[0];
  app.innerHTML = `<h1>Dine & Dash</h1><h2>${chapter.name}</h2>`;
  for (let i = 1; i <= chapter.levels; i++) {
    const btn = document.createElement('button');
    btn.textContent = `Level ${i}`;
    btn.onclick = () => go('game', { level: i });
    app.appendChild(btn);
  }
}