import { useEffect, useState } from 'react'
import CharacterList from '../components/CharacterList'
import SearchBar from '../components/SearchBar'
import StatusMessage from '../components/StatusMessage'
import type { Character, FavoritesProps, SwapiCharacter } from '../types'
import { filterCharacters, toCharacter } from '../utils/helpers'

const PEOPLE_URL = 'https://swapi.info/api/people'

function ListPage({ favorites, onToggleFavorite }: FavoritesProps) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    // Ignore the response if the page unmounted before it arrived
    // (StrictMode runs this effect twice in development).
    let ignore = false

    async function loadCharacters() {
      try {
        const response = await fetch(PEOPLE_URL)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data: SwapiCharacter[] = await response.json()
        if (ignore) return
        setCharacters(data.map(toCharacter))
      } catch (err) {
        if (ignore) return
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadCharacters()
    return () => {
      ignore = true
    }
  }, [])

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
