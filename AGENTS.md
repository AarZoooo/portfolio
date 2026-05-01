# AGENTS.md

Project charter for AI agents and human contributors working on this repo.
This file is the source of truth — read it before making any change.

## Project context

Personal portfolio + (soon) blog at [aarju.dev](https://aarju.dev). Single
author, single deploy, hand-built monochrome aesthetic. Hosted on Vercel.

**Owner:** Aarju Pal — backend engineer (PayPal, Rippling), Bangalore.

**Tone of the site:** minimal, opinionated, vim-flavored, zero clutter.
Every detail is intentional. Match that voice when adding to it.

## Stack

- **Astro** (static output) + **React 19** islands + **TypeScript** (strict)
- **CSS Modules** + custom design tokens
- **MDX** for blog content, **Shiki** for build-time syntax highlighting
- **IBM Plex Sans / Mono** typography
- **Vercel** hosting via `@astrojs/vercel/static`

> The pre-Astro Vite + React SPA is preserved at the `v1-vite` tag for
> reference / rollback. Anything in this file describes the current Astro
> codebase.

## Architecture

```
src/
├── design/                   # SHARED — importable from anywhere
│   ├── tokens/               # CSS variables (colors, spacing, typography, glass, paper, modes)
│   ├── typography/           # prose.css for rendered MDX
│   ├── primitives/           # reusable atoms (Expandable, QuirkyText, icons/)
│   └── chrome/               # site shell (Navbar, Logo, Footer, CustomCursor, Shortcuts, InitialAttrs)
│
├── features/                 # SUB-APP-SPECIFIC — private to each feature
│   └── portfolio/            # sections (Hero, Experience, Skills, Projects, Education, Contact),
│                             # PortfolioLayout, data.json
│
├── content/                  # typed content collections
│   ├── blog/                 # MDX posts
│   └── content.config.ts     # Zod schema for frontmatter
│
├── hooks/                    # shared hooks (useTheme, useShortcuts)
├── utils/                    # shared utilities (smoothScroll, copy, navigation, highlightMetrics, …)
├── types/                    # shared TS types
├── assets/                   # logos, avatar, resume + asset resolver
├── layouts/                  # BaseLayout.astro
└── pages/                    # routes (file-based)
    ├── index.astro           # portfolio at /
    ├── shortcuts.astro       # keyboard reference at /shortcuts
    ├── 404.astro             # fallback
    ├── blog/
    │   ├── index.astro       # post listing
    │   └── [...slug].astro   # individual post
    └── rss.xml.ts            # RSS feed
```

### Boundary rules

- `design/`, `hooks/`, `utils/`, `types/`, `assets/`, `layouts/` are universal.
  Any file may import from them.
- `features/<X>/` is **private to feature X**. No cross-feature imports.
  If two features need the same code, promote it to `design/primitives/`
  (UI) or `utils/` (logic).
- `content/` is data, not code. It is read by features and layouts, never
  the other way around.
- New shared code must justify its placement: tokens vs primitives vs
  chrome vs hooks vs utils. When unsure, ask in the PR description.

### Sub-app expansion

Adding a new sub-app (e.g. `/notes`, `/photos`, `/tools`):

1. Create `src/features/<name>/` for sub-app-specific code.
2. Create `src/pages/<name>/` for routes.
3. Reuse `design/` components and `layouts/BaseLayout.astro`.
4. If a sub-app needs its own layout, add `src/layouts/<Name>Layout.astro`
   that wraps `BaseLayout`.
5. Update navbar with a top-level link to the new sub-app.
6. **Never** import across features. Promote to `design/` if shared.

## Library policy

**UI components and styles: written from scratch. Always.** No exceptions.

Forbidden in this repo:

- Component libraries: shadcn/ui, Radix, Headless UI, Ariakit, MUI, Mantine,
  Chakra, Ant Design, NextUI, daisyUI, Park UI, Bootstrap.
- CSS frameworks: Tailwind, UnoCSS, Bootstrap CSS.
- Animation kits: Framer Motion, Motion One (use pure CSS + RAF).
- Pre-built site/blog templates from npm or starter repos.
- Icon libraries shipped as components: lucide-react, react-icons,
  heroicons-react, etc. (Custom SVGs in `public/icons.svg` or per-asset.)
- Tailwind plugins like `@tailwindcss/typography`.

**Allowed (these are framework / build / logic, not UI):**

- Astro and `@astrojs/*` integrations (`react`, `mdx`, `sitemap`, `rss`, `vercel`).
- Build-time markdown plugins: Shiki, `rehype-slug`, `rehype-autolink-headings`.
- Vendor SDKs: `@vercel/analytics`, `@vercel/speed-insights`.
- Small focused logic utilities for non-UI concerns (date formatting,
  slugifying, etc.) — pick the smallest dependency that does the job.

**Gray zone: ask before installing.** Default answer is "build it from
scratch." If a library saves significant non-UI work and adds <10KB
bundle weight, raise it explicitly with a justification.

## Accessibility — non-negotiable

1. **Semantic HTML first.** `<button>`, `<a>`, `<nav>`, `<main>`,
   `<article>`, `<section>` with proper headings. Never `<div onClick>`
   when a real element exists.
2. **Heading hierarchy.** Single `<h1>` per page. No skipped levels
   (`h2` → `h4` is a bug).
3. **Keyboard reachable.** Every interactive element reachable via Tab.
   No keyboard traps. Standard interaction patterns:
   - Button: Enter + Space activates
   - Link: Enter activates
   - Disclosure (Expandable): Enter/Space toggles, sets `aria-expanded`
   - Dialog: Escape closes, focus trapped, focus restored on close
4. **Visible focus.** `:focus-visible` styling preserved/enhanced. Never
   `outline: none` without an equivalent replacement.
5. **ARIA last resort.** Use only when semantic HTML cannot express
   the relationship: `aria-expanded`, `aria-controls`, `aria-label` for
   icon-only buttons, `aria-current="page"`, `aria-hidden="true"` for
   decorative content.
6. **Color contrast.** WCAG AA minimum: 4.5:1 body text, 3:1 large text.
   Verified in **both** light and dark themes.
7. **Reduced motion.** `prefers-reduced-motion: reduce` respected for
   every animation. No exceptions.
8. **Touch targets.** Minimum 44×44 CSS px for any tappable element.
9. **Alt text.** Meaningful images get descriptive `alt`. Decorative
   images (logos beside visible labels, ornamental SVGs) get `alt=""`.
10. **Skip link.** Preserved in BaseLayout.

## Performance — always

1. **Ship JS only when needed.** Default to no `client:*` directive.
   - `client:load` — only for above-the-fold interactivity (Navbar,
     CustomCursor).
   - `client:idle` — low-priority interactivity (Shortcuts).
   - `client:visible` — below-the-fold interactive (Expandable cards).
   - No directive — pure HTML, zero runtime JS.
2. **Build-time over runtime.** Pre-compute everything possible: RSS,
   sitemap, syntax highlighting, image optimization. The browser does
   as little as possible.
3. **No layout shift.** CLS target = 0. Reserve space for dynamic content.
4. **CSS over JS for animation.** Pure CSS transitions and
   `requestAnimationFrame` for scripted motion. No animation libraries.
5. **Image discipline.** Astro `<Image>` for raster (WebP/AVIF +
   responsive sizes). SVGs ship as-is.
6. **No render-blocking JS** in `<head>` except the inline FOUC-prevention
   script that sets `theme` / `data-paper` / `data-width` before paint.

## Imports

Use **path aliases for any cross-folder import.** Use relative `./` only
for same-folder imports (e.g. `./Foo.module.css`, sibling files).

Aliases (defined in `tsconfig.json` `paths`):

| Alias | Resolves to | Use for |
|---|---|---|
| `@design/*` | `src/design/*` | tokens, primitives, chrome (shared design system) |
| `@features/*` | `src/features/*` | sub-app-specific code |
| `@hooks/*` | `src/hooks/*` | shared React hooks |
| `@utils/*` | `src/utils/*` | shared utilities |
| `@type/*` | `src/types/*` | shared TS types (singular — `@types/*` collides with DefinitelyTyped) |
| `@layouts/*` | `src/layouts/*` | Astro layouts |
| `@assets` | `src/assets/index.ts` | the asset resolver |
| `@assets/*` | `src/assets/*` | individual asset files |
| `@content/*` | `src/content/*` | content collections |

**Why aliases over relatives:**

- Survive file moves — a feature relocating from `src/features/foo/` to
  somewhere deeper doesn't break its consumers.
- Self-documenting — `@features/portfolio/Foo` makes the boundary visible
  in every import line; `../../features/portfolio/Foo` does not.
- Pair with the architectural boundary rule: a feature importing
  `@features/<other>/...` is a violation visible at a glance.

**Same-folder imports stay relative** because `./Foo` is shorter and
clearer than aliasing your own neighbors.

## No magic values

If a value has meaning, it lives in a named constant. Period. Hardcoded
literals are violations whenever the same value could legitimately appear
twice, or whenever a future change should propagate. This applies to CSS
and TS/JS equally.

The token *name* is documentation: `--bp-medium` says what it is;
`1024px` does not. The only acceptable hardcode is a truly bespoke value
that would never repeat and wouldn't propagate on change — and even then,
a comment should justify it.

### CSS — design tokens

All tokens live in `src/design/tokens/`. When a value isn't in the
catalog, extend the appropriate file rather than introducing a literal.

| Category | Tokens | File |
|---|---|---|
| Colors | `--ink`, `--paper`, `--text`, `--text-secondary/muted/subtle`, `--accent`, `--accent-contrast`, `--surface-dark` | `tokens.css` |
| Spacing | `--space-0-5` through `--space-40` (4px-based, half-steps for fine alignment) | `tokens.css` |
| Durations | `--duration-fast` (150ms) through `--duration-slowest` (640ms) | `tokens.css` |
| Easings | `--ease-out`, `--ease-spring` | `tokens.css` |
| Radii | `--radius-sm/md/circle/pill` | `tokens.css` |
| z-index | `--z-navbar/skip-link/cursor` | `tokens.css` |
| Borders | `--border-hairline` | `tokens.css` |
| Shadows | `--shadow-sm/md/xl` | `tokens.css` |
| Glow / Glass | `--glow-sm`, `--glass-bar`, `--glass-scrim`, `--glass-blur` | `tokens.css` |
| Layout | `--content-max`, `--content-max-wide`, `--content-gutter` | `tokens.css` |
| Typography | `--text-xs` through `--text-xl`, `--weight-*`, `--leading-*`, `--tracking-*`, font families | `typography.css` |
| Breakpoints | `--bp-medium` (≤1024px), `--bp-narrow` (≤700px) | `breakpoints.css` |

**CSS modules + breakpoints:** each `.module.css` using `@media (--bp-X)`
must `@import '@design/tokens/breakpoints.css';` at the top. Lightning
CSS resolves `@custom-media` per compilation unit, so each consumer
needs the declarations in scope.

### TS/JS — named module constants

Single-file magic numbers → file-local `const` at module top. Cross-file
values → exported from `@utils/`. Existing examples:

- `@utils/smoothScroll.ts` exports `NAVBAR_OFFSET_PX` and the easing curve
  reused by every scripted scroll on the site.
- `@utils/copy.ts` owns the click-to-copy delegation and animation
  contract (`[data-copy]`, `[data-copied]`, `[data-fading]`) shared by
  the blog code blocks and the Contact section.
- `@utils/navigation.ts` exports the `SUB_APPS` list consumed by the
  Navbar.
- `Logo.tsx` declares `HOLD_MS`, `HOLD_MOVE_THRESHOLD_PX` (file-local).
- `CustomCursor.tsx` declares `BASE_SIZE`, `HOVER_SIZE`, `LERP_FACTOR`
  (file-local).

### Magic strings

Storage keys, attribute names, event names get constants too.

## Code style

1. **CSS Modules colocated** with components: `Component.tsx` next to
   `Component.module.css` in the same folder.
2. **No magic values** — see the section above.
3. **TypeScript strict.** No `any`. No `as` casts unless a comment
   explains why. Preserve `verbatimModuleSyntax` and use `import type`
   for type-only imports.
4. **Functional components only.** No class components.
5. **`useSyncExternalStore`** for any cross-component reactive state.
   Module-level stores for global state (the `useTheme` pattern).
6. **Comments explain *why*, never *what*.** Match the voice of existing
   comments — short, surface trade-offs and constraints, link to context
   when relevant.
7. **No barrel files** (`index.ts` re-exports) unless they earn their
   place. `src/assets/index.ts` is the only legitimate exception.
8. **Long, descriptive names** over short ones. `currentSectionIndex`,
   not `cs`. Clarity over keystrokes.
9. **No dead code.** No commented-out blocks. No leftover `console.log`.
   No bare `TODO` — include an actual plan or remove the comment.

## Astro specifics

1. **`.astro` frontmatter runs at build time only.** If something looks
   like it needs runtime data in the frontmatter, that is a bug — move
   it into a React island.
2. **Every `client:*` directive needs a justification** — either
   obviously interactive (Navbar) or commented for subtle cases.
3. **MDX content inherits the design system.** Blog post styling lives
   in `design/typography/prose.css`, not as one-off overrides per post.
4. **No bare `window` / `document` access** inside `.astro` frontmatter
   or unguarded React render bodies. Use `typeof window !== 'undefined'`
   guards or move into `useEffect`.
5. **Per-page metadata** flows through `BaseLayout` props
   (`title`, `description`, `canonical`, `ogImage`, optional `article`).
   Never inline `<meta>` tags ad hoc.

## Quality gates — every commit

- `npm run lint` — clean.
- `npm run check` (Astro type-check) — clean.
- `npm run build` — succeeds.
- Manual smoke test via `npm run preview` for any UI-affecting change:
  click through, verify keyboard shortcuts, verify theme toggle, verify
  no FOUC on dark-preference users.

## Commit conventions

- **Conventional Commits**: `<type>(<scope>): <imperative summary>`.
- **One-line subject.** No body, no bullet lists, no `Co-Authored-By`
  trailer.
- **Imperative mood**, lowercase, no trailing period.
- **Granular commits** — split distinct concerns into separate commits.
- **Subject ≤ 72 chars.**

Types in use: `feat`, `fix`, `refactor`, `perf`, `style`, `content`,
`docs`, `chore`.

Examples:

- `feat(blog): add post listing page with tag filters`
- `refactor(design): move tokens from styles/ to design/tokens/`
- `fix(hero): randomize tagline pick on client mount`
- `perf(navbar): debounce scroll-spy observer`

## Working with this repo

- **Read this file first.** Then read the closest module-level docs if
  they exist.
- **Match existing patterns** before inventing new ones. If `Expandable`
  solves a similar problem, extend it; don't write a parallel component.
- **Flag deviations.** If a task can't follow this charter, raise it
  explicitly in the PR or chat — don't silently bend a rule.
- **Small, reviewable PRs.** One concern per PR. The migration is the
  exception (cohesive framework swap), not the rule.
