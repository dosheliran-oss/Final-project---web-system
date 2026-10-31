import { useState } from 'react'
import CharacterList from '../components/CharacterList'
import SearchBar from '../components/SearchBar'
import StatusMessage from '../components/StatusMessage'
import type { CharactersState, FavoritesProps } from '../types'
import { filterCharacters } from '../utils/helpers'

type ListPageProps = CharactersState & FavoritesProps

function ListPage({ characters, loading, error, favorites, onToggleFavorite }: ListPageProps) {
  const [query, setQuery] = useState('')

  // Filtering runs on the list already in state, so typing never refetches.
  const visibleCharacters = filterCharacters(characters, query)

  return (
    <section>
      <h2>Characters</h2>
      {loading && <StatusMessage kind="loading" message="Loading characters..." />}
      {error && <StatusMessage kind="error" message={error} />}
      {!loading && !error && (
        <>
          <SearchBar value={query} onChange={setQuery} />
          {visibleCharacters.length > 0 ? (
            <CharacterList
              characters={visibleCharacters}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />
          ) : (
            <p>No characters found</p>
          )}
        </>
      )}
    </section>
  )
}

export default ListPage
