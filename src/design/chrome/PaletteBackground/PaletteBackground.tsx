import { useTheme } from '@hooks/useTheme'
import styles from './PaletteBackground.module.css'

interface PaletteBackgroundProps {
    /** Build-time map of palette name -> hero image URL. The active
     *  palette is picked at runtime so cycling palettes swaps the image. */
    heroImages?: Record<string, string>
}

/** Fixed full-viewport backdrop that renders the active palette's hero
 *  image (ambient gradient + fit image) behind all page content.
 * Stays put on scroll. No image when the active palette has no hero. */
export default function PaletteBackground({ heroImages }: PaletteBackgroundProps) {
    const { palette } = useTheme()
    const image = heroImages?.[palette]

    if (!image) return null

    return (
        <div className={styles.bg} aria-hidden>
            <div className={styles.ambient} style={{ backgroundImage: `url(${image})` }} />
            <div className={styles.image} style={{ backgroundImage: `url(${image})` }} />
        </div>
    )
}
