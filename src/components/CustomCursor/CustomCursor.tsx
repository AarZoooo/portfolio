import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const canHover = window.matchMedia('(hover: hover)').matches
        if (!canHover) return

        document.documentElement.classList.add(styles.hideNative)

        const BASE_SIZE = 32
        const HOVER_SIZE = 52

        let raf = 0
        let tx = -9999
        let ty = -9999
        let rx = -9999
        let ry = -9999
        let size = BASE_SIZE
        let hovering = false

        const dot = dotRef.current
        const ring = ringRef.current

        const tick = () => {
            rx += (tx - rx) * 0.18
            ry += (ty - ry) * 0.18
            const target = hovering ? HOVER_SIZE : BASE_SIZE
            size += (target - size) * 0.18
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

        const onOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null
            if (t && t.closest('a, button, [role="button"]')) hovering = true
        }

        const onOut = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null
            if (t && t.closest('a, button, [role="button"]')) hovering = false
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
