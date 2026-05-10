/** Cubic in/out — the canonical motion curve for the site. Reused
 *  anywhere a scripted animation needs the same feel as smoothScrollToId. */
export const easeInOutCubic = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const SCROLL_DURATION_MS = 900
export const NAVBAR_OFFSET_PX = 80

export function smoothScrollToY(
    targetY: number,
    duration = SCROLL_DURATION_MS,
): void {
    const startY = window.scrollY
    const distance = targetY - startY
    if (distance === 0) return
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

export function smoothScrollToId(
    id: string,
    duration = SCROLL_DURATION_MS,
    offset = NAVBAR_OFFSET_PX,
): void {
    const el = document.getElementById(id)
    if (!el) return
    const targetY = el.getBoundingClientRect().top + window.scrollY - offset
    smoothScrollToY(targetY, duration)
}
