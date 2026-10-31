import { Link } from 'react-router-dom'
import type { Character, FavoritesProps } from '../types'
import FavoriteButton from './FavoriteButton'

interface CharacterListProps extends FavoritesProps {
  characters: Character[]
}

function CharacterList({ characters, favorites, onToggleFavorite }: CharacterListProps) {
  return (
    <ul className="character-list">
      {characters.map((character) => (
        <li key={character.id}>
          <Link to={`/items/${character.id}`}>
            <strong>{character.name}</strong>
          </Link>{' '}
          · height {character.height} cm ·
          mass {character.mass} kg · born {character.birth_year} · eyes{' '}
          {character.eye_color}{' '}
          <FavoriteButton
            isFavorite={favorites.some((favorite) => favorite.id === character.id)}
            onToggle={() => onToggleFavorite(character)}
          />
        </li>
      ))}
    </ul>
  )
}

export default CharacterList
