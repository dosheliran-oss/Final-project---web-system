import { useEffect, useState } from 'react'
import type { CharactersState, SwapiCharacter } from '../types'
import { toCharacter } from '../utils/helpers'

const PEOPLE_URL = 'https://swapi.info/api/people'

// Fetches the full character list once. App calls it and passes the result
// down, so the list and compare pages share one request.
export function useCharacters(): CharactersState {
  const [state, setState] = useState<CharactersState>({
    characters: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Ignore the response if App unmounted before it arrived
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
        setState({ characters: data.map(toCharacter), loading: false, error: null })
      } catch (err) {
        if (ignore) return
        setState({
          characters: [],
          loading: false,
          error: err instanceof Error ? err.message : 'Something went wrong',
        })
      }
    }

    loadCharacters()
    return () => {
      ignore = true
    }
  }, [])

  return state
}
