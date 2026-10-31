import type { Character } from '../types'

const STORAGE_KEY = 'star-wars-favorites'

function isCharacter(value: unknown): value is Character {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return ['id', 'name', 'height', 'mass', 'birth_year', 'eye_color'].every(
    (key) => typeof record[key] === 'string',
  )
}

// Returns an empty list if nothing is saved, the data is broken,
// or localStorage is blocked (e.g. some private browsing modes).
export function loadFavorites(): Character[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(saved) ? saved.filter(isCharacter) : []
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
