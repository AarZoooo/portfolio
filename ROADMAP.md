# Roadmap

Open work for aarju.dev. Delete a line when it's done; no check marks, no
"DONE" prefixes. The doc shrinks as work lands.

## Soon

- Tag the launch: `git tag -a v2-astro -m "Astro migration shipped" && git push --tags`
- Submit sitemap to Google Search Console (`https://aarju.dev/sitemap-index.xml`)
- Delete stale local branches: `git branch -D paperize webapp_v2`

## Performance

- Self-host IBM Plex (separate `perf-fonts` branch). Drops Google Fonts as a
  render-blocking dep; mobile Lighthouse 90 → 95+. ~45 min.

## Authoring & content

- Build a publishing UI so blog posts don't require `git commit && git push`
  (markdown editor + live preview + publish to repo).
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
