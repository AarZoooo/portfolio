import type { Project } from '../../types/portfolio'
import styles from './Projects.module.css'

interface ProjectsProps {
    items: Project[]
}

function Projects({ items }: ProjectsProps) {
    return (
        <section id="projects" className={styles.projects}>
            {items.map((p) => (
                <div key={p.name}>{p.name}</div>
            ))}
        </section>
    )
}

export default Projects
