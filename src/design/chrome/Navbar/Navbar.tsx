import { useEffect, useState } from 'react'
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
    const [menuOpen, setMenuOpen] = useState(false)
    const { theme, toggle } = useTheme()

    const hasSections = !!sectionLinks && sectionLinks.length > 0

    const isSubAppActive = (href: string): boolean => {
        if (href === '/') return currentPath === '/'
        return currentPath === href || currentPath.startsWith(`${href}/`)
    }

    // Current page's sub-app is reachable via logo / slug — drop its duplicate.
    const visibleSubApps = subApps.filter((app) => !isSubAppActive(app.href))
    const hasSubApps = visibleSubApps.length > 0

    const openMenu = () => setMenuOpen(true)
    const closeMenu = () => setMenuOpen(false)

    // Escape closes the menu.
    useEffect(() => {
        if (!menuOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeMenu()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [menuOpen])

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

    return (
        <>
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

                <div className={styles.right}>
                    {hasSubApps && (
                        <>
                            <ul className={styles.subAppsInline} aria-label="Site sections">
                                {visibleSubApps.map((app) => (
                                    <li key={app.href}>
                                        <a href={app.href} className={styles.subAppLink}>
                                            {app.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                onClick={openMenu}
                                aria-expanded={menuOpen}
                                aria-controls="subapp-menu"
                                aria-label="Open menu"
                                className={styles.hamburger}
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 7h16M4 12h16M4 17h16" />
                                </svg>
                            </button>
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

            {hasSubApps && (
                <div
                    id="subapp-menu"
                    className={`${styles.menuOverlay} ${menuOpen ? styles.menuOverlayOpen : ''}`}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeMenu()
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Site navigation"
                    aria-hidden={!menuOpen}
                >
                    <ul className={styles.menuList}>
                        {visibleSubApps.map((app) => (
                            <li key={app.href}>
                                <a
                                    href={app.href}
                                    onClick={closeMenu}
                                    className={styles.menuLink}
                                >
                                    {app.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default Navbar
