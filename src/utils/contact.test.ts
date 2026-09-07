import { describe, expect, it } from 'vitest'
import { mapsUrl, stripProtocol } from './contact'

describe('stripProtocol', () => {
    it('strips https', () => {
        expect(stripProtocol('https://example.com')).toBe('example.com')
    })

    it('strips http', () => {
        expect(stripProtocol('http://example.com')).toBe('example.com')
    })

    it('leaves a bare host unchanged', () => {
        expect(stripProtocol('example.com')).toBe('example.com')
    })
})

describe('mapsUrl', () => {
    it('targets google maps', () => {
        expect(mapsUrl('Bangalore, India')).toContain('google.com/maps')
    })

    it('encodes the place into the query', () => {
        const url = mapsUrl('Bangalore, India')
        expect(url).toContain(encodeURIComponent('Bangalore, India'))
    })
})
