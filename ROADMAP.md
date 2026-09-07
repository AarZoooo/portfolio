# Roadmap

Open work for aarju.dev. Delete a line when it's done; no check marks, no
"DONE" prefixes. The doc shrinks as work lands.

## Bugs

- Teal color bleeding into every custom palette except light and dark.
  Hunt down the source (likely a hardcoded value outside the palette
  files, or a token the palettes fail to override) and token-ize it.
- Resume page text invisible on custom palettes. The resume component
  should ignore palette colors and use its own fixed colors so it renders
  like a document regardless of the active palette.

## Performance

- Self-host IBM Plex (separate `perf-fonts` branch). Drops Google Fonts as a
  render-blocking dep; mobile Lighthouse 90 → 95+. ~45 min.

## Cleanup

- Remove the scroll text-cum-button and everything that goes with it,
  including the rotating hint text. Rip out the component, its styles,
  its data.json entries, and any shortcut/scroll logic that only it uses.

## Authoring & content

- Item-ized experience entries per company, sourced from the résumé.
  Model them once in `data.json` and reuse site-wide: homepage Experience
  section, `/resume`, anywhere else experience shows up.
- Build a self-hosted admin UI for the site. Hand-rolled (matches the rest
  of the codebase — no Decap / Tina / vendored CMS). Scope:
  - Auth (own implementation, single-user).
  - Markdown editor with live preview for blog posts; publish flow lands
    them in `src/content/blog/`.
  - Edit profile content (`data.json`): bio, taglines, experience,
    projects, skills, contact links, footer.
  - Replace the résumé PDF.
  - Storage: blog content on Turso (libSQL); `data.json` stays
    git-backed. Deferred until 3+ posts and real writing friction.
- Write the first real blog post.

## Blog polish

- Separators between blog entries should use the lowest text color, not
  the palette accent.
- Code snippet blocks are too transparent; bump the opacity.
- Code snippet blocks need proper light and dark variants instead of one
  treatment for both.

## Blog features (defer until they earn their place)

- Tag pages at `/blog/tags/[tag]` — once 3+ posts share tags.
- Search via pagefind — once 5+ posts.
- Per-post OG image generation — when posts start getting shared.
- giscus comments — only if discussion is wanted.
- Newsletter signup (buttondown) — past ~10 posts with recurring readers.

## Site chrome

- Navbar redesign for multi-sub-app navigation. Separate branch when the
  shape of additional sub-apps is clear.

## Visual / creative

Sequenced as togglable experiments behind `data-*` attributes (off by
default) so the live site stays clean while evaluating. Palette system is
the keystone; music player depends on it.

- Dot matrix texture + cursor brightening (CSS dot grid + one rAF
  glow div merged into CustomCursor).
- Velvet ribbon gradient (soft diagonal `body::before`, ~3-5% alpha).
- Color supplier + custom palettes (extend `useTheme` with a palette
  axis, `data-palette` attr, WCAG AA validated at build).
- Add more palettes to the list.
- Client-side page navigation (Astro ClientRouter / view transitions) so
  the music player survives navigation without a full refresh. Prerequisite
  for the player.
- Music player UI as a sticky bottom component (custom island, hotkeys,
  curated playlist, track-driven palette sync via `setPalette`).

## Skip unless needed

- Web app manifest / PWA install banner.
- `twitter:site` meta — only if a Twitter handle gets adopted.
