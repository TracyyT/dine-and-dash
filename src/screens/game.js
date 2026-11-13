import { go } from '../router.js';
import { chapters } from '../data/chapters.js';
import { themes } from '../themes/index.js';
import { applyTheme } from '../themes/apply.js';
import { recordResult } from '../state/progress.js';

export function renderGame(app, { chapter: chapterId = 'city', level = 1 } = {}) {
  const chapter = chapters.find((c) => c.id === chapterId);
  applyTheme(themes[chapter.theme]); // the restaurant look applies inside a level only
  const info = chapter.levels.find((l) => l.n === level);
  app.innerHTML = `<h1>Level ${level}: ${info.name}</h1>
    <p>Game goes here. For now, pick a result to test the map:</p>
    <div class="results"></div>`;

  const finish = (stars) => { recordResult(chapter.id, level, stars); go('map'); };
  const row = app.querySelector('.results');
  [[3, 'Finish with 3 stars'], [2, 'Finish with 2 stars'], [1, 'Finish with 1 star'], [0, 'Fail the level']].forEach(([stars, label]) => {
    const b = document.createElement('button');
    b.textContent = label;
    b.onclick = () => finish(stars);
    row.appendChild(b);
  });
  const back = document.createElement('button');
  back.textContent = 'Back to map';
  back.onclick = () => go('map');
  row.appendChild(back);
}
