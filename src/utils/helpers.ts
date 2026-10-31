import type { Character, SwapiCharacter } from '../types'

// "https://swapi.info/api/people/1" -> "1" (a trailing slash is allowed)
export function getIdFromUrl(url: string): string {
  return url.split('/').filter(Boolean).pop() ?? ''
}

// Keeps only the fields the app stores, and adds the id from the url.
export function toCharacter(person: SwapiCharacter): Character {
  return {
    id: getIdFromUrl(person.url),
    name: person.name,
    height: person.height,
    mass: person.mass,
    birth_year: person.birth_year,
    eye_color: person.eye_color,
  }
}

// Adds the character if it is not a favorite yet, removes it otherwise.
// Matching is by id, so the list never holds the same character twice.
export function toggleFavorite(favorites: Character[], character: Character): Character[] {
  if (favorites.some((favorite) => favorite.id === character.id)) {
    return favorites.filter((favorite) => favorite.id !== character.id)
  }
  return [...favorites, character]
}

// Case-insensitive name search. An empty or blank query keeps every character.
export function filterCharacters(list: Character[], query: string): Character[] {
  const normalized = query.trim().toLowerCase()
  if (normalized === '') return list
  return list.filter((character) =>
    character.name.toLowerCase().includes(normalized),
  )
}

// "1,358" -> 1358, "unknown" / "n/a" / "" -> null
export function parseMeasurement(value: string): number | null {
  const cleaned = value.replace(/,/g, '').trim()
  if (cleaned === '') return null
  const number = Number(cleaned)
  return Number.isFinite(number) ? number : null
}
