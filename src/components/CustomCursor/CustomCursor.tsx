import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

export type CursorVariant = 0 | 1 | 2 | 3

interface CustomCursorProps {
    variant: CursorVariant
}

function CustomCursor({ variant }: CustomCursorProps) {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (variant === 0) {
            document.documentElement.classList.remove(styles.hideNative)
            return
        }
        const canHover = window.matchMedia('(hover: hover)').matches
        if (!canHover) return

        document.documentElement.classList.add(styles.hideNative)

        let raf = 0
        let tx = -9999
        let ty = -9999
        let rx = -9999
        let ry = -9999
        let scale = 1
        let targetScale = 1
        let hovering = false

        const dot = dotRef.current
        const ring = ringRef.current

        const tick = () => {
            rx += (tx - rx) * 0.18
            ry += (ty - ry) * 0.18
            targetScale = hovering ? 1.6 : 1
            scale += (targetScale - scale) * 0.18
            if (dot) dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`
            if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`
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
    }, [variant])

    if (variant === 0) return null

    return (
        <>
            {(variant === 1 || variant === 2) && <div ref={dotRef} className={styles.dot} aria-hidden />}
            {(variant === 1 || variant === 3) && <div ref={ringRef} className={styles.ring} aria-hidden />}
        </>
    )
}

export default CustomCursor
