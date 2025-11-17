import { useState } from 'react'
import { Home, Search, PlusSquare, User, Settings, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SearchBoard } from '../SearchBoard/SearchBoard'
import { SearchName } from '../SearchName/SearchName'
import './Header.css'
import Logo from '../Logo/Logo'

export default function Header({ setIsOPenNewPostModal, logOut }) {
  const [users, setUsers] = useState([])

  return (
    <header className="Header">
      <div className="Header-container">
        <nav className="Header-navbar">
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
            <div>
              <Link to="/settings">
                <Settings style={{color: 'black'}}/>
              </Link>

            </div>

            <div onClick={logOut} style={{ cursor: 'pointer' }}>
              <LogOut />
            </div>
          </div>
        </nav>

        {users.map(user => (
          <SearchName key={user._id} user={user} />
        ))}
      </div>
    </header>
  )
}
