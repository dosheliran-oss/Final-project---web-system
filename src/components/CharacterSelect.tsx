import type { Character } from '../types'

interface CharacterSelectProps {
  id: string
  label: string
  characters: Character[]
  value: string
  onChange: (characterId: string) => void
}

function CharacterSelect({ id, label, characters, value, onChange }: CharacterSelectProps) {
  return (
    <div className="character-select">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Choose a character</option>
        {characters.map((character) => (
          <option key={character.id} value={character.id}>
            {character.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CharacterSelect
