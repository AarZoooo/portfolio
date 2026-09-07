import { useEffect } from 'react'
import type { RefObject } from 'react'

interface UseFocusTrapArgs {
    open: boolean
    containerId: string
    triggerRef: RefObject<HTMLElement | null>
}

// Matches links and non-disabled buttons. Kept narrow on purpose: the
// dialog only houses these two element kinds, so we don't pull in the
// full tabbable heuristic (input, select, textarea, [tabindex], ...).
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])'

export function useFocusTrap({ open, containerId, triggerRef }: UseFocusTrapArgs) {
    useEffect(() => {
        if (!open) return
        const container = document.getElementById(containerId)
        if (!container) return
        // Capture the trigger now; the ref may have changed by cleanup time.
        const trigger = triggerRef.current

        const collect = () =>
            Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))

        // Move focus into the dialog on open.
        collect()[0]?.focus()

        const onKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return
            const items = collect()
            if (items.length === 0) return
            const first = items[0]
            const last = items[items.length - 1]
            const activeEl = document.activeElement
            const inside = activeEl instanceof HTMLElement && container.contains(activeEl)
            if (e.shiftKey) {
                if (activeEl === first || !inside) {
                    e.preventDefault()
                    last.focus()
                }
            } else {
                if (activeEl === last || !inside) {
                    e.preventDefault()
                    first.focus()
                }
            }
        }

        container.addEventListener('keydown', onKey)
        return () => {
            container.removeEventListener('keydown', onKey)
            // Restore to the control that invoked the dialog.
            trigger?.focus()
        }
    }, [open, containerId, triggerRef])
}
