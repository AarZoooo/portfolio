import { describe, expect, it } from 'vitest'
import { SHORT_TECH, techLine } from './workItem'

describe('techLine', () => {
    it('collapses beyond SHORT_TECH when closed', () => {
        expect(techLine(['a', 'b', 'c'], false)).toBe('a · b · +1 more')
    })

    it('shows all tech when open', () => {
        expect(techLine(['a', 'b', 'c'], true)).toBe('a · b · c')
    })

    it('does not collapse when length <= SHORT_TECH', () => {
        expect(techLine(['a', 'b'], false)).toBe('a · b')
    })

    it('SHORT_TECH is 2', () => {
        expect(SHORT_TECH).toBe(2)
    })
})
