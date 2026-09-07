import { describe, expect, it } from 'vitest'
import { buildDateLabel, withBuildDate } from './buildInfo'

describe('buildDateLabel', () => {
    it('matches "Last updated <Month> <Year>"', () => {
        expect(buildDateLabel).toMatch(/^Last updated [A-Z][a-z]+ \d{4}$/)
    })
})

describe('withBuildDate', () => {
    it('appends the build date to meta and preserves existing entries', () => {
        const result = withBuildDate({ meta: ['x'] })
        expect(result.meta).toHaveLength(2)
        expect(result.meta[0]).toBe('x')
        expect(result.meta[1]).toBe(buildDateLabel)
    })

    it('does not mutate the input', () => {
        const input = { meta: ['x'] }
        withBuildDate(input)
        expect(input.meta).toEqual(['x'])
    })
})
