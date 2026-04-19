import { useEffect, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import styles from './StatusPill.module.css'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatTime(d: Date): string {
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    return `${hh}:${mm}`
}

function formatDate(d: Date): string {
    const dd = String(d.getDate()).padStart(2, '0')
    return `${MONTHS[d.getMonth()]} ${dd}`
}

function StatusPill() {
    const [now, setNow] = useState(() => new Date())
    const { theme, toggle } = useTheme()

    useEffect(() => {
        let interval: number | undefined
        const tick = () => setNow(new Date())
        const delay = 60_000 - (Date.now() % 60_000)
        const timeout = window.setTimeout(() => {
            tick()
            interval = window.setInterval(tick, 60_000)
        }, delay)
        return () => {
            window.clearTimeout(timeout)
            if (interval !== undefined) window.clearInterval(interval)
        }
    }, [])

    return (
        <div className={`${styles.pill} glass pill`}>
            <span className={styles.time}>{formatTime(now)}</span>
            <span className={styles.sep} aria-hidden>·</span>
            <span className={styles.date}>{formatDate(now)}</span>
            <span className={styles.sep} aria-hidden>·</span>
            <button
                type="button"
                onClick={toggle}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                className={styles.toggle}
            >
                {theme === 'dark' ? (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                    </svg>
                )}
            </button>
        </div>
    )
}

export default StatusPill
