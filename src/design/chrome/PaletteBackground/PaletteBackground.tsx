import { useEffect, useState } from 'react'
import { PALETTES } from '@utils/palettes'
import { sampleAmbientGradient } from './ambient/conicGradient'
import styles from './PaletteBackground.module.css'

interface PaletteBackgroundProps {
    /** Build-time map of palette name -> hero image URL. */
    heroImages?: Record<string, string>
}

/** Map the 9-position kebab-case to a CSS background-position value. */
function toBackgroundPosition(pos: string): string {
    return pos.replace('-', ' ')
}

/** Map the image mode to a CSS background-size value. */
const IMAGE_SIZE: Record<string, string> = {
    fit: 'contain',
    fill: 'cover',
    'fit-width': '100% auto',
    'fit-height': 'auto 100%',
}

/** Fixed full-viewport backdrop. Renders one layer per palette that
 * has a hero image; CSS shows the active palette's layer (the
 * visibility rule lives in each palette CSS file). No runtime
 * palette lookup, so SSR and client render the same DOM
 * (no hydration mismatch). The ambient is a conic-gradient sampled
 * from the image's edge colors, extended outward. */
export default function PaletteBackground({ heroImages }: PaletteBackgroundProps) {
    const [ambientGradients, setAmbientGradients] = useState<Record<string, string>>({})

    useEffect(() => {
        for (const p of PALETTES) {
            const url = heroImages?.[p.name]
            if (!url) continue
            sampleAmbientGradient(url).then((gradient) => {
                if (gradient) setAmbientGradients((prev) => ({ ...prev, [p.name]: gradient }))
            })
        }
    }, [heroImages])

    return (
        <div className={styles.bg} aria-hidden>
            {PALETTES.map((p) => {
                const url = heroImages?.[p.name]
                if (!url) return null
                const position = toBackgroundPosition(p.imagePosition)
                const ambientGradient = ambientGradients[p.name]
                return (
                    <div key={p.name} className="palette-bg-layer" data-palette={p.name}>
                        <div
                            className={styles.ambient}
                            style={{ backgroundImage: ambientGradient, backgroundPosition: position }}
                        />
                        <div
                            className={styles.image}
                            style={{
                                backgroundImage: `url(${url})`,
                                backgroundSize: IMAGE_SIZE[p.imageMode],
                                backgroundPosition: position,
                                filter: p.blur === false ? 'none' : undefined,
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}
