const easeInOutCubic = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function smoothScrollToId(id: string, duration = 900, offset = 0): void {
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
