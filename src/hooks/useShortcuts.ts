import { useEffect } from 'react'
import { smoothScrollToId, smoothScrollToY, NAVBAR_OFFSET_PX } from '@utils/smoothScroll'
import { useTheme } from './useTheme'

const SHORTCUT_SCROLL_DURATION_MS = 600
const PROBE_VIEWPORT_RATIO = 0.3

/**
 * Global keyboard shortcuts. The full list lives at /shortcuts; the rotating
 * hint under the hero is the discovery surface for anyone landing fresh.
 * Typing inputs / modifier keys (Cmd/Ctrl/Alt) are always ignored.
 * Two-key sequences (gg) expire after a short window.
 *
 * Section jump (j/k) discovers <section[id]> elements inside <main> at
 * runtime, so it works on any page that has them — not just the portfolio.
 */
export default function useShortcuts() {
    const { toggleTheme, toggleWidth } = useTheme()

    useEffect(() => {
        const SEQUENCE_TIMEOUT = 600
        let pendingLeader: string | null = null
        let pendingTimer: number | null = null

        const clearPending = () => {
            pendingLeader = null
            if (pendingTimer !== null) {
                window.clearTimeout(pendingTimer)
                pendingTimer = null
            }
        }

        const armLeader = (leader: string) => {
            pendingLeader = leader
            if (pendingTimer !== null) window.clearTimeout(pendingTimer)
            pendingTimer = window.setTimeout(clearPending, SEQUENCE_TIMEOUT)
        }

        const isTyping = (target: EventTarget | null): boolean => {
            // EventTarget is too broad; keydown always fires on an Element
            const el = target as HTMLElement | null
            if (!el) return false
            const tag = el.tagName
            return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable
        }

        const scrollToY = (y: number) => {
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' })
        }

        const scrollToTop = () => scrollToY(0)
        const scrollToBottom = () => scrollToY(document.documentElement.scrollHeight)
        const scrollByHalf = (dir: 1 | -1) => {
            const delta = (window.innerHeight / 2) * dir
            scrollToY(window.scrollY + delta)
        }
        const scrollToDocFraction = (frac: number) => {
            const doc = document.documentElement
            const maxY = doc.scrollHeight - window.innerHeight
            scrollToY(Math.max(0, maxY * frac))
        }

        // Discover jumpable landmarks at call time. Prefers <section[id]>
        // (portfolio), falls back to prose headings (blog posts).
        const getSectionIds = (): string[] => {
            const main = document.querySelector('main')
            if (!main) return []
            const sections = main.querySelectorAll<HTMLElement>('section[id]')
            if (sections.length > 0) return Array.from(sections, (el) => el.id)
            const headings = main.querySelectorAll<HTMLElement>(':is(h2, h3)[id]')
            return Array.from(headings, (el) => el.id)
        }

        // Returns -1 when no landmark has been scrolled past yet (i.e.
        // the user is above the first heading/section).
        const currentSectionIndex = (ids: string[]): number => {
            const probe = window.scrollY + window.innerHeight * PROBE_VIEWPORT_RATIO
            let lastPassed = -1
            for (let i = 0; i < ids.length; i++) {
                const el = document.getElementById(ids[i])
                if (!el) continue
                const top = el.getBoundingClientRect().top + window.scrollY
                if (top <= probe) lastPassed = i
                else break
            }
            return lastPassed
        }

        const jumpSection = (delta: 1 | -1) => {
            const ids = getSectionIds()
            if (ids.length === 0) return
            const target = currentSectionIndex(ids) + delta
            if (target < 0) {
                smoothScrollToY(0, SHORTCUT_SCROLL_DURATION_MS)
            } else if (target >= ids.length) {
                const maxY = document.documentElement.scrollHeight - window.innerHeight
                smoothScrollToY(maxY, SHORTCUT_SCROLL_DURATION_MS)
            } else {
                smoothScrollToId(ids[target], SHORTCUT_SCROLL_DURATION_MS, NAVBAR_OFFSET_PX)
            }
        }

        const onKey = (e: KeyboardEvent) => {
            if (isTyping(e.target)) return
            if (e.metaKey || e.ctrlKey || e.altKey) return

            if (pendingLeader === 'g') {
                clearPending()
                // Lowercase check: shift-G after a 'g' leader does NOT scroll to
                // bottom here, it just clears the pending leader. Bottom-scroll
                // is the standalone 'G' case below. Two-key 'gg' = top.
                if (e.key === 'g') {
                    e.preventDefault()
                    scrollToTop()
                }
                return
            }

            switch (e.key) {
                // --- Navigation ---
                case 'g':
                    armLeader('g')
                    return
                case 'G':
                    e.preventDefault()
                    scrollToBottom()
                    return
                case 'j':
                    e.preventDefault()
                    jumpSection(1)
                    return
                case 'k':
                    e.preventDefault()
                    jumpSection(-1)
                    return
                case 'd':
                    e.preventDefault()
                    scrollByHalf(1)
                    return
                case 'u':
                    e.preventDefault()
                    scrollByHalf(-1)
                    return
                case 'H':
                    e.preventDefault()
                    scrollToDocFraction(0.25)
                    return
                case 'M':
                    e.preventDefault()
                    scrollToDocFraction(0.5)
                    return
                case 'L':
                    e.preventDefault()
                    scrollToDocFraction(0.75)
                    return

                // --- Modes ---
                case 't':
                    e.preventDefault()
                    toggleTheme()
                    return
                case 'w':
                    e.preventDefault()
                    toggleWidth()
                    return
            }
        }

        window.addEventListener('keydown', onKey)
        return () => {
            window.removeEventListener('keydown', onKey)
            clearPending()
        }
    }, [toggleTheme, toggleWidth])
}
