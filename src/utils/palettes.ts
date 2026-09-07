/** Ordered palettes. The first two are the monochromes (tap `t`
 * toggles between them; hold `t` advances by one). Add a colored
 * palette by appending an entry here and creating its color block in
 * src/design/tokens/palettes/<name>.css (imported from
 * src/design/tokens/index.css).
 *
 * `hero` is an optional asset key (basename of a file in
 * src/assets/hero/); null means the typographic hero, no image.
 *
 * `font` is an optional font family name. null inherits the default
 * (IBM Plex). To wire a custom font: drop the woff2 in
 * src/assets/fonts/, declare @font-face for it (in a new
 * src/design/tokens/fonts.css imported from index.css), and override
 * --font-sans in the palette's :root[data-palette="..."] block.
 * The browser only fetches the file when the palette is active, so
 * unused palette fonts cost nothing. */
export const PALETTES = [
    { name: 'monochrome-light', hero: null, font: null },
    { name: 'monochrome-dark', hero: null, font: null },
    { name: 'meddle', hero: 'meddle', font: null },
] as const

export type PaletteName = (typeof PALETTES)[number]['name']

/** Default palette when no stored preference. */
export const DEFAULT_PALETTE: PaletteName = 'monochrome-light'
