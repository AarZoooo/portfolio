import type { Education as EducationType } from '../../types/portfolio'
import styles from './Education.module.css'

interface EducationProps {
    items: EducationType[]
}

function Education({ items }: EducationProps) {
    return (
        <section id="education" className={styles.education}>
            {items.map((e) => (
                <div key={e.institution}>{e.institution}</div>
            ))}
        </section>
    )
}

export default Education
