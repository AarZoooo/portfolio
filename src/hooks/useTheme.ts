import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'
export type Width = 'wide' | 'narrow'

interface ThemeState {
    theme: Theme
    width: Width
}

const STORAGE_KEYS = {
    theme: 'theme',
    width: 'width',
} as const

const ATTRS = {
    theme: 'theme',
    width: 'data-width',
} as const

/* ---- Module-level store ---------------------------------------------
   Multiple components call useTheme() and must stay in sync (navbar
   theme button, keyboard shortcuts, etc.). useSyncExternalStore is the
   correct primitive: one source of truth, React reads and subscribes to it.

   Initial state is read from the DOM, which InitialAttrs.astro has
   already hydrated from localStorage before first paint. */

type Listener = () => void
const listeners = new Set<Listener>()

function readDOM(): ThemeState {
    if (typeof document === 'undefined') {
        return { theme: 'light', width: 'wide' }
    }
    const root = document.documentElement
    // getAttribute returns string | null; InitialAttrs guarantees valid values
    return {
        theme: (root.getAttribute(ATTRS.theme) as Theme) ?? 'dark',
        width: (root.getAttribute(ATTRS.width) as Width) ?? 'wide',
    }
}

let current: ThemeState = readDOM()

function apply(next: Partial<ThemeState>) {
    let changed = false
    const root = typeof document !== 'undefined' ? document.documentElement : null

    // Object.keys returns string[]; we know next is Partial<ThemeState>
    for (const key of Object.keys(next) as (keyof ThemeState)[]) {
        const value = next[key]
        if (value === undefined || value === current[key]) continue
        changed = true
        current = { ...current, [key]: value }
        root?.setAttribute(ATTRS[key], value)
        try {
            localStorage.setItem(STORAGE_KEYS[key], value)
        } catch {
            /* localStorage blocked — DOM-only is still fine for this session */
        }
    }

    if (changed) listeners.forEach((l) => l())
}

// Follow OS theme changes when no explicit preference is stored.
if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', (e) => {
        try {
            if (!localStorage.getItem(STORAGE_KEYS.theme)) {
                apply({ theme: e.matches ? 'dark' : 'light' })
            }
        } catch {
            apply({ theme: e.matches ? 'dark' : 'light' })
        }
    })
}

const subscribe = (cb: Listener) => {
    listeners.add(cb)
    return () => {
        listeners.delete(cb)
    }
}
const getSnapshot = (): ThemeState => current
const getServerSnapshot = (): ThemeState => ({ theme: 'light', width: 'wide' })

export function useTheme() {
    const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

    return {
        ...state,
        toggleTheme: useCallback(() => {
            apply({ theme: current.theme === 'dark' ? 'light' : 'dark' })
        }, []),
        toggleWidth: useCallback(() => {
            apply({ width: current.width === 'narrow' ? 'wide' : 'narrow' })
        }, []),
    }
}
