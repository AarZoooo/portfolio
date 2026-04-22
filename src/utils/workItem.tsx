import { highlightMetrics } from './highlightMetrics'

/** Number of tech tags shown before collapsing into "+N more". */
export const SHORT_TECH = 2

/** Render the tech line, truncating when the card is collapsed. */
export function techLine(tech: string[], open: boolean): string {
    if (open || tech.length <= SHORT_TECH) return tech.join(' · ')
    const shown = tech.slice(0, SHORT_TECH).join(' · ')
    return `${shown} · +${tech.length - SHORT_TECH} more`
}

/** Render a list of paragraph strings with metric-highlighting. */
export function renderParas(paras: string[], containerClass: string, paraClass: string) {
    return (
        <div className={containerClass}>
            {paras.map((p, i) => (
                <p key={i} className={paraClass}>{highlightMetrics(p)}</p>
            ))}
        </div>
    )
}
