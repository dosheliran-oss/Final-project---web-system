import { describe, expect, it } from 'vitest'
import { getAlignment } from './alignment'

describe('getAlignment', () => {
  it('puts listed Dark Side characters on the villain side', () => {
    expect(getAlignment('Darth Vader')).toBe('villain')
    expect(getAlignment('Grievous')).toBe('villain')
  })

  it('treats everyone else as a hero', () => {
    expect(getAlignment('Luke Skywalker')).toBe('hero')
    expect(getAlignment('Yoda')).toBe('hero')
  })

  it('ignores case and surrounding spaces', () => {
    expect(getAlignment('  darth MAUL ')).toBe('villain')
  })
})
