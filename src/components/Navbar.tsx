import { NavLink } from 'react-router-dom'

// NavLink adds the "active" class to the current page's link; index.css styles it.
function Navbar() {
  return (
    <nav className="navbar" aria-label="Main">
      <NavLink to="/" end>
        Characters
      </NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <NavLink to="/compare">Compare</NavLink>
    </nav>
  )
}

export default Navbar
