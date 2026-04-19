import type { Personal } from '../../types/portfolio'
import styles from './Hero.module.css'

interface HeroProps {
    personal: Personal
}

function Hero({ personal }: HeroProps) {
    return (
        <section id="hero" className={styles.hero}>
            <h1 className={styles.greeting}>
                Hey, I'm <span className={styles.name}>{personal.name}</span>
            </h1>
            <p className={styles.tagline}>{personal.tagline}</p>
        </section>
    )
}

export default Hero
