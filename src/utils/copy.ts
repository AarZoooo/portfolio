/**
 * Clipboard utilities. Two surfaces:
 *
 *  - `copyText(text)` — write a string to the clipboard with a legacy
 *    `execCommand` fallback. Use whenever you need to copy programmatically.
 *
 *  - `attachClickCopyDelegation()` — installs a single document-level click
 *    handler that walks `[data-copy]` buttons and runs the standard
 *    "copied" animation (cross-fade icon, hold, fade out). Idempotent
 *    via a sentinel attribute on `document`.
 *
 * The animation is driven by two attributes on the button:
 *   [data-copied]  copy icon hidden, check shown, button held visible
 *   [data-fading]  whole button fades out while still showing the check
 *
 * CSS for those states lives with each consumer (Contact, prose, etc.)
 * so the visual stays controllable per-surface.
 */

import { DURATION_MEDIUM_MS } from './motion'

/** Attribute contract shared with consumers (Contact rows, blog code
 *  blocks). CSS for those states lives with each consumer. */
export const COPY_ATTRS = {
    copy: 'data-copy',
    copied: 'data-copied',
    fading: 'data-fading',
} as const

const COPY_FEEDBACK_MS = 1500
const COPY_FADE_MS = DURATION_MEDIUM_MS
const DELEGATION_FLAG = 'data-copy-delegation-attached'

/** Write `text` to the clipboard. Tries the modern Async Clipboard API first;
 *  falls back to a hidden textarea + `execCommand('copy')` when the modern
 *  path is unavailable or refuses (insecure context, document not focused). */
export async function copyText(text: string): Promise<boolean> {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text)
            return true
        }
    } catch {
        // fall through to legacy path
    }

    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
        ok = document.execCommand('copy')
    } catch {
        ok = false
    }
    document.body.removeChild(ta)
    return ok
}

/** Run the standard copied → fading → reset sequence on a button element. */
export function flashCopiedFeedback(btn: HTMLElement): void {
    btn.setAttribute(COPY_ATTRS.copied, '')
    window.setTimeout(() => {
        btn.setAttribute(COPY_ATTRS.fading, '')
        window.setTimeout(() => {
            btn.removeAttribute(COPY_ATTRS.copied)
            btn.removeAttribute(COPY_ATTRS.fading)
        }, COPY_FADE_MS)
    }, COPY_FEEDBACK_MS)
}

/** Document-level click delegation for `[data-copy]` buttons. Idempotent —
 *  safe to call multiple times (e.g. from per-page islands).
 *
 *  Markup contract: any `<button data-copy="text-to-copy">` becomes a
 *  copy-on-click control. Listeners are detached automatically on
 *  `pagehide` so they don't accumulate across SPA-style navigations. */
export function attachClickCopyDelegation(): void {
    if (document.documentElement.hasAttribute(DELEGATION_FLAG)) return
    document.documentElement.setAttribute(DELEGATION_FLAG, '')

    document.addEventListener('click', async (e) => {
        // EventTarget is too broad; click always fires on an Element
    const target = e.target as HTMLElement | null
        const btn = target?.closest<HTMLButtonElement>(`button[${COPY_ATTRS.copy}]`)
        if (!btn) return
        const text = btn.dataset.copy
        if (!text) return
        const ok = await copyText(text)
        if (!ok) return
        flashCopiedFeedback(btn)
    })
}
