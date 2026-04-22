import { Fragment, useState } from 'react'
import type { Personal, Hero as HeroContent } from '../../types/portfolio'
import { useTypewriter } from '../../hooks/useTypewriter'
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

function Hero({ personal, hero }: HeroProps) {
    const typed = useTypewriter(hero.taglines, {
        typeMs: 35,
        deleteMs: 20,
        holdMs: 2600,
        gapMs: 450,
    })

    // Pick one scroll hint per page load. Most pool entries are plain "scroll";
    // occasional cheeky variants tease the keyboard easter eggs without
    // advertising them. useState lazy init runs once on mount — the
    // lint-disallowed Math.random lives outside render purity.
    const [hint] = useState<string>(() => {
        const pool = hero.scrollHints
        if (!pool?.length) return 'scroll'
        return pool[Math.floor(Math.random() * pool.length)]
    })

    const scrollToNext = () => smoothScrollToId('experience', 900, 80)

    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.center}>
                <h1 className={styles.greeting}>
                    Hey, I'm <span className={styles.name}>{personal.name}</span>
                </h1>
                <p className={styles.tagline}>
                    {typed}
                    <span className={styles.caret} aria-hidden />
                </p>
            </div>

            <button type="button" onClick={scrollToNext} className={styles.scrollHint}>
                <span>{renderHint(hint)}</span>
                <span aria-hidden>↓</span>
            </button>
        </section>
    )
}

export default Hero
