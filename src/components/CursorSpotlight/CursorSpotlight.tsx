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
        let tx = 0
        let ty = 0
        let cx = 0
        let cy = 0
        let visible = false

        const tick = () => {
            cx += (tx - cx) * 0.2
            cy += (ty - cy) * 0.2
            el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
            raf = requestAnimationFrame(tick)
        }

        const onMove = (e: MouseEvent) => {
            tx = e.clientX
            ty = e.clientY
            if (!visible) {
                el.style.opacity = '1'
                visible = true
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
