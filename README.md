# Dine & Dash: Restaurant Game

A cute pixel-style restaurant management game. Seat guests, take orders, cook, serve, collect payment and clean tables before time runs out, across five themed chapters of ten levels each.

**Live game:** https://dine-and-dash-nu.vercel.app

## How to play

1. **Seat** waiting guests at free tables (tap a guest, then a table). Each has a satisfaction bar that drains while they wait.
2. **Take their order**, send it to the kitchen, and **pick up** finished dishes from the counter to serve them.
3. **Collect payment** (and tips) when a guest asks for the bill, then **clean** the table.
4. Keep the **treat stand** filled to cheer up guests in the wait line.
5. Meet the level's single goal before the timer ends. At 12 seconds left the door closes and no new guests arrive.

Stars: 3 for no angry guests, 2 for one, 1 for two or more.

### Level goals

Each level has one requirement: earn coins, serve guests, deliver dishes, cook items, keep guests happy, fill takeout orders, or one of the two "no angry guests" types (level 5 runs to the timer; level 9 asks you to serve a set number without anyone storming out). Level 10 asks for double the coins of level 8.

### Chapters

Different themes include City Supper Club, Beach Bistro, Lantern Garden, Maison d'Or, Big Sky Steakhouse, etc. Finish every level of a chapter to unlock the next. More chapters are coming soon.

### Upgrades

Coins earned are banked and spent on the Upgrade screen. Upgrades last for one chapter.

- **Staff:** Chefs, Host, Busser, Runner
- **Speed Boost:** Kitchen, Quick shoes, Staff training
- **Service:** Finer ingredients, Cozy seats (patience)

Lives (max 5) regrow over time. A daily bonus is available from the calendar button on the map.

## Run it locally

Requires at least Node 18.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

### Dev-only shortcuts

Only active under `npm run dev`; stripped from production builds. Combine with `&`.

| URL | Effect |
|---|---|
| `/?fresh` | Brand-new player: wipes saved data and opens Level 1 with the first-time lesson |
| `/?reset` | Resets progress and replays lessons |
| `/?unlock=all` or `/?unlock=beach:3` | Unlocks everything, or everything before that level |
| `/?coins=800` | Sets the coin wallet |
| `/?lives=3` | Sets lives |
| `/?daily` | Makes today's daily bonus claimable |

## Project layout

```
src/
  main.js            screen router and dev shortcuts
  screens/           title, map, game, upgrades
  game/              engine (rules), view (rendering), scene*, popups, sound, tutorial, snacks
  data/              chapters, levels, upgrades, dishes
  map/               illustrated chapter maps, stops, direction boards, daily bonus, panels
  state/progress.js  saved progress (localStorage)
public/              favicon, share image, fonts
```

## Deploying

The site deploys to Vercel from the `main` branch. Changes go through a pull request (squash and merge).
