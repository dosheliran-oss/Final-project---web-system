import type { Character } from '../types'

// Temporary data until the list is fetched from SWAPI.
// The ids match the real SWAPI ids, which are not sequential.
export const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    eye_color: 'blue',
  },
  {
    id: '5',
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    birth_year: '19BBY',
    eye_color: 'brown',
  },
  {
    id: '13',
    name: 'Chewbacca',
    height: '228',
    mass: '112',
    birth_year: '200BBY',
    eye_color: 'blue',
  },
]
