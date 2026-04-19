import { useEffect, useState } from 'react'

interface Options {
    typeMs?: number
    deleteMs?: number
    holdMs?: number
    gapMs?: number
}

type Phase = 'typing' | 'holding' | 'deleting' | 'gap'

export function useTypewriter(lines: string[], opts: Options = {}): string {
    const { typeMs = 55, deleteMs = 30, holdMs = 1800, gapMs = 400 } = opts
    const [index, setIndex] = useState(0)
    const [text, setText] = useState('')
    const [phase, setPhase] = useState<Phase>('typing')

    useEffect(() => {
        if (!lines.length) return
        const reduced =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduced) {
            setText(lines[0])
            return
        }

        const current = lines[index % lines.length]
        let t: number | undefined

        if (phase === 'typing') {
            if (text.length < current.length) {
                t = window.setTimeout(
                    () => setText(current.slice(0, text.length + 1)),
                    typeMs,
                )
            } else {
                setPhase('holding')
            }
        } else if (phase === 'holding') {
            t = window.setTimeout(() => setPhase('deleting'), holdMs)
        } else if (phase === 'deleting') {
            if (text.length > 0) {
                t = window.setTimeout(
                    () => setText(current.slice(0, text.length - 1)),
                    deleteMs,
                )
            } else {
                setPhase('gap')
            }
        } else if (phase === 'gap') {
            t = window.setTimeout(() => {
                setIndex((i) => i + 1)
                setPhase('typing')
            }, gapMs)
        }

        return () => {
            if (t !== undefined) window.clearTimeout(t)
        }
    }, [text, phase, index, lines, typeMs, deleteMs, holdMs, gapMs])

    return text
}
