import { Fragment, useEffect, useState } from 'react'
import type { Personal, Hero as HeroContent } from '@type/portfolio'
import { smoothScrollToId } from '@utils/smoothScroll'
import { assets } from '@assets'
import styles from './Hero.module.css'

interface HeroProps {
    personal: Personal
    hero: HeroContent
}

/** Split on `**...**` pairs and wrap odd-index chunks in <strong>.
 *  Used by scroll hints to bold the keyed letter ("**t**oggle"). */
function renderHint(hint: string) {
    const parts = hint.split('**')
    return parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
    )
}

function pickRandom<T>(pool: T[], fallback: T): T {
    if (!pool?.length) return fallback
    return pool[Math.floor(Math.random() * pool.length)]
}

/** Touch-only device (no hover, coarse pointer). Keyboard shortcuts
 *  are irrelevant here, so hints that tease them would mislead. */
function isTouchOnlyDevice(): boolean {
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function Hero({ personal, hero }: HeroProps) {
    // SSR uses deterministic first items so crawlers / screen readers see
    // real content; useEffect swaps in a fresh random pick on each client
    // load. `mounted` gates a fade-in so the swap never flickers visibly —
    // the SSR'd value is rendered at opacity 0, then transitions to 1 once
    // we've replaced it with the random pick.
    const [tagline, setTagline] = useState<string>(hero.taglines[0] ?? '')
    const [hint, setHint] = useState<string>('scroll')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        /* eslint-disable react-hooks/set-state-in-effect -- random per page load */
        setTagline(pickRandom(hero.taglines, hero.taglines[0] ?? ''))
        // Touch-only devices have no keyboard shortcuts — keyboard-teasing
        // hints would be misleading there.
        setHint(isTouchOnlyDevice() ? 'scroll' : pickRandom(hero.scrollHints, 'scroll'))
        setMounted(true)
        /* eslint-enable react-hooks/set-state-in-effect */
    }, [hero.taglines, hero.scrollHints])

    const scrollToNext = () => smoothScrollToId('experience')

    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.center}>
                <h1 className={styles.greeting}>
                    Hey, I'm <span className={styles.name}>{personal.name}</span>
                </h1>
                <p className={styles.tagline} data-mounted={mounted ? '' : undefined}>{tagline}</p>

                <ul className={styles.socials}>
                    <li>
                        <a
                            href={personal.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className={styles.socialBtn}
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001zM3 9h4v12H3V9zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.33c0-1.27-.03-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4V9z" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a
                            href={personal.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className={styles.socialBtn}
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                                <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.09 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.61.23 2.79.11 3.09.75.81 1.2 1.84 1.2 3.1 0 4.41-2.7 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
                            </svg>
                        </a>
                    </li>
                    {assets.resume(personal.resume) && (
                        <li>
                            <a
                                href={assets.resume(personal.resume)}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Resume (PDF)"
                                className={styles.socialBtn}
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                                    <path d="M14 3v6h6" />
                                    <path d="M9 13h6M9 17h6" />
                                </svg>
                            </a>
                        </li>
                    )}
                </ul>
            </div>

            <button
                type="button"
                onClick={scrollToNext}
                className={styles.scrollHint}
                data-mounted={mounted ? '' : undefined}
            >
                <span>{renderHint(hint)}</span>
                <span aria-hidden>↓</span>
            </button>
        </section>
    )
}

export default Hero
