import { useRef, useState } from 'react'
import styles from './Logo.module.css'

interface LogoProps {
    /** Current page path. Used to render the route slug after the brand. */
    currentPath: string
}

/** Long-press on the brand toggles paper mode. Discoverable on touch where
 *  the keyboard `p` shortcut isn't reachable. Tuned so a normal tap → click
 *  navigates home, only a deliberate hold (>= HOLD_MS without moving) fires. */
const HOLD_MS = 600
const HOLD_MOVE_THRESHOLD_PX = 10

/**
 * Brand wordmark. The path slug after the brand is rendered as one link
 * per segment, each routing to its cumulative path — so the breadcrumb
 * is genuinely navigable, not just decorative.
 */
export default function Logo({ currentPath }: LogoProps) {
    const segments = currentPath === '/' ? [] : currentPath.split('/').filter(Boolean)

    const [pressing, setPressing] = useState(false)
    const pressTimer = useRef<number | null>(null)
    const pressStart = useRef<{ x: number; y: number } | null>(null)
    const firedRef = useRef(false)

    const cancelPress = () => {
        if (pressTimer.current !== null) {
            window.clearTimeout(pressTimer.current)
            pressTimer.current = null
        }
        setPressing(false)
        pressStart.current = null
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLAnchorElement>) => {
        firedRef.current = false
        pressStart.current = { x: e.clientX, y: e.clientY }
        setPressing(true)
        pressTimer.current = window.setTimeout(() => {
            const root = document.documentElement
            const next = root.getAttribute('data-paper') === 'on' ? 'off' : 'on'
            root.setAttribute('data-paper', next)
            firedRef.current = true
            cancelPress()
        }, HOLD_MS)
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
        if (!pressStart.current) return
        const dx = e.clientX - pressStart.current.x
        const dy = e.clientY - pressStart.current.y
        if (Math.hypot(dx, dy) > HOLD_MOVE_THRESHOLD_PX) cancelPress()
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // If the long-press fired, swallow the trailing click so the user
        // doesn't get navigated home as a side effect of toggling paper.
        if (firedRef.current) {
            e.preventDefault()
            firedRef.current = false
        }
    }

    return (
        <span className={styles.logo}>
            <a
                href="/"
                className={`${styles.brand} ${pressing ? styles.pressing : ''}`}
                aria-label="Home"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={cancelPress}
                onPointerCancel={cancelPress}
                onPointerLeave={cancelPress}
                onClick={handleClick}
                onContextMenu={(e) => {
                    if (pressing) e.preventDefault()
                }}
            >
                aarju.dev
            </a>
            {segments.length > 0 && (
                <span className={styles.slugs}>
                    {segments.map((seg, i) => {
                        const href = '/' + segments.slice(0, i + 1).join('/')
                        return (
                            <a key={href} href={href} className={styles.slug}>
                                /{seg}
                            </a>
                        )
                    })}
                </span>
            )}
        </span>
    )
}
