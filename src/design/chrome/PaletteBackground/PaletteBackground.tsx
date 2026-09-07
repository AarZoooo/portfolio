import { PALETTES } from '@utils/palettes'
import styles from './PaletteBackground.module.css'

interface PaletteBackgroundProps {
    /** Build-time map of palette name -> hero image URL. */
    heroImages?: Record<string, string>
}

/** Fixed full-viewport backdrop. Renders one layer per palette that
 * has a hero image; CSS shows the active palette's layer (the
 * visibility rule lives in each palette CSS file). No runtime
 * palette lookup, so SSR and client render the same DOM
 * (no hydration mismatch). */
export default function PaletteBackground({ heroImages }: PaletteBackgroundProps) {
    return (
        <div className={styles.bg} aria-hidden>
            {PALETTES.map((p) => {
                const url = heroImages?.[p.name]
                if (!url) return null
                return (
                    <div key={p.name} className="palette-bg-layer" data-palette={p.name}>
                        <div className={styles.ambient} style={{ backgroundImage: `url(${url})` }} />
                        <div className={styles.image} style={{ backgroundImage: `url(${url})` }} />
                    </div>
                )
            })}
        </div>
    )
}
