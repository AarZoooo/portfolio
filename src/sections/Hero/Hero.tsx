import type { Personal, Hero as HeroContent } from '../../types/portfolio'
import { useTypewriter } from '../../hooks/useTypewriter'
import { smoothScrollToId } from '../../utils/smoothScroll'
import styles from './Hero.module.css'

interface HeroProps {
    personal: Personal
    hero: HeroContent
}

function Hero({ personal, hero }: HeroProps) {
    const typed = useTypewriter(hero.taglines, {
        typeMs: 35,
        deleteMs: 20,
        holdMs: 2600,
        gapMs: 450,
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
                scroll <span aria-hidden>↓</span>
            </button>
        </section>
    )
}

export default Hero
