import type { Experience as ExperienceType } from '../../types/portfolio'
import { assets } from '../../assets'
import { highlightMetrics } from '../../utils/highlightMetrics'
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
                                <p className={styles.company}>
                                    {item.logo && assets.companyLogo(item.logo) && (
                                        <img
                                            src={assets.companyLogo(item.logo)}
                                            alt=""
                                            className={styles.logo}
                                        />
                                    )}
                                    <span>{item.company}</span>
                                </p>
                                <p className={styles.role}>{item.role}</p>
                            </div>
                            <p className={styles.duration}>{item.duration}</p>
                        </header>

                        <ul className={styles.bullets}>
                            {item.bullets.map((b, i) => (
                                <li key={i} className={styles.bullet}>{highlightMetrics(b)}</li>
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
