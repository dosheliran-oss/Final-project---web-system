import type { Character } from '../types'

// "https://swapi.info/api/people/1" -> "1" (a trailing slash is allowed)
export function getIdFromUrl(url: string): string {
  return url.split('/').filter(Boolean).pop() ?? ''
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
