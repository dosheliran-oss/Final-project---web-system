import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useCharacters } from './hooks/useCharacters'
import type { Character } from './types'
import { loadFavorites, saveFavorites } from './utils/favoritesStorage'
import { toggleFavorite } from './utils/helpers'
import ComparePage from './pages/ComparePage'
import DetailPage from './pages/DetailPage'
import FavoritesPage from './pages/FavoritesPage'
import ListPage from './pages/ListPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  // Fetched once here and shared by the list and compare pages.
  const charactersState = useCharacters()

  // Favorites live here so the list, detail and favorites pages stay in sync.
  const [favorites, setFavorites] = useState<Character[]>(loadFavorites)

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  function handleToggleFavorite(character: Character) {
    setFavorites((current) => toggleFavorite(current, character))
  }

  const favoritesProps = { favorites, onToggleFavorite: handleToggleFavorite }

  return (
    <>
      <header className="site-header">
        <h1 className="site-title">Star Wars Explorer</h1>
        <Navbar />
      </header>
      <main className="page">
        <Routes>
        <Route path="/" element={<ListPage {...charactersState} {...favoritesProps} />} />
        <Route path="/items/:id" element={<DetailPage {...favoritesProps} />} />
        <Route path="/favorites" element={<FavoritesPage {...favoritesProps} />} />
        <Route path="/compare" element={<ComparePage {...charactersState} />} />
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
