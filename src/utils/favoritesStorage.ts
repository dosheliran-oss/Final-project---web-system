import type { Character } from '../types'

const STORAGE_KEY = 'star-wars-favorites'

const STRING_FIELDS = ['id', 'name', 'height', 'mass', 'birth_year', 'eye_color'] as const

// Rebuilds a Character from saved data, or returns null if it is broken.
// Favorites saved before film_count existed get 0; the favorites page does not show it.
function toSavedCharacter(value: unknown): Character | null {
  if (typeof value !== 'object' || value === null) return null
  const record = value as Record<string, unknown>
  if (!STRING_FIELDS.every((key) => typeof record[key] === 'string')) return null
  const filmCount = record.film_count
  return {
    id: record.id as string,
    name: record.name as string,
    height: record.height as string,
    mass: record.mass as string,
    birth_year: record.birth_year as string,
    eye_color: record.eye_color as string,
    film_count: typeof filmCount === 'number' ? filmCount : 0,
  }
}

// Returns an empty list if nothing is saved, the data is broken,
// or localStorage is blocked (e.g. some private browsing modes).
export function loadFavorites(): Character[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(saved)) return []
    return saved
      .map(toSavedCharacter)
      .filter((character): character is Character => character !== null)
  } catch {
    return []
  }
}

export function saveFavorites(favorites: Character[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // Storage is full or blocked; favorites still work until the page reloads.
  }
}
