import { Fragment, useState } from 'react'
import type { Personal, Hero as HeroContent } from '../../types/portfolio'
import { smoothScrollToId } from '../../utils/smoothScroll'
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

function Hero({ personal, hero }: HeroProps) {
    // Both tagline and scroll hint pick once per page load. Static
    // during the visit; each refresh rolls fresh — matches the footer
    // pattern so the site's rotating bits all fire on the same cadence.
    const [tagline] = useState<string>(() => pickRandom(hero.taglines, ''))
    const [hint] = useState<string>(() => pickRandom(hero.scrollHints, 'scroll'))

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
