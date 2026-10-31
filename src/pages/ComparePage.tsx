import { useState } from 'react'
import CharacterSelect from '../components/CharacterSelect'
import CompareTable from '../components/CompareTable'
import StatusMessage from '../components/StatusMessage'
import type { CharactersState } from '../types'

function ComparePage({ characters, loading, error }: CharactersState) {
  const [idA, setIdA] = useState('')
  const [idB, setIdB] = useState('')

  const characterA = characters.find((character) => character.id === idA)
  const characterB = characters.find((character) => character.id === idB)

  return (
    <section>
      <h2>Head to Head</h2>
      {loading && <StatusMessage kind="loading" message="Loading characters..." />}
      {error && <StatusMessage kind="error" message={error} />}
      {!loading && !error && (
        <>
          <div className="compare-selects">
            <CharacterSelect
              id="compare-a"
              label="First character"
              characters={characters}
              value={idA}
              onChange={setIdA}
            />
            <CharacterSelect
              id="compare-b"
              label="Second character"
              characters={characters}
              value={idB}
              onChange={setIdB}
            />
          </div>
          {idA !== '' && idA === idB && <p>Please choose two different characters.</p>}
          {characterA && characterB && idA !== idB && (
            <CompareTable a={characterA} b={characterB} />
          )}
        </>
      )}
    </section>
  )
}

export default ComparePage
