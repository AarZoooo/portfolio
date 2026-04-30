import { useEffect, useState, type ReactNode } from 'react'
import type { Footer as FooterContent } from '@type/portfolio'
import styles from './Footer.module.css'

interface FooterProps {
    footer: FooterContent
}

function renderTagline(text: string): ReactNode[] {
    return text.split(/(~~[^~]+~~)/g).map((p, i) =>
        p.startsWith('~~') && p.endsWith('~~') ? (
            <del key={i}>{p.slice(2, -2)}</del>
        ) : (
            <span key={i}>{p}</span>
        ),
    )
}

function Footer({ footer }: FooterProps) {
    const [tagline, setTagline] = useState<string>(footer.taglines[0] ?? '')

    useEffect(() => {
        const list = footer.taglines
        // eslint-disable-next-line react-hooks/set-state-in-effect -- random per page load
        setTagline(list[Math.floor(Math.random() * list.length)] ?? '')
    }, [footer.taglines])

    return (
        <footer className={styles.footer}>
            <div className={`${styles.inner} container`}>
                <p className={styles.tagline}>{renderTagline(tagline)}</p>

                <p className={styles.meta}>
                    {footer.meta.map((m, i) => (
                        <span key={m}>
                            {i > 0 && <span className={styles.sep}>·</span>}
                            {m}
                        </span>
                    ))}
                </p>

                <p className={styles.source}>
                    <a href={footer.source.href} target="_blank" rel="noreferrer" className={styles.link}>
                        {footer.source.label} <span aria-hidden>↗</span>
                    </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer
