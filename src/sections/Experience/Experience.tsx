import type { Experience as ExperienceType } from '../../types/portfolio'
import styles from './Experience.module.css'

interface ExperienceProps {
    items: ExperienceType[]
}

function Experience({ items }: ExperienceProps) {
    return (
        <section id="experience" className={styles.experience}>
            {items.map((item) => (
                <div key={item.company}>{item.company}</div>
            ))}
        </section>
    )
}

export default Experience
