import { useEffect, useState, type ReactNode } from 'react'
import styles from './Reveal.module.css'

interface RevealProps {
    children: ReactNode
    /** Delay in ms before the fade kicks in (for staggering). Default: 0. */
    delay?: number
    /** HTML tag to render as. Default: 'div'. */
    as?: 'div' | 'section' | 'article'
    className?: string
    id?: string
}

/**
 * Fades content in once, when it enters the viewport (or on mount if
 * already visible). Never reverses — after the first reveal the observer
 * disconnects, so scrolling back doesn't re-animate.
 *
 * Skips animation entirely under prefers-reduced-motion: content is
 * visible from the first render.
 */
const prefersReducedMotion = (): boolean =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Reveal({ children, delay = 0, as: Tag = 'div', className, id }: RevealProps) {
    const [el, setEl] = useState<HTMLElement | null>(null)
    // Seed visible = true under reduced motion so the effect never has
    // to set state synchronously (flagged by react-hooks/set-state-in-effect).
    const [visible, setVisible] = useState<boolean>(() => prefersReducedMotion())

    useEffect(() => {
        if (!el) return
        if (prefersReducedMotion()) return

        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setVisible(true)
                        io.disconnect()
                        break
                    }
                }
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [el])

    return (
        <Tag
            ref={setEl as (el: HTMLElement | null) => void}
            className={`${styles.reveal} ${visible ? styles.visible : ''} ${className ?? ''}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            id={id}
        >
            {children}
        </Tag>
    )
}

export default Reveal
