import { Link } from 'react-router-dom'
import CharacterList from '../components/CharacterList'
import type { FavoritesProps } from '../types'

function FavoritesPage({ favorites, onToggleFavorite }: FavoritesProps) {
  return (
    <section>
      <h2>My Favorites</h2>
      {favorites.length > 0 ? (
        <CharacterList
          characters={favorites}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <p>
          You have no favorites yet. <Link to="/">Go to the list</Link> and mark some
          characters with ☆.
        </p>
      )}
    </section>
  )
}

export default FavoritesPage
