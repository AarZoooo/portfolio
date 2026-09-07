/** Ordered palettes. The first two are the monochromes (tap `t`
 * toggles between them; hold `t` advances by one). Add a colored
 * palette by appending an entry here and creating its color block in
 * src/design/tokens/palettes/<name>.css (imported from
 * src/design/tokens/index.css).
 *
 * `mode` classifies the palette as light or dark; set site-wide via
 * the `data-mode` attribute on <html> (see InitialAttrs.astro).
 * Drives Shiki code-theme and any light/dark-aware styling.
 *
 * `hero` is an optional asset key (basename of a file in
 * src/assets/hero/); null means the typographic hero, no image.
 *
 * `imageMode` is 'fill' (cover, crops) or 'fit' (contain, no crop).
 * `imagePosition` anchors the image: one of the 9 positions
 * (top-left, top-center, top-right, center-left, center,
 * center-right, bottom-left, bottom-center, bottom-right).
 *
 * `font` is an optional font family name. null inherits the default
 * (IBM Plex). To wire a custom font: drop the woff2 in
 * src/assets/fonts/, declare @font-face for it (in a new
 * src/design/tokens/fonts.css imported from index.css), and override
 * --font-sans in the palette's :root[data-palette="..."] block.
 * The browser only fetches the file when the palette is active, so
 * unused palette fonts cost nothing. */
export const PALETTES = [
    { name: 'monochrome-light', mode: 'light', hero: null, font: null, imageMode: 'fit', imagePosition: 'center' },
    { name: 'monochrome-dark', mode: 'dark', hero: null, font: null, imageMode: 'fit', imagePosition: 'center' },
    { name: 'meddle', mode: 'dark', hero: 'meddle', font: null, imageMode: 'fit', imagePosition: 'center' },
    { name: 'utopia', mode: 'dark', hero: 'utopia', font: null, imageMode: 'fit-width', imagePosition: 'bottom-center' },
] as const

export type PaletteName = (typeof PALETTES)[number]['name']
export type ImageMode = 'fit' | 'fill' | 'fit-width' | 'fit-height'
export type ImagePosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'center-left'
    | 'center'
    | 'center-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'

/** Default palette when no stored preference. */
export const DEFAULT_PALETTE: PaletteName = 'monochrome-light'
