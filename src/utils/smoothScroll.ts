/** Cubic in/out — the canonical motion curve for the site. Reused
 *  anywhere a scripted animation needs the same feel as smoothScrollToId. */
export const easeInOutCubic = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const SCROLL_DURATION_MS = 900
export const NAVBAR_OFFSET_PX = 80

export function smoothScrollToId(
    id: string,
    duration = SCROLL_DURATION_MS,
    offset = NAVBAR_OFFSET_PX,
): void {
    const el = document.getElementById(id)
    if (!el) return

    const startY = window.scrollY
    const targetY = el.getBoundingClientRect().top + startY - offset
    const distance = targetY - startY
    const startTime = performance.now()

    const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
        window.scrollTo(0, targetY)
        return
    }

    const step = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        window.scrollTo(0, startY + distance * easeInOutCubic(progress))
        if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}
