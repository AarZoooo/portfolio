import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getInitial(): Theme {
    if (typeof window === 'undefined') return 'light'
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/* ---- Module-level store ---------------------------------------------
   Multiple components call useTheme() and must stay in sync (navbar
   button + keyboard shortcut `t`). React's own `useSyncExternalStore`
   is the correct primitive for this: one source of truth, React reads
   and subscribes to it. */

type Listener = () => void
const listeners = new Set<Listener>()
let current: Theme = typeof window === 'undefined' ? 'light' : getInitial()

function setGlobalTheme(next: Theme) {
    if (next === current) return
    current = next
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('theme', next)
    }
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, next)
    }
    listeners.forEach((l) => l())
}

// Apply the initial theme to the DOM once at module load, and follow OS
// changes while no explicit preference is stored.
if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('theme', current)
}
if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', (e) => {
        if (!window.localStorage.getItem(STORAGE_KEY)) {
            setGlobalTheme(e.matches ? 'dark' : 'light')
        }
    })
}

const subscribe = (cb: Listener) => {
    listeners.add(cb)
    return () => {
        listeners.delete(cb)
    }
}
const getSnapshot = (): Theme => current
const getServerSnapshot = (): Theme => 'light'

export function useTheme(): { theme: Theme; toggle: () => void } {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

    const toggle = useCallback(() => {
        setGlobalTheme(current === 'dark' ? 'light' : 'dark')
    }, [])

    return { theme, toggle }
}
