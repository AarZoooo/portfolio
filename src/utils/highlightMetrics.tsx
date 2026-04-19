import type { ReactNode } from 'react'

export function highlightMetrics(text: string): ReactNode[] {
    const parts = text.split(/(\S*\d\S*)/g)
    return parts.map((p, i) =>
        /\d/.test(p) ? (
            <strong key={i} className="metric">{p}</strong>
        ) : (
            <span key={i}>{p}</span>
        ),
    )
}
