import { useState } from 'react'
import type { Project } from '@type/portfolio'
import { assets } from '@assets'
import { techLine, renderParas } from '@utils/workItem'
import Expandable from '@design/primitives/Expandable/Expandable'
import styles from './Projects.module.css'

interface ProjectsProps {
    heading: string
    items: Project[]
}

function Item({ item }: { item: Project }) {
    const [open, setOpen] = useState(false)
    const hasDetail = Boolean(item.detail?.length)

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

    const after = <p className={styles.tech}>{techLine(item.tech, open)}</p>

    if (!hasDetail) {
        return (
            <article className={styles.item}>
                {head}
                <div className={styles.plainBody}>
                    {renderParas(item.summary, styles.bullets, styles.bullet)}
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
                short={renderParas(item.summary, styles.bullets, styles.bullet)}
                full={renderParas(item.detail!, styles.bullets, styles.bullet)}
                after={after}
            />
        </article>
    )
}

function Projects({ heading, items }: ProjectsProps) {
    return (
        <section id="projects" className={styles.projects}>
            <h2 className={styles.heading}>{heading}</h2>
            <div className={styles.list}>
                {items.map((item) => (
                    <Item key={item.name} item={item} />
                ))}
            </div>
        </section>
    )
}

export default Projects
