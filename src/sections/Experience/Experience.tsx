import { useState } from 'react'
import type { Experience as ExperienceType } from '../../types/portfolio'
import { assets } from '../../assets'
import { highlightMetrics } from '../../utils/highlightMetrics'
import Expandable from '../../components/Expandable/Expandable'
import styles from './Experience.module.css'

interface ExperienceProps {
    heading: string
    items: ExperienceType[]
}

const SHORT_TECH = 2

function techLine(tech: string[], open: boolean): string {
    if (open || tech.length <= SHORT_TECH) return tech.join(' · ')
    const shown = tech.slice(0, SHORT_TECH).join(' · ')
    return `${shown} · +${tech.length - SHORT_TECH} more`
}

function renderParas(paras: string[], cls: string) {
    return (
        <div className={cls}>
            {paras.map((p, i) => (
                <p key={i} className={styles.bullet}>{highlightMetrics(p)}</p>
            ))}
        </div>
    )
}

function Item({ item }: { item: ExperienceType }) {
    const [open, setOpen] = useState(false)
    const hasDetail = Boolean(item.detail?.length)

    const head = (
        <header className={styles.head}>
            <div className={styles.primary}>
                <p className={styles.company}>
                    {item.logo && assets.companyLogo(item.logo) && (
                        <img
                            src={assets.companyLogo(item.logo)}
                            alt=""
                            className={styles.logo}
                        />
                    )}
                    <span>{item.company}</span>
                </p>
                <p className={styles.role}>{item.role}</p>
            </div>
            <p className={styles.duration}>{item.duration}</p>
        </header>
    )

    const after = <p className={styles.tech}>{techLine(item.tech, open)}</p>

    if (!hasDetail) {
        return (
            <article className={styles.item}>
                {head}
                <div className={styles.plainBody}>
                    {renderParas(item.summary, styles.bullets)}
                    {after}
                </div>
            </article>
        )
    }

    return (
        <article className={styles.item}>
            <Expandable
                isOpen={open}
                onToggle={() => setOpen((v) => !v)}
                head={head}
                short={renderParas(item.summary, styles.bullets)}
                full={renderParas(item.detail!, styles.bullets)}
                after={after}
            />
        </article>
    )
}

function Experience({ heading, items }: ExperienceProps) {
    return (
        <section id="experience" className={styles.experience}>
            <h2 className={styles.heading}>{heading}</h2>
            <div className={styles.list}>
                {items.map((item) => (
                    <Item key={item.company} item={item} />
                ))}
            </div>
        </section>
    )
}

export default Experience
