import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ComparePage from './pages/ComparePage'
import DetailPage from './pages/DetailPage'
import FavoritesPage from './pages/FavoritesPage'
import ListPage from './pages/ListPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <main>
      <h1>Star Wars Explorer</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/items/:id" element={<DetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  )
}

export default App
