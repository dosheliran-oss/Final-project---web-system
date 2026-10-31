import { describe, expect, it } from 'vitest'
import type { Character } from '../types'
import {
  filterCharacters,
  getIdFromUrl,
  parseMeasurement,
  toggleFavorite,
} from './helpers'

function makeCharacter(id: string, name: string): Character {
  return {
    id,
    name,
    height: 'unknown',
    mass: 'unknown',
    birth_year: 'unknown',
    eye_color: 'unknown',
  }
}

const characters: Character[] = [
  makeCharacter('1', 'Luke Skywalker'),
  makeCharacter('4', 'Darth Vader'),
  makeCharacter('11', 'Anakin Skywalker'),
  makeCharacter('13', 'Chewbacca'),
]

describe('toggleFavorite', () => {
  const luke = characters[0]
  const vader = characters[1]

  it('adds a character that is not a favorite yet', () => {
    expect(toggleFavorite([vader], luke)).toEqual([vader, luke])
  })

  it('removes a character that is already a favorite', () => {
    expect(toggleFavorite([luke, vader], luke)).toEqual([vader])
  })

  it('matches by id, so it never creates duplicates', () => {
    const lukeCopy = { ...luke }
    expect(toggleFavorite([luke], lukeCopy)).toEqual([])
  })

  it('does not change the original list', () => {
    const favorites = [luke]
    toggleFavorite(favorites, vader)
    expect(favorites).toEqual([luke])
  })
})

describe('filterCharacters', () => {
  it('ignores upper and lower case', () => {
    const names = filterCharacters(characters, 'SKY').map((c) => c.name)
    expect(names).toEqual(['Luke Skywalker', 'Anakin Skywalker'])
  })

  it('ignores spaces around the query', () => {
    expect(filterCharacters(characters, '  vader  ')).toHaveLength(1)
  })

  it('returns the full list for an empty or blank query', () => {
    expect(filterCharacters(characters, '')).toEqual(characters)
    expect(filterCharacters(characters, '   ')).toEqual(characters)
  })

  it('returns an empty list when no name matches', () => {
    expect(filterCharacters(characters, 'yoda')).toEqual([])
  })
})

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
