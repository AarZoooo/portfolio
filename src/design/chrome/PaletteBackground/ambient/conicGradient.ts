/** Sample an image's four edge colors and return a conic-gradient
 * that extends them outward (ambient light). Each edge's average
 * color sits at its side of the gradient; the blur on the ambient
 * layer softens the transitions.
 *
 * This is the conic-gradient ambient strategy. To swap in a
 * different strategy (e.g. an animated mesh gradient), create a
 * sibling module in this directory and change the import in
 * PaletteBackground.tsx. */
export function sampleAmbientGradient(url: string): Promise<string | null> {
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
