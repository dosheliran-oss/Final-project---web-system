import { Link } from 'react-router-dom'
import type { Character, FavoritesProps } from '../types'
import { displayValue } from '../utils/helpers'
import FavoriteButton from './FavoriteButton'

interface CharacterListProps extends FavoritesProps {
  characters: Character[]
}

function CharacterList({ characters, favorites, onToggleFavorite }: CharacterListProps) {
  return (
    <ul className="character-list">
      {characters.map((character) => (
        <li key={character.id} className="character-card">
          <Link to={`/items/${character.id}`} className="character-name">
            {character.name}
          </Link>
          <dl className="card-stats">
            <div>
              <dt>Height</dt>
              <dd>{displayValue(character.height, 'cm')}</dd>
            </div>
            <div>
              <dt>Mass</dt>
              <dd>{displayValue(character.mass, 'kg')}</dd>
            </div>
            <div>
              <dt>Born</dt>
              <dd>{displayValue(character.birth_year)}</dd>
            </div>
            <div>
              <dt>Eyes</dt>
              <dd>{displayValue(character.eye_color)}</dd>
            </div>
          </dl>
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
