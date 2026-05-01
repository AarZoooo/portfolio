# aarju.dev

Personal site at [aarju.dev](https://aarju.dev) — portfolio, blog, and a few
other corners. Hand-built monochrome aesthetic, vim-flavored, zero clutter.

## Stack

- [Astro](https://astro.build) (static output) + React 19 islands
- TypeScript (strict)
- CSS Modules + custom design tokens
- MDX for blog posts, [Shiki](https://shiki.style) for build-time syntax highlighting
- IBM Plex Sans / Mono typography
- Vercel hosting via `@astrojs/vercel`

## Scripts

```bash
npm install        # install deps
npm run dev        # dev server at http://localhost:4321
npm run build      # production build (astro check + astro build)
npm run preview    # preview production build locally
npm run check      # type-check only
npm run lint       # eslint
```

A pre-commit hook runs `npm run lint` automatically — see `.githooks/`.
`npm install` wires it up via the `prepare` script.

## Routes

```
/                  portfolio (hero → experience → skills → projects → education → contact)
/blog              post listing
/blog/<slug>       individual post (MDX)
/shortcuts         keyboard shortcut reference
/rss.xml           RSS feed
/sitemap-index.xml sitemap
```

## Source layout

```
src/
├── design/                   # SHARED — importable from anywhere
│   ├── tokens/               # CSS variables (colors, spacing, typography, paper, glass, modes)
│   ├── typography/           # prose.css for rendered MDX
│   ├── primitives/           # reusable atoms (Expandable, icons)
│   └── chrome/               # site shell (Navbar, Footer, CustomCursor, Logo, Shortcuts)
│
├── features/                 # SUB-APP-SPECIFIC — private to each feature
│   └── portfolio/            # sections, data.json, layout
│
├── content/blog/             # MDX posts (typed via content.config.ts)
├── hooks/                    # useTheme, useShortcuts
├── utils/                    # smoothScroll, copy, highlightMetrics, navigation, …
├── types/                    # shared TS types
├── assets/                   # logos, avatar, resume + asset resolver
├── layouts/                  # BaseLayout.astro
└── pages/                    # routes (file-based)
```

## Content authoring

- Portfolio copy lives in [`src/features/portfolio/data/data.json`](src/features/portfolio/data/data.json).
  All text, taglines, skills, experience, projects, and education flow from
  there. Edit freely — no code changes needed.
- Blog posts live in [`src/content/blog/`](src/content/blog/) as `.mdx`.
  Frontmatter is type-checked by the schema in `src/content.config.ts`.
  Drop a new file, set `pubDate`, write — it appears at `/blog`.

## Design system

Tokens live in [`src/design/tokens/`](src/design/tokens):

- `tokens.css` — colors, spacing, durations, easings, radii, shadows, glass, layout
- `typography.css` — font families, type scale, weights, leading, tracking
- `breakpoints.css` — `--bp-medium`, `--bp-narrow` custom-media
- `paper.css` — paper-mode treatment (toggle with `p`)
- `modes.css` — narrow-column toggle (`w`)

Three orthogonal display modes layered onto the same content:

| Toggle | Key | Default | Effect |
|---|---|---|---|
| Theme | `t` | system | light / dark flip via `[theme]` attribute |
| Paper | `p` | off | editorial print treatment, swaps cursor for a pen nib |
| Width | `w` | per-page | narrow reading column (720px) vs wide (1280px) |

Long-press the logo on touch devices toggles paper. The full keyboard
reference lives at [`/shortcuts`](https://aarju.dev/shortcuts).

## Architecture notes

For everything else — boundary rules, library policy, accessibility,
performance, code style, commit conventions — see [`AGENTS.md`](AGENTS.md).
That file is the source of truth for how this codebase is built and
extended.

## License

Code in this repo is MIT-licensed — feel free to learn from it, copy
patterns, or run your own version. See [`LICENSE`](LICENSE).

The **content** is not. Blog posts, the résumé PDF, the bio and project
copy in `data.json`, and any other text/image authored by me are
copyrighted and reserved. Don't republish them as your own.

If you want to use a substantial chunk of the design or content for
something other than personal learning, reach out first — I'm friendly.
