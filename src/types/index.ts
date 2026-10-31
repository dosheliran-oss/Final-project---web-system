// SWAPI returns every field as a string (e.g. "unknown", "1,358"),
// and the id is extracted from the end of the character's url.
export interface Character {
  id: string
  name: string
  height: string
  mass: string
  birth_year: string
  eye_color: string
}

// The raw shape of a character from /people. It has no id, only a url.
// homeworld and films are urls, not names.
export interface SwapiCharacter {
  name: string
  height: string
  mass: string
  birth_year: string
  eye_color: string
  gender: string
  hair_color: string
  skin_color: string
  homeworld: string
  films: string[]
  url: string
}

// From /planets/:id. Only the fields the app shows are typed.
export interface Planet {
  name: string
  url: string
}

// From /films/:id. episode_id is a number, unlike most SWAPI fields.
export interface Film {
  title: string
  episode_id: number
  url: string
}
