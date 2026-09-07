# TODO List

Items to take up on this project, categorized as P0 (breaking) to P3 (nits).

## P0 - Breaking

None.

## P1 - Should fix

- [ ] Remove paper theme (major refactor). Delete `src/design/tokens/paper.css`,
  the `data-paper` attribute (`InitialAttrs.astro`, `BaseLayout.astro`),
  `paper` / `togglePaper` in `useTheme`, the `p` case in `useShortcuts`, the
  long-press gesture in `Logo.tsx` (exists only to toggle paper), the nib
  cursor in `CustomCursor.tsx` + its `:global([data-paper])` CSS, all
  `:global([data-paper])` / `--noise` references in `Navbar.module.css`,
  `Footer.module.css`, `globals.css`, and the `p` row + touch-note in
  `shortcuts.astro`. Cursor keeps dot+ring only.
- [ ] Validate `data.json` with a Zod schema (mirror `content.config.ts`),
  parse once, export typed. Removes the `data as PortfolioData` cast
  repeated in 7 files (`BaseLayout`, `index`, `blog/index`, `blog/[...slug]`,
  `shortcuts`, `404`, `resume`). Catches type/JSON drift.
- [ ] Add focus trap + focus restore to the Navbar mobile menu dialog
  (`Navbar.tsx`). `role="dialog" aria-modal="true"` is set but Escape/backdrop
  are the only close paths; Tab can leave the dialog, focus isn't returned to
  the hamburger. Closes the biggest gap vs the a11y spec in `AGENTS.md`.
- [ ] Bump Navbar hamburger + theme toggle hit area to 44×44 (currently
  `--space-7` = 28px). Either resize or add invisible padding. Violates
  `AGENTS.md` rule 8.

## P2 - Nice to have

- [ ] Promote `stripProtocol` + `mapsUrl` to `@utils/` (currently duplicated
  in `Contact.tsx` and `resume.astro`).
- [ ] Surface or remove `Project.github` / `Project.live` in
  `src/types/portfolio.ts`. Defined but never rendered in `Projects.tsx`.
- [ ] Consider a shared `WorkCard` primitive in `design/primitives/` to
  collapse the ~90% overlap between `Experience.Item` and `Projects.Item`.
- [ ] Group experience by employer across all surfaces (frontend-only).
  Promote `resume.astro`'s `experienceGroups` logic into
  `@utils/groupByEmployer.ts`, consume in the `Experience` section.
  Data stays flat in `data.json`; grouping is a pure transform. Bundle
  with the `WorkCard` primitive above.
- [ ] Replace `NodeJS.Timeout` with `ReturnType<typeof setTimeout>` in
  `Hero.tsx` (browser code; only type-checks because `@types/node` is
  installed). Also add a `cancelled` flag so the recursive `rotateTagline`
  can't setState on an unmounted component.
- [ ] Add `vitest` + unit tests for pure utils: `easeInOutCubic`,
  `highlightMetrics`, `techLine`, `withBuildDate`. Locks the math and
  regex against regressions.

## P3 - Nits

- [ ] Enable `verbatimModuleSyntax` in `tsconfig.json`. Claimed in
  `AGENTS.md` but not configured; code uses `import type` by convention only.
- [ ] Use `aria-current="location"` instead of `"true"` for scroll-spy
  section links in `Navbar.tsx`. `"location"` is the semantically correct
  token for in-page navigation.
- [ ] Extract the ~150-line inline script in `blog/[...slug].astro` into
  `@utils/blogPost.ts` for testability.
- [ ] Blog TOC `details`: `syncWideOpen` sets `open` on wide match but
  never removes it on resize back to narrow. Disclosure stays open.
- [ ] Comment the `g`→`G` edge case in `useShortcuts.ts` (lowercase check
  in the `pendingLeader === 'g'` branch swallows shift-G).
- [ ] Document the `~~strikethrough~~` tagline syntax (used in `Footer.tsx`).
- [ ] Comment why `astro.config.mjs` has `webAnalytics: { enabled: false }`
  while `@vercel/analytics` is manually injected in `BaseLayout`.
- [ ] Visual effects (TBD, design in progress).
- [ ] Blog writer + DB-backed blog content (deferred until 3+ posts and
  real writing friction). Blog-only on Turso (libSQL); `data.json` stays
  git-backed. Single-user auth via env-var session token + Vercel
  password protection. Not started.
