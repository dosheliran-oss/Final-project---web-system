import { describe, expect, it } from 'vitest'
import { getIdFromUrl, parseMeasurement } from './helpers'

describe('getIdFromUrl', () => {
  it('returns the id at the end of a SWAPI url', () => {
    expect(getIdFromUrl('https://swapi.info/api/people/1')).toBe('1')
  })

  it('handles multi-digit ids that are not sequential', () => {
    expect(getIdFromUrl('https://swapi.info/api/people/18')).toBe('18')
  })

  it('ignores a trailing slash', () => {
    expect(getIdFromUrl('https://swapi.info/api/planets/1/')).toBe('1')
  })

  it('returns an empty string for an empty url', () => {
    expect(getIdFromUrl('')).toBe('')
  })
})

describe('parseMeasurement', () => {
  it('converts a plain numeric string to a number', () => {
    expect(parseMeasurement('172')).toBe(172)
  })

  it('removes thousands separators', () => {
    expect(parseMeasurement('1,358')).toBe(1358)
  })

  it('keeps decimal values', () => {
    expect(parseMeasurement('78.2')).toBe(78.2)
  })

  it('returns null for "unknown"', () => {
    expect(parseMeasurement('unknown')).toBeNull()
  })

  it('returns null for "n/a" and empty strings', () => {
    expect(parseMeasurement('n/a')).toBeNull()
    expect(parseMeasurement('')).toBeNull()
    expect(parseMeasurement('   ')).toBeNull()
  })
})
