import type { Education as EducationType } from '@type/portfolio'
import { assets } from '@assets'
import { highlightMetrics } from '@utils/highlightMetrics'
import styles from './Education.module.css'

interface EducationProps {
    heading: string
    items: EducationType[]
}

function Education({ heading, items }: EducationProps) {
    return (
        <section id="education" className={styles.education}>
            <h2 className={styles.heading}>{heading}</h2>

            <div className={styles.list}>
                {items.map((item) => (
                    <article key={item.institution} className={styles.item}>
                        <header className={styles.head}>
                            <div className={styles.primary}>
                                <p className={styles.institution}>
                                    {item.logo && assets.schoolLogo(item.logo) && (
                                        <img
                                            src={assets.schoolLogo(item.logo)}
                                            alt=""
                                            className={styles.logo}
                                        />
                                    )}
                                    <span>{item.institution}</span>
                                </p>
                                <p className={styles.degree}>{item.degree}</p>
                            </div>
                            <p className={styles.duration}>{item.duration}</p>
                        </header>

                        {item.highlights && item.highlights.length > 0 && (
                            <ul className={styles.bullets}>
                                {item.highlights.map((h, i) => (
                                    <li key={i} className={styles.bullet}>{highlightMetrics(h)}</li>
                                ))}
                            </ul>
                        )}

                        {item.score && <p className={styles.score}>{item.score}</p>}
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Education
