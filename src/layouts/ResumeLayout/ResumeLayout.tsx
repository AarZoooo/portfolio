import { assets } from '../../assets'
import styles from './ResumeLayout.module.css'

function ResumeLayout() {
    return (
        <main className={styles.layout}>
            <iframe className={styles.pdf} src={assets.resume} title="Resume" />
        </main>
    )
}

export default ResumeLayout
