import { go } from '../router.js';

export function renderGame(app, { level }) {
  app.innerHTML = `<h1>Level ${level}</h1><p>Game goes here.</p>`;
  const back = document.createElement('button');
  back.textContent = 'Back to map';
  back.onclick = () => go('map');
  app.appendChild(back);
}