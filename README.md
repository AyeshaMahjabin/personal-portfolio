# ayeshamahjabin.vercel.app

My portfolio, built like a toy: things you can poke, throw and turn over.
Live: https://ayeshamahjabin.vercel.app/

## The idea

Candy colours on warm paper, a high-contrast serif doing the talking, and a 3D
robot standing on the page with no frame around it. Everything you can touch is
treated as a physical object — it sits on a lip, lifts when you point at it,
and presses down when you click. One spring curve is reused everywhere so a
card, a sticker and a button all feel like they're made of the same stuff.

Each section owns a colour, and the paper behind the whole page drifts to match
it as you scroll.

## Stack

- **React 19 + Vite** — app and build
- **Tailwind CSS v4** — tokens in `@theme`, the palette in `src/index.css`
- **Motion** — springs, reveals, the drag physics on the stickers
- **three.js / react-three-fiber** — the robot, code-split so three.js only
  downloads when it's near the viewport
- **WebGL fluid simulation** — the cursor trail, drawing its dye from the live
  palette
- **cobe** — the globe in the playground

## Layout

```
src/
  data/site.js     all copy and content in one place
  lib/pointer.js   one shared pointer listener, flushed once per frame
  scene/           paper, fluid cursor, blob cursor, the robot, toasts, confetti
  ui/              reveal, sticker, marquee, section heading, word cycler
  sections/        hero, work, experience, mindset, skills, playground,
                   about, contact, footer
  components/      project posters, the case study sheet, globe, copy button
```

## Notes

- Every canvas renders inside an error boundary — blocked or unavailable WebGL
  degrades quietly instead of taking the page down.
- Heavy effects are off by default for `prefers-reduced-motion` and touch
  devices, and there's a toggle in the playground.
- There are three hidden things on the page. One of them is a very old cheat
  code.

## Development

```bash
npm install
npm run dev      # vite dev server
npm run build    # production build
npm run lint
```
