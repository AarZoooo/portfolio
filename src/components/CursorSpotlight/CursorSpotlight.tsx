import { useEffect, useRef } from 'react'
import styles from './CursorSpotlight.module.css'

function CursorSpotlight() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const canHover = window.matchMedia('(hover: hover)').matches
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!canHover || reduced) return

        let raf = 0
        let tx = -9999
        let ty = -9999
        let cx = -9999
        let cy = -9999
        let visible = false

        const tick = () => {
            cx += (tx - cx) * 0.2
            cy += (ty - cy) * 0.2
            el.style.setProperty('--mx', `${cx}px`)
            el.style.setProperty('--my', `${cy}px`)
            raf = requestAnimationFrame(tick)
        }

        const onMove = (e: MouseEvent) => {
            if (!visible) {
                cx = tx = e.clientX
                cy = ty = e.clientY
                el.style.opacity = '1'
                visible = true
            } else {
                tx = e.clientX
                ty = e.clientY
            }
        }

        const onLeave = () => {
            el.style.opacity = '0'
            visible = false
        }

        window.addEventListener('mousemove', onMove)
        document.addEventListener('mouseleave', onLeave)
        raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseleave', onLeave)
        }
    }, [])

    return <div ref={ref} className={styles.spotlight} aria-hidden />
}

export default CursorSpotlight
