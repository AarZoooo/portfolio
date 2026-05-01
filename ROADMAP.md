# Roadmap

Open work for aarju.dev. Delete a line when it's done; no check marks, no
"DONE" prefixes. The doc shrinks as work lands.

## Soon

- Submit sitemap to Google Search Console (`https://aarju.dev/sitemap-index.xml`)

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
  - Storage decision pending: stay git-backed via the GitHub API, or
    attach a DB (free tiers like Supabase / Neon / Turso). Either works;
    pick when scope is clearer.
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

## Skip unless needed

- Web app manifest / PWA install banner.
- `twitter:site` meta — only if a Twitter handle gets adopted.
