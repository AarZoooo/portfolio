import { useEffect, useState } from 'react'
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

/** Map the image mode to a CSS background-size value. */
const IMAGE_SIZE: Record<string, string> = {
    fit: 'contain',
    fill: 'cover',
    'fit-width': '100% auto',
    'fit-height': 'auto 100%',
}

/** Sample an image's four edge colors and return a conic-gradient
 * that extends them outward (ambient light). Each edge's average
 * color sits at its side of the gradient; the blur on the ambient
 * layer softens the transitions. */
function sampleAmbientGradient(url: string): Promise<string | null> {
    return new Promise((resolve) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = url
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (!ctx) { resolve(null); return }
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            const avg = (data: Uint8ClampedArray) => {
                let r = 0, g = 0, b = 0, n = 0
                for (let i = 0; i < data.length; i += 4) {
                    r += data[i]; g += data[i + 1]; b += data[i + 2]; n++
                }
                return `rgb(${Math.round(r / n)} ${Math.round(g / n)} ${Math.round(b / n)})`
            }
            const top = avg(ctx.getImageData(0, 0, img.width, 1).data)
            const bottom = avg(ctx.getImageData(0, img.height - 1, img.width, 1).data)
            const left = avg(ctx.getImageData(0, 0, 1, img.height).data)
            const right = avg(ctx.getImageData(img.width - 1, 0, 1, img.height).data)
            resolve(`conic-gradient(from 0deg at center, ${top}, ${right}, ${bottom}, ${left}, ${top})`)
        }
        img.onerror = () => resolve(null)
    })
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
