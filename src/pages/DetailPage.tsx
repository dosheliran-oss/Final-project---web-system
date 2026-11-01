import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FavoriteButton from '../components/FavoriteButton'
import StatusMessage from '../components/StatusMessage'
import type { FavoritesProps, Film, Planet, SwapiCharacter } from '../types'
import { getAlignment } from '../utils/alignment'
import { displayValue, toCharacter } from '../utils/helpers'

const PEOPLE_URL = 'https://swapi.info/api/people'

interface CharacterDetails {
  character: SwapiCharacter
  planet: Planet
  films: Film[]
}

// The id is stored with the result, so a result for a previous id
// is never shown while the next one is loading.
type LoadResult =
  | { id: string; details: CharacterDetails; error: null }
  | { id: string; details: null; error: string }

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}

function DetailPage({ favorites, onToggleFavorite }: FavoritesProps) {
  const { id = '' } = useParams()
  const [result, setResult] = useState<LoadResult | null>(null)

  useEffect(() => {
    // Ignore responses for an id we have already navigated away from.
    let ignore = false

    async function loadDetails() {
      try {
        const response = await fetch(`${PEOPLE_URL}/${id}`)
        if (response.status === 404) {
          throw new Error('Character not found')
        }
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const character: SwapiCharacter = await response.json()

        // The planet and all films are fetched in parallel.
        const [planet, films] = await Promise.all([
          fetchJson<Planet>(character.homeworld),
          Promise.all(character.films.map((url) => fetchJson<Film>(url))),
        ])
        if (ignore) return
        setResult({
          id,
          details: {
            character,
            planet,
            films: films.sort((a, b) => a.episode_id - b.episode_id),
          },
          error: null,
        })
      } catch (err) {
        if (ignore) return
        setResult({
          id,
          details: null,
          error: err instanceof Error ? err.message : 'Something went wrong',
        })
      }
    }

    loadDetails()
    return () => {
      ignore = true
    }
  }, [id])

  const current = result?.id === id ? result : null
  const loading = current === null
  const error = current?.error ?? null
  const details = current?.details ?? null

  return (
    <section className="detail">
      <Link to="/" className="back-link">
        ← Back to list
      </Link>
      {loading && <StatusMessage kind="loading" message="Loading character..." />}
      {error && <StatusMessage kind="error" message={error} />}
      {details && (
        <>
          <div className="detail-header">
            <h2 className={`name-${getAlignment(details.character.name)}`}>
              {details.character.name}
            </h2>
            <FavoriteButton
              isFavorite={favorites.some((favorite) => favorite.id === id)}
              onToggle={() => onToggleFavorite(toCharacter(details.character))}
            />
          </div>
          <dl className="detail-stats">
            {[
              ['Height', displayValue(details.character.height, 'cm')],
              ['Mass', displayValue(details.character.mass, 'kg')],
              ['Birth year', displayValue(details.character.birth_year)],
              ['Gender', displayValue(details.character.gender)],
              ['Eye color', displayValue(details.character.eye_color)],
              ['Hair color', displayValue(details.character.hair_color)],
              ['Skin color', displayValue(details.character.skin_color)],
              ['Homeworld', details.planet.name],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <h3>Films</h3>
          <ul className="film-list">
            {details.films.map((film) => (
              <li key={film.url}>
                <span className="film-episode">Episode {film.episode_id}</span>
                {film.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default DetailPage
