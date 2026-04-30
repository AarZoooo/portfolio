import { useEffect } from 'react'
import { smoothScrollToId, NAVBAR_OFFSET_PX } from '@utils/smoothScroll'
import { useTheme } from './useTheme'

const SHORTCUT_SCROLL_DURATION_MS = 600
const PROBE_VIEWPORT_RATIO = 0.3

/**
 * Global keyboard shortcuts. Intentionally undocumented in-app — the only
 * discovery mechanism is the rotating hint under the hero. The vault stays
 * sealed; visitors find shortcuts by experimenting.
 *
 * Navigation (vim):
 *   gg      scroll to top
 *   G       scroll to bottom
 *   j / k   next / previous section
 *   d / u   half-viewport down / up
 *   H       jump to 25% of the document
 *   M       jump to 50%
 *   L       jump to 75%
 *
 * Modes:
 *   t       toggle theme (light / dark)
 *   p       toggle paper mode
 *   w       toggle narrow reading column
 *
 * Typing inputs / modifier keys (Cmd/Ctrl/Alt) are always ignored.
 * Two-key sequences (gg) expire after a short window.
 */
export default function useShortcuts(sectionIds: string[]) {
    const { toggle: toggleTheme } = useTheme()

    useEffect(() => {
        const root = document.documentElement
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

        // Find the index of the section currently most-visible; fall back to
        // the last-passed section based on scroll position.
        const currentSectionIndex = (): number => {
            const ids = sectionIds
            const probe = window.scrollY + window.innerHeight * PROBE_VIEWPORT_RATIO
            let lastPassed = 0
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
            const ids = sectionIds
            if (ids.length === 0) return
            const next = Math.max(0, Math.min(ids.length - 1, currentSectionIndex() + delta))
            smoothScrollToId(ids[next], SHORTCUT_SCROLL_DURATION_MS, NAVBAR_OFFSET_PX)
        }

        const onKey = (e: KeyboardEvent) => {
            if (isTyping(e.target)) return
            if (e.metaKey || e.ctrlKey || e.altKey) return

            // Two-key sequence: g-prefix
            if (pendingLeader === 'g') {
                clearPending()
                if (e.key === 'g') {
                    e.preventDefault()
                    scrollToTop()
                }
                // Unknown continuation: drop silently; the leader is gone.
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
                case 'p': {
                    e.preventDefault()
                    const next = root.getAttribute('data-paper') === 'on' ? 'off' : 'on'
                    root.setAttribute('data-paper', next)
                    return
                }
                case 'w': {
                    e.preventDefault()
                    const next = root.getAttribute('data-width') === 'narrow' ? 'wide' : 'narrow'
                    root.setAttribute('data-width', next)
                    return
                }
            }
        }

        window.addEventListener('keydown', onKey)
        return () => {
            window.removeEventListener('keydown', onKey)
            clearPending()
        }
    }, [sectionIds, toggleTheme])
}
