# Roadmap

Open work for aarju.dev, by priority. Delete a line when it ships.

## P0 — bugs

- Teal bleeds into every custom palette except light/dark; find the
  hardcoded source and token-ize it.
- Resume page text invisible on custom palettes; the resume component
  should pin its own colors and ignore the palette.

## P1 — now

- Remove the scroll text-cum-button: component, styles, hint rotation,
  `data.json` entries, any scroll logic only it uses.
- Blog polish: entry separators use lowest text color (not accent);
  code blocks more opaque; proper light/dark code block variants.
- Item-ized per-company experience entries from the résumé, modeled once
  in `data.json`, reused site-wide (home, /resume).

## P2 — next

- Client-side navigation (Astro ClientRouter) so music survives page
  changes. Prerequisite for the player.
- Music player: sticky bottom island, hotkeys, curated playlist,
  track-driven palette sync.
- More palettes.
- Self-host IBM Plex (drops render-blocking Google Fonts).

## P3 — later

- Navbar redesign for multi-sub-app navigation.
- First real blog post.
- Visual experiments behind `data-*` attrs (off by default): dot matrix
  texture + cursor brightening; velvet ribbon gradient.

## P4 — someday

- Self-hosted admin UI (auth, MDX editor, data.json editor, Turso for
  posts). Defer until 3+ posts and real writing friction.
- Blog: tag pages (3+ posts share tags), pagefind search (5+ posts),
  per-post OG images, giscus, newsletter.
- Web app manifest / PWA; `twitter:site` meta.
