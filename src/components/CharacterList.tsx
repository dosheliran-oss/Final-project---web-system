import type { Character } from '../types'

interface CharacterListProps {
  characters: Character[]
}

function CharacterList({ characters }: CharacterListProps) {
  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>
          <strong>{character.name}</strong> · height {character.height} cm ·
          mass {character.mass} kg · born {character.birth_year} · eyes{' '}
          {character.eye_color}
        </li>
      ))}
    </ul>
  )
}

export default CharacterList
