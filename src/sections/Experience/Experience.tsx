import type { Experience as ExperienceType } from '../../types/portfolio'
import styles from './Experience.module.css'

interface ExperienceProps {
    items: ExperienceType[]
}

function Experience({ items }: ExperienceProps) {
    return (
        <section id="experience" className={styles.experience}>
            <h2 className={styles.heading}>Experience</h2>

            <div className={styles.list}>
                {items.map((item) => (
                    <article key={item.company} className={styles.item}>
                        <header className={styles.head}>
                            <div className={styles.primary}>
                                <p className={styles.company}>{item.company}</p>
                                <p className={styles.role}>{item.role}</p>
                            </div>
                            <p className={styles.duration}>{item.duration}</p>
                        </header>

                        <ul className={styles.bullets}>
                            {item.bullets.map((b, i) => (
                                <li key={i} className={styles.bullet}>{b}</li>
                            ))}
                        </ul>

                        <p className={styles.tech}>{item.tech.join(' · ')}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Experience
