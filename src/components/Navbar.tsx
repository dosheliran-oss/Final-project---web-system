import { NavLink } from 'react-router-dom'

// Bold marks the link of the current page until the real CSS in Task 14.
function linkStyle({ isActive }: { isActive: boolean }) {
  return { fontWeight: isActive ? 'bold' : 'normal' }
}

function Navbar() {
  return (
    <nav>
      <NavLink to="/" end style={linkStyle}>
        Characters
      </NavLink>
      {' | '}
      <NavLink to="/favorites" style={linkStyle}>
        Favorites
      </NavLink>
      {' | '}
      <NavLink to="/compare" style={linkStyle}>
        Compare
      </NavLink>
    </nav>
  )
}

export default Navbar
