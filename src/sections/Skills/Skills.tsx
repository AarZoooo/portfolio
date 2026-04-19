import type { Skills as SkillsType } from '../../types/portfolio'
import styles from './Skills.module.css'

interface SkillsProps {
    heading: string
    skills: SkillsType
}

function Skills({ heading, skills }: SkillsProps) {
    const rows: { label: string; items: string[] }[] = [
        { label: 'Languages', items: skills.languages.map((s) => s.name) },
        { label: 'Frameworks', items: skills.frameworks.map((s) => s.name) },
        { label: 'Databases', items: skills.databases.map((s) => s.name) },
        { label: 'Tools', items: skills.tools.map((s) => s.name) },
        { label: 'Concepts', items: skills.concepts },
    ]

    return (
        <section id="skills" className={styles.skills}>
            <h2 className={styles.heading}>{heading}</h2>

            <dl className={styles.list}>
                {rows.map((row) => (
                    <div key={row.label} className={styles.row}>
                        <dt className={styles.label}>{row.label}</dt>
                        <dd className={styles.items}>{row.items.join(' · ')}</dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}

export default Skills
