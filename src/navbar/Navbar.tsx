import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { assets } from '../assets'
import styles from './Navbar.module.css'

interface NavLink {
    id: string
    label: string
}

interface NavbarProps {
    github: string
    linkedin: string
    resumeKey: string
    links: NavLink[]
}

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

function Navbar({ github, linkedin, resumeKey, links }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false)
    const [now, setNow] = useState(() => new Date())
    const [active, setActive] = useState<string | null>(null)
    const { theme, toggle } = useTheme()
    const resumeUrl = assets.resume(resumeKey)
    const ids = useRef(links.map((l) => l.id))
    ids.current = links.map((l) => l.id)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

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

    useEffect(() => {
        const observed: HTMLElement[] = []
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
                if (visible) setActive(visible.target.id)
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
        )
        for (const id of ids.current) {
            const el = document.getElementById(id)
            if (el) {
                observer.observe(el)
                observed.push(el)
            }
        }
        return () => observer.disconnect()
    }, [])

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <header className={`${styles.bar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`${styles.inner} container`}>
                <div className={styles.left}>
                    <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={styles.iconBtn}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001zM3 9h4v12H3V9zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.33c0-1.27-.03-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4V9z" />
                        </svg>
                    </a>
                    <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className={styles.iconBtn}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                            <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.09 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.61.23 2.79.11 3.09.75.81 1.2 1.84 1.2 3.1 0 4.41-2.7 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
                        </svg>
                    </a>
                    {resumeUrl && (
                        <a href={resumeUrl} target="_blank" rel="noreferrer" aria-label="Resume" className={`${styles.iconBtn} ${styles.resume}`}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                                <path d="M14 3v6h6" />
                                <path d="M8 13h8M8 17h5" />
                            </svg>
                            <span className={styles.label}>Resume</span>
                        </a>
                    )}
                </div>

                <nav className={styles.center}>
                    {links.map((link) => (
                        <button
                            key={link.id}
                            type="button"
                            onClick={() => scrollTo(link.id)}
                            className={`${styles.navLink} ${active === link.id ? styles.navActive : ''}`}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                <div className={styles.right}>
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
            </div>
        </header>
    )
}

export default Navbar
