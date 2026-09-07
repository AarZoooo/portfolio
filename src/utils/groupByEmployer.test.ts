import { describe, expect, it } from 'vitest'
import { groupByEmployer } from './groupByEmployer'
import type { Experience } from '@type/portfolio'

const mk = (company: string, role: string): Experience => ({
    company,
    role,
    duration: '2020',
    logo: 'x',
    summary: [],
    tech: [],
})

describe('groupByEmployer', () => {
    it('groups consecutive same-employer roles', () => {
        const groups = groupByEmployer([
            mk('A', 'r1'),
            mk('A', 'r2'),
            mk('B', 'r3'),
        ])
        expect(groups).toHaveLength(2)
        expect(groups[0].company).toBe('A')
        expect(groups[0].roles).toHaveLength(2)
        expect(groups[1].company).toBe('B')
        expect(groups[1].roles).toHaveLength(1)
    })

    it('keeps non-consecutive same-employer stints separate', () => {
        const groups = groupByEmployer([
            mk('A', 'r1'),
            mk('B', 'r2'),
            mk('A', 'r3'),
        ])
        expect(groups).toHaveLength(3)
    })

    it('returns empty for empty input', () => {
        expect(groupByEmployer([])).toEqual([])
    })

    it('returns one group for a single item', () => {
        const groups = groupByEmployer([mk('A', 'r1')])
        expect(groups).toHaveLength(1)
        expect(groups[0].roles[0].role).toBe('r1')
    })
})
