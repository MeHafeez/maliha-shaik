# Shaik Maliha — Portfolio

Portfolio for Shaik Maliha, React Js frontend developer. Every fact on the site comes from `public/Maliha_Resume.pdf` (content lives in `src/data.ts`).

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Stack

Vite, React, TypeScript, GSAP — ScrollTrigger, ScrollSmoother, SplitText, TextPlugin and ScrambleTextPlugin.

- `src/data.ts` — résumé content
- `src/motion.ts` — all scroll and intro choreography (respects `prefers-reduced-motion`)
- `src/components/Visuals.tsx` — the hero checkout specimen and the CSS-drawn project sketches (no images)
- `src/components/Cursor.tsx` — custom cursor and magnetic buttons (fine pointers only)
