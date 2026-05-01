/**
 * Shared icon paths used across the site. Two surfaces consume these:
 *
 *  - React components, via the JSX helpers (`<CopyIcon />`, `<CheckIcon />`)
 *  - Raw runtime injection (e.g. attaching a copy button to Shiki output),
 *    via the HTML string helpers (`copyIconHTML()`, `checkIconHTML()`)
 *
 * Keep the path data in one place so visual updates ripple to every
 * consumer at once.
 */

import type { SVGProps } from 'react'

/* ------------------------------------------------------------------ */
/* Path data — single source of truth.                                 */
/* ------------------------------------------------------------------ */

/** Stacked-rectangles "copy to clipboard" glyph. */
const COPY_PATHS = [
    '<rect x="9" y="9" width="13" height="13" rx="2" />',
    '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />',
] as const

/** Bold checkmark glyph. */
const CHECK_PATHS = ['<path d="M20 6L9 17l-5-5" />'] as const

const SVG_BASE_ATTRS =
    'viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"'

/* ------------------------------------------------------------------ */
/* HTML strings — for runtime injection (e.g. Shiki post-process).     */
/* ------------------------------------------------------------------ */

export function copyIconHTML(extraClass = 'copy-icon'): string {
    return `<svg class="${extraClass}" ${SVG_BASE_ATTRS} stroke-width="1.8">${COPY_PATHS.join('')}</svg>`
}

export function checkIconHTML(extraClass = 'check-icon'): string {
    return `<svg class="${extraClass}" ${SVG_BASE_ATTRS} stroke-width="2">${CHECK_PATHS.join('')}</svg>`
}

/* ------------------------------------------------------------------ */
/* React JSX components — for in-tree use.                             */
/* ------------------------------------------------------------------ */

const baseSvgProps = {
    viewBox: '0 0 24 24',
    width: 14,
    height: 14,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
} satisfies SVGProps<SVGSVGElement>

export function CopyIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...baseSvgProps} strokeWidth={1.8} {...props}>
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    )
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...baseSvgProps} strokeWidth={2} {...props}>
            <path d="M20 6L9 17l-5-5" />
        </svg>
    )
}
