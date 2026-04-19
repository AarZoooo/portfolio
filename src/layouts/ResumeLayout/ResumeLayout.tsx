import data from '../../data/data.json'
import type { PortfolioData } from '../../types/portfolio'
import styles from './ResumeLayout.module.css'

function ResumeLayout() {
    const d = data as PortfolioData
    const src = d.personal.resume

    return (
        <main className={styles.layout}>
            {src ? (
                <iframe className={styles.pdf} src={src} title="Resume" />
            ) : (
                <div className={styles.empty}>Resume not available.</div>
            )}
        </main>
    )
}

export default ResumeLayout
