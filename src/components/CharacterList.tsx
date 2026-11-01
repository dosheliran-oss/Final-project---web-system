import { Link } from 'react-router-dom'
import type { Character, FavoritesProps } from '../types'
import { getAlignment } from '../utils/alignment'
import { displayValue } from '../utils/helpers'
import CharacterImage from './CharacterImage'
import FavoriteButton from './FavoriteButton'

interface CharacterListProps extends FavoritesProps {
  characters: Character[]
}

function CharacterList({ characters, favorites, onToggleFavorite }: CharacterListProps) {
  return (
    <ul className="character-list">
      {characters.map((character) => {
        // "hero" or "villain" picks the blue or red name and hover glow.
        const alignment = getAlignment(character.name)
        return (
          <li key={character.id} className={`character-card card-${alignment}`}>
            <Link
              to={`/items/${character.id}`}
              className="character-image-link"
              // The name link below is the accessible one; this is a mouse shortcut.
              tabIndex={-1}
              aria-hidden="true"
            >
              <CharacterImage name={character.name} />
            </Link>
            <Link
              to={`/items/${character.id}`}
              className={`character-name name-${alignment}`}
            >
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
        )
      })}
    </ul>
  )
}

export default CharacterList
