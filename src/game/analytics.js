// Tiny event tracker. Events are kept in the browser (last 300, readable with window.__ddEvents()) and, when Vercel Web Analytics is
// switched on for the site, also forwarded to it as custom events. No names, no accounts, nothing personal is recorded.
const KEY = 'dine-and-dash:events:v1';
let log = [];
try { log = JSON.parse(localStorage.getItem(KEY)) || []; } catch { /* start empty */ }
export function track(name, data = {}) {
  const ev = { t: Date.now(), name, ...data };
  log.push(ev); if (log.length > 300) log = log.slice(-300);
  try { localStorage.setItem(KEY, JSON.stringify(log)); } catch { /* ignore */ }
  try { if (typeof window.va === 'function') window.va('event', { name, data }); } catch { /* ignore */ }
}
if (typeof window !== 'undefined') window.__ddEvents = () => log.slice();
