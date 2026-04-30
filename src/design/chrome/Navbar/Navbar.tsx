import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@hooks/useTheme'
import { smoothScrollToId } from '@utils/smoothScroll'
import type { SubAppLink } from '@utils/navigation'
import Logo from '@design/chrome/Logo/Logo'
import styles from './Navbar.module.css'

const NEAR_TOP_VIEWPORT_RATIO = 0.4
const SCROLLED_THRESHOLD_PX = 4

interface SectionLink {
    id: string
    label: string
    short?: string
}

interface NavbarProps {
    /** Current page path. Drives the route slug after the logo and the
     *  active sub-app indicator. */
    currentPath: string
    /** Page-local section anchors. Omit on pages that aren't section-scrolled
     *  (e.g. blog posts). When present, scroll-spy highlights the visible one. */
    sectionLinks?: SectionLink[]
    /** Top-level destinations (Portfolio, Blog, ...). Always shown on the right. */
    subApps?: SubAppLink[]
}

function Navbar({ currentPath, sectionLinks, subApps = [] }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState<string | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { theme, toggle } = useTheme()
    const rightRef = useRef<HTMLDivElement>(null)

    const hasSections = !!sectionLinks && sectionLinks.length > 0
    const hasSubApps = subApps.length > 0

    // Drawer dismiss: click outside, escape, or successful navigation.
    useEffect(() => {
        if (!drawerOpen) return
        const onClickOutside = (e: MouseEvent) => {
            if (rightRef.current && !rightRef.current.contains(e.target as Node)) {
                setDrawerOpen(false)
            }
        }
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setDrawerOpen(false)
        }
        document.addEventListener('click', onClickOutside)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('click', onClickOutside)
            document.removeEventListener('keydown', onKey)
        }
    }, [drawerOpen])

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > SCROLLED_THRESHOLD_PX)
            if (!hasSections) return
            const ids = sectionLinks!.map((l) => l.id)
            const doc = document.documentElement
            const atBottom =
                window.innerHeight + window.scrollY >= doc.scrollHeight - SCROLLED_THRESHOLD_PX
            if (atBottom && ids.length > 0) {
                setActive(ids[ids.length - 1])
                return
            }
            if (window.scrollY < window.innerHeight * NEAR_TOP_VIEWPORT_RATIO) {
                setActive(null)
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [sectionLinks, hasSections])

    useEffect(() => {
        if (!hasSections) return
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
                if (visible) setActive(visible.target.id)
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
        )
        for (const link of sectionLinks!) {
            const el = document.getElementById(link.id)
            if (el) observer.observe(el)
        }
        return () => observer.disconnect()
    }, [sectionLinks, hasSections])

    const scrollTo = (id: string) => smoothScrollToId(id)

    const isSubAppActive = (href: string): boolean => {
        if (href === '/') return currentPath === '/'
        return currentPath === href || currentPath.startsWith(`${href}/`)
    }

    return (
        <header className={`${styles.bar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`${styles.inner} container`}>
                <div className={styles.left}>
                    <Logo currentPath={currentPath} />
                </div>

                {hasSections && (
                    <nav className={styles.center} aria-label="Page sections">
                        {sectionLinks!.map((link) => (
                            <button
                                key={link.id}
                                type="button"
                                onClick={() => scrollTo(link.id)}
                                className={`${styles.navLink} ${active === link.id ? styles.navActive : ''}`}
                                aria-current={active === link.id ? 'true' : undefined}
                            >
                                <span className={styles.labelLong}>{link.label}</span>
                                {link.short && <span className={styles.labelShort}>{link.short}</span>}
                            </button>
                        ))}
                    </nav>
                )}

                <div className={styles.right} ref={rightRef}>
                    {hasSubApps && (
                        <>
                            <button
                                type="button"
                                onClick={() => setDrawerOpen((o) => !o)}
                                aria-expanded={drawerOpen}
                                aria-controls="subapp-drawer"
                                aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                                className={styles.hamburger}
                            >
                                {drawerOpen ? (
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 6l12 12M6 18L18 6" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 7h16M4 12h16M4 17h16" />
                                    </svg>
                                )}
                            </button>
                            <ul
                                id="subapp-drawer"
                                className={`${styles.subApps} ${drawerOpen ? styles.subAppsOpen : ''}`}
                                aria-label="Site sections"
                            >
                                {subApps.map((app) => {
                                    const active = isSubAppActive(app.href)
                                    return (
                                        <li key={app.href}>
                                            <a
                                                href={app.href}
                                                onClick={() => setDrawerOpen(false)}
                                                className={`${styles.subAppLink} ${active ? styles.subAppActive : ''}`}
                                                aria-current={active ? 'page' : undefined}
                                            >
                                                {app.label}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </>
                    )}

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
