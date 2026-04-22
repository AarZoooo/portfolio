import { useEffect, useState } from 'react'

interface Options {
    typeMs?: number
    deleteMs?: number
    holdMs?: number
    gapMs?: number
}

// Two-phase machine — 'holding' collapses into the typing-complete branch
// (hold timer fires, then flips to deleting) and 'gap' collapses into the
// deleting-complete branch (gap timer fires, then advances index and
// flips back to typing). Fewer phases, no synchronous setState in effect.
type Phase = 'typing' | 'deleting'

const prefersReducedMotion = (): boolean =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Pick a random index from [0, count) that isn't `exclude`. */
function randomIndex(count: number, exclude: number): number {
    if (count <= 1) return 0
    let next = exclude
    while (next === exclude) next = Math.floor(Math.random() * count)
    return next
}

export function useTypewriter(lines: string[], opts: Options = {}): string {
    const { typeMs = 55, deleteMs = 30, holdMs = 1800, gapMs = 400 } = opts
    // Seed the starting index randomly so refreshes don't always open with
    // the same line. Lazy init keeps Math.random outside the render body.
    const [index, setIndex] = useState<number>(() =>
        lines.length ? Math.floor(Math.random() * lines.length) : 0,
    )
    // Seed text with a random static line when reduced-motion is on;
    // otherwise start empty and let the effect type it out.
    const [text, setText] = useState<string>(() => {
        if (!lines.length) return ''
        if (prefersReducedMotion()) {
            return lines[Math.floor(Math.random() * lines.length)]
        }
        return ''
    })
    const [phase, setPhase] = useState<Phase>('typing')

    useEffect(() => {
        if (!lines.length) return
        if (prefersReducedMotion()) return

        const current = lines[index % lines.length]
        let t: number | undefined

        if (phase === 'typing') {
            if (text.length < current.length) {
                t = window.setTimeout(
                    () => setText(current.slice(0, text.length + 1)),
                    typeMs,
                )
            } else {
                // Fully typed — hold, then flip to deleting.
                t = window.setTimeout(() => setPhase('deleting'), holdMs)
            }
        } else if (phase === 'deleting') {
            if (text.length > 0) {
                t = window.setTimeout(
                    () => setText(current.slice(0, text.length - 1)),
                    deleteMs,
                )
            } else {
                // Fully deleted — gap, then pick a new random line that
                // isn't the one we just finished.
                t = window.setTimeout(() => {
                    setIndex((i) => randomIndex(lines.length, i))
                    setPhase('typing')
                }, gapMs)
            }
        }

        return () => {
            if (t !== undefined) window.clearTimeout(t)
        }
    }, [text, phase, index, lines, typeMs, deleteMs, holdMs, gapMs])

    return text
}
