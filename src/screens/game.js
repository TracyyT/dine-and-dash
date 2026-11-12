import { go } from '../router.js';
import { chapters } from '../data/chapters.js';
import { themes } from '../themes/index.js';
import { applyTheme } from '../themes/apply.js';

export function renderGame(app, { chapter: chapterId = 'city', level = 1 } = {}) {
  const chapter = chapters.find((c) => c.id === chapterId);
  applyTheme(themes[chapter.theme]); // the restaurant look applies inside a level only
  const info = chapter.levels.find((l) => l.n === level);
  app.innerHTML = `<h1>Level ${level}: ${info.name}</h1><p>Game goes here.</p>`;
  const back = document.createElement('button');
  back.textContent = 'Back to map';
  back.onclick = () => go('map');
  app.appendChild(back);
}
