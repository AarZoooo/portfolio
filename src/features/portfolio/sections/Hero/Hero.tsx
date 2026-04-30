import { Fragment, useEffect, useState } from 'react'
import type { Personal, Hero as HeroContent } from '@type/portfolio'
import { smoothScrollToId } from '@utils/smoothScroll'
import styles from './Hero.module.css'

interface HeroProps {
    personal: Personal
    hero: HeroContent
}

/** Split on `**...**` pairs and wrap odd-index chunks in <strong>.
 *  Used by scroll hints to bold the keyed letter ("**t**oggle"). */
function renderHint(hint: string) {
    const parts = hint.split('**')
    return parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
    )
}

function pickRandom<T>(pool: T[], fallback: T): T {
    if (!pool?.length) return fallback
    return pool[Math.floor(Math.random() * pool.length)]
}

/** Touch-only device (no hover, coarse pointer). Keyboard shortcuts
 *  are irrelevant here, so hints that tease them would mislead. */
function isTouchOnlyDevice(): boolean {
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function Hero({ personal, hero }: HeroProps) {
    // First items are deterministic SSR fallbacks; useEffect rolls a fresh
    // pick per page load on the client. Picking at SSG time would bake one
    // tagline for the lifetime of the deploy.
    const [tagline, setTagline] = useState<string>(hero.taglines[0] ?? '')
    const [hint, setHint] = useState<string>('scroll')

    useEffect(() => {
        /* eslint-disable react-hooks/set-state-in-effect -- random per page load */
        setTagline(pickRandom(hero.taglines, hero.taglines[0] ?? ''))
        // Touch-only devices have no keyboard shortcuts — keyboard-teasing
        // hints would be misleading there.
        setHint(isTouchOnlyDevice() ? 'scroll' : pickRandom(hero.scrollHints, 'scroll'))
        /* eslint-enable react-hooks/set-state-in-effect */
    }, [hero.taglines, hero.scrollHints])

    const scrollToNext = () => smoothScrollToId('experience', 900, 80)

    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.center}>
                <h1 className={styles.greeting}>
                    Hey, I'm <span className={styles.name}>{personal.name}</span>
                </h1>
                <p className={styles.tagline}>{tagline}</p>
            </div>

            <button type="button" onClick={scrollToNext} className={styles.scrollHint}>
                <span>{renderHint(hint)}</span>
                <span aria-hidden>↓</span>
            </button>
        </section>
    )
}

export default Hero
