import type { Personal } from '../../types/portfolio'
import styles from './Hero.module.css'

interface HeroProps {
    personal: Personal
}

function Hero({ personal }: HeroProps) {
    return (
        <section id="hero" className={styles.hero}>
            {/* design TBD — personal: {personal.name} */}
            {personal.name}
        </section>
    )
}

export default Hero
