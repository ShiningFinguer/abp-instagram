import { useState } from 'react'
import { Home, Search, PlusSquare, User, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SearchBoard } from '../SearchBoard/SearchBoard'
import { SearchName } from '../SearchName/SearchName'
import './Header.css'
import Logo from '../Logo/Logo'

export default function Header({ setIsOPenNewPostModal, logOut }) {
  const [users, setUsers] = useState([])

  return (
    <header className="Header">
      <nav className="navbar">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="logo">
            <Logo />
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
            <div onClick={logOut} style={{ cursor: 'pointer' }}>
              <LogOut />
            </div>
          </div>
        </div>

        {users.map(user => (
          <SearchName key={user._id} user={user} />
        ))}
      </nav>
    </header>
  )
}
