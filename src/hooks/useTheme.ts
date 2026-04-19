import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getInitial(): Theme {
    if (typeof window === 'undefined') return 'light'
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme(): { theme: Theme; toggle: () => void } {
    const [theme, setTheme] = useState<Theme>(getInitial)

    useEffect(() => {
        document.documentElement.setAttribute('theme', theme)
        window.localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = (e: MediaQueryListEvent) => {
            if (!window.localStorage.getItem(STORAGE_KEY)) {
                setTheme(e.matches ? 'dark' : 'light')
            }
        }
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    const toggle = useCallback(() => {
        setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
    }, [])

    return { theme, toggle }
}
