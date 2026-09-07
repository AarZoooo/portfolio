import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

/* Ring diameter at rest (matches --space-8 in the CSS module). */
const BASE_SIZE = 32
const HOVER_SIZE = 52
const LERP_FACTOR = 0.18
/* Parked offscreen until the first mousemove (matches the CSS module). */
const OFFSCREEN_POSITION = -9999

function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const canHover = window.matchMedia('(hover: hover)').matches
        // The custom cursor is decorative lerp motion; under reduced
        // motion we keep the native cursor instead of trailing a ring.
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!canHover || reducedMotion) return

        document.documentElement.classList.add(styles.hideNative)

        let raf = 0
        let tx = OFFSCREEN_POSITION
        let ty = OFFSCREEN_POSITION
        let rx = OFFSCREEN_POSITION
        let ry = OFFSCREEN_POSITION
        let size = BASE_SIZE
        let hovering = false

        const dot = dotRef.current
        const ring = ringRef.current

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
            raf = requestAnimationFrame(tick)
        }

        const onMove = (e: MouseEvent) => {
            tx = e.clientX
            ty = e.clientY
        }

        const isInteractive = (t: HTMLElement | null) =>
            !!t && !!t.closest('a, button, [role="button"]')

        const onOver = (e: MouseEvent) => {
            // MouseEvent.target is EventTarget | null; we need Element APIs
            if (isInteractive(e.target as HTMLElement | null)) {
                hovering = true
            }
        }

        const onOut = (e: MouseEvent) => {
            if (isInteractive(e.target as HTMLElement | null)) { // same narrowing as onOver
                hovering = false
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
            document.documentElement.classList.remove(styles.hideNative)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className={styles.dot} aria-hidden />
            <div ref={ringRef} className={styles.ring} aria-hidden />
        </>
    )
}

export default CustomCursor
