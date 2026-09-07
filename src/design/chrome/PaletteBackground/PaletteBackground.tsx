import { PALETTES } from '@utils/palettes'
import styles from './PaletteBackground.module.css'

interface PaletteBackgroundProps {
    /** Build-time map of palette name -> hero image URL. */
    heroImages?: Record<string, string>
}

/** Map the 9-position kebab-case to a CSS background-position value. */
function toBackgroundPosition(pos: string): string {
    return pos.replace('-', ' ')
}

/** Fixed full-viewport backdrop. Renders one layer per palette that
 * has a hero image; CSS shows the active palette's layer (the
 * visibility rule lives in each palette CSS file). No runtime
 * palette lookup, so SSR and client render the same DOM
 * (no hydration mismatch). Each palette's imageMode and imagePosition
 * control how the fit image is sized and anchored. */
export default function PaletteBackground({ heroImages }: PaletteBackgroundProps) {
    return (
        <div className={styles.bg} aria-hidden>
            {PALETTES.map((p) => {
                const url = heroImages?.[p.name]
                if (!url) return null
                const position = toBackgroundPosition(p.imagePosition)
                return (
                    <div key={p.name} className="palette-bg-layer" data-palette={p.name}>
                        <div
                            className={styles.ambient}
                            style={{ backgroundImage: `url(${url})`, backgroundPosition: position }}
                        />
                        <div
                            className={styles.image}
                            style={{
                                backgroundImage: `url(${url})`,
                                backgroundSize: p.imageMode === 'fill' ? 'cover' : 'contain',
                                backgroundPosition: position,
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}
