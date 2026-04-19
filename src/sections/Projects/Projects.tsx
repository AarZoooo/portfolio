import type { Project } from '../../types/portfolio'
import { assets } from '../../assets'
import { highlightMetrics } from '../../utils/highlightMetrics'
import styles from './Projects.module.css'

interface ProjectsProps {
    heading: string
    items: Project[]
}

function Projects({ heading, items }: ProjectsProps) {
    return (
        <section id="projects" className={styles.projects}>
            <h2 className={styles.heading}>{heading}</h2>

            <div className={styles.list}>
                {items.map((item) => (
                    <article key={item.name} className={styles.item}>
                        <header className={styles.head}>
                            <div className={styles.primary}>
                                <p className={styles.name}>
                                    {item.logo && assets.companyLogo(item.logo) && (
                                        <img
                                            src={assets.companyLogo(item.logo)}
                                            alt=""
                                            className={styles.logo}
                                        />
                                    )}
                                    <span>{item.name}</span>
                                </p>
                                {item.context && <p className={styles.context}>{item.context}</p>}
                            </div>
                            <p className={styles.date}>{item.date}</p>
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

export default Projects
