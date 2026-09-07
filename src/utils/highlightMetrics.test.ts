import { describe, expect, it } from 'vitest'
import type { ReactElement, ReactNode } from 'react'
import { highlightMetrics } from './highlightMetrics'

interface MetricProps {
    className?: string
    children?: ReactNode
}

function isElement(node: ReactNode): node is ReactElement<MetricProps> {
    return typeof node === 'object' && node !== null && 'props' in node
}

function metricValues(text: string): string[] {
    return highlightMetrics(text)
        .filter(
            (node): node is ReactElement<MetricProps> =>
                isElement(node) && node.props.className === 'metric',
        )
        .map((node) => String(node.props.children))
}

describe('highlightMetrics', () => {
    it('returns an array', () => {
        expect(Array.isArray(highlightMetrics('no digits here'))).toBe(true)
    })

    it('wraps a digit-containing word in strong.metric', () => {
        const result = highlightMetrics('speed 1 up')
        const metrics = metricValues('speed 1 up')
        expect(metrics).toEqual(['1'])
        const strong = result.find(
            (node) =>
                isElement(node) &&
                node.props.className === 'metric',
        )
        expect(strong).toBeDefined()
    })

    it('wraps 1 and 5 in the long sentence', () => {
        const metrics = metricValues(
            'reduced ticket creation time from 1 hour to 5 minutes',
        )
        expect(metrics).toEqual(['1', '5'])
    })

    it('returns one element for an empty string', () => {
        const result = highlightMetrics('')
        expect(result).toHaveLength(1)
    })

    it('returns one element for a string with no digits', () => {
        const result = highlightMetrics('no digits here')
        expect(result).toHaveLength(1)
    })
})
