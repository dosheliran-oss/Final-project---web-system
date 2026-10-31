import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import type { Character } from './types'
import { loadFavorites, saveFavorites } from './utils/favoritesStorage'
import { toggleFavorite } from './utils/helpers'
import ComparePage from './pages/ComparePage'
import DetailPage from './pages/DetailPage'
import FavoritesPage from './pages/FavoritesPage'
import ListPage from './pages/ListPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
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
    <main>
      <h1>Star Wars Explorer</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListPage {...favoritesProps} />} />
        <Route path="/items/:id" element={<DetailPage {...favoritesProps} />} />
        <Route path="/favorites" element={<FavoritesPage {...favoritesProps} />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  )
}

export default App
