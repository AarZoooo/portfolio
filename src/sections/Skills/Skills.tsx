import type { Skills as SkillsType } from '../../types/portfolio'
import styles from './Skills.module.css'

interface SkillsProps {
    skills: SkillsType
}

function Skills({ skills }: SkillsProps) {
    return (
        <section id="skills" className={styles.skills}>
            {skills.languages.map((s) => (
                <span key={s.name}>{s.name}</span>
            ))}
        </section>
    )
}

export default Skills
