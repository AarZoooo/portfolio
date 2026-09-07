import { useCallback, useSyncExternalStore } from 'react'
import { PALETTES, DEFAULT_PALETTE } from '@utils/palettes'

export type Width = 'wide' | 'narrow'

interface ThemeState {
    paletteIndex: number
    width: Width
}

const STORAGE_KEYS = {
    palette: 'palette',
    width: 'width',
} as const

const ATTRS = {
    palette: 'data-palette',
    width: 'data-width',
} as const

/* ---- Module-level store ---------------------------------------------
   Multiple components call useTheme() and must stay in sync (navbar
   palette button, keyboard shortcuts, etc.). useSyncExternalStore is the
   correct primitive: one source of truth, React reads and subscribes to it.

   Initial state is read from the DOM, which InitialAttrs.astro has
   already hydrated from localStorage before first paint. */

type Listener = () => void
const listeners = new Set<Listener>()

const DEFAULT_PALETTE_INDEX = PALETTES.findIndex((p) => p.name === DEFAULT_PALETTE)

function paletteIndexFromName(name: string | null): number {
    if (name == null) return DEFAULT_PALETTE_INDEX
    const idx = PALETTES.findIndex((p) => p.name === name)
    return idx === -1 ? DEFAULT_PALETTE_INDEX : idx
}

function readDOM(): ThemeState {
    if (typeof document === 'undefined') {
        return { paletteIndex: 0, width: 'wide' }
    }
    const root = document.documentElement
    // getAttribute returns string | null; InitialAttrs guarantees valid values
    const widthAttr = root.getAttribute(ATTRS.width)
    return {
        paletteIndex: paletteIndexFromName(root.getAttribute(ATTRS.palette)),
        width: widthAttr === 'narrow' ? 'narrow' : 'wide',
    }
}

let current: ThemeState = readDOM()

function apply(next: Partial<ThemeState>) {
    let changed = false
    const root = typeof document !== 'undefined' ? document.documentElement : null

    if (next.paletteIndex !== undefined && next.paletteIndex !== current.paletteIndex) {
        changed = true
        current = { ...current, paletteIndex: next.paletteIndex }
        root?.setAttribute(ATTRS.palette, PALETTES[next.paletteIndex].name)
        try {
            localStorage.setItem(STORAGE_KEYS.palette, String(next.paletteIndex))
        } catch {
            /* localStorage blocked — DOM-only is still fine for this session */
        }
    }

    if (next.width !== undefined && next.width !== current.width) {
        changed = true
        current = { ...current, width: next.width }
        root?.setAttribute(ATTRS.width, next.width)
        try {
            localStorage.setItem(STORAGE_KEYS.width, next.width)
        } catch {
            /* localStorage blocked — DOM-only is still fine for this session */
        }
    }

    if (changed) listeners.forEach((l) => l())
}

function setPaletteIndex(index: number) {
    const clamped = Math.max(0, Math.min(index, PALETTES.length - 1))
    if (clamped !== current.paletteIndex) apply({ paletteIndex: clamped })
}

function cyclePalette(direction = 1) {
    const len = PALETTES.length
    const next = (current.paletteIndex + direction + len) % len
    apply({ paletteIndex: next })
}

function toggleMonochrome() {
    // Tap-t: jump to a monochrome. From a monochrome, flip to the other;
    // from a colored palette, return to the OS-mapped home monochrome.
    if (current.paletteIndex === 0) {
        apply({ paletteIndex: 1 })
    } else if (current.paletteIndex === 1) {
        apply({ paletteIndex: 0 })
    } else {
        let dark = false
        if (typeof window !== 'undefined') {
            dark = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        apply({ paletteIndex: dark ? 1 : 0 })
    }
}

function toggleWidth() {
    apply({ width: current.width === 'narrow' ? 'wide' : 'narrow' })
}

// Follow OS color-scheme when no explicit palette preference is stored.
if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', (e) => {
        try {
            if (!localStorage.getItem(STORAGE_KEYS.palette)) {
                apply({ paletteIndex: e.matches ? 1 : 0 })
            }
        } catch {
            apply({ paletteIndex: e.matches ? 1 : 0 })
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
const getServerSnapshot = (): ThemeState => ({ paletteIndex: 0, width: 'wide' })

export function useTheme() {
    const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

    return {
        paletteIndex: state.paletteIndex,
        palette: PALETTES[state.paletteIndex].name,
        width: state.width,
        setPaletteIndex: useCallback((i: number) => setPaletteIndex(i), []),
        cyclePalette: useCallback((direction = 1) => cyclePalette(direction), []),
        toggleMonochrome: useCallback(() => toggleMonochrome(), []),
        toggleWidth: useCallback(() => toggleWidth(), []),
    }
}
