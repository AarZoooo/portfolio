import { useState } from 'react'
import type { ReactNode } from 'react'
import { techLine, renderParas } from '@utils/workItem'
import Expandable from '@design/primitives/Expandable/Expandable'
import styles from './WorkCard.module.css'

interface WorkCardProps {
    /** Caller-built header (title, subtitle, date, logos). Section owns its styles. */
    head: ReactNode
    summary: string[]
    detail?: string[]
    tech: string[]
}

function WorkCard({ head, summary, detail, tech }: WorkCardProps) {
    const [open, setOpen] = useState(false)
    const hasDetail = Boolean(detail?.length)
    const after = <p className={styles.tech}>{techLine(tech, open)}</p>

    if (!hasDetail) {
        return (
            <article className={styles.item}>
                {head}
                <div className={styles.plainBody}>
                    {renderParas(summary, styles.bullets, styles.bullet)}
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
                short={renderParas(summary, styles.bullets, styles.bullet)}
                full={renderParas(detail!, styles.bullets, styles.bullet)}
                after={after}
            />
        </article>
    )
}

export default WorkCard
