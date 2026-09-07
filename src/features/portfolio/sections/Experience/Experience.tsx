import type { Experience as ExperienceType } from '@type/portfolio'
import { assets } from '@assets'
import { groupByEmployer } from '@utils/groupByEmployer'
import WorkCard from '@design/primitives/WorkCard/WorkCard'
import Logo from '@design/primitives/Logo/Logo'
import styles from './Experience.module.css'

interface ExperienceProps {
    heading: string
    items: ExperienceType[]
}

function Experience({ heading, items }: ExperienceProps) {
    const groups = groupByEmployer(items)
    return (
        <section id="experience" className={styles.experience}>
            <h2 className={styles.heading}>{heading}</h2>
            <div className={styles.list}>
                {groups.map((group) => (
                    <div className={styles.group} key={group.company}>
                        <h3 className={styles.groupTitle}>
                            {group.roles[0].logo && assets.companyLogo(group.roles[0].logo) && (
                                <Logo
                                    src={assets.companyLogo(group.roles[0].logo)}
                                    alt={`${group.company} logo`}
                                    size="1.1em"
                                    className={styles.groupLogo}
                                />
                            )}
                            <span>{group.company}</span>
                        </h3>
                        <div className={styles.roles}>
                            {group.roles.map((role) => {
                                const head = (
                                    <header className={styles.head}>
                                        <div className={styles.primary}>
                                            <p className={styles.role}>{role.role}</p>
                                        </div>
                                        <p className={styles.duration}>{role.duration}</p>
                                    </header>
                                )
                                return (
                                    <WorkCard
                                        key={role.role + role.duration}
                                        head={head}
                                        summary={role.summary}
                                        detail={role.detail}
                                        tech={role.tech}
                                    />
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Experience
