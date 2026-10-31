import CharacterList from './components/CharacterList'
import { mockCharacters } from './data/mockCharacters'

function App() {
  return (
    <main>
      <h1>Star Wars Explorer</h1>
      <CharacterList characters={mockCharacters} />
    </main>
  )
}

export default App
