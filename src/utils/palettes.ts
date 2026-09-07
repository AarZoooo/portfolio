/** Ordered palette names. The first two are the monochromes (tap `t`
 *  toggles between them; hold `t` advances by one). Add colored palettes
 *  by appending names here and defining their colors in tokens.css. */
export const PALETTES = ['monochrome-light', 'monochrome-dark'] as const

export type PaletteName = (typeof PALETTES)[number]

/** Default palette when no stored preference. */
export const DEFAULT_PALETTE: PaletteName = 'monochrome-light'
