import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const nibRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const canHover = window.matchMedia('(hover: hover)').matches
        if (!canHover) return

        document.documentElement.classList.add(styles.hideNative)

        const BASE_SIZE = 32
        const HOVER_SIZE = 52
        const LERP_FACTOR = 0.18

        let raf = 0
        let tx = -9999
        let ty = -9999
        let rx = -9999
        let ry = -9999
        let size = BASE_SIZE
        let hovering = false

        const dot = dotRef.current
        const ring = ringRef.current
        const nib = nibRef.current

        const tick = () => {
            rx += (tx - rx) * LERP_FACTOR
            ry += (ty - ry) * LERP_FACTOR
            const target = hovering ? HOVER_SIZE : BASE_SIZE
            size += (target - size) * LERP_FACTOR
            if (dot) dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`
            if (ring) {
                ring.style.width = `${size}px`
                ring.style.height = `${size}px`
                ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
            }
            // Anchor the nib's tip (top-center) at the cursor; rotate slightly
            // anti-clockwise so the body angles down-right like a held pen.
            // CSS .nib transform-origin pins the pivot at the tip.
            if (nib)
                nib.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, 0) rotate(-20deg)`
            raf = requestAnimationFrame(tick)
        }

        const onMove = (e: MouseEvent) => {
            tx = e.clientX
            ty = e.clientY
        }

        const isInteractive = (t: HTMLElement | null) =>
            !!t && !!t.closest('a, button, [role="button"]')

        const onOver = (e: MouseEvent) => {
            if (isInteractive(e.target as HTMLElement | null)) {
                hovering = true
                document.documentElement.setAttribute('data-cursor-hover', '')
            }
        }

        const onOut = (e: MouseEvent) => {
            if (isInteractive(e.target as HTMLElement | null)) {
                hovering = false
                document.documentElement.removeAttribute('data-cursor-hover')
            }
        }

        window.addEventListener('mousemove', onMove)
        document.addEventListener('mouseover', onOver)
        document.addEventListener('mouseout', onOut)
        raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onOver)
            document.removeEventListener('mouseout', onOut)
            document.documentElement.removeAttribute('data-cursor-hover')
            document.documentElement.classList.remove(styles.hideNative)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className={styles.dot} aria-hidden />
            <div ref={ringRef} className={styles.ring} aria-hidden />
            <div ref={nibRef} className={styles.nib} aria-hidden>
                {/* Tip at top (writing point), neck at bottom. CSS fills the
                    body and inverts the slit + breather on [data-cursor-hover]. */}
                <svg viewBox="0 0 18 40" width="13" height="28" strokeLinecap="round" strokeLinejoin="round">
                    <path
                        className={styles.nibBody}
                        d="M9 1 L17 24 L9 39 L1 24 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />
                    <line
                        className={styles.nibDetail}
                        x1="9" y1="5" x2="9" y2="22"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                    <circle
                        className={styles.nibDetail}
                        cx="9" cy="25" r="1.6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>
            </div>
        </>
    )
}

export default CustomCursor
