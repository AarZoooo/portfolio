import type { Skills as SkillsType, SkillItem } from '../../types/portfolio'
import { assets } from '../../assets'
import styles from './Skills.module.css'

interface SkillsProps {
    heading: string
    skills: SkillsType
}

type Row =
    | { label: string; kind: 'withLogos'; items: SkillItem[] }
    | { label: string; kind: 'textOnly'; items: string[] }

function Skills({ heading, skills }: SkillsProps) {
    const rows: Row[] = [
        { label: 'Languages', kind: 'withLogos', items: skills.languages },
        { label: 'Frameworks', kind: 'withLogos', items: skills.frameworks },
        { label: 'Databases', kind: 'withLogos', items: skills.databases },
        { label: 'Tools', kind: 'withLogos', items: skills.tools },
        { label: 'Concepts', kind: 'textOnly', items: skills.concepts },
    ]

    return (
        <section id="skills" className={styles.skills}>
            <h2 className={styles.heading}>{heading}</h2>

            <dl className={styles.list}>
                {rows.map((row) => (
                    <div key={row.label} className={styles.row}>
                        <dt className={styles.label}>{row.label}</dt>
                        <dd className={styles.items}>
                            {row.kind === 'withLogos' ? (
                                <ul className={styles.chips}>
                                    {row.items.map((s) => {
                                        const logo = assets.techLogo(s.logo)
                                        return (
                                            <li key={s.name} className={styles.chip}>
                                                {logo && <img src={logo} alt="" className={styles.icon} />}
                                                <span>{s.name}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : (
                                row.items.join(' · ')
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}

export default Skills
