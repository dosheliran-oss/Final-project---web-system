// SWAPI has no "side", so the Dark Side is a hand-picked list.
// Everyone not on it is treated as a hero.
export type Alignment = 'hero' | 'villain'

const VILLAINS = [
  'Darth Vader',
  'Palpatine',
  'Boba Fett',
  'IG-88',
  'Bossk',
  'Darth Maul',
  'Bib Fortuna',
  'Nute Gunray',
  'Sebulba',
  'Poggle the Lesser',
  'Dooku',
  'Jango Fett',
  'Zam Wesell',
  'Wat Tambor',
  'Grievous',
  'Sly Moore',
  'Jabba Desilijic Tiure',
  'Greedo',
  'San Hill',
  'Dud Bolt',
  'Ratts Tyerel',
]

const villainNames = new Set(VILLAINS.map((name) => name.toLowerCase()))

// Matching ignores case and surrounding spaces.
export function getAlignment(name: string): Alignment {
  return villainNames.has(name.trim().toLowerCase()) ? 'villain' : 'hero'
}
