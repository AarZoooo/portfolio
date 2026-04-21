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

export function useTypewriter(lines: string[], opts: Options = {}): string {
    const { typeMs = 55, deleteMs = 30, holdMs = 1800, gapMs = 400 } = opts
    const [index, setIndex] = useState(0)
    // Seed text from the first line directly when reduced-motion is on,
    // so the effect body never needs to call setState synchronously just
    // to establish the static-text case.
    const [text, setText] = useState<string>(() =>
        prefersReducedMotion() && lines[0] ? lines[0] : '',
    )
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
                // Fully deleted — gap, then advance to next line.
                t = window.setTimeout(() => {
                    setIndex((i) => i + 1)
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
