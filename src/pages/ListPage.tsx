import CharacterList from '../components/CharacterList'
import { mockCharacters } from '../data/mockCharacters'

function ListPage() {
  return (
    <section>
      <h2>Characters</h2>
      <CharacterList characters={mockCharacters} />
    </section>
  )
}

export default ListPage
