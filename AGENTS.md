# Breakout Bras — agent / developer notes

WordPress theme migration to **Next.js (App Router) + Tailwind**. This file documents **workflow and tooling**, not product copy.

## Commands

| Command | Purpose |
|--------|---------|
| `npm run dev` | Webpack dev on `127.0.0.1:3000`; clears `.next` and `node_modules/.cache` on start |
| `npm run dev:safe` | Same idea + explicit message; use when seeing 500s or blank pages |
| `npm run dev:clean` | Full clean + dev |
| `npm run build` | Production build — run after substantive edits |
| `npm run lint` | ESLint |

Avoid `dev:turbopack` on iCloud/Desktop-synced clones unless you need it; webpack is the default for stability.

## Constraints for automated edits

- **Do not** change layout, design, or styles unless the task explicitly asks for it.
- **Do** keep diffs minimal and run `npm run build` when changing code.

## Config notes

- `next.config.ts` disables webpack filesystem cache and sets `devtoolSegmentExplorer: false` to reduce dev flakiness.

## Diagnostics: “blank page” / `html` height 0 (verified Mar 2025)

Production and webpack dev both return **full HTML** (~50–65KB) with **linked CSS** and visible SSR content (`<header>`, `<main id="main">`, hero copy, Find Your Fit). CSS chunks are **non-empty** (~18–78KB depending on mode).

If a tool still shows **blank** or **`html` height 0**:

1. Open **`http://127.0.0.1:3000`** in **Chrome/Safari/Firefox** — not a stripped preview pane.
2. Run **`curl -s http://127.0.0.1:3000/ | wc -c`** — expect tens of thousands of bytes; if near 0, the dev server is not running or the wrong port/host.
3. **Hard refresh** or `npm run dev:safe` if chunks/CSS look stale.

`app/layout.tsx` and `globals.css` set **`min-height: 100dvh`** on `html`/`body` (CSS + inline) so the document box is never zero-height when CSS loads.
