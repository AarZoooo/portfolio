import type { Footer as FooterContent } from '../../types/portfolio'
import styles from './Footer.module.css'

interface FooterProps {
    footer: FooterContent
}

function Footer({ footer }: FooterProps) {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.inner} container`}>
                <p className={styles.tagline}>{footer.tagline}</p>

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
                        {footer.source.label} ↗
                    </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer
