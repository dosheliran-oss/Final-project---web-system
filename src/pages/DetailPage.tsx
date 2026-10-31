import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'
import type { Film, Planet, SwapiCharacter } from '../types'

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

// SWAPI uses "unknown" and "n/a" for missing values.
function displayValue(value: string, unit = ''): string {
  if (value === 'unknown' || value === 'n/a' || value === '') return 'Unknown'
  return unit ? `${value} ${unit}` : value
}

function DetailPage() {
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
    <section>
      <Link to="/">Back to list</Link>
      {loading && <StatusMessage kind="loading" message="Loading character..." />}
      {error && <StatusMessage kind="error" message={error} />}
      {details && (
        <>
          <h2>{details.character.name}</h2>
          <dl>
            <dt>Height</dt>
            <dd>{displayValue(details.character.height, 'cm')}</dd>
            <dt>Mass</dt>
            <dd>{displayValue(details.character.mass, 'kg')}</dd>
            <dt>Birth year</dt>
            <dd>{displayValue(details.character.birth_year)}</dd>
            <dt>Gender</dt>
            <dd>{displayValue(details.character.gender)}</dd>
            <dt>Eye color</dt>
            <dd>{displayValue(details.character.eye_color)}</dd>
            <dt>Hair color</dt>
            <dd>{displayValue(details.character.hair_color)}</dd>
            <dt>Skin color</dt>
            <dd>{displayValue(details.character.skin_color)}</dd>
            <dt>Homeworld</dt>
            <dd>{details.planet.name}</dd>
          </dl>
          <h3>Films</h3>
          <ul>
            {details.films.map((film) => (
              <li key={film.url}>
                Episode {film.episode_id}: {film.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default DetailPage
