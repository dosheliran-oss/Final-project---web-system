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
