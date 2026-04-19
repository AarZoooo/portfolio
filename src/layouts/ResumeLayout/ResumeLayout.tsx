import data from '../../data/data.json'
import type { PortfolioData } from '../../types/portfolio'
import { assets } from '../../assets'
import styles from './ResumeLayout.module.css'

function ResumeLayout() {
    const d = data as PortfolioData
    const base = assets.resume(d.personal.resume)
    const src = base ? `${base}#toolbar=0&navpanes=0&scrollbar=0&view=FitH` : undefined

    return (
        <main className={`${styles.layout} container`}>
            {src && <iframe className={styles.pdf} src={src} title="Resume" />}
        </main>
    )
}

export default ResumeLayout
