import { describe, expect, it } from 'vitest'
import { easeInOutCubic, NAVBAR_OFFSET_PX } from './smoothScroll'

describe('easeInOutCubic', () => {
    it('returns 0 at t=0', () => {
        expect(easeInOutCubic(0)).toBe(0)
    })

    it('returns 1 at t=1', () => {
        expect(easeInOutCubic(1)).toBe(1)
    })

    it('returns 0.5 at t=0.5 (symmetry)', () => {
        expect(easeInOutCubic(0.5)).toBe(0.5)
    })

    it('is monotonically increasing', () => {
        const a = easeInOutCubic(0.25)
        const b = easeInOutCubic(0.5)
        const c = easeInOutCubic(0.75)
        expect(a).toBeLessThan(b)
        expect(b).toBeLessThan(c)
    })
})

describe('NAVBAR_OFFSET_PX', () => {
    it('is a positive number', () => {
        expect(typeof NAVBAR_OFFSET_PX).toBe('number')
        expect(NAVBAR_OFFSET_PX).toBeGreaterThan(0)
    })

    it('is 80', () => {
        expect(NAVBAR_OFFSET_PX).toBe(80)
    })
})
