/** Ordered palettes. The first two are the monochromes (tap `t`
 *  toggles between them; hold `t` advances by one). Add a colored
 * palette by appending an entry here and defining its colors in
 * tokens.css. `hero` is an optional asset key (basename of a file in
 * src/assets/hero/); null means the typographic hero, no image. */
export const PALETTES = [
    { name: 'monochrome-light', hero: null },
    { name: 'monochrome-dark', hero: null },
] as const

export type PaletteName = (typeof PALETTES)[number]['name']

/** Default palette when no stored preference. */
export const DEFAULT_PALETTE: PaletteName = 'monochrome-light'
