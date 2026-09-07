# Roadmap

Open work for aarju.dev. Delete a line when it's done; no check marks, no
"DONE" prefixes. The doc shrinks as work lands.

## Performance

- Self-host IBM Plex (separate `perf-fonts` branch). Drops Google Fonts as a
  render-blocking dep; mobile Lighthouse 90 → 95+. ~45 min.

## Authoring & content

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
- Mini music player (custom island, hotkeys, curated playlist,
  track-driven palette sync via `setPalette`).

## Skip unless needed

- Web app manifest / PWA install banner.
- `twitter:site` meta — only if a Twitter handle gets adopted.
