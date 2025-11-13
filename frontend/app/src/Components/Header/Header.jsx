import { useState } from 'react'
import { Home, Search, PlusSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SearchBoard } from '../SearchBoard/SearchBoard'
import { SearchName } from '../SearchName/SearchName'
import './Header.css'

export default function Header({ setIsOPenNewPostModal }) {
  const [users, setUsers] = useState([])

  return (
    <header className="Header">
      <nav className="navbar">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="logo">
            Instagram
          </Link>

          {/* Buscador */}
          <SearchBoard setUsers={setUsers} />

          {/* Iconos */}
          <div className="Header-icons">
            <Link to="/">
              <Home />
            </Link>
            <Link to="/search">
              <Search />
            </Link>
            <div
              onClick={() => setIsOPenNewPostModal(true)}
              style={{ display: 'inline', cursor: 'pointer' }}
            >
              <PlusSquare />
            </div>
            <Link to="/profile">
              <User />
            </Link>
          </div>
        </div>

        {users.map(user => (
          <SearchName key={user._id} user={user} />
        ))}
      </nav>
    </header>
  )
}
