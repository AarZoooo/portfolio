import type { Project } from '@type/portfolio'
import { assets } from '@assets'
import WorkCard from '@design/primitives/WorkCard/WorkCard'
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
                {items.map((item) => {
                    const head = (
                        <header className={styles.head}>
                            <div className={styles.primary}>
                                <p className={styles.name}>{item.name}</p>
                                {item.context && (
                                    <p className={styles.context}>
                                        {item.logo && assets.companyLogo(item.logo) && (
                                            <img
                                                src={assets.companyLogo(item.logo)}
                                                alt=""
                                                className={styles.logo}
                                            />
                                        )}
                                        <span>{item.context}</span>
                                    </p>
                                )}
                            </div>
                            <p className={styles.date}>{item.date}</p>
                        </header>
                    )
                    return (
                        <WorkCard
                            key={item.name}
                            head={head}
                            summary={item.summary}
                            detail={item.detail}
                            tech={item.tech}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default Projects
