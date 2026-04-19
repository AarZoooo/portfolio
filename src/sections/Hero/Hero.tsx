import type { Personal, Hero as HeroContent } from '../../types/portfolio'
import { useTypewriter } from '../../hooks/useTypewriter'
import styles from './Hero.module.css'

interface HeroProps {
    personal: Personal
    hero: HeroContent
}

function Hero({ personal, hero }: HeroProps) {
    const typed = useTypewriter(hero.taglines)

    return (
        <section id="hero" className={styles.hero}>
            <h1 className={styles.greeting}>
                Hey, I'm <span className={styles.name}>{personal.name}</span>
            </h1>
            <p className={styles.tagline}>
                {typed}
                <span className={styles.caret} aria-hidden />
            </p>
        </section>
    )
}

export default Hero
