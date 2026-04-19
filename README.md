# Portfolio - Aarju Pal

Live: [aarju.vercel.app](https://aarju.vercel.app)

A minimal monochrome portfolio site. Single page, scrolling sections.

## Stack

- Vite + React + TypeScript
- CSS Modules, custom design tokens
- IBM Plex Sans / Mono (Google Fonts)
- Deployed on Vercel

## Scripts

```bash
npm install        # install deps
npm run dev        # dev server (LAN-exposed)
npm run build      # production build
npm run preview    # preview production build locally
```

## Content

All copy, taglines, skills, experience, projects, and education live in [`src/data/data.json`](src/data/data.json). Edit freely - no code changes needed.

## Design system

Central tokens in [`src/styles/`](src/styles):

- `tokens.css` - color, spacing, shadows, glow, layout
- `typography.css` - font families, type scale, weights
- `globals.css` - resets, utilities, skip link, `.glass`, `.container`

Theme toggle (light/dark) lives in the navbar. Auto-detects system preference on first visit and persists choice.

## Structure

```
src/
├── assets/          # logos, resume, avatar (with resolver)
├── components/      # Footer, CustomCursor
├── data/            # data.json (all content)
├── hooks/           # useTheme, useTypewriter
├── layouts/         # PortfolioLayout
├── navbar/          # Navbar
├── sections/        # Hero, Experience, Skills, Projects, Education, Contact
├── styles/          # design tokens + globals
├── types/           # TS interfaces mirroring data.json
└── utils/           # highlightMetrics, smoothScroll
```

## Credits

Typeset in IBM Plex. Logos from simpleicons + svgrepo. Built with React + Vite.
